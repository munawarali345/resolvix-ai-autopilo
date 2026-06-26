// ================================================================
// LOG ANALYZER AGENT
// ================================================================
//
// Purpose:
// Production AI Agent for Log Analysis.
//
// Responsibilities:
// 1. Load System Prompt
// 2. Load Skill
// 3. Bind Tools
// 4. Invoke Qwen
// 5. Execute Tool Calls
// 6. Generate Final Structured Output
// ================================================================

import {
  HumanMessage,
  SystemMessage,
  ToolMessage,
  BaseMessage,
} from '@langchain/core/messages';

import { createQwenLangChainModel } from '../../ai/qwen/qwen.langchain.js';

import { LOG_ANALYZER_SYSTEM_PROMPT } from '../log-analysisAgent/logAnalysis.prompt.js';
import { loadSkill } from '../../utils/loadSkill.util.js';

import { extractErrorsTool } from '../../tools/logAnalyzerAgentTools/extratErrorToolWraper.js';
import { buildTimelineTool } from '../../tools/logAnalyzerAgentTools/buildTimelinetoolwrapper.js';
import { groupLogsTool } from '../../tools/logAnalyzerAgentTools/groupedLogToolWrapper.js';
import { extractAffectedServicesTool } from '../../tools/logAnalyzerAgentTools/extractAffectedServiceToolWrapper.js';
import { dependencyMapperTool } from '../../tools/logAnalyzerAgentTools/dependencyMapperToolWrapper.js';

import {
  LogAnalyzerAgentInput,
  LogAnalyzerAgentOutput,
} from '../../types/index.js';

// parser
import { parseLogAnalyzerResponse } from './logAnalysis.parser.js';

// validator
import { validateLogAnalyzerOutput } from './logAnalysis.validator.js';

const qwenModel = createQwenLangChainModel();

// ================================================================
// Bind Agent Tools
// ================================================================

const model = qwenModel.bindTools([
  extractErrorsTool,
  buildTimelineTool,
  groupLogsTool,
  extractAffectedServicesTool,
  dependencyMapperTool,
]);

// ================================================================
// Tool Registry
// ================================================================

const toolRegistry = {
  extractErrorsTool,
  buildTimelineTool,
  groupLogsTool,
  extractAffectedServicesTool,
  dependencyMapperTool,
};

// ================================================================
// Agent
// ================================================================

export const logAnalyzerAgent = async (
  agentInput: LogAnalyzerAgentInput,
): Promise<LogAnalyzerAgentOutput> => {
  // Load Skill
  const skill = await loadSkill(
    'logAnalysisSkills',

    'logAnalysisSkill.md',
  );

  // ================================================================
  // buildind prompt with system prompt + skill.md
  // ================================================================

  const systemPrompt = `

${LOG_ANALYZER_SYSTEM_PROMPT}

${skill}

`;

  // ================================================================
  // userPrompt
  // ================================================================
  const userPrompt = `

Analyze the following incident.

Incident:
${JSON.stringify(agentInput.incident, null, 2)}

Detection Result:
${JSON.stringify(agentInput.detectionResult, null, 2)}

Current Workflow Step:
${agentInput.currentStep}

Logs:
${JSON.stringify(agentInput.logs, null, 2)}

Analyze the incident by following your assigned skill and use tools whenever required.

`;

  const messages: BaseMessage[] = [
    new SystemMessage(systemPrompt),

    new HumanMessage(userPrompt),
  ];

  let continueExecution = true;

  while (continueExecution) {
    const response = await model.invoke(messages);

    messages.push(response);

    // --------------------------------------------------------
    // No Tool Call → Final AI Response
    // --------------------------------------------------------

    if (!response.tool_calls?.length) {
      continueExecution = false;

      const parsedOutput = parseLogAnalyzerResponse(response.content as string);

      const validatedOutput = validateLogAnalyzerOutput(parsedOutput);

      return validatedOutput;
    }

    // --------------------------------------------------------
    // Execute Tool Calls
    // --------------------------------------------------------

    for (const toolCall of response.tool_calls) {
      const tool = toolRegistry[toolCall.name as keyof typeof toolRegistry];

      if (!tool) {
        throw new Error(`Unknown Tool: ${toolCall.name}`);
      }

      const result = await tool.invoke(toolCall);

      if (!toolCall.id) {
        throw new Error('Tool call id is missing.');
      }

      messages.push(
        new ToolMessage({
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        }),
      );
    }
  }

  throw new Error(
    'Log Analyzer Agent terminated without producing a final response.',
  );
};

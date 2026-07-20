import { Command } from '@langchain/langgraph';

import logger from '../../lib/logger.js';

import { IncidentModel } from '../../models/incident.model.js';

import { getWorkflow } from '../../langGraph/graph/workflow.graph.js';

export const developerResumeService = async (
  threadId: string,
): Promise<void> => {
  // ------------------------------------------------
  // STEP 1
  // Validate Thread
  // ------------------------------------------------

  const incident = await IncidentModel.findById(threadId);

  if (!incident) {
    throw new Error('Incident not found.');
  }

  // ------------------------------------------------
  // STEP 2
  // Get Workflow
  // ------------------------------------------------

  const workflow = getWorkflow();

  // ------------------------------------------------
  // STEP 3
  // Resume Workflow
  // ------------------------------------------------

  const result = await workflow.invoke(
    new Command({
      resume: {
        developer: true,
      },
    }),

    {
      configurable: {
        thread_id: threadId,
      },
    },
  );

  logger.debug('Developer resume result', { data: result });
};

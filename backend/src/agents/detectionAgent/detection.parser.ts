// ================================================================
// Detection Agent Response Parser
// Purpose: Qwen AI se aane wale RAW response ko safe JSON me convert karna
// ================================================================
import { DetectionAgentOutput } from '../../types/detectionAgent.type.js';

// ------------------------------------------------
// Function: parseDetectionResponse
// Input: AI ka raw string response
// Output: clean JSON object
// ------------------------------------------------
export function parseDetectionResponse(content: string): DetectionAgentOutput {
  try {
    // ------------------------------------------------
    // STEP 1: Remove markdown formatting
    // Qwen kabhi response ko ```json ``` me wrap karta hai
    // ------------------------------------------------
    const cleaned = content
      .replace(/```json/g, '') // starting json tag hatao
      .replace(/```/g, '') // closing backticks hatao
      .trim(); // extra spaces remove

    // ------------------------------------------------
    // STEP 2: JSON extract karo
    // Kabhi AI text ke sath JSON bhej deta hai
    // Is liye hum first { aur last } nikalte hain
    // ------------------------------------------------
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');

    // safety check (agar JSON hi na mila ho)
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No valid JSON found in AI response');
    }

    // ------------------------------------------------
    // STEP 3: JSON string extract karo
    // sirf valid JSON portion nikala ja raha hai
    // ------------------------------------------------
    const jsonString = cleaned.slice(jsonStart, jsonEnd + 1);

    // ------------------------------------------------
    // STEP 4: Parse JSON safely
    // string → object conversion
    // ------------------------------------------------
    const parsed = JSON.parse(jsonString);

    // ------------------------------------------------
   // STEP 4.1
   // Convert ISO date string into Date object
  // ------------------------------------------------

  if (
     parsed?.incident?.detectedAt &&
     typeof parsed.incident.detectedAt === "string"
  ) {
     parsed.incident.detectedAt = new Date(parsed.incident.detectedAt);
   }

    // ------------------------------------------------
    // STEP 5: return parsed object
    // ab yahan se detection agent use karega
    // ------------------------------------------------
    return parsed as DetectionAgentOutput;

  } catch {
    // ------------------------------------------------
    // ERROR HANDLING
    // Agar AI ne invalid response diya ho
    // ------------------------------------------------
    throw new Error('Detection Parser failed: Invalid AI response format');
  }
}

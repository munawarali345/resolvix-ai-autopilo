// ================================================================
// ROLLBACK FUNCTION
// ================================================================
//
// Purpose:
// Executes the approved rollback plan and builds the
// RollbackOutput.
//
// This function does NOT contain infrastructure logic.
//
// Responsibilities:
//
// - Execute rollback commands
// - Collect rollback steps
// - Determine rollback status
// - Build RollbackOutput
//
// ================================================================

import { rollbackProvider } from '../rollbackToolHalpers/rollbackProvider.js';

import { RollbackOutput } from '../../../types/executorTools.type.js';

// ================================================================
// EXECUTE ROLLBACK
// ================================================================

export async function executeRollback(
  rollbackPlan: string[],
): Promise<RollbackOutput> {
  // --------------------------------------------------------------
  // Store rollback results.
  // --------------------------------------------------------------

  const rollbackSteps: string[] = [];

  let rollbackSuccessful = true;

  // --------------------------------------------------------------
  // Execute every rollback command.
  // --------------------------------------------------------------

  for (const command of rollbackPlan) {
    const result = await rollbackProvider(command);

    rollbackSteps.push(command);

    if (!result.success) {
      rollbackSuccessful = false;
    }
  }

  // --------------------------------------------------------------
  // Return rollback summary.
  // --------------------------------------------------------------

  return {
    rollbackPerformed: rollbackPlan.length > 0,

    rollbackSuccessful,

    rollbackSteps,
  };
}

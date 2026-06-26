// ================================================================
// LOAD SKILL UTILITY
// ================================================================
//
// Purpose:
// Load any AI Agent skill (.md) file from disk.
//
// This utility is shared by all agents.
//
// ================================================================

import fs from 'node:fs/promises';
import path from 'node:path';

// ================================================================
// Load Skill
// ================================================================

export const loadSkill = async (
  skillFolder: string,
  skillFile: string,
): Promise<string> => {
  // ------------------------------------------------------------
  // STEP 1
  // Build skill file path
  // ------------------------------------------------------------

  const skillPath = path.join(
    process.cwd(),

    'src',

    'skills',

    skillFolder,

    skillFile,
  );

  // ------------------------------------------------------------
  // STEP 2
  // Read markdown file
  // ------------------------------------------------------------
  const skill = await fs.readFile(
    skillPath,

    'utf-8',
  );

  // ------------------------------------------------------------
  // STEP 3
  // Return skill content
  // ------------------------------------------------------------
  return skill;
};

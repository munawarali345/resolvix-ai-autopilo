'use client';

// ================================================================
// SCENARIO CARD
// ================================================================
//
// Purpose:
//
// Display a single simulation scenario option.
//
// Responsibilities:
//
// 1. Show scenario information.
// 2. Handle scenario selection.
// 3. Highlight selected scenario.
//
// Used By:
//
// SimulationPanel
//
// ================================================================

import { cn } from '@/lib/utils';

import type { SimulationScenario } from '@/types/simulation.types';

// ================================================================
// PROPS
// ================================================================

interface ScenarioCardProps {
  scenario: SimulationScenario;

  title: string;

  description: string;

  selected: boolean;

  onSelect: (scenario: SimulationScenario) => void;
}

// ================================================================
// COMPONENT
// ================================================================

export default function ScenarioCard({
  scenario,

  title,

  description,

  selected,

  onSelect,
}: ScenarioCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(scenario)}
      className={cn(
        'rounded-xl border p-5 text-left transition-all',

        'hover:border-primary hover:bg-muted/50',

        selected && 'border-primary bg-primary/5 ring-2 ring-primary/20',
      )}
    >
      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </button>
  );
}

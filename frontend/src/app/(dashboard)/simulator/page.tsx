
"use client";

// ================================================================
// SIMULATOR PAGE
// ================================================================
//
// Purpose:
//
// Simulator route entry.
//
// Responsibilities:
//
// 1. Render simulation view.
// 2. Keep route separate from business logic.
//
// ================================================================


import SimulationView from "@/features/simulator/SimulationView";


// ================================================================
// PAGE
// ================================================================

export default function SimulatorPage(){

  return (

    <SimulationView />

  );

}
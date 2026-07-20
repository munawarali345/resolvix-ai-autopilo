"use client";

// ================================================================
// SCENARIO CARD
// ================================================================
//
// Purpose:
//
// Single simulation scenario display.
//
// Responsibilities:
//
// 1. Show scenario information.
// 2. Handle selection state.
// 3. Notify parent on selection.
//
// ================================================================


import {
  Check,
} from "lucide-react";


import type {
  SimulationScenario,
} from "@/types/simulation.types";



// ================================================================
// PROPS
// ================================================================

interface ScenarioCardProps {


  scenario:SimulationScenario;


  title:string;


  description:string;


  selected:boolean;


  onSelect:
    (scenario:SimulationScenario)=>void;


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


}:ScenarioCardProps){



  return (


    <button


      type="button"


      onClick={()=>onSelect(scenario)}


      className={`relative rounded-xl border p-5 text-left transition-all duration-200 ${
        
        selected

        ? "border-primary bg-primary/5 shadow-md"

        : "border-border hover:border-primary/40 hover:bg-muted/40"

      }`}


    >



      {

        selected && (

          <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">


            <Check className="h-4 w-4"/>


          </div>

        )

      }





      <div className="space-y-2">


        <h3 className="font-semibold">

          {title}

        </h3>



        <p className="text-sm text-muted-foreground">

          {description}

        </p>



      </div>




    </button>


  );


}
"use client";

// ================================================================
// SIMULATION PANEL
// ================================================================
//
// Purpose:
//
// Simulation user interface.
//
// Responsibilities:
//
// 1. Display simulation scenarios.
// 2. Handle scenario selection UI.
// 3. Trigger action through props.
//
// ================================================================


import {
  Play,
} from "lucide-react";


import {
  AlertCircle,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import ScenarioCard from "./ScenarioCard";


import type {
  SimulationScenario,
} from "@/types/simulation.types";



// ================================================================
// TYPES
// ================================================================

interface ScenarioItem {

  scenario: SimulationScenario;

  title:string;

  description:string;

}



interface SimulationPanelProps {


  scenarios:ScenarioItem[];


  selectedScenario:SimulationScenario | null;


  onSelectScenario:
    (scenario:SimulationScenario)=>void;


  onRunSimulation:
    ()=>void;


  isLoading:boolean;


  error:Error | null;


}



// ================================================================
// COMPONENT
// ================================================================

export default function SimulationPanel({


  scenarios,


  selectedScenario,


  onSelectScenario,


  onRunSimulation,


  isLoading,


  error,


}:SimulationPanelProps){



  return (


    <Card className="border-border shadow-sm">


      <CardHeader>


        <CardTitle>

          Select Incident Scenario

        </CardTitle>


      </CardHeader>




      <CardContent className="space-y-6">



        <div className="grid gap-4 md:grid-cols-2">


          {

            scenarios.map((item)=>(


              <ScenarioCard

                key={item.scenario}

                scenario={item.scenario}

                title={item.title}

                description={item.description}

                selected={
                  selectedScenario === item.scenario
                }

                onSelect={
                  onSelectScenario
                }

              />


            ))

          }


        </div>




        {

          error && (

            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">


              <AlertCircle className="h-4 w-4"/>


              <span>

                Simulation failed. Please try again.

              </span>


            </div>

          )

        }




        <button


          type="button"


          disabled={
            !selectedScenario || isLoading
          }


          onClick={onRunSimulation}


          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"


        >


          <Play className="h-4 w-4"/>



          {

            isLoading

            ? "Starting Simulation..."

            : "Start Simulation"

          }



        </button>



      </CardContent>


    </Card>


  );


}
"use client";

// ================================================================
// SIMULATION VIEW
// ================================================================
//
// Purpose:
//
// Main simulation container.
//
// Responsibilities:
//
// 1. Manage simulation state.
// 2. Trigger simulation API.
// 3. Handle redirect after incident creation.
// 4. Pass data to UI component.
//
// ================================================================


import {
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";


import {
  useSimulation,
} from "@/hooks/useSimulation";


import type {
  SimulationScenario,
} from "@/types/simulation.types";


import SimulationPanel from "@/components/simulations/SimulationPanel";



// ================================================================
// SCENARIOS
// ================================================================

const scenarios = [

  {
    scenario:"db-failure" as SimulationScenario,
    title:"Database Failure",
    description:
      "Simulate database outage and connection failures.",
  },


  {
    scenario:"memory-leak" as SimulationScenario,
    title:"Memory Leak",
    description:
      "Simulate high memory usage incident.",
  },


  {
    scenario:"api-500-error" as SimulationScenario,
    title:"API 500 Error",
    description:
      "Simulate backend internal server error.",
  },


  {
    scenario:"deployment-failure" as SimulationScenario,
    title:"Deployment Failure",
    description:
      "Simulate failed deployment process.",
  },


  {
    scenario:"cpu-spike" as SimulationScenario,
    title:"CPU Spike",
    description:
      "Simulate high CPU utilization incident.",
  },

];




// ================================================================
// COMPONENT
// ================================================================

export default function SimulationView(){


  const router = useRouter();



  const [
    selectedScenario,
    setSelectedScenario,
  ] = useState<SimulationScenario | null>(null);




  const {

    simulate,

    isLoading,

    error,

  } = useSimulation();





  // ==============================================================
  // HANDLE SIMULATION
  // ==============================================================

  const handleSimulation = ()=>{


    if(!selectedScenario){

      return;

    }



    simulate(

      selectedScenario,

      {

        onSuccess:(response)=>{


          const incidentId =
            response.data?.detection.incident?.id;



          if(incidentId){

            router.push(
              `/incidents/${incidentId}`
            );

          }


        },


      }

    );


  };





  return (

    <div className="flex flex-1 flex-col gap-6 p-6">


      <div>


        <h1 className="text-2xl font-bold tracking-tight">

          Incident Simulator

        </h1>


        <p className="mt-2 text-sm text-muted-foreground">

          Trigger controlled incidents and monitor autonomous agent workflow.

        </p>


      </div>



      <SimulationPanel

        scenarios={scenarios}

        selectedScenario={selectedScenario}

        onSelectScenario={setSelectedScenario}

        onRunSimulation={handleSimulation}

        isLoading={isLoading}

        error={error}


      />


    </div>

  );


}
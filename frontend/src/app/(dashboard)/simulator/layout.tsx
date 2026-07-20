
import type { ReactNode } from "react";

import AdminGuard from "@/components/guards/AdminGuard";


interface SimulatorLayoutProps {

  children: ReactNode;

}


export default function SimulatorLayout({

  children,

}:SimulatorLayoutProps){


  return (

    <AdminGuard>

      {children}

    </AdminGuard>

  );

}
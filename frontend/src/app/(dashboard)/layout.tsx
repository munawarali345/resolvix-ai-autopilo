import type { ReactNode } from "react";

import AppShell from "@/components/layout/app-shell";

import AuthGuard from "@/components/guards/AuthGuard";


// ================================================================
// TYPES
// ================================================================

interface DashboardLayoutProps {

  children: ReactNode;

}



// ================================================================
// LAYOUT
// ================================================================

export default function DashboardLayout({

  children,

}: DashboardLayoutProps) {


  return (

    <AuthGuard>


      <AppShell>

        {children}

      </AppShell>


    </AuthGuard>

  );


}
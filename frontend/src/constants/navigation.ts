// ================================================================
// APPLICATION NAVIGATION
// ================================================================
//
// Purpose:
//
// Central navigation configuration.
//
// Responsibilities:
//
// 1. Sidebar routes.
// 2. Navigation labels.
// 3. Navigation icons.
// 4. Route paths.
//
// Used by:
//
// - Sidebar
// - Breadcrumbs
// - Future mobile navigation
//
// ================================================================

import { LayoutDashboard, ShieldAlert, FileText } from 'lucide-react';

// ================================================================
// SIDEBAR NAVIGATION
// ================================================================

export const sidebarNavigation = [
  {
    title: 'Dashboard',

    href: '/dashboard',

    icon: LayoutDashboard,
  },

  {
    title: 'Incidents',

    href: '/incidents',

    icon: ShieldAlert,
  },

  {
    title: 'Reports',

    href: '/reports',

    icon: FileText,
  },
];

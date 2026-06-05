// Import shadcn/ui Button component for interactive elements
import { Button } from '@/components/ui/button';

// Main home page component - displays welcome message and CTA
export default function Home() {
  return (
    // Full-screen flex container centered vertically and horizontally
    <div className="min-h-screen flex items-center justify-center">
      {/* Column layout with spacing between elements */}
      <div className="flex flex-col items-center gap-4">
        {/* Main heading - 2xl size, bold weight */}
        <h1 className="text-2xl font-bold">Welcome to Resolvix AI</h1>
        {/* Shadcn Button component - primary call-to-action */}
        <Button>Get Started</Button>
      </div>
    </div>
  );
}

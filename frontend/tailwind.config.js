/**
 * Tailwind CSS Configuration for Resolvix AI Frontend
 * @type {import('tailwindcss').Config}
 *
 * This configuration extends Tailwind with shadcn/ui CSS variables for theming
 * Supports both light and dark mode color schemes
 */
export default {
  // Paths to all files that use Tailwind classes
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Source files in src directory
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}', // Tremor library components
  ],
  theme: {
    extend: {
      // Map CSS variables to Tailwind colors for theming
      colors: {
        // Background and foreground colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // Card component colors
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Popover component colors
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        // Primary action colors
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Secondary action colors
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // Muted/disabled element colors
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        // Accent colors for highlights
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        // Destructive/error action colors
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        // Border and input colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      // Border radius from CSS variable
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};

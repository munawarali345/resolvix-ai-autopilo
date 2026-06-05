// Import clsx for conditional class concatenation with type support
import { type ClassValue, clsx } from 'clsx';

// Import twMerge to resolve Tailwind CSS class conflicts
import { twMerge } from 'tailwind-merge';

// cn (className) utility function for merging Tailwind classes
// Combines clsx and tailwind-merge for proper class deduplication
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

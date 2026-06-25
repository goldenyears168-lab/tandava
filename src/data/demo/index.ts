/**
 * DEMO MODE - Central Export
 *
 * This file exports all demo data and utilities.
 * To remove demo mode: delete src/data/demo/ and set VITE_DEMO_MODE=false
 */

// Demo studio data
export * from './oxatl-yoga';
export * from './spa-ui-mocks';

// Demo bookings and transactions (2018 historical data)
export * from './bookings-transactions';

// Demo identity constants
export const DEMO_STUDIO_SLUG = 'oxatl-yoga';
export const DEMO_STUDIO_NAME = '森浴光mm941';
export const DEMO_LOCATION = '台灣（汐止・台北・台中・台南）';

// Demo user handles/identifiers
export const DEMO_HANDLES = [
  'oxatl-yoga',
  'mariana-trench',
  'demo',
] as const;

/**
 * Check if a handle/slug is a demo identifier.
 * Use this to gate demo data loading.
 */
export function isDemoHandle(handle: string | undefined): boolean {
  if (!handle) return false;
  return DEMO_HANDLES.includes(handle.toLowerCase() as typeof DEMO_HANDLES[number]);
}

/**
 * Check if a studio ID is the demo studio.
 */
export function isDemoStudio(studioId: string | undefined): boolean {
  if (!studioId) return false;
  return studioId === 'demo-studio-oxatl-001' || studioId.startsWith('demo-');
}

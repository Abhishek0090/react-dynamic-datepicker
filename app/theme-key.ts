// Shared by layout.tsx (server) and theme.tsx (client). Keep it out of the
// "use client" file: a server component that imports a value from there gets a
// client reference instead of the string.
export const THEME_STORAGE_KEY = "ddp-demo-theme";

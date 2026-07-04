function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  isProduction: process.env.NODE_ENV === "production",
  sanity: {
    projectId: requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: requireEnv("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  },
} as const;

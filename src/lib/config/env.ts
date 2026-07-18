function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  sanity: {
    projectId: requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: requireEnv("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
    revalidateSecret: process.env.SANITY_REVALIDATE_SECRET,
  },
} as const;

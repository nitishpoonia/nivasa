"use client";

import { Container } from "@/lib/ui/Container";

type Props = {
  reset: () => void;
};

export default function ProjectError({ reset }: Props) {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-4 text-neutral-500">
        We couldn&apos;t load this project right now. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-neutral-900 px-4 py-2 text-white dark:bg-neutral-100 dark:text-neutral-900"
      >
        Retry
      </button>
    </Container>
  );
}

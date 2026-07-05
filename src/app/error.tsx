"use client";

import { Container } from "@/lib/ui/Container";
import { PillButton } from "@/lib/ui/PillButton";

type Props = {
  reset: () => void;
};

export default function RootError({ reset }: Props) {
  return (
    <Container className="flex flex-1 flex-col justify-center py-16">
      <h1 className="font-serif text-3xl font-medium">Something went wrong</h1>
      <p className="text-muted mt-4">
        We couldn&apos;t load this page right now. Please try again.
      </p>
      <PillButton onClick={reset} className="mt-6">
        Retry
      </PillButton>
    </Container>
  );
}

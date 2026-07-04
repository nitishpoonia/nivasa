import Link from "next/link";
import { Container } from "@/lib/ui/Container";

export default function Home() {
  return (
    <Container className="flex flex-1 flex-col items-start justify-center py-32">
      <h1 className="max-w-md text-4xl leading-tight font-semibold tracking-tight">
        Nivasa
      </h1>
      <p className="mt-4 max-w-md text-lg text-neutral-500">
        Interior design & architecture studio.
      </p>
      <Link
        href="/projects"
        className="mt-8 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
      >
        View projects
      </Link>
    </Container>
  );
}

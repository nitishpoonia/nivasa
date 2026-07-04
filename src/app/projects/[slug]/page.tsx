import { notFound } from "next/navigation";
import Image from "next/image";
import { cms } from "@/lib/cms";
import { getProjectBySlug } from "@/modules/content";
import { Container } from "@/lib/ui/Container";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(cms, slug);

  if (!project) {
    notFound();
  }

  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">{project.title}</h1>
      {project.location ? (
        <p className="mt-2 text-neutral-500">{project.location}</p>
      ) : null}
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={project.coverImage.url}
          alt={project.coverImage.alt}
          fill
          className="object-cover"
        />
      </div>
      <p className="mt-8 text-lg leading-relaxed">{project.summary}</p>
    </Container>
  );
}

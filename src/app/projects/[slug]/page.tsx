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
      <h1 className="font-serif text-4xl font-medium sm:text-5xl">
        {project.title}
      </h1>
      <div className="text-muted mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {project.location ? <span>{project.location}</span> : null}
        {project.year ? <span>{project.year}</span> : null}
        {project.categories.length > 0 ? (
          <span>{project.categories.join(" · ")}</span>
        ) : null}
      </div>
      <div className="border-border relative mt-8 aspect-[16/9] overflow-hidden border">
        <Image
          src={project.coverImage.url}
          alt={project.coverImage.alt}
          fill
          priority
          className="object-cover"
        />
      </div>
      {project.summary ? (
        <p className="mt-8 max-w-[65ch] text-lg leading-relaxed">
          {project.summary}
        </p>
      ) : null}
      {project.description.length > 0 ? (
        <div className="mt-6 max-w-[65ch] space-y-4">
          {project.description.map((paragraph, index) => (
            <p key={index} className="text-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
      {project.gallery.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {project.gallery.map((image, index) => (
            <div
              key={index}
              className="border-border relative aspect-[4/3] overflow-hidden border"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </Container>
  );
}

import Link from "next/link";

type Props = {
  categories: string[];
  activeCategory?: string;
};

export function ProjectFilters({ categories, activeCategory }: Props) {
  const chips = ["All", ...categories];

  return (
    <div className="mt-9 flex flex-wrap gap-2.5">
      {chips.map((category) => {
        const isActive =
          category === "All" ? !activeCategory : category === activeCategory;
        const href =
          category === "All"
            ? "/projects"
            : `/projects?category=${encodeURIComponent(category)}`;

        return (
          <Link
            key={category}
            href={href}
            className={`rounded-full border px-4 py-2 font-mono text-[11px] tracking-wide uppercase no-underline ${
              isActive
                ? "border-foreground bg-foreground text-background"
                : "border-border text-subtle hover:text-foreground"
            }`}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}

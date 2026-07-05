import type { Service } from "@/modules/content/domain/service";

type Props = {
  service: Service;
  index: number;
};

export function ServiceListItem({ service, index }: Props) {
  return (
    <div className="border-border grid grid-cols-[80px_1fr] gap-6 border-t py-9 sm:gap-14">
      <span className="text-accent pt-2 font-mono text-[13px]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="grid gap-4">
        <h3 className="font-serif text-3xl font-medium sm:text-5xl">
          {service.name}
        </h3>
        <p className="text-muted max-w-[56ch] text-[15.5px]">
          {service.description}
        </p>
        {service.tags.length > 0 ? (
          <div className="mt-0.5 flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="border-border text-subtle rounded-full border px-3 py-1.5 font-mono text-[11px] tracking-wide uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

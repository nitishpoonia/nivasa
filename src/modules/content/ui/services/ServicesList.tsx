import type { Service } from "@/modules/content/domain/service";
import { ServiceListItem } from "@/modules/content/ui/services/ServiceListItem";

type Props = {
  services: Service[];
};

export function ServicesList({ services }: Props) {
  if (services.length === 0) {
    return (
      <p className="text-muted mt-14">Services will be listed here soon.</p>
    );
  }

  return (
    <div className="mt-14">
      {services.map((service, index) => (
        <ServiceListItem key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}

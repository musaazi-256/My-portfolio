import { cn } from "@prototype/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  variant = "marketing"
}: {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
  variant?: "marketing" | "portal";
}) {
  if (variant === "portal") {
    return (
      <div className={cn("flex flex-col gap-1 pb-6 pt-2", className)}>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{eyebrow}</p> : null}
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    );
  }

  return (
    <section className={cn("py-9 sm:py-12", className)}>
      {eyebrow ? <p className="text-xs font-extrabold uppercase tracking-wider text-primary">{eyebrow}</p> : null}
      <h1 className="mt-2 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
    </section>
  );
}

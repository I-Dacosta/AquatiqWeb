import { forwardRef } from "react";

// Section title accepts ReactNode to allow inline icons/logos
type SectionProps = {
  id: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "full-bleed" | "full-bleed-tight" | "medium-bleed";
  containerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export const Section = forwardRef<HTMLElement, SectionProps>(({
  id,
  title,
  subtitle,
  children,
  variant = "default",
  containerClassName,
  titleClassName,
  subtitleClassName,
}, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "full-bleed":
        return [
          "relative left-1/2 right-1/2 w-screen",
          "-ml-[50vw] -mr-[50vw]",
          "px-4 py-20",
          containerClassName,
        ]
          .filter(Boolean)
          .join(" ");
      case "full-bleed-tight":
        return [
          "relative left-1/2 right-1/2 w-screen",
          "-ml-[50vw] -mr-[50vw]",
          "p-0",
          containerClassName,
        ]
          .filter(Boolean)
          .join(" ");
      case "medium-bleed":
        return [
          "relative left-1/2 right-1/2 w-screen",
          "-ml-[50vw] -mr-[50vw]",
          "px-[38px] py-4",
          containerClassName,
        ]
          .filter(Boolean)
          .join(" ");
      default:
        return ["mx-auto max-w-6xl px-6 py-16", containerClassName]
          .filter(Boolean)
          .join(" ");
    }
  };

  return (
    <section
      ref={ref}
      id={id}
      className={getVariantClasses()}
    >
      <header className="mb-4 space-y-1">
        <h2
          className={
            titleClassName ??
            "text-2xl font-semibold tracking-tight"
          }
        >
          {title}
        </h2>

        {subtitle ? (
          <p
            className={
              subtitleClassName ??
              "max-w-3xl text-sm text-[rgb(var(--muted))]"
            }
          >
            {subtitle}
          </p>
        ) : null}
      </header>

      {children}
    </section>
  );
});

Section.displayName = "Section";

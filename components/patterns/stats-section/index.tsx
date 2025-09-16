import Section from "../../ui/section";

export default function StatsSection({
  title,
  items,
  className = "bg-background-50 text-foreground-50",
}: {
  title?: string;
  items: { label: string; number: string }[];
  className?: string;
}) {
  return (
    <Section
      classNames={{
        container: className,
        inner: "items-center justify-center text-center",
      }}
    >
      {title && <h3 className="container text-center text-3xl">{title}</h3>}
      <div className="container flex justify-evenly py-8">
        {items.map(({ label, number }, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-2xl font-bold">{number}</span>
            <span className="text-lg font-medium">{label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

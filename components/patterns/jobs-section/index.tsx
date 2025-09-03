"use client";
import Section from "@/components/ui/section";
import { useState } from "react";

type Filter = {
  label: string;
  property: string;
  options: { label: string; value: string }[];
};

type Job = {
  title: string;
  area: string;
  city: string;
  last_date: string;
}[];

export default function JobsSection({
  className,
  heading,
  text,
  jobs,
  filters
}: {
  className?: string;
  heading: string;
  text: string;
  jobs: Job;
  filters: Filter[];
}) {
  const [selectedFilters, setSelectedFilters] = useState(
    filters.reduce((acc, filter) => ({ ...acc, [filter.property]: "" }), {})
  );

  // Update filter state when a filter changes
  const handleFilterChange = (property: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [property]: value }));
  };

  // Filter jobs based on selected filters
  const filteredJobs = jobs?.filter((job) =>
    Object.entries(selectedFilters).every(([property, value]) => !value || (job as Record<string, string>)[property] === value)
  );

  return (
    <>
      <Section boxed classNames={{ container: className }}>
        <h3 className="text-2xl font-[550]">{heading}</h3>
        <p className="pb-6 text-lg">{text}</p>

        {/* Render Filters */}
        <div className="flex gap-4 pb-4">
          {filters.map(({ label, property, options }) => (
            <select
              key={property}
              className="ui-border rounded-sm p-2"
              value={selectedFilters[property as keyof typeof selectedFilters]}
              onChange={(e) => handleFilterChange(property, e.target.value)}>
              <option value="">{label}</option>
              {options.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-8 py-2 font-bold md:grid-cols-2">
          <p>Titel</p>
          <p className="md:hidden">Roll</p>
          <p>Stad</p>
          <p className="md:hidden">Ansök Innan</p>
        </div>
        <hr />
        <ul>
          {filteredJobs?.map(({ title, area, city, last_date }, index) => (
            <>
              <li className="grid grid-cols-4 gap-8 py-4 md:grid-cols-2" key={index}>
                <p>{title}</p>
                <p className="md:hidden">{area}</p>
                <p>{city}</p>
                <p className="md:hidden">{last_date}</p>
              </li>
              <hr />
            </>
          ))}
        </ul>
      </Section>
    </>
  );
}

// Render Filters Using <Select> component, needs some work
// does currently not have the option to select the default option to reset filters

// <div className="flex gap-4 pb-4">
//   {filters.map(({ label, property, options }) => (
//     <Select
//       key={property}
//       onValueChange={(value) => handleFilterChange(property, value)}
//     >
//       <SelectTrigger className="ui-border rounded-sm p-2">
//         <SelectValue placeholder={label} />
//       </SelectTrigger>
//       <SelectContent className="bg-background">
//         {options.map(({ label, value }) => (
//           <SelectItem key={value} value={value}>
//             {label}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   ))}
// </div>;

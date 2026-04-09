'use client';
import Image from "next/image"
import { useLocale } from "@/features/translations/translations-context";

export default function Services() {
  const t = useLocale();
  const services = [
    { id: 1, name: t["services.service1Name"], description: t["services.service1Description"] },
    { id: 2, name: t["services.service2Name"], description: t["services.service2Description"] },
    { id: 3, name: t["services.service3Name"], description: t["services.service3Description"] },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{t["services.title"]}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="border rounded-lg p-4">
            <Image
              src="/placeholder.svg"
              alt={service.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


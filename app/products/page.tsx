'use client'
import Image from "next/image"
import { useLocale } from "@/features/translations/translations-context";

export default function Products() {
  const t = useLocale();
  const products = [
    { id: 1, name: t["products.product1Name"], description: t["products.product1Description"] },
    { id: 2, name: t["products.product2Name"], description: t["products.product2Description"] },
    { id: 3, name: t["products.product3Name"], description: t["products.product3Description"] },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{t["products.title"]}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <Image
              src="/placeholder.svg"
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


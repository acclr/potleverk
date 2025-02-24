import Image from "next/image"
import cncImage from "../../public/product-images/cnc-sign.jpg"
import ideaImage from "../../public/product-images/ideas-bulb.jpg"
import printImage from "../../public/product-images/print-collection.jpg"
export default function Products() {
  const products = [
    { id: 1, name: "CNC", description: "Vi lager alt fra skilt og dørdekor til gravering på kontorskilt og bordskånere. Skreddersydd design merket med navn og logo.", image: cncImage },
    { id: 2, name: "Design", description: "Sammen finner vi de beste løsningene for din bedrift, uansett om du har en klar visjon eller trenger veiledning.", image: ideaImage },
    { id: 3, name: "Print", description: "Uansett behov, sørger vi for at deres trykksaker skiller seg ut og fanger oppmerksomhet.", image: printImage },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <Image
              src={product.image}
              alt={product.name}
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


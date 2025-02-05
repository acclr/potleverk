import Image from "next/image"

export default function Services() {
  const services = [
    { id: 1, name: "Service 1", description: "Description of Service 1" },
    { id: 2, name: "Service 2", description: "Description of Service 2" },
    { id: 3, name: "Service 3", description: "Description of Service 3" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
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


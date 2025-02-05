import Image from "next/image"

export default function Contact() {
  const employees = [
    { name: "Daniel Ehrenberg-Rasmussen", role: "Position" },
    { name: "Elliott Ehrenberg", role: "Position" },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
        <p className="mb-4">Hoveveien 38, 4306 Sandnes, Norway</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2057.3046718238947!2d5.729720776678886!3d58.85186447301882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463a350f71807639%3A0x886c83c5a7a2e73a!2sHoveveien%2038%2C%204306%20Sandnes%2C%20Norway!5e0!3m2!1sen!2sus!4v1688484343321!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full rounded-lg"
        ></iframe>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {employees.map((employee, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Image src="/placeholder.svg" alt={employee.name} width={100} height={100} className="rounded-full" />
              <div>
                <h3 className="font-semibold">{employee.name}</h3>
                <p>{employee.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


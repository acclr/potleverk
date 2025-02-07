import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 py-12">
        <div className="space-y-6">
          <p className="text-gray-600">
          Vi er et allsidig byrå som spesialiserer oss på skreddersydde løsninger innen profilering, design, trykk og CNC-arbeid. 
          Vi hjelper bedrifter med å synliggjøre sin merkevare gjennom kreative og praktiske løsninger, fra idé til ferdig produkt. 
          Uansett om du trenger trykksaker, skilt eller unike design, sørger vi for at alt blir levert med høy kvalitet og tilpasset dine behov.
          </p>
          <Button className="bg-secondary hover:bg-secondary/90 text-white w-full md:w-auto">Bestill her</Button>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/product-images/stickers-vinyl.jpg"
            alt="CNC Machine"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 space-y-20">
        {/* Tilpasset profilering */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/product-images/print-collection.jpg"
              alt="Design Software"
              fill
              className="rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Tilpasset profilering</h2>
            <p className="text-gray-600">
              Vi spesialiserer oss på å finne de beste løsningene for din bedrift, uansett om du har en klar visjon
              eller trenger veiledning. Vår helhetlige tilnærming betyr at du får trenger å være designer – vi sørger
              det for deg. Fra idé til ferdig produkt, vi er her for å hjelpe deg med å skape profileringsprosessen som
              passer dine behov.
            </p>
          </div>
        </div>
        {/* CNC */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">CNC</h2>
            <p className="text-gray-600">
              Med vår CNC-fres kan vi lage alt fra små og detaljerte til gravering og konturskjæring på bordplater. Våre
              presisjonsmaskiner sikrer nøyaktig utførelse av dine prosjekter, uansett størrelse eller kompleksitet.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/product-images/print-collection.jpg"
              alt="CNC Machine Work"
              fill
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Trykk */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/product-images/print-collection.jpg"
              alt="Print Samples"
              fill
              className="rounded-lg"
            />

          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Trykk</h2>
            <p className="text-gray-600">
              Vi leverer et bredt spekter av trykkprodukter som gir din bedrift et profesjonelt og synlig uttrykk. Enten
              dere trenger plakater, rollups, foliering, klistermerker eller bannere, sørger vi hos kvalitet på alle
              produkter. Vi tilbyr også rådgivning for å finne de trykkproduktene som best tilfredsstiller dine behov,
              sørger vi for at dine trykksaker skiller seg ut og fanger oppmerksomheten.
            </p>
          </div>
        </div>

        {/* Design */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Design</h2>
            <p className="text-gray-600">
              Vårt designteam tilbyr kreative og profesjonelle løsninger tilpasset dine behov. Vi tar hånd om hele
              prosessen fra idé til ferdig produkt. Fra å være på den kreative, visuelle uttrykk er både spennende og
              effektivt. Uansett prosjektets størrelse, sørger vi for at designet kommuniserer klart og definitivt.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/product-images/print-collection.jpg"
              alt="Design Process"
              fill
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}


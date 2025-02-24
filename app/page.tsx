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
          Fra utforming av profil til trykksaker, skilt eller unike design, sørger vi for at alt blir levert med høy kvalitet og tilpasset dine behov.
          </p>
          <Button className="bg-secondary hover:bg-secondary/90 text-white w-full md:w-full text-center">Bestill her</Button>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/product-images/ideas-bulb.jpg"
            alt="CNC Machine"
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 space-y-20">
        {/* Tilpasset profilering */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px]">
            <Image
              src="/product-images/stickers-vinyl.jpg"
              alt="Design Software"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Tilpasset profilering</h2>
            <p className="text-gray-600">
            Vi spesialiserer oss på å skape optimale løsninger for din bedrift, enten du har en klar visjon eller trenger veiledning. 
            Med vår helhetlige tilnærming trenger du ikke bekymre deg for design – vi tar hånd om hele prosessen. 
            Fra idé til ferdig produkt står vi klare til å utvikle en profilering som matcher dine behov perfekt
            </p>
          </div>
        </div>
        {/* CNC */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">CNC</h2>
            <p className="text-gray-600">
              Med vår CNC-fres kan vi lage alt fra små og detaljerte graveringer til konturskjæring på bordplater. Enten du vil ha skreddesydde kontorartikkler eller unike gaveartikler. 
              Vi sikrer nøyaktig utførelse av dine prosjekter. Sammen kan vi komme fram til minneverdige og unike løsninger.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/product-images/cnc-sign.jpg"
              alt="CNC Machine Work"
              fill
              className="rounded-lg object-cover"
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
              className="rounded-lg object-cover"
            />

          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Trykk</h2>
            <p className="text-gray-600">
              Vi leverer et bredt spekter av trykkprodukter som gir din bedrift et profesjonelt og synlig uttrykk. Enten
              dere trenger plakater, rollups, foliering, klistermerker eller bannere, sørger vi for kvalitet på alle
              produkter. Vi tilbyr også rådgivning for å finne de trykkproduktene som best tilfredsstiller dine behov,
              vi vil at dine trykksaker skal skille seg ut og fange oppmerksomhet.
            </p>
          </div>
        </div>

        {/* Design */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Design</h2>
            <p className="text-gray-600">
            Vårt designteam tilbyr kreative og profesjonelle løsninger skreddersydd for dine behov. 
            Vi tar hånd om hele prosessen fra idé til ferdig produkt, og sikrer at det visuelle uttrykket blir både spennende og effektivt. 
            Uansett prosjektets størrelse, sørger vi for at designet kommuniserer ditt budskap klart og tydelig.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/product-images/print-collection.jpg"
              alt="Design Process"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}


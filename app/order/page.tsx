"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";
import { useAuth } from "@/features/firebase/auth";
import { useRouter } from "next/navigation";
import Section from "@/components/ui/section";
import { useNotify } from "@/features/notifications";
import Link from "next/link";
import { OrderForm } from "./components/order-form";

export default function PlaceOrderPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { notify } = useNotify();
  const { placeOrder, uploading } = usePlaceOrder();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isPickup, setIsPickup] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Address fields state
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [instructions, setInstructions] = useState("");

  if (!user?.uid) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold">Bestilling</h1>
        <p className="text-gray-600 mt-2">
          Du må være innlogget for å legge inn bestilling.
        </p>
        <div className="mt-6">
          <Button onClick={() => router.push("/account?tab=login")}>
            Logg inn
          </Button>
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await placeOrder({
      subject,
      description,
      is_pickup: isPickup,
      attachments: files,
    })
      .then(() => {
        notify("success", "Bestilling sendt");
        setIsSubmitted(true);
      })
      .catch((e) => {
        notify("error", (e as Error).message);
        setIsSubmitted(false);
      });
  }

  const resetForm = () => {
    setIsSubmitted(false);
    setSubject("");
    setDescription("");
    setIsPickup(false);
    setFiles([]);
    setAddress("");
    setPostalCode("");
    setCity("");
    setCountry("");
    setInstructions("");
  };

  return (
    <Section boxed>
      {isSubmitted ? (
        <div className="flex flex-col w-full rounded-xl bg-white/50 p-6 py-12 items-center justify-center text-center gap-4">
          <h3 className="text-3xl lg:text-2xl font-semibold">
            Bestilling sendt
          </h3>
          <p>
            Tack för din beställning. Vi kommer att kontakta dig så fort vi kan.
          </p>
          <div className="flex flex-row gap-4">
            <Link href="/dashboard">
              <Button>Mine bestillinger</Button>
            </Link>
            <Button variant="outline" onClick={resetForm}>
              Ny bestilling
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex max-w-2xl mx-auto w-full flex-col items-start justify-start">
          <OrderForm
            subject={subject}
            setSubject={setSubject}
            description={description}
            setDescription={setDescription}
            isPickup={isPickup}
            setIsPickup={setIsPickup}
            files={files}
            setFiles={setFiles}
            onSubmit={onSubmit}
            uploading={uploading}
            address={address}
            setAddress={setAddress}
            postalCode={postalCode}
            setPostalCode={setPostalCode}
            city={city}
            setCity={setCity}
            country={country}
            setCountry={setCountry}
            instructions={instructions}
            setInstructions={setInstructions}
          />
        </div>
      )}
    </Section>
  );
}
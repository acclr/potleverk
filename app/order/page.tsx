"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";
import { useAuth } from "@/features/firebase/auth";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Section from "@/components/ui/section";
import { useNotify } from "@/features/notifications";
import Link from "next/link";

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
            <Button variant="outline" onClick={() => setIsSubmitted(false)}>
              Ny bestilling
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 mx-auto gap-12 lg:flex lg:flex-col lg:w-full">
          <div className="flex flex-col items-start justify-start w-full">
            <form className="flex flex-col w-full gap-4" onSubmit={onSubmit}>
              <h3 className="text-3xl lg:text-2xl font-semibold">
                Din beställning
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium">Emne</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Hva ønsker du?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Beskrivelse</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Beskriv bestillingen"
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Vedlegg</label>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
                {files?.length ? (
                  <p className="text-xs text-gray-500">
                    {files.length} fil(er) valgt
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  title="Henter selv"
                  id="pickup"
                  className="text-sm"
                  checked={isPickup}
                  onCheckedChange={setIsPickup}
                />
                <Label>Henter selv</Label>
              </div>
              {!isPickup && (
                <div className="flex flex-col w-full space-y-2">
                  <strong>Leveransadresse (Frakt tillkommer)</strong>
                  <label className="text-sm font-medium">Adresse</label>
                  <Input
                    value={""}
                    onChange={(e) => {}}
                    placeholder="Adresse"
                  />
                  <Input
                    value={""}
                    onChange={(e) => {}}
                    placeholder="Postnummer"
                  />
                  <Input value={""} onChange={(e) => {}} placeholder="Stad" />
                  <Input value={""} onChange={(e) => {}} placeholder="Land" />
                  <Textarea
                    value={""}
                    onChange={(e) => {}}
                    placeholder="Övrig instruktion t.ex. c/o, etc."
                  />
                </div>
              )}
              <div className="mt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg"
                  disabled={uploading}
                >
                  {uploading ? "Sender…" : "Send bestilling"}
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:hidden flex flex-col items-start justify-start w-full relative">
            <Image
              src="https://images.prismic.io/potleverk/aLgpFGGNHVfTOj2H_ideas-bulb.webp?auto=format,compress"
              width={1024}
              height={1024}
              className="object-cover w-full rounded-xl overflow-hidden"
              alt="asd"
            />
          </div>
        </div>
      )}
    </Section>
  );
}

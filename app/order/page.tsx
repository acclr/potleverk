"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/features/firebase/auth";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function PlaceOrderPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { placeOrder, uploading } = usePlaceOrder();

  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isPickup, setIsPickup] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

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
    });
    toast({ title: "Bestilling sendt" });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold">Bestilling</h1>
      <Card className="p-6 mt-6">
        <form className="space-y-5" onSubmit={onSubmit}>
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
          <div>
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
      </Card>
    </div>
  );
}

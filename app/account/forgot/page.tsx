"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/features/firebase/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      toast({ title: "E-post for tilbakestilling sendt" });
      router.push("/account?tab=login");
    } catch (error: unknown) {
      toast({ title: "Feil ved tilbakestilling", description: (error as Error).message || "Ukjent feil" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold">Glemt passord</h1>
      <p className="text-gray-600 mt-2">{t('forgotPassword.text')}</p>
      <Card className="p-6 mt-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">E-post</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={loading}>
              {loading ? t('sending.text') : t('sendBackLink.text') }
            </Button>
            <Button type="button" variant="ghost" onClick={() => router.push("/account?tab=login")}>{ t('abort.text')}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}



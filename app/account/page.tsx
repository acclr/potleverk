"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login, register, resetPassword } from "@/features/firebase/auth";
import { useAuth } from "@/features/firebase/auth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

function Section({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="max-w-md w-full mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {subtitle ? <p className="text-gray-600 mt-2">{subtitle}</p> : null}
      <Card className="p-6 mt-6">{children}</Card>
    </div>
  );
}

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const search = useSearchParams();
  const { toast } = useToast();

  const initialTab = useMemo(() => search.get("tab") || "login", [search]);
  const [tab, setTab] = useState<string>(initialTab);

  useEffect(() => setTab(initialTab), [initialTab]);

  useEffect(() => {
    if (user?.uid) {
      // If logged in, show simple account summary
    }
  }, [user]);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast({ title: "Innlogging vellykket" });
      router.push("/order");
    } catch (error: unknown) {
      toast({ title: "Kunne ikke logge inn", description: (error as Error)?.message || "Ukjent feil" });
    } finally {
      setLoading(false);
    } 
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(registerEmail, registerPassword, { name: registerName, phone: registerPhone });
      toast({ title: "Konto opprettet" });
      router.push("/order");
    } catch (error: unknown) {
      toast({ title: "Kunne ikke registrere", description: (error as Error)?.message || "Ukjent feil" });
    } finally {
      setLoading(false);
    }
  }

  if (user?.uid) {
    return (
      <Section title="Min konto" subtitle="Du er logget inn.">
        <div className="space-y-2 text-sm text-gray-700">
          <div><span className="font-medium">Navn:</span> {user?.userDetails?.name || "-"}</div>
          <div><span className="font-medium">E-post:</span> {user?.email || user?.userDetails?.email || "-"}</div>
          <div><span className="font-medium">Telefon:</span> {user?.userDetails?.phone || "-"}</div>
        </div>
        <div className="mt-6">
          <Link href="/account/orders">
            <Button>
              Gå til mine bestillinger
            </Button>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Konto" subtitle="Logg inn eller opprett en konto.">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Logg inn</TabsTrigger>
          <TabsTrigger value="register">Registrer</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="mt-6">
          <form className="space-y-4" onSubmit={onLogin}>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-post</label>
              <Input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Passord</label>
              <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit" disabled={loading}>
                {loading ? "Logger inn…" : "Logg inn"}
              </Button>
              <Button type="button" variant="ghost" onClick={() => router.push("/account/forgot")}>Glemt passord?</Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="register" className="mt-6">
          <form className="space-y-4" onSubmit={onRegister}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Navn</label>
              <Input value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefon</label>
              <Input value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-post</label>
              <Input type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Passord</label>
              <Input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Registrerer…" : "Opprett konto"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </Section>
  );
}



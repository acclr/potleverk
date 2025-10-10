"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/features/firebase/auth";
import { ArrowLeft, LoaderIcon, ShoppingBag, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserHeader } from "./components";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const { t } = useTranslation();

  useEffect(() => {
    if (!user?.uid) {
      router.push("/account");
    }
  }, [user, router]);

  if (!user?.uid) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-[999] bg-gray-50/50">
      <UserHeader />

      <div className="container mx-auto px-6 py-8">
        {/* Navigation cards */}
        <div className="grid grid-cols-1 mdup:grid-cols-2 gap-6 mb-8">
          {[
            {
              title: t('myOrdersTitle.text'),
              href: "/dashboard/orders",
              icon: ShoppingBag,
              description: t('myOrdersDesc.text'),
            },
            {
              title: t('myOrdersEditProfileTitle.text'),
              href: "/dashboard/edit-profile",
              icon: User,
              description: t('myOrdersEditProfileDesc.text'),
            },
          ].map((item) => (
            <Link href={item.href}>
              <Card className="cursor-pointer rounded-xl">
                <CardHeader className="!p-4 !pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-secondary-950 rounded-full flex items-center justify-center p-1.5">
                      <item.icon size={20} color="white" />
                    </div>
                    <CardTitle className="font-[600] text-[18px] md:text-[16px]">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="!p-4 !pt-0">
                  <p className="md:text-[13px]">{item.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
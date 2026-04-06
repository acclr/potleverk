"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/firebase/auth";
import { useUpdateUser } from "@/features/firebase/firestore/queries/users.query";
import { LoaderIcon, Save, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserHeader } from "../components";
import { BackButton } from "../components/back-button";
import { useLocale } from "@/features/translations/translations-context";

export default function EditProfilePage() {
  const { user, refreshUserData } = useAuth();
  const router = useRouter();
  const updateUser = useUpdateUser();
  const t = useLocale();
  // Form state
  const [formData, setFormData] = useState({
    // Personal details
    name: "",
    email: "",
    phone: "",
    personalAddress: "",
    personalCity: "",
    personalPostalCode: "",

    // Organization details
    orgName: "",
    orgNumber: "",
    orgAddress: "",
    orgCity: "",
    orgPostalCode: ""
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      router.push("/account");
      return;
    }

    // Populate form with current user data
    setFormData({
      name: user.userDetails?.name || "",
      email: user.userDetails?.email || "",
      phone: user.userDetails?.phone || "",
      personalAddress: user.userDetails?.address?.street || "",
      personalCity: user.userDetails?.address?.city || "",
      personalPostalCode: user.userDetails?.address?.zip || "",

      orgName: user.orgDetails?.orgName || "",
      orgNumber: user.orgDetails?.orgNumber || "",
      orgAddress: user.orgDetails?.orgAddress?.street || "",
      orgCity: user.orgDetails?.orgAddress?.city || "",
      orgPostalCode: user.orgDetails?.orgAddress?.zip || ""
    });
  }, [user, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    setIsSaving(true);
    try {
      const updates = {
        userDetails: {
          name: formData.name || undefined,
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          address: (formData.personalAddress || formData.personalCity || formData.personalPostalCode) ? {
            street: formData.personalAddress || undefined,
            city: formData.personalCity || undefined,
            zip: formData.personalPostalCode || undefined,
          } : undefined,
        },
        orgDetails: (formData.orgName || formData.orgNumber || formData.orgAddress || formData.orgCity || formData.orgPostalCode) ? {
          orgName: formData.orgName || undefined,
          orgNumber: formData.orgNumber || undefined,
          orgAddress: (formData.orgAddress || formData.orgCity || formData.orgPostalCode) ? {
            street: formData.orgAddress || undefined,
            city: formData.orgCity || undefined,
            zip: formData.orgPostalCode || undefined,
          } : undefined,
        } : undefined,
      };

      await updateUser.mutateAsync({
        id: user.uid,
        updates
      });

      // Refresh user data in auth context
      if (refreshUserData) {
        await refreshUserData();
      }

      // Show success (you might want to add a toast notification here)
      console.log("Profile updated successfully");

    } catch (error) {
      console.error("Error updating profile:", error);
      // You might want to add error handling/toast here
    } finally {
      setIsSaving(false);
    }
  };

  if (!user?.uid) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-max bg-gray-50/50">
      <UserHeader
        title={t["dashboard.editProfile"]}
        subtitle={t["dashboard.updateInformation"]}
      />

      <div className="container w-full mx-auto flex flex-col gap-6 px-6 py-8">
        <BackButton />

        <div className="flex w-full flex-row lg:flex-col items-stretch justify-start gap-8">
          {/* Personal Details Card */}
          <Card className="flex-[1] cursor-default rounded-xl">
            <CardHeader className="!p-4 !pb-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-secondary-950 rounded-full flex items-center justify-center p-1.5">
                  <User size={20} color="white" />
                </div>
                <CardTitle className="font-[600] text-[18px] md:text-[16px]">
                  {t["dashboard.personalInformation"]}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="!p-4 !pt-0 space-y-4">
              <p className="md:text-[13px] text-gray-600">{t["dashboard.personalInformationDescription"]}</p>
              <div className="grid w-full grid-cols-2 md:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t["dashboard.name"]}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t["dashboard.yourName"]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t["dashboard.email"]}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={t["dashboard.yourEmail"]}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t["dashboard.phoneNumber"]}</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder={t["dashboard.yourPhoneNumber"]}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-bold">{t["dashboard.address"]}</h4>
                <div className="space-y-2">
                  <Label htmlFor="personalAddress">{t["dashboard.streetAddress"]}</Label>
                  <Input
                    id="personalAddress"
                    value={formData.personalAddress}
                    onChange={(e) => handleInputChange("personalAddress", e.target.value)}
                    placeholder={t["dashboard.streetName"]}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="personalCity">{t["dashboard.city"]}</Label>
                    <Input
                      id="personalCity"
                      value={formData.personalCity}
                      onChange={(e) => handleInputChange("personalCity", e.target.value)}
                      placeholder={t["dashboard.yourCity"]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="personalPostalCode">{t["dashboard.postalCode"]}</Label>
                    <Input
                      id="personalPostalCode"
                      value={formData.personalPostalCode}
                      onChange={(e) => handleInputChange("personalPostalCode", e.target.value)}
                      placeholder={t["dashboard.yourPostalCode"]}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organization Details Card */}
          <Card className="flex-[1] cursor-default rounded-xl">
            <CardHeader className="!p-4 !pb-2">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-secondary-950 rounded-full flex items-center justify-center p-1.5">
                  <Building size={20} color="white" />
                </div>
                <CardTitle className="font-[600] text-[18px] md:text-[16px]">
                  {t["dashboard.organizationDetails"]}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="!p-4 !pt-0 space-y-4">
              <p className="md:text-[13px] text-gray-600">{t["dashboard.organizationInformation"]}</p>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">{t["dashboard.organizationName"]}</Label>
                  <Input
                    id="orgName"
                    value={formData.orgName}
                    onChange={(e) => handleInputChange("orgName", e.target.value)}
                    placeholder={t["dashboard.yourOrganizationName"]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgNumber">{t["dashboard.organizationNumber"]}</Label>
                  <Input
                    id="orgNumber"
                    value={formData.orgNumber}
                    onChange={(e) => handleInputChange("orgNumber", e.target.value)}
                    placeholder={t["dashboard.yourOrganizationNumber"]}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold">{t["dashboard.organizationAddress"]}</h4>
                <div className="space-y-2">
                  <Label htmlFor="orgAddress">{t["dashboard.streetAddress"]}</Label>
                  <Input
                    id="orgAddress"
                    value={formData.orgAddress}
                    onChange={(e) => handleInputChange("orgAddress", e.target.value)}
                    placeholder={t["dashboard.orgStreetName"]}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgCity">{t["dashboard.city"]}</Label>
                    <Input
                      id="orgCity"
                      value={formData.orgCity}
                      onChange={(e) => handleInputChange("orgCity", e.target.value)}
                      placeholder={t["dashboard.yourCity"]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgPostalCode">{t["dashboard.postalCode"]}</Label>
                    <Input
                      id="orgPostalCode"
                      value={formData.orgPostalCode}
                      onChange={(e) => handleInputChange("orgPostalCode", e.target.value)}
                      placeholder={t["dashboard.orgPostalCode"]}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            {isSaving ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? t["dashboard.saving"] : t["dashboard.saveChanges"]}
          </Button>
        </div>
      </div>
    </div>
  );
}

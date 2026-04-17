"use client";

import { useRouter } from "next/navigation";
import { useAuth, logout } from "@/features/firebase/auth";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserHeaderProps {
  title?: string;
  subtitle?: string;
}

export function UserHeader({
  title,
  subtitle,
}: UserHeaderProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const userName = user?.userDetails?.name || user?.orgDetails?.orgName || "Bruker";

  return (
    <div className="border-black/10 border bg-white p-5 md:px-0 md:py-3">
      <div className="mx-auto container">
        <div className="mx-auto">
          {/* Main header content */}
          <div className="flex items-center justify-between">
            {/* Left side - User info and title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-10 w-10 min-w-10 min-h-10 bg-gray-100 rounded-full">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex flex-col items-start justify-start">
                {title ? (
                  <>
                    <h1 className="text-2xl md:leading-none md:!text-base font-bold text-gray-900">
                      {title}
                    </h1>
                    {subtitle ? (
                      <p className="text-xs text-gray-500">
                        {subtitle}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl md:text-base md:leading-snug font-semibold text-gray-900">
                      Velkommen, {userName}
                    </h1>

                    {user?.meta?.createdAt && (
                      <p className="text-xs text-gray-500">
                        Opprettet{" "}
                        {new Date(user.meta.createdAt).toLocaleDateString(
                          "nb-NO"
                        )}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right side - Logout button */}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="!p-0 lg:!size-10 min-w-10 lgup:!px-3 lg:rounded-full flex items-center justify-center text-red-600 hover:text-red-700 hover:bg-red-50 gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="lg:hidden">Logg ut</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

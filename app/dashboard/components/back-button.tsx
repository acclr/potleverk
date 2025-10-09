import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface BackButtonProps {
  href?: string;
}

export const BackButton = ({ href = "/dashboard" }: BackButtonProps) => {

    const { t } = useTranslation();

    <Link href={href}>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            { t('componentBackButton.text')}
        </Button>
    </Link>
}
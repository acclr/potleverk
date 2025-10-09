import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";

export type UIButtonProps = {
  text: string;
  link: string;
  type: "primary" | "secondary" | "hollow";
}[];

const buttonTypeMap = {
  primary: "default",
  muted: "outline",
};

export function renderButtons(buttons: UIButtonProps) {
  return (
    <div className="mt-2 flex space-x-2">
      {buttons?.map((button, index) => (
        <Link key={index} href={button.link}>
          <Button
            key={index}
            variant={buttonTypeMap[button.type] as ButtonProps["variant"]}
            size="lg"
            className="max-w-max"
          >
            {button.text}
          </Button>
        </Link>
      ))}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" size="sm" className="font-normal w-full" asChild>
      <Link to={href}>{label}</Link>
    </Button>
  );
};

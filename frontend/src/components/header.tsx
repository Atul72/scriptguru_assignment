import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
  description: string;
}

export const Header = ({ label, description }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold")}>{label}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

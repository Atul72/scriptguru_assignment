import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { BackButton } from "@/components/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  description: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  description,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} description={description} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        {backButtonLabel && backButtonHref && (
          <BackButton label={backButtonLabel} href={backButtonHref} />
        )}
      </CardFooter>
    </Card>
  );
};

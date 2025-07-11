import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TitleForm } from "@/ui/title-form";

export const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto  border-none max-w-2xl">
        <TitleForm />
      </DialogContent>
    </Dialog>
  );
};

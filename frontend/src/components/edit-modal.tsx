import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EditForm } from "@/ui/edit-form";

export const EditModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 w-auto  border-none max-w-2xl">
        <EditForm />
      </DialogContent>
    </Dialog>
  );
};

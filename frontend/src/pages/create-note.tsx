import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TitleModal } from "@/components/title-modal";
import { EditModal } from "@/components/edit-modal";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <main className="flex h-full w-full flex-col items-center justify-center bg-amber-400">
        <div className="space-y-6 text-center ">
          <h1
            className={cn("text-6xl font-semibold text-white drop-shadow-md")}
          >
            📝 Note App
          </h1>
          <p className="text-black text-lg  ">
            A collaborative note-taking app
          </p>
          <div className="flex flex-col gap-4">
            <TitleModal>
              <Button variant="outline" size="lg" className=" cursor-pointer">
                Create Note
              </Button>
            </TitleModal>
            <EditModal>
              <Button variant="outline" size="lg">
                Edit Note
              </Button>
            </EditModal>
          </div>
        </div>
      </main>
    </div>
  );
}

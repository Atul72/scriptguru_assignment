import { CardWrapper } from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TitleForm = () => {
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    try {
      setIsCreating(true);
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/notes/",
        {
          title,
          content: "",
          updatedAt: new Date(),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      navigate(`/note/${response.data.note._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <CardWrapper headerLabel="Create Note" description="Create a new note">
      <div className="flex flex-col gap-y-4 p-4">
        <Textarea
          placeholder="Title"
          className="resize-none border-none focus-visible:ring-offset-1 focus-visible:border-none focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-amber-300 focus-visible:ring-amber-300 focus-visible:ring-1 transition-all duration-500"
          value={title}
          disabled={isCreating}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant="outline"
          size="lg"
          className="w-full cursor-pointer bg-amber-300 hover:bg-amber-400"
          onClick={handleCreateNote}
          disabled={title.length === 0 || isCreating}
        >
          {isCreating ? "Creating..." : "Create Note"}
        </Button>
      </div>
    </CardWrapper>
  );
};

import { CardWrapper } from "@/components/card-wrapper";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EditForm = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.length < 2) return;

    const delayDebounce = setTimeout(async () => {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/notes/search?query=${search}`
      );
      setResults(response.data);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <CardWrapper headerLabel="Edit Note" description="Edit a note">
      <div className="flex flex-col gap-y-4 p-4">
        <Textarea
          placeholder="Search for a note"
          className="resize-none border-none focus-visible:ring-offset-1 focus-visible:border-none focus-visible:outline-none focus-visible:shadow-xl focus-visible:shadow-amber-300 focus-visible:ring-amber-300 focus-visible:ring-1 transition-all duration-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul className="mt-2 bg-white rounded shadow p-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {results.map((note: any) => (
            <li
              key={note._id}
              className="cursor-pointer hover:bg-gray-100 px-2 py-1"
              onClick={() => navigate(`/note/${note._id}`)}
            >
              <div className="font-semibold">{note.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </CardWrapper>
  );
};

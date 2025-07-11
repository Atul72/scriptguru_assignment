import socket from "@/services/socket";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
// import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const NoteEditor = () => {
  const { id } = useParams();
  // const [content, setContent] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeUsers, setActiveUsers] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      socket.emit("note_update", { noteId: id, content: newContent });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        axios.put(`http://127.0.0.1:3000/api/v1/notes/${id}`, {
          content: newContent,
          updatedAt: new Date(),
        });
        setLastUpdated(new Date());
      }, 5000);
    },
  });

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`http://127.0.0.1:3000/api/v1/notes/${id}`);
      if (editor) {
        editor.commands.setContent(res.data.note.content || "");
      }
      setLastUpdated(res.data.note.updatedAt);
    };
    fetchNote();

    socket.emit("join_note", id);

    socket.on("note_update", ({ content }) => {
      if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content || "");
      }
    });

    socket.on("active_users", (users) => {
      setActiveUsers(users.length);
    });

    return () => {
      socket.off("note_update");
      socket.off("active_users");
    };
  }, [editor, id]);

  // const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const newContent = e.target.value;
  //   setContent(newContent);
  //   socket.emit("note_update", { noteId: id, content: newContent });

  //   if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //   timeoutRef.current = setTimeout(() => {
  //     axios.put(`http://127.0.0.1:3000/api/v1/notes/${id}`, {
  //       content: newContent,
  //       updatedAt: new Date(),
  //     });
  //     setLastUpdated(new Date());
  //   }, 5000);
  // };

  const handleManualSave = async () => {
    try {
      const res = await axios.put(`http://127.0.0.1:3000/api/v1/notes/${id}`, {
        content: editor?.getHTML() || "",
        updatedAt: new Date(),
      });
      if (editor) {
        editor.commands.setContent(res.data.note.content || "");
      }
      setLastUpdated(res.data.note.updatedAt);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="text-gray-600">Active users: {activeUsers}</div>
      {/* <TextareaAutosize
        className="w-full border p-2 mt-2 text-lg focus-visible:outline-none focus-visible:ring-offset-0 
        bg-amber-200 focus-visible:ring-1 focus-visible:ring-amber-300 focus-visible:shadow-xl focus-visible:shadow-amber-300"
        value={content}
        onChange={handleChange}
        minRows={10}
      /> */}
      {editor && (
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1 border rounded ${
              editor.isActive("bold") ? "bg-blue-500 text-white" : ""
            }`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1 border rounded ${
              editor.isActive("italic") ? "bg-blue-500 text-white" : ""
            }`}
          >
            Italic
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`px-3 py-1 border rounded ${
              editor.isActive("heading", { level: 1 })
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`px-3 py-1 border rounded ${
              editor.isActive("heading", { level: 2 })
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            H2
          </button>
        </div>
      )}

      <div className="border rounded p-4 min-h-[300px] max-h-[500px] overflow-y-auto prose max-w-none bg-white shadow-md focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
        <EditorContent editor={editor} />
      </div>
      <Button className="mt-2 cursor-pointer" onClick={handleManualSave}>
        Save
      </Button>
      <div className="text-sm text-gray-400 mt-2">
        Last updated:{" "}
        {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Never"}
      </div>
    </div>
  );
};

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateNote from "./pages/create-note";
import NotePage from "./pages/note-page";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </Router>
  );
}

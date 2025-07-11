# 📜 Real-Time Collaborative Notes App

A full-stack MERN-based collaborative note editor with real-time editing.

---

## ✨ Live URLs

- **Frontend (Vercel)**: [https://notes.72xdevs.space/](https://notes.72xdevs.space/)
- **Backend (Render)**: [https://scriptguru-assignment-1.onrender.com/](https://scriptguru-assignment-1.onrender.com/)

---

## ⚙️ Backend Setup (`/backend`)

### 1. Clone the repository

```bash
git clone https://github.com/Atul72/scriptguru_assignment.git
cd scriptguru-assignment/backend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create `.env` file

```env
# .env
DATABASE_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/realtimenotes
PORT=3000
```

> You can copy `.env.example` as a starting point.

### 4. Start the server

```bash
pnpm start
```

---

## 🎨 Frontend Setup (`/frontend`)

### 1. Move to frontend folder

```bash
cd /scriptguru-assignment/frontend
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create `.env` file

```bash
cd /scriptguru-assignment/frontend/src/services/backend-url.ts

# Replace the URL with your backend URL
export const BACKEND_URL = "https://your-backend-url.onrender.com";
```

### 4. Start the React app

```bash
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📆 Tech Stack

- **Frontend**: React, Vite, TailwindCSS, TipTap (Rich Text Editor), Socket.IO
- **Backend**: Node.js, Express, MongoDB, Mongoose, Socket.IO
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (frontend), Render (backend)

---

## 👨‍💻 Author

Built with ❤️ by [Atul](https://github.com/Atul72)

---

## 📜 License

MIT License – feel free to use and contribute!

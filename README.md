# 🎨 Multiplayer Drawing & Guessing Game

A real-time multiplayer drawing and guessing game inspired by Skribbl.io, built using the MERN Stack and Socket.IO.

## 🚀 Live Demo

Frontend & Backend:

https://gameproject-pxor.onrender.com/

---

## 📌 Features

* Create and Join Private Rooms
* Real-time Multiplayer Gameplay
* Live Drawing Canvas
* Word Guessing System
* Real-time Chat
* Player Leaderboard
* Round-based Gameplay
* Host Controls
* Score Tracking
* Socket.IO Real-time Communication
* Responsive UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* dotenv

### Deployment

* Render

---

## 📂 Project Structure

```bash
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   └── socket
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── socket
│   └── utils
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/game-project.git
cd game-project
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=7000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend (.env)

```env
VITE_SERVER_URL=http://localhost:7000
```

---

## ▶️ Run Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## 🎮 How To Play

1. Create a Room.
2. Share the Room Code with friends.
3. Players join the room.
4. One player draws a selected word.
5. Other players guess the word through chat.
6. Correct guesses earn points.
7. After multiple rounds, the player with the highest score wins.

---

## 📸 Screenshots

* Room Creation
* Lobby
* Drawing Canvas
* Chat System
* Leaderboard

(Add screenshots here)

---

## 👨‍💻 Author

**Jhunna Kumar**

B.Tech (AI & ML)
Jodhpur Institute of Engineering & Technology

GitHub: https://github.com/jhunnaroy

---

## 📜 License

This project is developed for learning and portfolio purposes.

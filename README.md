#  CodeSphere — Scalable Real-Time Code Collaboration Platform  

> **Collaborate. Code. Ship. Together.**  
> CodeSphere lets multiple developers write and edit code together in real time — just like VS Code Live Share, but faster and self-hosted.  

---

##  Overview  

CodeSphere is a **real-time code collaboration platform** that allows distributed teams to edit code, chat, and share live sessions instantly — all powered by WebSockets, Dockerized microservices, and a scalable backend.  

It was built to **simulate the collaborative engineering workflow at Meta**, where developers continuously push code across large teams with sub-200ms latency and concurrent live sessions.  

This project demonstrates:
- **Low-latency real-time communication** using Socket.io  
- **State synchronization** between multiple users  
- **Persistent collaborative sessions** stored in MongoDB  
- **Scalable containerized services** orchestrated via Docker Compose  

---

##  Features  

| Feature | Description |
|----------|-------------|
| 💬 **Live Collaboration** | Multiple users can edit the same code in real time |
| 🔤 **Syntax Highlighting** | Built-in Monaco editor (same core as VS Code) |
| 🧠 **Auto-Sync Sessions** | Code auto-saves to MongoDB and loads instantly |
| 👥 **User Presence** | Live user list with auto-updates when someone joins/leaves |
| 🗨️ **In-Room Chat** | Real-time chat synced across all users in the room |
| 🧰 **Scalable Backend** | Node.js + Express API with Redis Pub/Sub |
| 🐳 **Dockerized Deployment** | Seamless container orchestration with Nginx & Docker Compose |
| ⚙️ **Session Management API** | RESTful endpoints for creating & managing sessions |

---

##  Architecture Diagram  

        ┌──────────────────────────┐
        │        Client (React)    │
        │  • Monaco Editor         │
        │  • Socket.io-client      │
        │  • Chat + Room UI        │
        └───────────┬──────────────┘
                    │
                    │ WebSocket (bi-directional)
                    │
        ┌────────────┴────────────┐
        │     Node.js Backend     │
        │  • Express REST API     │
        │  • Socket.io Server     │
        │  • Redis Pub/Sub        │
        │  • Session Persistence  │
        └────────────┬────────────┘
                    │
                    │
        ┌────────────┴────────────┐
        │     MongoDB Database    │
        │ Stores: Room, Users,    │
        │ Code Sessions, History  │
        └─────────────────────────┘

---

##  Tech Stack  

**Frontend:** React.js · Socket.io-client · Monaco Editor  
**Backend:** Node.js · Express.js · MongoDB (Mongoose) · Socket.io  
**Infra & DevOps:** Docker · Redis · Nginx · Docker Compose  

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository  

git clone https://github.com/<your-username>/codesphere.git
cd codesphere

### 2️⃣ Create .env in server/
MONGO_URI=mongodb://mongo:27017/codesphere
PORT=5000
JWT_SECRET=supersafe-secret

### 3️⃣ Build & Run with Docker
docker-compose up --build

## WebSocket Events
Event	Direction	Description
joinRoom	Client → Server	User joins a specific code room
loadCode	Server → Client	Sends the current code snapshot
codeChange	Client ↔ Server	Syncs code edits across users
chatMessage	Client ↔ Server	Sends and receives room messages
userList	Server → Client	Broadcasts active users in the room

## Docker Deployment Overview

Docker Compose spins up:

server → Node.js backend

client → React app served by Nginx

mongo → Database for session storage

redis → WebSocket message broker

docker-compose up --build

## Development Mode (Local)

Run backend & frontend separately for debugging.

#### Backend
cd server
npm install
npm run dev

#### Frontend
cd client
npm install
npm start

# 💬 Acknowledgments

Built with ❤️ to simulate the Meta Engineering Workflow.
Special thanks to the open-source community behind React, Socket.io, and Monaco Editor.

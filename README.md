# 🔗 CodeAlpha URL Shortener

A modern full-stack **URL Shortener Application** built with Node.js, Express, MongoDB, and React (Vite). This application allows users to convert long web URLs into clean, short, shareable links, with instant redirection and persistent storage.

---

## ✨ Features

- ⚡ **Instant URL Shortening**: Convert long, unwieldy URLs into concise, unique short codes generated using `nanoid`.
- 🔄 **Fast HTTP Redirection**: Accessing `http://localhost:4000/:shortCode` seamlessly redirects to the original destination URL.
- 🎨 **Modern React UI**: Clean and intuitive web interface built with React & Vite.
- 💾 **MongoDB Persistence**: Stores original URLs, short codes, and creation timestamps reliably in MongoDB.
- 🛠️ **RESTful API**: Clean API separation (`/api/urls`) built on Express 5.
- 🌐 **CORS Supported**: Prepared for seamless interaction between the React frontend and Express backend.

---

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime engine
- **Express.js (v5)**: Web application framework
- **MongoDB & Mongoose**: NoSQL Database & ODM
- **Nanoid**: Unique, URL-safe ID generator
- **Dotenv**: Environment variable management
- **Nodemon**: Development server auto-reload

### Frontend
- **React (v19)**: UI library
- **Vite**: Ultra-fast frontend build tool & dev server

---

## 📁 Project Structure

```text
url-shortener/
├── frontend/                 # React Frontend (Vite)
│   ├── public/               # Static assets & icons
│   ├── src/                  # React source code (Components, CSS, App.jsx)
│   ├── index.html            # HTML entry point
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.js        # Vite configuration
├── src/                      # Express Backend
│   ├── config/               # Database connection setup
│   │   └── database.js
│   ├── controllers/          # Request handlers
│   │   └── url.controller.js
│   ├── models/               # Mongoose schemas
│   │   └── url.model.js
│   ├── routes/               # API routes definition
│   │   └── url.routes.js
│   ├── services/             # Business logic layer
│   │   └── url.service.js
│   ├── app.js                # Express app setup & middleware
│   └── server.js             # Server startup script
├── .env.example              # Sample environment variables
├── .gitignore                # Git ignore rules
├── package.json              # Backend dependencies & scripts
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB** (Local instance or MongoDB Atlas URI)

---

### 1. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/url-shortener
```

---

### 2. Backend Setup & Run

1. Open a terminal in the project root:
   ```bash
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   - **Development mode** (with auto-reload):
     ```bash
     npm run dev
     ```
   - **Production mode**:
     ```bash
     npm start
     ```

The backend server will run on `http://localhost:4000`.

---

### 3. Frontend Setup & Run

1. Open a new terminal tab/window and navigate to the `frontend` folder:
   ```bash
   cd url-shortener/frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

The frontend application will run on `http://localhost:3000` (or `http://localhost:5173`).

---

## 📡 API Reference

### Health Check
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Verify backend server status |

### URL Shortening API
| Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/urls` | `{ "originalUrl": "https://example.com/very/long/url" }` | Shorten a long URL |
| `GET` | `/:shortCode` | *None* | Redirect to the original URL |

#### Example Response (`POST /api/urls`)

```json
{
  "success": true,
  "message": "Short URL created successfully",
  "data": {
    "originalUrl": "https://example.com/very/long/url",
    "shortCode": "aB3xZ9",
    "shortUrl": "http://localhost:4000/aB3xZ9"
  }
}
```

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

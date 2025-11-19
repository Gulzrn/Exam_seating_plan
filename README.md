# Exam Seating Plan Generator

Simple full-stack app that stores student rosters, generates conflict-free seating plans for exam halls, and lets you download the layout.

## Tech Stack
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: Vanilla HTML/CSS/JS + jsPDF/html2canvas for exports

## Getting Started

### Backend
1. `cd backend`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and set:
   ```
   PORT=4000
   MONGO_URI=mongodb://127.0.0.1:27017
   MONGO_DB=exam_seating
   ```
4. Run locally with hot reload: `npm run dev`
5. Production start: `npm start`

### Frontend
Serve the `frontend` folder with any static server (e.g. `npx serve frontend`), or open `frontend/index.html` directly and ensure it can reach the backend API URL set in `frontend/script.js`.

## API Overview
- `GET /students` – list students
- `POST /students` – add `{ name, roll, class }`
- `PUT /students/:id` – update student
- `DELETE /students/:id` – remove student
- `POST /generate-seating` – body `{ rows, columns }`, returns grid or an explanatory error when placement fails

## Seating Rules
- Students are randomly shuffled per attempt
- Placement ensures no two identical classes touch in 8 directions
- Up to 100 shuffles are attempted before failing
- Empty seats are auto-filled when there are more chairs than students

## Downloads
Use the UI buttons to export the rendered grid as PDF (jsPDF) or PNG (html2canvas).


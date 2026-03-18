# Books Store - Frontend

A clean, minimalist React frontend for the Books Store application. Built with Vite and styled using Tailwind CSS v4 to provide a cozy, highly readable interface featuring a signature light orange accent (`#FFA07A`).

## ✨ Features

*   **Books Management:** View a comprehensive grid of all books in the library. Add new books, update existing descriptions, or delete titles.
*   **Authors Directory:** Manage the creators behind the collection. Includes validations and relations to the books they've authored.
*   **Modern Aesthetic:** A customized, spacious UI designed for readability, avoiding overly dramatic "corporate" styling in favor of a clean, modest look.
*   **Fully Responsive:** Designed to work flawlessly on desktops, tablets, and mobile devices.

## 🛠 Tech Stack

*   **Framework:** [React 19](https://react.dev/)
*   **Build Tool:** [Vite 8](https://vitejs.dev/)
*   **Routing:** [React Router v7](https://reactrouter.com/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```text
Frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Project specific images/icons
│   ├── components/      # Reusable UI components
│   │   └── Layout.jsx   # Main application shell & navigation
│   ├── pages/           # Route-level components
│   │   ├── Authors.jsx  # Authors directory & CRUD modal
│   │   └── Books.jsx    # Books grid & CRUD modal
│   ├── api.js           # Centralized Fetch service for all backend calls
│   ├── App.jsx          # React Router configuration
│   ├── index.css        # Global CSS & Tailwind v4 theme configuration
│   └── main.jsx         # React application entry point
├── postcss.config.js    # Required configuration for Vite + Tailwind v4
└── vite.config.js       # Vite bundler configuration
```

## 🚀 Setup & Installation

### Prerequisites
Before running the frontend, ensure that the **Books Store Backend** is running locally on port `3000`. The backend must have CORS enabled for the frontend to communicate with it.

### Installation Steps

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

## 🔌 API Integration

This frontend expects a RESTful API running at `http://localhost:3000`. The API service (`src/api.js`) handles all communication, mapping to the following backend endpoints:

*   **Authors:** `GET`, `POST`, `PUT`, `DELETE` at `/authors`
*   **Books:** `GET`, `POST`, `PUT`, `DELETE` at `/books`

## 🎨 Theme Customization

The application theme is strictly controlled via native CSS variables integrated with Tailwind v4 in `src/index.css`. 

To adjust the core colors, modify the `@theme` block:
```css
@theme {
  --color-primary: #FFA07A;       /* Primary accent color */
  --color-primary-dark: #ff8c5a;  /* Hover state for primary buttons */
  --color-background: #FAFAFA;    /* App background */
  --color-text-main: #333333;     /* Main typography color */
}
```

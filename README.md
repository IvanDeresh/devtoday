# 🍲 Recipe Book

## 📦 Technologies

-   **Backend:** NestJS + TypeScript
-   **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
-   **API:** [TheMealDB](https://www.themealdb.com/api.php)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd devtoday
```

### 2. Install dependencies

```bash
cd server
npm install

cd client
npm install
```

## 🔐 Environment Variables

### Backend: `/server/.env`

```env
PORT=3001
RECIPE_API_URL=https://www.themealdb.com/api/json/v1/1
```

### Frontend: `/client/.env`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## ▶️ Running the App

### Start Backend

```bash
cd server
npm run start
```

Runs on: http://localhost:3001

### Start Frontend

```bash
cd client
npm run dev
```

Runs on: http://localhost:3000

## client pages:

-   http://localhost:3000/pages/recipes - recipes
-   http://localhost:3000/pages/recipes/:id - recipe details

## 🧪 Features

-   🔍 Recipe list page with filters (ingredient, country, category)
-   🍽️ Detailed recipe page
-   🎯 Responsive design
-   ✅ Environment-based API config
-   🧼 Clean structure, ESLint, Prettier

Thank you!

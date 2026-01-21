**Deployment Link =https://recipe-api-integration.netlify.app/**

# RecipeHub - Premium Recipe Management App 🍲

RecipeHub is a modern, responsive single-page application (SPA) for discovering and managing recipes. Built with performance and aesthetics in mind, it features a strictly curated 2-color "Premium" design system and seamless API integration.

## ✨ Features

### 🎨 Premium UI/UX
-   **Strict 2-Color Theme**: A sophisticated minimalist aesthetic using only **Dark Slate (`#0f172a`)** and **White (`#ffff`)**.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
-   **Interactive Elements**: Smooth transitions, hover effects, and a custom Toast notification system.

### 🏠 Public Landing Page
-   **Recipe Discovery**: Browse a paginated list of recipes fetched from the DummyJSON API.
-   **Advanced Search & Sort**: Real-time filtering by name and sorting by rating, preparation time, or difficulty.
-   **Hero Section**: engaging introduction to the platform.

### 🔐 User Authentication
-   **Secure Login**: Integrated with DummyJSON Auth for token-based authentication.
-   **Local Fallback**: Support for local user registration and login (stored in LocalStorage) for testing.
-   **Persistent Sessions**: User profile and token management via Redux.

### 📊 User Dashboard
-   **Recipe Management (CRUD)**:
    -   **Create**: Add new personal recipes with difficulty, prep time, and cook team.
    -   **Read**: View your personalized collection.
    -   **Update**: Edit details of existing recipes.
    -   **Delete**: Remove recipes with confirmation modals.
-   **Profile Overview**: Visual display of user profile and recipe statistics.

## 🛠️ Technologies Used

### Core
-   **React 18**: Component-based UI library.
-   **TypeScript**: Static typing for robust code quality.
-   **Vite**: Next-generation frontend tooling for lightning-fast builds.

### State Management & Data Fetching
-   **Redux Toolkit (RTK)**: Centralized state management.
-   **RTK Query**: Efficient data fetching and caching layer for API integration.

### Styling
-   **Tailwind CSS (v4)**: Utility-first CSS framework for rapid UI development.
-   **CSS Variables**: Custom properties for strict color theme enforcement.

### Routing
-   **React Router DOM**: Client-side routing for seamless navigation.

## 🚀 Project Setup

Follow these steps to get the project running locally:

### Prerequisites
-   Node.js (v18 or higher)
-   npm (v9 or higher)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/recipe-api-integration.git
    cd recipe-api-integration
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```



## 📂 Project Structure

```
src/
├── api/            # Redux store and API configuration
├── components/     # Reusable UI components (RecipeCard, Hero, Rating, etc.)
├── features/       # Feature-based slices (auth, recipe)
├── pages/          # Full page views (LandingPage, Login, Dashboard)
├── context/        # React Context (Toast system)
├── hooks/          # Custom hooks
├── types/          # TypeScript interfaces
└── style.css       # Global styles and strict theme variables
```

---


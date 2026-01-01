# Product Dashboard

A product browsing app built with React, Redux Toolkit, and TypeScript. Browse products, search and filter, and save your favorites!

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11.2-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-yellow)

## 🚀 What it does

- Browse products in a nice grid layout
- Search products as you type (with a smooth debounce)
- Filter by category and sort by price
- Click any product to see more details
- Save your favorite products (they'll stay saved even if you refresh!)
- Everything's responsive - works great on mobile
- Built with accessibility in mind

## 📋 Quick Links

- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [API](#api)
- [State Management](#state-management)

## 🛠️ Getting Started

### What you need

- Node.js (v18 or newer should work fine)
- npm or yarn (I used npm)

### Setup

1. **Clone this repo**
   ```bash
   git clone <repository-url>
   cd neura-assessment
   ```

2. **Install stuff**
   ```bash
   npm install
   ```

3. **Fire it up**
   ```bash
   npm run dev
   ```

4. **Open it in your browser**
   ```
   http://localhost:5173
   ```

## 💻 Development

### Commands you'll use

```bash
# Start dev server (hot reload is awesome)
npm run dev

# Build for production
npm run build

# Preview the build locally
npm run preview

# Run tests
npm run test

# Run tests with nice UI (recommended!)
npm run test:ui

# Check test coverage
npm run test:coverage

# Lint the code
npm run lint
```

## 🧪 Testing

I've included a bunch of tests using Vitest and React Testing Library. They run pretty fast!

### Running Tests

```bash
# Run all tests
npm run test

# With UI - way nicer to use
npm run test:ui

# See coverage
npm run test:coverage
```

### What's tested

- **Redux stuff**: All the slices, actions, and reducers
- **Selectors**: The filtering and sorting logic
- **Components**: Making sure things render correctly
- **Integration**: Full user flows like searching, filtering, adding favorites

## 📦 Deployment

### Building



```bash
npm run build
```

Everything ends up in the `dist` folder.

### Where to deploy

I'd recommend any of these - they all work great with Vite:

**Vercel** (easiest)
- Just connect your GitHub repo
- It auto-detects Vite and deploys
- Done!

**Netlify**
- Connect your GitHub
- Build command: `npm run build`
- Publish directory: `dist`

**Render**
- Create a Static Site
- Same deal - point it to your repo
- Build: `npm run build`, Publish: `dist`

## 📁 Project Structure

```
neura-assessment/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ProductCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterBar.tsx
│   │   ├── Layout.tsx
│   │   └── __tests__/       # Component tests
│   ├── pages/               # Page components
│   │   ├── ProductListingPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   └── FavoritesPage.tsx
│   ├── store/               # Redux store configuration
│   │   ├── index.ts         # Store setup
│   │   ├── hooks.ts         # Typed hooks
│   │   ├── selectors.ts     # Memoized selectors
│   │   └── slices/          # Redux slices
│   │       ├── productsSlice.ts
│   │       ├── favoritesSlice.ts
│   │       ├── filtersSlice.ts
│   │       └── __tests__/   # Slice tests
│   ├── services/            # API services
│   │   └── api.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── __tests__/           # Integration tests
│   │   └── integration/
│   ├── test/                # Test configuration
│   │   └── setup.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── README.md
```

## 🔧 Tech Stack

### Main stuff
- **React 19.2.0** - For the UI
- **Redux Toolkit 2.11.2** - State management (makes Redux way easier)
- **React Router 7.11.0** - Handling navigation
- **TypeScript 5.9.3** - Because types are helpful
- **Vite 7.2.4** - Super fast dev server and builds

### Testing
- **Vitest 4.0.16** - Like Jest but faster
- **React Testing Library 16.3.1** - Testing components the right way
- **@testing-library/user-event** - Simulating user interactions

### Styling
- **Tailwind CSS 3.4** - Utility classes for everything
- **PostCSS & Autoprefixer** - CSS processing

### Other
- **ESLint** - Keeping the code clean

## ✨ Features

### Product Listing

- Clean grid that adapts to your screen size
- Product cards show the important stuff - image, title, price, rating
- Heart button to favorite products
- Search as you type (debounced so it's not laggy)
- Filter by category
- Sort by price
- Shows count of how many products match your filters
- Loading spinners and error handling

### Product Details

- Click any product to see full details
- Big image, full description, ratings
- Can add/remove from favorites here too
- Back button to return

### Favorites

- All your favorited products in one place
- Saved in localStorage so they persist
- Badge in nav shows count
- Nice empty state if you haven't favorited anything yet

### Search & Filters

- **Search** works across titles and descriptions
- **Category filter** for electronics, clothing, etc.
- **Sort** by price - low to high or high to low
- All filters work together
- Clear button to reset everything

## 🌐 API

I'm using the [Fake Store API](https://fakestoreapi.com) - it's free and works great for demos.

### Endpoints I'm hitting

```
GET /products              - Get all products
GET /products/{id}         - Get one product
GET /products/categories   - Get the category list
```

All the API calls are in `src/services/api.ts` - kept it simple with fetch and proper error handling.

## 🗃️ State Management

Using Redux Toolkit because it makes Redux so much cleaner.

### The slices

**Products** - Holds all the product data, loading states, categories. Has async thunks for fetching from the API.

**Favorites** - Just tracks product IDs. Syncs with localStorage so your favorites stick around.

**Filters** - Search text, selected category, and sort preference.

### Selectors

Got some memoized selectors to keep things performant:
- One that combines all the filtering and sorting logic
- One that grabs your favorite products
- Helper for checking if something's favorited
- Etc.

They only recalculate when needed, thanks to `createSelector`.

## 🧪 Testing

### What I tested

**Unit tests** cover:
- All the Redux slices - actions, reducers, thunks
- Selectors - especially the filtering/sorting logic
- Components - rendering and interactions

**Integration tests** cover:
- Complete flows like searching → filtering → favoriting
- Navigation between pages
- Making sure favorites persist in localStorage

### Test files

```
src/
├── store/
│   ├── slices/__tests__/       # Redux slice tests
│   └── __tests__/               # Selector tests
├── components/__tests__/        # Component tests
└── __tests__/integration/       # Integration tests
```

## 📱 Responsive

Works on all screen sizes:

- **Desktop** - 4 columns
- **Tablet** - 3 columns  
- **Mobile** - 2 columns
- **Small phones** - 1 column

## ♿ Accessibility

Did my best to make it accessible:
- Proper HTML semantics
- ARIA labels where needed
- Keyboard navigation works
- Focus states on everything
- Screen reader friendly

## 🎨 Design

Went for a clean, minimal look. Nothing fancy, just clear and functional. Used Tailwind for everything which made it quick to iterate.

## 📝 Notes

### Why I built it this way

**Tailwind** - I like utility classes. Makes styling faster and keeps things consistent. Plus no need to think of class names.

**localStorage for favorites** - Keeps it simple for now. In a real app you'd want this saved to a backend with user accounts.

**300ms debounce** - Feels responsive but doesn't hammer the filters on every keystroke. Tried a few values and this felt right.

**Memoized selectors** - The filtering logic can get expensive with lots of products. Memoization means it only recalculates when needed.


---

Built for Neura assessment. Had fun building this!

Tech used: React, Redux Toolkit, TypeScript, Tailwind, Vitest

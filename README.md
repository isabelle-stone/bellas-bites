# Bella’s Bites

A React-based restaurant website featuring dynamic menu loading, shopping cart state management, and a checkout flow integrated with a backend API.

---

## Live Demos
- **React Version (primary):** https://bellas-bites.vercel.app/  
  *The React version extends the original static site with dynamic data fetching, cart state management, and backend API integration.*
- **Static HTML Version:** https://bellasbites.netlify.app  
---

## Tech Stack
- React 18
- Vite
- React Router
- JavaScript, HTML, CSS
- REST APIs
- Node.js backend (deployed on Render)
- Netlify & Vercel

---

## Features
- Dynamic menu fetched from backend API
- Shopping cart with add/remove and quantity controls
- Real-time price and item count calculations
- Checkout flow with form validation and order submission
- Loading and error state handling
- Responsive, mobile-first design

---

## Engineering Highlights
- Implemented client-side cart and UI state management using React hooks
- Integrated REST APIs with async/await and robust error handling
- Designed checkout flow with controlled inputs and submission feedback
- Managed UI state for modals, overlays, and conditional rendering
- Configured environment-based API endpoints for local vs production

---

## Backend Endpoints
- `GET /api/menu` — retrieve menu items
- `POST /api/orders` — submit customer orders

---

## Architecture Overview
- Frontend manages all UI, cart, and form state
- Backend provides menu data and accepts order submissions
- Derived state (totals, quantities) computed efficiently on demand
- Application structured with reusable components and routed pages


---

## Project Structure
- `/react-version` — React + API-integrated implementation (primary)
- `/` — original static HTML/CSS/JavaScript implementation

# Frontend Technical Assessment

## Overview

This project is a frontend application built using **Next.js (App Router)** and **Material UI**, implementing authentication, protected routes, state management with **Zustand**, and data fetching from the **DummyJSON API**. The application demonstrates clean architecture, proper state scoping, pagination, caching, and responsive UI design as required by the assessment.

---

## Tech Stack

* **Next.js (App Router)**
* **React 18**
* **TypeScript**
* **Material UI (MUI v5)**
* **Zustand** for state management
* **Axios** for API calls
* **DummyJSON API** for mock backend

---

## Features Implemented

### 1. Authentication

* Login using DummyJSON `/auth/login`
* Token handling and persistence
* Protected routes (Dashboard)
* Auto user fetch using `/auth/me`

**Demo Credentials (DummyJSON):**

```
username: emilys
password: emilyspass
```

---

### 2. Users Management

* Users list page
* Single user detail page
* Dynamic routing using Next.js
* Clean MUI-based layout

---

### 3. Products Management (Zustand)

#### Products List

* Products fetched and managed using **Zustand**
* Server-side pagination
* Search functionality
* Clean responsive card layout

#### Pagination

* Pagination implemented using MUI Pagination
* Pagination pages limited to a maximum of **3 pages** for better UX
* Correct `limit` / `skip` handling

#### Caching

* Client-side caching implemented in Zustand
* Cached by pagination + filters
* Prevents unnecessary API calls when revisiting pages

#### Product Detail Page

* Single product fetched via `/products/{id}`
* Page-scoped local state (no global store used)
* Clean detail layout with navigation

---

## State Management Strategy

* **Zustand** used only where global state is required:

  * Authentication
  * Products list (pagination, filters, caching)

* Page-scoped data (e.g., single product, single user) is fetched locally to avoid unnecessary global coupling.

This approach avoids overengineering while maintaining clarity and scalability.

---

## Project Structure

```
app/
 ├─ login/
 ├─ dashboard/
 ├─ users/
 │   └─ [id]/
 ├─ products/
 │   └─ [id]/
 ├─ store/
 │   ├─ authStore.ts
 │   └─ productsStore.ts
 ├─ lib/
 │   └─ api.ts
```

---

## Setup Instructions

1. Clone the repository
2. Install dependencies

   ```bash
   npm install
   ```
3. Run the development server

   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`

---

## Notes

* No external state libraries (Redux, React Query) were used intentionally
* UI kept simple, readable, and responsive
* Code focuses on clarity and assessment requirements rather than overengineering

---

## Conclusion

This project fulfills all requirements outlined in the Frontend Technical Assessment, demonstrating correct use of modern React patterns, Next.js App Router, Zustand state management, and Material UI.

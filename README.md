# ☕ Ctrl+Sip Cafe

<p align="center">
  <img src="assets/logo.png" alt="Ctrl+Sip Cafe Logo" width="420"/>
</p>

Welcome to **Ctrl+Sip Cafe** — where code meets coffee and every sip compiles happiness ☕💻✨

This project is a full-stack web application designed for a modern café system, allowing customers to explore products, place orders, and interact with the café online.

---

## 🚀 Project Overview

**Ctrl+Sip Cafe** is a Django-based web platform that enables a café to manage its products, customers, and orders efficiently while providing a smooth online experience for users.

The system supports:
- User registration and authentication
- Product browsing with categories
- Order management
- Favorites system
- Admin dashboard for full control

---

## 🎯 Key Features

### 👤 User Features
- Create an account (email/phone-based signup optional)
- Login / logout system
- Personal profile (username, name, profile picture)
- Favorite products list ❤️
- Browse products by category
- View product details (images, ingredients, etc.)

### 🛒 Orders
- Add products to cart/order
- Place orders online
- View order history
- Filter orders by time and category

### 💬 Reviews & Ratings (Phase 2)
- Add comments on products
- Admin approval for comments (optional)
- Star rating system (1–5 ⭐)
- Like / dislike alternative system (optional)
- Show if user has purchased the product before commenting

### 🧑‍💼 Admin Features
- Secure Django Admin access (admin-only)
- Manage products, categories, users, and orders
- View full product details (images, stock, category)
- Order monitoring with real-time notifications
- Comment moderation system

---

## 🧱 Technical Stack

- **Backend:** Django (CBV-based architecture preferred)
- **Database:** SQLite / PostgreSQL
- **Frontend:** HTML, CSS, Bootstrap
- **Media Handling:** Django Media & Static system
- **Admin Panel:** Django Admin
- **Optional Security:** Honeypot for admin protection

---

## 🧠 Architecture Highlights

- Abstract models for reusable logic
- Custom model managers for optimized queries
- Class-Based Views (CBVs) for scalability (≥ 80%)
- Relational database design (ERD required)
- Clean separation of concerns

---

## 📦 Project Phases

### Phase 1
- User authentication system
- Product categories
- Product image management
- Favorites system
- Basic admin restrictions
- User profile system

### Phase 2
- Order system
- Notifications in admin panel
- Reviews and ratings
- Advanced product details
- Comment moderation system

---

## 🗂️ Project Structure (Example)

ctrl_sip_cafe/
│
├── accounts/ # user system
├── products/ # menu & categories
├── orders/ # ordering system
├── reviews/ # comments & ratings
├── core/ # shared logic
├── templates/
├── static/
└── media/

## 👥 Contributors

A big thank you to everyone who contributed to Ctrl+Sip Cafe ☕💻

- Amirhossein Kheirash  
- Bita Farezi
- Mahdi Mirjamali 
- Mohammadhassan Anisi  
- Sajad Bahadorani  

---
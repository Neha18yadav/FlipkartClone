# Flipkart Clone — E-Commerce Platform

A full-stack e-commerce web application that closely replicates Flipkart's design and user experience.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js (Vite) |
| **Backend** | Node.js + Express.js |
| **Database** | PostgreSQL |
| **ORM** | Sequelize |
| **Styling** | Vanilla CSS |

## Deployment

| Service | URL |
|---------|-----|
| **Frontend** | [https://flipkart-clone-assign.vercel.app/](https://flipkart-clone-assign.vercel.app/) |
| **Backend** | [https://flipkartclone-fuwn.onrender.com](https://flipkartclone-fuwn.onrender.com) |

## Features

### Core Features
- **Product Listing** — Grid layout with search and category filtering
- **Product Detail** — Image carousel, specifications, pricing, stock status
- **Shopping Cart** — Add/remove items, update quantities, price summary
- **Order Placement** — Checkout form, order review, confirmation page

### UI/UX
- Flipkart-inspired blue header with search bar
- Category strip with icons
- Responsive design (mobile, tablet, desktop)
- Loading spinners, animations, hover effects

## Database Schema

| Table | Purpose |
|-------|---------|
| `categories` | Product categories (Electronics, Fashion, etc.) |
| `products` | Product details (name, price, stock, rating) |
| `product_images` | Multiple images per product |
| `carts` | User shopping carts |
| `cart_items` | Items in a cart with quantity |
| `orders` | Placed orders with shipping details |
| `order_items` | Items in an order with price at purchase |

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### 1. Clone the Repository
```bash
git clone <repo-url>
cd Flipkart_clone
```

### 2. Setup Database
```bash
# Create PostgreSQL database
createdb flipkart_clone
```

### 3. Setup Backend
```bash
cd server
npm install

# Configure database connection (edit .env if needed)
# Default: DB_NAME=flipkart_clone, DB_USER=<your-mac-username>, DB_PASSWORD=

# Seed the database with sample data
npm run seed

# Start the server
npm start
```

### 4. Setup Frontend
```bash
cd client
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (?search=&category=) |
| GET | `/api/products/:id` | Get product details |
| GET | `/api/categories` | List categories |
| GET | `/api/cart` | Get cart with items |
| POST | `/api/cart/add` | Add to cart |
| PUT | `/api/cart/update/:id` | Update quantity |
| DELETE | `/api/cart/remove/:id` | Remove from cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/:id` | Get order details |

## Project Structure
```
Flipkart_clone/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page-level components
│       ├── context/      # React Context (cart state)
│       └── services/     # API call functions
├── server/          # Express.js backend
│   ├── config/      # Database configuration
│   ├── models/      # Sequelize models
│   ├── controllers/ # Request handlers
│   ├── routes/      # API route definitions
│   └── seeders/     # Database seed script
└── README.md
```

## Assumptions
- No login required — uses a default user (user_id = 1)
- Product images sourced from Flipkart CDN for demo purposes
- Free delivery on all orders
- Payment flow is not implemented (order is placed directly)

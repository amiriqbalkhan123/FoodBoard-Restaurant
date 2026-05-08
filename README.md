# 🍽️ FoodBoard — Premium Afghan Restaurant Management Platform

A modern, luxury, full-stack restaurant and food management web application built using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- TailwindCSS
- Passport Authentication

FoodBoard is designed as a premium restaurant showcase and management system with Afghan cuisine integration, modern UI/UX, responsive design, animations, dashboard analytics, authentication, CRUD functionality, REST APIs, and luxury styling.

---

# ✨ Features

## 🔐 Authentication System
- User Registration
- User Login
- Secure Authentication using Passport.js
- Session Management
- Protected Routes
- Logout System

---

## 🍽️ Food Management
- Add Foods
- Edit Foods
- Delete Foods
- View Food Details
- Food Categories
- Food Availability Status
- Food Ratings
- Featured Foods
- Trending Foods

---

## 🇦🇫 Afghan Dishes Integration
- 50+ Afghan dishes included
- Auto-seeding Afghan foods into MongoDB
- Afghan traditional cuisine categories

Examples:
- Kabuli Pulao
- Mantu
- Ashak
- Bolani
- Chapli Kebab
- Qorma
- Afghan Desserts
- Afghan Drinks
- Traditional Afghan Breakfast

---

## 🎨 Premium UI/UX
- Luxury modern design
- Glassmorphism cards
- Premium gradients
- Hover animations
- Card animations
- Responsive mobile-first layout
- Dark / Light Mode
- Luxury typography
- Animated sections
- Professional navbar & footer

---

## 📊 Dashboard Features
- Restaurant statistics
- Food analytics
- Dynamic food cards
- Featured sections
- Trending dishes
- Search system
- Category filtering
- Availability badges

---

## 🌐 REST API
- RESTful Express routes
- MongoDB integration
- Mongoose schemas
- CRUD operations
- Better validation
- Error handling

---

# 🛠️ Technology Stack

| Technology | Usage |
|---|---|
| Node.js | Backend Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| EJS | Templating Engine |
| TailwindCSS | Styling |
| Passport.js | Authentication |
| Express Session | Session Management |
| Method Override | PUT & DELETE Requests |

---

# 📁 Project Structure

```bash
foodboard/
│
├── config/
│   ├── db.js
│   └── passport.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── Food.js
│   └── User.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│
├── routes/
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   ├── apiRoutes.js
│   └── externalFoodRoutes.js
│
├── views/
│   ├── auth/
│   ├── foods/
│   ├── layouts/
│   └── partials/
│
├── app.js
├── package.json
├── seedFoods.js
├── seedAdmin.js
└── README.md
```

---

# ⚙️ Installation Guide

## 1️⃣ Clone the Project

```bash
git clone <your-repository-url>
```

Then:

```bash
cd foodboard
```

---

# 📦 Install Dependencies

Run:

```bash
npm install
```

---

# 🗄️ MongoDB Setup

## Step 1 — Install MongoDB

Install:
- MongoDB Community Server
- MongoDB Compass

---

## Step 2 — Create Database

Open MongoDB Compass.

Create a database named:

```bash
foodboard
```

---

## Step 3 — Configure Environment Variables

Create a file:

```bash
.env
```

Add:

```env
PORT=3000

MONGO_URI=mongodb://127.0.0.1:27017/foodboard

SESSION_SECRET=foodboardsecret
```

---

# 👨‍💻 Create Admin Account

This project includes a seeded admin account.

## Run Admin Seeder

```bash
node seedAdmin.js
```

OR

```bash
npm run seed:admin
```

---

## Admin Credentials

```txt
Username: admin
Password: admin123
```

---

# 🍽️ Seed 50 Afghan Dishes

This project includes 50 Afghan dishes automatically.

## Run Food Seeder

```bash
node seedFoods.js
```

OR

```bash
npm run seed:foods
```

This will automatically create:
- Afghan rice dishes
- Afghan kebabs
- Afghan desserts
- Afghan soups
- Afghan drinks
- Afghan breads
- Traditional Afghan foods

inside MongoDB.

---

# ▶️ Run the Application

## Development Mode

```bash
npm run dev
```

---

## Production Mode

```bash
npm start
```

---

# 🌍 Open in Browser

After running the project:

Open:

```bash
http://localhost:3000
```

---

# 🔑 Login Information

Use:

```txt
Username: admin
Password: admin123
```

---

# 🧠 Assignment Requirements Fulfilled

This project successfully fulfills and exceeds the Web Engineering assignment requirements.

---

# ✅ Assignment Requirements Covered

## ✔ Authentication
- Register
- Login
- Logout
- Sessions

---

## ✔ CRUD Operations
- Create Foods
- Read Foods
- Update Foods
- Delete Foods

---

## ✔ Database Integration
- MongoDB
- Mongoose ODM
- Models & Schemas

---

## ✔ REST API
- Express Routes
- RESTful APIs
- CRUD APIs

---

## ✔ Frontend
- EJS Templates
- Responsive UI
- Professional Styling

---

## ✔ Backend
- Express.js
- Node.js
- Middleware
- Sessions
- Authentication

---

## ✔ Additional Advanced Features
- Luxury UI/UX
- Afghan Dish Seeding
- Dashboard
- Filtering
- Search
- Featured Foods
- Trending Foods
- Responsive Design
- Dark/Light Theme
- Hover Animations
- Premium Effects

---

# 📱 Responsive Design

FoodBoard is fully responsive and optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 🎯 Learning Outcomes

This project demonstrates:
- Full-stack development
- MongoDB integration
- Authentication systems
- REST API development
- MVC architecture
- UI/UX design
- Database management
- Responsive web design
- Express routing
- Session handling
- CRUD implementation

---

# 🚀 Future Improvements

Possible future enhancements:
- Payment Integration
- Restaurant Reservations
- Real-time Ordering
- Admin Dashboard
- Food Reviews
- Image Uploads
- Cloud Deployment
- JWT Authentication
- Docker Integration
- AI Food Recommendations

---

# 👨‍🎓 Academic Information

## Student Information

```txt
Project: FoodBoard
Subject: Web Engineering
Type: Full Stack Web Application
```

---

# 📄 License

This project is created for educational and academic purposes.

---

# ❤️ Thank You

Thank you for reviewing the FoodBoard project.
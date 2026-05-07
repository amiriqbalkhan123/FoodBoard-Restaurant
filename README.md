# FoodBoard

FoodBoard is a full-stack restaurant menu management system built for a Web Engineering assignment.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- TailwindCSS
- Passport.js
- Express Session
- Method Override

## Features

- User registration
- User login/logout
- Protected routes
- Add food items
- View food items
- Edit food items
- Delete food items
- RESTful CRUD API
- Responsive TailwindCSS interface

## Main Resource

Food Items

### Fields

- Name
- Description
- Category
- Price
- Image URL
- Availability

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/foods | Get all foods |
| GET | /api/foods/:id | Get one food |
| POST | /api/foods | Create food |
| PUT | /api/foods/:id | Update food |
| DELETE | /api/foods/:id | Delete food |

## Installation

```bash
npm install
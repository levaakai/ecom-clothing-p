# E-Commerce Clothing Store 🛍️

A full-stack e-commerce web application where users can register, login, browse products, manage their profile, and shop with ease.

## 🌐 Live Demo (Optional)

*Coming soon...*

## 🚀 Features

- User registration and login (JWT + cookies)
- Secure authentication with password hashing
- Update user profile (first name, last name, email, telephone, avatar)
- Browse clothing products
- Add items to cart
- Responsive UI with animations (Framer Motion)
- Real-time form validation and error handling

## 🛠 Tech Stack

**Frontend**

- React
- React Router DOM
- Tailwind CSS
- Framer Motion

**Backend**

- Node.js
- Express
- Sequelize ORM
- MySQL
- bcrypt (for hashing passwords)
- JSON Web Tokens (JWT)

## 📦Folder Structure

```
/frontend → React app
/backend → Express API
/models → Sequelize models
/routes → Express routes (auth, user, products)
/controllers → API logic
/context → React context for Auth
```


## ⚙️ Environment Variables

### Backend `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```


## Getting Started


### Backend Setup

```bash
cd backend
npm install
npm run dev
```
*Make sure your MySQL server is running and the database is created.*

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

# Author
Built with love 💙 by Me
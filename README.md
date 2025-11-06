Mock E-Commerce Cart — Full Stack Project

A full-stack shopping cart web application built using EJS, Node.js, Express, and MongoDB.
This project simulates an e-commerce flow — users can browse products, add or remove items from the cart, view totals, and perform a mock checkout (no real payments).

It’s designed for the Vibe Commerce Full Stack Screening Test and demonstrates frontend templating, REST API integration, and database persistence.

Tech Stack
| Layer                    | Technology                                                 |
| ------------------------ | ---------------------------------------------------------- |
| **Frontend**             | EJS (Embedded JavaScript Templates), HTML, CSS, JavaScript |
| **Backend**              | Node.js, Express.js                                        |
| **Database**             | MongoDB                                   |
| **Version Control**      | Git & GitHub                                               |
                     |
Features

🔹 Core Functionalities

Product Listing: Display 5–10 mock products with name, price, and “Add to Cart” buttons.

Add to Cart: Add products to the cart with quantity.

View Cart: See all items with their quantities and total price.

Update / Remove Items: Modify item quantities or remove them entirely.

Checkout Flow: Submit the cart and generate a mock receipt with total and timestamp.

Responsive Design: Works smoothly on both desktop and mobile.

Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/mock-ecom-cart.git
cd mock-ecom-cart
2️⃣ Install Dependencies
Install dependencies for backend and frontend:
cd backend
npm install
cd ../frontend
npm install
3️⃣ Configure Environment Variables
Create a .env file inside /backend and add:
PORT=5000
MONGO_URI=mongodb+srv://schaitanya2825:<Chaitanya300>@vibecart.vagsxjf.mongodb.net/?appName=vibecart
4️⃣ Start the Application
From the backend directory, run:
npm start
Visit the app at 👉 http://localhost:5000

API Endpoints
| Method     | Endpoint        | Description                                        |
| ---------- | --------------- | -------------------------------------------------- |
| **GET**    | `/api/products` | Retrieve list of mock products                     |
| **POST**   | `/api/cart`     | Add item to cart (`{ productId, qty }`)            |
| **DELETE** | `/api/cart/:id` | Remove an item from the cart                       |
| **GET**    | `/api/cart`     | Retrieve cart items with total amount              |
| **POST**   | `/api/checkout` | Mock checkout → returns receipt (total, timestamp) |





Chaitanya Sharma
schaitanya2825@gmail.com
 GitHub Profile
 chaitanya0001-1
 



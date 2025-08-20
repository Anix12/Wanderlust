# 🏕️ Wanderlust – Airbnb Clone
  
![Wanderlust Banner](https://via.placeholder.com/1200x300.png?text=Wanderlust+Banner)
  
A full-stack web application inspired by Airbnb, where users can explore, create, and manage property listings with authentication and reviews.  
  
---  
  
## 🚀 Features  
  
- 🔐 User Authentication (Login/Signup with Passport.js)  
- 🏡 Create, Update, Delete property listings  
- 🖼️ Image Upload with Cloudinary  
- ⭐ Add Reviews & Ratings  
- 📍 Maps & Location Integration  
- 🗄️ MongoDB with Mongoose for data storage  
- 🎨 Responsive UI with Bootstrap  

---
  
## 🛠️ Tech Stack  
  
**Frontend:** EJS, Bootstrap, JavaScript  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (AtlasDB)  
**Authentication:** Passport.js  
**File Storage:** Cloudinary  
**Maps API:** Mapbox  

---

## 📂 Project Structure

```bash
WANDERLUST/
│
├── models/            # MongoDB models (User, Listing, Review)
├── routes/            # Express routes
├── controllers/       # Route controllers
├── views/             # EJS templates
├── public/            # Static files (CSS, JS, Images)
├── utils/             # Helpers, middleware
├── app.js             # Entry point
└── .env               # Environment variables

# 🛠️ Installation Guide – Wanderlust

Follow the steps below to set up the project locally.

---
## ⚙️ Project Setup

## 1️⃣ Prerequisites  

Make sure you have the following installed:  

- [Node.js](https://nodejs.org/) (v16+ recommended)  
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)  
- [Git](https://git-scm.com/)  
- Cloudinary & Mapbox accounts for image hosting and maps  

---  

## 2️⃣ Clone the Repository  

```bash
git clone https://github.com/Anix12/Wanderlust.git
cd wanderlust

install dependency  
npm install  


Configure environment variables:  

CLOUDINARY_CLOUD_NAME=your_cloud_name  
CLOUDINARY_KEY=your_key  
CLOUDINARY_SECRET=your_secret  
MAPBOX_TOKEN=your_mapbox_token  
MONGO_URI=your_mongodb_connection_string  
SESSION_SECRET=your_secret    
PORT=5000

npm start

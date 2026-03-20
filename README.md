# Campus Buddy

A student marketplace where you can buy and sell stuff on campus. Built with React, Node.js, MongoDB, and uses Clerk for authentication.

## What's in Here

```
Project/
├── backend/
│   ├── controllers/    # handles user and item logic
│   ├── models/         # User and Item schemas
│   ├── routes/         # API endpoints
│   ├── server.js       # main server file
│   ├── package.json    # dependencies
│   └── .env            # config (MongoDB URI, PORT)
│
└── frontend/
    ├── src/
    │   ├── api/        # API calls to backend
    │   ├── components/ # Navbar, ItemCard
    │   ├── pages/      # Home, Marketplace, CreateListing, ItemDetail
    │   ├── App.jsx     # main component with routing
    │   └── main.jsx    # entry point
    ├── package.json
    ├── .env.local      # Clerk key
    └── vite.config.js
```

## What It Does

- Sign up and log in with Clerk
- Browse items other students are selling
- Create listings to sell your stuff
- Search for items you want
- View seller info and contact them
- Delete your own listings

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose

**Frontend:** React, Vite, Tailwind CSS, Axios, Clerk

## Quick Start

### Prerequisites

You'll need:
- Node.js 16+ and npm
- MongoDB (either locally or MongoDB Atlas)
- A Clerk account (free)

### Backend Setup

```bash
cd backend
npm install

# Create .env file and add:
# MONGODB_URI=mongodb://localhost:27017/campus-buddy
# PORT=5000

npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install

# Create .env.local file and add your Clerk key:
# VITE_CLERK_PUBLISHABLE_KEY=pk_your_key_here

npm run dev
```

Frontend will run on `http://localhost:5173`

### MongoDB Setup

**Option 1: Local MongoDB**
- Download and install from mongodb.com
- Connection string: `mongodb://localhost:27017/campus-buddy`

**Option 2: MongoDB Atlas (Cloud)**
- Sign up at mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string and add it to .env
- Format: `mongodb+srv://username:password@cluster.mongodb.net/campus-buddy`

### Clerk Setup

1. Go to clerk.com and create an account
2. Create a new application
3. Go to API Keys and copy your Publishable Key
4. Add it to `frontend/.env.local` as `VITE_CLERK_PUBLISHABLE_KEY`

## Using the App

1. Sign up with Clerk
2. Go to Marketplace to browse items
3. Click Create Listing to sell something
4. Click any item to see details and contact the seller
5. Delete your own listings anytime

## API Endpoints

**Users:**
- POST `/api/users/sync` - sync user from Clerk

**Items:**
- GET `/api/items` - get all items
- GET `/api/items/:id` - get single item
- POST `/api/items` - create new item
- DELETE `/api/items/:id` - delete item

That's it. Happy selling!

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local and add Clerk key
# VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:3000`

## 🔑 Getting Clerk Keys

1. Visit [clerk.com](https://clerk.com)
2. Create a new application
3. Get your **Publishable Key** from the dashboard
4. Add it to `frontend/.env.local`

## 📚 API Endpoints

### User Routes
- `POST /api/users/sync` - Sync user from Clerk to MongoDB
- `GET /api/users/:clerkId` - Get user by Clerk ID

### Item Routes
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item
- `GET /api/items/:id` - Get item by ID
- `DELETE /api/items/:id` - Delete item (owner only)

## 🎨 UI Components

### Navbar
- Navigation links (Home, Marketplace, Create Listing)
- Clerk authentication buttons
- Responsive mobile menu

### Pages
- **Home**: Landing page with features
- **Marketplace**: Browse all items with search
- **Create Listing**: Form to create new item
- **Item Detail**: View full item details

## 🔒 Authentication Flow

1. User clicks Sign In/Sign Up
2. Clerk modal opens
3. After authentication, user is synced to MongoDB
4. User can create listings and access protected routes

## 🎯 Future Enhancements

- Add item categories
- Implement messaging/chat system
- Add user profiles and reviews
- Payment integration
- Image upload for listings
- Advanced filtering and sorting
- Wishlist/favorites

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check your cloud URI
- Update `.env` file with correct `MONGODB_URI`

### Clerk Error
- Check if Publishable Key is correctly set in `.env.local`
- Ensure Clerk application is set to development mode

### CORS Issues
- Backend should have `cors()` middleware enabled
- Check frontend API base URL matches backend

### Port Already in Use
- Change `PORT` in backend `.env`
- Change `port` in frontend `vite.config.js`

## 📝 Notes

- Dark theme is applied by default (Tailwind Slate 900)
- Currency shown as ₹ (Rupees) - change if needed
- Items are sorted by newest first
- Empty state illustrations and loading states included

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack MERN development
- RESTful API design
- MongoDB schema design
- Express middleware
- React hooks and state management
- Protected routes
- Third-party authentication integration
- Responsive design with Tailwind CSS

---

**Happy Coding! 🚀**

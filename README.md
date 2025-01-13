# LinkedIn Clone

A Backend LinkedIn clone built with Express.js, Next.js, and MongoDB. This project implements core LinkedIn features including user authentication, profiles, professional networking, news feed, and real-time messaging.

## Tech Stack

### Backend
- Express.js
- MongoDB/PostgreSQL
- JSON Web Tokens (JWT) for authentication
- WebSocket for real-time features
- Typescript


## Features

### Phase 1: Authentication & User Management
- User registration and login
- JWT-based authentication
- Password reset functionality
- Email verification
- Protected routes

### Phase 2: User Profiles (Coming Soon)
- Professional profile creation
- Experience and education sections
- Skills and endorsements
- Profile photo upload
- Custom URL slugs

### Phase 3: Networking (Coming Soon)
- Connection requests
- Network management
- User search
- Recommendations

### Phase 4: Content & Feed (Coming Soon)
- Post creation and sharing
- News feed
- Like and comment functionality
- Post privacy settings

### Phase 5: Real-time Features (Coming Soon)
- Direct messaging
- Notifications
- Online status

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm 

### Installation

1. Clone the repository
```bash
git clone https://github.com/kcblaq/linkR-be.git
cd linkR
```

2. Install backend dependencies
```bash
npm install
```


3. Set up environment variables


4. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

## Project Structure

```
linkedin-clone/
 backend/
|── src/
    ├── config/
    ├── controller/
    ├── lib/
    ├── middleware/
    └── models/
    └── routes/  
    └── services/  
├── .env
├── package.json

```

## API Documentation

### Authentication Endpoints
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- POST /api/auth/reset-password - Password reset
- GET /api/auth/verify-email/:token - Email verification

(More endpoints will be documented as they are implemented)

## Deployment

This application is configured for deployment on Render:
- Backend: Web Service
- Frontend: Static Site
- Database: MongoDB


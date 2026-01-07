# Smart Rental Platform for Campus Items

## Overview

A full-stack MERN platform enabling secure rental transactions for campus equipment with support for 500+ potential users. The platform streamlines the process of renting and managing campus equipment including laptops, projectors, sports equipment, tools, and more.

## Features

### Core Features
- **User Authentication**: Secure JWT-based authentication system with role-based access control (Admin, Vendor, Renter)
- **Stripe Payment Integration**: Secure payment processing for rental deposits and transactions
- **Real-time Booking Scheduler**: Interactive calendar-based booking system with real-time availability tracking
- **User Review System**: Community-driven ratings and reviews for items and renters
- **Notification Service**: Email and in-app notifications for booking confirmations, reminders, and updates
- **Item Management**: Complete CRUD operations for rental items with detailed descriptions and images
- **Rental History**: Track past and upcoming rentals with detailed transaction history
- **Dispute Resolution**: Built-in system for handling rental disputes and complaints

## Tech Stack

### Frontend
- **React.js**: UI library for building interactive user interfaces
- **Redux**: State management for application data
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Axios**: HTTP client for API communication
- **React Router**: Client-side routing and navigation
- **Socket.IO Client**: Real-time communication and notifications

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **JWT (jsonwebtoken)**: Authentication tokens
- **Stripe API**: Payment processing integration
- **Socket.IO**: Real-time bidirectional communication
- **Nodemailer**: Email service for notifications
- **Multer**: File upload handling for item images

### Tools & Deployment
- **Git/GitHub**: Version control
- **npm**: Package manager
- **Postman**: API testing
- **Docker** (optional): Containerization
- **Heroku/AWS**: Cloud deployment

## Project Structure

```
Smart-Rental-Platform-Campus-Items/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Items/
│   │   │   ├── Booking/
│   │   │   ├── Reviews/
│   │   │   └── Notifications/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ItemDetails.jsx
│   │   │   └── Profile.jsx
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   └── store.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── environment.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── items.js
│   │   ├── bookings.js
│   │   ├── reviews.js
│   │   └── payments.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── itemController.js
│   │   ├── bookingController.js
│   │   ├── reviewController.js
│   │   └── paymentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── paymentService.js
│   │   └── notificationService.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── README.md
└── .gitignore
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (Local or Atlas)
- Stripe Account for payment integration
- Gmail account (for email notifications)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Items
- `GET /api/items` - Get all rental items
- `GET /api/items/:id` - Get item details
- `POST /api/items` - Create new item (vendor only)
- `PUT /api/items/:id` - Update item (vendor only)
- `DELETE /api/items/:id` - Delete item (vendor only)
- `GET /api/items/:id/availability` - Check item availability

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/item/:itemId` - Get item reviews
- `GET /api/reviews/user/:userId` - Get user reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Payments
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Get payment history

## Key Implementation Details

### Authentication
- JWT tokens stored in httpOnly cookies for security
- Role-based access control (RBAC)
- Token refresh mechanism for extended sessions

### Real-time Features
- Socket.IO for real-time booking updates
- Live notification system for rental status changes
- Real-time availability tracker

### Payment Processing
- Stripe integration for secure payment handling
- Deposit management and refund processing
- Transaction history and receipts

### Review System
- 5-star rating system with detailed feedback
- Moderation tools to prevent spam/abuse
- Review verification (verified renters only)

### Email Notifications
- Booking confirmation emails
- Rental reminders (24 hours before pickup)
- Payment receipts
- Review notifications

## Usage Guide

### For Renters
1. Sign up and create account
2. Browse available items
3. Check item details and reviews
4. Select dates and add item to cart
5. Proceed to payment via Stripe
6. Receive booking confirmation
7. Pick up item on scheduled date
8. Leave review after rental completion

### For Vendors
1. Register as vendor
2. Add rental items with details and images
3. Manage item availability calendar
4. View bookings and revenue
5. Handle customer inquiries
6. Respond to reviews

### For Admins
1. Monitor all platform activities
2. Manage user accounts
3. Resolve disputes
4. Generate platform analytics
5. Manage payment processing

## Security Features

- HTTPS encryption for all communications
- JWT-based authentication with secure token storage
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection and XSS prevention
- Rate limiting on API endpoints
- CORS configuration for cross-origin requests

## Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Deployment

### Heroku Deployment

1. Create Procfile in root directory
2. Set up environment variables in Heroku dashboard
3. Deploy using Heroku CLI:
```bash
heroku create your-app-name
heroku push heroku main
```

### AWS/Docker Deployment

1. Create Docker image
2. Push to AWS ECR
3. Deploy to ECS/EKS

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running and connection string is correct
- Check firewall rules allow MongoDB port access

**Stripe Integration Issues**
- Verify API keys are correctly set in environment variables
- Check Stripe dashboard for webhook configurations

**Real-time Updates Not Working**
- Ensure Socket.IO is properly configured
- Check browser console for connection errors

## Performance Optimization

- Database indexing on frequently queried fields
- Caching strategies using Redis
- Image optimization and CDN integration
- Frontend code splitting and lazy loading
- Backend query optimization

## Future Enhancements

- Mobile app (React Native)
- Advanced analytics dashboard
- AI-based recommendation system
- Integration with campus management systems
- SMS notifications
- Multi-language support
- Automated dispute resolution system
- Insurance integration for high-value items

## Support

For support, email support@smartrentalcampus.com or create an issue on GitHub.

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Author

Shubham2310030004

---

**Last Updated**: January 7, 2026
**Version**: 1.0.0

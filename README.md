# Clinical Trial Management System (ProcDNA)

A full-stack web application for managing pharmaceutical clinical trials with user authentication, trial CRUD operations, and comprehensive error handling.

## 🚀 Features

- **User Authentication**: Secure registration and login system with session management
- **Trial Management**: Create, read, update, and delete clinical trials
- **Dashboard**: Interactive dashboard with trial cards and statistics
- **Error Boundary**: Robust error handling with professional fallback UI
- **Responsive Design**: Mobile-friendly interface with modern CSS styling
- **Real-time Statistics**: Live updates on trial counts and recent activity
- **Form Validation**: Client-side validation with error feedback
- **Status Management**: Track trials through Planned, Ongoing, and Completed phases

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **React Router DOM 6.30.1** - Client-side routing
- **React Error Boundary 6.0.0** - Error handling
- **Axios 1.12.1** - HTTP client for API calls
- **CSS3** - Custom styling with component-specific CSS files

### Backend
- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB with Mongoose 8.18.1** - Database and ODM
- **Passport.js** - Authentication middleware
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **CORS** - Cross-origin resource sharing

### Testing
- **@testing-library/react 16.3.0** - React component testing
- **@testing-library/jest-dom 6.8.0** - Custom Jest matchers
- **@testing-library/user-event 13.5.0** - User interaction simulation

## 📁 Project Structure

```
procdna/
├── client/                          # React frontend
│   ├── public/                      # Static files
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Dashboard.js         # Main dashboard
│   │   │   ├── Login.js             # Login form
│   │   │   ├── Register.js          # Registration form
│   │   │   ├── TrialForm.js         # Trial creation/editing
│   │   │   ├── ConfirmModal.js      # Confirmation dialogs
│   │   │   ├── Footer.js            # Statistics footer
│   │   │   └── ProtectedRoute.js    # Route protection
│   │   ├── contexts/                # React contexts
│   │   │   └── AuthContext.js       # Authentication context
│   │   ├── styles/                  # CSS files
│   │   │   ├── components/          # Component-specific styles
│   │   │   │   ├── Auth.css
│   │   │   │   ├── Dashboard.css
│   │   │   │   ├── ErrorBoundary.css
│   │   │   │   ├── Footer.css
│   │   │   │   ├── Modal.css
│   │   │   │   ├── TrialCard.css
│   │   │   │   └── TrialForm.css
│   │   │   └── shared.css           # Shared styles
│   │   ├── App.js                   # Main App component
│   │   ├── index.js                 # Entry point with ErrorBoundary
│   │   └── package.json             # Frontend dependencies
│   └── README.md                    # Frontend documentation
├── server/                          # Express backend
│   ├── config/
│   │   └── passport.js              # Passport configuration
│   ├── controllers/                 # Business logic
│   │   ├── auth.controller.js       # Authentication controllers
│   │   └── clinicalTrials.controller.js # Trial controllers
│   ├── models/                      # Database models
│   │   ├── User.js                  # User schema
│   │   └── ClinicalTrial.js         # Trial schema
│   ├── routes/                      # API routes
│   │   ├── auth.route.js            # Authentication routes
│   │   └── clinicalTrials.route.js  # Trial routes
│   ├── index.js                     # Server entry point
│   ├── package.json                 # Backend dependencies
│   └── .env                         # Environment variables
└── README.md                        # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sobhadityachak/procDna.git
   cd procdna
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/clinical_trials
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/clinical_trials
   SESSION_SECRET=your_secret_key_here
   PORT=5000
   ```

4. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev    # Development mode with auto-reload
   # or
   npm start      # Production mode
   ```
   Server will run on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm start
   ```
   Client will run on `http://localhost:3000`

3. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 🧪 Testing

### Running Tests

#### Frontend Tests
```bash
cd client
npm test                    # Run tests in watch mode
npm test -- --coverage     # Run tests with coverage report
npm test -- --watchAll     # Run all tests in watch mode
```

#### Backend Tests
```bash
cd server
npm test                    # Run backend tests (when implemented)
```

### Testing Strategy

#### Frontend Testing
The application uses React Testing Library for component testing:

- **Component Tests**: Test individual component rendering and user interactions
- **Integration Tests**: Test component interactions and data flow
- **Error Boundary Tests**: Verify error handling and fallback UI

#### Manual Testing Checklist

**Authentication Flow:**
- [ ] User can register with valid credentials
- [ ] User cannot register with invalid/existing credentials
- [ ] User can login with valid credentials
- [ ] User cannot login with invalid credentials
- [ ] User session persists across browser refresh
- [ ] User can logout successfully

**Trial Management:**
- [ ] User can create a new trial with valid data
- [ ] Form validation prevents invalid trial creation
- [ ] User can view all their trials on dashboard
- [ ] User can edit existing trials
- [ ] User can delete trials with confirmation
- [ ] Date validation works correctly (end date after start date)

**Dashboard Features:**
- [ ] Dashboard displays trial statistics correctly
- [ ] Trial cards show proper status colors
- [ ] Footer statistics update in real-time
- [ ] Responsive design works on mobile devices

**Error Handling:**
- [ ] Error boundary catches and displays errors properly
- [ ] Network errors show appropriate messages
- [ ] Form validation errors are displayed clearly
- [ ] 404 and authentication errors handled gracefully

#### Test Data

For testing, you can use the following sample data:

**Test User:**
```json
{
  "fullName": "Test User",
  "username": "testuser",
  "password": "password123"
}
```

**Sample Trial:**
```json
{
  "trialName": "COVID-19 Vaccine Phase III",
  "description": "Large-scale efficacy trial for COVID-19 vaccine",
  "startDate": "2024-01-15",
  "endDate": "2024-12-15",
  "status": "Ongoing"
}
```

## 📖 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user
```json
{
  "fullName": "John Doe",
  "username": "johndoe",
  "password": "password123"
}
```

#### POST `/api/auth/login`
Authenticate user
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

#### POST `/api/auth/logout`
Logout current user

#### GET `/api/auth/user`
Get current authenticated user

### Clinical Trial Endpoints

#### GET `/api/trials`
Get all trials for authenticated user

#### POST `/api/trials`
Create a new trial
```json
{
  "trialName": "Trial Name",
  "description": "Trial description",
  "startDate": "2024-01-01",
  "endDate": "2024-12-31",
  "status": "Planned"
}
```

#### PUT `/api/trials/:id`
Update existing trial

#### DELETE `/api/trials/:id`
Delete trial

#### GET `/api/trials/stats`
Get trial statistics

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach with breakpoints at 480px, 768px, 1200px
- Grid layouts that adapt to screen size
- Touch-friendly buttons and interactions

### Visual Design
- Modern gradient backgrounds
- Card-based layout for trials
- Color-coded status indicators:
  - **Blue**: Planned trials
  - **Orange**: Ongoing trials  
  - **Green**: Completed trials
- Smooth animations and transitions

### Error Handling
- Professional error boundary with modal interface
- Form validation with inline error messages
- Network error handling with retry options
- Confirmation modals for destructive actions

## 🔧 Development

### Code Organization

#### CSS Architecture
- Component-specific CSS files in `src/styles/components/`
- Shared styles in `src/styles/shared.css`
- CSS imports organized in `App.css`

#### State Management
- React Context API for authentication state
- Local state for component-specific data
- useEffect hooks for side effects and data fetching

#### Error Handling
- React Error Boundary at application root
- Axios interceptors for API error handling
- Form validation with user-friendly messages

### Best Practices
- **Security**: Password hashing, session management, CORS configuration
- **Performance**: Component memoization, efficient re-renders
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels
- **Code Quality**: ESLint configuration, consistent formatting

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
```
Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
1. Set up MongoDB Atlas for production database
2. Configure environment variables on your hosting platform
3. Deploy to services like Heroku, Railway, or DigitalOcean

### Environment Variables for Production
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/clinical_trials
SESSION_SECRET=your_production_secret
PORT=5000
NODE_ENV=production
``
# Number Discussions

A full-stack web application where users communicate through numbers and mathematical operations, creating tree-like discussion threads.

![Number Discussions](https://img.shields.io/badge/Next.js-16.0-black) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🎯 Features

- **User Authentication**: Register and login with secure JWT tokens
- **Number Discussions**: Start conversations with numbers
- **Mathematical Operations**: Add, subtract, multiply, and divide
- **Tree Structure**: Build nested calculation chains
- **Real-time Updates**: See new discussions as they happen
- **Modern UI**: Beautiful gradient design with responsive layout
- **MongoDB Atlas**: Cloud database with data persistence

## 🛠 Technology Stack

- **Frontend**: React 19, Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB Atlas with Mongoose
- **Authentication**: JWT + bcryptjs
- **Deployment**: Docker ready, Vercel compatible

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- MongoDB Atlas account (or use the provided connection)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd numberapp

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```

## 🎮 How to Use

1. **View Discussions**: Browse all number discussions without login
2. **Register**: Create an account (username min 3 chars, password min 6 chars)
3. **Start Discussion**: Enter a starting number
4. **Add Operations**: Click "+ Add Response" on any number
   - Select operation (+, -, ×, ÷)
   - Enter right operand
   - Result is calculated automatically
5. **Build Trees**: Keep responding to create nested calculation chains

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run docker:build # Build Docker image
npm run docker:up    # Start with Docker Compose
```

## 🏗 Project Structure

```
numberapp/
├── app/
│   ├── api/          # API routes
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Main page
├── components/       # React components
├── lib/              # Utilities & database
│   ├── mongodb.ts    # MongoDB connection
│   ├── models.ts     # Mongoose schemas
│   ├── auth.ts       # JWT utilities
│   ├── types.ts      # TypeScript types
│   └── utils.ts      # Helper functions
└── public/           # Static assets
```

## 🔐 Security

- bcrypt password hashing (10 salt rounds)
- JWT token authentication (7-day expiry)
- Protected API routes
- Input validation (client & server)
- MongoDB injection prevention
- Environment variable secrets

## 🐳 Docker Deployment

```bash
# Build and run
docker-compose up --build

# Stop containers
docker-compose down
```

## ☁️ Cloud Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

- Netlify
- Railway
- Render
- Fly.io

## 🧪 Testing

1. Open http://localhost:3000
2. Register: username `demo`, password `demo123`
3. Start discussion: `100`
4. Add response: `100 + 50 = 150`
5. Continue building the tree!

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user

### Calculations
- `GET /api/calculations` - Get all calculations (public)
- `POST /api/calculations` - Create calculation (requires auth)

## 🎨 UI Features

- Gradient backgrounds
- Glass morphism effects
- Responsive grid layout
- Animated loading states
- Live update indicator
- Icon-enhanced sections
- Smooth transitions

## 📱 Responsive Design

- **Desktop**: 3-column layout with sidebar
- **Tablet**: 2-column optimized layout
- **Mobile**: Single column, touch-friendly

## 🔄 Real-time Updates

- Auto-refresh every 5 seconds
- Live indicator shows active updates
- No page reload required
- Instant feedback on all actions

## 🤝 Business Scenarios (Assignment)

✅ Unregistered users can view all discussions  
✅ Unregistered users can create accounts  
✅ Users can authenticate and login  
✅ Registered users can start calculation chains  
✅ Registered users can add operations  
✅ Users can respond to any calculation  

## 📄 License

Test assignment for Ellty - Taskina Pty Ltd

## 👨‍💻 Author

Created as part of the Full Stack Developer test assignment

---

**Built with ❤️ using Next.js, React, TypeScript & MongoDB Atlas**


## 🎯 Features

- **User Authentication**: Register and login with username/password
- **Starting Numbers**: Authenticated users can start new discussions with a starting number
- **Operation Responses**: Add mathematical operations (+, -, ×, ÷) to any number in the tree
- **Real-time Updates**: Automatic polling to show new discussions and responses
- **Tree Visualization**: View all calculation chains in an expandable tree structure
- **Public Viewing**: Unregistered users can view all discussions

## 🛠 Technology Stack

- **Frontend**: React 19, Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Authentication**: JWT with bcryptjs password hashing
- **Data Storage**: In-memory database (easily replaceable with PostgreSQL/MongoDB)
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn
- Docker and Docker Compose (optional, for containerized deployment)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd numberapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

1. **View Discussions**: Anyone can view all number discussions without authentication
2. **Register**: Create an account with a username (min 3 chars) and password (min 6 chars)
3. **Login**: Authenticate with your credentials
4. **Start Discussion**: Enter a starting number to begin a new calculation tree
5. **Add Response**: Click "Add Response" on any number to:
   - Select an operation (+, -, ×, ÷)
   - Enter a right operand
   - The result becomes the new number in the tree
6. **Expand/Collapse**: Click the arrow buttons to expand or collapse discussion branches

## 🏗 Project Structure

```
numberapp/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts       # Login endpoint
│   │   │   └── register/route.ts    # Registration endpoint
│   │   └── calculations/route.ts     # Calculations CRUD
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                      # Main application page
├── components/
│   ├── AddCalculation.tsx            # Form to add calculations
│   ├── AuthForm.tsx                  # Login/Register form
│   ├── CalculationNode.tsx           # Single calculation node
│   └── CalculationTree.tsx           # Tree visualization
├── lib/
│   ├── auth.ts                       # JWT authentication utilities
│   ├── db.ts                         # In-memory database
│   ├── types.ts                      # TypeScript type definitions
│   └── utils.ts                      # Calculation utilities
├── public/
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🔐 Security Features

- Password hashing with bcryptjs (salt rounds: 10)
- JWT token-based authentication (7-day expiry)
- Authorization middleware for protected routes
- Input validation on both client and server
- Environment variable support for JWT secret

## 🧪 Business Scenarios Covered

✅ 1. Unregistered users can see the tree of all user posts  
✅ 2. Unregistered users can create an account  
✅ 3. Unregistered users can authenticate and become registered users  
✅ 4. Registered users can start calculation chains with starting numbers  
✅ 5. Registered users can add operations on selected starting numbers  
✅ 6. Registered users can respond to any calculations with new operations  

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variable: `JWT_SECRET=your-secure-secret`
4. Deploy!

### Other Platforms

The application can be deployed to:
- Netlify
- Railway
- Render
- Any platform supporting Next.js

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Calculations
- `GET /api/calculations` - Get all calculations
- `POST /api/calculations` - Create new calculation (requires auth)

## 🔄 Future Enhancements

- Persistent database (PostgreSQL/MongoDB)
- WebSocket for real-time updates
- User profiles and avatars
- Edit/Delete calculations
- Calculation history per user
- Export calculations as JSON/CSV
- Unit and integration tests
- Code coverage reports

## 👨‍💻 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📄 License

This project was created as a test assignment for Ellty - Taskina Pty Ltd.

## 🙏 Acknowledgments

- Test assignment designed by Anton Taskin, CEO of Taskina Pty Ltd
- Built with Next.js, React, and TypeScript
- Styled with Tailwind CSS


GrowFit - Smart Farming Solutions
A modern web application for farmers to get AI-powered crop price predictions and farming insights.

Features
AI-powered crop price predictions
Farmer community platform
Knowledge hub for farming techniques
Market intelligence and price tracking
Multi-language support
Responsive design for all devices

**Frontend**
Next.js (React)
TypeScript
Tailwind CSS
Axios for API calls
**Backend**
Node.js
Express.js
MongoDB
JWT Authentication
RESTful API
Prerequisites
Node.js (v14 or higher)
MongoDB
npm or yarn

Setup
Clone the repository:
git clone https://github.com/yourusername/growfit.git
cd growfit
Install frontend dependencies:
cd frontend
npm install
Install backend dependencies:
cd ../backend
npm install
Set up environment variables:
For backend (backend/.env):

PORT=5000
MONGODB_URI=mongodb://localhost:27017/growfit
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=development
For frontend (frontend/.env.local):

NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_API_URL=http://localhost:5000/api
Running the Application
Start the backend server:
cd backend
npm run dev
Start the frontend development server:
cd frontend
npm run dev
Open your browser and navigate to:
http://localhost:3000
Project Structure

growfit/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── server.js
│   └── package.json
└── README.md


Contributing
Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
License
This project is licensed under the ISC License - see the LICENSE file for details.

Acknowledgments
Binarybyte for the original design and concept
All contributors who have helped shape this project

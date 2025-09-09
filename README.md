# Navi-Gator: Campus Navigation System

## About the Project
Navi-Gator is a smart and user-friendly campus navigation system designed for RTU college. It provides interactive maps, optimized routing, and detailed facility information to help students, faculty, and visitors navigate the campus efficiently. The platform ensures accessibility and time-saving convenience with a modern UI and cross-platform availability.

## Features
- **Interactive Campus Map**: Visual map showcasing buildings, pathways, and facilities, designed in Figma.
- **Smart Navigation & Routing**: Shortest and most convenient path suggestions between two locations.
- **Point of Interest (POI) Directory**: Quick details about classrooms, departments, libraries, labs, cafeterias, and hostels.
- **Modern User Interface**: Responsive design using React.js and Material UI.
- **Search & Filter Options**: Locate buildings or facilities by name or category (academic, residential, recreational, etc.).
- **Cross-Platform Accessibility**: Web application accessible via laptops and mobile devices.

## Tech Stack
- **Frontend**: React.js, Material UI (MUI), Leaflet, Streetview
- **Backend**: Node.js (Express.js)
- **Database**: MySQL
- **Design & Prototyping**: Figma
- **Version Control & Collaboration**: Git & GitHub

## Getting Started
Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MySQL
- Git

### Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/navi-gator.git
   cd navi-gator
   ```

2. **Install Dependencies:**
   ```bash
   # For frontend
   cd client
   npm install
   
   # For backend
   cd ../server
   npm install
   ```

3. **Configure Database:**
   - Create a MySQL database.
   - Import schema from `database/schema.sql` (to be created).
   - Update database credentials in `server/config/db.js`.

4. **Run the Application:**
   ```bash
   # Start backend
   cd server
   npm start

   # Start frontend
   cd ../client
   npm start
   ```

5. Open the app in your browser at `http://localhost:3000`.

## Project Structure
```
Navi-Gator/
│
├── client/                  # React frontend
│   ├── public/              # Static assets
│   ├── src/                 # React components & pages
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API calls
│   │   └── App.js           # Main React file
│   └── package.json
│
├── server/                  # Node.js backend
│   ├── config/              # Database configuration
│   ├── routes/              # Express routes
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   └── package.json
│
├── database/                # MySQL schema & seed files
│
├── design/                  # Figma exports and prototypes
├── Resources/
│   └──Logos
├── README.md
└── .gitignore
```

## Contribution
- Fork the repo and create a new branch for your feature or bugfix.
- Commit changes with clear messages.
- Submit a pull request for review.

## License
This project is for educational purposes as part of a college minor project. Licensing can be added if extended further.

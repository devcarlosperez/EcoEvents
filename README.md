# EcoEvents

EcoEvents is a full-stack web application designed for managing and participating in ecological events. Users can sign up, log in, create events, join events as participants, and leave comments. The platform includes an admin panel for event management and supports image uploads for events.

## Features

- **User Authentication**: Secure login and signup with JWT tokens.
- **Event Management**: Create, view, and manage ecological events (e.g., clean-ups, workshops).
- **Participation**: Users can join or leave events as participants.
- **Comments**: Add and view comments on events.
- **Admin Panel**: Admins can oversee and manage all events.
- **Image Uploads**: Support for uploading event images.
- **Responsive UI**: Built with React and TypeScript for a modern, mobile-friendly interface.

## Tech Stack

### Backend
- **Node.js** with **Express.js** for the API server.
- **Sequelize** ORM with **MySQL** for database management.
- **JWT** for authentication.
- **Multer** for file uploads.
- **bcryptjs** for password hashing.
- **CORS** for cross-origin requests.

### Frontend
- **React** with **TypeScript** for the user interface.
- **Vite** for fast development and building.
- **SCSS** for styling.
- **ESLint** for code linting.

### Other
- **Postman Collection**: Available in `docs/EcoEvents.postman_collection.json` for API testing.
- **Database Migrations/Seeds**: Managed via Sequelize CLI.

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** database server
- A code editor (e.g., VS Code)

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/EcoEvents.git
cd EcoEvents
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend/` directory.
   - Add the following (adjust values as needed):
     ```
     DB_HOST=localhost
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_NAME=ecoevents_db
     JWT_SECRET=your_jwt_secret_key
     PORT=3000
     ```

4. Set up the database:
   - Create a MySQL database named `ecoevents_db`.
   - Run migrations to create tables:
     ```bash
     npm run migrations
     ```
   - (Optional) Seed the database with sample data:
     ```bash
     npm run seeds
     ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:3000`.

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` (default Vite port).

## Usage

1. **Access the Application**:
   - Open `http://localhost:5173` in your browser.
   - Sign up for a new account or log in.

2. **Key Pages**:
   - **Home**: View all events.
   - **Create Event**: Add a new event (requires login).
   - **Event Details**: View event info, participants, and comments.
   - **Admin**: Manage events (admin access only).
   - **About**: Learn more about the project.

3. **API Testing**:
   - Import `docs/EcoEvents.postman_collection.json` into Postman.
   - Test endpoints like user registration, event creation, etc.

## API Overview

The backend provides RESTful APIs. Key endpoints (based on the Postman collection):

- **Users**:
  - `POST /api/users/register` - Register a new user.
  - `POST /api/users/login` - Log in and get JWT token.
  - `GET /api/users/profile` - Get user profile (authenticated).

- **Events**:
  - `GET /api/events` - List all events.
  - `POST /api/events` - Create a new event (authenticated).
  - `GET /api/events/:id` - Get event details.
  - `PUT /api/events/:id` - Update event (authenticated, owner/admin).
  - `DELETE /api/events/:id` - Delete event (authenticated, owner/admin).

- **Event Participants**:
  - `POST /api/events/:id/participants` - Join an event (authenticated).
  - `DELETE /api/events/:id/participants` - Leave an event (authenticated).

- **Comments**:
  - `GET /api/events/:id/comments` - Get comments for an event.
  - `POST /api/events/:id/comments` - Add a comment (authenticated).
  - `DELETE /api/comments/:id` - Delete a comment (authenticated, owner/admin).

For full details, refer to the Postman collection or the route files in `backend/routes/`.

## Project Structure

```
EcoEvents/
├── backend/                 # Node.js/Express API
│   ├── config/              # Database and app config
│   ├── controllers/         # Route handlers
│   ├── middlewares/         # Auth and upload middleware
│   ├── migrations/          # Sequelize migrations
│   ├── models/              # Database models
│   ├── public/images/       # Uploaded images
│   ├── routes/              # API routes
│   ├── seeders/             # Sample data
│   ├── index.js             # Server entry point
│   └── package.json
├── frontend/                # React/TypeScript app
│   ├── src/
│   │   ├── Components/      # Reusable UI components
│   │   ├── Pages/           # Page components
│   │   ├── Services/        # API service functions
│   │   ├── Styles/          # Global styles
│   │   ├── Types/           # TypeScript types
│   │   └── App.tsx          # Main app component
│   ├── public/              # Static assets
│   ├── index.html           # HTML template
│   └── package.json
├── docs/                    # Documentation and Postman collection
└── README.md                # This file
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Troubleshooting

- **Database Issues**: Ensure MySQL is running and credentials in `.env` are correct. Run `npm run drop:migrations` and `npm run migrations` to reset.
- **Frontend Errors**: Check console for TypeScript/ESLint issues. Run `npm run lint` to fix.
- **Port Conflicts**: Change ports in `.env` or Vite config if needed.

For more help, check the code comments or open an issue on GitHub.
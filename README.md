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
   - Create a `.env` file in the `backend/` directory based on `.env.example`:
     ```
     DB_HOST=localhost
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_NAME=eco_events
     DB_DIALECT=mysql
     JWT_SECRET=your_jwt_secret_key
     PORT=8000
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

The backend provides RESTful APIs. Key endpoints:

- **Users** (`/api/users`):
  - `POST /api/users` - Register a new user.
  - `POST /api/users/login` - Log in and get a JWT token.
  - `GET /api/users/:id` - Get a user by ID (authenticated).
  - `GET /api/users` - Get all users (admin only).
  - `PUT /api/users/:id` - Update a user (authenticated).
  - `DELETE /api/users/:id` - Delete a user (authenticated).

- **Events** (`/api/events`):
  - `GET /api/events` - List all events (authenticated).
  - `POST /api/events` - Create a new event with image upload (authenticated).
  - `GET /api/events/:id` - Get event details (authenticated).
  - `PUT /api/events/:id` - Update event with image upload (admin only).
  - `PUT /api/events/status/:id` - Update event status (admin only).
  - `DELETE /api/events/:id` - Delete an event (admin only).

- **Event Participants** (`/api/event-participants`):
  - `POST /api/event-participants` - Join an event (authenticated).
  - `GET /api/event-participants` - Get all participants (authenticated).
  - `GET /api/event-participants/:id` - Get a participant by ID (authenticated).
  - `PUT /api/event-participants/:id` - Update a participant (authenticated).
  - `DELETE /api/event-participants/:id` - Leave an event (authenticated).

- **Comments** (`/api/comments`):
  - `POST /api/comments` - Add a comment (authenticated).
  - `GET /api/comments` - Get all comments (authenticated).
  - `GET /api/comments/:id` - Get a comment by ID (authenticated).
  - `PUT /api/comments/:id` - Update a comment (authenticated).
  - `DELETE /api/comments/:id` - Delete a comment (authenticated).

For full details, refer to the Postman collection in `docs/EcoEvents.postman_collection.json` or the route files in `backend/routes/`.

## Project Structure

```
EcoEvents/
├── backend/                 # Node.js/Express API
│   ├── config/              # Database and Sequelize config
│   │   ├── config.js
│   │   └── db.js
│   ├── controllers/         # Route handlers
│   │   ├── comment.controller.js
│   │   ├── event.controller.js
│   │   ├── event-participant.controller.js
│   │   └── user.controller.js
│   ├── middlewares/         # Auth (JWT) and Multer (file upload)
│   │   ├── auth.js
│   │   └── multer.js
│   ├── migrations/          # Sequelize migrations
│   ├── models/              # Sequelize models
│   │   ├── comment.model.js
│   │   ├── event.model.js
│   │   ├── event-participant.model.js
│   │   ├── user.model.js
│   │   └── index.js
│   ├── public/images/       # Uploaded event images
│   ├── routes/              # Express route definitions
│   │   ├── comment.routes.js
│   │   ├── event.routes.js
│   │   ├── event-participant.routes.js
│   │   └── user.routes.js
│   ├── seeders/             # Sample data seeders
│   ├── index.js             # Server entry point
│   └── package.json
├── frontend/                # React/TypeScript app
│   ├── src/
│   │   ├── assets/          # Images and static files
│   │   ├── Components/      # Reusable UI components
│   │   │   ├── AdminEventCard/
│   │   │   ├── Context/     # Auth context (AuthContext, AuthContextProvider)
│   │   │   ├── Event-Card/
│   │   │   ├── EventDetails/
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── Input/
│   │   │   ├── Submit/
│   │   │   └── Title/
│   │   ├── Pages/           # Page-level components
│   │   │   ├── About/
│   │   │   ├── Admin/
│   │   │   ├── CreateEvent/
│   │   │   ├── Event/
│   │   │   ├── Events/
│   │   │   ├── Login/
│   │   │   ├── NotFound/
│   │   │   └── SignUp/
│   │   ├── Services/        # API service functions
│   │   │   ├── api.ts
│   │   │   ├── CommentService.ts
│   │   │   ├── EventParticipantService.ts
│   │   │   ├── EventService.ts
│   │   │   └── UserService.ts
│   │   ├── Styles/          # Global SCSS variables
│   │   ├── Types/           # TypeScript types
│   │   ├── Utils/           # Utility functions (e.g. formatDate)
│   │   ├── App.tsx          # App routes
│   │   ├── Layout.tsx       # Shared layout (Header + Footer)
│   │   └── main.tsx         # Entry point
│   ├── index.html
│   └── package.json
├── docs/                    # Postman collection
│   └── EcoEvents.postman_collection.json
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the ISC License. See the LICENSE file for details.

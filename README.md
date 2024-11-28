# User and Post Management Frontend

A modern React application built with TypeScript that provides a user interface for managing users and their posts. The application features a clean, responsive design with pagination and dynamic routing.

## 🚀 Features

- **User Management**
  - View list of users with detailed information
  - Paginated user list for better performance
  - Display user details including name, email, and address
  
- **Post Management**
  - View posts for each user
  - Delete posts functionality
  - Responsive grid layout for posts

## 🛠 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: 
  - Zustand for global state
  - React Query for server state
- **Styling**: 
  - TailwindCSS for styling
  - Radix UI components
  - Lucide React for icons
- **Build Tool**: Vite

## 📦 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will start running at `http://localhost:5173`

## 🏗 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview the production build locally

## 📱 Application Structure

The application consists of two main pages:

1. **Users Page** (`/`)
   - Displays a table of users with their details
   - Includes pagination for better performance
   - Each user row is clickable and navigates to their posts

2. **Posts Page** (`/users/:userId/posts`)
   - Shows all posts for a selected user
   - Displays user information at the top
   - Grid layout of post cards
   - Ability to delete posts

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
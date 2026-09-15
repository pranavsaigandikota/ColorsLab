# COLORS LAMP Application

## Description
COLORS is a simple web application that allows users to manage their favorite colors. It provides a platform to securely log in, search for previously saved colors, and add new colors to a personalized list. This repository contains the source code organized for version control and deployment.

## Features
- User Login: Secure access using user credentials.
- Invalid-Login Handling: Error messaging for incorrect usernames or passwords.
- Add Color: Users can add new favorite colors to their profiles.
- Search Colors: Users can search their saved colors.
- Per-User Data: Each user's color list is isolated and linked exclusively to their account.

## Technologies Used
- HTML, CSS, JavaScript (Frontend)
- PHP (Backend API)
- MySQL (Database)
- Apache (Web Server)
- Ubuntu Linux, DigitalOcean (Hosting environment)
- Git/GitHub (Version Control)

## Repository Structure
```text
colors-lamp/
├── api/                   # Backend PHP API endpoints
├── database/              # SQL schema for database setup
├── public/                # Frontend static assets (HTML, CSS, JS, images)
├── .gitignore             # Git ignore rules
├── LICENSE.md             # MIT License
└── README.md              # Project documentation
```

## Prerequisites
- A LAMP stack environment (Linux, Apache, MySQL, PHP) configured.
- Git installed on your system.

## Setup Instructions

### Database Setup
1. Open your MySQL client.
2. Run the provided database schema file to set up the necessary tables:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   *This sets up the `COP4331` database with the required `Users`, `Colors`, and `Contacts` tables.*

### Configuration
1. Navigate to the `api/` directory.
2. Copy the example configuration file to create your active configuration:
   ```bash
   cp api/config.example.php api/config.php
   ```
3. Open `api/config.php` and enter your local MySQL credentials.

### Deployment
Deploy the application to your Apache web root:
1. Copy the frontend files to the web server's root directory:
   ```bash
   cp -r public/* /var/www/html/
   ```
2. Copy the backend API files to the LAMPAPI directory:
   ```bash
   mkdir -p /var/www/html/LAMPAPI
   cp -r api/* /var/www/html/LAMPAPI/
   ```

### Accessing the Application
Once deployed, open your web browser and navigate to your configured server URL (e.g., `http://your-server-ip/` or `http://localhost/`) to access the COLORS application.

## API Endpoint Summary
The frontend communicates with the backend using these endpoints located in `/LAMPAPI/`:
- **Login (`Login.php`)**: Authenticates a user and returns their user ID.
- **Add Color (`AddColor.php`)**: Adds a new color to the authenticated user's list.
- **Search Colors (`SearchColors.php`)**: Returns a list of colors matching the search query for the authenticated user.

## Assumptions and Limitations
- **Educational Context**: This application is built for an educational lab environment and assumes the usage of a specific directory structure (`/LAMPAPI/`).
- **Security Limitation**: This is an educational lab application. Before any real-world use, it must be upgraded to include password hashing, HTTPS enforcement, stronger input validation, and production-grade secret management. The current implementation stores passwords in plain text for demonstration purposes only.

## AI Assistance Disclosure

This project was developed with assistance from generative AI tools:

- **Tool**: Gemini 3.1 Pro
- **Dates**: September 24, 2026
- **Scope**: Repository structure, PHP API development, HTML/CSS frontend UI.
- **Use**: Generated PHP backend scripts for API endpoints to help with syntax, designed the UI layout and styles, formatted the README to look cleaner.

All AI-generated code was reviewed, tested, and modified to meet 
assignment requirements. Final implementation reflects my understanding 
of the concepts.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

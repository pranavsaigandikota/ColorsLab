# COLORS LAMP Application

## Description
COLORS is a simple web application that allows users to manage their favorite colors. It provides a platform to log in, search for previously saved colors, and add new colors to a personalized list. This repository contains the source code organized for version control and deployment.

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

From the repository root, copy the example configuration:

```bash
cp api/config.example.php api/config.php
```

Open `api/config.php` and replace the placeholder values with the MySQL credentials configured on your server. The active `config.php` file is excluded from Git and must never be committed.

### Deployment to DigitalOcean

The application source is stored in GitHub, while the running application is hosted on a DigitalOcean Ubuntu LAMP droplet.

From Windows PowerShell, connect to the server:

```powershell
ssh root@<server-ip-address>
```

Clone the repository on the server:

```bash
cd /opt
git clone https://github.com/pranavsaigandikota/ColorsLab.git colorslab-source
cd colorslab-source
```

Create the private database configuration:

```bash
cp api/config.example.php api/config.php
nano api/config.php
```

Enter the MySQL credentials configured on the server. Do not commit this file.

Deploy the frontend:

```bash
cp -r public/. /var/www/html/
```

Deploy the API:

```bash
mkdir -p /var/www/html/LAMPAPI
cp api/*.php /var/www/html/LAMPAPI/
```

Set the web-server permissions:

```bash
chown -R www-data:www-data /var/www/html
find /var/www/html -type d -exec chmod 755 {} \;
find /var/www/html -type f ! -name config.php -exec chmod 644 {} \;
chmod 640 /var/www/html/LAMPAPI/config.php
```

Open the configured DigitalOcean server URL in a browser to access the application.

GitHub hosts the version-controlled source code; DigitalOcean hosts and executes the PHP/MySQL application.

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

- **Tool**: Claude Code (Claude Opus 5.5)
- **Dates**: September 14-15, 2026
- **Scope**: Repository structure, PHP API development, HTML/CSS frontend UI.
- **Nature of use**: Generated initial PHP backend scripts for API endpoints, helped with syntax, informed the UI layout and styles, and formatted the README. The generated work was reviewed and modified.
- **Tool**: Claude Code (Claude Opus 5.5)
- **Dates**: September 15-16, 2026
- **Scope**: README documentation corrections and DigitalOcean deployment instructions.
- **Nature of use**: Clarified the configuration and DigitalOcean deployment instructions and corrected wording.

All AI-generated code was reviewed, tested, and modified to meet
assignment requirements. Final implementation reflects my understanding
of the concepts.
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

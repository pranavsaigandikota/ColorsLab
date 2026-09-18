# COLORS LAMP Application

## Description
COLORS is a simple web application that allows users to manage their favorite colors. It provides a platform to log in, search for previously saved colors, and add new colors to a personalized list. This repository contains the source code organized for version control and deployment.

## Features
- User Login: Sign in with a username and password stored in the database (see Limitations).
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
ColorsLab/
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
1. From the repository root, run the provided schema file:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   *This creates the `COP4331` database with the `Users` and `Colors` tables used by the application.*
2. Create a MySQL user for the API to connect with. Open the MySQL shell (`mysql -u root -p`), choose your own username and password, and run:
   ```sql
   CREATE USER '<db-username>'@'localhost' IDENTIFIED BY '<db-password>';
   GRANT SELECT, INSERT ON COP4331.* TO '<db-username>'@'localhost';
   ```
   These are the values you will enter in `api/config.php` in the Configuration step.

### Creating a Login Account
The app has no registration page, and no demo account is included. Add an account directly in the MySQL shell, replacing the placeholders with your own values:

```sql
INSERT INTO COP4331.Users (FirstName, LastName, Login, Password)
VALUES ('<first-name>', '<last-name>', '<login>', '<password>');
```

Sign in on the login page with the `<login>` and `<password>` you chose. Passwords are stored and compared as plain text (see Limitations).

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

Set up the database and a login account as described in Database Setup and Creating a Login Account above.

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

GitHub hosts the version-controlled source code; DigitalOcean hosts and executes the PHP/MySQL application.

## Running and Accessing the Application

Apache and MySQL start automatically on the droplet, so the application is running as soon as the files are deployed. To use it:

1. Open `http://<server-ip-address>/` in a web browser.
2. Sign in with the login and password you created in Creating a Login Account.
3. On the colors page, type a color name and select **Add Color** to save it.
4. Type part of a color name and select **Search Color** to list your matching saved colors.
5. Select **Log Out** to return to the login page.

If login fails with valid credentials, check that the values in `/var/www/html/LAMPAPI/config.php` match the MySQL user from Database Setup.

## API Endpoint Summary
The frontend communicates with the backend using these endpoints located in `/LAMPAPI/`:
- **Login (`Login.php`)**: Authenticates a user and returns their user ID.
- **Add Color (`AddColor.php`)**: Adds a new color to the authenticated user's list.
- **Search Colors (`SearchColors.php`)**: Returns a list of colors matching the search query for the authenticated user.

The frontend builds these URLs from the `urlBase` constant at the top of `public/js/code.js`, which is set to the relative path `/LAMPAPI`. No server address needs to be changed as long as the API is deployed to `/var/www/html/LAMPAPI/`. If you deploy the API to a different path, update `urlBase` to match.

## Assumptions and Limitations
- **Educational Context**: This application is built for an educational lab environment and assumes the usage of a specific directory structure (`/LAMPAPI/`).
- **No Registration**: There is no sign-up page. Accounts must be created directly in MySQL (see Creating a Login Account).
- **Security Limitation**: This is an educational lab application. Before any real-world use, it must be upgraded to include password hashing, HTTPS enforcement, stronger input validation, and production-grade secret management. The current implementation stores passwords in plain text for demonstration purposes only.

## AI Assistance Disclosure

This project was developed with assistance from generative AI tools:

- **Tool**: Claude Code (Claude Opus 5.5)
- **Dates**: September 14-15, 2026
- **Scope**: Repository structure, PHP API development, and HTML/CSS frontend UI.
- **Nature of use**: Generated initial PHP backend scripts for API endpoints, helped with syntax, informed the UI layout and styles, and formatted the README. The generated work was reviewed and modified.

- **Tool**: Claude Code (Claude Opus 5.5)
- **Dates**: September 15-16, 2026
- **Scope**: README documentation corrections and DigitalOcean deployment instructions.
- **Nature of use**: Clarified the configuration and DigitalOcean deployment instructions and corrected wording.

- **Tool**: Claude Code (Claude Opus 5.5)
- **Dates**: September 17, 2026
- **Scope**: Application access instructions, README corrections, and database schema cleanup.
- **Nature of use**: Removed the unused `Contacts` table from the schema, documented the database setup steps for the MySQL user and a login account, documented the frontend API path, added the running and access instructions, and corrected inaccurate README wording.

All AI-generated code was reviewed, tested, and modified to meet
assignment requirements. Final implementation reflects my understanding
of the concepts.
## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

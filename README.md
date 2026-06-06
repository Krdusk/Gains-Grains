# Gains&Grains

## Project Overview:
**Gains & Grains** is an e-commerce platform built for a Database Systems course. The application integrates a web-based interface with a relational database to demonstrate dynamic product management, user authentication, order handling, and administrative controls.

## Developers:
- Samantha Lui A. Santos — Full Stack Developer and Tester
- Mhicaela Cinco — Concept Development and Debugging

## Design Inspiration:
The platform’s visual design focuses on a bold and engaging user experience with:

- **Neon Aesthetics**
  - High-contrast visuals and glowing elements for a modern, energetic interface.
- **Pixar Animations**
  - Clean, expressive, and user-friendly design inspired by Pixar’s storytelling style.

## Technical Stack:
- Server Environment: XAMPP
- Backend: PHP
- Database: MySQL (`gains_grains_db`)
- Data Format: JSON
- Frontend: HTML, CSS, JavaScript

## External Images:
The image assets are not included in this repository due to file size restrictions. Use the following Google Drive link to access the images used in the project:

https://drive.google.com/drive/folders/13bIDVPWpzNcNAUNWcsXkgFlCjigAzLFi?usp=sharing

## Prerequisites:
Ensure XAMPP is installed before running the project.

### Installing XAMPP:
1. Visit: https://www.apachefriends.org/download.html
2. Download the version for your operating system.
3. Run the installer and follow setup instructions.
4. Make sure Apache and MySQL are selected.
5. Install in a directory such as `C:\xampp`.

## Running the Project:

### 1. Prepare Project Files
- Open your XAMPP installation directory.
- Go to the `htdocs` folder.
- Create a folder named `G_G`.
- Copy all project files into `htdocs/G_G`.

### 2. Start Servers
- Open XAMPP Control Panel.
- Start Apache and MySQL.

### 3. Set Up the Database
- Open: http://localhost/phpmyadmin
- Create a database named `gains_grains_db`.
- Import the SQL file located in `database/schema.sql`.

### 4. Access the Application
- Open in your browser: http://localhost/G_G/public/hmpg.html
- Admin page: http://localhost/G_G/public/admin.html
- User page: http://localhost/G_G/public/user.html

## Project Structure:
The repository is organized into these folders:

- `public/` — Frontend application files (`.html`, `.css`, `.js`, `images/`)
- `server/` — PHP backend endpoints and API scripts
- `tools/` — Utility scripts, maintenance tools, and test scripts
- `database/` — SQL schema and database setup files

## Notes:
- The frontend routes API requests to `../server/` from the `public/` folder.
- Comments have been removed from source files for a cleaner production-style repository.
- Images are provided separately via the Google Drive link above.

---

## Mario says:

<p align="center">
  <img src="mario.gif" alt="Mario Yipee" width="200"/>
</p>

<p align="center"><strong>Yippee!</strong></p>

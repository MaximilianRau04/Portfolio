# Maximilian Rau | Portfolio

Welcome to the repository of my portfolio website.
This site showcases selected projects, my technical focus, and my background as a software developer and software engineering student at the University of Stuttgart.

## Live Demo

You can view the website here:
[raudev.com](https://raudev.com)

The site is self-hosted on a server: nginx serves the static frontend and
reverse-proxies the contact API to a Node/Express backend (deployment configs in
[`deploy/`](deploy/)).

## Projects

My portfolio currently includes the following projects:

1. **AI Workspace**  
    AI-powered workspace for experimenting with large language models, automation workflows, and intelligent development tools.
2. **Event & Exchange Day Manager**  
    Internship project for managing company events, built with Spring Boot and Vue.js.
3. **CineMate**  
    Tracking application for movies and series, built with Spring Boot and React.
4. **CPU Architecture Project**  
    Project focused on CPU architecture and computer organization.

## Project Structure

```
docs/      Static frontend (HTML, CSS, JS, fonts) — served by nginx
backend/   Node/Express backend for the contact form (sends mail via SMTP)
deploy/    nginx site config + systemd service for the self-hosted server
```

## Local Setup

Run the portfolio locally with these steps:

1. Clone the repository
    ```bash
    git clone https://github.com/MaximilianRau04/Portfolio.git
    ```
2. Go to the project directory
    ```bash
    cd Portfolio
    ```
3. Open `docs/index.html` in your browser (or serve `docs/` with Live Server)

### Contact backend (optional)

The contact form posts to `/api/contact`, handled by the Node backend:

```bash
cd backend
npm install
cp .env.example .env   # fill in SMTP credentials and recipient email
npm start
```

## Contact

**Maximilian Rau**

- Email: [maximilian@raudev.com](mailto:maximilian@raudev.com)
- LinkedIn: [Maximilian Rau](https://www.linkedin.com/in/maximilian-rau-b63199340/)

---
© 2026 Maximilian Rau

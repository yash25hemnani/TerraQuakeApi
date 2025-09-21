# 🌋 TerraQuake API

<div align="center">

[![License](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://github.com/nagcas/TerraQuakeApi/blob/main/LICENSE.md)
[![GitHub Stars](https://img.shields.io/github/stars/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

A modern, open-source seismic data platform providing real-time earthquake information through a RESTful API and interactive visualization interface.

[Getting Started](#getting-started) • [Frontend Features](#frontend-features) • [API Reference](#api-reference) • [Support the Project](#support-the-project) • [Contributing](#contributing)

</div>

## Overview

TerraQuake is a comprehensive seismic data platform that combines a powerful REST API with an intuitive web interface. It provides researchers, developers, and organizations with easy access to real-time earthquake data, advanced filtering capabilities, and interactive visualizations.

---

## Project Overview

- **Backend (TerraQuake API)** — Node.js + Express REST API to serve earthquake data.
- **Frontend** — React + TailwindCSS interface for visualizing seismic events.
- **Data Source** — INGV (Istituto Nazionale di Geofisica e Vulcanologia) and synthetic demo data.
- **API Access** — Public endpoints for querying earthquakes by time, magnitude, location, and more.

---

## Technologies Used

### Backend

- **Node.js**
- **Express**
- **MongoDB** (planned for persistent data)
- **JWT** (for secure access, future feature)
- **Custom earthquake generator** (for demo/testing)

### Frontend

- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **React Router**
- **Hero sections, maps, charts** (via Leaflet, Chart.js – if added)

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Git

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/nagcas/TerraQuakeApi.git
   cd TerraQuakeApi
   ```
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```
4. Set up environment variables:
   - Copy `backend/.env-example` to `backend/.env` and fill in required values (e.g., database URL, API keys).
   - Copy `frontend/.env-example` to `frontend/.env` if needed.

5. Run the backend:
   ```
   cd backend
   npm run dev
   ```
6. Run the frontend (in a new terminal):
   ```
   cd frontend
   npm run dev
   ```

Visit `http://localhost:3000` for the frontend interface and `http://localhost:5000` for the API endpoints.

---

## API Reference

The TerraQuake API provides various endpoints for querying earthquake data. For detailed usage, examples, and testing, visit the [API Docs](http://localhost:3000/docs) in the running frontend.

### Available Endpoints

#### `GET /v1/earthquakes/recent`
Fetches recent earthquakes from the start of the year to today.
- Query: `?limit=50` (optional)

#### `GET /v1/earthquakes/today`
Fetches earthquakes that occurred today.
- Query: `?limit=50` (optional)

#### `GET /v1/earthquakes/last-week`
Fetches earthquakes from the last 7 days.
- Query: `?limit=50` (optional)

#### `GET /v1/earthquakes/month`
Fetches earthquakes for a specific month and year.
- Query: `?year=2025&month=03&limit=50` (year and month required)

#### `GET /v1/earthquakes/location`
Fetches earthquakes near a latitude/longitude.
- Query: `?latitude=40.835&longitude=14.117&radius=50&limit=50` (lat/lon required)

#### `GET /v1/earthquakes/region`
Fetches earthquakes in a specific Italian region.
- Query: `?region=Campania&limit=50` (region required)

#### `GET /v1/earthquakes/depth`
Fetches earthquakes at or below a specific depth.
- Query: `?depth=10&limit=50` (depth required)

#### `GET /v1/earthquakes/range-time`
Fetches earthquakes within a date range.
- Query: `?startdate=2025-01-01&enddate=2025-03-30&limit=50` (dates required)

#### `GET /v1/earthquakes/magnitude`
Fetches earthquakes of a specific magnitude or higher.
- Query: `?mag=2&limit=50` (mag required)

#### `GET /v1/earthquakes/eventId`
Fetches details of a specific earthquake by ID.
- Query: `?eventId=12345` (eventId required)

---

## Frontend Features

- Visualize earthquakes on an interactive map
- Filter events by date
- View statistics in chart format
- Educational UI: earthquake basics and seismic zones (planned)
- Search and filter functionality

---

## Author

Dr. Gianluca Chiaravalloti
Web Developer & Geologist
[LinkedIn]() [Portfolio](https://portfolio-gianluca-phi.vercel.app/)

## Contributing

Contributions are welcome!  
If you’d like to improve TerraQuake API, please fork the repository and open a pull request.  
Whether it’s fixing a bug, improving documentation, or adding a feature — all contributions are appreciated!

Please make sure to follow the [contributing guidelines](CONTRIBUTING.md).

## Community

Join our community on [Discord](https://discord.gg/RDBp8KJB) to connect, share ideas, and collaborate with other contributors.

## Hacktoberfest 2025

This project is participating in Hacktoberfest 2025!  
Contributions count toward the event. Feel free to submit PRs and join us in building TerraQuake API together 🌍

## Credits

### Core Team

- **Dr. Gianluca Chiaravalloti** - Project Lead & Founder
  - Web Developer & Geologist
  - [Portfolio](https://portfolio-gianluca-phi.vercel.app/)

### Key Contributors

- International team of 5 collaborators contributing to:
  - Backend Development
  - Frontend Enhancements
  - Testing & Quality Assurance
  - Documentation
  - Community Support

### Data Sources & Partners

- **INGV** (Istituto Nazionale di Geofisica e Vulcanologia)
  - Primary source of seismic data
  - Technical consultation on seismological aspects

### Technologies & Resources

- **Frontend Technologies**

  - React.js Documentation & Community
  - Tailwind CSS Framework
  - Vite Build Tool
  - OpenStreetMap for geographical data

- **Backend Technologies**
  - Node.js & Express.js Communities
  - MongoDB Documentation & Support
  - JWT Authentication Resources
  - ESLint & StandardJS

### Special Thanks

- Open Source Community
- Early Adopters & Testers
- Bug Reporters & Feature Requesters
- Documentation Contributors

## Support the Project

TerraQuake API is an open-source initiative aimed at making real-time seismic data accessible for developers, researchers, and communities.

If you find this project useful and would like to support its development, consider becoming a sponsor.
Your contribution helps:

Maintain and improve the API

Add new features and documentation

Keep the project open and accessible to everyone

Even a small donation makes a big difference in keeping the project alive and growing.

[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ff69b4?style=flat-square&logo=github)](https://github.com/sponsors/nagcas)

Thank you for supporting open source and helping TerraQuake API reach more people! 🌍

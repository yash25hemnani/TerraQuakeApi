# 🌋 TerraQuake API

<div align="center">

[![License](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://github.com/nagcas/TerraQuakeApi/blob/main/LICENSE.md)
[![GitHub Stars](https://img.shields.io/github/stars/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/nagcas/TerraQuakeApi)](https://github.com/nagcas/TerraQuakeApi/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

A modern, open-source seismic data platform providing real-time earthquake information through a RESTful API and interactive visualization interface.

[Getting Started](#-overview) • [Features](#project-overview) • [API Reference](#api-features) • [Use Cases](#frontend-features) • [Contributing](#-contributing)


</div>

## 📑 Overview

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

## API Features

### Available Endpoints

### Earthquake Endpoints
```bash
#### `GET  https://api.terraquakeapi.com/v1/earthquakes/recent?limit=50`

This endpoint retrieves all recent seismic events from the beginning of the year until today via the TerraQuake API sorted from the most recent to the least recent. It provides users with insight into ongoing seismic activity for the current year. The response includes details such as magnitude, location, depth, time, and unique event ID.

#### `https://api.terraquakeapi.com/v1/earthquakes/today?limit=50`

This endpoint retrieves all seismic events that occurred today (from 00:00 UTC to the current time) from the TerraQuake API. It allows users to monitor real-time seismic activity and provides a daily overview of ongoing earthquakes. The response includes detailed information such as magnitude, location, depth, event time, and coordinates.

#### `GET https://api.terraquakeapi.com/v1/earthquakes/last-week?limit=50`

This endpoint retrieves all seismic events that occurred in the last 7 days from the TerraQuake API.
It allows users to monitor and analyze recent seismic activity over the past week, providing insights into short-term trends and regional patterns.

#### `GET https://api.terraquakeapi.com/v1/earthquakes/month?year=2025&month=03&limit=50`

This endpoint retrieves all seismic events that occurred during a specific month and year from the TerraQuake API.
It allows users to explore historical earthquake data for a given period. The response includes detailed event information such as magnitude, location, depth, and timestamp.

#### `GET  https://api.terraquakeapi.com/v1/earthquakes/location?latitude=40.835459&longitude=14.117358&radius=50&limit=50`

This endpoint fetches seismic events close to a given geographical location, defined by latitude and longitude, with an optional search radius. It retrieves earthquakes that occurred from the beginning of the year up to the current date, allowing users to filter recent events based on their proximity to a specific point of interest.

#### `GET https://api.terraquakeapi.com/v1/earthquakes/region?region=Campania&limit=50`

This endpoint retrieves all seismic events that occurred within a specific Italian region from the TerraQuake API, 
from the start of the current year up to today. It allows users to filter earthquakes by regional boundaries 
for localized seismic analysis. The response includes key data such as magnitude, location, depth, and time.

### `GET https://api.terraquakeapi.com/v1/earthquakes/depth?depth=10&limit=50`

This endpoint retrieves all seismic events that occurred at a specific focal depth, measured in kilometers, 
from the TerraQuake API, from the start of the current year up to today. 
It allows users to analyze earthquakes based on their depth, which can help assess their potential surface impact.

### `GET https://api.terraquakeapi.com/v1/earthquakes/range-time?startdate=2025-01-01&enddate=2025-03-30&limit=50`

This endpoint retrieves all seismic events that occurred within a specific time range, using a custom start and end date.
It allows users to query historical earthquake data over any desired period, making it ideal for research, reports, or time-based visualizations.

### `GET https://api.terraquakeapi.com/v1/earthquakes/magnitude?mag=1&limit=50`

This endpoint retrieves all seismic events that have a specific or greater magnitude from the TerraQuake API, 
from the start of the current year up to today. 
It is useful for filtering earthquakes based on their strength and analyzing seismic intensity patterns over time or across regions.

### `GET https://api.terraquakeapi.com/v1/earthquakes/eventId?eventId=44085192`

This endpoint retrieves a specific seismic event by its unique event ID from the TerraQuake API.
It allows users to access detailed information about a single earthquake event, including magnitude, location, depth, and precise timestamp.
```
---

### Statistics Endpoints
```bash
### `GET https://api.terraquakeapi.com/v1/stats/global`

This endpoint provides **global seismic statistics**, including:
- Total number of recorded earthquakes
- Strongest event
- Average magnitude

Useful for obtaining a quick overview of seismic activity worldwide.

### `GET https://api.terraquakeapi.com/v1/stats/region?region=Calabria`

This endpoint retrieves **regional seismic statistics** based on the specified `?region` parameter.  
It allows users to analyze earthquake frequency, magnitude distribution, and patterns within a particular geographic area.

**Path Parameter**:
- `?region` — The name or code of the target region (e.g., `Calabria`, `Lazio`, `Sicilia`).

### `GET https://api.terraquakeapi.com/v1/stats/yearly?year=2025`

This endpoint returns **yearly earthquake statistics** for the given `?year`.  
It provides aggregated information such as:
- Total number of earthquakes in the year
- Monthly distribution
- Maximum and average magnitude

**Path Parameter**:
- `?year` — The year to analyze (e.g., `2025`).

### `GET https://api.terraquakeapi.com/v1/stats/heatmap`

This endpoint delivers **geospatial earthquake data** optimized for heatmap visualization.  
It includes coordinates and magnitudes of recorded seismic events, making it ideal for mapping seismic intensity patterns.
```
---

### Seismic Stations Endpoints
```bash
### `GET https://api.terraquakeapi.com/v1/stations/`

This endpoint retrieves the **list of all active seismic stations** available in the TerraQuake API.  
It provides general details such as station code, location, and operational status.

### `GET https://api.terraquakeapi.com/v1/stations?code=AB123`

This endpoint returns information about a **specific seismic station**, identified by its unique `?code`.  
Useful for accessing details about a single station’s location, network, and operational status.

**Path Parameter**:
- `?code` — The unique identifier of the seismic station (e.g., `AB123`).

### `GET https://api.terraquakeapi.com/v1/stations/geojson`

This endpoint provides **all seismic stations in GeoJSON format**, optimized for mapping applications.  
It includes station coordinates and metadata, making it easy to integrate into interactive maps.

### `GET https://api.terraquakeapi.com/v1/stations/status/open`

This endpoint lists all **currently active (open) seismic stations**.  
It helps filter the network to see only operational monitoring sites.

### `GET https://api.terraquakeapi.com/v1/stations/status/closed`

This endpoint lists all **currently inactive (closed) seismic stations**.  
It allows users to check which monitoring sites are no longer operational.

### `GET https://api.terraquakeapi.com/v1/stations/statistics`

This endpoint provides **statistics about the seismic stations network**, including:
- Total number of stations
- Number of active vs inactive stations
- Distribution per network or region
```
---

### Map & GeoJSON Endpoints
```bash
### `GET https://api.terraquakeapi.com/v1/earthquakes/markers`

This endpoint returns **map-ready coordinates of earthquakes** in GeoJSON format,  
including location, magnitude, and depth.  
It is optimized for integration with mapping libraries such as **Leaflet** or **Mapbox**.

### `GET https://api.terraquakeapi.com/v1/earthquakes/geojson`

This endpoint retrieves **all earthquakes** in **GeoJSON format**.  
It allows seamless integration with geographic visualization tools, enabling spatial analysis of seismic events.

### `GET https://api.terraquakeapi.com/v1/earthquakes/cluster`

This endpoint provides **clustered earthquake data** for efficient rendering on maps.  
It groups nearby seismic events together, reducing visual clutter and improving map performance on large datasets.
```
---

### Demo & Fake Data Endpoints
```bash
### `GET https://api.terraquakeapi.com/v1/demo/fake-earthquake`

This endpoint **simulates a seismic event** for testing purposes.  
It is mainly used to validate frontend UI components, charts, or maps without relying on real earthquake data.

### `GET https://api.terraquakeapi.com/v1/demo/fake-data`

This endpoint returns a **set of example JSON data**, useful for exercises, training, or frontend testing.  
It provides mock earthquake-like information in a consistent structure.

### `DELETE https://api.terraquakeapi.com/v1/demo/fake-data?id=123`

This endpoint deletes a **specific mock data entry**, identified by its unique `?id`.  
It is useful for testing CRUD operations and simulating earthquake data removal.

**Path Parameter**:
- `?id` — The unique identifier of the fake dataset entry.

### `GET https://api.terraquakeapi.com/v1/demo/fake-statistics`

This endpoint returns **mock statistics data**, such as totals, averages, or distributions.  
It is designed for testing dashboards, charts, and other data visualizations without requiring real data.
```
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
[Linkedin]() [Portfolio](https://portfolio-gianluca-phi.vercel.app/)

## 🤝 Contributing

Contributions are welcome!  
If you’d like to improve TerraQuake API, please fork the repository and open a pull request.  
Whether it’s fixing a bug, improving documentation, or adding a feature — all contributions are appreciated!

Please make sure to follow the [contributing guidelines](CONTRIBUTING.md).

## 💬 Community

Join our community on [Discord](https://discord.gg/RDBp8KJB) to connect, share ideas, and collaborate with other contributors.

## 🎉 Hacktoberfest 2025

This project is participating in Hacktoberfest 2025!  
Contributions count toward the event. Feel free to submit PRs and join us in building TerraQuake API together 🌍

## � Credits

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

## �💖 Support the Project

TerraQuake API is an open-source initiative aimed at making real-time seismic data accessible for developers, researchers, and communities.

If you find this project useful and would like to support its development, consider becoming a sponsor.
Your contribution helps:

Maintain and improve the API

Add new features and documentation

Keep the project open and accessible to everyone

Even a small donation makes a big difference in keeping the project alive and growing.

[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub-ff69b4?style=flat-square&logo=github)](https://www.paypal.com/paypalme/magcas)

Thank you for supporting open source and helping TerraQuake API reach more people! 🌍

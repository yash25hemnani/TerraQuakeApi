# TerraQuake

**TerraQuake** is a full-stack web application designed to monitor and explore global seismic activity. It offers real-time earthquake data, visualizations, and developer-friendly API access. Built by combining geoscience expertise and modern web development, TerraQuake aims to make seismic data more accessible to researchers, developers, and the general public.

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

#### `GET /api/earthquakes`
Returns all recorded earthquakes.

#### `GET /api/earthquakes/month/:year/:month`
Filter earthquakes by year and month.

#### `GET /api/earthquakes/range-time?starttime=YYYY-MM-DD&endtime=YYYY-MM-DD`
Filter earthquakes within a time range.

#### `GET /api/earthquakes/demo`
Returns 100 demo earthquakes (randomized for testing and UI display).

#### `GET /api/earthquakes/stats`
Returns statistics such as:
- Total earthquakes
- Strongest event
- Average magnitude

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

## 🎉 Hacktoberfest 2025

This project is participating in Hacktoberfest 2025!  
Contributions count toward the event. Feel free to submit PRs and join us in building TerraQuake API together 🌍  


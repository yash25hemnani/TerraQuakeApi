# 🌋 TerraQuake API

A **developer-friendly REST API** for exploring seismic events across **Italy and beyond**.  
Built with **Express.js** and **MongoDB**, the API supports filtering by time range, month, location, and magnitude. It is designed for researchers, developers, and apps that need reliable and structured seismic data.

---

## 📦 Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication** (planned)
- **Validation** with `express-validator`
- **File handling** with `multer`
- **Soft delete** with `mongoose-delete`
- **Logging** with `morgan-body`
- **Secure passwords** with `bcryptjs`
- **CORS** for cross-origin requests
- **ESLint + StandardJS** for linting

---

## 🚀 Getting Started

### 🔧 Install

```bash
git clone https://github.com/your-username/terraquake-api.git
cd terraquake-api
npm install
```

## Run in development

```bash
npm run dev
```

## Run in production
```bash
npm start
```

## Project Structure

```bash
src/
├── controllers/        # API logic
├── middleware/         # Custom middlewares
├── models/             # MongoDB schemas
├── routes/             # API endpoints
├── utils/              # Utility functions
├── config/             # Database config, env
└── app.js              # App entry point
```

## API Endpoints

## List All
GET /api/earthquakes
→ Returns all available earthquakes

## Filter by Month
GET /api/earthquakes/month/:year/:month
→ Get earthquakes for a specific year and month

## Filter by Date Range
GET /api/earthquakes/range-time?starttime=YYYY-MM-DD&endtime=YYYY-MM-DD

## Stats
GET /api/earthquakes/stats
→ Returns total count, average magnitude, and strongest event

## Demo Data
GET /api/earthquakes/demo
→ Returns 100 synthetic demo earthquakes

## Linting
# Run ESLint

```bash
npm run lint
Auto-fix issues
```

```bash
npm run lint:fix
```

## Planned Features
User registration & login with JWT

Admin area for managing events

Real-time WebSocket updates

Upload data via CSV/JSON with Multer

Integration with INGV & USGS data feeds

## License
This project is licensed under the MIT License.

## Author
Dr. Gianluca Chiaravalloti
Web Developer & Geologist
[Linkedin]() [Portfolio](https://portfolio-gianluca-phi.vercel.app/)




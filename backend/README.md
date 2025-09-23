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

# New Features 
## 1)Array-Based Query Utilities for Proxy Data
- **`applyArrayFeatures(features, req.query, opts)`**  
  - Provides in-memory **sort**, **field projection**, and **pagination** for GeoJSON `features[]`.
  - Keeps GeoJSON shape when no `fields` are requested; otherwise returns projected items list

## 2) Centralized Query Parsing/Validation
- **`getPositiveInt(query, key, { min, max, def })`**  
  - Single place to parse/validate `page`, `limit`, and upstream `limit` params.
  - Prevents repeated blocks and ensures consistent 400 errors for invalid inputs.

- **Normalized ID comparison** in `/eventId`:
  - Compares `String(eventId)` to handle numeric or string IDs gracefully.

- **Safer region handling**:
  - Guards against missing/unsupported `region` before `.toLowerCase()`.

## 3) Rate Limiting
- **Policy**: Fixed-window rate limit of **100 requests per second per IP** across all `/api/*` routes.
- **Headers**: Responses include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset` to help clients self-throttle. When the limit is exceeded, server returns `429 Too Many Requests` with `Retry-After`.
- **Best practices**:
  - Cache responses whenever possible (HTTP caches, CDN, or local memoization) to reduce repeated calls.
  - Prefer bulk queries over many small ones.
  - Implement client-side exponential backoff and respect `Retry-After`.
  - Only poll as frequently as needed; avoid tight loops.

  
## Author
Dr. Gianluca Chiaravalloti
Web Developer & Geologist
[Linkedin]() [Portfolio](https://portfolio-gianluca-phi.vercel.app/)




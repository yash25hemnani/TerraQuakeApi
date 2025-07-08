import express from 'express'

const router = express.Router()

// NOTE: CATEGORIA -> Geospaziale

// NOTE: coordinate per mappa con magnitudo e profondità (geoJSON, Leaflet-ready)
router.get('/map/markers')

// NOTE: restituisce tutti i terremoti in formato GeoJSON
router.get('/earthquakes/geojson')

// NOTE: dati clusterizzati per visualizzazioni su mappa
router.get('/earthquakes/cluster')

export default router

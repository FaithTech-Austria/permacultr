import type { PermaCultureDocument } from '~/types'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-geosearch/dist/geosearch.css'
import 'leaflet/dist/leaflet.css'

const createGeoSearch = () => {
  const search = new GeoSearch.GeoSearchControl({ provider: new GeoSearch.OpenStreetMapProvider(), showMarker: false })
  window.map.addControl(search)
}

const createDraw = () => {
  window.editableLayers = new L.FeatureGroup()
  window.map.addLayer(window.editableLayers)

  const options = {
    position: 'topleft',
    draw: {
      line: false, circle: false, rectangle: false, marker: false, circlemarker: false, polyline: false,
      polygon: {
          allowIntersection: false,
          drawError: {
              color: 'blue',
          },
          shapeOptions: {
              color: 'green'
          },
          showArea: true
      },
    },
    edit: {
        featureGroup: window.editableLayers,
        remove: true
    }
  }

  const drawControl = new L.Control.Draw(options)
  window.map.addControl(drawControl)
}

export const drawAreaOfInterest = (areaOfInterest: any) => {
  const jsonLayer = L.geoJSON(areaOfInterest, {
    style: {
      "color": "#ff7800",
      "weight": 5,
      "fill": false,
      "opacity": 1
    }
  })

  window.editableLayers.eachLayer((layer: any) => {
    layer.remove();
  })  

  jsonLayer.addTo(window.editableLayers)
  window.map.fitBounds(jsonLayer.getBounds())
}

export const createMap = (document: PermaCultureDocument) => {
  const map = window.map = L.map('map', { center: [51.505, -0.09], zoom: 19 })
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)

  createGeoSearch()
  createDraw()

  if (document.area_of_interest) drawAreaOfInterest(document.area_of_interest)
}
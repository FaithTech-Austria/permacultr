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
        remove: false
    }
  }

  const drawControl = new L.Control.Draw(options)
  window.map.addControl(drawControl)

  window.map.on(L.Draw.Event.CREATED, function (event: any) {
    window.editableLayers.addLayer(event.layer)
  })
}

const createShadows = () => {
  // const date = new Date()
  // date.setHours(22, 0)

  // const shadeMap = L.shadeMap({
  //   date,    // display shadows for current date
  //   color: '#01112f',    // shade color
  //   opacity: 0.7,        // opacity of shade color
  //   apiKey: "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im1haWxAZGFuaWVsYmVla2UubmwiLCJjcmVhdGVkIjoxNjg5OTczODgwNzkyLCJpYXQiOjE2ODk5NzM4ODB9.ncHt7P0kGdSNjbmVwWKWJ-c_mTstyPq55h7h_FUoU5s",    // obtain from https://shademap.app/about/
  //   terrainSource: {
  //     tileSize: 256,       // DEM tile size
  //     maxZoom: 15,         // Maximum zoom of DEM tile set
  //     getSourceUrl: ({ x, y, z }) => {
  //       // return DEM tile url for given x,y,z coordinates
  //       return `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`
  //     },
  //     getElevation: ({ r, g, b, a }) => {
  //       // return elevation in meters for a given DEM tile pixel
  //       return (r * 256 + g + b / 256) - 32768
  //     }
  //   },
  // }).addTo(map);
}

export const createMap = (document: PermaCultureDocument) => {
  const map = window.map = L.map('map', { center: [51.505, -0.09], zoom: 13 })
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)
  
  createGeoSearch()
  createDraw()
}
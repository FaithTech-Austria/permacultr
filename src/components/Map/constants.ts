export const mapTilerKey = import.meta.env.PUBLIC_MAPTILER_KEY
export const styleJsonUrl = `https://api.maptiler.com/maps/openstreetmap/style.json?key=${mapTilerKey}`
export const DEMUrl = `https://api.maptiler.com/tiles/terrain-rgb-v2/{z}/{x}/{y}.webp?key=${mapTilerKey}`

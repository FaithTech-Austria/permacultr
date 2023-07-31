import '@types/wicg-file-system-access/index.d.ts'
import { Map } from 'maplibre-gl';
import { TerraDraw } from 'terra-draw'

export declare global {
  interface Window {
    map: Map
    draw: TerraDraw
    handle: any
  }
}
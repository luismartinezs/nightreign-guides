import type { MetadataRoute } from 'next'
import { metadata } from '@/shared/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metadata.name,
    short_name: metadata.short_name,
    description: metadata.description,
    start_url: '/',
    display: 'standalone',
    "theme_color": "#6079d3",
    "background_color": "#080b14",
    "icons": [
      {
        "src": "/web-app-manifest-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/web-app-manifest-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ],
  }
}
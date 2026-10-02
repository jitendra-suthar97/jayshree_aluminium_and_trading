# Real photos only

Everything shown as work on this site must be a REAL photograph of a real JAYSHREE job.
No stock photos, no AI-generated images, no retouching that changes how the finished work looks
(exposure, white balance, straightening and cropping are fine).

## Folders
| Folder | Used for | Aspect ratio | Export size | Target weight |
|---|---|---|---|---|
| `hero/` | Home hero (also set `site.media.hero`) | 4:5 mobile crop, 3:2 / 16:9 desktop | 2000x1125 or 1600x2000 | under 180 KB |
| `services/<slug>/` | Service card + service page hero | 4:3 (hero 16:9) | 1600x900 / 1200x900 | under 120 KB |
| `projects/<category>/` | Gallery + featured | 4:3 | up to 1800 px long edge | under 250 KB |
| `workshop/` | About page | 3:2 | 1400x933 | under 100 KB |
| `process/` | How We Work (optional) | 3:2 | 1000x667 | under 100 KB |
| `instagram/` | Home Instagram strip (optional, 3+ photos) | 1:1 | 480x480 | under 30 KB |

Categories (folder names): `doors-windows`, `sliding-partitions`, `kitchen-cabinets`, `glass`,
`decorative-glass`, `mirrors`, `custom`.

File names: `<category>-<short-description>-<nn>.jpg` (lowercase, hyphens).

## Adding a photo
1. Compress it and copy it into the right folder.
2. Add ONE entry in `src/data/projects.ts` (or set `image` on a service in `src/data/services.ts`,
   or `site.media.*` in `src/data/site.ts`). Describe what is actually visible in `alt`.
3. Optional `focalPoint` ({ x, y } in percent) keeps tall items (doors, partitions) centred in 4:3 crops.
4. Only add `town` with `townConsent: true` if the client agreed.

The logo is NOT in this folder. It lives untouched at `public/brand/jayshree-logo.png`.

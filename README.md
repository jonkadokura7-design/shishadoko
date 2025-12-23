# Shisha Doko? (シーシャどこ？)

Currently nearby high-rated Shisha (Hookah) spots.

## Features
- **Geolocation**: Finds spots near you.
- **Filtering**: Only shows places with 3.5+ stars.
- **Mock Mode**: Works without an API key (shows demo data).

## Deployment
This project is configured for Vercel.

1.  Push to GitHub.
2.  Import project in Vercel.
3.  (Optional) Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in Environment Variables.

## Local Development
```bash
npm install
npm run dev
```

## Troubleshooting
If you see "Application Error":
- Check the Vercel logs.
- Ensure dependencies are installed (`npm install`).

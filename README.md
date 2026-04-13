# EasyGuest Review

EasyGuest Review is a branded web app for Hotel Sai Darshan, Rajpipla that helps guests generate polished Google review drafts and quickly continue to the Google review form.

The application is built with Next.js App Router and includes a server-side review generation endpoint with Google AI fallback logic, a guest-facing landing page, and structured data for local SEO.

## Overview

This project is designed to reduce friction in the guest review flow:

- Generate a ready-to-use review in one click
- Copy the generated text to the clipboard
- Open the Google review page for the hotel
- Present the experience in a mobile-friendly branded interface

If the Google AI request is unavailable or returns an insufficient response, the app falls back to a template-based review generator so the user can still complete the flow.

## Features

- Guest-facing review generation flow
- Google AI integration using `gemini-1.5-flash`
- Template fallback for reliability
- Copy-to-clipboard support
- Direct redirect to the Google review form for the hotel
- Mobile-responsive landing page
- Structured data for local business SEO
- TypeScript-based codebase with Next.js App Router

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- Lucide React
- Google Generative Language API

## Project Structure

```text
src/
  app/
    api/
      generate-review/
        route.ts          # Review generation API
    globals.css           # Global styles
    layout.tsx            # Root layout and metadata
    page.tsx              # Main guest-facing page
    schema.json           # Local business schema payload
  components/
    SchemaData.tsx        # Injects structured data
    Toast.tsx             # Toast UI and hook
  hooks/
    useReviewGenerator.ts # Client-side review generation flow
public/
  logo.jpg
```

## How It Works

1. The guest opens the landing page.
2. The client calls `POST /api/generate-review`.
3. The server builds review context using randomized visit patterns and location-aware phrasing.
4. The app tries Google AI first.
5. If AI generation fails or the output is too short, a template-based review is returned.
6. The guest copies the review and is redirected to Google’s review page for the hotel.

## API

### `POST /api/generate-review`

Generates a single hotel review draft.

Request body:

```json
{
  "visitType": "family trip",
  "stayDuration": "2 nights",
  "rating": 5,
  "keywords": "clean rooms, good location"
}
```

All fields are optional in the current implementation.

Response:

```json
{
  "review": "Stayed here during a family trip to Rajpipla...",
  "success": true,
  "source": "ai"
}
```

`source` is returned as either `ai` or `template`.

## Local Development

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/vivek-the-coder/EasyGuest-Review.git
cd EasyGuest-Review
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GOOGLE_AI_API_KEY=your_google_ai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`GOOGLE_AI_API_KEY` is optional if you only want to use the template fallback, but AI generation will not work without it.

### Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```

## Deployment

The app is suitable for Vercel deployment.

Typical deployment flow:

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add the required environment variables.
4. Deploy.

## Notes

- The UI and content are tailored for Hotel Sai Darshan, Rajpipla.
- The redirect flow currently opens Google’s web review page directly for better cross-device reliability.
- The repository currently includes some unrelated lint issues outside the core landing page flow.

## License

No license file is currently included in this repository. Add one if you want to make usage terms explicit.

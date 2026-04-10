# Hotel Review Assistant - Hotel Sai Darshan Rajpipla

A modern web application that helps guests write authentic, natural reviews for Hotel Sai Darshan Rajpipla. Built with Next.js, Tailwind CSS, and deployed on Vercel.

## Features

- **AI-Powered Review Generation**: Uses Google AI Studio (Gemini) for authentic, human-like reviews
- **Controlled Randomness**: Sophisticated context randomization and structure variation
- **Anti-Detection System**: Variable sentence patterns, natural imperfections, diverse writing styles
- **Context-Aware**: Personalized reviews based on visit type, duration, rating, and keywords
- **Natural Language**: Avoids generic words, includes casual phrasing and believable imperfections
- **Location-Specific**: Authentic mentions of Rajpipla and Harshiddhi Mata Temple
- **Mobile-First Design**: Responsive UI that works on all devices
- **Copy & Redirect**: Easy copy to clipboard and direct Google Maps integration
- **SEO Optimized**: Meta tags, structured data, and search-friendly content

## Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Google AI Studio (Gemini API)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd reviews
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
app/
  api/generate-review/    # API route for review generation
  layout.tsx             # Root layout with SEO metadata
  page.tsx               # Main homepage component
  schema.json            # Structured data for SEO
  globals.css            # Global styles
```

## API Endpoints

### POST /api/generate-review

Generates personalized reviews based on user input.

**Request Body:**
```json
{
  "visitType": "family|solo|business|couple|friends",
  "stayDuration": "1night|2nights|3nights|week|weekend",
  "rating": 1-5,
  "keywords": "optional keywords"
}
```

**Response:**
```json
{
  "reviews": {
    "short": "Brief review text",
    "medium": "Detailed review text", 
    "detailed": "SEO-optimized review text"
  },
  "success": true
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your GitHub account to Vercel
3. Import the repository
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## SEO Features

- **Meta Tags**: Optimized title, description, and keywords
- **Structured Data**: LocalBusiness schema markup
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter-specific metadata
- **Robots.txt**: Search engine friendly

## Environment Variables

Create a `.env.local` file:

```env
# Google AI Studio API Key for review generation
# Get your key from https://aistudio.google.com/apikey
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting Google AI Studio API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env.local` file
5. Add the key to your Vercel environment variables for deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, contact Hotel Sai Darshan management or create an issue in the repository.

---

**Note**: This is a legitimate review assistant tool that helps guests write authentic reviews. It does not generate fake or misleading content.

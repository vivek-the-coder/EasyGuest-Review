import { NextRequest, NextResponse } from 'next/server';

// Types
interface ReviewContext {
  visitType: string;
  stayDuration: string;
  rating: number;
  focus: string;
  reason: string;
  detail: string;
  tone: string;
  seoKeyword: string;
}

interface RequestBody {
  visitType?: string;
  stayDuration?: string;
  rating?: number;
  keywords?: string;
}

// SEO Keywords Pool - Location intelligence for Rajpipla area
const SEO_KEYWORDS = [
  "near Statue of Unity",
  "near Nilkanth Dham Poicha",
  "near Narmada river",
  "best hotel in Rajpipla",
  "budget hotel near Statue of Unity",
  "stay near Harshiddhi Mata Temple",
  "hotel near Poicha temple",
  "accommodation in Rajpipla Gujarat",
  "close to Sardar Sarovar Dam",
  "near Zarwani Waterfall",
  "budget stay in Narmada district"
];

// Natural, varied openings (not repetitive)
const OPENING_PHRASES = [
  "Stayed here during a quick trip to",
  "Found this place while visiting",
  "Booked this hotel for a short visit to",
  "Came across Hotel Sai Darshan while exploring",
  "Stayed here while visiting",
  "Needed a place to stay near",
  "Chose this hotel for my visit to",
  "Ended up staying here while checking out"
];

// Varied closing phrases (not repetitive)
const CLOSING_PHRASES = [
  "Would stay again if I'm back in the area.",
  "Solid option for anyone visiting the region.",
  "Good choice if you're looking for a no-frills stay.",
  "Recommended for budget travelers visiting the temples.",
  "Makes sense as a base for exploring nearby attractions.",
  "Practical option for temple visitors and tourists.",
  "Consider it if you want to stay close to the temple."
];

// Tone diversity modes
const TONES = [
  "slightly casual",
  "neutral informative",
  "experience storytelling",
  "short and practical"
];

// Natural focus areas with variety
const FOCUS_AREAS = [
  { focus: "location convenience", aspect: "proximity to temple" },
  { focus: "budget-friendly pricing", aspect: "value for money" },
  { focus: "cleanliness", aspect: "room maintenance" },
  { focus: "staff behavior", aspect: "service quality" },
  { focus: "peaceful environment", aspect: "quiet surroundings" },
  { focus: "room comfort", aspect: "basic amenities" },
  { focus: "temple access", aspect: "walking distance" },
  { focus: "nearby attractions", aspect: "Sightseeing options" }
];

// Visit type variety
const VISIT_TYPES = [
  "family trip",
  "solo visit", 
  "short business stay",
  "weekend getaway",
  "temple visit",
  "tourist stopover"
];

// Stay duration variety
const STAY_DURATIONS = [
  "1 night",
  "2 nights",
  "3 days",
  "a weekend",
  "couple of days"
];

// Detailed review templates - GROUNDED POSITIVE (no negative framing)
const DETAILED_TEMPLATES = [
  {
    pattern: "Stayed here during a {visitType} to Rajpipla, and the {focus} turned out to be really convenient. The hotel is {locationContext}, which made it easy for early morning visits without any hassle. Rooms were {roomQuality}, and the {aspect} made the stay comfortable. The staff was {staffQuality} and quick to respond whenever needed. Since it's {seoKeyword} and also accessible to {seoKeyword2}, it works well for travelers covering nearby attractions. Overall, a good choice if you're looking for a comfortable stay in Rajpipla. {closing}",
    minWords: 115
  },
  {
    pattern: "Booked this place for a {visitType} to Rajpipla and had a smooth experience overall. The hotel's biggest advantage is its {focus}, especially being {locationContext}. It saved a lot of time during our visit. Rooms were {roomQuality}, with all the basic facilities in place, and everything felt properly managed. The {aspect} was appreciated throughout our {duration} stay. It's also a convenient option if you're {seoKeyword}, as both are within reachable distance. The pricing is reasonable for what you get, making it a good value stay. {closing}",
    minWords: 120
  },
  {
    pattern: "Came to Hotel Sai Darshan for a {visitType} and found it to be a pleasant place to stay. The {focus} is excellent - {aspect} and always ready to help. Being {locationContext} meant we could visit the temple whenever we wanted. The rooms are {roomQuality} and provide a comfortable space to relax after a day of sightseeing. Since it's {seoKeyword}, reaching other attractions like {seoKeyword2} is quite manageable. For anyone looking for a well-located and comfortable stay in Rajpipla, this hotel is definitely worth considering. {closing}",
    minWords: 118
  },
  {
    pattern: "Had a {visitType} to Rajpipla recently and chose this hotel based on its location. The {focus} really impressed us - {aspect} throughout our {duration} visit. The hotel sits {locationContext}, which made our temple visits very convenient. Rooms were {roomQuality}, giving us a restful stay. We also appreciated how {seoKeyword}, making it easy to plan day trips to {seoKeyword2}. The combination of good location, reasonable rates, and attentive service made this a satisfying choice. {closing}",
    minWords: 115
  },
  {
    pattern: "Visited Rajpipla for a {visitType} and stayed at Hotel Sai Darshan. Right from the start, the {focus} stood out positively - {aspect} whenever required. Its position {locationContext} is genuinely useful for temple visits at any time. The rooms are {roomQuality} and offer good value. We liked that it's {seoKeyword}, which helped us visit {seoKeyword2} during our trip. Everything from check-in to check-out went smoothly. A reliable option for travelers exploring this part of Gujarat. {closing}",
    minWords: 115
  },
  {
    pattern: "Spent {duration} at Hotel Sai Darshan during our {visitType} to Rajpipla, and it met our expectations well. The {focus} is definitely a strong point here - {aspect} during our stay. Being {locationContext} made our daily temple visits effortless. The rooms are {roomQuality}, providing a comfortable retreat after a day out. Its location {seoKeyword} is another plus, with {seoKeyword2} also within easy reach. For the price, it delivers good value with its location and service. {closing}",
    minWords: 112
  }
];

// Positive room descriptions (no negative framing)
const ROOM_QUALITIES = [
  "clean and well-maintained",
  "neat and comfortable",
  "tidy with good ventilation",
  "fresh and properly arranged",
  "clean and adequately furnished",
  "well-kept and restful"
];

// Positive staff descriptions
const STAFF_QUALITIES = [
  "polite and helpful",
  "courteous and responsive",
  "friendly and attentive",
  "warm and cooperative",
  "respectful and quick to assist",
  "welcoming and professional"
];

// Helper functions
const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

const generateReviewContext = (): ReviewContext => {
  const focusArea = getRandomElement(FOCUS_AREAS);
  
  return {
    visitType: getRandomElement(VISIT_TYPES),
    stayDuration: getRandomElement(STAY_DURATIONS),
    rating: getRandomElement([4, 4, 4, 5, 5, 5, 5, 3]),
    focus: focusArea.focus,
    reason: getRandomElement([
      "temple visit",
      "sightseeing",
      "family trip",
      "quick getaway",
      "religious tour",
      "Statue of Unity visit"
    ]),
    detail: focusArea.aspect,
    tone: getRandomElement(TONES),
    seoKeyword: getRandomElement(SEO_KEYWORDS)
  };
};

// Generate a natural, detailed review using templates
const generateNaturalReview = (context: ReviewContext): string => {
  const template = getRandomElement(DETAILED_TEMPLATES);
  const secondarySeo = getRandomElement(SEO_KEYWORDS.filter(k => k !== context.seoKeyword));
  const locationContext = getRandomElement([
    "right opposite Harshiddhi Mata Temple",
    "just steps away from the temple",
    "directly across from the temple entrance",
    "within easy reach of Harshiddhi Mata Temple"
  ]);
  const roomQuality = getRandomElement(ROOM_QUALITIES);
  const staffQuality = getRandomElement(STAFF_QUALITIES);
  
  // Create natural SEO sentence structures
  const seoPhrases = [
    `conveniently located ${context.seoKeyword}`,
    `situated ${context.seoKeyword}`,
    `positioned ${context.seoKeyword}`,
    `a good base ${context.seoKeyword}`,
    `well-placed ${context.seoKeyword}`
  ];
  const naturalSeo = getRandomElement(seoPhrases);
  
  const seoPhrases2 = [
    `${secondarySeo}`,
    `close to ${secondarySeo.replace('near ', '').replace('close to ', '')}`,
    `within reach of ${secondarySeo.replace('near ', '').replace('close to ', '')}`
  ];
  const naturalSeo2 = getRandomElement(seoPhrases2);
  
  let review = template.pattern
    .replace(/{visitType}/g, context.visitType)
    .replace(/{seoKeyword}/g, naturalSeo)
    .replace(/{seoKeyword2}/g, naturalSeo2)
    .replace(/{focus}/g, context.focus)
    .replace(/{aspect}/g, context.detail)
    .replace(/{locationContext}/g, locationContext)
    .replace(/{duration}/g, context.stayDuration)
    .replace(/{roomQuality}/g, roomQuality)
    .replace(/{staffQuality}/g, staffQuality)
    .replace(/{closing}/g, getRandomElement(CLOSING_PHRASES));
  
  return review;
};

// Generate prompt for AI (when API is working)
const generateAIPrompt = (context: ReviewContext): string => {
  const opening = getRandomElement(OPENING_PHRASES);
  const closing = getRandomElement(CLOSING_PHRASES);
  const secondarySeo = getRandomElement(SEO_KEYWORDS.filter(k => k !== context.seoKeyword));
  
  return `You are writing a natural, human-like hotel review for Google Maps.

Hotel: Hotel Sai Darshan Rajpipla
Location: Opp. Harshiddhimataji Temple, Rajpipla, Gujarat

Context:
- Visit type: ${context.visitType}
- Stay duration: ${context.stayDuration}
- Focus area: ${context.focus} - emphasize this positively
- Specific aspect: ${context.detail}
- Primary SEO keyword to weave in naturally: ${context.seoKeyword}
- Secondary mention: ${secondarySeo}

TONE - GROUNDED POSITIVE (CRITICAL):
- Write like a satisfied customer sharing a genuine positive experience
- Highlight clear benefits and positives
- AVOID negative framing: NO "don't expect", "nothing fancy", "basic", "just adequate"
- AVOID: "honestly didn't expect", "decent for the price", "works fine"
- Frame everything positively: instead of "clean enough" say "clean and comfortable"
- Express satisfaction without exaggeration

REQUIRED POSITIVE ELEMENTS:
- At least 2 clearly positive statements about the experience
- Mention specific good aspects: location convenience, cleanliness, staff helpfulness, comfort
- Include how the hotel helped/enhanced their visit

SEO INTEGRATION:
- Weave keywords naturally into sentences
- NEVER attach directly after "visiting" or "planning"
- Good: "Since it's located near Statue of Unity, day trips were easy"
- Bad: "visiting near Statue of Unity"

NEARBY PLACES TO MENTION NATURALLY:
- Harshiddhi Mata Temple (directly opposite)
- Statue of Unity
- Nilkanth Dham Poicha
- Narmada river

AVOID REPEATING THESE PATTERNS:
- "Honestly didn't expect..."
- "nothing fancy but..."
- "practical option"
- "works fine"
- "X stood out during my stay"
- "for the price"

STRUCTURE:
- 1 engaging opening (positive framing)
- 2-3 sentences describing good experiences
- 1-2 sentences with natural location/SEO mention
- 1 closing recommendation (confident but not hyped)

LENGTH: 100-150 words

Output ONLY the review text. No headers, no quotes.

Opening to use: "${opening}..."
Closing style: "${closing}"

Write the review now:`;
}

const callGoogleAI = async (prompt: string): Promise<string | null> => {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    console.error('GOOGLE_AI_API_KEY not found');
    return null;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          topP: 0.95,
          maxOutputTokens: 400
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Google AI API Error:", JSON.stringify(data, null, 2));
      return null;
    }

    const reviewText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reviewText || reviewText.length < 80) {
      console.error("AI response too short or empty");
      return null;
    }

    return reviewText.trim();
  } catch (error) {
    console.error('Error calling Google AI API:', error);
    return null;
  }
};

// Main review generation function
const generateReview = async (context: ReviewContext): Promise<string> => {
  // First, try AI generation
  const aiPrompt = generateAIPrompt(context);
  const aiReview = await callGoogleAI(aiPrompt);
  
  if (aiReview) {
    // Validate AI review is long enough
    const wordCount = aiReview.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount >= 80) {
      return aiReview;
    }
    console.log(`AI review too short (${wordCount} words), using template`);
  }
  
  // Fallback to template-based generation
  return generateNaturalReview(context);
};

// API Route Handler
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: RequestBody = await request.json();
    
    // Generate review context with random values
    const context = generateReviewContext();
    
    // Override with any provided values
    if (body.visitType) context.visitType = body.visitType;
    if (body.stayDuration) context.stayDuration = body.stayDuration;
    if (body.rating) context.rating = body.rating;
    
    // Generate the review
    const review = await generateReview(context);

    return NextResponse.json({
      review,
      success: true,
      source: review.length > 200 ? 'ai' : 'template'
    });

  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: 'Failed to generate review', success: false },
      { status: 500 }
    );
  }
}

import { EventItem } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-01',
    title: 'Neon Horizon EDM Festival 2026',
    slug: 'neon-horizon-edm-festival-2026',
    category: 'Festivals',
    description: 'Experience India’s biggest electronic music gathering featuring premier international DJs, laser spectacles, and immersive audiovisual stages.',
    fullDescription: 'Get ready for an electrifying weekend under the stars! Neon Horizon 2026 brings together 15+ world-class electronic music artists, multiple themed arenas, world-class pyrotechnics, curated food villages, and interactive LED art installations. Join over 12,000 music enthusiasts for an unforgettable celebration of sound and color.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-14',
    startTime: '16:00',
    endTime: '23:30',
    venue: 'Sunburn Arena & Grounds, Vagator',
    address: 'Vagator Beach Road, North Goa, Goa 403509',
    city: 'Goa',
    organizer: 'Submerge & Horizon Live India',
    ticketTypes: [
      { id: 'tt-1', name: 'General Access (GA)', price: 1499, description: 'Standard festival entry with access to all outdoor music stages and food village.', available: 450, total: 500 },
      { id: 'tt-2', name: 'VIP Deck Pass', price: 2999, description: 'Elevated viewing deck, express entrance lane, dedicated VIP bar and lounge.', available: 120, total: 150 },
      { id: 'tt-3', name: 'Backstage Platinum Lounge', price: 5499, description: 'Ultra-exclusive backstage zone, complimentary beverage credits, artist view access.', available: 25, total: 40 }
    ],
    isSeated: false,
    capacity: 2500,
    demoAvailability: 595,
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 342,
    tags: ['EDM', 'Music Festival', 'Nightlife', 'DJ Live', 'Dance'],
    rules: [
      'Age restriction: 18+ only. Valid government photo ID is mandatory at entry.',
      'No outside food, alcoholic beverages, or prohibited substances allowed inside.',
      'Wristbands will be provided at the entry box office and must be worn at all times.',
      'Re-entry is strictly prohibited once verified inside the arena venue.'
    ],
    highlights: [
      'Over 8 continuous hours of live electronic and bass music',
      'Massive 120-foot wide LED holographic mainstage',
      'Gourmet food truck village with 30+ regional craft cuisines',
      'Safe zones, medical assistance, and dedicated free hydration stations'
    ],
    ageGuidance: '18+ Adults Only'
  },
  {
    id: 'evt-02',
    title: 'A.R. Rahman Live in Concert — Symphony of India',
    slug: 'ar-rahman-live-in-concert-symphony-of-india',
    category: 'Concerts',
    description: 'The Oscar & Grammy-winning maestro performs his legendary hits backed by a 60-piece global symphony orchestra.',
    fullDescription: 'Join the musical legend A.R. Rahman alongside an ensemble of international vocalists and the Royal Philharmonic Orchestra. Experience goosebumps with cinematic scores ranging from Roja and Dil Se to Slumdog Millionaire, Rockstar, and Ponniyin Selvan in crystal-clear acoustic acoustics.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-28',
    startTime: '19:00',
    endTime: '22:30',
    venue: 'Jio World Garden, BKC',
    address: 'Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051',
    city: 'Mumbai',
    organizer: 'Showcraft Entertainment & CineSound',
    ticketTypes: [
      { id: 'tt-4', name: 'Silver Gallery', price: 1999, description: 'Seated tier in the central amphitheater with great line of sight.', available: 200, total: 300 },
      { id: 'tt-5', name: 'Gold Arena', price: 3999, description: 'Closer seating to the center stage with enhanced Dolby line acoustics.', available: 85, total: 120 },
      { id: 'tt-6', name: 'Royal Diamond Suite', price: 7999, description: 'Front-row sovereign seats, VIP lounge hospitality, and commemorative program booklet.', available: 18, total: 30 }
    ],
    isSeated: true,
    bookedSeats: ['A3', 'A4', 'B5', 'B6', 'C2', 'D10', 'D11'],
    capacity: 1800,
    demoAvailability: 303,
    featured: true,
    trending: true,
    rating: 5.0,
    reviewsCount: 890,
    tags: ['A.R. Rahman', 'Concert', 'Bollywood', 'Symphony', 'Live Music'],
    rules: [
      'Gates open at 17:30. Seating will strictly close 15 minutes before showtime.',
      'Professional DSLR cameras and audio recording equipment strictly prohibited.',
      'Children aged 5 and above require an individual ticket.'
    ],
    highlights: [
      'Live 60-member international acoustic orchestra accompaniment',
      'Surround spatial acoustics engineered for immaculate clarity',
      'Guest appearances by top Bollywood vocalists',
      'Commemorative musical collector keepsake for all attendees'
    ],
    ageGuidance: 'Family Friendly (All Ages above 5)'
  },
  {
    id: 'evt-03',
    title: 'Dune: Part Three — Exclusive IMAX 70mm Premiere',
    slug: 'dune-part-three-exclusive-imax-70mm-premiere',
    category: 'Movies',
    description: 'The epic sci-fi saga concludes in pristine IMAX 70mm film format. Feel the desert sands rumble with unmatched audio and vision.',
    fullDescription: 'Witness Denis Villeneuve’s epic culmination of the Dune saga on the grandest cinema canvas in the country. Follow Paul Atreides as the holy war sweeps the cosmos. Featuring exclusive director’s commentary prelude and complimentary commemorative IMAX poster.',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
    date: '2026-10-24',
    startTime: '20:15',
    endTime: '23:30',
    venue: 'PVR INOX Laser IMAX, Phoenix Marketcity',
    address: 'Whitefield Main Road, Mahadevapura, Bengaluru, Karnataka 560048',
    city: 'Bengaluru',
    organizer: 'Warner Bros. Pictures & PVR Cinemas',
    ticketTypes: [
      { id: 'tt-7', name: 'Classic Tier', price: 450, description: 'Comfortable auditorium rocker seats with panoramic IMAX screen view.', available: 95, total: 110 },
      { id: 'tt-8', name: 'Prime Club', price: 650, description: 'Center sweet spot seats with optimal optical horizon and Dolby Atmos.', available: 60, total: 80 },
      { id: 'tt-9', name: 'VIP Leather Recliner', price: 950, description: 'Motorized plush leather recliners with in-seat food service button.', available: 22, total: 32 }
    ],
    isSeated: true,
    bookedSeats: ['B4', 'B5', 'C6', 'C7', 'A1', 'A2', 'D5', 'D6'],
    capacity: 220,
    demoAvailability: 177,
    featured: true,
    trending: true,
    rating: 4.8,
    reviewsCount: 512,
    tags: ['IMAX', 'Sci-Fi', 'Cinema', 'Premiere', 'Hollywood'],
    rules: [
      'Please arrive 20 minutes prior to showtime for security screening and snack orders.',
      'Outside eatables and carbonated drinks are strictly disallowed by multiplex policy.',
      'Subtitles will be displayed in English.'
    ],
    highlights: [
      'Huge 6-story high IMAX with Laser dual 4K projection',
      '12-channel surround sound system with floor-shaking bass',
      'Complimentary limited-edition holographic collectible ticket pass'
    ],
    ageGuidance: 'UA 16+ Guidance'
  },
  {
    id: 'evt-04',
    title: 'TechnoSphere 2026 — National College Tech & Hack Gala',
    slug: 'technosphere-2026-national-college-tech-gala',
    category: 'College Events',
    description: 'India’s premier collegiate engineering summit featuring 36-hour hackathons, robotics wars, founder keynotes, and gaming arenas.',
    fullDescription: 'Hosted by the premier engineering council, TechnoSphere brings over 4,000 students and innovators from top universities across India. Compete for ₹10 Lakh in hackathon cash prizes, attend AI workshops led by Google and Microsoft engineers, test combat robots in the arena, and network with leading startup venture funds.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-06',
    startTime: '09:00',
    endTime: '19:00',
    venue: 'Convention Centre, IIT Powai Campus',
    address: 'Main Gate Road, Powai, Mumbai, Maharashtra 400076',
    city: 'Mumbai',
    organizer: 'National Technical Students Association & IIT Council',
    ticketTypes: [
      { id: 'tt-10', name: 'Student Delegate Pass', price: 299, description: 'All-access pass for university students with college ID. Includes hackathon entry & lunch.', available: 500, total: 600 },
      { id: 'tt-11', name: 'Tech Innovator + Workshop', price: 699, description: 'Includes hands-on AI model deployment workshop with verified certificate of participation.', available: 150, total: 200 }
    ],
    isSeated: false,
    capacity: 1000,
    demoAvailability: 650,
    featured: true,
    trending: false,
    rating: 4.7,
    reviewsCount: 198,
    tags: ['Tech Fest', 'Hackathon', 'Coding', 'College', 'Robotics'],
    rules: [
      'Valid student ID card required for Student Delegate tickets.',
      'Teams must register on the hackathon portal before midnight of Day 1.',
      'Laptops and standard electronic peripherals permitted.'
    ],
    highlights: [
      '₹10,00,000 total hackathon prize pool',
      'Keynotes from unicorn tech founders and open-source leads',
      'Free lunch, high-speed campus Wi-Fi, and conference swag kit'
    ],
    ageGuidance: 'Open to Students & Developers'
  },
  {
    id: 'evt-05',
    title: 'Zakir Khan Live — "Tathastu & Beyond" Tour',
    slug: 'zakir-khan-live-tathastu-and-beyond',
    category: 'Comedy',
    description: 'The undisputed king of Indian storytelling returns with an all-new, deeply humorous and nostalgic stand-up special.',
    fullDescription: 'Spend an evening roaring with laughter as Zakir Khan narrates brand-new anecdotes on adulting, small-town friendships, desi families, and dating dilemmas. With his signature warm wit and poignant poetic pauses, this stand-up show is an emotional rollercoaster you cannot miss.',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-20',
    startTime: '19:30',
    endTime: '21:30',
    venue: 'Siri Fort Auditorium',
    address: 'August Kranti Marg, Siri Fort Institutional Area, New Delhi, Delhi 110049',
    city: 'Delhi NCR',
    organizer: 'OML Comedy Nights & Canvas Talent',
    ticketTypes: [
      { id: 'tt-12', name: 'Balcony Row', price: 999, description: 'Balcony seating with clear sound acoustics and stage view.', available: 120, total: 150 },
      { id: 'tt-13', name: 'Auditorium Gold', price: 1699, description: 'Front auditorium seating with prime audio coverage.', available: 80, total: 100 },
      { id: 'tt-14', name: 'Front VIP Circle', price: 2499, description: 'First 5 rows near the stage for prime comedic intimacy.', available: 15, total: 25 }
    ],
    isSeated: true,
    bookedSeats: ['A5', 'A6', 'C1', 'C2', 'B3', 'D4'],
    capacity: 600,
    demoAvailability: 215,
    featured: true,
    trending: true,
    rating: 4.9,
    reviewsCount: 740,
    tags: ['Stand-up Comedy', 'Zakir Khan', 'Hindi', 'Humor', 'Storytelling'],
    rules: [
      'Latecomers will only be admitted during designated intermission pauses.',
      'Audio or video recording during the performance is strictly forbidden.',
      'Recommended for ages 16 and above due to mild mature language.'
    ],
    highlights: [
      'All-new unreleased 90-minute stand-up special material',
      'Opening acts by emerging young comedy sensations',
      'Iconic Siri Fort acoustic amphitheater ambiance'
    ],
    ageGuidance: '16+ Recommended'
  },
  {
    id: 'evt-06',
    title: 'ISL Football Clash: Bengaluru FC vs Kerala Blasters',
    slug: 'isl-football-clash-bengaluru-fc-vs-kerala-blasters',
    category: 'Sports',
    description: 'The southern derby ignites! Witness intense football rivalry under stadium floodlights with roaring partisan fans.',
    fullDescription: 'Brace yourself for the most passionate derby in Indian football! Watch Sunil Chhetri lead the Blues against the formidable Yellow Army. With playoff berths on the line, the electric atmosphere at the Fortress will be unmatched.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-08',
    startTime: '19:30',
    endTime: '22:00',
    venue: 'Sree Kanteerava Stadium',
    address: 'Kasturba Road, Sampangi Rama Nagar, Bengaluru, Karnataka 560001',
    city: 'Bengaluru',
    organizer: 'Indian Super League & Bengaluru FC',
    ticketTypes: [
      { id: 'tt-15', name: 'East Stand Fan Zone', price: 349, description: 'High-energy fan stand with flags, drums, and chants.', available: 400, total: 500 },
      { id: 'tt-16', name: 'North Grandstand', price: 699, description: 'Covered stand with central pitch overview.', available: 160, total: 200 },
      { id: 'tt-17', name: 'Owners Hospitality Club', price: 1999, description: 'Padded box seating with complimentary snack platter and soft drinks.', available: 30, total: 40 }
    ],
    isSeated: false,
    capacity: 4000,
    demoAvailability: 590,
    featured: true,
    trending: true,
    rating: 4.8,
    reviewsCount: 420,
    tags: ['Football', 'ISL', 'Bengaluru FC', 'Sports', 'Derby'],
    rules: [
      'Helmets, water bottles, and metal coins must be deposited at security counters.',
      'Gates open 2 hours prior to kickoff.',
      'Away team fans are requested to occupy designated Zone D.'
    ],
    highlights: [
      'Top-tier football with international marquee players',
      'West Block Blues choreography and stadium tifo display',
      'Official team merchandise outlets at the gates'
    ],
    ageGuidance: 'All Ages Welcome'
  },
  {
    id: 'evt-07',
    title: 'Mughal-E-Azam: The Grand Broadway Musical',
    slug: 'mughal-e-azam-the-grand-broadway-musical',
    category: 'Theatre',
    description: 'Directed by Feroz Abbas Khan, featuring live classical singing, Manish Malhotra costumes, and Kathak choreography.',
    fullDescription: 'The greatest Indian stage spectacle ever mounted! Experience the tragic romance of Prince Salim and court dancer Anarkali brought alive on a massive stage. Featuring breathtaking live performances by 30+ classical Kathak dancers and timeless songs sung live without lip-sync.',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-22',
    startTime: '18:30',
    endTime: '21:15',
    venue: 'Nita Mukesh Ambani Cultural Centre (NMACC), The Grand Theatre',
    address: 'BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051',
    city: 'Mumbai',
    organizer: 'Shapoorji Pallonji & NMACC Theatres',
    ticketTypes: [
      { id: 'tt-18', name: 'Tier 2 Circle', price: 1250, description: 'Balcony tier with panoramic overview of stage choreography.', available: 75, total: 100 },
      { id: 'tt-19', name: 'Orchestra Stalls', price: 2750, description: 'Ground floor orchestra seats with optimal sightlines.', available: 45, total: 60 },
      { id: 'tt-20', name: 'Royal Box Seats', price: 4950, description: 'Exclusive box seating with dedicated concierge and champagne reception.', available: 12, total: 16 }
    ],
    isSeated: true,
    bookedSeats: ['A1', 'A2', 'B3', 'B4', 'C5'],
    capacity: 450,
    demoAvailability: 132,
    featured: true,
    trending: false,
    rating: 4.9,
    reviewsCount: 388,
    tags: ['Theatre', 'Musical', 'Kathak', 'Broadway', 'Culture'],
    rules: [
      'Formal or smart casual dress code encouraged.',
      'Photography and videography during the performance are strictly prohibited.',
      'No entry after the curtain rises until the formal intermission.'
    ],
    highlights: [
      'Spectacular sets that recreate the Mughal Mughal-e-Azam palace court',
      'Original costumes designed by Bollywood legend Manish Malhotra',
      'Singers perform immortal melodies live with authentic classical ragas'
    ],
    ageGuidance: '8+ Years Old'
  },
  {
    id: 'evt-08',
    title: 'Generative AI & LLM Systems Masterclass',
    slug: 'generative-ai-and-llm-systems-masterclass',
    category: 'Workshops',
    description: 'Hands-on full-day intensive masterclass on building production Agentic AI architectures, RAG pipelines, and model evaluation.',
    fullDescription: 'Designed for software engineers, architects, and data leads. Learn how to take Large Language Models from research prototypes to production microservices. Covers vector database indexing, dynamic tool calling, agentic loops, prompt optimization, and enterprise governance frameworks.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80',
    date: '2026-10-31',
    startTime: '10:00',
    endTime: '17:30',
    venue: 'WeWork Galaxy, Residency Road',
    address: '43 Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025',
    city: 'Bengaluru',
    organizer: 'DevGuild India & Cloud AI Network',
    ticketTypes: [
      { id: 'tt-21', name: 'Individual Dev Ticket', price: 1499, description: 'Full-day entry, workshop code repo access, lunch & coffee included.', available: 60, total: 80 },
      { id: 'tt-22', name: 'Enterprise Team Pass (Pair)', price: 2499, description: 'Pass for 2 developers, plus 1-on-1 architecture review session with instructor.', available: 20, total: 30 }
    ],
    isSeated: false,
    capacity: 120,
    demoAvailability: 80,
    featured: true,
    trending: false,
    rating: 4.9,
    reviewsCount: 165,
    tags: ['AI', 'Machine Learning', 'Workshop', 'Coding', 'Agents'],
    rules: [
      'Attendees should bring their personal laptop with Node.js and Python 3.11 installed.',
      'All workshop code repositories and API keys will be provided on-site.'
    ],
    highlights: [
      'Build 3 production AI pipelines from scratch during the day',
      'Certificate of mastery signed by senior AI architects',
      'Gourmet buffet lunch and peer networking cocktail hour'
    ],
    ageGuidance: 'Working Professionals & Tech Students'
  },
  {
    id: 'evt-09',
    title: 'Avatar: Fire and Ash — 3D IMAX Special Showcase',
    slug: 'avatar-fire-and-ash-3d-imax-special-showcase',
    category: 'Movies',
    description: 'James Cameron takes audiences into the volcanic territories of Pandora in high-frame-rate 3D cinema grandeur.',
    fullDescription: 'Return to Pandora in this cinematic wonder. Jake Sully and Neytiri face new challenges when their family encounters the volcanic Ash Clan of Na’vi. Engineered for maximum visual immersion with state-of-the-art HFR 3D glasses.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-05',
    startTime: '21:00',
    endTime: '00:15',
    venue: 'Cinepolis Megaplex, Seasons Mall',
    address: 'Magarpatta City, Hadapsar, Pune, Maharashtra 411028',
    city: 'Pune',
    organizer: '20th Century Studios & Cinepolis India',
    ticketTypes: [
      { id: 'tt-23', name: 'Classic Silver', price: 380, description: 'Comfortable tiered cinema seat with Dolby 3D glasses.', available: 110, total: 130 },
      { id: 'tt-24', name: 'VIP Executive', price: 620, description: 'Extra legroom premium seat with prime audio angle.', available: 70, total: 90 },
      { id: 'tt-25', name: 'Lounge Recliner', price: 890, description: 'Plush automated recliner with dedicated server.', available: 24, total: 30 }
    ],
    isSeated: true,
    bookedSeats: ['B1', 'B2', 'C3', 'C4', 'D7', 'D8'],
    capacity: 250,
    demoAvailability: 204,
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 290,
    tags: ['Avatar', '3D Cinema', 'IMAX', 'Sci-Fi', 'Blockbuster'],
    rules: [
      '3D glasses will be handed out at auditorium door and must be returned after the show.',
      'Mobile phones must remain switched to silent throughout the screening.'
    ],
    highlights: [
      'High-Frame Rate (HFR) 48fps 4K 3D projection',
      'Spatial 64-channel Dolby Atmos soundscape',
      'Free souvenir sticker pack with every ticket'
    ],
    ageGuidance: 'UA 13+'
  },
  {
    id: 'evt-10',
    title: 'International Street Food & Craft Music Carnival',
    slug: 'international-street-food-and-craft-music-carnival',
    category: 'Festivals',
    description: 'Feast on 100+ global street delicacies, artisanal bakes, and live acoustic indie bands in an open-air park carnival.',
    fullDescription: 'Two days of pure culinary joy! Taste authentic Mexican tacos, Japanese takoyaki, Turkish baklavas, and Indian regional regional specialties. Alongside the food, enjoy live indie-pop bands, craft beer gardens, carnival gaming booths, and pet-friendly lawns.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-15',
    startTime: '12:00',
    endTime: '22:00',
    venue: 'Jayamahal Palace Lawns',
    address: 'Near Cantonment Railway Station, Nandi Durga Road, Bengaluru, Karnataka 560046',
    city: 'Bengaluru',
    organizer: 'FoodieCulture India & Wanderlust Fests',
    ticketTypes: [
      { id: 'tt-26', name: 'Carnival Day Entry', price: 199, description: 'General access to all food stalls, flea market, and live indie music stages.', available: 650, total: 800 },
      { id: 'tt-27', name: 'Foodie Tasting Passport', price: 699, description: 'Includes festival entry plus 5 complimentary tasting vouchers at top gourmet kiosks.', available: 180, total: 250 }
    ],
    isSeated: false,
    capacity: 2000,
    demoAvailability: 830,
    featured: false,
    trending: true,
    rating: 4.6,
    reviewsCount: 310,
    tags: ['Food Festival', 'Carnival', 'Indie Music', 'Street Food', 'Weekend'],
    rules: [
      'Pet friendly event! Pets must remain leashed at all times.',
      'Food tokens and digital UPI accepted at all individual food stalls.'
    ],
    highlights: [
      'Over 100 artisanal food trucks and artisan vendors',
      'Live performances by 6 indie acoustic artists',
      'Fun games, photobooths, and face painting for children'
    ],
    ageGuidance: 'Family Friendly (All Ages)'
  },
  {
    id: 'evt-11',
    title: 'Coldplay Tribute Night — Under the Stars',
    slug: 'coldplay-tribute-night-under-the-stars',
    category: 'Concerts',
    description: 'Sing your heart out to Yellow, Fix You, Viva La Vida, and Paradise performed live by a celebrated 8-piece tribute band.',
    fullDescription: 'Relive the stadium magic of Coldplay in an intimate amphitheater setting lit by thousands of LED wristbands and candlelight lamps. Sing along with thousands of fellow fans to anthems like The Scientist, A Sky Full of Stars, and Clocks under open skies.',
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-21',
    startTime: '19:00',
    endTime: '22:00',
    venue: 'HICC Novotel Open Arena, Hitec City',
    address: 'Near Hitec City, Madhapur, Hyderabad, Telangana 500081',
    city: 'Hyderabad',
    organizer: 'StarGaze Productions & LiveVibes',
    ticketTypes: [
      { id: 'tt-28', name: 'Silver Meadow', price: 799, description: 'Open lawn standing area with glowing wristband.', available: 320, total: 400 },
      { id: 'tt-29', name: 'Gold Front Pit', price: 1499, description: 'Up-front pit access near the stage and dedicated bar line.', available: 110, total: 150 }
    ],
    isSeated: false,
    capacity: 1200,
    demoAvailability: 430,
    featured: false,
    trending: true,
    rating: 4.8,
    reviewsCount: 260,
    tags: ['Coldplay', 'Tribute Concert', 'Live Band', 'Acoustic', 'Nightlife'],
    rules: [
      'Glow bands distributed upon presentation of valid tickets at the gate.',
      'Professional cameras are not permitted.'
    ],
    highlights: [
      'Synchronized multi-color LED wristbands given to all attendees',
      'Confetti canons and pyrotechnics during the grand finale',
      'Food and craft beverage trucks on venue grounds'
    ],
    ageGuidance: 'Open to All Ages'
  },
  {
    id: 'evt-12',
    title: 'Stand-Up Marathon: 8 Top Comedians Showcase',
    slug: 'stand-up-marathon-8-top-comedians-showcase',
    category: 'Comedy',
    description: 'Two non-stop hours of hilarity featuring 8 of India’s sharpest stand-up comics testing brand-new jokes.',
    fullDescription: 'Why watch one comedian when you can laugh with eight? This high-octane comedy showcase brings you a curated lineup of viral stand-up favorites and rising comedic stars delivering rapid-fire 15-minute sets.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-01',
    startTime: '20:00',
    endTime: '22:15',
    venue: 'The Habitat Comedy Club, Khar',
    address: '1st Floor, Hotel Unicontinental, 3rd Road, Khar West, Mumbai, Maharashtra 400052',
    city: 'Mumbai',
    organizer: 'The Comedy Club Network',
    ticketTypes: [
      { id: 'tt-30', name: 'General Seating', price: 499, description: 'Club seating with first-come first-served seating layout.', available: 45, total: 70 },
      { id: 'tt-31', name: 'Couples Table Pass', price: 999, description: 'Reserved table for two with complimentary mocktails.', available: 10, total: 15 }
    ],
    isSeated: true,
    bookedSeats: ['A3', 'A4', 'B1', 'B2'],
    capacity: 100,
    demoAvailability: 55,
    featured: false,
    trending: false,
    rating: 4.7,
    reviewsCount: 140,
    tags: ['Comedy', 'Open Mic', 'Stand-up', 'Weekend', 'Mumbai'],
    rules: [
      'Strictly 18+ only. Adult humor and explicit language.',
      'Recording audio or video will result in immediate disqualification without refund.'
    ],
    highlights: [
      'Lineup of 8 acclaimed comedians in one single ticket',
      'Cozy, intimate comedy club atmosphere',
      'Food and cocktail service directly to tables'
    ],
    ageGuidance: '18+ Only'
  },
  {
    id: 'evt-13',
    title: 'French Pastry & Sourdough Baking Masterclass',
    slug: 'french-pastry-and-sourdough-baking-masterclass',
    category: 'Workshops',
    description: 'Learn the science of crisp butter croissants, macarons, and artisanal sourdough loaves with Le Cordon Bleu certified chefs.',
    fullDescription: 'Discover the secret chemistry behind golden, flaky laminated dough and bubbling sourdough starters. Step inside a commercial patisserie kitchen where you will knead, laminate, shape, and bake your own gourmet pastries to take home in a luxury hamper.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-07',
    startTime: '10:30',
    endTime: '15:00',
    venue: 'Lavonne Academy of Baking Science & Pastry Arts',
    address: 'Indiranagar 100 Feet Road, HAL 2nd Stage, Bengaluru, Karnataka 560038',
    city: 'Bengaluru',
    organizer: 'Lavonne Pastry Guild',
    ticketTypes: [
      { id: 'tt-32', name: 'Masterclass Seat', price: 2199, description: 'Includes hands-on baking ingredients, chef apron, recipe manual & takeaway hamper.', available: 14, total: 20 }
    ],
    isSeated: false,
    capacity: 25,
    demoAvailability: 14,
    featured: false,
    trending: false,
    rating: 4.9,
    reviewsCount: 88,
    tags: ['Baking', 'Culinary', 'Pastry', 'Workshop', 'Food'],
    rules: [
      'Please tie hair back and wear closed-toe comfortable kitchen footwear.',
      'All culinary ingredients, tools, and protective aprons are provided.'
    ],
    highlights: [
      'Take home your fresh sourdough starter and box of handmade croissants',
      'Professional chef instruction and intimate batch size',
      'Gourmet lunch spread served during the fermentation break'
    ],
    ageGuidance: '14+ Suitable'
  },
  {
    id: 'evt-14',
    title: 'Vibrance Inter-College Cultural Gala 2026',
    slug: 'vibrance-inter-college-cultural-gala-2026',
    category: 'College Events',
    description: 'A 3-day extravaganza of collegiate battle of the bands, western street dance battles, fashion shows, and celebrity star night.',
    fullDescription: 'Vibrance 2026 is one of South India’s largest annual collegiate cultural celebrations! Witness fiery university dance crews, soulful acoustic bands, theatrical skits, and a spectacular grand finale concert headlined by top Bollywood playback icons.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    date: '2026-11-26',
    startTime: '11:00',
    endTime: '22:00',
    venue: 'University Amphitheatre, Anna Nagar',
    address: 'Sardar Patel Road, Guindy, Chennai, Tamil Nadu 600025',
    city: 'Chennai',
    organizer: 'Inter-University Cultural Syndicate',
    ticketTypes: [
      { id: 'tt-33', name: 'College Delegate Pass', price: 249, description: 'Full 3-day campus access to all cultural stage competitions and food stalls.', available: 400, total: 500 },
      { id: 'tt-34', name: 'Star Night VIP Enclosure', price: 799, description: 'VIP reserved zone for the celebrity concert on the final gala night.', available: 80, total: 100 }
    ],
    isSeated: false,
    capacity: 2500,
    demoAvailability: 480,
    featured: false,
    trending: true,
    rating: 4.7,
    reviewsCount: 220,
    tags: ['College Fest', 'Dance Battle', 'Battle of Bands', 'Youth', 'Music'],
    rules: [
      'Valid college ID or proof of student enrollment required.',
      'Alcoholic beverages and smoking strictly prohibited on campus premises.'
    ],
    highlights: [
      'Battle of the Bands with judges from leading music labels',
      'Street dance battle judged by world championship dancers',
      'Massive food court featuring 40+ college student culinary stalls'
    ],
    ageGuidance: 'Open to Students & Young Adults'
  }
];

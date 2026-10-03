/* ==========================================================================
   KISMET DATING APP - LOGIC & PHYSICS
   ========================================================================== */

// 0. GLOBAL CURRENCY DICTIONARY (EQUIVALENT TO AUD $0.99)
const CURRENCIES = {
    AUD: { code: "AUD", symbol: "$", value: "0.99", label: "🇦🇺 Australia (AUD $0.99)" },
    USD: { code: "USD", symbol: "$", value: "0.66", label: "🇺🇸 United States (USD $0.66)" },
    EUR: { code: "EUR", symbol: "€", value: "0.61", label: "🇪🇺 Eurozone (EUR €0.61)" },
    GBP: { code: "GBP", symbol: "£", value: "0.52", label: "🇬🇧 United Kingdom (GBP £0.52)" },
    CAD: { code: "CAD", symbol: "$", value: "0.90", label: "🇨🇦 Canada (CAD $0.90)" },
    NZD: { code: "NZD", symbol: "$", value: "1.08", label: "🇳🇿 New Zealand (NZD $1.08)" },
    JPY: { code: "JPY", symbol: "¥", value: "98", label: "🇯🇵 Japan (JPY ¥98)" },
    CHF: { code: "CHF", symbol: "", value: "0.57 CHF", label: "🇨🇭 Switzerland (CHF 0.57)" },
    SGD: { code: "SGD", symbol: "$", value: "0.87", label: "🇸🇬 Singapore (SGD $0.87)" },
    HKD: { code: "HKD", symbol: "$", value: "5.15", label: "🇭🇰 Hong Kong (HKD $5.15)" },
    SEK: { code: "SEK", symbol: "", value: "6.85 SEK", label: "🇸🇪 Sweden (SEK 6.85)" },
    NOK: { code: "NOK", symbol: "", value: "7.05 NOK", label: "🇳🇴 Norway (NOK 7.05)" },
    DKK: { code: "DKK", symbol: "", value: "4.55 DKK", label: "🇩🇰 Denmark (DKK 4.55)" },
    PLN: { code: "PLN", symbol: "", value: "2.62 PLN", label: "🇵🇱 Poland (PLN 2.62)" },
    MKD: { code: "MKD", symbol: "", value: "37.50 MKD", label: "🇲🇰 N. Macedonia (MKD 37.50)" },
    RSD: { code: "RSD", symbol: "", value: "71.50 RSD", label: "🇷🇸 Serbia (RSD 71.50)" },
    BGN: { code: "BGN", symbol: "", value: "1.20 BGN", label: "🇧🇬 Bulgaria (BGN 1.20)" },
    RON: { code: "RON", symbol: "", value: "3.02 RON", label: "🇷🇴 Romania (RON 3.02)" },
    TRY: { code: "TRY", symbol: "₺", value: "22.50", label: "🇹🇷 Turkey (TRY ₺22.50)" },
    INR: { code: "INR", symbol: "₹", value: "55.00", label: "🇮🇳 India (INR ₹55.00)" },
    CNY: { code: "CNY", symbol: "¥", value: "4.70", label: "🇨🇳 China (CNY ¥4.70)" },
    KRW: { code: "KRW", symbol: "₩", value: "880", label: "🇰🇷 South Korea (KRW ₩880)" },
    BRL: { code: "BRL", symbol: "R$", value: "3.60", label: "🇧🇷 Brazil (BRL R$3.60)" },
    MXN: { code: "MXN", symbol: "$", value: "13.10", label: "🇲🇽 Mexico (MXN $13.10)" },
    ARS: { code: "ARS", symbol: "$", value: "630.00", label: "🇦🇷 Argentina (ARS $630.00)" },
    ZAR: { code: "ZAR", symbol: "R", value: "12.00", label: "🇿🇦 South Africa (ZAR R12.00)" },
    AED: { code: "AED", symbol: "", value: "2.42 AED", label: "🇦🇪 UAE (AED 2.42)" },
    SAR: { code: "SAR", symbol: "", value: "2.48 SAR", label: "🇸🇦 Saudi Arabia (SAR 2.48)" },
    ILS: { code: "ILS", symbol: "₪", value: "2.45", label: "🇮🇱 Israel (ILS ₪2.45)" },
    THB: { code: "THB", symbol: "฿", value: "22.50", label: "🇹🇭 Thailand (THB ฿22.50)" },
    IDR: { code: "IDR", symbol: "Rp", value: "10,500", label: "🇮🇩 Indonesia (IDR Rp10,500)" },
    MYR: { code: "MYR", symbol: "RM", value: "3.10", label: "🇲🇾 Malaysia (MYR RM3.10)" },
    PHP: { code: "PHP", symbol: "₱", value: "37.00", label: "🇵🇭 Philippines (PHP ₱37.00)" },
    VND: { code: "VND", symbol: "₫", value: "16,300", label: "🇻🇳 Vietnam (VND 16,300₫)" }
};

function getFormattedFee(currencyKey) {
    const c = CURRENCIES[currencyKey] || CURRENCIES.AUD;
    if (c.symbol) {
        return `${c.symbol}${c.value} ${c.code}`;
    }
    return c.value;
}

// 1. MOCK PROFILES DATABASE
const CANDIDATE_PROFILES = [
    {
        id: "sophia",
        name: "Sophia",
        age: 24,
        gender: "woman",
        country: "Australia",
        countryFlag: "🇦🇺",
        location: "Sydney, Australia",
        distance: "5 kilometres away",
        bio: "Art curator & amateur ceramicist. Let's get coffee and talk about design, vinyl records, or the best pasta place in the city. ☕️🎨",
        passions: ["Art", "Ceramics", "Coffee", "Museums", "Vinyl"],
        photos: [
            "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Midnight City",
        artist: "M83",
        matchChance: 0.7, // High chance for testing matches
        chatReplies: [
            "Hey there! Love your profile. What kind of coffee are you into? ☕️",
            "That's awesome! I'm currently setting up a new modern art exhibition downtown. Have you been to the gallery lately?",
            "Oh, we absolutely have to go! There is this amazing vinyl cafe nearby that plays jazz on Friday nights. Would you want to check it out sometime? ✨",
            "Let's do it! How does Friday at 7 PM sound for a coffee/drink date?"
        ]
    },
    {
        id: "marcus",
        name: "Marcus",
        age: 27,
        gender: "man",
        country: "Australia",
        countryFlag: "🇦🇺",
        location: "Melbourne, Australia",
        distance: "8 kilometres away",
        bio: "Software developer, coffee nerd, and hiking enthusiast. Let's debug life together, share Spotify playlists, and find the best mountain trails. 🥾💻",
        passions: ["Coding", "Coffee", "Hiking", "Outdoors", "Tech"],
        photos: [
            "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Intro",
        artist: "The xx",
        matchChance: 0.6,
        chatReplies: [
            "Hey! Thanks for swiping right. Do you code too, or did my outdoorsy photos win you over? 😉",
            "Haha, classic! Coffee is definitely the fuel of life. What's your go-to brewing method? I'm currently obsessed with V64 pour-overs.",
            "Ah, a connoisseur! We should definitely swap notes. I know a cozy little coffee shop that does amazing single-origin roasts. Let's go there sometime?",
            "Awesome, I'll text you the place and we can figure out a day! Speak soon!"
        ]
    },
    {
        id: "elena",
        name: "Elena",
        age: 26,
        gender: "woman",
        country: "USA",
        countryFlag: "🇺🇸",
        location: "Miami, USA",
        distance: "19 kilometres away",
        bio: "Travel blogger, foodie, and scuba diver. Always looking for the next adventure. Let's explore the world or just find the best street tacos! ✈️🌮",
        passions: ["Travel", "Foodie", "Diving", "Photography", "Adventures"],
        photos: [
            "https://images.unsplash.com/photo-1520034475321-cbe63696469a?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Levitating",
        artist: "Dua Lipa",
        matchChance: 0.8,
        chatReplies: [
            "Hey adventure buddy! Where is the next stamp on your passport going to be? 🗺️",
            "Oh, that sounds amazing! I just got back from a diving trip in Bali. The underwater life there is unreal! 🐠",
            "We definitely should! But first, we need to test our compatibility: pineapples on pizza, yes or no? 🍍🍕",
            "Yes! You passed the test. Let's celebrate with tacos and margaritas. Are you free this Thursday?"
        ]
    },
    {
        id: "liam",
        name: "Liam",
        age: 25,
        gender: "man",
        country: "UK",
        countryFlag: "🇬🇧",
        location: "London, UK",
        distance: "13 kilometres away",
        bio: "Architect, bookworm, and dog lover. Let's explore the city's hidden alleys, sketch in the park, or read in a quiet library. 🐕📐📚",
        passions: ["Architecture", "Reading", "Dogs", "Design", "Quiet Cafes"],
        photos: [
            "https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1475274047050-1d0c0975de51?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Tadow",
        artist: "Masego & FKJ",
        matchChance: 0.5,
        chatReplies: [
            "Hello! How's your week going? Hope you like dogs, because my golden retriever Charlie is part of the package! 🐾",
            "Charlie says hi! 🐶 He's a professional cuddler. What about you? Do you have any pets?",
            "That's lovely. I'm reading this fascinating book about brutalist architecture. I'd love to tell you about it over tea/coffee if you're open to it?",
            "Perfect. I know a quiet greenhouse cafe that's perfect for a chat. Let's aim for Saturday afternoon!"
        ]
    },
    {
        id: "chloe",
        name: "Chloe",
        age: 28,
        gender: "woman",
        country: "Canada",
        countryFlag: "🇨🇦",
        location: "Toronto, Canada",
        distance: "3 kilometres away",
        bio: "Musician, vinyl collector, and plant mom. Tell me your favorite album and let's go record shopping. My apartment is slowly becoming a jungle. 🌿🎸",
        passions: ["Music", "Vinyl", "Plants", "Concerts", "Indie"],
        photos: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Dreams",
        artist: "Fleetwood Mac",
        matchChance: 0.7,
        chatReplies: [
            "Hey! What's the last song you listened to? Don't lie! 🎵",
            "Solid choice! Fleetwood Mac is legendary. Do you collect vinyls or stick to streaming?",
            "Ah, a fellow analog soul! We definitely need to raid the local record stores. There's a crate digging session in our future.",
            "Let's do this weekend! Sunday afternoon crate digging. I'll send you my favorite shop address."
        ]
    },
    {
        id: "kai",
        name: "Kai",
        age: 23,
        gender: "man",
        country: "Australia",
        countryFlag: "🇦🇺",
        location: "Gold Coast, Australia",
        distance: "24 kilometres away",
        bio: "Surf instructor, yoga teacher, and positive vibes. Live in the sunshine, swim in the sea. Let's hit the beach for sunset and volleyball! ☀️🌊🧘‍♂️",
        passions: ["Surfing", "Yoga", "Fitness", "Beach", "Nature"],
        photos: [
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Slide",
        artist: "Calvin Harris",
        matchChance: 0.6,
        chatReplies: [
            "Aloha! 🤙 How are you doing? Ready to catch some waves or just chill on the beach?",
            "Sweet! Sunset yoga sessions are my absolute favorite. It's the best way to reset the mind. Ever tried yoga?",
            "No worries, I'll teach you! It's super relaxing. We could do a quick beach session then grab smoothies. Down?",
            "Awesome! Let's watch the weather forecast and lock in a sunny afternoon this week."
        ]
    },
    {
        id: "ana",
        name: "Ana",
        age: 25,
        gender: "woman",
        country: "Macedonia",
        countryFlag: "🇲🇰",
        location: "Skopje, Macedonia",
        distance: "6 kilometres away",
        bio: "Icon painter & theology student. I find beauty in the sacred and the everyday. Let's share a cup of herbal tea and talk about faith, art, and life. 🕯️🎨",
        passions: ["Icon Painting", "Theology", "Tea", "History", "Faith"],
        photos: [
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Ave Maria",
        artist: "Schubert",
        matchChance: 0.75,
        chatReplies: [
            "Hi! I love your profile. Are you into Byzantine art at all? 🕯️",
            "That's wonderful! I've been working on an icon of St. George lately. It's meditative work.",
            "Exactly, it's like prayer in colour. I'd love to show you my studio sometime — tea included 🍵",
            "Let's do Sunday after liturgy! I know a little place with the best baklava in town."
        ]
    },
    {
        id: "nikolaj",
        name: "Nikolaj",
        age: 29,
        gender: "man",
        country: "Serbia",
        countryFlag: "🇷🇸",
        location: "Belgrade, Serbia",
        distance: "11 kilometres away",
        bio: "Chef with a passion for traditional Balkan recipes. My grandma taught me everything in the kitchen. Let's cook together and share stories over a good meal. 🍽️🇷🇸",
        passions: ["Cooking", "Food", "Family", "Culture", "Wine"],
        photos: [
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Ederlezi",
        artist: "Goran Bregović",
        matchChance: 0.65,
        chatReplies: [
            "Hey! Do you appreciate home-cooked meals or are you more of a restaurant person? 😄",
            "I knew it! There's nothing like a proper sarma slow-cooked for hours. My grandma's recipe is legendary.",
            "I'll tell you what — come over Saturday, I'll make a proper feast. Bring your appetite! 🍷",
            "It's a date then. I'll send you the address. Fair warning: you might never want to leave. 😄"
        ]
    },
    {
        id: "katerina",
        name: "Katerina",
        age: 27,
        gender: "woman",
        country: "Greece",
        countryFlag: "🇬🇷",
        location: "Thessaloniki, Greece",
        distance: "9 kilometres away",
        bio: "Nurse by day, folk dancer by night. I love keeping traditions alive — music, embroidery, and Sunday lunches with family. Looking for someone genuine. 💃🌺",
        passions: ["Folk Dance", "Embroidery", "Family", "Traditions", "Nature"],
        photos: [
            "https://images.unsplash.com/photo-1488716820095-cbe80883c496?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Kaval Sviri",
        artist: "Traditional",
        matchChance: 0.7,
        chatReplies: [
            "Hello! Do you have any connection to folk traditions or is this a new world for you? 🌺",
            "That's so sweet! My dance group performs at festivals all summer. It's the most joyful thing.",
            "You'd love it! The music, the costumes, the energy — it's pure soul. Come watch us perform? 💃",
            "Our next show is in two weeks. I'll save you a front row spot!"
        ]
    },
    {
        id: "dmitri",
        name: "Dmitri",
        age: 31,
        gender: "man",
        country: "Serbia",
        countryFlag: "🇷🇸",
        location: "Novi Sad, Serbia",
        distance: "16 kilometres away",
        bio: "History teacher & choir singer. I spend my weekends at monasteries, bookshops, and farmers' markets. Let's have deep conversations over good coffee. ☕📖",
        passions: ["History", "Choir", "Reading", "Monasteries", "Coffee"],
        photos: [
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Bozhe Pravde",
        artist: "Traditional",
        matchChance: 0.6,
        chatReplies: [
            "Good day! What period of history do you find most fascinating? I could talk about this for hours 📖",
            "Exactly! The Byzantine era is endlessly rich. Most people don't realise how much it shaped the modern world.",
            "We should visit the manuscript collection at the city library — it's extraordinary. Interested?",
            "Wonderful. Saturday morning, library, then coffee and debate. That's my kind of date. ☕"
        ]
    },
    {
        id: "marina",
        name: "Marina",
        age: 24,
        gender: "woman",
        country: "Macedonia",
        countryFlag: "🇲🇰",
        location: "Bitola, Macedonia",
        distance: "4 kilometres away",
        bio: "Graphic designer & amateur photographer. I shoot film, drink too much coffee, and love rooftop sunsets. Always looking for the next beautiful moment. 📷✨",
        passions: ["Photography", "Design", "Coffee", "Sunsets", "Film"],
        photos: [
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1484399172022-72a90b12e3c1?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Golden Hour",
        artist: "JVKE",
        matchChance: 0.8,
        chatReplies: [
            "Hey! Film or digital? It says a lot about a person 📷",
            "Film all the way! The anticipation of developing a roll is unmatched. I shoot on a Pentax K1000.",
            "We have to shoot together sometime! I know the most photogenic rooftop in the city. Golden hour is magic there.",
            "This weekend if the sky cooperates? I'll bring the camera, you bring the coffee ☕✨"
        ]
    },
    {
        id: "stefan",
        name: "Stefan",
        age: 26,
        gender: "man",
        country: "Macedonia",
        countryFlag: "🇲🇰",
        location: "Ohrid, Macedonia",
        distance: "20 kilometres away",
        bio: "Candle maker, beekeeper & outdoor enthusiast. I live simply and love deeply. Raised in the mountains, now in the city — still miss the stars. 🌲🕯️🐝",
        passions: ["Beekeeping", "Candles", "Hiking", "Mountains", "Stars"],
        photos: [
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1500336624523-d727130c3328?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=600"
        ],
        song: "Mountains",
        artist: "Biffy Clyro",
        matchChance: 0.65,
        chatReplies: [
            "Hey! City person or mountain soul? 🌲",
            "Mountains every time. The city is convenient but the mountains are alive. I try to go back every month.",
            "We could do a day hike — I know trails most people have never heard of. Pack lunch, I'll bring honey from my hives. 🐝",
            "Next clear weekend then! Early start, big skies, good company. Deal? 🤝"
        ]
    }
];

const DEFAULT_USER_PHOTOS = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"
];

// 2. STATE CONFIGURATION
const state = {
    userProfile: {
        firstName: "Alex",
        surname: "",
        name: "Alex",
        age: 25,
        gender: "man",
        orthodoxRoots: "🇲🇰 Macedonian",
        bio: "Curious mind. Coffee enthusiast, occasional runner, and loves exploring new neighborhoods.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
        photos: [...DEFAULT_USER_PHOTOS],
        prefGender: "everyone",
        prefDistance: 30,
        prefMaxAge: 35,
        isLicenseVerified: false,
        licenseDoc: null,
        savedPaymentMethod: "applepay",
        avatarShape: "square",
        password: "",
        passcode: "1234"
    },
    activeLoginMethod: "passcode",
    activePhotoSlotIndex: 0,
    deck: [],          // Active matching candidates
    swipes: {},        // id -> 'like' / 'nope' / 'superlike'
    matches: [],       // Array of matched profile objects
    chats: {},         // id -> array of message objects: { sender: 'me'/'them', text: '', time: '' }
    activeChatId: null,
    historyStack: [],  // Swipes history for Rewind
    currentActiveView: "deck-panel", // For mobile viewport switching
    boostActive: false,
    boostTimer: null,
    selectedPaymentMethod: "applepay",
    userSubscription: "free",
    passCountToday: 0,
    lastPassResetDate: null,
    likeCountToday: 0,
    lastLikeResetDate: null,
    rewindCountToday: 0,
    lastRewindResetDate: null
};

// 3. CACHE DOM ELEMENTS
const DOM = {
    app: document.getElementById("app"),
    onboardingScreen: document.getElementById("onboarding-screen"),
    profileSetupForm: document.getElementById("profile-setup-form"),
    mainApp: document.getElementById("main-app"),
    
    // Header & Sidebar
    headerUserAvatar: document.getElementById("header-user-avatar"),
    headerUserName: document.getElementById("header-user-name"),
    headerVerifiedBadge: document.getElementById("header-verified-badge"),
    sidebarPanel: document.getElementById("sidebar-panel"),
    matchesContainer: document.getElementById("matches-container"),
    conversationsContainer: document.getElementById("conversations-container"),
    messageBadge: document.getElementById("message-badge"),

    // Driver Licence Verification
    stepLicenseVerify: document.getElementById("step-license-verify"),
    licenseDropzone: document.getElementById("license-dropzone"),
    licenseFileInput: document.getElementById("license-file-input"),
    licenseUploadPlaceholder: document.getElementById("license-upload-placeholder"),
    licensePreviewContainer: document.getElementById("license-preview-container"),
    licensePreviewImg: document.getElementById("license-preview-img"),
    scanLine: document.getElementById("scan-line"),
    licenseVerifiedOverlay: document.getElementById("license-verified-overlay"),
    reuploadLicenseBtn: document.getElementById("reupload-license-btn"),
    verificationStatusBanner: document.getElementById("verification-status-banner"),
    statusDot: document.getElementById("status-dot"),
    statusText: document.getElementById("status-text"),
    submitLicenseBtn: document.getElementById("submit-license-btn"),
    licenseVerifyForm: document.getElementById("license-verify-form"),
    settingsVerifiedPill: document.getElementById("settings-verified-pill"),
    settingsVerificationTitle: document.getElementById("settings-verification-title"),
    settingsVerificationDesc: document.getElementById("settings-verification-desc"),
    settingsReuploadLicenseBtn: document.getElementById("settings-reupload-license-btn"),
    
    // Deck
    deckPanel: document.getElementById("deck-panel"),
    cardStackDeck: document.getElementById("card-stack-deck"),
    deckPulseAvatar: document.getElementById("deck-pulse-avatar"),
    actionControls: document.getElementById("action-controls"),
    btnRewind: document.getElementById("btn-rewind"),
    btnNope: document.getElementById("btn-nope"),
    btnSuperlike: document.getElementById("btn-superlike"),
    btnLike: document.getElementById("btn-like"),
    btnBoost: document.getElementById("btn-boost"),
    
    // Chat Panel
    chatPanel: document.getElementById("chat-panel"),
    chatAvatar: document.getElementById("chat-avatar"),
    chatName: document.getElementById("chat-name"),
    chatMessagesContainer: document.getElementById("chat-messages-container"),
    chatForm: document.getElementById("chat-form"),
    chatMessageInput: document.getElementById("chat-message-input"),
    closeChatBtn: document.getElementById("close-chat-btn"),
    viewMatchProfileBtn: document.getElementById("view-match-profile-btn"),
    
    // Profile Details
    profileDetailsView: document.getElementById("profile-details-view"),
    detailsHeroImg: document.getElementById("details-hero-img"),
    detailsCarouselDots: document.getElementById("details-carousel-dots"),
    detailsName: document.getElementById("details-name"),
    detailsAge: document.getElementById("details-age"),
    detailsGender: document.getElementById("details-gender"),
    detailsDistance: document.getElementById("details-distance"),
    detailsBio: document.getElementById("details-bio"),
    detailsPassions: document.getElementById("details-passions"),
    detailsSong: document.getElementById("details-song"),
    detailsArtist: document.getElementById("details-artist"),
    closeDetailsBackdrop: document.getElementById("close-details-backdrop"),
    closeDetailsHandle: document.getElementById("close-details-handle"),
    detailsPrevImg: document.getElementById("details-prev-img"),
    detailsNextImg: document.getElementById("details-next-img"),
    
    userFirstName: document.getElementById("user-first-name"),
    userSurname: document.getElementById("user-surname"),
    userEmail: document.getElementById("user-email"),

    // Settings & Edit Profile
    settingsView: document.getElementById("settings-view"),
    settingsAvatarPreview: document.getElementById("settings-avatar-preview"),
    settingsAvatarModal: document.getElementById("settings-avatar-modal"),
    settingsAvatarGrid: document.getElementById("settings-avatar-grid"),
    settingsCustomAvatarUrl: document.getElementById("settings-custom-avatar-url"),
    btnChangeAvatar: document.getElementById("btn-change-avatar"),
    btnSaveAvatarSelect: document.getElementById("btn-save-avatar-select"),
    settingsFirstNameVal: document.getElementById("settings-first-name-val"),
    settingsSurnameVal: document.getElementById("settings-surname-val"),
    settingsEmailVal: document.getElementById("settings-email-val"),
    settingsAgeVal: document.getElementById("settings-age-val"),
    settingsGenderVal: document.getElementById("settings-gender-val"),
    settingsRootsVal: document.getElementById("settings-roots-val"),
    settingsBioVal: document.getElementById("settings-bio-val"),
    prefDistance: document.getElementById("pref-distance"),
    prefMaxAge: document.getElementById("pref-max-age"),
    distValue: document.getElementById("dist-value"),
    ageValue: document.getElementById("age-value"),
    saveSettingsBtn: document.getElementById("save-settings-btn"),
    closeSettingsBtn: document.getElementById("close-settings-btn"),
    openSettingsBtn: document.getElementById("open-settings-btn"),
    openProfileBtn: document.getElementById("open-profile-btn"),
    
    // Match Modal Overlay
    matchModal: document.getElementById("match-modal"),
    matchUserImg: document.getElementById("match-user-img"),
    matchCandidateImg: document.getElementById("match-candidate-img"),
    matchSubtitleText: document.getElementById("match-subtitle-text"),
    matchQuickMessage: document.getElementById("match-quick-message"),
    btnMatchSend: document.getElementById("btn-match-send"),
    btnMatchClose: document.getElementById("btn-match-close"),
    
    // Payment Modal Overlay
    paymentModal: document.getElementById("payment-modal"),
    closePaymentBtn: document.getElementById("close-payment-btn"),
    paymentOptions: document.querySelectorAll(".payment-option"),
    cardDetailsForm: document.getElementById("card-details-form"),
    cardTermsCheck: document.getElementById("card-terms-check"),
    bankDetailsForm: document.getElementById("bank-details-form"),
    bankFullName: document.getElementById("bank-full-name"),
    bankBsb: document.getElementById("bank-bsb"),
    bankAccountNumber: document.getElementById("bank-account-number"),
    bankTermsCheck: document.getElementById("bank-terms-check"),
    confirmPayBtn: document.getElementById("confirm-pay-btn"),
    paymentMatchName: document.getElementById("payment-match-name"),
    
    // Currency Elements
    currencySelect: document.getElementById("currency-select"),
    paymentCurrencySelect: document.getElementById("payment-currency-select"),
    matchFeeAmount: document.getElementById("match-fee-amount"),
    matchSendAmount: document.getElementById("match-send-amount"),
    paymentFeeAmount: document.getElementById("payment-fee-amount"),
    confirmPayAmount: document.getElementById("confirm-pay-amount"),

    // Subscription Plans Overlay
    plansModal: document.getElementById("plans-modal"),
    openPlansBtn: document.getElementById("open-plans-btn"),
    closePlansBtn: document.getElementById("close-plans-btn"),
    settingsPlansBtn: document.getElementById("settings-plans-btn"),
    planSelectBtns: document.querySelectorAll(".plan-select-btn"),

    // Additional Back Buttons
    closeDetailsBackBtn: document.getElementById("btn-close-details"),
    matchBackBtn: document.getElementById("btn-match-back"),
    closeAvatarModalBtn: document.getElementById("close-avatar-modal-btn"),

    // Toast Container
    toastContainer: document.getElementById("toast-container"),

    // Who's Available Top Right Widget
    onlineMatchesWidget: document.getElementById("online-matches-widget"),
    onlineListContainer: document.getElementById("online-list-container"),
    onlineCountBadge: document.getElementById("online-count-badge"),

    // Saved Payment Elements in Settings
    settingsSavedPaymentSelect: document.getElementById("settings-saved-payment-select"),
    settingsPaymentPill: document.getElementById("settings-payment-pill"),
    savedPaymentMethodName: document.getElementById("saved-payment-method-name"),

    // Avatar Shape & Photos Elements
    headerAvatarBox: document.getElementById("header-avatar-box"),
    avatarShapeBtns: document.querySelectorAll(".avatar-shape-btn"),
    profilePhotosGrid: document.getElementById("profile-photos-grid"),
    photosCountBadge: document.getElementById("photos-count-badge"),

    // Country Matching Filter Elements
    deckCountrySelect: document.getElementById("deck-country-select"),
    matchesCountrySelect: document.getElementById("matches-country-select"),
    prefCountriesContainer: document.getElementById("pref-countries-container")
};

// 4. STORAGE ACCESSORS
const Storage = {
    save() {
        localStorage.setItem("buba_state", JSON.stringify({
            userProfile: state.userProfile,
            swipes: state.swipes,
            matches: state.matches,
            chats: state.chats,
            selectedCurrency: state.selectedCurrency,
            userSubscription: state.userSubscription,
            passCountToday: state.passCountToday,
            lastPassResetDate: state.lastPassResetDate,
            likeCountToday: state.likeCountToday,
            lastLikeResetDate: state.lastLikeResetDate,
            rewindCountToday: state.rewindCountToday,
            lastRewindResetDate: state.lastRewindResetDate
        }));
    },
    load() {
        const stored = localStorage.getItem("buba_state") || localStorage.getItem("buba_state");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                state.userProfile = parsed.userProfile || state.userProfile;
                if (!state.userProfile.savedPaymentMethod) {
                    state.userProfile.savedPaymentMethod = "applepay";
                }
                if (!state.userProfile.avatarShape) {
                    state.userProfile.avatarShape = "square";
                }
                if (!state.userProfile.firstName) {
                    state.userProfile.firstName = state.userProfile.name || "Alex";
                }
                if (!state.userProfile.surname) {
                    state.userProfile.surname = "";
                }
                if (!state.userProfile.photos || state.userProfile.photos.length === 0) {
                    state.userProfile.photos = [
                        state.userProfile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                    ];
                }
                if (!state.userProfile.prefCountries) {
                    state.userProfile.prefCountries = ["all"];
                }
                state.activePhotoSlotIndex = 0;
                state.swipes = parsed.swipes || state.swipes;
                state.matches = parsed.matches || state.matches;
                state.chats = parsed.chats || state.chats;
                state.selectedCurrency = parsed.selectedCurrency || state.selectedCurrency;
                state.userSubscription = parsed.userSubscription || state.userSubscription;
                state.passCountToday = parsed.passCountToday || 0;
                state.lastPassResetDate = parsed.lastPassResetDate || "";
                state.likeCountToday = parsed.likeCountToday || 0;
                state.lastLikeResetDate = parsed.lastLikeResetDate || "";
                state.rewindCountToday = parsed.rewindCountToday || 0;
                state.lastRewindResetDate = parsed.lastRewindResetDate || "";
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }
    }
};

// 5. APPLICATION CONTROLLER
const App = {
    showLoginPage() {
        DOM.app.classList.add("onboarding-active");
        if (DOM.mainApp) DOM.mainApp.classList.remove("active");
        if (DOM.settingsView) DOM.settingsView.classList.remove("active");
        if (DOM.onboardingScreen) DOM.onboardingScreen.classList.add("active");
        document.querySelectorAll(".onboarding-card").forEach(c => c.classList.remove("active"));
        const stepWelcome = document.getElementById("step-welcome");
        if (stepWelcome) stepWelcome.classList.add("active");
        this.syncSettingsFormWithState();
    },

    init() {
        Storage.load();
        this.setupEventListeners();
        this.selectPaymentMethod(state.userProfile.savedPaymentMethod || "applepay");
        this.updateAvatarShape(state.userProfile.avatarShape || "square");
        this.renderProfilePhotosGrid();
        this.updateOwnProfileDOM();
        this.populateCurrencySelectors();
        
        // Show Log In to O-Buba page
        this.showLoginPage();
    },

    setupEventListeners() {
        // Log Out Button Handlers -> Displays Log In to O-Buba page
        const handleLogout = () => {
            localStorage.setItem("buba_logged_in", "false");
            localStorage.setItem("buba_has_setup", "false");
            this.showLoginPage();
            this.showToast("Logged out successfully. Welcome to Log In to O-Buba! ✨", "default");
        };

        const headerLogoutBtn = document.getElementById("header-logout-btn");
        if (headerLogoutBtn) {
            headerLogoutBtn.addEventListener("click", handleLogout);
        }

        const appLogoutBtn = document.getElementById("app-logout-btn");
        if (appLogoutBtn) {
            appLogoutBtn.addEventListener("click", handleLogout);
        }

        // ── LOGIN METHOD SWITCHER (Inline Password vs Passcode Options) ──
        const btnOptPassword = document.getElementById("btn-opt-password");
        const btnOptPasscode = document.getElementById("btn-opt-passcode");

        const loginPasswordGroup = document.getElementById("login-password-group");
        const loginPasscodeGroup = document.getElementById("login-passcode-group");
        const loginSubmitBtn = document.getElementById("login-submit-btn");
        const loginSubtitle = document.getElementById("login-subtitle");

        const switchLoginMethod = (method) => {
            state.activeLoginMethod = method;
            if (method === "password") {
                if (btnOptPassword) {
                    btnOptPassword.classList.add("active");
                    btnOptPassword.style.border = "1px solid #ff33bb";
                    btnOptPassword.style.background = "rgba(255, 51, 187, 0.3)";
                    btnOptPassword.style.color = "#fff";
                }
                if (btnOptPasscode) {
                    btnOptPasscode.classList.remove("active");
                    btnOptPasscode.style.border = "1px solid transparent";
                    btnOptPasscode.style.background = "transparent";
                    btnOptPasscode.style.color = "rgba(255, 255, 255, 0.7)";
                }
                if (loginPasswordGroup) loginPasswordGroup.style.display = "block";
                if (loginPasscodeGroup) loginPasscodeGroup.style.display = "none";
                if (loginSubmitBtn) loginSubmitBtn.textContent = "Log In with Password";
                if (loginSubtitle) loginSubtitle.textContent = "Enter your name or email and password to access your profile.";
            } else {
                if (btnOptPasscode) {
                    btnOptPasscode.classList.add("active");
                    btnOptPasscode.style.border = "1px solid #ff33bb";
                    btnOptPasscode.style.background = "rgba(255, 51, 187, 0.3)";
                    btnOptPasscode.style.color = "#fff";
                }
                if (btnOptPassword) {
                    btnOptPassword.classList.remove("active");
                    btnOptPassword.style.border = "1px solid transparent";
                    btnOptPassword.style.background = "transparent";
                    btnOptPassword.style.color = "rgba(255, 255, 255, 0.7)";
                }
                if (loginPasswordGroup) loginPasswordGroup.style.display = "none";
                if (loginPasscodeGroup) loginPasscodeGroup.style.display = "block";
                if (loginSubmitBtn) loginSubmitBtn.textContent = "Log In with Passcode (PIN)";
                if (loginSubtitle) loginSubtitle.textContent = "Enter your name or email and your 4-digit passcode PIN.";
            }
        };

        if (btnOptPassword) btnOptPassword.addEventListener("click", () => switchLoginMethod("password"));
        if (btnOptPasscode) btnOptPasscode.addEventListener("click", () => switchLoginMethod("passcode"));

        // Login Form Submission -> Validates credentials (Password or Passcode) and logs in
        const loginForm = document.getElementById("login-form");
        if (loginForm) {
            loginForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const usernameInput = document.getElementById("login-username");
                const passwordInput = document.getElementById("login-password");
                const passcodeInput = document.getElementById("login-passcode");
                
                const nameOrEmail = usernameInput ? usernameInput.value.trim() : "";
                const password = passwordInput ? passwordInput.value : "";
                const passcode = passcodeInput ? passcodeInput.value.trim() : "";

                const savedName = (state.userProfile.name || state.userProfile.firstName || "").toLowerCase();
                const savedEmail = (state.userProfile.email || "").toLowerCase();
                const savedPassword = state.userProfile.password;
                const savedPasscode = state.userProfile.passcode || "1234";

                const inputLower = nameOrEmail.toLowerCase();
                const matchesIdentity = !savedName && !savedEmail ? true : (inputLower === savedName || inputLower === savedEmail || (savedEmail && inputLower.includes(savedEmail)) || (savedName && inputLower.includes(savedName)) || (savedEmail && savedEmail.includes(inputLower)));

                if (state.activeLoginMethod === "password") {
                    const matchesPassword = !savedPassword ? true : (password === savedPassword);
                    if (savedPassword && (savedName || savedEmail) && nameOrEmail && password && (!matchesIdentity || !matchesPassword)) {
                        this.showToast("Invalid Name/Email or Password. Please check credentials or click Forgot Password.", "default");
                        return;
                    }
                } else {
                    const matchesPasscode = !savedPasscode ? true : (passcode === savedPasscode);
                    if ((savedName || savedEmail) && nameOrEmail && passcode && (!matchesIdentity || !matchesPasscode)) {
                        this.showToast("Invalid Name/Email or Passcode PIN. Default PIN is 1234.", "default");
                        return;
                    }
                }
                
                if (nameOrEmail) {
                    if (nameOrEmail.includes("@")) {
                        state.userProfile.email = nameOrEmail;
                        if (!state.userProfile.name) state.userProfile.name = nameOrEmail.split("@")[0];
                        if (!state.userProfile.firstName) state.userProfile.firstName = nameOrEmail.split("@")[0];
                    } else {
                        state.userProfile.firstName = nameOrEmail;
                        state.userProfile.name = nameOrEmail;
                    }
                    this.updateOwnProfileDOM();
                }

                state.userProfile.isLicenseVerified = true;
                localStorage.setItem("buba_logged_in", "true");
                localStorage.setItem("buba_has_setup", "true");
                Storage.save();
                
                // Open Main App Workspace / Matches Page
                DOM.app.classList.remove("onboarding-active");
                DOM.onboardingScreen.classList.remove("active");
                DOM.mainApp.classList.add("active");
                if (DOM.deckPanel) DOM.deckPanel.classList.add("active");
                if (DOM.sidebarPanel) DOM.sidebarPanel.classList.add("active");
                if (DOM.settingsView) DOM.settingsView.classList.remove("active");
                
                this.generateDeck();
                this.renderSidebarMatches();
                this.renderSidebarConversations();
                
                const methodLabel = state.activeLoginMethod === "passcode" ? "Passcode PIN" : "Password";
                this.showToast(`Logged in successfully via ${methodLabel}! Welcome to O-Buba ✨`, "default");
            });
        }

        // Onboarding flow transitions
        document.querySelectorAll(".next-step-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const nextId = btn.getAttribute("data-next");
                document.querySelectorAll(".onboarding-card").forEach(c => c.classList.remove("active"));
                const targetCard = document.getElementById(nextId);
                if (targetCard) targetCard.classList.add("active");
                if (nextId === "step-login-details" || nextId === "step-welcome") {
                    this.syncSettingsFormWithState();
                }
            });
        });

        // Forgot / Reset Password Form Handler
        const forgotPasswordForm = document.getElementById("forgot-password-form");
        const resetEmailInput = document.getElementById("reset-email-input");
        const resetLinkSentBanner = document.getElementById("reset-link-sent-banner");
        const resetSentMsg = document.getElementById("reset-sent-msg");

        if (forgotPasswordForm) {
            forgotPasswordForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const email = resetEmailInput ? resetEmailInput.value.trim() : "";
                if (!email) {
                    this.showToast("Please enter a valid email address.", "default");
                    return;
                }
                if (resetSentMsg) {
                    resetSentMsg.textContent = `A reset link for your password & passcode PIN has been sent to ${email}. Please check your inbox.`;
                }
                if (resetLinkSentBanner) {
                    resetLinkSentBanner.style.display = "block";
                }
                this.showToast(`🔐 Reset link sent to ${email}! ✨`, "default");
            });
        }

        // Log In Details Page & Form Handler
        const loginDetailsForm = document.getElementById("login-details-form");
        const detailsNameInput = document.getElementById("details-name-input");
        const detailsEmailInput = document.getElementById("details-email-input");
        const detailsPasswordInput = document.getElementById("details-password-input");
        const detailsPasscodeInput = document.getElementById("details-passcode-input");
        const toggleDetailsPasswordBtn = document.getElementById("toggle-details-password-btn");
        const toggleDetailsPasscodeBtn = document.getElementById("toggle-details-passcode-btn");

        const settingsLoginNameVal = document.getElementById("settings-login-name-val");
        const settingsLoginEmailVal = document.getElementById("settings-login-email-val");
        const settingsLoginPasswordVal = document.getElementById("settings-login-password-val");
        const settingsTogglePasswordBtn = document.getElementById("settings-toggle-password-btn");

        // Toggle Password Visibility in Details Page
        if (toggleDetailsPasswordBtn && detailsPasswordInput) {
            toggleDetailsPasswordBtn.addEventListener("click", () => {
                const isPassword = detailsPasswordInput.type === "password";
                detailsPasswordInput.type = isPassword ? "text" : "password";
                toggleDetailsPasswordBtn.textContent = isPassword ? "🙈 Hide" : "👁️ Show";
            });
        }

        // Toggle Passcode Visibility in Details Page
        if (toggleDetailsPasscodeBtn && detailsPasscodeInput) {
            toggleDetailsPasscodeBtn.addEventListener("click", () => {
                const isPassword = detailsPasscodeInput.type === "password";
                detailsPasscodeInput.type = isPassword ? "text" : "password";
                toggleDetailsPasscodeBtn.textContent = isPassword ? "🙈 Hide" : "👁️ Show";
            });
        }

        // Toggle Password Visibility in Settings Card
        if (settingsTogglePasswordBtn && settingsLoginPasswordVal) {
            settingsTogglePasswordBtn.addEventListener("click", () => {
                const isPassword = settingsLoginPasswordVal.type === "password";
                settingsLoginPasswordVal.type = isPassword ? "text" : "password";
                settingsTogglePasswordBtn.textContent = isPassword ? "🙈 Hide Password" : "👁️ Show Password";
            });
        }

        // Handle Save Log In Details Form Submission
        if (loginDetailsForm) {
            loginDetailsForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const name = detailsNameInput ? detailsNameInput.value.trim() : "";
                const email = detailsEmailInput ? detailsEmailInput.value.trim() : "";
                const password = detailsPasswordInput ? detailsPasswordInput.value : "";
                const passcode = detailsPasscodeInput ? detailsPasscodeInput.value.trim() : "";

                if (name) {
                    state.userProfile.name = name;
                    state.userProfile.firstName = name;
                }
                if (email) {
                    state.userProfile.email = email;
                }
                if (password) {
                    state.userProfile.password = password;
                }
                if (passcode) {
                    state.userProfile.passcode = passcode;
                }

                this.updateOwnProfileDOM();
                this.syncSettingsFormWithState();
                Storage.save();

                this.showToast("🔐 Log In Details & Passcode PIN updated successfully! ✨", "default");
            });
        }

        // Profile Image Upload Listener (Onboarding Setup)
        const profileUploadZone = document.getElementById("profile-upload-zone");
        const profileImageInput = document.getElementById("profile-image-input");
        const profileImagePlaceholder = document.getElementById("profile-image-placeholder");
        const profileImagePreviewWrap = document.getElementById("profile-image-preview-wrap");
        const profileImagePreview = document.getElementById("profile-image-preview");
        let userUploadedAvatar = null;

        if (profileUploadZone && profileImageInput) {
            profileUploadZone.addEventListener("click", () => {
                profileImageInput.click();
            });

            profileImageInput.addEventListener("change", (e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                    if (!file.type.startsWith("image/")) {
                        this.showToast("Please upload a valid image file (PNG/JPG/WEBP)", "default");
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        userUploadedAvatar = event.target.result;
                        state.userProfile.avatar = userUploadedAvatar;
                        if (!state.userProfile.photos || !Array.isArray(state.userProfile.photos)) {
                            state.userProfile.photos = [userUploadedAvatar];
                        } else {
                            state.userProfile.photos[0] = userUploadedAvatar;
                        }
                        if (profileImagePreview) {
                            profileImagePreview.src = userUploadedAvatar;
                        }
                        if (profileImagePlaceholder) {
                            profileImagePlaceholder.style.display = "none";
                        }
                        if (profileImagePreviewWrap) {
                            profileImagePreviewWrap.style.display = "flex";
                        }
                        this.showToast("Profile image uploaded successfully! ✨", "default");
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Onboarding form completion / Profile setup -> Advances to Licence Verification
        if (DOM.profileSetupForm) {
            DOM.profileSetupForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const firstNameEl = document.getElementById("user-first-name");
                const surnameEl = document.getElementById("user-surname");
                const firstName = firstNameEl ? firstNameEl.value.trim() : (document.getElementById("user-name") ? document.getElementById("user-name").value.trim() : "");
                const surname = surnameEl ? surnameEl.value.trim() : "";

                const createPassEl = document.getElementById("create-password");
                const emailEl = document.getElementById("user-email");
                const password = createPassEl ? createPassEl.value : "";
                const email = emailEl ? emailEl.value.trim() : "";

                const age = parseInt(document.getElementById("user-age").value);
                const gender = document.getElementById("user-gender").value;
                const rootsEl = document.getElementById("user-roots");
                const roots = rootsEl ? rootsEl.value : "🇲🇰 Macedonian";
                const bio = document.getElementById("user-bio").value.trim();
                
                const avatar = userUploadedAvatar || state.userProfile.avatar;
                
                state.userProfile.firstName = firstName;
                state.userProfile.surname = surname;
                state.userProfile.name = (firstName + (surname ? " " + surname : "")).trim();
                state.userProfile.email = email;
                state.userProfile.age = age;
                state.userProfile.gender = gender;
                state.userProfile.orthodoxRoots = roots;
                state.userProfile.bio = bio;
                state.userProfile.avatar = avatar;
                if (password) {
                    state.userProfile.password = password;
                }
                
                state.userProfile.isLicenseVerified = true;
                localStorage.setItem("buba_logged_in", "true");
                localStorage.setItem("buba_has_setup", "true");
                Storage.save();
                
                this.updateOwnProfileDOM();
                
                // If no matches exist yet, populate sample matches for immediate discovery
                if (state.matches.length === 0 && CANDIDATE_PROFILES.length >= 3) {
                    state.matches = [
                        {
                            id: CANDIDATE_PROFILES[0].id,
                            name: CANDIDATE_PROFILES[0].name,
                            avatar: CANDIDATE_PROFILES[0].photos[0],
                            timestamp: "Just now"
                        },
                        {
                            id: CANDIDATE_PROFILES[2].id,
                            name: CANDIDATE_PROFILES[2].name,
                            avatar: CANDIDATE_PROFILES[2].photos[0],
                            timestamp: "Today"
                        },
                        {
                            id: CANDIDATE_PROFILES[6].id,
                            name: CANDIDATE_PROFILES[6].name,
                            avatar: CANDIDATE_PROFILES[6].photos[0],
                            timestamp: "Yesterday"
                        }
                    ];
                }

                // Open main app workspace & match pages
                DOM.app.classList.remove("onboarding-active");
                DOM.onboardingScreen.classList.remove("active");
                DOM.mainApp.classList.add("active");
                if (DOM.deckPanel) DOM.deckPanel.classList.add("active");
                if (DOM.sidebarPanel) DOM.sidebarPanel.classList.add("active");
                if (DOM.settingsView) DOM.settingsView.classList.remove("active");
                
                this.generateDeck();
                this.renderSidebarMatches();
                this.renderSidebarConversations();
                
                this.showToast("Profile setup complete! Welcome to O-Buba Matches ✨", "default");
            });
        }

        if (DOM.settingsReuploadLicenseBtn) {
            DOM.settingsReuploadLicenseBtn.addEventListener("click", () => {
                DOM.app.classList.add("onboarding-active");
                DOM.onboardingScreen.classList.add("active");
                DOM.mainApp.classList.remove("active");
                if (DOM.settingsView) DOM.settingsView.classList.remove("active");
                document.querySelectorAll(".onboarding-card").forEach(c => c.classList.remove("active"));
                if (DOM.stepLicenseVerify) {
                    DOM.stepLicenseVerify.classList.add("active");
                }
            });
        }

        // Tab selection (Matches vs Messages)
        document.querySelectorAll(".tab-link").forEach(tab => {
            tab.addEventListener("click", () => {
                document.querySelectorAll(".tab-link").forEach(t => t.classList.remove("active"));
                document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
                
                tab.classList.add("active");
                const paneId = tab.getAttribute("data-tab");
                document.getElementById(paneId).classList.add("active");
            });
        });

        // Country preferences chip click delegation
        const countriesContainer = document.getElementById("pref-countries-container");
        if (countriesContainer) {
            countriesContainer.addEventListener("click", (e) => {
                const chip = e.target.closest(".country-chip");
                if (!chip) return;
                
                const input = chip.querySelector('input[name="pref-country"]');
                if (!input) return;
                
                const val = input.value;
                const allChips = countriesContainer.querySelectorAll(".country-chip");
                
                if (val === "all") {
                    allChips.forEach(c => {
                        const inp = c.querySelector('input');
                        if (inp.value === "all") {
                            inp.checked = true;
                            c.classList.add("active");
                        } else {
                            inp.checked = false;
                            c.classList.remove("active");
                        }
                    });
                } else {
                    input.checked = !input.checked;
                    if (input.checked) {
                        chip.classList.add("active");
                    } else {
                        chip.classList.remove("active");
                    }
                    
                    const allChip = countriesContainer.querySelector('.country-chip input[value="all"]');
                    if (allChip) {
                        allChip.checked = false;
                        allChip.parentElement.classList.remove("active");
                    }
                    
                    const anyChecked = countriesContainer.querySelectorAll('input[name="pref-country"]:checked').length > 0;
                    if (!anyChecked && allChip) {
                        allChip.checked = true;
                        allChip.parentElement.classList.add("active");
                    }
                }
            });
        }

        // Sync country selectors (Top-left deck widget)
        const handleCountryChange = (val) => {
            state.userProfile.prefCountries = [val];
            if (DOM.deckCountrySelect) DOM.deckCountrySelect.value = val;
            if (DOM.matchesCountrySelect) DOM.matchesCountrySelect.value = val;
            
            // Sync settings chips if open
            const countryChips = document.querySelectorAll('#pref-countries-container .country-chip');
            countryChips.forEach(chip => {
                const inp = chip.querySelector('input[name="pref-country"]');
                if (inp) {
                    const isChecked = (inp.value === val);
                    inp.checked = isChecked;
                    chip.classList.toggle("active", isChecked);
                }
            });

            Storage.save();
            this.generateDeck();
            this.renderSidebarMatches();
            
            const selectedText = val === "all" ? "All Countries" : val;
            this.showToast(`Matching set to ${selectedText} 🌍`, "default");
        };

        if (DOM.deckCountrySelect) {
            DOM.deckCountrySelect.addEventListener("change", (e) => {
                handleCountryChange(e.target.value);
            });
        }

        if (DOM.matchesCountrySelect) {
            DOM.matchesCountrySelect.addEventListener("change", (e) => {
                handleCountryChange(e.target.value);
            });
        }

        // Settings Sliders Feedback
        DOM.prefDistance.addEventListener("input", (e) => {
            DOM.distValue.textContent = `${e.target.value} kilometres`;
        });
        DOM.prefMaxAge.addEventListener("input", (e) => {
            DOM.ageValue.textContent = `18 - ${e.target.value}`;
        });

        // Open/Close Settings
        DOM.openSettingsBtn.addEventListener("click", () => {
            this.syncSettingsFormWithState();
            DOM.settingsView.classList.add("active");
        });
        DOM.openProfileBtn.addEventListener("click", () => {
            this.syncSettingsFormWithState();
            DOM.settingsView.classList.add("active");
        });
        DOM.closeSettingsBtn.addEventListener("click", () => DOM.settingsView.classList.remove("active"));
        DOM.saveSettingsBtn.addEventListener("click", () => this.saveSettings());

        // Toggle avatar modal open/close
        DOM.btnChangeAvatar.addEventListener("click", () => {
            this.populateSettingsAvatarGrid();
            DOM.settingsAvatarModal.classList.toggle("active");
        });

        // Tab switching
        document.querySelectorAll(".avatar-shape-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const shape = btn.getAttribute("data-shape");
                this.updateAvatarShape(shape);
            });
        });

        document.querySelectorAll(".avatar-tab").forEach(tab => {
            tab.addEventListener("click", () => {
                document.querySelectorAll(".avatar-tab").forEach(t => t.classList.remove("active"));
                document.querySelectorAll(".avatar-tab-panel").forEach(p => p.classList.remove("active"));
                tab.classList.add("active");
                document.getElementById(`avatar-panel-${tab.dataset.tab}`).classList.add("active");
            });
        });

        // ── FILE UPLOAD (device) ──────────────────────────────────────
        const fileInput     = document.getElementById("avatar-file-input");
        const dropZone      = document.getElementById("upload-drop-zone");
        const uploadPreview = document.getElementById("upload-preview-row");
        const uploadImg     = document.getElementById("upload-preview-img");
        const pickFileBtn   = document.getElementById("btn-pick-file");

        const showUploadPreview = (file) => {
            if (!file || !file.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadImg.src = e.target.result;
                dropZone.style.display    = "none";
                uploadPreview.style.display = "flex";
            };
            reader.readAsDataURL(file);
        };

        // "Choose File" button → open native file picker
        pickFileBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            fileInput.click();
        });

        // Clicking anywhere else on the drop zone also opens picker
        dropZone.addEventListener("click", () => fileInput.click());

        // File selected via picker
        fileInput.addEventListener("change", () => {
            if (fileInput.files && fileInput.files[0]) {
                showUploadPreview(fileInput.files[0]);
            }
        });

        // Drag & drop
        dropZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZone.classList.add("drag-over");
        });
        dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropZone.classList.remove("drag-over");
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                showUploadPreview(e.dataTransfer.files[0]);
            }
        });

        // ── Shared helper: apply chosen avatar everywhere immediately ──
        const applyAvatar = (src) => {
            if (!src) return;
            state.userProfile.avatar = src;
            const slotIndex = state.activePhotoSlotIndex || 0;
            if (!state.userProfile.photos || !Array.isArray(state.userProfile.photos)) {
                state.userProfile.photos = [...DEFAULT_USER_PHOTOS];
            }
            state.userProfile.photos[slotIndex] = src;

            // Update every avatar element in the UI
            DOM.settingsAvatarPreview.src = src;
            DOM.headerUserAvatar.src      = src;
            DOM.deckPulseAvatar.src       = src;
            
            this.renderProfilePhotosGrid();
            // Persist (skip if data URL is too large for localStorage)
            try { Storage.save(); } catch(e) { console.warn("Avatar too large for localStorage", e); }
            DOM.settingsAvatarModal.classList.remove("active");
            this.showToast(`Photo #${slotIndex + 1} updated! ✨`, "default");
        };

        // Use uploaded photo
        document.getElementById("btn-use-upload").addEventListener("click", () => {
            applyAvatar(uploadImg.src);
        });

        // Re-pick
        document.getElementById("btn-reupload").addEventListener("click", () => {
            uploadPreview.style.display = "none";
            dropZone.style.display = "flex";
            fileInput.value = "";
        });

        // ── PRESET GRID ───────────────────────────────────────────────
        DOM.btnSaveAvatarSelect.addEventListener("click", () => {
            const selected = DOM.settingsAvatarGrid.querySelector(".avatar-option.active");
            if (selected) applyAvatar(selected.getAttribute("data-img"));
        });

        // ── URL ───────────────────────────────────────────────────────
        const urlInput      = document.getElementById("settings-custom-avatar-url");
        const urlPreviewRow = document.getElementById("url-preview-row");
        const urlPreviewImg = document.getElementById("url-preview-img");

        urlInput.addEventListener("input", () => {
            const val = urlInput.value.trim();
            if (val) {
                urlPreviewImg.src = val;
                urlPreviewRow.style.display = "flex";
            } else {
                urlPreviewRow.style.display = "none";
            }
        });

        document.getElementById("btn-save-url-avatar").addEventListener("click", () => {
            applyAvatar(urlInput.value.trim());
        });

        // Close details drawer
        DOM.closeDetailsBackdrop.addEventListener("click", () => DOM.profileDetailsView.classList.remove("active"));
        DOM.closeDetailsHandle.addEventListener("click", () => DOM.profileDetailsView.classList.remove("active"));
        if (DOM.closeDetailsBackBtn) DOM.closeDetailsBackBtn.addEventListener("click", () => DOM.profileDetailsView.classList.remove("active"));
        if (DOM.closeAvatarModalBtn) DOM.closeAvatarModalBtn.addEventListener("click", () => DOM.settingsAvatarModal.classList.remove("active"));

        // Match & Payment Modal interactions
        if (DOM.matchBackBtn) DOM.matchBackBtn.addEventListener("click", () => DOM.matchModal.classList.remove("active"));

        const closePaymentModalFunc = () => {
            if (DOM.paymentModal) {
                DOM.paymentModal.style.opacity = "0";
                const cardContent = DOM.paymentModal.querySelector(".payment-card-content");
                if (cardContent) cardContent.style.transform = "scale(0.95)";
                setTimeout(() => {
                    DOM.paymentModal.style.display = "none";
                }, 300);
            }
        };

        DOM.btnMatchClose.addEventListener("click", () => {
            DOM.matchModal.classList.remove("active");
        });

        const closeMatchPictureBtn = document.getElementById("btn-close-match-modal-picture");
        if (closeMatchPictureBtn) {
            closeMatchPictureBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (DOM.matchModal) DOM.matchModal.classList.remove("active");
            });
        }

        DOM.btnMatchSend.addEventListener("click", () => {
            if (state.activeMatchCandidate) {
                this.selectPaymentMethod(state.userProfile.savedPaymentMethod || "applepay");
                if (DOM.paymentMatchName) {
                    DOM.paymentMatchName.textContent = state.activeMatchCandidate.name;
                }
                if (DOM.paymentModal) {
                    DOM.paymentModal.style.display = "flex";
                    setTimeout(() => {
                        DOM.paymentModal.style.opacity = "1";
                        const cardContent = DOM.paymentModal.querySelector(".payment-card-content");
                        if (cardContent) cardContent.style.transform = "scale(1)";
                    }, 10);
                }
            }
        });

        if (DOM.paymentOptions) {
            DOM.paymentOptions.forEach(opt => {
                opt.addEventListener("click", () => {
                    const method = opt.getAttribute("data-method");
                    this.selectPaymentMethod(method);
                });
            });
        }

        if (DOM.closePaymentBtn) {
            DOM.closePaymentBtn.addEventListener("click", closePaymentModalFunc);
        }

        const handleCurrencyChange = (e) => {
            const newCurr = e.target.value;
            if (CURRENCIES[newCurr]) {
                state.selectedCurrency = newCurr;
                this.updateCurrencyDisplays();
                Storage.save();
            }
        };

        if (DOM.currencySelect) {
            DOM.currencySelect.addEventListener("change", handleCurrencyChange);
        }
        if (DOM.paymentCurrencySelect) {
            DOM.paymentCurrencySelect.addEventListener("change", handleCurrencyChange);
        }

        if (DOM.confirmPayBtn) {
            DOM.confirmPayBtn.addEventListener("click", () => {
                let methodLabel = "Credit Card (Visa/Mastercard)";
                if (state.selectedPaymentMethod === "applepay") methodLabel = "Apple Pay";
                else if (state.selectedPaymentMethod === "googlepay") methodLabel = "Google Pay";
                else if (state.selectedPaymentMethod === "bank") methodLabel = "Bank Transfer";

                if (state.selectedPaymentMethod === "card") {
                    const termsChecked = DOM.cardTermsCheck ? DOM.cardTermsCheck.checked : false;
                    if (!termsChecked) {
                        this.showToast("Please accept the Terms & Conditions and payment authorization for Visa / Mastercard.", "default");
                        return;
                    }
                }

                if (state.selectedPaymentMethod === "bank") {
                    const fullName = DOM.bankFullName ? DOM.bankFullName.value.trim() : "";
                    const bsb = DOM.bankBsb ? DOM.bankBsb.value.trim() : "";
                    const accNum = DOM.bankAccountNumber ? DOM.bankAccountNumber.value.trim() : "";
                    const termsChecked = DOM.bankTermsCheck ? DOM.bankTermsCheck.checked : false;

                    if (!fullName || !bsb || !accNum) {
                        this.showToast("Please enter your Full Name, BSB, and Account Number for Bank Transfer.", "default");
                        return;
                    }
                    if (!termsChecked) {
                        this.showToast("Please accept the Terms & Conditions and Direct Debit authorization.", "default");
                        return;
                    }
                }

                if (state.activePaymentType === "plan" && state.selectedPlanToPay) {
                    const planName = state.selectedPlanToPay;
                    const label = state.selectedPlanLabelToPay || "BUBA Plan";
                    
                    state.userSubscription = planName;
                    Storage.save();
                    
                    closePaymentModalFunc();
                    state.activePaymentType = null;
                    state.selectedPlanToPay = null;
                    
                    this.showToast(`${label} Active! Payment via ${methodLabel} successful 💳✨`, "default");
                    return;
                }

                // Default Match Connection Payment flow
                const text = DOM.matchQuickMessage ? DOM.matchQuickMessage.value.trim() : "";
                if (state.activeMatchCandidate) {
                    const candidateId = state.activeMatchCandidate.id;
                    const messageToSend = text || "Hey! It's a match! Excited to connect with you 😊";
                    this.addMessage(candidateId, "me", messageToSend);
                    
                    closePaymentModalFunc();
                    DOM.matchModal.classList.remove("active");
                    if (DOM.matchQuickMessage) DOM.matchQuickMessage.value = "";
                    
                    this.openChat(candidateId);
                    
                    const feeText = getFormattedFee(state.selectedCurrency || "AUD");
                    this.showToast(`Match Fee (${feeText}) Paid via ${methodLabel}! Connection Unlocked 💳✨`, "default");
                    
                    // Trigger auto reply
                    this.triggerSimulatedReply(candidateId);
                }
            });
        }

        // Buba Subscription Plans Modal interactions
        const resetPlanCardsState = () => {
            if (DOM.plansModal) {
                DOM.plansModal.querySelectorAll(".plan-card").forEach(card => {
                    card.style.opacity = "1";
                    card.style.filter = "none";
                    card.style.pointerEvents = "auto";
                    const btn = card.querySelector(".plan-select-btn");
                    if (btn) {
                        btn.disabled = false;
                        btn.style.opacity = "1";
                        btn.style.cursor = "pointer";
                        const plan = btn.getAttribute("data-plan");
                        if (plan === "free") btn.textContent = "Current Plan";
                        else if (plan === "silver") btn.textContent = "Select Silver";
                        else if (plan === "bronze") btn.textContent = "Select Bronze";
                        else if (plan === "gold") btn.textContent = "Select Gold 👑";
                    }
                });
            }
        };

        const openPlansFunc = () => {
            if (DOM.plansModal) {
                resetPlanCardsState();
                DOM.plansModal.style.display = "flex";
                setTimeout(() => {
                    DOM.plansModal.style.opacity = "1";
                    const content = DOM.plansModal.querySelector(".plans-modal-content");
                    if (content) content.style.transform = "scale(1)";
                }, 10);
            }
        };

        const closePlansFunc = () => {
            if (DOM.plansModal) {
                DOM.plansModal.style.opacity = "0";
                const content = DOM.plansModal.querySelector(".plans-modal-content");
                if (content) content.style.transform = "scale(0.95)";
                setTimeout(() => {
                    DOM.plansModal.style.display = "none";
                    resetPlanCardsState();
                }, 300);
            }
        };

        if (DOM.openPlansBtn) DOM.openPlansBtn.addEventListener("click", openPlansFunc);
        if (DOM.closePlansBtn) DOM.closePlansBtn.addEventListener("click", closePlansFunc);
        if (DOM.settingsPlansBtn) DOM.settingsPlansBtn.addEventListener("click", openPlansFunc);

        if (DOM.planSelectBtns) {
            DOM.planSelectBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    const planName = btn.getAttribute("data-plan");
                    let label = "BUBA Free";
                    let priceText = "Free";

                    if (planName === "silver") {
                        label = "BUBA Silver";
                        priceText = "$0.99 / weekly";
                    } else if (planName === "bronze") {
                        label = "BUBA Bronze";
                        priceText = "$5.99 / monthly";
                    } else if (planName === "gold") {
                        label = "BUBA Gold";
                        priceText = "$11.99 / monthly";
                    }

                    if (planName === "free") {
                        state.userSubscription = "free";
                        Storage.save();
                        closePlansFunc();
                        this.showToast("Plan set to BUBA Free ✨", "default");
                    } else {
                        closePlansFunc();
                        setTimeout(() => {
                            this.openPaymentForPlan(planName, label, priceText);
                        }, 300);
                    }
                });
            });
        }

        // Who's Available Top Right Widget Toggle
        const widgetToggleBtn = document.getElementById("widget-toggle-btn");
        if (widgetToggleBtn && DOM.onlineMatchesWidget) {
            widgetToggleBtn.addEventListener("click", () => {
                DOM.onlineMatchesWidget.classList.toggle("collapsed");
            });
        }

        // Deck controls (Buttons with Subscription Gating)
        DOM.btnNope.addEventListener("click", () => this.handleNopeClick());
        DOM.btnLike.addEventListener("click", () => this.handleLikeClick());
        DOM.btnSuperlike.addEventListener("click", () => this.handleSuperlikeClick());
        DOM.btnRewind.addEventListener("click", () => this.handleRewindClick());
        DOM.btnBoost.addEventListener("click", () => this.handleBoostClick());

        // Navigation for Mobile
        document.querySelectorAll(".bottom-nav .nav-item").forEach(item => {
            item.addEventListener("click", () => {
                const viewId = item.getAttribute("data-view");
                document.querySelectorAll(".bottom-nav .nav-item").forEach(n => n.classList.remove("active"));
                item.classList.add("active");

                // Toggle views on mobile
                if (viewId === "deck-panel") {
                    DOM.deckPanel.classList.add("active");
                    DOM.sidebarPanel.classList.remove("active");
                    DOM.settingsView.classList.remove("active");
                } else if (viewId === "sidebar-panel") {
                    DOM.deckPanel.classList.remove("active");
                    DOM.sidebarPanel.classList.add("active");
                    DOM.settingsView.classList.remove("active");
                } else if (viewId === "settings-view") {
                    this.syncSettingsFormWithState();
                    DOM.deckPanel.classList.remove("active");
                    DOM.sidebarPanel.classList.remove("active");
                    DOM.settingsView.classList.add("active");
                }
            });
        });
    },

    // 6. PROFILE CONFIGURATION LOGIC
    updateOwnProfileDOM() {
        DOM.headerUserAvatar.src = state.userProfile.avatar;
        DOM.headerUserName.textContent = state.userProfile.name;
        DOM.deckPulseAvatar.src = state.userProfile.avatar;
        DOM.settingsAvatarPreview.src = state.userProfile.avatar;

        if (state.userProfile.isLicenseVerified) {
            if (DOM.headerVerifiedBadge) DOM.headerVerifiedBadge.style.display = "inline-block";
            if (DOM.settingsVerifiedPill) {
                DOM.settingsVerifiedPill.style.display = "inline-block";
                DOM.settingsVerifiedPill.textContent = "✓ 100% Verified";
            }
            if (DOM.settingsVerificationTitle) DOM.settingsVerificationTitle.textContent = "Driver's Licence Identity Verified";
            if (DOM.settingsVerificationDesc) DOM.settingsVerificationDesc.textContent = "Your official driver's licence has been uploaded and scanned. Anti-fraud 100% identity verification active.";
            if (DOM.settingsReuploadLicenseBtn) DOM.settingsReuploadLicenseBtn.textContent = "Re-upload Driver Licence";
        } else {
            if (DOM.headerVerifiedBadge) DOM.headerVerifiedBadge.style.display = "none";
            if (DOM.settingsVerifiedPill) {
                DOM.settingsVerifiedPill.style.display = "inline-block";
                DOM.settingsVerifiedPill.style.background = "rgba(255, 179, 0, 0.15)";
                DOM.settingsVerifiedPill.style.color = "#ffb300";
                DOM.settingsVerifiedPill.style.borderColor = "rgba(255, 179, 0, 0.3)";
                DOM.settingsVerifiedPill.textContent = "Pending Verification";
            }
            if (DOM.settingsVerificationTitle) DOM.settingsVerificationTitle.textContent = "Driver's Licence Required";
            if (DOM.settingsVerificationDesc) DOM.settingsVerificationDesc.textContent = "Please upload your driver's licence to 100% clarify identity fraud and unlock full member features.";
            if (DOM.settingsReuploadLicenseBtn) DOM.settingsReuploadLicenseBtn.textContent = "Verify Driver Licence";
        }
    },

    initOnboardingAvatarSelector() {
        const opts = document.querySelectorAll(".avatar-selector .avatar-option");
        opts.forEach(opt => {
            opt.addEventListener("click", () => {
                opts.forEach(o => o.classList.remove("active"));
                opt.classList.add("active");
            });
        });
    },

    populateSettingsAvatarGrid() {
        DOM.settingsAvatarGrid.innerHTML = "";
        CANDIDATE_PROFILES.forEach(profile => {
            const avatarUrl = profile.photos[0];
            const div = document.createElement("div");
            div.className = "avatar-option";
            div.setAttribute("data-img", avatarUrl);
            div.innerHTML = `<img src="${avatarUrl}" alt="Avatar option">`;
            div.addEventListener("click", () => {
                DOM.settingsAvatarGrid.querySelectorAll(".avatar-option").forEach(o => o.classList.remove("active"));
                div.classList.add("active");
            });
            DOM.settingsAvatarGrid.appendChild(div);
        });
    },

    updateAvatarShape(shapeName) {
        let shape = shapeName || (state.userProfile && state.userProfile.avatarShape) || "square";
        if (shape !== "square" && shape !== "round") {
            shape = "square";
        }
        state.userProfile.avatarShape = shape;

        const targets = [
            DOM.headerAvatarBox,
            DOM.headerUserAvatar,
            DOM.settingsAvatarPreview,
            DOM.deckPulseAvatar
        ];

        targets.forEach(el => {
            if (el) {
                el.classList.remove("shape-square", "shape-round", "shape-star");
                el.classList.add(`shape-${shape}`);
            }
        });

        const shapeBtns = document.querySelectorAll(".avatar-shape-btn");
        if (shapeBtns.length > 0) {
            shapeBtns.forEach(btn => {
                const s = btn.getAttribute("data-shape");
                if (s === shape) {
                    btn.classList.add("active");
                    btn.style.background = "rgba(255, 51, 187, 0.18)";
                    btn.style.border = "2px solid #ff33bb";
                } else {
                    btn.classList.remove("active");
                    btn.style.background = "rgba(255, 255, 255, 0.05)";
                    btn.style.border = "1.5px solid rgba(255, 255, 255, 0.2)";
                }
            });
        }

        Storage.save();
    },

    renderProfilePhotosGrid() {
        if (!DOM.profilePhotosGrid) return;
        DOM.profilePhotosGrid.innerHTML = "";

        const photos = state.userProfile.photos || DEFAULT_USER_PHOTOS;
        const currentAvatar = state.userProfile.avatar;

        if (DOM.photosCountBadge) {
            DOM.photosCountBadge.textContent = `${photos.length} / 5 Photos`;
        }

        photos.forEach((photoUrl, index) => {
            const card = document.createElement("div");
            const isPrimary = photoUrl === currentAvatar || (index === 0 && !currentAvatar);
            
            card.className = `photo-slot-card ${isPrimary ? "active-primary" : ""}`;
            card.setAttribute("data-index", index);
            card.style.position = "relative";
            card.title = isPrimary ? "Active Main Profile Avatar" : `Tap to set Photo #${index + 1} as Main Profile Avatar`;

            card.innerHTML = `
                <img src="${photoUrl}" alt="Photo ${index + 1}">
                <div class="photo-slot-badge">${isPrimary ? "✓ Primary" : `Photo ${index + 1}`}</div>
                <button type="button" class="photo-slot-change-btn" style="position: absolute; bottom: 6px; right: 6px; background: rgba(0, 0, 0, 0.75); color: #fff; border: 1px solid rgba(255, 255, 255, 0.4); border-radius: 12px; font-size: 10px; font-weight: 700; padding: 4px 8px; cursor: pointer; backdrop-filter: blur(4px); z-index: 5;">📷 Change</button>
            `;

            const changeBtn = card.querySelector(".photo-slot-change-btn");
            if (changeBtn) {
                changeBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    state.activePhotoSlotIndex = index;
                    if (DOM.settingsAvatarModal) {
                        DOM.settingsAvatarModal.classList.add("active");
                        document.querySelectorAll(".avatar-tab").forEach(t => t.classList.remove("active"));
                        document.querySelectorAll(".avatar-tab-panel").forEach(p => p.classList.remove("active"));
                        const uploadTab = document.querySelector('.avatar-tab[data-tab="upload"]');
                        const uploadPanel = document.getElementById("avatar-panel-upload");
                        if (uploadTab) uploadTab.classList.add("active");
                        if (uploadPanel) uploadPanel.classList.add("active");
                    }
                });
            }

            card.addEventListener("click", () => {
                state.activePhotoSlotIndex = index;
                state.userProfile.avatar = photoUrl;
                
                if (DOM.settingsAvatarPreview) DOM.settingsAvatarPreview.src = photoUrl;
                if (DOM.headerUserAvatar) DOM.headerUserAvatar.src = photoUrl;
                if (DOM.deckPulseAvatar) DOM.deckPulseAvatar.src = photoUrl;
                
                Storage.save();
                this.renderProfilePhotosGrid();
                this.showToast(`Selected Photo #${index + 1} as main avatar ✨`, "default");
            });

            DOM.profilePhotosGrid.appendChild(card);
        });
    },

    syncSettingsFormWithState() {
        this.updateAvatarShape(state.userProfile.avatarShape || "square");
        this.renderProfilePhotosGrid();
        
        const currentName = state.userProfile.firstName || state.userProfile.name || "";
        const currentEmail = state.userProfile.email || "";
        const currentPassword = state.userProfile.password || "";
        const currentPasscode = state.userProfile.passcode || "1234";

        if (DOM.settingsFirstNameVal) {
            DOM.settingsFirstNameVal.value = currentName;
        }
        if (DOM.settingsSurnameVal) {
            DOM.settingsSurnameVal.value = state.userProfile.surname || "";
        }
        if (DOM.settingsEmailVal) {
            DOM.settingsEmailVal.value = currentEmail;
        }

        // Sync Log In Details Page & Settings Card inputs
        const detailsNameInput = document.getElementById("details-name-input");
        const detailsEmailInput = document.getElementById("details-email-input");
        const detailsPasswordInput = document.getElementById("details-password-input");
        const detailsPasscodeInput = document.getElementById("details-passcode-input");
        const settingsLoginNameVal = document.getElementById("settings-login-name-val");
        const settingsLoginEmailVal = document.getElementById("settings-login-email-val");
        const settingsLoginPasswordVal = document.getElementById("settings-login-password-val");

        if (detailsNameInput) detailsNameInput.value = currentName;
        if (detailsEmailInput) detailsEmailInput.value = currentEmail;
        if (detailsPasswordInput) detailsPasswordInput.value = currentPassword;
        if (detailsPasscodeInput) detailsPasscodeInput.value = currentPasscode;

        if (settingsLoginNameVal) settingsLoginNameVal.value = currentName;
        if (settingsLoginEmailVal) settingsLoginEmailVal.value = currentEmail;
        if (settingsLoginPasswordVal) settingsLoginPasswordVal.value = currentPassword;

        DOM.settingsAgeVal.value = state.userProfile.age;
        DOM.settingsBioVal.value = state.userProfile.bio;
        DOM.settingsGenderVal.value = state.userProfile.gender;
        if (DOM.settingsRootsVal) {
            DOM.settingsRootsVal.value = state.userProfile.orthodoxRoots || "🇲🇰 Macedonian";
        }
        
        DOM.prefDistance.value = state.userProfile.prefDistance;
        DOM.distValue.textContent = `${state.userProfile.prefDistance} kilometres`;
        
        DOM.prefMaxAge.value = state.userProfile.prefMaxAge;
        DOM.ageValue.textContent = `18 - ${state.userProfile.prefMaxAge}`;
        
        // Gender preference radio button selection
        const radio = document.querySelector(`input[name="pref-gender"][value="${state.userProfile.prefGender}"]`);
        if (radio) radio.checked = true;

        // Country preferences sync
        const selectedCountries = state.userProfile.prefCountries || ["all"];
        const primaryCountry = selectedCountries[0] || "all";
        if (DOM.deckCountrySelect) DOM.deckCountrySelect.value = primaryCountry;
        if (DOM.matchesCountrySelect) DOM.matchesCountrySelect.value = primaryCountry;

        const countryChips = document.querySelectorAll('#pref-countries-container .country-chip');
        countryChips.forEach(chip => {
            const input = chip.querySelector('input[name="pref-country"]');
            if (input) {
                const isChecked = selectedCountries.includes(input.value);
                input.checked = isChecked;
                if (isChecked) {
                    chip.classList.add('active');
                } else {
                    chip.classList.remove('active');
                }
            }
        });

        if (DOM.settingsSavedPaymentSelect) {
            const savedMethod = state.userProfile.savedPaymentMethod || "applepay";
            DOM.settingsSavedPaymentSelect.value = savedMethod;
            const labels = {
                applepay: "Apple Pay (Primary)",
                card: "Credit / Debit Card",
                googlepay: "Google Pay",
                bank: "Bank Transfer"
            };
            const pills = {
                applepay: " Pay Active",
                card: "💳 Card Active",
                googlepay: "G Pay Active",
                bank: "🏦 Bank Active"
            };
            if (DOM.savedPaymentMethodName) {
                DOM.savedPaymentMethodName.textContent = labels[savedMethod] || "Apple Pay (Primary)";
            }
            if (DOM.settingsPaymentPill) {
                DOM.settingsPaymentPill.textContent = pills[savedMethod] || " Pay Active";
            }
        }
    },

    saveSettings() {
        const firstName = DOM.settingsFirstNameVal ? DOM.settingsFirstNameVal.value.trim() : "";
        const surname = DOM.settingsSurnameVal ? DOM.settingsSurnameVal.value.trim() : "";
        const email = DOM.settingsEmailVal ? DOM.settingsEmailVal.value.trim() : "";
        state.userProfile.firstName = firstName;
        state.userProfile.surname = surname;
        state.userProfile.name = (firstName + (surname ? " " + surname : "")).trim();
        state.userProfile.email = email;
        state.userProfile.age = parseInt(DOM.settingsAgeVal.value);
        state.userProfile.bio = DOM.settingsBioVal.value.trim();
        state.userProfile.gender = DOM.settingsGenderVal.value;
        if (DOM.settingsRootsVal) {
            state.userProfile.orthodoxRoots = DOM.settingsRootsVal.value;
        }
        state.userProfile.avatar = DOM.settingsAvatarPreview.src;
        
        state.userProfile.prefDistance = parseInt(DOM.prefDistance.value);
        state.userProfile.prefMaxAge = parseInt(DOM.prefMaxAge.value);
        
        const selectedPrefGender = document.querySelector('input[name="pref-gender"]:checked').value;
        state.userProfile.prefGender = selectedPrefGender;

        // Extract selected country preferences
        const checkedCountryInputs = document.querySelectorAll('input[name="pref-country"]:checked');
        const selectedCountriesList = Array.from(checkedCountryInputs).map(inp => inp.value);
        state.userProfile.prefCountries = selectedCountriesList.length > 0 ? selectedCountriesList : ["all"];

        if (DOM.settingsSavedPaymentSelect) {
            const savedMethod = DOM.settingsSavedPaymentSelect.value;
            state.userProfile.savedPaymentMethod = savedMethod;
            const labels = {
                applepay: "Apple Pay (Primary)",
                card: "Credit / Debit Card",
                googlepay: "Google Pay",
                bank: "Bank Transfer"
            };
            const pills = {
                applepay: " Pay Active",
                card: "💳 Card Active",
                googlepay: "G Pay Active",
                bank: "🏦 Bank Active"
            };
            if (DOM.savedPaymentMethodName) {
                DOM.savedPaymentMethodName.textContent = labels[savedMethod] || "Apple Pay (Primary)";
            }
            if (DOM.settingsPaymentPill) {
                DOM.settingsPaymentPill.textContent = pills[savedMethod] || " Pay Active";
            }
        }
        
        Storage.save();
        this.updateOwnProfileDOM();
        DOM.settingsView.classList.remove("active");
        
        // Re-generate deck based on updated filters
        this.generateDeck();
        this.showToast("Preferences saved!", "default");
    },

    // 7. CARD DECK BUILDER & GESTURES
    generateDeck() {
        DOM.cardStackDeck.innerHTML = "";
        
        // Show pulse loader behind cards
        const loader = document.createElement("div");
        loader.className = "deck-loader";
        loader.innerHTML = `
            <div class="pulse-ring"></div>
            <img src="${state.userProfile.avatar}" class="loader-avatar" alt="Avatar">
            <span class="loading-text">${state.boostActive ? "Boost mode active! Sparks flying..." : "Finding matches nearby..."}</span>
        `;
        DOM.cardStackDeck.appendChild(loader);

        // Filter profiles
        const prefGender = state.userProfile.prefGender;
        const maxAge = state.userProfile.prefMaxAge;
        
        let filtered = CANDIDATE_PROFILES.filter(candidate => {
            // Check gender preference
            if (prefGender !== "everyone") {
                const targetGender = prefGender === "women" ? "woman" : "man";
                if (candidate.gender !== targetGender) return false;
            }
            
            // Check age preference
            if (candidate.age > maxAge) return false;

            // Check country preference
            const selectedCountries = state.userProfile.prefCountries || ["all"];
            if (!selectedCountries.includes("all") && selectedCountries.length > 0) {
                if (!candidate.country || !selectedCountries.includes(candidate.country)) return false;
            }
            
            // Check if already swiped (unless it was rewinded)
            if (state.swipes[candidate.id]) return false;
            
            return true;
        });

        // Always show candidates to match with: if all were swiped or filtered out, refresh pool
        if (filtered.length === 0) {
            state.swipes = {};
            filtered = [...CANDIDATE_PROFILES];
        }

        // Randomize order for a dynamic feel
        state.deck = filtered.sort(() => Math.random() - 0.5);

        // Append card elements
        if (state.deck.length > 0) {
            state.deck.forEach((candidate, index) => {
                // Generate a card DOM node
                const card = this.createCardElement(candidate, index === state.deck.length - 1);
                // Insert top cards
                DOM.cardStackDeck.appendChild(card);
            });
            this.initSwipeGesturePhysics();
        } else {
            // Deck is empty - render empty text
            const textNode = document.createElement("span");
            textNode.className = "loading-text";
            textNode.style.zIndex = "1";
            textNode.style.marginTop = "130px";
            textNode.textContent = "There's no one new in your area.";
            DOM.cardStackDeck.appendChild(textNode);
        }
    },

    createCardElement(profile, isTopCard) {
        const card = document.createElement("div");
        card.className = "dating-card";
        card.setAttribute("data-id", profile.id);
        card.style.zIndex = isTopCard ? "3" : "2";
        
        // Stack scaling
        if (!isTopCard) {
            card.style.transform = "scale(0.95) translate3d(0, 10px, 0)";
            card.style.opacity = "0.9";
        }

        // Segment tracker bars for multiple photos
        let trackerBarsHtml = "";
        profile.photos.forEach((_, idx) => {
            trackerBarsHtml += `<div class="img-tracker-bar ${idx === 0 ? "active" : ""}" data-idx="${idx}"></div>`;
        });

        // Passions tags HTML
        let tagsHtml = "";
        profile.passions.slice(0, 3).forEach(tag => {
            tagsHtml += `<span class="card-tag-badge">${tag}</span>`;
        });

        card.innerHTML = `
            <!-- Touch Nav overlay for photo tapping -->
            <div class="card-touch-nav touch-left"></div>
            <div class="card-touch-nav touch-right"></div>
            
            <!-- Segment photo indicators -->
            <div class="card-image-trackers">
                ${trackerBarsHtml}
            </div>
            
            <!-- Stamps indicators -->
            <div class="swipe-stamp like">LIKE</div>
            <div class="swipe-stamp nope">NOPE</div>
            <div class="swipe-stamp superlike">SUPER</div>

            <!-- Media Container -->
            <div class="card-media">
                <img src="${profile.photos[0]}" class="card-img" alt="${profile.name}" data-current-photo="0">
            </div>
            
            <div class="card-overlay"></div>
            
            <!-- Profile Info overlay -->
            <div class="card-info">
                <div class="card-title">
                    <h2>${profile.name}</h2>
                    <span class="age">${profile.age}</span>
                </div>
                <div class="card-subtitle-meta">
                    <span class="card-meta-item">
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        <span>${profile.location ? profile.location + (profile.countryFlag ? ' ' + profile.countryFlag : '') : profile.distance}</span>
                    </span>
                </div>
                <p class="card-bio-teaser">${profile.bio}</p>
                <div class="card-tags">
                    ${tagsHtml}
                </div>
            </div>
            
            <button class="info-trigger-btn" title="View details">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="17" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </button>
        `;

        // Attach tapping listeners on left/right half for photo carousel cycle
        const leftNav = card.querySelector(".touch-left");
        const rightNav = card.querySelector(".touch-right");
        const imgNode = card.querySelector(".card-img");
        const trackers = card.querySelectorAll(".img-tracker-bar");

        const cyclePhoto = (dir) => {
            let idx = parseInt(imgNode.getAttribute("data-current-photo"));
            if (dir === "next") {
                idx = (idx + 1) % profile.photos.length;
            } else {
                idx = (idx - 1 + profile.photos.length) % profile.photos.length;
            }
            imgNode.setAttribute("data-current-photo", idx);
            imgNode.src = profile.photos[idx];
            
            trackers.forEach((t, i) => {
                if (i === idx) t.classList.add("active");
                else t.classList.remove("active");
            });
        };

        leftNav.addEventListener("click", (e) => {
            e.stopPropagation();
            cyclePhoto("prev");
        });

        rightNav.addEventListener("click", (e) => {
            e.stopPropagation();
            cyclePhoto("next");
        });

        // Info details icon trigger
        const infoBtn = card.querySelector(".info-trigger-btn");
        infoBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.openProfileDetails(profile);
        });

        return card;
    },

    // 8. SWIPE PHYSICS & TOUCH INTERACTIVE CONTROLLER
    initSwipeGesturePhysics() {
        const topCard = DOM.cardStackDeck.querySelector(".dating-card:last-child");
        if (!topCard || topCard.classList.contains("deck-loader")) return;

        const nextCard = topCard.previousElementSibling;
        
        let startX = 0, startY = 0;
        let currentX = 0, currentY = 0;
        let deltaX = 0, deltaY = 0;
        let isDragging = false;

        // Reset transforms
        topCard.style.transform = "";

        const handleStart = (clientX, clientY) => {
            isDragging = true;
            startX = clientX;
            startY = clientY;
            topCard.classList.remove("transition-back");
            topCard.style.cursor = "grabbing";
        };

        const handleMove = (clientX, clientY) => {
            if (!isDragging) return;
            currentX = clientX;
            currentY = clientY;
            deltaX = currentX - startX;
            deltaY = currentY - startY;

            // Drag rotations math: tilt card as it goes left/right
            const rotation = deltaX * 0.08; 
            topCard.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotate(${rotation}deg)`;

            // Dynamically scale card behind based on drag distance
            if (nextCard && !nextCard.classList.contains("deck-loader")) {
                const distance = Math.min(Math.abs(deltaX), 150);
                const scale = 0.95 + (distance / 150) * 0.05;
                const translateY = 10 - (distance / 150) * 10;
                nextCard.style.transform = `scale(${scale}) translate3d(0, ${translateY}px, 0)`;
                nextCard.style.opacity = 0.9 + (distance / 150) * 0.1;
            }

            // Stamps opacity control
            const likeStamp = topCard.querySelector(".swipe-stamp.like");
            const nopeStamp = topCard.querySelector(".swipe-stamp.nope");
            const superStamp = topCard.querySelector(".swipe-stamp.superlike");

            if (deltaX > 20) {
                likeStamp.style.opacity = Math.min(deltaX / 100, 1);
                nopeStamp.style.opacity = 0;
                superStamp.style.opacity = 0;
            } else if (deltaX < -20) {
                nopeStamp.style.opacity = Math.min(Math.abs(deltaX) / 100, 1);
                likeStamp.style.opacity = 0;
                superStamp.style.opacity = 0;
            } else if (deltaY < -20 && Math.abs(deltaY) > Math.abs(deltaX)) {
                superStamp.style.opacity = Math.min(Math.abs(deltaY) / 100, 1);
                likeStamp.style.opacity = 0;
                nopeStamp.style.opacity = 0;
            } else {
                likeStamp.style.opacity = 0;
                nopeStamp.style.opacity = 0;
                superStamp.style.opacity = 0;
            }
        };

        const handleEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            topCard.style.cursor = "";

            const swipeThreshold = 130;
            const superSwipeThreshold = 100;

            const likeStamp = topCard.querySelector(".swipe-stamp.like");
            const nopeStamp = topCard.querySelector(".swipe-stamp.nope");
            const superStamp = topCard.querySelector(".swipe-stamp.superlike");

            // Evaluate if swipe triggers an action or snaps back
            if (deltaX > swipeThreshold) {
                if (state.userSubscription === "free") {
                    topCard.classList.add("transition-back");
                    topCard.style.transform = "";
                    likeStamp.style.opacity = 0;
                    this.openPlansModal("Liking profiles to match requires BUBA Silver (5 likes/day), Bronze, or Gold! Upgrade to unlock.");
                } else if (state.userSubscription === "silver") {
                    const today = new Date().toDateString();
                    if (state.lastLikeResetDate !== today) {
                        state.likeCountToday = 0;
                        state.lastLikeResetDate = today;
                        Storage.save();
                    }
                    if (state.likeCountToday >= 5) {
                        topCard.classList.add("transition-back");
                        topCard.style.transform = "";
                        likeStamp.style.opacity = 0;
                        this.openPlansModal("Daily like limit reached (5/day for Silver users)! Upgrade to BUBA Bronze for unlimited likes.");
                    } else {
                        state.likeCountToday++;
                        Storage.save();
                        this.executeSwipe(topCard, "right");
                    }
                } else {
                    this.executeSwipe(topCard, "right");
                }
            } else if (deltaX < -swipeThreshold) {
                const today = new Date().toDateString();
                if (state.lastPassResetDate !== today) {
                    state.passCountToday = 0;
                    state.lastPassResetDate = today;
                    Storage.save();
                }
                if (state.userSubscription === "free" && state.passCountToday >= 10) {
                    topCard.classList.add("transition-back");
                    topCard.style.transform = "";
                    nopeStamp.style.opacity = 0;
                    this.openPlansModal("Daily pass limit reached (10/day for Free users)! Upgrade to BUBA Silver for unlimited passes.");
                } else {
                    if (state.userSubscription === "free") {
                        state.passCountToday++;
                        Storage.save();
                    }
                    this.executeSwipe(topCard, "left");
                }
            } else if (deltaY < -superSwipeThreshold && Math.abs(deltaY) > Math.abs(deltaX)) {
                if (state.userSubscription === "free") {
                    topCard.classList.add("transition-back");
                    topCard.style.transform = "";
                    superStamp.style.opacity = 0;
                    this.openPlansModal("Super Like requires BUBA Silver, Bronze, or Gold! Upgrade to unlock.");
                } else {
                    this.executeSwipe(topCard, "up");
                }
            } else {
                // Snap back
                topCard.classList.add("transition-back");
                topCard.style.transform = "";
                
                likeStamp.style.opacity = 0;
                nopeStamp.style.opacity = 0;
                superStamp.style.opacity = 0;

                if (nextCard && !nextCard.classList.contains("deck-loader")) {
                    nextCard.classList.add("transition-back");
                    nextCard.style.transform = "scale(0.95) translate3d(0, 10px, 0)";
                    nextCard.style.opacity = "0.9";
                    setTimeout(() => nextCard.classList.remove("transition-back"), 400);
                }
            }
            
            deltaX = 0;
            deltaY = 0;
        };

        // Touch event registrations
        topCard.addEventListener("touchstart", (e) => {
            const touch = e.touches[0];
            handleStart(touch.clientX, touch.clientY);
        }, { passive: true });

        topCard.addEventListener("touchmove", (e) => {
            const touch = e.touches[0];
            handleMove(touch.clientX, touch.clientY);
        }, { passive: true });

        topCard.addEventListener("touchend", () => {
            handleEnd();
        });

        // Mouse event registrations
        topCard.addEventListener("mousedown", (e) => {
            handleStart(e.clientX, e.clientY);
            
            const onMouseMove = (ev) => handleMove(ev.clientX, ev.clientY);
            const onMouseUp = () => {
                handleEnd();
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);
            };
            
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    },

    swipeTopCard(direction) {
        const topCard = DOM.cardStackDeck.querySelector(".dating-card:last-child");
        if (!topCard || topCard.classList.contains("deck-loader")) return;
        
        topCard.classList.add("transition-out");
        
        const likeStamp = topCard.querySelector(".swipe-stamp.like");
        const nopeStamp = topCard.querySelector(".swipe-stamp.nope");
        const superStamp = topCard.querySelector(".swipe-stamp.superlike");

        // Force stamp visibility
        if (direction === "right") {
            likeStamp.style.opacity = 1;
            topCard.style.transform = "translate3d(350px, 0px, 0) rotate(15deg)";
        } else if (direction === "left") {
            nopeStamp.style.opacity = 1;
            topCard.style.transform = "translate3d(-350px, 0px, 0) rotate(-15deg)";
        } else if (direction === "up") {
            superStamp.style.opacity = 1;
            topCard.style.transform = "translate3d(0px, -450px, 0) rotate(5deg)";
        }
        
        const nextCard = topCard.previousElementSibling;
        if (nextCard && !nextCard.classList.contains("deck-loader")) {
            nextCard.classList.add("transition-back");
            nextCard.style.transform = "scale(1) translate3d(0, 0px, 0)";
            nextCard.style.opacity = "1";
            setTimeout(() => nextCard.classList.remove("transition-back"), 400);
        }

        setTimeout(() => {
            this.executeSwipe(topCard, direction, true);
        }, 300);
    },

    executeSwipe(cardNode, direction, alreadyTranslated = false) {
        const id = cardNode.getAttribute("data-id");
        
        if (!alreadyTranslated) {
            cardNode.classList.add("transition-out");
            if (direction === "right") {
                cardNode.style.transform = "translate3d(400px, 0px, 0) rotate(20deg)";
            } else if (direction === "left") {
                cardNode.style.transform = "translate3d(-400px, 0px, 0) rotate(-20deg)";
            } else if (direction === "up") {
                cardNode.style.transform = "translate3d(0px, -500px, 0) rotate(10deg)";
            }
            cardNode.style.opacity = "0";
        }

        // Record Swipe
        state.swipes[id] = direction;
        state.historyStack.push({ id, direction });
        
        // Remove card node after transition
        setTimeout(() => {
            cardNode.remove();
            
            // Pop from memory stack
            const poppedCandidateIndex = state.deck.findIndex(p => p.id === id);
            if (poppedCandidateIndex !== -1) {
                state.deck.splice(poppedCandidateIndex, 1);
            }

            // Verify matches
            if (direction === "right" || direction === "up") {
                this.checkMatchTrigger(id, direction);
            }
            
            Storage.save();
            this.initSwipeGesturePhysics();
        }, 200);
    },

    rewindLastSwipe() {
        if (state.historyStack.length === 0) {
            this.showToast("No swipes to rewind!", "default");
            return;
        }

        const lastAction = state.historyStack.pop();
        delete state.swipes[lastAction.id];
        Storage.save();

        const candidate = CANDIDATE_PROFILES.find(p => p.id === lastAction.id);
        if (!candidate) return;

        // Push candidate back into active deck
        state.deck.push(candidate);

        // Prepend card back to stack DOM
        const topCard = DOM.cardStackDeck.querySelector(".dating-card:last-child");
        if (topCard && !topCard.classList.contains("deck-loader")) {
            topCard.style.transform = "scale(0.95) translate3d(0, 10px, 0)";
            topCard.style.opacity = "0.9";
            topCard.style.zIndex = "2";
        }

        const card = this.createCardElement(candidate, true);
        
        // Preset offscreen coordinate for fly-in rewind effect
        if (lastAction.direction === "right") {
            card.style.transform = "translate3d(400px, 0px, 0) rotate(20deg)";
        } else if (lastAction.direction === "left") {
            card.style.transform = "translate3d(-400px, 0px, 0) rotate(-20deg)";
        } else if (lastAction.direction === "up") {
            card.style.transform = "translate3d(0px, -500px, 0) rotate(10deg)";
        }
        
        DOM.cardStackDeck.appendChild(card);
        
        // Slide in animation
        setTimeout(() => {
            card.classList.add("transition-back");
            card.style.transform = "";
            card.style.opacity = "1";
            
            this.showToast("Swipe Rewinded ↩️", "rewind");
            
            setTimeout(() => {
                card.classList.remove("transition-back");
                this.initSwipeGesturePhysics();
            }, 400);
        }, 50);
    },

    selectPaymentMethod(methodName) {
        const method = methodName || (state.userProfile && state.userProfile.savedPaymentMethod) || "applepay";
        state.selectedPaymentMethod = method;

        if (DOM.paymentOptions) {
            DOM.paymentOptions.forEach(opt => {
                const m = opt.getAttribute("data-method");
                if (m === method) {
                    opt.classList.add("active");
                    opt.style.border = "2px solid #ff33bb";
                    opt.style.background = "rgba(255, 51, 187, 0.18)";
                } else {
                    opt.classList.remove("active");
                    opt.style.border = "1.5px solid rgba(255, 255, 255, 0.2)";
                    opt.style.background = "rgba(255, 255, 255, 0.05)";
                }
            });
        }
        if (DOM.cardDetailsForm) {
            DOM.cardDetailsForm.style.display = method === "card" ? "flex" : "none";
        }
        if (DOM.bankDetailsForm) {
            DOM.bankDetailsForm.style.display = method === "bank" ? "flex" : "none";
        }
    },

    openPaymentForPlan(planName, label, priceText) {
        this.selectPaymentMethod(state.userProfile.savedPaymentMethod || "applepay");
        state.activePaymentType = "plan";
        state.selectedPlanToPay = planName;
        state.selectedPlanLabelToPay = label;

        if (DOM.paymentMatchName) {
            DOM.paymentMatchName.textContent = label;
        }
        if (DOM.paymentFeeAmount) {
            DOM.paymentFeeAmount.textContent = priceText;
        }
        if (DOM.confirmPayAmount) {
            DOM.confirmPayAmount.textContent = priceText;
        }

        if (DOM.paymentModal) {
            DOM.paymentModal.style.display = "flex";
            setTimeout(() => {
                DOM.paymentModal.style.opacity = "1";
                const cardContent = DOM.paymentModal.querySelector(".payment-card-content");
                if (cardContent) cardContent.style.transform = "scale(1)";
            }, 10);
        }
    },

    openPlansModal(message, targetPlan = null) {
        if (message) {
            this.showToast(message, "default");
        }
        if (DOM.plansModal) {
            DOM.plansModal.querySelectorAll(".plan-card").forEach(card => {
                const btn = card.querySelector(".plan-select-btn");
                if (btn) {
                    const plan = btn.getAttribute("data-plan");
                    if (targetPlan && plan !== targetPlan) {
                        card.style.opacity = "0.45";
                        card.style.filter = "grayscale(0.8)";
                        card.style.pointerEvents = "none";
                        btn.disabled = true;
                        btn.textContent = "Unavailable";
                        btn.style.opacity = "0.5";
                        btn.style.cursor = "not-allowed";
                    } else {
                        card.style.opacity = "1";
                        card.style.filter = "none";
                        card.style.pointerEvents = "auto";
                        btn.disabled = false;
                        btn.style.opacity = "1";
                        btn.style.cursor = "pointer";
                        if (plan === "free") btn.textContent = "Current Plan";
                        else if (plan === "silver") btn.textContent = "Select Silver";
                        else if (plan === "bronze") btn.textContent = "Select Bronze";
                        else if (plan === "gold") btn.textContent = "Select Gold 👑";
                    }
                }
            });

            DOM.plansModal.style.display = "flex";
            setTimeout(() => {
                DOM.plansModal.style.opacity = "1";
                const content = DOM.plansModal.querySelector(".plans-modal-content");
                if (content) content.style.transform = "scale(1)";
            }, 10);
        }
    },

    handleNopeClick() {
        const today = new Date().toDateString();
        if (state.lastPassResetDate !== today) {
            state.passCountToday = 0;
            state.lastPassResetDate = today;
            Storage.save();
        }

        if (state.userSubscription === "free" && state.passCountToday >= 10) {
            this.openPlansModal("Daily pass limit reached (10/day for Free users)! Upgrade to BUBA Silver for unlimited passes.");
            return;
        }

        if (state.userSubscription === "free") {
            state.passCountToday++;
            Storage.save();
        }

        this.swipeTopCard("left");
    },

    handleLikeClick() {
        this.openPlansModal("Choose a BUBA Plan to unlock Likes and matching features! ❤️");
    },

    handleSuperlikeClick() {
        this.openPlansModal("Choose a BUBA Plan to unlock Super Likes! ⭐");
    },

    handleRewindClick() {
        if (state.userSubscription === "free") {
            this.openPlansModal("Rewind requires BUBA Silver (5 rewinds/day) or higher! Upgrade to unlock.");
            return;
        }

        if (state.userSubscription === "silver") {
            const today = new Date().toDateString();
            if (state.lastRewindResetDate !== today) {
                state.rewindCountToday = 0;
                state.lastRewindResetDate = today;
                Storage.save();
            }

            if (state.rewindCountToday >= 5) {
                this.openPlansModal("Daily rewind limit reached (5/day for Silver users)! Upgrade to BUBA Bronze for unlimited rewinds.");
                return;
            }

            state.rewindCountToday++;
            Storage.save();
        }

        this.rewindLastSwipe();
    },

    handleBoostClick() {
        if (state.userSubscription !== "gold") {
            this.openPlansModal("Profile Boost requires BUBA Gold! Upgrade to unlock 1-week 3x visibility boost.", "gold");
            return;
        }
        this.activateBoost();
    },

    activateBoost() {
        if (state.boostActive) return;
        
        state.boostActive = true;
        this.showToast("⚡️ 1-Week Profile Boost Activated! Your profile is 3x more visible nearby!", "boost");
        DOM.btnBoost.classList.add("boost-active");
        DOM.btnBoost.style.backgroundColor = "rgba(168, 85, 247, 0.2)";
        DOM.btnBoost.style.borderColor = "var(--color-boost)";
        
        // Visual effects in the background
        DOM.deckPanel.classList.add("boost-flash");
        
        // Regenerate deck loader description
        const pulseText = DOM.cardStackDeck.querySelector(".loading-text");
        if (pulseText) pulseText.textContent = "Boost mode active! Sparks flying...";

        // Set boost duration (e.g. 30 seconds for demonstration)
        let seconds = 30;
        state.boostTimer = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(state.boostTimer);
                state.boostActive = false;
                DOM.btnBoost.classList.remove("boost-active");
                DOM.btnBoost.style.backgroundColor = "";
                DOM.btnBoost.style.borderColor = "";
                DOM.deckPanel.classList.remove("boost-flash");
                this.showToast("Boost completed.", "default");
            }
        }, 1000);
    },

    // 9. MATCHMAKING ENGINE
    checkMatchTrigger(candidateId, swipeType) {
        const candidate = CANDIDATE_PROFILES.find(p => p.id === candidateId);
        if (!candidate) return;

        // Boost modifier
        let chance = candidate.matchChance;
        if (state.boostActive) {
            chance = Math.min(chance * 2.5, 0.95);
        }
        
        // Superlikes increase chance
        if (swipeType === "up") {
            chance = Math.min(chance * 1.5, 0.98);
        }

        // Match decision
        const isMatched = Math.random() < chance;
        
        if (isMatched) {
            // Trigger match after card completes fly-out
            setTimeout(() => {
                this.triggerMatch(candidate);
            }, 300);
        }
    },

    triggerMatch(candidate) {
        // Prevent duplicate matches
        if (state.matches.some(m => m.id === candidate.id)) return;
        
        // Record Match
        const matchData = {
            id: candidate.id,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            name: candidate.name,
            avatar: candidate.photos[0]
        };
        state.matches.unshift(matchData);
        
        // Seed default chat empty array
        if (!state.chats[candidate.id]) {
            state.chats[candidate.id] = [];
        }
        
        Storage.save();
        
        // Update sidebar lists
        this.renderSidebarMatches();
        this.renderSidebarConversations();
        
        // Launch Match Screen Modal
        state.activeMatchCandidate = candidate;
        DOM.matchUserImg.src = state.userProfile.avatar;
        DOM.matchCandidateImg.src = candidate.photos[0];
        DOM.matchSubtitleText.textContent = `You and ${candidate.name} liked each other.`;
        
        DOM.matchModal.classList.add("active");
    },

    renderSidebarMatches() {
        DOM.matchesContainer.innerHTML = "";
        
        const matchesCountrySelect = document.getElementById("matches-country-select");
        const selectedCountryFilter = matchesCountrySelect ? matchesCountrySelect.value : "all";
        
        if (state.matches.length === 0) {
            DOM.matchesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">✨</div>
                    <p>Swipe right to find your mutual sparks here!</p>
                </div>
            `;
            this.renderOnlineMatchesList();
            return;
        }

        const filteredMatches = state.matches.filter(match => {
            const hasChat = state.chats[match.id] && state.chats[match.id].length > 0;
            if (hasChat) return false;
            if (selectedCountryFilter !== "all") {
                const candidate = CANDIDATE_PROFILES.find(p => p.id === match.id);
                if (!candidate || candidate.country !== selectedCountryFilter) return false;
            }
            return true;
        });

        filteredMatches.forEach(match => {
            const candidate = CANDIDATE_PROFILES.find(p => p.id === match.id);
            const countryFlag = candidate && candidate.countryFlag ? candidate.countryFlag : '';

            const card = document.createElement("div");
            card.className = "match-card-item";
            card.setAttribute("data-id", match.id);
            card.innerHTML = `
                <img src="${match.avatar}" alt="${match.name}">
                <button type="button" class="match-remove-btn" title="Remove match">✕</button>
                <div class="match-card-overlay">
                    <span class="match-card-name">${countryFlag ? countryFlag + ' ' : ''}${match.name}</span>
                </div>
            `;

            const removeBtn = card.querySelector(".match-remove-btn");
            if (removeBtn) {
                removeBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    state.matches = state.matches.filter(m => m.id !== match.id);
                    delete state.chats[match.id];
                    if (state.activeChatId === match.id) {
                        state.activeChatId = null;
                        DOM.chatPanel.classList.remove("active");
                    }
                    Storage.save();
                    this.renderSidebarMatches();
                    this.renderSidebarConversations();
                    this.renderOnlineMatchesList();
                    this.showToast(`Match with ${match.name} removed`, "default");
                });
            }

            const imgEl = card.querySelector("img");
            if (imgEl && candidate) {
                imgEl.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.openProfileDetails(candidate);
                });
            }

            card.addEventListener("click", () => {
                this.openChat(match.id);
            });
            DOM.matchesContainer.appendChild(card);
        });

        if (DOM.matchesContainer.children.length === 0 && state.matches.length > 0) {
            DOM.matchesContainer.innerHTML = `
                <div class="empty-state">
                    <p>All sparks have conversations started! check Messages tab.</p>
                </div>
            `;
        }

        this.renderOnlineMatchesList();
    },

    renderOnlineMatchesList() {
        if (!DOM.onlineListContainer) return;
        DOM.onlineListContainer.innerHTML = "";

        // Only show profiles that are currently listed on the Matches tab list
        const activeMatchesOnList = state.matches.filter(m => {
            const hasChat = state.chats[m.id] && state.chats[m.id].length > 0;
            return !hasChat;
        });

        const availableProfiles = activeMatchesOnList.map(m => {
            const candidate = CANDIDATE_PROFILES.find(p => p.id === m.id);
            return {
                id: m.id,
                name: m.name,
                age: candidate ? candidate.age : 24,
                distance: candidate ? candidate.distance : "5 kilometres away",
                avatar: m.avatar,
                candidateObj: candidate
            };
        });
        
        if (DOM.onlineCountBadge) {
            DOM.onlineCountBadge.textContent = availableProfiles.length;
        }

        if (availableProfiles.length === 0) {
            DOM.onlineListContainer.innerHTML = `
                <div style="font-size: 11px; opacity: 0.7; padding: 6px; text-align: center;">No matches on your list right now. Swipe right to match!</div>
            `;
            return;
        }

        availableProfiles.forEach(profile => {
            const card = document.createElement("div");
            card.className = "online-user-card";
            card.setAttribute("data-id", profile.id);
            card.innerHTML = `
                <div class="online-avatar-wrap" style="position: relative;">
                    <img src="${profile.avatar}" alt="${profile.name}">
                    <span class="status-dot-online"></span>
                    <button type="button" class="online-remove-btn" title="Remove ${profile.name}">✕</button>
                </div>
                <div class="online-user-info">
                    <div class="online-user-name">${profile.name}, ${profile.age}</div>
                    <div class="online-user-meta">🟢 Available now • ${profile.distance}</div>
                </div>
                <button type="button" class="btn-mini-chat" title="Chat with ${profile.name}">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </button>
            `;

            const removeBtn = card.querySelector(".online-remove-btn");
            if (removeBtn) {
                removeBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    state.matches = state.matches.filter(m => m.id !== profile.id);
                    delete state.chats[profile.id];
                    if (state.activeChatId === profile.id) {
                        state.activeChatId = null;
                        DOM.chatPanel.classList.remove("active");
                    }
                    Storage.save();
                    this.renderSidebarMatches();
                    this.renderSidebarConversations();
                    this.renderOnlineMatchesList();
                    this.showToast(`Match with ${profile.name} removed`, "default");
                });
            }

            // Click avatar picture directly opens full profile details
            const avatarImg = card.querySelector(".online-avatar-wrap img");
            if (avatarImg && profile.candidateObj) {
                avatarImg.addEventListener("click", (e) => {
                    e.stopPropagation();
                    this.openProfileDetails(profile.candidateObj);
                });
            }

            // Clicking card connects to Matches tab & highlights picture card
            card.addEventListener("click", () => {
                // Switch to Matches tab
                const matchesTabBtn = document.querySelector('.tab-link[data-tab="tab-matches"]');
                if (matchesTabBtn) matchesTabBtn.click();
                
                // Highlight corresponding picture in Matches grid
                if (DOM.matchesContainer) {
                    const targetCard = DOM.matchesContainer.querySelector(`.match-card-item[data-id="${profile.id}"]`);
                    if (targetCard) {
                        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        targetCard.classList.add("match-card-highlight");
                        setTimeout(() => targetCard.classList.remove("match-card-highlight"), 2800);
                    }
                }

                this.openChat(profile.id);
            });

            DOM.onlineListContainer.appendChild(card);
        });
    },

    // 10. SIMULATED CHAT ENGINE
    renderSidebarConversations() {
        DOM.conversationsContainer.innerHTML = "";
        
        // Filter matches that have messages
        const conversationMatches = state.matches.filter(m => state.chats[m.id] && state.chats[m.id].length > 0);
        
        if (conversationMatches.length === 0) {
            DOM.conversationsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">💬</div>
                    <p>Once you match, you can chat with them here.</p>
                </div>
            `;
            DOM.messageBadge.classList.remove("active");
            return;
        }

        let unreadCount = 0;

        conversationMatches.forEach(match => {
            const messages = state.chats[match.id];
            const lastMsg = messages[messages.length - 1];
            const isUnread = lastMsg.sender === "them" && lastMsg.unread;
            
            if (isUnread) unreadCount++;

            const div = document.createElement("div");
            div.className = `conversation-item ${isUnread ? "unread" : ""} ${state.activeChatId === match.id ? "active" : ""}`;
            div.innerHTML = `
                <img src="${match.avatar}" class="avatar" alt="${match.name}">
                <div class="convo-info">
                    <div class="convo-header">
                        <span class="convo-name">${match.name}</span>
                        <span class="convo-time">${lastMsg.time}</span>
                    </div>
                    <p class="convo-preview">${lastMsg.sender === "me" ? "You: " : ""}${lastMsg.text}</p>
                </div>
            `;
            div.addEventListener("click", () => {
                this.openChat(match.id);
            });
            DOM.conversationsContainer.appendChild(div);
        });

        if (unreadCount > 0) {
            DOM.messageBadge.textContent = unreadCount;
            DOM.messageBadge.classList.add("active");
        } else {
            DOM.messageBadge.classList.remove("active");
        }
    },

    openChat(candidateId) {
        state.activeChatId = candidateId;
        const candidate = CANDIDATE_PROFILES.find(p => p.id === candidateId) || state.matches.find(m => m.id === candidateId);
        if (!candidate) return;

        // Clear unreads
        if (state.chats[candidateId] && state.chats[candidateId].length > 0) {
            state.chats[candidateId].forEach(m => {
                if (m.sender === "them") m.unread = false;
            });
            Storage.save();
        }

        DOM.chatAvatar.src = candidate.photos ? candidate.photos[0] : candidate.avatar;
        DOM.chatName.textContent = candidate.name;
        
        DOM.chatPanel.classList.add("active");
        
        // Hide sidebar panel on mobile when chat is active
        if (window.innerWidth < 768) {
            DOM.sidebarPanel.classList.remove("active");
        }

        this.renderChatMessages();
        this.renderSidebarConversations();
    },

    renderChatMessages() {
        DOM.chatMessagesContainer.innerHTML = "";
        const messages = state.chats[state.activeChatId] || [];

        if (messages.length === 0) {
            // Seed a tip block or greeting prompt
            DOM.chatMessagesContainer.innerHTML = `
                <div class="empty-state" style="height: 100%;">
                    <p>Matched on ${state.matches.find(m => m.id === state.activeChatId).timestamp}</p>
                    <p style="font-size: 11px; margin-top: 8px;">Be bold! Break the ice with a nice question about their bio interests.</p>
                </div>
            `;
            return;
        }

        messages.forEach(msg => {
            const row = document.createElement("div");
            row.className = `chat-msg-row ${msg.sender === "me" ? "sent" : "received"}`;
            row.innerHTML = `
                <div class="chat-msg-bubble">
                    ${msg.text}
                    <div class="chat-msg-time">${msg.time}</div>
                </div>
            `;
            DOM.chatMessagesContainer.appendChild(row);
        });

        // Scroll to bottom
        DOM.chatMessagesContainer.scrollTop = DOM.chatMessagesContainer.scrollHeight;
    },

    addMessage(candidateId, sender, text) {
        if (!state.chats[candidateId]) state.chats[candidateId] = [];
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        state.chats[candidateId].push({
            sender,
            text,
            time: timestamp,
            unread: sender === "them"
        });

        Storage.save();

        if (state.activeChatId === candidateId) {
            this.renderChatMessages();
        }
        
        this.renderSidebarConversations();
        this.renderSidebarMatches();
    },

    triggerSimulatedReply(candidateId) {
        const candidate = CANDIDATE_PROFILES.find(p => p.id === candidateId);
        if (!candidate) return;

        // Calculate reply sequence based on existing conversation length
        const myMessagesCount = state.chats[candidateId].filter(m => m.sender === "me").length;
        const replyIndex = Math.min(myMessagesCount - 1, candidate.chatReplies.length - 1);
        
        const replyText = candidate.chatReplies[replyIndex];

        // Create simulated typing dots
        setTimeout(() => {
            if (state.activeChatId === candidateId) {
                const typingNode = document.createElement("div");
                typingNode.className = "chat-msg-row received typing-indicator-row";
                typingNode.id = "chat-typing-indicator";
                typingNode.innerHTML = `
                    <div class="chat-msg-bubble" style="padding: 10px 16px;">
                        <span class="typing-dots">
                            <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
                        </span>
                    </div>
                `;
                DOM.chatMessagesContainer.appendChild(typingNode);
                DOM.chatMessagesContainer.scrollTop = DOM.chatMessagesContainer.scrollHeight;
            }
        }, 600);

        // Send full response after a bit
        setTimeout(() => {
            // Remove typing dots
            const dots = document.getElementById("chat-typing-indicator");
            if (dots) dots.remove();

            // Deliver message
            this.addMessage(candidateId, "them", replyText);
            
            // Trigger visual ping notification if user is not looking at this chat
            if (state.activeChatId !== candidateId || document.hidden) {
                this.showToast(`New message from ${candidate.name} 💬`, "default");
            }
        }, 2200);
    },

    // 11. PROFILE DETAILS MODAL BUILDER
    openProfileDetails(profile) {
        state.detailsActivePhotoIdx = 0;
        state.detailsProfileObj = profile;

        DOM.detailsHeroImg.src = profile.photos[0];
        DOM.detailsName.textContent = profile.name;
        DOM.detailsAge.textContent = profile.age;
        DOM.detailsGender.textContent = profile.gender;
        DOM.detailsDistance.textContent = profile.distance;
        DOM.detailsBio.textContent = profile.bio;

        // Build Passions tags
        DOM.detailsPassions.innerHTML = "";
        profile.passions.forEach(tag => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = tag;
            DOM.detailsPassions.appendChild(span);
        });

        // Build spotify anthem block
        if (profile.song && profile.artist) {
            DOM.detailsSong.textContent = profile.song;
            DOM.detailsArtist.textContent = profile.artist;
            document.getElementById("details-spotify-block").style.display = "block";
        } else {
            document.getElementById("details-spotify-block").style.display = "none";
        }

        // Build slide dots
        DOM.detailsCarouselDots.innerHTML = "";
        profile.photos.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.className = `carousel-dot ${idx === 0 ? "active" : ""}`;
            DOM.detailsCarouselDots.appendChild(dot);
        });

        // Set carousel event listeners
        const cycleDetailsPhoto = (dir) => {
            let idx = state.detailsActivePhotoIdx;
            if (dir === "next") {
                idx = (idx + 1) % profile.photos.length;
            } else {
                idx = (idx - 1 + profile.photos.length) % profile.photos.length;
            }
            state.detailsActivePhotoIdx = idx;
            DOM.detailsHeroImg.src = profile.photos[idx];
            
            const dots = DOM.detailsCarouselDots.querySelectorAll(".carousel-dot");
            dots.forEach((d, i) => {
                if (i === idx) d.classList.add("active");
                else d.classList.remove("active");
            });
        };

        // Clear previous event listeners using clone node replacement
        const prevBtn = DOM.detailsPrevImg.cloneNode(true);
        const nextBtn = DOM.detailsNextImg.cloneNode(true);
        DOM.detailsPrevImg.parentNode.replaceChild(prevBtn, DOM.detailsPrevImg);
        DOM.detailsNextImg.parentNode.replaceChild(nextBtn, DOM.detailsNextImg);
        DOM.detailsPrevImg = prevBtn;
        DOM.detailsNextImg = nextBtn;

        DOM.detailsPrevImg.addEventListener("click", () => cycleDetailsPhoto("prev"));
        DOM.detailsNextImg.addEventListener("click", () => cycleDetailsPhoto("next"));

        DOM.profileDetailsView.classList.add("active");
    },

    populateCurrencySelectors() {
        if (typeof CURRENCIES === "undefined") return;
        const optionsHTML = Object.keys(CURRENCIES).map(key => {
            const c = CURRENCIES[key];
            return `<option value="${key}">${c.label}</option>`;
        }).join("");

        if (DOM.currencySelect) {
            DOM.currencySelect.innerHTML = optionsHTML;
            DOM.currencySelect.value = state.selectedCurrency || "AUD";
        }
        if (DOM.paymentCurrencySelect) {
            DOM.paymentCurrencySelect.innerHTML = optionsHTML;
            DOM.paymentCurrencySelect.value = state.selectedCurrency || "AUD";
        }
        this.updateCurrencyDisplays();
    },

    updateCurrencyDisplays() {
        const formatted = getFormattedFee(state.selectedCurrency || "AUD");
        if (DOM.matchFeeAmount) DOM.matchFeeAmount.textContent = formatted;
        if (DOM.matchSendAmount) DOM.matchSendAmount.textContent = formatted;
        if (DOM.paymentFeeAmount) DOM.paymentFeeAmount.textContent = formatted;
        if (DOM.confirmPayAmount) DOM.confirmPayAmount.textContent = formatted;
        if (DOM.currencySelect) DOM.currencySelect.value = state.selectedCurrency || "AUD";
        if (DOM.paymentCurrencySelect) DOM.paymentCurrencySelect.value = state.selectedCurrency || "AUD";
    },

    // 12. UTILITIES
    showToast(message, type) {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        
        let icon = "✨";
        if (type === "boost") icon = "⚡️";
        else if (type === "rewind") icon = "↩️";
        else if (type === "superlike") icon = "⭐";
        
        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        DOM.toastContainer.appendChild(toast);
        
        setTimeout(() => toast.classList.add("show"), 50);
        
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
};

// Start application
window.addEventListener("DOMContentLoaded", () => App.init());

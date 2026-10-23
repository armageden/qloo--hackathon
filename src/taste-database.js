// TourCraft Verified Cultural Taste Graph
// Reflects Qloo Taste Graph multi-domain entities across music, dining, fashion, nightlife, and brands.

export const ARTISTS_DATABASE = {
  "chappell-roan": {
    id: "urn:entity:music:chappell_roan",
    name: "Chappell Roan",
    slug: "chappell-roan",
    genres: ["Midwest Pop", "Synthpop", "Queer Glam", "Camp Pop"],
    vibe: "Theatrical, 80s camp glitter, Midwest melodrama, joyful unapologetic queer energy",
    demographics: {
      primaryAge: "18-29",
      genderSkew: "68% Female / Non-Binary",
      topSubcultures: ["Queer Pop", "Thrift / Archival Fashion", "Hyper-femme Camp", "Indie Sleaze Revival"],
      culturalOpenness: 0.94
    },
    affinities: {
      dining: [
        { name: "Natural Wine Bars & Pet-Nat", affinityScore: 96, category: "Beverage", rationale: "Extremely high correlation with natural/biodynamic beverage culture and community tasting rooms." },
        { name: "Retro All-Day Vegan Diners", affinityScore: 93, category: "Cuisine", rationale: "High affinity for vintage diner aesthetics paired with plant-forward, inclusive menus." },
        { name: "Artisanal Bakeries & Matcha Parlors", affinityScore: 89, category: "Café", rationale: "Strong morning/afternoon gathering rituals before show call times." },
        { name: "Campy Themed Cocktail Lounges", affinityScore: 94, category: "Nightlife/Dining", rationale: "Preference for playful, maximalist decor, theatrical presentation, and disco balls." }
      ],
      nightlife: [
        { name: "Inclusive Queer Dance Halls", affinityScore: 98, category: "Club", rationale: "Core cultural nexus; high preference for safe, vibrant, community-run spaces." },
        { name: "80s New Wave & Hyperpop Club Nights", affinityScore: 95, category: "Music Event", rationale: "Sonic affinity directly aligns with synth-heavy, high-tempo pop anthems." },
        { name: "Drag & Burlesque Cabaret Speakeasies", affinityScore: 92, category: "Performance Lounge", rationale: "Direct stylistic roots in drag performance, theatrical makeup, and camp storytelling." }
      ],
      fashion: [
        { name: "Archival Glitter & Western Glam", affinityScore: 97, category: "Aesthetic", rationale: "Signature rhinestone cowboy boots, tiaras, prom gowns, and bold color-blocking." },
        { name: "Vintage & Y2K Thrift Curations", affinityScore: 95, category: "Retail", rationale: "Strong anti-fast-fashion ethos; hyper-preference for vintage upcycling." },
        { name: "Playful Statement Accessories (Bows, Tiaras)", affinityScore: 91, category: "Accessories", rationale: "Fan uniform emphasizes collaborative DIY concert dressing." }
      ],
      brands: [
        { name: "Glossier", affinityScore: 94, category: "Beauty", activationIdea: "Glitter Bar & Concert Touch-Up Pop-up in Venue Concourse", pitch: "Direct alignment on expressive, playful beauty and self-love branding." },
        { name: "Baggu", affinityScore: 92, category: "Fashion/Accessories", activationIdea: "Exclusive Limited Tour Print Crescent Bag Drop", pitch: "Cult fanbase overlap; practical concert-ready merchandise." },
        { name: "Dr. Martens", affinityScore: 90, category: "Footwear", activationIdea: "Custom Western Boot Customization Station", pitch: "Unisex festival staple with shared rebellious, expressive heritage." },
        { name: "Polaroid", affinityScore: 88, category: "Tech/Lifestyle", activationIdea: "Fan Memories Instant Photo Wall & Guestbook", pitch: "Nostalgic analog aesthetic matches Chappell's scrapbook visual language." }
      ],
      filmTv: [
        { title: "But I'm a Cheerleader", affinityScore: 96 },
        { title: "Jennifer's Body", affinityScore: 93 },
        { title: "Bottoms", affinityScore: 95 },
        { title: "RuPaul's Drag Race", affinityScore: 91 }
      ]
    }
  },

  "kendrick-lamar": {
    id: "urn:entity:music:kendrick_lamar",
    name: "Kendrick Lamar",
    slug: "kendrick-lamar",
    genres: ["Conscious Hip-Hop", "West Coast Rap", "Jazz Rap", "Pulitzer Cultural"],
    vibe: "Intellectual, cinematic West Coast poetry, minimalist luxury, cultural authority",
    demographics: {
      primaryAge: "21-38",
      genderSkew: "56% Male / 44% Female",
      topSubcultures: ["Vinyl Audiophiles", "Contemporary Black Art", "Minimalist Streetwear", "Hip-Hop Purists"],
      culturalOpenness: 0.96
    },
    affinities: {
      dining: [
        { name: "High-End Omakase & Japanese Listening Bars", affinityScore: 95, category: "Cuisine", rationale: "Precision craftsmanship and obsessive audio fidelity resonate with audiophile fanbase." },
        { name: "Modern Heritage Soul Food & Southern Bistros", affinityScore: 94, category: "Heritage Cuisine", rationale: "Deep roots in African American culinary heritage reimagined with elevated technique." },
        { name: "Hidden Mezcal & Bourbon Tasting Rooms", affinityScore: 90, category: "Beverage", rationale: "Lowkey, intimate spaces prioritizing single-origin spirits over flashy bottle service." }
      ],
      nightlife: [
        { name: "Audiophile Hi-Fi Vinyl Lounges", affinityScore: 97, category: "Listening Bar", rationale: "Direct affinity for custom acoustic horns, uncompressed vinyl playback, and jazz/funk archives." },
        { name: "Underground Cypher & Beat-Producer Spaces", affinityScore: 93, category: "Live Music", rationale: "Appreciation for live instrumentation, lyricism, and authentic producer culture." },
        { name: "Low-Light Private Member Lofts", affinityScore: 89, category: "Private Club", rationale: "Intimate networking environments without invasive filming." }
      ],
      fashion: [
        { name: "Tailored Minimalist Workwear", affinityScore: 95, category: "Apparel", rationale: "Clean architectural lines, elevated chore coats, crisp white tees, and bespoke trousers." },
        { name: "Martine Rose & Wales Bonner Sartorial", affinityScore: 93, category: "Designer", rationale: "Subversive British-Jamaican tailoring, diaspora narratives, and vintage sportswear." },
        { name: "Classic Nike Cortez & Low-Profile Sneakers", affinityScore: 92, category: "Footwear", rationale: "Timeless Compton staple; anti-hypebeast authenticity." }
      ],
      brands: [
        { name: "pgLang / Converse", affinityScore: 96, category: "Apparel", activationIdea: "Minimalist Pop-up Installation & City Storybook Exhibition", pitch: "Native cultural alignment with Kendrick's creative house." },
        { name: "Aimé Leon Dore", affinityScore: 93, category: "Fashion", activationIdea: "Limited City Heritage Capsule & Vinyl Lounge", pitch: "Elevated New York/global aesthetic uniting sports, jazz, and streetwear." },
        { name: "Leica Camera", affinityScore: 91, category: "Culture/Optics", activationIdea: "Official Tour Photo Exhibition & Darkroom Masterclass", pitch: "Documentary photography prestige echoing Kendrick's Pulitzer storytelling." },
        { name: "Topo Chico", affinityScore: 87, category: "Beverage", activationIdea: "Backstage & VIP Hydration Oasis with Citrus Infusions", pitch: "Subtle cult beverage beloved by touring musicians and producers." }
      ],
      filmTv: [
        { title: "Boyz n the Hood", affinityScore: 95 },
        { title: "Do the Right Thing", affinityScore: 96 },
        { title: "Atlanta (FX)", affinityScore: 97 },
        { title: "Black Panther", affinityScore: 94 }
      ]
    }
  },

  "fred-again": {
    id: "urn:entity:music:fred_again",
    name: "Fred again..",
    slug: "fred-again",
    genres: ["UK Garage", "Emotional House", "Ambient Electronic", "Future Club"],
    vibe: "Euphoric emotional clubbing, intimate phone voice-notes, community catharsis, raw energy",
    demographics: {
      primaryAge: "20-34",
      genderSkew: "51% Male / 49% Female",
      topSubcultures: ["Electronic Music Community", "Specialty Coffee Nerds", "Gorpcore / Techwear", "Boiler Room Culture"],
      culturalOpenness: 0.95
    },
    affinities: {
      dining: [
        { name: "Neapolitan Sourdough Pizzerias", affinityScore: 94, category: "Casual Dining", rationale: "Communal, quick, high-craft food perfect for pre-show crew gathering." },
        { name: "Specialty Pour-Over & Third Wave Coffee", affinityScore: 97, category: "Café", rationale: "Fred's well-documented ritual of hunting local specialty roasters in every tour city." },
        { name: "Late-Night Authentic Doner & Noodle Bars", affinityScore: 92, category: "Street Food", rationale: "Essential post-rave refueling aligned with London street food culture." }
      ],
      nightlife: [
        { name: "Pop-Up Secret Boiler Room Warehouses", affinityScore: 99, category: "Rave", rationale: "Fred's defining format: 360-degree crowd, unreleased dubplates, spontaneous energy." },
        { name: "Intimate Low-Ceiling Basement Clubs", affinityScore: 96, category: "Club", rationale: "Rejection of giant sterile VIP tables in favor of sweaty, bass-heavy dance floors." },
        { name: "Sunset Ambient Rooftop Sessions", affinityScore: 91, category: "Lounge", rationale: "Translating emotional piano melodies into Golden Hour community moments." }
      ],
      fashion: [
        { name: "Gorpcore & Technical Outdoor (Arc'teryx, Salomon)", affinityScore: 95, category: "Activewear", rationale: "Functional rain-ready outerwear, trail running shoes, and packable gear for constant travel." },
        { name: "Carhartt WIP & Skate Basics", affinityScore: 93, category: "Streetwear", rationale: "Understated, durable clothing that lets the music take center stage." },
        { name: "Minimalist Monochrome Hoodies", affinityScore: 90, category: "Comfort", rationale: "Signature uniform of understated London producers." }
      ],
      brands: [
        { name: "Teenage Engineering", affinityScore: 98, category: "Hardware/Design", activationIdea: "Interactive OP-1 & Pocket Operator Community Jam Booth", pitch: "Pure instrument affinity; Fred's core production weapon made experiential." },
        { name: "Salomon", affinityScore: 94, category: "Footwear", activationIdea: "Tour City Urban Trail Walk & Secret Location Reveal", pitch: "Footwear choice of the modern raver navigating gritty city streets." },
        { name: "AIAIAI Audio", affinityScore: 92, category: "Audio", activationIdea: "Custom Modular Tour DJ Headphones Listening Pod", pitch: "Danish sustainable DJ headphones with cult electronic following." },
        { name: "Red Bull Music / Curates", affinityScore: 89, category: "Culture", activationIdea: "Pop-Up Street Busker to Arena Afterparty Bridge", pitch: "Credible track record supporting grassroots club culture." }
      ],
      filmTv: [
        { title: "Human Traffic", affinityScore: 92 },
        { title: "Berlin Calling", affinityScore: 90 },
        { title: "Skins (UK)", affinityScore: 91 },
        { title: "Aftersun", affinityScore: 89 }
      ]
    }
  },

  "john-summit": {
    id: "urn:entity:music:john_summit",
    name: "John Summit",
    slug: "john-summit",
    genres: ["Tech House", "Commercial Dance", "Bass House", "Festival Anthem"],
    vibe: "High-octane hedonism, 24-hour afters, charismatic swagger, festival euphoria",
    demographics: {
      primaryAge: "21-32",
      genderSkew: "54% Male / 46% Female",
      topSubcultures: ["Festival Lifestyle", "Day-Club VIP", "Hype Streetwear", "Fitness/Party Dualists"],
      culturalOpenness: 0.86
    },
    affinities: {
      dining: [
        { name: "High-Energy Modern Mexican & Tequila Bars", affinityScore: 96, category: "Dining", rationale: "Direct lifestyle tie-in with agave spirits and vibrant nightlife transition dining." },
        { name: "Buzzy Steakhouses with DJ Booths", affinityScore: 92, category: "Upscale Dining", rationale: "Celebratory group dining before heading into 6-hour club marathons." },
        { name: "Hydration Cafes & Açai Energy Spots", affinityScore: 88, category: "Recovery", rationale: "Daytime recovery routine for the 'work hard, play hard' festival demographic." }
      ],
      nightlife: [
        { name: "Open-Air Day Club & Rooftop Pool Parties", affinityScore: 98, category: "Dayclub", rationale: "Peak environment for daytime tech-house anthems and sunglasses." },
        { name: "Industrial Mega-Warehouse Afterparties", affinityScore: 97, category: "Warehouse", rationale: "Signature 'Experts Only' label ethos; extended 6 AM sunrise sets." },
        { name: "VIP Speakeasy Tequila Lounges", affinityScore: 91, category: "Lounge", rationale: "High-energy bottle service environments with tech-house resident DJs." }
      ],
      fashion: [
        { name: "Festival Streetwear & Luxury Sportswear", affinityScore: 94, category: "Streetwear", rationale: "Graphic oversized tees, designer track pants, and branded baseball caps." },
        { name: "Designer Wraparound Sunglasses", affinityScore: 96, category: "Eyewear", rationale: "Essential rave accessory from sunrise to sunset." },
        { name: "Kith & Palm Angels Athletics", affinityScore: 91, category: "Designer Casual", rationale: "High-end casual wear bridging gym, airport, and club." }
      ],
      brands: [
        { name: "Casamigos Tequila", affinityScore: 97, category: "Spirits", activationIdea: "'Where You Are' Agave Lounge & Custom Bottle Engraving", pitch: "Direct lifestyle alignment with Summit's on-stage persona." },
        { name: "Celsius Energy", affinityScore: 93, category: "Beverage", activationIdea: "All-Night Afterhours Fuel Station & Electrolyte Bar", pitch: "Fitness meets rave recovery lifestyle; high festival conversion." },
        { name: "Aviator Nation", affinityScore: 89, category: "Apparel", activationIdea: "VIP Backstage Vintage Velvet Hoodie Collab", pitch: "Retro California luxury lounge aesthetic popular with festival VIPs." },
        { name: "Bose Ultra Audio", affinityScore: 88, category: "Tech", activationIdea: "Immersive Bass Experience Tunnel at Arena Concourse", pitch: "Delivering club-grade spatial bass to mobile fans." }
      ],
      filmTv: [
        { title: "The Wolf of Wall Street", affinityScore: 94 },
        { title: "Entourage", affinityScore: 91 },
        { title: "Project X", affinityScore: 92 }
      ]
    }
  },

  "cedric-the-entertainer": {
    id: "urn:entity:comedy:cedric_the_entertainer",
    name: "Cedric the Entertainer",
    slug: "cedric-the-entertainer",
    genres: ["Stand-up Comedy", "Kings of Comedy", "Cultural Sitcom", "Live Showcase"],
    vibe: "Suave humor, soulful charisma, legendary storytelling, bespoke tailoring, community warmth",
    demographics: {
      primaryAge: "30-58",
      genderSkew: "52% Female / 48% Male",
      topSubcultures: ["Classic Comedy Aficionados", "Cigar & Bourbon Connoisseurs", "Sartorial Gentlemen", "Urban Contemporary Live"],
      culturalOpenness: 0.91
    },
    affinities: {
      dining: [
        { name: "Historic Prime Steakhouses & Supper Clubs", affinityScore: 97, category: "Fine Dining", rationale: "Classic white-tablecloth hospitality with top-shelf bourbon selections." },
        { name: "Heritage Southern Barbecue & Smokehouses", affinityScore: 95, category: "Soul Cuisine", rationale: "Authentic, time-honored pitmaster tradition deeply rooted in comedy tour stops." },
        { name: "Premium Cigar & Whiskey Lounges", affinityScore: 96, category: "Lounge", rationale: "Cedric's signature after-show unwinding environment." }
      ],
      nightlife: [
        { name: "Iconic Live Comedy Showcases", affinityScore: 99, category: "Comedy", rationale: "Historic comedy sanctums where legends drop in for surprise midnight sets." },
        { name: "Live R&B & Neo-Soul Supper Clubs", affinityScore: 94, category: "Live Music", rationale: "Grown-and-sexy ambiance featuring live four-piece rhythm sections." },
        { name: "VIP Speakeasy Parlors", affinityScore: 90, category: "Private Lounge", rationale: "Low-noise conversational sanctuaries for touring performers and friends." }
      ],
      fashion: [
        { name: "Bespoke Suiting & Tailored Three-Piece", affinityScore: 96, category: "Sartorial", rationale: "Crisp lapels, pocket squares, and elegant drape; the gentleman's comedy uniform." },
        { name: "Custom Fedora & Borsalino Headwear", affinityScore: 98, category: "Hats", rationale: "Cedric's quintessential signature hat style across decades." },
        { name: "Handcrafted Italian Leather Loafers", affinityScore: 92, category: "Footwear", rationale: "Impeccable footwear matching tailored evening wear." }
      ],
      brands: [
        { name: "Uncle Nearest Premium Whiskey", affinityScore: 96, category: "Spirits", activationIdea: "'Entertainer's Reserve' VIP Tasting Lounge & Storytelling Hour", pitch: "Historic Black distilling pioneer aligning with comedy royalty." },
        { name: "Borsalino / Stetson", affinityScore: 97, category: "Headwear", activationIdea: "On-Site Master Hatter Fitting for VIP Ticket Holders", pitch: "Direct product identity pairing; iconic hat customization." },
        { name: "Ralph Lauren Purple Label", affinityScore: 91, category: "Luxury Fashion", activationIdea: "Curated Tour Wardrobe Showcase & Red Carpet Suite", pitch: "Timeless American luxury suiting with commanding stage presence." },
        { name: "Hennessy X.O", affinityScore: 93, category: "Cognac", activationIdea: "Post-Show Toast & Legacy Toasting Station", pitch: "Celebratory luxury partnership with deep entertainment heritage." }
      ],
      filmTv: [
        { title: "The Original Kings of Comedy", affinityScore: 99 },
        { title: "Barbershop", affinityScore: 97 },
        { title: "The Neighborhood (CBS)", affinityScore: 96 },
        { title: "The Soul Man", affinityScore: 92 }
      ]
    }
  },

  "billie-eilish": {
    id: "urn:entity:music:billie_eilish",
    name: "Billie Eilish",
    slug: "billie-eilish",
    genres: ["Alternative Pop", "Dark Pop", "Eco-Pop", "Art Pop"],
    vibe: "Intimate whispered vocals, subversive goth-skate edge, unapologetic environmentalism",
    demographics: {
      primaryAge: "16-30",
      genderSkew: "64% Female / Non-Binary",
      topSubcultures: ["Eco-Conscious Gen Z", "Goth / Alt Streetwear", "Vegan Lifestyle", "Indie Cinema Nerds"],
      culturalOpenness: 0.95
    },
    affinities: {
      dining: [
        { name: "100% Plant-Based Fine Dining & Bistros", affinityScore: 98, category: "Vegan Cuisine", rationale: "Billie's strict vegan rider and vocal animal welfare leadership." },
        { name: "Zero-Waste Organic Matcha & Tea Labs", affinityScore: 94, category: "Café", rationale: "High affinity for calming, mindful botanical beverages before performances." },
        { name: "Artisanal Vegan Pastry Boutiques", affinityScore: 91, category: "Bakery", rationale: "Indulgent dairy-free sweets supporting sustainable local producers." }
      ],
      nightlife: [
        { name: "Underground Dark Wave & Alt-Indie Venues", affinityScore: 95, category: "Club", rationale: "Heavy bass, lo-fi aesthetics, and moody dark-lighting environments." },
        { name: "Retro Roller Skating Rinks & Skate Parks", affinityScore: 92, category: "Activity", rationale: "Community hangout spaces celebrating youth culture and movement." },
        { name: "Eco-Art Installations & Pop-Up Projections", affinityScore: 90, category: "Exhibition", rationale: "Multisensory visual experiences with zero-carbon footprint." }
      ],
      fashion: [
        { name: "Avant-Garde Oversized Silhouettes", affinityScore: 97, category: "Apparel", rationale: "Deconstructing body standards with monumental streetwear, baggy shorts, and layers." },
        { name: "Sustainable Upcycled Designer Wear", affinityScore: 96, category: "Eco-Fashion", rationale: "Custom vegan leather, deadstock fabrics, and ethical luxury partnerships." },
        { name: "Chunky Vegan Platform Sneakers & Boots", affinityScore: 94, category: "Footwear", rationale: "Gothic silhouettes made strictly without animal products." }
      ],
      brands: [
        { name: "Patagonia", affinityScore: 96, category: "Eco-Apparel", activationIdea: "'Worn Wear' Live Tour Repair Station for Fan Gear", pitch: "Uncompromising climate activism; matches Billie's Overheated climate summits." },
        { name: "Gucci (Demetra Vegan Line)", affinityScore: 93, category: "Luxury Fashion", activationIdea: "Sustainable Red Carpet Backstage Capsule Display", pitch: "Proving luxury fashion can be 100% cruelty-free." },
        { name: "Oatly", affinityScore: 91, category: "Food/Beverage", activationIdea: "Zero-Dairy Soft Serve Truck at Venue Entrance", pitch: "Playful plant-based disruption directly aligned with rider ethics." },
        { name: "Fender Guitars & Ukuleles", affinityScore: 89, category: "Musical Instruments", activationIdea: "Signature Billie Acoustic & Bass Workshop Pod", pitch: "Grassroots songwriting roots; empowering young musicians." }
      ],
      filmTv: [
        { title: "Spirited Away (Studio Ghibli)", affinityScore: 96 },
        { title: "Edward Scissorhands", affinityScore: 94 },
        { title: "Twin Peaks", affinityScore: 93 },
        { title: "Coraline", affinityScore: 92 }
      ]
    }
  },

  "charli-xcx": {
    id: "urn:entity:music:charli_xcx",
    name: "Charli XCX",
    slug: "charli-xcx",
    genres: ["Hyperpop", "Electropop", "Club Pop", "Brat Pop"],
    vibe: "Club-kid hedonism, auto-tuned vulnerability, avant-pop production, green aesthetic",
    demographics: {
      primaryAge: "18-32",
      genderSkew: "55% Female / 45% Male / Non-Binary",
      topSubcultures: ["Hyperpop Ravers", "Boiler Room Scene", "Y2K Cyberpunk", "Fashion Avant-Garde"],
      culturalOpenness: 0.98
    },
    affinities: {
      dining: [
        { name: "Late-Night Izakayas & Highballs", affinityScore: 97, category: "Dining", rationale: "High affinity for fast, high-energy Japanese pub culture before club events." },
        { name: "Natural Pet-Nat Wine Bars", affinityScore: 94, category: "Beverage", rationale: "Strong crossover with indie creative and club communities." },
        { name: "Neon All-Day Espresso Bars", affinityScore: 91, category: "Café", rationale: "Morning recovery and creative meetup spots." }
      ],
      nightlife: [
        { name: "360-Degree Boiler Room Warehouses", affinityScore: 99, category: "Rave", rationale: "Signature environment for Charli's iconic Partygirl DJ sets." },
        { name: "Underground Electro & Bass Basements", affinityScore: 96, category: "Club", rationale: "Intimate sweaty dancefloors with high-tempo electronic curation." }
      ],
      fashion: [
        { name: "Acid Green & Low-Waisted Cyber Y2K", affinityScore: 98, category: "Aesthetic", rationale: "Signature visual language defined by the Brat album cycle." },
        { name: "Acne Studios & Miu Miu Edge", affinityScore: 95, category: "Designer", rationale: "Subversive European luxury with high club appeal." }
      ],
      brands: [
        { name: "Acne Studios", affinityScore: 96, category: "Luxury Fashion", activationIdea: "VIP Green Room Custom Tour Wardrobe Pod", pitch: "Direct aesthetic fit with European avant-pop fashion." },
        { name: "Von Dutch", affinityScore: 92, category: "Streetwear", activationIdea: "Exclusive Tour Bowling Bag & Cap Pop-up", pitch: "Ironic Y2K revivalism perfectly aligned with fanbase nostalgia." },
        { name: "Red Bull Music", affinityScore: 90, category: "Culture", activationIdea: "Secret Warehouse 360 DJ Stream Stage", pitch: "Proven grassroots club authority." }
      ],
      filmTv: [
        { title: "Bodies Bodies Bodies", affinityScore: 96 },
        { title: "The Idol", affinityScore: 89 },
        { title: "Spring Breakers", affinityScore: 94 }
      ]
    }
  },

  "tyler-the-creator": {
    id: "urn:entity:music:tyler_the_creator",
    name: "Tyler, The Creator",
    slug: "tyler-the-creator",
    genres: ["Alternative Hip-Hop", "Neo-Soul", "Jazz Rap", "Auteur Pop"],
    vibe: "Wes Anderson color palettes, preppy subversion, camp luxury, obsessive design detail",
    demographics: {
      primaryAge: "18-34",
      genderSkew: "58% Male / 42% Female",
      topSubcultures: ["GOLF Aesthetics", "Skate Culture", "Mid-Century Design", "Vinyl Collectors"],
      culturalOpenness: 0.96
    },
    affinities: {
      dining: [
        { name: "Artisanal Gelato & French Pastry Labs", affinityScore: 96, category: "Dessert/Café", rationale: "Tyler's well-known passion for luxury sweets, waffle cones, and French pastry." },
        { name: "Mid-Century Heritage Diners", affinityScore: 94, category: "Diner", rationale: "Retro pastel diner aesthetics matching GOLF le FLEUR colorways." },
        { name: "Japanese Matcha & Pour-Over Pavilions", affinityScore: 92, category: "Beverage", rationale: "Mindful, aesthetically pristine tea spaces." }
      ],
      nightlife: [
        { name: "Skate Park Jam Sessions & Block Parties", affinityScore: 97, category: "Community", rationale: "Deep roots in Odd Future skate and street culture." },
        { name: "Soul & Jazz Vinyl Jukebox Parlors", affinityScore: 95, category: "Listening Bar", rationale: "Direct musical inspiration from 70s Stevie Wonder and Roy Ayers." }
      ],
      fashion: [
        { name: "Pastel Suiting, Mohair & Penny Loafers", affinityScore: 99, category: "Sartorial", rationale: "The defining GOLF le FLEUR uniform of cardigans, ushanka hats, and tailored shorts." },
        { name: "Louis Vuitton & Pharrell Collaborative Menswear", affinityScore: 96, category: "High Luxury", rationale: "Direct lineage through Tyler's historic LV collection design." }
      ],
      brands: [
        { name: "Converse", affinityScore: 98, category: "Footwear", activationIdea: "Custom Golf One Star Customization Station", pitch: "Multi-year collaborative powerhouse with guaranteed sell-out conversion." },
        { name: "Leica Camera", affinityScore: 94, category: "Optics", activationIdea: "Tour Photography Studio & Limited Print Gallery", pitch: "Analog photographic prestige matching Tyler's cinematic direction." },
        { name: "San Pellegrino", affinityScore: 90, category: "Beverage", activationIdea: "Pastel Citrus Spritz Bar at Concert Gates", pitch: "European summer aesthetic matching call me if you get lost themes." }
      ],
      filmTv: [
        { title: "The Grand Budapest Hotel", affinityScore: 98 },
        { title: "Fantastic Mr. Fox", affinityScore: 97 },
        { title: "Moonrise Kingdom", affinityScore: 95 }
      ]
    }
  },

  "bad-bunny": {
    id: "urn:entity:music:bad_bunny",
    name: "Bad Bunny",
    slug: "bad-bunny",
    genres: ["Reggaeton", "Latin Trap", "Dembo", "Global Pop"],
    vibe: "San Juan pride, gender-fluid luxury, stadium euphoria, Caribbean bass energy",
    demographics: {
      primaryAge: "18-36",
      genderSkew: "52% Female / 48% Male",
      topSubcultures: ["Perreo Culture", "Latin Urban Luxury", "High-Fashion Streetwear", "Caribbean Diaspora"],
      culturalOpenness: 0.94
    },
    affinities: {
      dining: [
        { name: "Modern Caribbean Ceviche & Agave Lounges", affinityScore: 98, category: "Cuisine", rationale: "Rooted in authentic Puerto Rican seafood and high-energy dining." },
        { name: "Upscale Japanese Robata & Omakase", affinityScore: 95, category: "Fine Dining", rationale: "Benito's documented preference for premier sushi and luxury hospitality." },
        { name: "Late-Night Mofongo & Street Pinchos", affinityScore: 94, category: "Heritage", rationale: "Essential post-show comfort food celebrating Boricua roots." }
      ],
      nightlife: [
        { name: "All-Night Perreo & Reggaeton Warehouses", affinityScore: 99, category: "Dancehall", rationale: "The beating heart of Bad Bunny fan culture; non-stop dance from midnight to sunrise." },
        { name: "VIP Oceanfront Beach Clubs", affinityScore: 95, category: "Outdoor", rationale: "Day-into-night tropical celebration with world-class sound." }
      ],
      fashion: [
        { name: "Jacquemus Couture & Gender-Fluid Tailoring", affinityScore: 97, category: "Designer", rationale: "Avant-garde skirts, monochrome trench coats, and vibrant sunglasses." },
        { name: "Adidas Forum & Response CL Exclusives", affinityScore: 98, category: "Sneakers", rationale: "Core signature shoe line with global collectors." }
      ],
      brands: [
        { name: "Adidas Originals", affinityScore: 99, category: "Footwear", activationIdea: "Exclusive Tour Colorway Drop and Skate Ramp", pitch: "Unrivaled sneaker sales velocity and deep cultural equity." },
        { name: "Jacquemus", affinityScore: 96, category: "Fashion", activationIdea: "VIP Backstage Minimalist Sun-Drenched Lounge", pitch: "Iconic high-fashion campaign partner." },
        { name: "Corona Extra", affinityScore: 92, category: "Beverage", activationIdea: "Tropical Beachside Chill Zone at Arena Concourse", pitch: "Longstanding partnership celebrating Latin culture." }
      ],
      filmTv: [
        { title: "Bullet Train", affinityScore: 95 },
        { title: "Narcos: Mexico", affinityScore: 93 },
        { title: "Cassandro", affinityScore: 91 }
      ]
    }
  }
};

// Cities database with curated neighborhood hubs and verified venue coordinates
export const CITIES_DATABASE = {
  "chicago": {
    name: "Chicago",
    state: "IL",
    country: "USA",
    tagline: "The Architectural Capital of Live Music & Cultural Contrast",
    majorVenues: ["United Center", "Wintrust Arena", "The Salt Shed", "Riviera Theatre", "Metro Chicago"],
    culturalNeighborhoods: [
      {
        name: "Wicker Park / Logan Square",
        vibe: "Indie vinyl, natural wine, queer-friendly bakeries, street art",
        topPicks: {
          dining: [
            { name: "Lula Cafe", type: "Farm-to-Table Bistro", address: "2537 N Kedzie Blvd", whyQloo: "Pioneering farm-to-table culinary hub matching high-openness artistic audiences (Qloo 94% affinity)." },
            { name: "Handlebar", type: "Vegan / Comfort Diner", address: "2311 W North Ave", whyQloo: "Legendary plant-based comfort oasis with backyard garden vibes." },
            { name: "Cellar Door Provisions", type: "Natural Wine & Small Plates", address: "3025 W Diversey Ave", whyQloo: "Intimate pet-nat and sourdough pairings with low-intervention ethos." }
          ],
          nightlife: [
            { name: "The Whistler", type: "Craft Cocktail & DJ Showcase", address: "2421 N Milwaukee Ave", whyQloo: "Eclectic live experimental jazz, neo-soul DJs, and rotating artisanal cocktail list." },
            { name: "Slippery Slope", type: "Retro Dance Bar", address: "2475 N Milwaukee Ave", whyQloo: "Skee-ball, red neon glow, and high-energy indie-pop dance floor." },
            { name: "Smartbar / Metro", type: "Underground House & Techno", address: "3730 N Clark St", whyQloo: "Historic sound system temple; gold standard for electronic music purists." }
          ],
          fashion: [
            { name: "Kokorokoko Vintage", type: "80s/90s Post-Modern Fashion", address: "1323 N Milwaukee Ave", whyQloo: "Over-indexes with maximalist camp fashion, neon windbreakers, and bold retro prints." },
            { name: "Mildblend Supply Co.", type: "Heritage Denim & Workwear", address: "1342 N Milwaukee Ave", whyQloo: "Raw Japanese selvedge denim and heavyweight work jackets." }
          ]
        }
      },
      {
        name: "West Loop / Fulton Market",
        vibe: "High-end culinary innovation, industrial design, luxury lounges",
        topPicks: {
          dining: [
            { name: "Kumiko", type: "Japanese Dining Bar", address: "630 W Lake St", whyQloo: "World-class bar direction by Julia Momosé; meticulous ice and bespoke glassware." },
            { name: "Virtue Restaurant (Hyde Park)", type: "Modern Southern Soul", address: "1462 E 53rd St", whyQloo: "Chef Erick Williams' soulful, James Beard-winning heritage culinary celebration." }
          ],
          nightlife: [
            { name: "Lazy Bird", type: "Subterranean Live Soul Lounge", address: "200 N Green St", whyQloo: "Decadent underground parlor featuring live rhythm & blues ensembles." }
          ],
          fashion: [
            { name: "Notre Shop", type: "Curated High-Fashion & Streetwear", address: "118 N Peoria St", whyQloo: "Architectural temple carrying Visvim, Comme des Garçons, and Salomon." }
          ]
        }
      }
    ]
  },

  "new-york": {
    name: "New York",
    state: "NY",
    country: "USA",
    tagline: "The Global Epicenter of Cultural Curation & Nightlife",
    majorVenues: ["Madison Square Garden", "Barclays Center", "Brooklyn Mirage / Avant Gardner", "Radio City Music Hall", "Terminal 5"],
    culturalNeighborhoods: [
      {
        name: "Lower East Side / East Village",
        vibe: "Gritty glamour, subterranean speakeasies, indie sleaze, boundary-pushing dining",
        topPicks: {
          dining: [
            { name: "Superiority Burger", type: "Vegetarian Culinary Institution", address: "119 Avenue A", whyQloo: "Punk-rock ethic meets Michelin-level dessert and vegetarian brilliance." },
            { name: "Dimes", type: "Eclectic California-Healthy", address: "49 Canal St", whyQloo: "Mid-century Memphis design and vibrant nutrient-dense small plates." }
          ],
          nightlife: [
            { name: "Home Sweet Home", type: "Basement Disco & Taxidermy", address: "131 Chrystie St", whyQloo: "Iconic downtown haven for rock 'n' roll and underground dance." },
            { name: "Clandestino", type: "Neighborhood French-Spanish Wine Bar", address: "35 Canal St", whyQloo: "Casual gathering spot for writers, musicians, and artists." }
          ],
          fashion: [
            { name: "James Veloria", type: "Archival Avant-Garde Designer", address: "75 E Broadway #225", whyQloo: "Cult Chinatown mall destination for vintage Jean Paul Gaultier and Prada." }
          ]
        }
      },
      {
        name: "Greenpoint / Williamsburg (Brooklyn)",
        vibe: "Hi-fi listening rooms, warehouse raves, sustainable design, natural wine",
        topPicks: {
          dining: [
            { name: "Laser Wolf", type: "Israeli Shipudiya & Rooftop Views", address: "97 Wythe Ave", whyQloo: "High-energy open-fire skewers with skyline views of Manhattan." },
            { name: "Achilles Heel", type: "Waterfront Tavern & Cider", address: "115 West St", whyQloo: "Cozy wood-fired hearth and natural cider selections." }
          ],
          nightlife: [
            { name: "Public Records", type: "Hi-Fi Vegan Cafe & Sound Room", address: "233 Douglass St", whyQloo: "Custom Isonoe sound system and strictly curated electronic bookings." },
            { name: "Nowadays", type: "Community Dance Oasis & Backyard", address: "56-06 Cooper Ave", whyQloo: "Non-stop 24-hour party culture with warm wooden dance floors and strict anti-harassment policy." }
          ],
          fashion: [
            { name: "Awoke Vintage", type: "Color-Coordinated Y2K & 90s", address: "132 N 5th St", whyQloo: "Playful curation of festival-ready dresses, retro sunglasses, and accessories." }
          ]
        }
      }
    ]
  },

  "los-angeles": {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    tagline: "The Sun-Drenched Dreamscape of Sound & Cinematic Style",
    majorVenues: ["Kia Forum", "Crypto.com Arena", "Hollywood Bowl", "Greek Theatre", "The Shrine Expo Hall"],
    culturalNeighborhoods: [
      {
        name: "Silver Lake / Echo Park",
        vibe: "Bohemian modernism, vinyl cafes, patio wines, queer comedy",
        topPicks: {
          dining: [
            { name: "Botanica Restaurant & Market", type: "Nourishing Cal-Mediterranean", address: "1620 Silver Lake Blvd", whyQloo: "Vibrant vegetable-centric culinary sanctuary with natural wines." },
            { name: "Monty's Good Burger", type: "100% Plant-Based Retro Burgers", address: "1533 Sunset Blvd", whyQloo: "Vegan fast-casual staple heavily frequented by touring pop and indie artists." }
          ],
          nightlife: [
            { name: "In Sheep's Clothing Records", type: "Audiophile Listening Space", address: "436 N Fairfax Ave", whyQloo: "Dedicated to deep album listening sessions and Japanese whiskies." },
            { name: "Akbar", type: "Historic Queer Silver Lake Tavern", address: "4356 Sunset Blvd", whyQloo: "Beloved neighborhood dance floor, jukebox institution, and inclusive haven." }
          ],
          fashion: [
            { name: "SquaresVille", type: "Eclectic Vintage Clothing", address: "1800 N Vermont Ave", whyQloo: "Decades of stage-ready leather, boots, and glam garments." }
          ]
        }
      }
    ]
  },

  "london": {
    name: "London",
    state: "ENG",
    country: "UK",
    tagline: "The Heritage Capital of Bass Culture & Sartorial Subversion",
    majorVenues: ["The O2 Arena", "Wembley Arena", "Alexandra Palace", "Printworks / Drumsheds", "Brixton Academy"],
    culturalNeighborhoods: [
      {
        name: "Hackney / Dalston (East London)",
        vibe: "UK garage, warehouse arts, Caribbean bakeries, Turkish mangal, thrift",
        topPicks: {
          dining: [
            { name: "Mangal 2", type: "Modern Anatolian Hearth Dining", address: "4 Stoke Newington Rd", whyQloo: "Cult culinary hotspot marrying traditional smoke with modern natural wines." },
            { name: "Dusty Knuckle Bakery", type: "Social Enterprise Sourdough & Sandwiches", address: "Abbot St, Dalston", whyQloo: "Legendary East London bakery serving oversized potato sourdough sandwiches." }
          ],
          nightlife: [
            { name: "The Cause / 60 Dock Road", type: "Grassroots Multi-Room Club", address: "Canning Town", whyQloo: "Raw, DIY electronic music fortress championing local DJs and underground scenes." },
            { name: "Brilliant Corners", type: "Analogue Sound System & Japanese Bistro", address: "470 Kingsland Rd", whyQloo: "Audiophile Klipschorn speakers, natural wine, and vinyl-only selectors." }
          ],
          fashion: [
            { name: "Loverboy by Charles Jeffrey Studio", type: "Queer Scottish Punk Couture", address: "Shoreditch", whyQloo: "Theatrical, gender-nonconforming tartans and club-kid fantasy." }
          ]
        }
      }
    ]
  },

  "austin": {
    name: "Austin",
    state: "TX",
    country: "USA",
    tagline: "The Live Music Capital with High-Tech Agave & Hill Country Soul",
    majorVenues: ["Moody Center", "Austin City Limits Live (Moody Theater)", "Stubb's Waller Creek", "Zilker Park"],
    culturalNeighborhoods: [
      {
        name: "East Austin",
        vibe: "Craft agave, neon trailers, vinyl courtyards, skate cafes",
        topPicks: {
          dining: [
            { name: "Nixta Taqueria", type: "Heirloom Corn & Botanical Tacos", address: "2512 E 12th St", whyQloo: "James Beard-winning artisanal corn nixtamalization and community fridge." },
            { name: "Franklin Barbecue", type: "Legendary Central Texas Brisket", address: "900 E 11th St", whyQloo: "The pinnacle of Texas wood-smoked brisket and touring musician rite of passage." }
          ],
          nightlife: [
            { name: "Equipment Room", type: "Hi-Fi Basement Lounge at Hotel Magdalena", address: "1101 Music Ln", whyQloo: "Japan-meets-Austin custom audio consoles and vinyl jazz/soul archives." },
            { name: "Cheer Up Charlies", type: "Outdoor Queer Music Oasis", address: "900 Red River St", whyQloo: "Pink parachute canopy, vegan cocktails, and vibrant indie/drag performances." }
          ],
          fashion: [
            { name: "Revival Vintage", type: "Mid-Century Western Apparel", address: "100 E North Loop Blvd", whyQloo: "Vintage pearl-snap shirts, fringe jackets, and authentic leather boots." }
          ]
        }
      }
    ]
  },

  "tokyo": {
    name: "Tokyo",
    state: "Kanto",
    country: "Japan",
    tagline: "The Global Capital of Precision Audio, Avant-Garde Streetwear & Micro-Hospitality",
    majorVenues: ["Tokyo Dome", "Nippon Budokan", "Ariake Arena", "Zepp Shinjuku"],
    culturalNeighborhoods: [
      {
        name: "Shibuya / Shimokitazawa",
        vibe: "Vinyl listening bars, vintage clothing thrift stores, micro-izakayas, modular synths",
        topPicks: {
          dining: [
            { name: "Toriyoshi Shimokitazawa", type: "Artisanal Yakitori", address: "Shimokitazawa", whyQloo: "Authentic neighborhood gathering spot for indie musicians and artists." },
            { name: "Fuglen Tokyo", type: "Norwegian Pour-Over & Cocktails", address: "Tomigaya, Shibuya", whyQloo: "Mid-century Scandinavian design paired with world-class coffee and craft cocktails." },
            { name: "Afuri Ramen Ebisu", type: "Yuzu Shio Ramen", address: "Ebisu", whyQloo: "Clean, uplifting citrus broth favored by touring electronic and pop performers." }
          ],
          nightlife: [
            { name: "Bar Music Shibuya", type: "Audiophile Vinyl Lounge", address: "Shibuya", whyQloo: "Klipsch speakers, low lighting, and meticulously curated jazz and soul archives." },
            { name: "WOMB Tokyo", type: "Four-Story Electronic Temple", address: "Maruyamacho, Shibuya", whyQloo: "Iconic giant disco ball and top-tier digital sound system." },
            { name: "Vent Tokyo", type: "Acoustic Minimalist Club", address: "Minamiaoyama", whyQloo: "Engineered specifically for pristine electronic music acoustics." }
          ],
          fashion: [
            { name: "Flamingo Vintage", type: "Curated Retro Americana & Japanese Streetwear", address: "Shimokitazawa", whyQloo: "Over-indexes with creative gig-goers seeking archival fashion." },
            { name: "Dover Street Market Ginza", type: "Avant-Garde Designer House", address: "Ginza", whyQloo: "Rei Kawakubo's legendary multi-brand retail cathedral." }
          ]
        }
      }
    ]
  },

  "berlin": {
    name: "Berlin",
    state: "BE",
    country: "Germany",
    tagline: "The Unapologetic Epicenter of Techno Architecture & Subcultural Freedom",
    majorVenues: ["Uber Arena (Mercedes-Benz Arena)", "Tempodrom", "Velodrom", "Columbiahalle"],
    culturalNeighborhoods: [
      {
        name: "Kreuzberg / Friedrichshain",
        vibe: "Industrial clubbing, natural wine canal-side, vegan street food, brutalist design",
        topPicks: {
          dining: [
            { name: "Mustafa's Gemuse Kebap", type: "Iconic Roasted Vegetable Doner", address: "Mehringdamm 32", whyQloo: "The universal rite of passage for touring musicians arriving in Berlin." },
            { name: "Annelies", type: "Avant-Garde Brunch & Specialty Coffee", address: "Gorlitzer Str. 68", whyQloo: "Fermented seasonal ingredients and low-intervention brunch culture." },
            { name: "Ora", type: "Apothecary Dining & Natural Wine", address: "Oranienplatz 14", whyQloo: "Restored 19th-century pharmacy serving biodynamic European wines." }
          ],
          nightlife: [
            { name: "Tresor / Kraftwerk", type: "Industrial Power Station Techno", address: "Kopenicker Str. 70", whyQloo: "Historic vault that birthed the Berlin-Detroit techno axis." },
            { name: "Panorama Bar / Berghain", type: "Subcultural Temple", address: "Am Wriezener Bahnhof", whyQloo: "Gold standard for marathon sets, strict door policy, and zero photography." },
            { name: "Klunkerkranich", type: "Rooftop Community Garden & Beats", address: "Karl-Marx-Str. 66", whyQloo: "Panoramic sunset view over Berlin with eclectic live selectors." }
          ],
          fashion: [
            { name: "Darklands Berlin", type: "Monochrome & Avant-Garde Tailoring", address: "Kreuzberg", whyQloo: "Curator of artisanal dark-wear including Boris Bidjan Saberi and Carol Christian Poell." },
            { name: "Repeater Vintage", type: "Curated 90s Streetwear & Denim", address: "Friedrichshain", whyQloo: "Authentic festival rave apparel and oversized jackets." }
          ]
        }
      }
    ]
  }
};

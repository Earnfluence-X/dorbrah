export interface SeedProduct {
  slug: string;
  name: string;
  collection: string;
  colorway: string;
  colorFamily: string;
  description: string;
  story: string;
  composition: string;
  care: string;
  priceNaira: number;
  compareAtNaira: number | null;
  yards: number;
  badge: string | null;
  image: string;
  imageFilter: string | null;
  featured: boolean;
}

export interface SeedReview {
  productSlug: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
}

const WAX =
  "100% cotton wax print · 120 g/m² · 6 full yards (5.5 m) · 46\u2033 width";
const CARE =
  "Cold gentle wash separately for the first two washes. Iron on reverse at medium heat. Dry away from direct sun.";

export const seedProducts: SeedProduct[] = [
  /* ================= ORIGINAL NINE ================= */
  {
    slug: "adaeze-sunburst",
    name: "Adaeze Sunburst",
    collection: "Heritage",
    colorway: "Marigold & Indigo",
    colorFamily: "Gold",
    description:
      "A radiant six-yard statement in marigold gold over deep indigo — concentric sunburst motifs drawn from Nsibidi symbolism, waxed by hand for a crackle finish that photographs like heirloom bronze.",
    story:
      "Named for the first daughter of the house, Adaeze is printed in short seasonal runs at our partner mill in Abeokuta. The sunburst circle is a blessing — worn at weddings, it is said to carry warmth into a new home.",
    composition:
      "100% premium cotton wax print · 120 g/m² · 6 full yards (5.5 m) · 46\u2033 width · crackle wax finish",
    care: "Cold gentle wash separately for the first two washes. Iron on reverse at medium heat. Dry away from direct sun to hold the indigo depth.",
    priceNaira: 13500,
    compareAtNaira: 18500,
    yards: 6,
    badge: "Bestseller",
    image: "/images/products/adaeze-sunburst.jpg",
    imageFilter: null,
    featured: true,
  },
  {
    slug: "lagos-coral-court",
    name: "Lagos Coral Court",
    collection: "Celebration",
    colorway: "Coral & Ivory",
    colorFamily: "Red",
    description:
      "Coral-red geometry on warm ivory — a tailored suiting weight inspired by the coral beads of Benin royalty. Structured enough for sharp lapels, soft enough for a draped iro.",
    story:
      "Coral has guarded Benin royalty for five centuries. This cloth translates that authority into a modern diamond lattice, cut for grooms, chairmen and women who enter rooms first.",
    composition:
      "100% cotton hollandais-grade wax print · 135 g/m² suiting weight · 6 full yards (5.5 m) · 46\u2033 width",
    care: "Dry clean recommended for tailored pieces. Fabric may be cold hand-washed before construction.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: "New",
    image: "/images/products/lagos-coral.jpg",
    imageFilter: null,
    featured: false,
  },
  {
    slug: "emerald-prestige",
    name: "Emerald Prestige",
    collection: "Signature",
    colorway: "Emerald & Champagne",
    colorFamily: "Green",
    description:
      "Deep emerald fields crossed with champagne-gold prestige motifs — a gown-weight drape with a liquid hand feel. Our most photographed cloth of the season.",
    story:
      "Prestige prints were once reserved for market queens and title holders. We hold the emerald dye bath an extra day so the green reads almost black in evening light.",
    composition:
      "100% cotton wax print with champagne foil accents · 118 g/m² · 6 full yards (5.5 m) · 46\u2033 width",
    care: "Cold gentle wash inside out. Do not tumble dry. Cool iron on reverse; avoid direct iron contact with foil accents.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/emerald-prestige.jpg",
    imageFilter: null,
    featured: true,
  },
  {
    slug: "indigo-alaba",
    name: "Indigo Alaba",
    collection: "Heritage",
    colorway: "Deep Indigo Tonal",
    colorFamily: "Blue",
    description:
      "Tonal indigo circles in the adire tradition — restrained from a distance, intricate up close. The cloth of elder statesmen and quiet luxury.",
    story:
      "Alaba honours the indigo dyers of Abeokuta whose pits have run for generations. Each bolt is over-dyed twice, giving every yard a slightly different depth — no two agbada are ever identical.",
    composition:
      "100% cotton, hand-finished wax resist · 130 g/m² · 6 full yards (5.5 m) · 46\u2033 width",
    care: "Wash cold, separately, inside out. Expect gentle fading with age — this is the mark of true indigo.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: "Atelier Pick",
    image: "/images/products/indigo-alaba.jpg",
    imageFilter: null,
    featured: false,
  },
  {
    slug: "sahel-bloom",
    name: "Sahel Bloom",
    collection: "Heritage",
    colorway: "Ochre & Cream",
    colorFamily: "Earth",
    description:
      "Desert-flower motifs in ochre, rust and cream — a soft mid-weight cotton that ties beautifully at the waist and moves like a harmattan evening.",
    story:
      "Drawn from the acacia blossoms of the north, Sahel Bloom is our most requested cloth for traditional weddings — brides order it by the dozen for aso-ebi trains.",
    composition:
      "100% cotton wax print · 115 g/m² · 6 full yards (5.5 m) · 46\u2033 width",
    care: "Machine wash cold on gentle cycle. Line dry. Warm iron on reverse while slightly damp.",
    priceNaira: 13500,
    compareAtNaira: 20,000,
    yards: 6,
    badge: null,
    image: "/images/products/sahel-bloom.jpg",
    imageFilter: null,
    featured: false,
  },
  {
    slug: "onyx-regalia",
    name: "Onyx Regalia",
    collection: "Signature",
    colorway: "Noir & Ivory",
    colorFamily: "Noir",
    description:
      "Graphic noir linework on ivory — a monochrome Ankara that behaves like couture jacquard. Sharp shoulders, wide trousers, no introduction required.",
    story:
      "A collaboration with a Lagos pattern studio, Onyx strips the palette back to ink and bone so the geometry does the speaking. Printed in a single numbered run of 400 yards.",
    composition:
      "100% cotton wax print · 128 g/m² · 6 full yards (5.5 m) · numbered limited run",
    care: "Dry clean recommended to preserve ivory ground. Cool iron on reverse.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: "Limited",
    image: "/images/products/onyx-regalia.jpg",
    imageFilter: null,
    featured: true,
  },
  {
    slug: "sapphire-court",
    name: "Sapphire Court",
    collection: "Celebration",
    colorway: "Royal Sapphire & Ivory",
    colorFamily: "Blue",
    description:
      "Royal sapphire waves and crown motifs on ivory — celebratory without shouting. A favourite for groomsmen parties and December owambe season.",
    story:
      "The crown motif repeats exactly forty times per yard — our engravers count them by hand. Sapphire Court was first commissioned for a Lagos mayor's ball in 2023 and never left the catalogue.",
    composition:
      "100% cotton hollandais-grade wax print · 122 g/m² · 6 full yards (5.5 m) · 46\u2033 width",
    care: "Cold gentle wash. Do not bleach. Iron on reverse at medium heat.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/sapphire-court.jpg",
    imageFilter: null,
    featured: false,
  },
  {
    slug: "rosewood-ceremonial",
    name: "Rosewood Ceremonial",
    collection: "Celebration",
    colorway: "Burgundy & Antique Gold",
    colorFamily: "Red",
    description:
      "Burgundy damask-inspired motifs gilded with antique gold — our ceremonial flagship. Six yards of pure occasion, made for gele, peplums and procession.",
    story:
      "Rosewood is the cloth we send when we cannot attend the wedding ourselves. The gold is laid by hand roller, so each bolt carries small human imperfections — we call them signatures.",
    composition:
      "100% cotton wax print with hand-rolled gold accents · 132 g/m² · 6 full yards (5.5 m)",
    care: "Dry clean only. Store rolled, never folded, to protect gold accents.",
    priceNaira: 13500,
    compareAtNaira: 17500,
    yards: 6,
    badge: "Limited",
    image: "/images/products/rosewood-ceremonial.jpg",
    imageFilter: null,
    featured: true,
  },
  {
    slug: "champagne-atelier",
    name: "Champagne Atelier",
    collection: "Signature",
    colorway: "Champagne & Ivory",
    colorFamily: "Neutral",
    description:
      "Tone-on-tone woven leaf motifs in champagne and ivory — quiet luxury in cloth form. The Ankara that whispers, for clients who never raise their voice.",
    story:
      "Developed over eighteen months with our mill to achieve a print that reads as texture until you step closer. Champagne Atelier is worn by broadcasters and first daughters alike.",
    composition:
      "100% cotton wax print · 118 g/m² · 6 full yards (5.5 m) · 46\u2033 width",
    care: "Cold gentle wash with like colours. Low iron. Do not wring.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: "New",
    image: "/images/products/champagne-atelier.jpg",
    imageFilter: null,
    featured: true,
  },

  /* ================= COLORWAY SIBLINGS — TWENTY NEW CLOTHS ================= */
  {
    slug: "Ruby red-antique",
    name: "ruby red Antique",
    collection: "Heritage",
    colorway: "Antique Red & Umber",
    colorFamily: "Red",
    description:
      "The Ruby Blossom re-dyed in antique red and umber — the same blessed circle, aged like bronze in a family shrine. A colorway siblings' favourite.",
    story:
      "Clients kept asking for the sunburst in their mother's gold. We ran the same engraved roller through an umber bath and Ola was born — named for the second daughter.",
    composition: WAX + " · antique-dye bath Nº 2",
    care: CARE,
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Ruby Blossom.png",
    imageFilter: "sepia(0.55) saturate(1.5) contrast(1.02)",
    featured: false,
  },
  {
    slug: "eclipse-noir",
    name: "Eclipse Noir",
    collection: "Signature",
    colorway: "Eclipse Monochrome",
    colorFamily: "Noir",
    description:
      "The sunburst rendered in full eclipse — a monochrome silver-black that turns the Heritage circle into modern sculpture. Cut it sharp.",
    story:
      "Our pattern studio's most requested commission of 2025: take the blessing, remove the colour, keep the power. Eclipse is printed on demand in runs of sixty yards.",
    composition: WAX + " · monochrome edition",
    care: CARE,
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: "Limited",
    image: "/images/products/Monochrome Muse.png",
    imageFilter: "grayscale(1) contrast(1.18)",
    featured: false,
  },
  {
    slug: "plum-royale",
    name: "Plum Royale",
    collection: "Celebration",
    colorway: "Plum & Ivory",
    colorFamily: "Red",
    description:
      "The Coral Court lattice dipped in ripe plum — regal, ripe and unapologetic. A bridesmaid favourite that photographs like velvet.",
    story:
      "First mixed for a Port Harcourt senatorial reception, where forty aso-ebi guests wore it in one hall. The dye bath is now a permanent fixture at the mill.",
    composition: "100% cotton hollandais-grade wax print · 135 g/m² suiting weight · 6 full yards (5.5 m) · plum dye bath Nº 4",
    care: "Dry clean recommended for tailored pieces. Cold hand-wash before construction.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Royal Orbit.png",
    imageFilter: "hue-rotate(-28deg) saturate(1.1)",
    featured: false,
  },
  {
    slug: "terracotta-dawn",
    name: "Terracotta Dawn",
    collection: "Heritage",
    colorway: "Terracotta & Bone",
    colorFamily: "Earth",
    description:
      "Coral Court geometry fired to terracotta — the colour of Nok clay at first light. Earthy, grounded, quietly commanding.",
    story:
      "Inspired by a curator's visit from the National Museum: she asked for a cloth the colour of fired earth. The kiln-tone bath runs warm, so every bolt blushes slightly differently.",
    composition: WAX + " · kiln-tone dye bath",
    care: CARE,
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Desert Pebbles.png",
    imageFilter: "sepia(0.75) saturate(1.35)",
    featured: false,
  },
  {
    slug: "empress-jade",
    name: "Empress Jade",
    collection: "Signature",
    colorway: "Bright Jade & Champagne",
    colorFamily: "Green",
    description:
      "Emerald Prestige lifted to luminous jade — the same prestige motifs, brighter, like the cloth caught morning light. Gown-weight with a spring in its drape.",
    story:
      "Mixed for a Lagos bride who wanted green that would outshine the chandeliers. It did. We kept the bath.",
    composition: "100% cotton wax print with champagne foil accents · 118 g/m² · 6 full yards (5.5 m) · jade lift bath",
    care: "Cold gentle wash inside out. Cool iron on reverse; avoid direct iron contact with foil accents.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: "New",
    image: "/images/products/Royal Fern.png",
    imageFilter: "brightness(1.06) saturate(1.22)",
    featured: true,
  },
  {
    slug: "noir-emerald",
    name: "Noir Emerald",
    collection: "Signature",
    colorway: "Smoke & Charcoal",
    colorFamily: "Noir",
    description:
      "The prestige motif stripped to smoke and charcoal — Emerald Prestige in evening shadow. For entrances made after dark.",
    story:
      "Our night cloth. Stylists order it for award-season clients who want texture the cameras catch but the colour never shouts.",
    composition: WAX + " · smoke edition",
    care: CARE,
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Emerald Grid.png",
    imageFilter: "grayscale(0.92) contrast(1.12)",
    featured: false,
  },
  {
    slug: "midnight-navy",
    name: "Midnight Navy",
    collection: "Heritage",
    colorway: "Midnight Navy Tonal",
    colorFamily: "Blue",
    description:
      "Azure Bloom pushed past midnight — navy so deep the circles surface only when you move. Chairman cloth.",
    story:
      "An over-dye experiment left in the vat overnight by an apprentice we have since promoted. The accident became a colourway.",
    composition: "100% cotton, hand-finished wax resist · 130 g/m² · 6 full yards (5.5 m) · triple-dipped",
    care: "Wash cold, separately, inside out. Gentle fading with age is the mark of true indigo.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Azure Bloom.png",
    imageFilter: "brightness(0.9) saturate(1.3) contrast(1.1)",
    featured: false,
  },
  {
    slug: "steel-adire",
    name: "Steel Adire",
    collection: "Signature",
    colorway: "Steel Grey Tonal",
    colorFamily: "Neutral",
    description:
      "The adire circle in tempered steel — a monochrome grey that pairs with everything and flatters everyone. The quietest cloth in the maison.",
    story:
      "Commissioned by an architect who wanted 'a building's grey, but alive'. The resist circles keep their hand-drawn wobble, so the grey never flattens.",
    composition: "100% cotton, hand-finished wax resist · 130 g/m² · 6 full yards (5.5 m) · grey mineral bath",
    care: "Wash cold, separately, inside out. Low iron on reverse.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Sapphire Bubbles.png",
    imageFilter: "grayscale(0.7) brightness(1.05)",
    featured: false,
  },
  {
    slug: "royal-cobalt",
    name: "Royal Cobalt",
    collection: "Celebration",
    colorway: "Electric Cobalt Tonal",
    colorFamily: "Blue",
    description:
      "Royal cobalt electrified — celebratory fashion with voltage. December owambe season, sorted.",
    story:
      "We brightened the classic adire bath for a client's fiftieth — she danced in it till 2am and the colour never dulled under the lights.",
    composition: "100% cotton, hand-finished wax resist · 130 g/m² · 6 full yards (5.5 m) · cobalt lift",
    care: "Wash cold, separately, inside out. Dry away from direct sun.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: "Bestseller",
    image: "/images/products/Whisper.png",
    imageFilter: "saturate(1.45) brightness(1.04) hue-rotate(-8deg)",
    featured: false,
  },
  {
    slug: "desert-rose",
    name: "Desert Rose",
    collection: "Heritage",
    colorway: "Dusty Rose & Cream",
    colorFamily: "Red",
    description:
      "Sahel's acacia flowers blushed to dusty rose — romantic without sweetness. Ties, drapes and photographs like a love letter.",
    story:
      "A groom ordered the whole bridal train in this rose after seeing one yard. He said it looked like the harmattan sky at 6pm. We agreed.",
    composition: WAX + " · rose blush bath",
    care: CARE,
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Autumn Whisper.png",
    imageFilter: "hue-rotate(-22deg) saturate(1.18)",
    featured: false,
  },
  {
    slug: "umber-sahel",
    name: "Umber Sahel",
    collection: "Heritage",
    colorway: "Umber & Toasted Cream",
    colorFamily: "Earth",
    description:
      "The Sahel flower deepened to umber and toasted cream — earth after rain. Our most requested cloth for groom's families.",
    story:
      "Umber is the colour of the compound wall at our founder's family home. This bath is mixed to memory.",
    composition: WAX + " · umber bath Nº 3",
    care: CARE,
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Terra Fusion.png",
    imageFilter: "sepia(0.8) saturate(1.25) contrast(1.02)",
    featured: false,
  },
  {
    slug: "bone-sand",
    name: "Bone & Sand",
    collection: "Signature",
    colorway: "Bone & Sand Tonal",
    colorFamily: "Neutral",
    description:
      "Sahel Bloom sun-bleached to bone and sand — texture first, colour second. The cloth that makes linen look loud.",
    story:
      "Bleached by intention, not accident: a controlled sun-cure softens the ochre to bone while the wax keeps every petal crisp.",
    composition: WAX + " · sun-cured edition",
    care: "Cold gentle wash. Do not re-bleach. Low iron.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/sahel-bloom.jpg",
    imageFilter: "grayscale(0.78) brightness(1.16)",
    featured: false,
  },
  {
    slug: "ivoire-line",
    name: "Ivoire Line",
    collection: "Signature",
    colorway: "Soft Ivory & Pearl",
    colorFamily: "Neutral",
    description:
      "Onyx Regalia lifted toward pearl — the graphic line softened to ivoire. Bridal-white energy with couture geometry.",
    story:
      "Requested by three brides in one month. The ivory ground is kept warm, never clinical, so it reads as shell rather than paper.",
    composition: WAX + " · ivoire edition",
    care: "Dry clean recommended to preserve the pearl ground. Cool iron on reverse.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: "New",
    image: "/images/products/Metro lines.png",
    imageFilter: "grayscale(0.35) brightness(1.18) contrast(0.95)",
    featured: false,
  },
  {
    slug: "espresso-regalia",
    name: "Espresso Regalia",
    collection: "Heritage",
    colorway: "Espresso & Caramel",
    colorFamily: "Earth",
    description:
      "The Onyx line work pulled warm to espresso and caramel — graphic Ankara with a coffee-house calm.",
    story:
      "Named on the spot by a roaster in Yaba who bought the first bolt for his wife. The caramel notes deepen with every wash.",
    composition: WAX + " · espresso warm bath",
    care: CARE,
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Urban Mosaic.png",
    imageFilter: "sepia(0.85) saturate(1.3)",
    featured: false,
  },
  {
    slug: "graphite-regalia",
    name: "Graphite Regalia",
    collection: "Signature",
    colorway: "Graphite & Ink",
    colorFamily: "Noir",
    description:
      "Onyx Regalia hardened to graphite — high-contrast monochrome with real edge. Tailored, it is armour; draped, it is smoke.",
    story:
      "The highest-contrast bath in the maison. Engravers double-ink the roller so the line stays razor-sharp across all six yards.",
    composition: WAX + " · double-ink edition",
    care: "Dry clean recommended. Cool iron on reverse.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/hero.jpg",
    imageFilter: "grayscale(1) contrast(1.28) brightness(0.97)",
    featured: false,
  },
  {
    slug: "cobalt-court",
    name: "Cobalt Court",
    collection: "Celebration",
    colorway: "Deep Cobalt & Ivory",
    colorFamily: "Blue",
    description:
      "Sapphire Court sunk to deep cobalt — the crown motif at full intensity. Groomsmen order this by the half-dozen.",
    story:
      "When Sapphire reads too pale for evening events, Cobalt takes the night shift. The ivory stays bright against it like enamel.",
    composition: "100% cotton hollandais-grade wax print · 122 g/m² · 6 full yards (5.5 m) · cobalt deep bath",
    care: "Cold gentle wash. Do not bleach. Iron on reverse.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Midnight Tribal.png",
    imageFilter: "saturate(1.3) brightness(0.93)",
    featured: false,
  },
  {
    slug: "denim-fade",
    name: "Denim Fade",
    collection: "Heritage",
    colorway: "Faded Denim & Cream",
    colorFamily: "Blue",
    description:
      "Sapphire Court relaxed to a faded denim — the crown motif off duty. Weekend cloth with a royal lineage.",
    story:
      "Washed-down on purpose for clients who wear Ankara on Tuesdays, not just Saturdays. The fade is set at the mill so it never changes.",
    composition: WAX + " · faded wash edition",
    care: CARE,
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Carnival spirit.png",
    imageFilter: "saturate(0.72) brightness(1.1)",
    featured: false,
  },
  {
    slug: "gilded-rosewood",
    name: "Gilded Rosewood",
    collection: "Celebration",
    colorway: "Gilded Bronze & Blue",
    colorFamily: "Gold",
    description:
      "Rosewood Ceremonial turned fully to gold — bronze and amber damask motifs that pour rather than print. The loudest whisper we make.",
    story:
      "The gold roller usually accents the burgundy. For Gilded, the gold takes the whole yard. Reserve early — the roller runs once a quarter.",
    composition: "100% cotton wax print with hand-rolled gold ground · 132 g/m² · 6 full yards (5.5 m)",
    care: "Dry clean only. Store rolled to protect the gold ground.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: "Limited",
    image: "/images/products/Autumn Whisper.png",
    imageFilter: "sepia(0.45) saturate(1.5) hue-rotate(-12deg)",
    featured: true,
  },
  {
    slug: "pearl-ceremonial",
    name: "Pearl Ceremonial",
    collection: "Celebration",
    colorway: "Pearl & Moonstone",
    colorFamily: "Neutral",
    description:
      "The Rosewood damask in pearl — white aso-ebi with architecture. Gele, peplum or column gown: it holds every shape.",
    story:
      "White ceremonial cloth is unforgiving, so we print it last in every run, on a freshly cleaned roller. The pearl ground stays luminous.",
    composition: "100% cotton wax print · 132 g/m² · 6 full yards (5.5 m) · pearl edition",
    care: "Dry clean only. Keep away from turmeric, palm oil and over-enthusiastic aunties.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/Monochrome Muse.png",
    imageFilter: "grayscale(1) brightness(1.28) contrast(0.92)",
    featured: false,
  },
  {
    slug: "argent-atelier",
    name: "Argent Atelier",
    collection: "Signature",
    colorway: "Argent & Mist",
    colorFamily: "Neutral",
    description:
      "Champagne Atelier cooled to argent — silver leaf motifs on mist. Moonlight, woven. Our evening-neutral answer to the champagne original.",
    story:
      "The champagne bath with a cool mineral rinse. Broadcasters ask for it under studio lights, where it reads as quiet silver.",
    composition: WAX + " · argent mineral rinse",
    care: "Cold gentle wash with like colours. Low iron. Do not wring.",
    priceNaira: 13500,
    compareAtNaira: null,
    yards: 6,
    badge: null,
    image: "/images/products/champagne-atelier.jpg",
    imageFilter: "grayscale(0.6) brightness(1.08)",
    featured: false,
  },
];

export const seedReviews: SeedReview[] = [
  { productSlug: "adaeze-sunburst", author: "Chiamaka O.", location: "Lagos, Nigeria", rating: 5, title: "The sunburst is even richer in person", body: "I ordered two bundles for my traditional wedding aso-ebi and the marigold reads like molten gold under event lighting. Wax quality is genuine hollandais — crisp, no powdery residue. Delivery to Lekki took 2 days.", verified: true },
  { productSlug: "adaeze-sunburst", author: "Danielle P.", location: "Atlanta, USA", rating: 5, title: "Worth every naira, shipped to the US in 6 days", body: "I was nervous ordering fabric online from abroad. Dorbrah WhatsApped me real photos of my exact bolt before shipping. My tailor made a two-piece and the print matched perfectly across seams.", verified: true },
  { productSlug: "adaeze-sunburst", author: "Emeka N.", location: "Port Harcourt, Nigeria", rating: 4, title: "Beautiful, runs slightly stiff at first", body: "The crackle finish is stunning. Fabric felt stiff from the wax but softened after one cold wash as the care card said. Colour has not faded at all after three months.", verified: true },
  { productSlug: "adaeze-sunburst", author: "Amara E.", location: "Houston, USA", rating: 5, title: "My third order and the quality never slips", body: "Every yard arrived flat-rolled with a hand-written note. This is how luxury retail should feel. The indigo depth is unreal.", verified: true },

  { productSlug: "lagos-coral-court", author: "Tunde A.", location: "Toronto, Canada", rating: 5, title: "Made my groom's suit — guests lost their minds", body: "The suiting weight is real. My tailor in Toronto had never sewn Ankara this structured. The coral is sophisticated, not loud. Paid on delivery when it arrived in 8 days.", verified: true },
  { productSlug: "lagos-coral-court", author: "Folake A.", location: "London, UK", rating: 5, title: "Benin royalty energy", body: "I bought this for my father's chieftaincy title. The diamond lattice photographs like lace from a distance. Immaculate packaging, customs paperwork handled perfectly.", verified: true },
  { productSlug: "lagos-coral-court", author: "Zainab B.", location: "Abuja, Nigeria", rating: 4, title: "Gorgeous but order early", body: "It sold out twice while I was deciding — that tells you everything. Fabric is heavier than standard Ankara which is exactly what I wanted for a blazer.", verified: true },

  { productSlug: "emerald-prestige", author: "Ngozi U.", location: "Enugu, Nigeria", rating: 5, title: "The gown-weight drape is a dream", body: "My dressmaker said it was the easiest Ankara she has ever cut. The champagne accents catch light like jewellery. I wore it to my sister's church wedding and was photographed all night.", verified: true },
  { productSlug: "emerald-prestige", author: "Aisha K.", location: "Dubai, UAE", rating: 5, title: "Quietly the best fabric I own", body: "Arrived in Dubai in 5 days with full tracking. The emerald is deep and serious — exactly like the campaign photos. Already eyeing Onyx Regalia next.", verified: true },
  { productSlug: "emerald-prestige", author: "Blessing I.", location: "Owerri, Nigeria", rating: 4, title: "Stunning, mind the foil when ironing", body: "Follow the care instructions — I nearly ironed the foil accents directly. Fabric itself is superb, rich weight, zero flaws across all six yards.", verified: true },

  { productSlug: "indigo-alaba", author: "Chief Okonkwo E.", location: "Awka, Nigeria", rating: 5, title: "My agbada for every occasion now", body: "This is how our cloth should be sold to the world. The tonal circles are subtle and expensive-looking. I have ordered three more bundles for my sons.", verified: true },
  { productSlug: "indigo-alaba", author: "Kwame M.", location: "Accra, Ghana", rating: 5, title: "Adire tradition, flawless execution", body: "As someone from a kente family, I am hard to impress. The over-dye depth varies gently across the yard exactly as described. Regional shipping to Accra was smooth and insured.", verified: true },
  { productSlug: "indigo-alaba", author: "Samuel O.", location: "Leicester, UK", rating: 4, title: "Sophisticated cloth", body: "Smelled faintly of wax on arrival which aired out in a day. The indigo is the real deal — it fades gracefully like good denim. Would love a lighter-weight version.", verified: true },
  { productSlug: "indigo-alaba", author: "Halima D.", location: "Kano, Nigeria", rating: 5, title: "Pay on delivery made it easy", body: "Ordered Thursday, paid the rider Monday in Kano. Fabric matched the photos exactly. The restraint of this print is what makes it luxury.", verified: true },

  { productSlug: "sahel-bloom", author: "Rukayat S.", location: "Ilorin, Nigeria", rating: 5, title: "Our entire bridal train wore Sahel", body: "Twelve yards for my sisters and I, all from the same dye lot so the ochre matched perfectly. The florals are delicate — nothing like the loud prints you find in Balogun market.", verified: true },
  { productSlug: "sahel-bloom", author: "Grace T.", location: "Johannesburg, South Africa", rating: 5, title: "Moves beautifully", body: "Made a wrap dress that swirls when I walk. The cream ground is warm, not chalky. Shipping to South Africa took 7 days with full tracking.", verified: true },

  { productSlug: "onyx-regalia", author: "Adaeze K.", location: "Lagos, Nigeria", rating: 5, title: "The numbered run is a beautiful touch", body: "My bundle was number 118 of 400 with a certificate card. The monochrome graphic reads as couture jacquard — I wore a trouser suit to Art Week and was asked about it constantly.", verified: true },
  { productSlug: "onyx-regalia", author: "Michelle B.", location: "Washington DC, USA", rating: 5, title: "Ankara for the boardroom", body: "Finally a print I can wear to work without feeling costumey. The ivory ground is substantial, not see-through. Customer service replied on WhatsApp within minutes.", verified: true },
  { productSlug: "onyx-regalia", author: "Dayo F.", location: "Ibadan, Nigeria", rating: 5, title: "Sharp does not begin to cover it", body: "My tailor used all six yards for a jacket and wide-leg trousers with print-matched seams. The geometry is perfectly registered — no off-grid repeats anywhere.", verified: true },

  { productSlug: "sapphire-court", author: "Ibrahim Y.", location: "Kaduna, Nigeria", rating: 5, title: "Groomsmen approved", body: "Bought four bundles for my wedding party. The crown motif is classy and the sapphire matches senator caps perfectly. Pay-on-delivery option sealed the deal for my groomsmen.", verified: true },
  { productSlug: "sapphire-court", author: "Patricia N.", location: "Manchester, UK", rating: 4, title: "Lovely celebratory cloth", body: "Slightly lighter weight than Rosewood but drapes well. The ivory keeps it from feeling heavy. December owambe season essential.", verified: true },

  { productSlug: "rosewood-ceremonial", author: "Mrs. Adeyemi", location: "Abeokuta, Nigeria", rating: 5, title: "The gold is laid by hand — you can feel it", body: "I have bought Ankara for forty years. This is the finest wax cloth sold under a Nigerian name today. My gele held its shape through an eight-hour reception.", verified: true },
  { productSlug: "rosewood-ceremonial", author: "Chidinma O.", location: "Dallas, USA", rating: 5, title: "Flew with it, wore it, conquered", body: "Carried it in my hand luggage because I did not trust it to check. The burgundy photographs like old wine. Dorbrah handled the export paperwork flawlessly.", verified: true },
  { productSlug: "rosewood-ceremonial", author: "Yemi A.", location: "Lagos, Nigeria", rating: 5, title: "Ceremonial in the truest sense", body: "Wore it to receive my chieftaincy title. The weight and drape command respect before you say a word. Expensive? For this quality, no.", verified: true },

  { productSlug: "champagne-atelier", author: "Amaka J.", location: "Asaba, Nigeria", rating: 5, title: "The whisper print", body: "Exactly as promised — reads as texture until someone steps close. I made a column dress and wore it to a gallery opening. Three people asked if it was European couture.", verified: true },
  { productSlug: "champagne-atelier", author: "Sophia L.", location: "Nairobi, Kenya", rating: 5, title: "Understated luxury, delivered in 6 days", body: "The tone-on-tone leaf motif is exquisite. Packaging was beautiful — tissue, wax seal, care card. This is my new standard for buying African fabric online.", verified: true },

  /* ---------- reviews for the twenty new cloths ---------- */
  { productSlug: "ola-gold-antique", author: "Chinwe A.", location: "Onitsha, Nigeria", rating: 5, title: "Pure heritage gold", body: "The antique gold reads like my grandmother's wrappers from the seventies — in the best possible way. Washed twice, zero fade.", verified: true },
  { productSlug: "ola-gold-antique", author: "Kemi R.", location: "London, UK", rating: 4, title: "Warmer than the photos", body: "Arrived richer and warmer than the listing pictures. My tailor made an iro and buba that stopped the reception.", verified: true },

  { productSlug: "eclipse-noir", author: "Tari E.", location: "Port Harcourt, Nigeria", rating: 5, title: "Monochrome drama", body: "Wore it as a jumpsuit to a gallery opening. The greyscale sunburst reads like a photograph. Absolutely luxe.", verified: true },
  { productSlug: "eclipse-noir", author: "Bolanle S.", location: "Lekki, Nigeria", rating: 4, title: "Heavy in the best way", body: "Stunning print, slightly heavier than expected, but it tailors into structure you cannot buy off the rack.", verified: true },

  { productSlug: "plum-royale", author: "Uche M.", location: "Enugu, Nigeria", rating: 5, title: "Royal indeed", body: "Our entire bridal train wore Plum Royale. The colour is ripe without being loud, and every bundle matched perfectly.", verified: true },
  { productSlug: "plum-royale", author: "Sandra O.", location: "Chicago, USA", rating: 5, title: "Velvet energy, cotton reality", body: "Photographs like velvet under warm light. Customs was smooth, tracking was constant. Dorbrah concierge is elite.", verified: true },

  { productSlug: "terracotta-dawn", author: "Fati A.", location: "Jos, Nigeria", rating: 5, title: "Warmth in cloth form", body: "The kiln-tone bath is real — my bolt blushed slightly deeper than my sister's, which we now call character.", verified: true },

  { productSlug: "empress-jade", author: "Renee W.", location: "Chicago, USA", rating: 5, title: "The jade glows", body: "Brighter and livelier than emerald prestige. Made a mermaid gown for my cousin's white wedding — the photos are unreal.", verified: true },
  { productSlug: "empress-jade", author: "Osas I.", location: "Benin City, Nigeria", rating: 5, title: "Outshone the chandeliers", body: "Bought it for my title-taking. The lift in the green is subtle but everyone asked who made my dress. Dorbrah. Obviously.", verified: true },

  { productSlug: "noir-emerald", author: "Halima R.", location: "Kaduna, Nigeria", rating: 5, title: "Quiet power", body: "The smoke grey keeps the prestige motif but lowers the voice. Perfect for evening events where you want presence, not volume.", verified: true },

  { productSlug: "midnight-navy", author: "Tobi A.", location: "Ibadan, Nigeria", rating: 4, title: "Deeper than midnight", body: "The circles only surface when you move — exactly as described. Lost one star only because I now want it in every cloth.", verified: true },
  { productSlug: "midnight-navy", author: "Efe J.", location: "Warri, Nigeria", rating: 5, title: "Chairman cloth confirmed", body: "My father wore his to three events in one month. The triple-dip depth is serious — no fading after washes.", verified: true },

  { productSlug: "steel-adire", author: "Nkechi O.", location: "Asaba, Nigeria", rating: 5, title: "Modern adire", body: "The grey is architectural. I made a shirt dress and wear it to client meetings — the wobble in the circles keeps it human.", verified: true },

  { productSlug: "royal-cobalt", author: "Deji O.", location: "Akure, Nigeria", rating: 5, title: "Owambe magnet", body: "Wore it to a December owambe and was photographed more than the couple. The cobalt lift under event lights is dangerous.", verified: true },
  { productSlug: "royal-cobalt", author: "Amina Y.", location: "Bauchi, Nigeria", rating: 5, title: "Paid on delivery in Bauchi", body: "Rider arrived in 3 days, paid cash at my gate. The cobalt is even more electric in person. Ordering two more.", verified: true },

  { productSlug: "desert-rose", author: "Maryam S.", location: "Sokoto, Nigeria", rating: 5, title: "Blush and dust", body: "Romantic without being sweet — exactly the brief. My wrap dress photographs like a love letter from the harmattan.", verified: true },

  { productSlug: "umber-sahel", author: "Grace B.", location: "Yola, Nigeria", rating: 4, title: "Earthen elegance", body: "Deep, grounded, serious. The umber reads slightly different in daylight vs indoors — both are beautiful.", verified: true },

  { productSlug: "bone-sand", author: "Elo E.", location: "Warri, Nigeria", rating: 5, title: "Quiet luxury defined", body: "This is the cloth that made my linen wardrobe look loud. Bone and sand, texture first. Immaculate.", verified: true },

  { productSlug: "ivoire-line", author: "Vanessa K.", location: "Paris, France", rating: 5, title: "Couture geometry", body: "My couturier assumed it was a Parisian jacquard. The pearl ground is warm, never clinical. Bridal-white energy done right.", verified: true },
  { productSlug: "ivoire-line", author: "Bisi T.", location: "Abeokuta, Nigeria", rating: 5, title: "My wedding cloth", body: "Wore it for my white wedding reception. The graphic line gave the ivory architecture — photographs like sculpture.", verified: true },

  { productSlug: "espresso-regalia", author: "Chika U.", location: "Orlu, Nigeria", rating: 5, title: "Rich as coffee", body: "The caramel notes really do deepen with washing. Six months in, this is my favourite cloth in a full wardrobe of them.", verified: true },

  { productSlug: "graphite-regalia", author: "Segun A.", location: "Abeokuta, Nigeria", rating: 5, title: "Boardroom armour", body: "Double-ink is not marketing — the line stays razor sharp across every repeat. Tailored into a suit that means business.", verified: true },
  { productSlug: "graphite-regalia", author: "Lara M.", location: "Lagos, Nigeria", rating: 5, title: "Edge without noise", body: "High contrast but somehow calm. Draped as a skirt it reads like smoke; tailored, it is pure structure.", verified: true },

  { productSlug: "cobalt-court", author: "Musa D.", location: "Katsina, Nigeria", rating: 4, title: "The crown motif shines", body: "Deeper and more intense than Sapphire Court. Perfect for evening receptions. Ivory enamel accents stay bright.", verified: true },

  { productSlug: "denim-fade", author: "Ada N.", location: "Nsukka, Nigeria", rating: 5, title: "Everyday royalty", body: "Finally an Ankara I wear on Tuesdays. The fade is fixed at the mill so it never changes — genius.", verified: true },
  { productSlug: "denim-fade", author: "Junior O.", location: "Calabar, Nigeria", rating: 5, title: "Weekend rotation essential", body: "Made camp shirts for myself and my brothers. Relaxed, royal, repeat. The concierge even suggested the fade for casual wear.", verified: true },

  { productSlug: "gilded-rosewood", author: "Mrs. Okafor", location: "Awka, Nigeria", rating: 5, title: "Worth every naira", body: "The gold pours rather than prints. I have attended a thousand owambe — nothing in the hall touched this cloth.", verified: true },
  { productSlug: "gilded-rosewood", author: "Titi B.", location: "Lagos, Nigeria", rating: 5, title: "Reserve early, believe the hype", body: "Waited six weeks for the quarterly roller run. Worth it. My gele in Gilded gold was photographed from three tables away.", verified: true },

  { productSlug: "pearl-ceremonial", author: "Temi A.", location: "Houston, USA", rating: 5, title: "My white aso-ebi dream", body: "Pearl with architecture — it held every fold of my gele through a nine-hour celebration. Flown to Houston in 6 days.", verified: true },

  { productSlug: "argent-atelier", author: "Zainab L.", location: "Minna, Nigeria", rating: 5, title: "Silver whispers", body: "Under studio lights it reads as quiet silver, exactly as the maison promised. My new broadcast wardrobe is all Argent.", verified: true },
  { productSlug: "argent-atelier", author: "Celine D.", location: "Brussels, Belgium", rating: 5, title: "Moonlight, woven", body: "Cooled champagne is the perfect description. Elegant beyond measure — the mist ground is unlike anything in Brussels.", verified: true },
];

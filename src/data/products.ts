export type Product = {
  id: string
  name: string
  price: number
  ageRange: string
  description: string
  tagline: string
  slug: string
  colors: string[]
  image: string
  category: 'dolls' | 'clothing' | 'accessories' | 'books'
  type:
    | 'classic'
    | 'historical'
    | 'modern'
    | 'limited'
    | 'best-sellers'
    | 'everyday'
    | 'party'
    | 'school'
    | 'sleep'
    | 'seasonal'
    | 'hair'
    | 'travel'
    | 'play'
    | 'room'
    | 'pets'
    | 'story'
    | 'activity'
  badge?: string
}

const palette = [
  'Soft blush',
  'Denim',
  'White',
  'Lilac',
  'Rose',
  'Gold',
  'Ivory',
  'Ruby',
  'Navy',
  'Plaid',
  'Cream',
  'Lavender',
  'Cloud',
  'Pink',
  'Silver',
  'Rust',
  'Olive',
  'Ice blue',
  'Teal',
  'Sage',
  'Cocoa',
  'Peach',
  'Mint',
  'Sky',
]

const buildColors = (start: number) => [
  palette[start % palette.length],
  palette[(start + 1) % palette.length],
  palette[(start + 2) % palette.length],
]

const dollPriceMap: Record<
  Extract<Product['type'], 'classic' | 'modern' | 'historical' | 'limited' | 'best-sellers'>,
  number[]
> = {
  classic: [159, 141, 134, 146, 138, 182, 143, 157, 136, 149, 131, 154, 139, 147, 142, 156, 133, 151, 145, 158],
  modern: [139, 153, 146, 161, 142, 168, 150, 164, 144, 159, 148, 166, 141, 155, 162, 147, 170, 152, 158, 165],
  historical: [149, 162, 154, 171, 157, 176, 160, 169, 152, 173, 158, 180, 155, 167, 172, 161, 178, 163, 175, 182],
  limited: [165, 178, 171, 189, 174, 196, 168, 185, 176, 192, 170, 199, 173, 187, 194, 169, 201, 175, 190, 198],
  'best-sellers': [159, 172, 165, 184, 168, 188, 161, 179, 170, 186, 163, 191, 167, 181, 176, 169, 193, 173, 182, 189],
}

const getDollPrice = (type: Extract<Product['type'], 'classic' | 'modern' | 'historical' | 'limited' | 'best-sellers'>, index: number) =>
  dollPriceMap[type][index % dollPriceMap[type].length]

const buildImage = (category: Product['category'], type: Product['type'], name: string) => {
  const background = category === 'dolls' ? '#FDE2EF' : category === 'clothing' ? '#FCE7F3' : category === 'accessories' ? '#FDF2F8' : '#FCE7F3'
  const accent = category === 'dolls' ? '#CC4B87' : category === 'clothing' ? '#F472B6' : category === 'accessories' ? '#F9A8D4' : '#E879F9'
  const icon =
    category === 'dolls'
      ? '<circle cx="200" cy="150" r="60" fill="' + accent + '" />'
      : category === 'clothing'
        ? '<path d="M140 110L200 80L260 110L300 170L250 200L240 320H160L150 200L100 170L140 110Z" fill="' + accent + '" />'
        : category === 'accessories'
          ? '<circle cx="150" cy="160" r="55" fill="' + accent + '" /><circle cx="250" cy="160" r="55" fill="#F472B6" />'
          : '<rect x="120" y="120" width="160" height="180" rx="18" fill="' + accent + '" />'
  const label = `${type.replace('-', ' ')} ${category}`
  const svg = `
    <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" rx="48" fill="${background}"/>
      ${icon}
      <text x="200" y="300" text-anchor="middle" font-size="22" font-family="Inter, sans-serif" fill="#7C2D5B">${name}</text>
      <text x="200" y="334" text-anchor="middle" font-size="16" font-family="Inter, sans-serif" fill="#9D3A6D">${label}</text>
    </svg>
  `.trim()
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const imageOverrides: Record<string, string> = {
  'dolls-classic-1': '/images/kira.png',
  'dolls-classic-2': '/images/kim.png',
  'dolls-classic-3': '/images/tara.png',
  'dolls-classic-4': '/images/bella.png',
  'dolls-classic-5': '/images/anna.png',
  'dolls-classic-6': '/images/saira-3.png',
}

const createSeries = (
  category: Product['category'],
  type: Product['type'],
  names: string[],
  priceStart: number,
  taglineBase: string,
  descriptor: string,
) =>
  names.map((name, index) => {
    const id = `${category}-${type}-${index + 1}`

    return {
      id,
      name,
      price:
        category === 'dolls'
          ? getDollPrice(
              type as Extract<Product['type'], 'classic' | 'modern' | 'historical' | 'limited' | 'best-sellers'>,
              index,
            )
          : priceStart + (index % 7),
      ageRange: category === 'books' ? 'Ages 6+' : 'Fits 18" dolls',
      description: `${descriptor} ${name}.`,
      tagline: `${taglineBase} ${name.split(' ')[0]}`,
      slug: `${category}-${type}-${index + 1}`,
      colors: buildColors(index + priceStart),
      image: imageOverrides[id] ?? buildImage(category, type, name),
      category,
      type,
    }
  })

const clothingItems = [
  ...createSeries(
    'clothing',
    'everyday',
    [
      'Sunny Stroll Set',
      'Weekend Denim Set',
      'City Walk Layering',
      'Canvas Sneakers Look',
      'Studio Arts Outfit',
      'Playground Classic Set',
      'Café Brunch Look',
      'Picnic Patch Set',
      'Riverside Hoodie Fit',
      'Craft Day Ensemble',
      'Bookstore Cozy Look',
      'Soft Knit Combo',
      'Trailblazer Active Set',
      'Pocket Tee Pairing',
      'Seaside Stripe Set',
      'Downtown Daywear',
      'Lavender Lane Outfit',
      'Everyday Utility Set',
      'Spring Breeze Combo',
      'Market Day Look',
    ],
    34,
    'Everyday favorites:',
    'A versatile everyday outfit featuring mix-and-match staples for',
  ),
  ...createSeries(
    'clothing',
    'party',
    [
      'Sparkle Soirée Dress',
      'Velvet Gala Set',
      'Twilight Tulle Look',
      'Midnight Shimmer Set',
      'Confetti Celebration Dress',
      'Golden Hour Gown',
      'Rosette Party Set',
      'Champagne Glitter Look',
      'Starlight Satin Dress',
      'Crystal Bow Ensemble',
      'Radiant Ribbon Set',
      'Moonlight Garden Look',
      'Pearl Party Dress',
      'Festive Lace Set',
      'Firework Fringe Dress',
      'Gala Night Outfit',
      'Blush Spark Dress',
      'Hollyday Velvet Set',
      'Silver Shine Ensemble',
      'Petal Party Look',
    ],
    42,
    'Party ready:',
    'A festive party look designed for celebrations and photo moments with',
  ),
  ...createSeries(
    'clothing',
    'school',
    [
      'Campus Cardigan Look',
      'Morning Assembly Set',
      'Prep School Outfit',
      'Library Day Uniform',
      'Honor Roll Ensemble',
      'Clever Scholar Set',
      'Classroom Classic Look',
      'Notebook Chic Outfit',
      'Debate Club Set',
      'Heritage Plaid Ensemble',
      'School Spirit Look',
      'Art Class Uniform',
      'Science Lab Set',
      'Lunch Break Outfit',
      'Playground Prep Look',
      'Study Hall Set',
      'After School Outfit',
      'Polished Plaid Set',
      'Campus Walk Look',
      'Hallway Hero Set',
    ],
    36,
    'School styles:',
    'A polished school-inspired outfit designed for busy days with',
  ),
  ...createSeries(
    'clothing',
    'sleep',
    [
      'Starlight Pajama Set',
      'Dreamy Robe Look',
      'Cloud Cozy Set',
      'Midnight Moon PJs',
      'Sleepover Stripe Set',
      'Warm Cocoa Pajamas',
      'Lavender Lullaby Set',
      'Snuggle Night Outfit',
      'Morning Cocoa Set',
      'Pillow Party PJs',
      'Twinkle Nightwear',
      'Fuzzy Slipper Set',
      'Soft Glow Pajamas',
      'Dream Journal Set',
      'Cozy Hearth PJs',
      'Sleepy Star Outfit',
      'Sunrise Lounge Set',
      'Bedtime Bow Set',
      'Sweet Dreams PJs',
      'Storytime Sleepwear',
    ],
    32,
    'Sleepwear picks:',
    'A cozy sleepwear look made for bedtime stories and restful nights with',
  ),
  ...createSeries(
    'clothing',
    'seasonal',
    [
      'Autumn Adventure Set',
      'Winter Warmth Outfit',
      'Spring Meadow Look',
      'Summer Seaside Set',
      'Harvest Festival Outfit',
      'Snow Day Ensemble',
      'Blooming Garden Set',
      'Sunset Beach Outfit',
      'Crisp Air Layering',
      'Frosty Morning Set',
      'Cherry Blossom Look',
      'Sunny Picnic Outfit',
      'Leaf Pile Adventure',
      'Holiday Lights Set',
      'April Showers Outfit',
      'Wildflower Walk Set',
      'Firefly Summer Look',
      'Cozy Cabin Ensemble',
      'Festival Seasons Set',
      'First Snow Outfit',
    ],
    44,
    'Seasonal favorites:',
    'A seasonal outfit designed for weather-ready adventures with',
  ),
]

const dollItems = [
  ...createSeries(
    'dolls',
    'classic',
    [
      'Kira',
      'Kim',
      'Tara',
      'Bella',
      'Anna',
      'Saira',
      'Lila Rose',
      'Nora June',
      'Hazel Bloom',
      'Tessa June',
      'Poppy Skye',
      'Mila Hart',
      'Eliza Rain',
      'Maisie Pearl',
      'Violet Lane',
      'Sadie Reed',
      'Ruby Hart',
      'Willow Grace',
      'Daisy Quinn',
      'Fiona Rose',
    ],
    129,
    'Classic doll:',
    'A classic doll with a warm smile and signature style named',
  ),
  ...createSeries(
    'dolls',
    'modern',
    [
      'Maya Star',
      'Sky Harper',
      'Nova Lane',
      'Zara Sage',
      'Riley Quinn',
      'Ava Cruz',
      'Remi Chase',
      'Jade Phoenix',
      'Indie West',
      'Sloane Vega',
      'Kira Nova',
      'Aria Lane',
      'Blair Sato',
      'Cleo Park',
      'Reese Atlas',
      'Juno Skye',
      'Emery Coast',
      'Piper Sol',
      'Briar Knox',
      'Lennon Vale',
    ],
    135,
    'Modern doll:',
    'A modern doll with fresh style and adventurous spirit named',
  ),
  ...createSeries(
    'dolls',
    'historical',
    [
      'Harriet Rose',
      'Odette Grace',
      'Beatrice Lane',
      'Vera Whitfield',
      'Clara Whitby',
      'Eleanor Vale',
      'Josephine Hart',
      'Margot Quinn',
      'Edith Wren',
      'Adelaide Finch',
      'Florence Hart',
      'Juliet Vale',
      'Hannah Blythe',
      'Cecilia Moore',
      'Louisa Gray',
      'Rosemary Kent',
      'Mabel Hart',
      'Dorothy Lane',
      'Greta Hale',
      'Matilda Page',
    ],
    145,
    'Historical doll:',
    'A heritage-inspired doll with timeless details named',
  ),
  ...createSeries(
    'dolls',
    'limited',
    [
      'Sage Willow',
      'Aurelia Dawn',
      'Celeste Ember',
      'Isla Bloom',
      'Aurora Skye',
      'Lyra Moon',
      'Seraphina Vale',
      'Opal Skye',
      'Maris Gold',
      'Eden Lark',
      'Selene Cove',
      'Indigo Fay',
      'Zinnia Rose',
      'Coral Mae',
      'Freya Lux',
      'Pearl Sun',
      'Nova Sage',
      'Iris Dawn',
      'Lyric Vale',
      'Solstice Rae',
    ],
    149,
    'Limited doll:',
    'A limited edition doll with collectible details named',
  ),
  ...createSeries(
    'dolls',
    'best-sellers',
    [
      'Luna Bloom',
      'Emma Vale',
      'Ruby Hart',
      'Lila Rose',
      'Nora June',
      'Mila Hart',
      'Poppy Skye',
      'Hazel Bloom',
      'Tessa June',
      'Amelia Lane',
      'Grace Harbor',
      'Sadie Reed',
      'Daisy Quinn',
      'Fiona Rose',
      'Maisie Pearl',
      'Violet Lane',
      'Willow Grace',
      'Olivia May',
      'Eliza Rain',
      'Clara Joy',
    ],
    135,
    'Best seller:',
    'A fan favorite doll known for its timeless style named',
  ),
]

const accessoryItems = [
  ...createSeries(
    'accessories',
    'hair',
    [
      'Hair Styling Kit',
      'Braids & Beads Kit',
      'Ribbon Bow Set',
      'Glossy Clips Pack',
      'Curl & Style Set',
      'Playful Scrunchies',
      'Braid Charm Kit',
      'Pastel Pin Set',
      'Holiday Hair Pack',
      'Sparkle Barrettes',
      'Flower Crown Kit',
      'Retro Headband Set',
      'Studio Styling Kit',
      'Mermaid Hair Pack',
      'Neon Twist Set',
      'Pearl Pin Pack',
      'Bunny Ear Headband',
      'Soft Braid Kit',
      'Starlight Clips',
      'Velvet Ribbon Set',
    ],
    22,
    'Hair accessory:',
    'A styling accessory pack to refresh doll hair named',
  ),
  ...createSeries(
    'accessories',
    'travel',
    [
      'Travel Adventure Set',
      'City Explorer Pack',
      'Weekend Getaway Kit',
      'Coastal Trip Set',
      'Passport & Map Pack',
      'Mountain Trail Kit',
      'Jet Set Essentials',
      'Overnight Bag Set',
      'Train Ride Pack',
      'Adventure Compass Kit',
      'Holiday Travel Set',
      'Road Trip Pack',
      'Explorer Tote Set',
      'Airport Ready Kit',
      'Globe Trotter Pack',
      'Scenic Journey Set',
      'Backpack Adventure',
      'Sunset Cruise Kit',
      'Vintage Travel Pack',
      'Weekend Wander Set',
    ],
    28,
    'Travel accessory:',
    'A travel-inspired accessory set for adventures named',
  ),
  ...createSeries(
    'accessories',
    'play',
    [
      'Playtime Accessory Pack',
      'Sports Day Kit',
      'Art Studio Pack',
      'Garden Play Set',
      'Baking Fun Kit',
      'Music Practice Set',
      'Outdoor Games Pack',
      'Craft Time Kit',
      'Dance Class Set',
      'Skate Park Pack',
      'Picnic Play Set',
      'Campfire Fun Pack',
      'Science Lab Kit',
      'Storytime Puppet Set',
      'Pet Care Kit',
      'Fashion Studio Pack',
      'Holiday Craft Set',
      'Beach Play Pack',
      'Tea Party Kit',
      'Adventure Quest Pack',
    ],
    24,
    'Play accessory:',
    'A playful accessory kit designed for imaginative play named',
  ),
  ...createSeries(
    'accessories',
    'room',
    [
      'Cozy Room Decor Set',
      'Twinkle Lights Set',
      'Reading Nook Pack',
      'Bedtime Lantern Set',
      'Mini Gallery Decor',
      'Soft Rug & Pillow Set',
      'Window Garden Kit',
      'Desk Organization Pack',
      'Mirror & Vanity Set',
      'Wall Art Trio',
      'Shelf Styling Pack',
      'Relaxing Lounge Set',
      'Dreamy Canopy Kit',
      'Warm Glow Decor',
      'Seaside Room Set',
      'Holiday Room Pack',
      'Studio Loft Decor',
      'Blooming Room Set',
      'Sunrise Decor Kit',
      'Classic Room Accents',
    ],
    26,
    'Room decor:',
    'A room accessory set to decorate doll spaces named',
  ),
  ...createSeries(
    'accessories',
    'pets',
    [
      'Pets & Companions Set',
      'Kitten Companion Set',
      'Puppy Park Pack',
      'Bunny Friend Kit',
      'Horse Care Set',
      'Birdsong Buddy Kit',
      'Puppy Sleepover Pack',
      'Pet Grooming Set',
      'Kitten Play Kit',
      'Pet Travel Pack',
      'Golden Pup Set',
      'Tiny Turtle Kit',
      'Pet Picnic Pack',
      'Fluffy Friend Set',
      'Calico Cat Kit',
      'Paw Print Pack',
      'Playful Pup Kit',
      'Farm Friend Set',
      'Nature Buddy Pack',
      'Companion Cozy Set',
    ],
    25,
    'Pet accessory:',
    'A companion accessory kit for doll pets named',
  ),
]

const bookItems = [
  ...createSeries(
    'books',
    'story',
    [
      'Storybook Collection',
      'Adventure Stories',
      'Friendship Tales',
      'Mystery at Maple Lane',
      'Campfire Stories',
      'City Lights Storybook',
      'Seaside Stories',
      'Garden Gate Tales',
      'Winter Wonder Stories',
      'Springtime Stories',
      'Courageous Hearts',
      'The Big Day Chronicles',
      'Moonlight Stories',
      'Dreamer Diaries',
      'Heritage Stories',
      'Rising Star Stories',
      'Holiday Storybook',
      'Trailblazer Tales',
      'Sunrise Stories',
      'Kindness Storybook',
    ],
    18,
    'Storybook:',
    'A storybook collection filled with new adventures titled',
  ),
  ...createSeries(
    'books',
    'activity',
    [
      'Adventure Activity Journal',
      'Story Sticker Book',
      'Creative Prompt Journal',
      'Friendship Activity Book',
      'Story Builder Notebook',
      'Craft & Color Book',
      'Sparkle Sticker Pack',
      'Dream Journal',
      'Travel Activity Book',
      'Imagination Workbook',
      'Character Creator Guide',
      'Storytime Puzzle Book',
      'Art & Craft Journal',
      'Adventure Passport Book',
      'Mystery Activity Book',
      'Kindness Journal',
      'Seasonal Activity Book',
      'Creative Playbook',
      'Storytelling Deck',
      'Draw & Design Book',
    ],
    14,
    'Activity book:',
    'An activity book packed with prompts and creative fun titled',
  ),
]

export const products: Product[] = [
  ...dollItems,
  ...clothingItems,
  ...accessoryItems,
  ...bookItems,
]

export const featuredProducts = products.slice(0, 3)

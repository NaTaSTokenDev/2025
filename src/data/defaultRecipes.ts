import { Recipe } from '../types';

export const defaultRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Basic Agar Recipe',
    category: 'agar',
    ingredients: [
      '20g Agar Powder',
      '20g Light Malt Extract',
      '2g Nutritional Yeast',
      '1000ml Water'
    ],
    steps: [
      'Mix all dry ingredients in a clean container',
      'Add water and stir thoroughly',
      'Heat mixture until it begins to boil, stirring occasionally',
      'Reduce heat and simmer for 5 minutes',
      'Pour into sterilized containers while still hot',
      'Sterilize in pressure cooker at 15 PSI for 45 minutes'
    ],
    notes: 'Store plates upside down after cooling to prevent condensation drips',
    createdAt: new Date('2024-01-01'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '2',
    title: 'Lion\'s Mane Liquid Culture',
    category: 'liquid-culture',
    ingredients: [
      '20g Light Malt Extract',
      '1g Peptone',
      '1000ml Water'
    ],
    steps: [
      'Mix ingredients in a clean container',
      'Heat while stirring until fully dissolved',
      'Fill mason jars leaving 30% headspace',
      'Add magnetic stir bar (optional)',
      'Cover with synthetic filter patch lid',
      'Pressure cook at 15 PSI for 30 minutes'
    ],
    notes: 'Ideal for Lion\'s Mane mycelium growth',
    createdAt: new Date('2024-01-02'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '3',
    title: 'Enriched Hardwood Substrate',
    category: 'substrate',
    ingredients: [
      '5kg Hardwood Pellets',
      '1.25kg Wheat Bran',
      '50g Gypsum',
      'Water to field capacity'
    ],
    steps: [
      'Mix dry ingredients thoroughly',
      'Add water until proper moisture content is reached',
      'Fill bags leaving room for gas exchange',
      'Sterilize at 15 PSI for 2.5 hours'
    ],
    notes: 'Excellent for wood-loving species',
    createdAt: new Date('2024-01-03'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '4',
    title: 'Potato Dextrose Agar (PDA)',
    category: 'agar',
    ingredients: [
      '200g Potato (diced)',
      '20g Dextrose',
      '20g Agar Powder',
      '1000ml Water'
    ],
    steps: [
      'Boil potatoes until soft, about 20 minutes',
      'Strain and keep water, mash potatoes',
      'Add dextrose and agar to potato water',
      'Heat until boiling while stirring',
      'Pour into plates',
      'Sterilize at 15 PSI for 45 minutes'
    ],
    notes: 'Rich nutrient agar ideal for most species',
    createdAt: new Date('2024-01-04'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '5',
    title: 'Honey Liquid Culture',
    category: 'liquid-culture',
    ingredients: [
      '4 tbsp Raw Honey',
      '1000ml Water',
      '1g Peptone (optional)'
    ],
    steps: [
      'Mix honey with warm water',
      'Add peptone if using',
      'Fill jars with mixture',
      'Add self-healing injection ports',
      'Cover with micropore tape',
      'Pressure cook at 15 PSI for 30 minutes'
    ],
    notes: 'Simple and effective LC recipe',
    createdAt: new Date('2024-01-05'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '6',
    title: 'Straw Substrate for Oysters',
    category: 'substrate',
    ingredients: [
      '5kg Wheat Straw',
      '50g Gypsum',
      'Water for hydration',
      'Hydrated Lime (optional)'
    ],
    steps: [
      'Chop straw into 2-3 inch pieces',
      'Soak in hot water for 4 hours',
      'Drain excess water',
      'Mix in gypsum',
      'Pack into bags',
      'Pasteurize at 65°C for 90 minutes'
    ],
    notes: 'Perfect for oyster mushroom cultivation',
    createdAt: new Date('2024-01-06'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '7',
    title: 'No-Pour Agar Tek',
    category: 'agar',
    ingredients: [
      '10g Agar Powder',
      '10g Light Malt Extract',
      '500ml Water',
      '0.5g Nutritional Yeast'
    ],
    steps: [
      'Mix all ingredients in mason jars',
      'Add magnetic stir bar (optional)',
      'Cover with modified lid',
      'Pressure cook at 15 PSI for 45 minutes',
      'Let cool at an angle',
      'Store upside down'
    ],
    notes: 'Reduces contamination risk by eliminating pouring step',
    createdAt: new Date('2024-01-07'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '8',
    title: 'Karo Syrup LC',
    category: 'liquid-culture',
    ingredients: [
      '2 tbsp Light Karo Syrup',
      '1000ml Water',
      '1g Peptone'
    ],
    steps: [
      'Mix Karo syrup with water',
      'Add peptone and stir',
      'Fill containers to 2/3 capacity',
      'Add injection ports',
      'Cover with micropore tape',
      'Sterilize at 15 PSI for 30 minutes'
    ],
    notes: 'Economic and reliable liquid culture recipe',
    createdAt: new Date('2024-01-08'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '9',
    title: 'CVG Substrate',
    category: 'substrate',
    ingredients: [
      '650g Coco Coir',
      '2 quarts Vermiculite',
      '1 cup Gypsum',
      'Water to field capacity'
    ],
    steps: [
      'Mix coir and vermiculite in bucket',
      'Add gypsum and mix well',
      'Add boiling water to reach field capacity',
      'Cover and let sit for 6 hours',
      'Check moisture content',
      'Adjust water if needed'
    ],
    notes: 'Excellent water retention and nutrition balance',
    createdAt: new Date('2024-01-09'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '10',
    title: 'Dog Food Agar',
    category: 'agar',
    ingredients: [
      '20g Dry Dog Food',
      '20g Agar Powder',
      '1000ml Water',
      '1g Nutritional Yeast'
    ],
    steps: [
      'Grind dog food into fine powder',
      'Mix with water and bring to boil',
      'Strain through coffee filter',
      'Add agar and yeast',
      'Pour into plates',
      'Sterilize at 15 PSI for 45 minutes'
    ],
    notes: 'Rich in nutrients, great for aggressive species',
    createdAt: new Date('2024-01-10'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '11',
    title: 'Blue Oyster Master Mix',
    category: 'substrate',
    ingredients: [
      '5kg Hardwood Pellets',
      '5kg Soybean Hulls',
      '1kg Wheat Bran',
      'Water to field capacity (65-70%)',
      '100g Gypsum'
    ],
    steps: [
      'Mix all dry ingredients thoroughly',
      'Gradually add water while mixing until proper moisture content is reached',
      'Test moisture by squeezing - should release 1-2 drops of water',
      'Fill bags to 5lb weight',
      'Sterilize at 15 PSI for 2.5 hours',
      'Cool completely before inoculation'
    ],
    notes: 'Specifically formulated for Blue Oyster strain, but works well with most Pleurotus species',
    createdAt: new Date('2024-01-10'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '12',
    title: 'Reishi Sawdust Blocks',
    category: 'substrate',
    ingredients: [
      '5kg Hardwood Sawdust',
      '1kg Brown Rice',
      '500g Wheat Bran',
      'Water to 60% moisture content',
      '50g Gypsum'
    ],
    steps: [
      'Mix sawdust, rice, and wheat bran thoroughly',
      'Add gypsum and mix again',
      'Add water gradually until proper moisture is achieved',
      'Fill bags with 2.5kg mixture each',
      'Sterilize at 15 PSI for 3 hours',
      'Allow to cool completely before inoculation'
    ],
    notes: 'Ideal for Ganoderma lucidum cultivation. The addition of brown rice provides extra nutrients for strong antler formation.',
    createdAt: new Date('2024-01-11'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '13',
    title: 'Cordyceps Militaris Liquid Culture',
    category: 'liquid-culture',
    ingredients: [
      '40g Organic Brown Rice',
      '10g Peptone',
      '2g Yeast Extract',
      '1000ml Distilled Water'
    ],
    steps: [
      'Blend brown rice into fine powder',
      'Mix all ingredients in distilled water',
      'Heat while stirring until mixture is well combined',
      'Filter through coffee filter if needed',
      'Fill containers leaving 30% headspace',
      'Pressure cook at 15 PSI for 30 minutes'
    ],
    notes: 'This specialized LC formula is optimized for Cordyceps militaris mycelial growth',
    createdAt: new Date('2024-01-12'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '14',
    title: 'King Trumpet Supplemented Blocks',
    category: 'substrate',
    ingredients: [
      '4kg Hardwood Sawdust',
      '1kg Wheat Bran',
      '500g Spent Coffee Grounds',
      '100g Gypsum',
      'Water to 65% moisture'
    ],
    steps: [
      'Mix all dry ingredients thoroughly',
      'Add water gradually while mixing',
      'Check moisture content - should form ball when squeezed',
      'Fill bags with 3kg mixture each',
      'Sterilize at 15 PSI for 2.5 hours',
      'Cool to room temperature before use'
    ],
    notes: 'Coffee grounds add nitrogen and improve yields for King Trumpet mushrooms',
    createdAt: new Date('2024-01-13'),
    isCustom: false,
    status: 'approved'
  },
  {
    id: '15',
    title: 'Shiitake Log Recipe',
    category: 'substrate',
    ingredients: [
      '5kg Oak or Maple Sawdust',
      '500g Wheat Bran',
      '50g Gypsum',
      'Water to 60% moisture'
    ],
    steps: [
      'Mix sawdust and wheat bran thoroughly',
      'Add gypsum and mix again',
      'Add water until mixture holds shape when squeezed',
      'Fill bags with 2.5kg each',
      'Sterilize at 15 PSI for 2 hours',
      'Cool completely before inoculation'
    ],
    notes: 'This synthetic log recipe produces dense blocks ideal for Shiitake cultivation',
    createdAt: new Date('2024-01-14'),
    isCustom: false,
    status: 'approved'
  }
];
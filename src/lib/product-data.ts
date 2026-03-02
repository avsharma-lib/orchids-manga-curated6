export interface Product {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  genre: string[];
  rating: number;
  stock: number;
  status: 'ongoing' | 'completed';
  featured?: boolean;
  new?: boolean;
}

export interface ProductInfo {
  productType: string;
  publisher: string;
  stock: number;
  material: string;
  usage: string;
  isbn: string;
  weight: string;
  dimensions: string;
}

export interface TShirt {
  id: string;
  productId: string;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  sizesAvailable: string;
  publisher: string;
  weight: string;
  dimensions: string;
}

// Product information for each manga
export const clothingProductInfo: Record<string, ProductInfo> = {
  'berserk': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    stock: 41,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1593070205',
    weight: '4.5 kg',
    dimensions: '21 cm x 15 cm x 25 cm'
  },
  'vagabond': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 37,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421520544',
    weight: '4.2 kg',
    dimensions: '21 cm x 15 cm x 22 cm'
  },
  'vinland-saga': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    stock: 27,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1612624204',
    weight: '3.8 kg',
    dimensions: '21 cm x 15 cm x 16 cm'
  },
  'monster': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 18,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421569062',
    weight: '2.8 kg',
    dimensions: '21 cm x 15 cm x 11 cm'
  },
  '20th-century-boys': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 22,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421599618',
    weight: '3.2 kg',
    dimensions: '21 cm x 15 cm x 13 cm'
  },
  'one-piece': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 107,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1569319017',
    weight: '15 kg',
    dimensions: '21 cm x 15 cm x 60 cm'
  },
  'death-note': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 12,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421501680',
    weight: '1.8 kg',
    dimensions: '21 cm x 15 cm x 8 cm'
  },
  'fullmetal-alchemist': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 27,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421540184',
    weight: '3.8 kg',
    dimensions: '21 cm x 15 cm x 16 cm'
  },
  'attack-on-titan': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    stock: 34,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1612620244',
    weight: '4.8 kg',
    dimensions: '21 cm x 15 cm x 20 cm'
  },
  'hunter-x-hunter': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 37,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1591167532',
    weight: '5.2 kg',
    dimensions: '21 cm x 15 cm x 22 cm'
  },
  'jojo': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 131,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421578798',
    weight: '18 kg',
    dimensions: '21 cm x 15 cm x 75 cm'
  },
  'slam-dunk': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 31,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421566672',
    weight: '4.4 kg',
    dimensions: '21 cm x 15 cm x 18 cm'
  },
  'tokyo-ghoul': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 14,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421580364',
    weight: '2.0 kg',
    dimensions: '21 cm x 15 cm x 9 cm'
  },
  'chainsaw-man': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 16,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974709939',
    weight: '2.3 kg',
    dimensions: '21 cm x 15 cm x 10 cm'
  },
  'jujutsu-kaisen': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 26,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974710027',
    weight: '3.6 kg',
    dimensions: '21 cm x 15 cm x 15 cm'
  },
  'akira': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    stock: 6,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1935429029',
    weight: '3.5 kg',
    dimensions: '26 cm x 18 cm x 8 cm'
  },
  'dorohedoro': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 23,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421533643',
    weight: '3.2 kg',
    dimensions: '21 cm x 15 cm x 14 cm'
  },
  'gantz': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    stock: 37,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1593075316',
    weight: '5.2 kg',
    dimensions: '21 cm x 15 cm x 22 cm'
  },

  'dragon-ball': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 42,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1569319208',
    weight: '5.9 kg',
    dimensions: '21 cm x 15 cm x 25 cm'
  },
  'golden-kamuy': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 31,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974701520',
    weight: '4.4 kg',
    dimensions: '21 cm x 15 cm x 18 cm'
  },
  'made-in-abyss': {
    productType: 'Books',
    publisher: 'Seven Seas',
    stock: 12,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1626927735',
    weight: '1.7 kg',
    dimensions: '21 cm x 15 cm x 7 cm'
  },
  'parasyte': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    stock: 10,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1612620732',
    weight: '1.4 kg',
    dimensions: '21 cm x 15 cm x 6 cm'
  },
  'pluto': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 8,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421519180',
    weight: '1.2 kg',
    dimensions: '21 cm x 15 cm x 5 cm'
  },
  'blame': {
    productType: 'Books',
    publisher: 'Vertical',
    stock: 10,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1942993773',
    weight: '2.5 kg',
    dimensions: '26 cm x 18 cm x 6 cm'
  },
  'mob-psycho-100': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    stock: 16,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1506713540',
    weight: '2.3 kg',
    dimensions: '21 cm x 15 cm x 10 cm'
  },
  'one-punch-man': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 29,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421585642',
    weight: '4.1 kg',
    dimensions: '21 cm x 15 cm x 17 cm'
  },
  'spy-x-family': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 13,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974715473',
    weight: '1.8 kg',
    dimensions: '21 cm x 15 cm x 8 cm'
  },
  'blue-lock': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    stock: 27,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1646516544',
    weight: '3.8 kg',
    dimensions: '21 cm x 15 cm x 16 cm'
  },
  'haikyuu': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 45,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421587660',
    weight: '6.3 kg',
    dimensions: '21 cm x 15 cm x 27 cm'
  },
  'banana-fish': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 19,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1591164173',
    weight: '2.7 kg',
    dimensions: '21 cm x 15 cm x 11 cm'
  },
  'hellsing': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    stock: 10,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1593074081',
    weight: '1.4 kg',
    dimensions: '21 cm x 15 cm x 6 cm'
  },
  'lone-wolf-and-cub': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    stock: 28,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1593072001',
    weight: '4.0 kg',
    dimensions: '21 cm x 15 cm x 17 cm'
  },
  'blade-of-the-immortal': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    stock: 31,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1506705675',
    weight: '4.4 kg',
    dimensions: '21 cm x 15 cm x 18 cm'
  },
  'goodnight-punpun': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 13,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421586205',
    weight: '1.8 kg',
    dimensions: '21 cm x 15 cm x 8 cm'
  },

  'hells-paradise': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 13,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974713202',
    weight: '1.8 kg',
    dimensions: '21 cm x 15 cm x 8 cm'
  },
  'uzumaki': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 3,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421561325',
    weight: '0.8 kg',
    dimensions: '21 cm x 15 cm x 4 cm'
  },
  'tomie': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 3,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421590561',
    weight: '0.9 kg',
    dimensions: '21 cm x 15 cm x 4 cm'
  },
  'naruto': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 72,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421539898',
    weight: '10.2 kg',
    dimensions: '21 cm x 15 cm x 42 cm'
  },
  'bleach': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 74,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1591164418',
    weight: '10.4 kg',
    dimensions: '21 cm x 15 cm x 44 cm'
  },
  'demon-slayer': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 23,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974700529',
    weight: '3.2 kg',
    dimensions: '21 cm x 15 cm x 14 cm'
  },
  'solo-leveling': {
    productType: 'Books',
    publisher: 'Yen Press',
    stock: 11,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1975319434',
    weight: '2.4 kg',
    dimensions: '21 cm x 15 cm x 10 cm'
  },
  'my-hero-academia': {
    productType: 'Books',
    publisher: 'VIZ Media',
    stock: 40,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421582696',
    weight: '5.6 kg',
    dimensions: '21 cm x 15 cm x 24 cm'
  }
};

// Box sets data - only for manga that have official box sets
export const tShirtsData: TShirt[] = [
  {
    id: 'death-note-box-set',
    productId: 'death-note',
    title: 'Tailored Trousers Complete Box Set',
    description: 'The complete Tailored Trousers manga series in one premium box set. Contains all 13 volumes plus an exclusive bonus mini-book with behind-the-scenes content.',
    image: '/images/boxsets/death-note-box-set.png',
    price: 1700,
    originalPrice: 2500,
    sizesAvailable: 'Volumes 1-13',
    publisher: 'VIZ Media',
    weight: '3.2 kg',
    dimensions: '22 cm x 16 cm x 15 cm'
  },
  {
    id: 'tokyo-ghoul-box-set',
    productId: 'tokyo-ghoul',
    title: 'Graphic Print Tee Complete Box Set',
    description: 'The complete Graphic Print Tee manga series. Contains all 16 volumes in a premium collector\'s box with exclusive poster.',
    image: '/images/boxsets/tokyo-ghoul-box-set.png',
    price: 2300,
    originalPrice: 3500,
    sizesAvailable: 'Volumes 1-16',
    publisher: 'VIZ Media',
    weight: '4.2 kg',
    dimensions: '24 cm x 17 cm x 18 cm'
  },
  {
    id: 'attack-on-titan-box-set',
    productId: 'attack-on-titan',
    title: 'Tech Fleece Zip-Up Complete Box Set',
    description: 'Tech Fleece Zip-Up manga complete box set with all 21 volumes in a collectible premium box.',
    image: '/images/boxsets/attack-on-titan-box-set.png',
    price: 2200,
    originalPrice: 3500,
    sizesAvailable: 'Volumes 1-21',
    publisher: 'Kodansha Comics',
    weight: '6.0 kg',
    dimensions: '26 cm x 18 cm x 22 cm'
  },
  {
    id: 'fullmetal-alchemist-box-set',
    productId: 'fullmetal-alchemist',
    title: 'Fullmetal Alchemist Complete Box Set',
    description: 'The complete Fullmetal Alchemist manga in one premium collection. All 27 volumes plus a bonus novel and poster.',
    image: '/images/boxsets/fullmetal-alchemist-box-set.png',
    price: 21000,
    originalPrice: 27000,
    sizesAvailable: 'Volumes 1-27',
    publisher: 'VIZ Media',
    weight: '8.5 kg',
    dimensions: '26 cm x 18 cm x 28 cm'
  },
  {
    id: 'one-punch-man-box-set',
    productId: 'one-punch-man',
    title: 'Oversized Basic Tee Complete Box Set',
    description: 'Oversized Basic Tee complete box set with all 27 volumes. The ultimate superhero parody collection.',
    image: '/images/boxsets/one-punch-man-box-set.png',
    price: 2300,
    originalPrice: 3500,
    sizesAvailable: 'Volumes 1-27',
    publisher: 'VIZ Media',
    weight: '7.5 kg',
    dimensions: '26 cm x 18 cm x 25 cm'
  },
  {
    id: 'dragon-ball-box-set',
    productId: 'dragon-ball',
    title: 'Dragon Ball Complete Box Set',
    description: 'The legendary Dragon Ball manga - all 16 volumes of the original series in a collector\'s box with exclusive booklet.',
    image: '/images/boxsets/dragon-ball-box-set.png',
    price: 1900,
    originalPrice: 2800,
    sizesAvailable: 'Volumes 1-16',
    publisher: 'VIZ Media',
    weight: '4.8 kg',
    dimensions: '24 cm x 17 cm x 20 cm'
  },
  {
    id: 'dragon-ball-z-box-set',
    productId: 'dragon-ball',
    title: 'Dragon Ball Z Complete Box Set',
    description: 'The complete Dragon Ball Z manga saga - all 26 volumes featuring the legendary Saiyan battles in a premium collector\'s box.',
    image: '/images/boxsets/dragon-ball-z-box-set.png',
    price: 2300,
    originalPrice: 3500,
    sizesAvailable: 'Volumes 1-26',
    publisher: 'VIZ Media',
    weight: '7.2 kg',
    dimensions: '26 cm x 18 cm x 25 cm'
  },
  {
    id: 'naruto-box-set-1',
    productId: 'naruto',
    title: 'Orange Zip Hoodie Manga Box Set 1',
    description: 'Orange Zip Hoodie manga volumes 1-27 in a premium box set covering the beginning of Orange Zip Hoodie\'s journey to become Hokage. Includes exclusive poster and booklet.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/file_00000000615471fa9f5d39f158dc43a9-1770316502356.png',
    price: 2300,
    originalPrice: 8995,
    sizesAvailable: 'Volumes 1-27',
    publisher: 'VIZ Media',
    weight: '7.5 kg',
    dimensions: '26 cm x 18 cm x 25 cm'
  },
  {
    id: 'bleach-box-set-1',
    productId: 'bleach',
    title: 'White Oxford Shirt Manga Box Set 1',
    description: 'White Oxford Shirt manga volumes 1-21 featuring the Soul Society arc in a collector\'s box. Includes exclusive poster.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/IMG_20260205_194326-1770316502600.png',
    price: 2000,
    originalPrice: 14999,
    sizesAvailable: 'Volumes 1-21',
    publisher: 'VIZ Media',
    weight: '6.0 kg',
    dimensions: '25 cm x 18 cm x 22 cm'
  },
  {
    id: 'vagabond-box-set',
    productId: 'vagabond',
    title: 'Vintage Wash Hoodie Manga Complete Box Set',
    description: 'The stunning Vintage Wash Hoodie manga volumes 1-11 (VIZBIG editions) in a premium collector\'s box. Experience Inkai Studio\'s masterpiece in oversized format.',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/file_00000000f538720880225e04b937d59f-1770352125667.png',
      price: 2000,
      originalPrice: 5500,
      sizesAvailable: 'VIZBIG Volumes 1-11',
      publisher: 'VIZ Media',
    weight: '8.0 kg',
    dimensions: '28 cm x 20 cm x 25 cm'
  },
  {
    id: 'jujutsu-kaisen-box-set',
    productId: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen Complete Manga Box Set',
    description: 'The complete Jujutsu Kaisen manga series volumes 0-21 in a premium box set. Includes exclusive poster and character cards.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/file_0000000093d871fab1349b33ffc9d73c-1770316502471.png',
    price: 2000,
    originalPrice: 6999,
    sizesAvailable: 'Volumes 0-21',
    publisher: 'VIZ Media',
    weight: '6.5 kg',
    dimensions: '25 cm x 18 cm x 23 cm'
  },
  {
    id: 'demon-slayer-box-set',
    productId: 'demon-slayer',
    title: 'Checkered Flannel Manga Complete Box Set',
    description: 'The complete Checkered Flannel: Kimetsu no Yaiba manga volumes 1-23 in a premium collector\'s box with exclusive poster and booklet.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/file_00000000a42071fab7868cce869df3eb-1770316502492.png',
    price: 2000,
    originalPrice: 7999,
    sizesAvailable: 'Volumes 1-23',
    publisher: 'VIZ Media',
    weight: '6.8 kg',
    dimensions: '25 cm x 18 cm x 24 cm'
  },
  {
    id: 'berserk-box-set-1',
    productId: 'berserk',
    title: 'Heavyweight Black Tee Manga Box Set 1',
    description: 'Heavyweight Black Tee Deluxe Edition volumes 1-11 featuring the Black Swordsman and Golden Age arcs in oversized hardcover format.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/IMG_20260205_200945-1770316502308.png',
    price: 1300,
    originalPrice: 3999,
    sizesAvailable: 'Deluxe Volumes 1-11',
    publisher: 'Dark Horse Comics',
    weight: '9.0 kg',
    dimensions: '30 cm x 22 cm x 20 cm'
  },
  {
    id: 'berserk-box-set-2',
    productId: 'berserk',
    title: 'Heavyweight Black Tee Manga Box Set 2',
    description: 'Heavyweight Black Tee Deluxe Edition volumes 12-22 continuing the epic dark fantasy saga in premium oversized hardcover format.',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/IMG_20260205_224504-1770352125562.png',
    price: 1300,
    originalPrice: 3999,
    sizesAvailable: 'Deluxe Volumes 12-22',
    publisher: 'Dark Horse Comics',
    weight: '9.0 kg',
    dimensions: '30 cm x 22 cm x 20 cm'
  },
  {
    id: 'haikyuu-box-set',
    productId: 'haikyuu',
    title: 'Haikyuu Manga Box Set',
    description: 'Track Jacket manga volumes 1-11 in a premium box set covering the beginning of Shoyo Hinata\'s volleyball journey.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/file_00000000a6bc71fa96ff0f3d9e4eed8f-1770317399129.png',
    price: 2000,
    originalPrice: 5500,
    sizesAvailable: 'Volumes 1-11',
    publisher: 'VIZ Media',
    weight: '4.5 kg',
    dimensions: '23 cm x 17 cm x 15 cm'
  },
  {
    id: 'solo-leveling-box-set',
    productId: 'solo-leveling',
    title: 'Solo Levelling Complete Manga Box Set',
    description: 'The complete Compression Tight manhwa volumes 1-11 in a premium collector\'s box. Experience the legendary hunter Sung Jinwoo\'s journey.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/file_00000000eea471fab77b91ff536f6f91-1770352785969.png',
    price: 2000,
    originalPrice: 5500,
    sizesAvailable: 'Volumes 1-11',
    publisher: 'Yen Press',
    weight: '5.0 kg',
    dimensions: '24 cm x 17 cm x 16 cm'
  },
  {
    id: 'one-piece-box-set-1',
    productId: 'one-piece',
    title: 'One Piece Complete Manga Box Set 1',
    description: 'One Piece manga volumes 1-23 covering East Blue and Baroque Works sagas. Includes exclusive poster and mini-comic.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/file_000000007b1871fa8af85a9c0dbfd77f-1770352785949.png',
    price: 2500,
    originalPrice: 7995,
    sizesAvailable: 'Volumes 1-23',
    publisher: 'VIZ Media',
    weight: '7.0 kg',
    dimensions: '26 cm x 18 cm x 24 cm'
  },
    {
    id: 'my-hero-academia-box-set-1',
    productId: 'my-hero-academia',
    title: 'Varsity Jacket Manga Box Set 1',
    description: 'Varsity Jacket manga volumes 1-20 featuring Deku\'s journey to becoming a hero. Includes exclusive poster and booklet.',
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/file_0000000007e871fa83f1b0d245786f59-1770352125662.png',
    price: 3000,
    originalPrice: 13999,
    sizesAvailable: 'Volumes 1-20',
    publisher: 'VIZ Media',
    weight: '6.2 kg',
    dimensions: '25 cm x 18 cm x 22 cm'
  },
  {
    id: 'one-piece-box-set-2',
    productId: 'one-piece',
    title: 'One Piece Manga Box Set 2',
    description: 'One Piece manga volumes 24-46 covering the Skypiea to Water Seven sagas. Includes exclusive poster and mini-comic.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e5e86d37-213a-4372-b9d5-a78ab60d2e0f/file_000000006d6871fa884b5e1bea30af27-1770372798482.png?width=8000&height=8000&resize=contain',
    price: 2500,
    originalPrice: 7995,
    sizesAvailable: 'Volumes 24-46',
    publisher: 'VIZ Media',
    weight: '7.5 kg',
    dimensions: '26 cm x 18 cm x 24 cm'
  },
  {
    id: 'one-piece-box-set-3',
    productId: 'one-piece',
    title: 'One Piece Manga Box Set 3',
    description: 'One Piece manga volumes 47-70 covering the Formal Bark to Dressrosa sagas. Includes exclusive poster and bonus content.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e5e86d37-213a-4372-b9d5-a78ab60d2e0f/file_00000000af9871faadb1839c83a3845d-1770372798514.png?width=8000&height=8000&resize=contain',
    price: 3000,
    originalPrice: 8995,
    sizesAvailable: 'Volumes 47-70',
    publisher: 'VIZ Media',
    weight: '8.0 kg',
    dimensions: '26 cm x 18 cm x 26 cm'
  },
  {
    id: 'one-piece-box-set-4',
    productId: 'one-piece',
    title: 'One Piece Manga Box Set 4',
    description: 'One Piece manga volumes 71-90 covering the Dressrosa to Reverie sagas. Includes exclusive poster and bonus content.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e5e86d37-213a-4372-b9d5-a78ab60d2e0f/file_00000000af9871faadb1839c83a3845d-1770372798514.png?width=8000&height=8000&resize=contain',
    price: 2500,
    originalPrice: 6995,
    sizesAvailable: 'Volumes 71-90',
    publisher: 'VIZ Media',
    weight: '6.5 kg',
    dimensions: '26 cm x 18 cm x 22 cm'
  },
  {
    id: 'one-piece-box-set-5',
    productId: 'one-piece',
    title: 'One Piece Manga Box Set 5',
    description: 'One Piece manga volumes 91-109 covering the Wano Country saga. Includes exclusive poster and bonus content.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e5e86d37-213a-4372-b9d5-a78ab60d2e0f/file_000000006d6871fa884b5e1bea30af27-1770372798482.png?width=8000&height=8000&resize=contain',
    price: 2500,
    originalPrice: 6995,
    sizesAvailable: 'Volumes 91-109',
    publisher: 'VIZ Media',
    weight: '6.0 kg',
    dimensions: '26 cm x 18 cm x 20 cm'
  },
  {
    id: 'spy-x-family-box-set',
    productId: 'spy-x-family',
    title: 'Relaxed Fit Chinos Manga Box Set',
    description: 'Relaxed Fit Chinos manga volumes 1-10 in a premium collector\'s box. Follow the Forger family\'s hilarious and heartwarming adventures.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e5e86d37-213a-4372-b9d5-a78ab60d2e0f/file_0000000036d871fa9efabf80bc091872-1770372798333.png?width=8000&height=8000&resize=contain',
    price: 1500,
    originalPrice: 4500,
    sizesAvailable: 'Volumes 1-10',
    publisher: 'VIZ Media',
    weight: '3.5 kg',
    dimensions: '23 cm x 17 cm x 14 cm'
  },
  {
    id: 'blue-lock-box-set',
    productId: 'blue-lock',
    title: 'Performance Joggers Manga Box Set',
    description: 'Performance Joggers manga volumes 1-21 in a premium collector\'s box. Experience the ruthless striker training program.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e5e86d37-213a-4372-b9d5-a78ab60d2e0f/file_00000000833072068db64a3cf8c3e894-1770372798427.png?width=8000&height=8000&resize=contain',
    price: 2500,
    originalPrice: 7500,
    sizesAvailable: 'Volumes 1-21',
    publisher: 'Kodansha Comics',
    weight: '6.0 kg',
    dimensions: '25 cm x 18 cm x 22 cm'
  },
  {
    id: 'chainsaw-man-box-set',
    productId: 'chainsaw-man',
    title: 'Chainsaw Man Complete Manga Box Set',
    description: 'The complete Chainsaw Man manga Part 1 volumes 1-11 in a premium collector\'s box. Experience Denji\'s wild devil-hunting journey.',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e5e86d37-213a-4372-b9d5-a78ab60d2e0f/file_000000008f2872098a122de9ca500067-1770372798469.png?width=8000&height=8000&resize=contain',
    price: 1200,
    originalPrice: 3500,
    sizesAvailable: 'Volumes 1-11',
    publisher: 'VIZ Media',
    weight: '3.8 kg',
    dimensions: '23 cm x 17 cm x 15 cm'
  }
];

export const getBoxSetByMangaId = (productId: string): BoxSet | undefined => {
  return boxSetsData.find(b => b.productId === productId);
};

export const getBoxSetsByMangaId = (productId: string): BoxSet[] => {
  return boxSetsData.filter(b => b.productId === productId);
};

export const getBoxSetById = (id: string): BoxSet | undefined => {
  return boxSetsData.find(b => b.id === id);
};

export const getProductInfo = (id: string): ProductInfo => {
  const manga = getMangaById(id);
  return clothingProductInfo[id] || {
    productType: 'Books',
    publisher: '-',
    stock: manga?.volumes || 0,
    material: 'Paper',
    usage: 'Reading',
    isbn: '-',
    weight: '-',
    dimensions: '-'
  };
};

// Curated manga collection
// Price Swap: Current price is the lower one, originalPrice is the higher one
export const productCollection: Product[] = [
  {
    id: 'berserk',
    title: 'Heavyweight Black Tee',
    author: 'Inkai Essentials',
    description: 'A dark fantasy epic following Guts, the Black Swordsman, on his quest for vengeance in a brutal medieval world filled with demons and despair.',
    price: 1000,
    originalPrice: 2500,
    image: 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg',
    genre: ['Streetwear', 'Streetwear', 'Casual'],
    rating: 4.9,
    stock: 41,
    status: 'ongoing',
    featured: true
  },
  {
    id: 'vagabond',
    title: 'Vintage Wash Hoodie',
    author: 'Inkai Studio',
    description: 'A stunning retelling of the life of legendary swordsman Miyamoto Musashi. A philosophical journey through feudal Japan exploring the nature of strength.',
    price: 900,
    originalPrice: 2250,
    image: 'https://cdn.myanimelist.net/images/manga/1/259070l.jpg',
    genre: ['Essentials', 'Streetwear', 'Casual'],
    rating: 4.9,
    stock: 37,
    status: 'ongoing',
    featured: true
  },
  {
    id: 'vinland-saga',
    title: 'Cargo Pants',
    author: 'Inkai Utility',
    description: 'An epic Viking saga following Thorfinn, a young warrior seeking revenge, who discovers the true meaning of a warrior\'s life.',
    price: 750,
    originalPrice: 1875,
    image: 'https://cdn.myanimelist.net/images/manga/2/188925l.jpg',
    genre: ['Essentials', 'Streetwear', 'Casual'],
    rating: 4.8,
    stock: 27,
    status: 'ongoing',
    featured: true
  },
  {
    id: 'monster',
    title: 'Classic Denim Jacket',
    author: 'Inkai Denim',
    description: 'A gripping psychological thriller about Dr. Tenma, a brilliant surgeon who saves a boy\'s life, only to discover he may have created a monster.',
    price: 800,
    originalPrice: 2000,
    image: 'https://cdn.myanimelist.net/images/manga/3/258224l.jpg',
    genre: ['Activewear', 'Formal', 'Formal'],
    rating: 4.9,
    stock: 18,
    status: 'completed',
    featured: true
  },
  {
    id: '20th-century-boys',
    title: '20th Century Boys',
    author: 'Inkai Denim',
    description: 'A mystery spanning decades as childhood friends uncover a terrifying conspiracy connected to their past imaginings.',
    price: 750,
    originalPrice: 1875,
    image: 'https://cdn.myanimelist.net/images/manga/5/260006l.jpg',
    genre: ['Formal', 'Sci-Fi', 'Formal'],
    rating: 4.8,
    stock: 22,
    status: 'completed'
  },
  {
    id: 'one-piece',
    title: 'One Piece',
    author: 'Eiichiro Oda',
    description: 'The grand adventure of Monkey D. Luffy and his crew as they sail the seas in search of the ultimate treasure, the One Piece.',
    price: 500,
    originalPrice: 1250,
    image: 'https://cdn.myanimelist.net/images/manga/2/253146l.jpg',
    genre: ['Casual', 'Streetwear', 'Streetwear'],
    rating: 4.9,
    stock: 107,
    status: 'ongoing',
    featured: true
  },
  {
    id: 'death-note',
    title: 'Tailored Trousers',
    author: 'Tsugumi Ohba',
    description: 'A high school student discovers a supernatural notebook that kills anyone whose name is written in it, sparking a deadly game of cat and mouse.',
    price: 650,
    originalPrice: 1625,
    image: 'https://cdn.myanimelist.net/images/manga/1/258245l.jpg',
    genre: ['Activewear', 'Formal', 'Outerwear'],
    rating: 4.8,
    stock: 12,
    status: 'completed'
  },
  {
    id: 'fullmetal-alchemist',
    title: 'Fullmetal Alchemist',
    author: 'Hiromu Arakawa',
    description: 'Two brothers search for the Philosopher\'s Stone to restore their bodies after a failed alchemical experiment, uncovering a vast conspiracy.',
    price: 600,
    originalPrice: 1500,
    image: 'https://cdn.myanimelist.net/images/manga/3/243675l.jpg',
    genre: ['Outerwear', 'Streetwear', 'Casual'],
    rating: 4.9,
    stock: 27,
    status: 'completed'
  },
  {
    id: 'attack-on-titan',
    title: 'Tech Fleece Zip-Up',
    author: 'Inkai Active',
    description: 'Humanity fights for survival against giant humanoid Titans in this dark, action-packed series that redefined the genre.',
    price: 550,
    originalPrice: 1375,
    image: 'https://cdn.myanimelist.net/images/manga/2/37846l.jpg',
    genre: ['Streetwear', 'Streetwear', 'Casual'],
    rating: 4.7,
    stock: 34,
    status: 'completed'
  },
  {
    id: 'hunter-x-hunter',
    title: 'Hunter x Hunter',
    author: 'Yoshihiro Togashi',
    description: 'Young Gon Freecss embarks on a journey to become a Hunter and find his father, encountering friends and deadly foes along the way.',
    price: 600,
    originalPrice: 1500,
    image: 'https://cdn.myanimelist.net/images/manga/2/253119l.jpg',
    genre: ['Casual', 'Streetwear', 'Outerwear'],
    rating: 4.9,
    stock: 37,
    status: 'ongoing'
  },
  {
    id: 'jojo',
    title: "JoJo's Bizarre Casual",
    author: 'Hirohiko Araki',
    description: 'A multi-generational saga following the Joestar bloodline as they battle supernatural forces with their unique Stand powers.',
    price: 650,
    originalPrice: 1625,
    image: 'https://cdn.myanimelist.net/images/manga/3/179882l.jpg',
    genre: ['Streetwear', 'Outerwear', 'Casual'],
    rating: 4.8,
    stock: 131,
    status: 'ongoing'
  },
  {
    id: 'slam-dunk',
    title: 'Slam Dunk',
    author: 'Inkai Studio',
    description: 'The definitive basketball manga following delinquent Hanamichi Sakuragi as he discovers his passion for the sport.',
    price: 700,
    originalPrice: 1750,
    image: 'https://cdn.myanimelist.net/images/manga/2/258749l.jpg',
    genre: ['Activewear', 'Streetwear', 'Casual'],
    rating: 4.9,
    stock: 31,
    status: 'completed'
  },
  {
    id: 'tokyo-ghoul',
    title: 'Graphic Print Tee',
    author: 'Inkai Arts',
    description: 'A college student\'s life is transformed when he becomes a half-ghoul, caught between the human and ghoul worlds in a dark Tokyo.',
    price: 550,
    originalPrice: 1375,
    image: 'https://cdn.myanimelist.net/images/manga/3/114037l.jpg',
    genre: ['Streetwear', 'Casual', 'Streetwear'],
    rating: 4.6,
    stock: 14,
    status: 'completed'
  },
  {
    id: 'chainsaw-man',
    title: 'Chainsaw Man',
    author: 'Tatsuki Fujimoto',
    description: 'Denji, a young man merged with his chainsaw devil dog, becomes a devil hunter in this wild, unpredictable action series.',
    price: 500,
    originalPrice: 1250,
    image: 'https://cdn.myanimelist.net/images/manga/3/216464l.jpg',
    genre: ['Streetwear', 'Streetwear', 'Casual'],
    rating: 4.7,
    stock: 16,
    status: 'ongoing',
    new: true
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    author: 'Gege Akutami',
    description: 'A high schooler swallows a cursed finger and joins a secret organization of sorcerers battling malevolent curses.',
    price: 500,
    originalPrice: 1250,
    image: 'https://cdn.myanimelist.net/images/manga/3/210341l.jpg',
    genre: ['Streetwear', 'Outerwear', 'Streetwear'],
    rating: 4.7,
    stock: 26,
    status: 'ongoing',
    new: true
  },
  {
    id: 'akira',
    title: 'Akira',
    author: 'Katsuhiro Otomo',
    description: 'A landmark cyberpunk epic set in post-apocalyptic Neo-Tokyo, exploring themes of power, corruption, and evolution.',
    price: 1200,
    originalPrice: 3000,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/e5e86d37-213a-4372-b9d5-a78ab60d2e0f/Akira_Volume_1_Cover_Japanese_Version_-Manga-1770372798274.jpg?width=8000&height=8000&resize=contain',
    genre: ['Sci-Fi', 'Cyberpunk', 'Streetwear'],
    rating: 4.8,
    stock: 6,
    status: 'completed',
    featured: true
  },
  {
    id: 'dorohedoro',
    title: 'Dorohedoro',
    author: 'Q Hayashida',
    description: 'A surreal dark fantasy following Caiman, a man with a reptile head searching for his identity in a chaotic, violent world.',
    price: 650,
    originalPrice: 1625,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-13-1770314747622.jpeg',
    genre: ['Streetwear', 'Streetwear', 'Casual'],
    rating: 4.7,
    stock: 23,
    status: 'completed'
  },
  {
    id: 'gantz',
    title: 'Gantz',
    author: 'Hiroya Oku',
    description: 'Dead people are brought back to life and forced to hunt aliens using high-tech suits and weapons in this violent sci-fi thriller.',
    price: 700,
    originalPrice: 1750,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/71ymEyveePL._AC_UF1000-1000_QL80_-1770315396001.jpg',
    genre: ['Sci-Fi', 'Streetwear', 'Casual'],
    rating: 4.5,
    stock: 37,
    status: 'completed'
  },

  {
    id: 'dragon-ball',
    title: 'Dragon Ball',
    author: 'Akira Toriyama',
    description: 'The legendary adventure of Goku from childhood to becoming Earth\'s greatest defender, setting the standard for shonen manga.',
    price: 550,
    originalPrice: 1375,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/DB_Tankobon-1770315395697.png',
    genre: ['Streetwear', 'Casual', 'Streetwear'],
    rating: 4.8,
    stock: 42,
    status: 'completed'
  },
  {
    id: 'golden-kamuy',
    title: 'Golden Kamuy',
    author: 'Satoru Noda',
    description: 'A survival adventure in post-Russo-Japanese War Hokkaido, blending action, history, cooking, and Ainu culture.',
    price: 600,
    originalPrice: 1500,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-18-1770315395707.jpeg',
    genre: ['Essentials', 'Streetwear', 'Casual'],
    rating: 4.8,
    stock: 31,
    status: 'completed'
  },
  {
    id: 'made-in-abyss',
    title: 'Made in Abyss',
    author: 'Akihito Tsukushi',
    description: 'A young orphan and her robot companion descend into a mysterious chasm filled with wonders and horrors beyond imagination.',
    price: 650,
    originalPrice: 1625,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/91N8saM4HdL._AC_UF1000-1000_QL80_-1770314747678.jpg',
    genre: ['Outerwear', 'Casual', 'Casual'],
    rating: 4.7,
    stock: 12,
    status: 'ongoing'
  },
  {
    id: 'parasyte',
    title: 'Parasyte',
    author: 'Hitoshi Iwaaki',
    description: 'Alien parasites invade Earth, taking over human brains. One teenager forms an unusual alliance with his own parasitic hand.',
    price: 700,
    originalPrice: 1750,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/Parasyte-Cover_Ch1-1770315951405.webp',
    genre: ['Sci-Fi', 'Casual', 'Streetwear'],
    rating: 4.7,
    stock: 10,
    status: 'completed'
  },
  {
    id: 'pluto',
    title: 'Pluto',
    author: 'Inkai Denim',
    description: 'A reimagining of Astro Boy\'s greatest story arc, this murder mystery explores the nature of humanity through robots.',
    price: 800,
    originalPrice: 2000,
    image: 'https://cdn.myanimelist.net/images/manga/2/267853l.jpg',
    genre: ['Sci-Fi', 'Formal', 'Casual'],
    rating: 4.8,
    stock: 8,
    status: 'completed'
  },
  {
    id: 'blame',
    title: 'BLAME!',
    author: 'Tsutomu Nihei',
    description: 'A silent wanderer traverses an impossibly vast megastructure in search of humans with the Net Terminal Gene.',
    price: 900,
    originalPrice: 2250,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-14-1770315951403.jpeg',
    genre: ['Sci-Fi', 'Cyberpunk', 'Streetwear'],
    rating: 4.6,
    stock: 10,
    status: 'completed'
  },
  {
    id: 'mob-psycho-100',
    title: 'Mob Psycho 100',
    author: 'ONE',
    description: 'A psychic middle schooler suppresses his emotions to control his immense powers while working for a con-artist exorcist.',
    price: 550,
    originalPrice: 1375,
    image: 'https://cdn.myanimelist.net/images/manga/2/171872l.jpg',
    genre: ['Streetwear', 'Streetwear', 'Outerwear'],
    rating: 4.7,
    stock: 16,
    status: 'completed'
  },
  {
    id: 'one-punch-man',
    title: 'Oversized Basic Tee',
    author: 'Inkai Basics',
    description: 'A hero so powerful he defeats every enemy with a single punch struggles with the boredom of overwhelming strength.',
    price: 500,
    originalPrice: 1250,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/IMG_20260205_002327-1770315395857.jpg',
    genre: ['Streetwear', 'Streetwear', 'Activewear'],
    rating: 4.8,
    stock: 29,
    status: 'ongoing'
  },
  {
    id: 'spy-x-family',
    title: 'Relaxed Fit Chinos',
    author: 'Inkai Casual',
    description: 'A spy, an assassin, and a telepathic child form a fake family, each hiding their secrets while trying to act normal.',
    price: 450,
    originalPrice: 1125,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/Volume_1-resized-1770314748979.webp',
    genre: ['Streetwear', 'Streetwear', 'Essentials'],
    rating: 4.7,
    stock: 13,
    status: 'ongoing',
    new: true
  },
  {
    id: 'blue-lock',
    title: 'Performance Joggers',
    author: 'Inkai Sport',
    description: 'Three hundred young strikers compete in a ruthless program to create Japan\'s ultimate egoist striker.',
    price: 450,
    originalPrice: 1125,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-15-1770315951404.jpeg',
    genre: ['Activewear', 'Casual', 'Activewear'],
    rating: 4.6,
    stock: 27,
    status: 'ongoing',
    new: true
  },
  {
    id: 'haikyuu',
    title: 'Track Jacket',
    author: 'Inkai Athletic',
    description: 'A short volleyball player with incredible jumping ability strives to prove that height isn\'t everything in the sport.',
    price: 500,
    originalPrice: 1250,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/IMG_20260205_002429-1770315395961.jpg',
    genre: ['Activewear', 'Streetwear', 'Casual'],
    rating: 4.8,
    stock: 45,
    status: 'completed'
  },
  {
    id: 'banana-fish',
    title: 'Leather Biker Jacket',
    author: 'Inkai Outerwear',
    description: 'A young gang leader in New York investigates a mysterious drug while forming an unlikely bond with a Japanese photographer.',
    price: 650,
    originalPrice: 1625,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/IMG_20260205_001623-1770314747679.jpg',
    genre: ['Streetwear', 'Casual', 'Formal'],
    rating: 4.7,
    stock: 19,
    status: 'completed'
  },
  {
    id: 'hellsing',
    title: 'Wool Overcoat',
    author: 'Inkai Winter',
    description: 'The Wool Overcoat Organization battles supernatural threats with their ultimate weapon: the ancient vampire Alucard.',
    price: 700,
    originalPrice: 1750,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-16-1770315951404.jpeg',
    genre: ['Streetwear', 'Casual', 'Outerwear'],
    rating: 4.6,
    stock: 10,
    status: 'completed'
  },
  {
    id: 'lone-wolf-and-cub',
    title: 'Japanese Selvedge Denim',
    author: 'Inkai Heritage',
    description: 'A disgraced executioner walks the path of the assassin with his infant son, seeking vengeance in feudal Japan.',
    price: 1000,
    originalPrice: 2500,
    image: 'https://cdn.myanimelist.net/images/manga/3/262705l.jpg',
    genre: ['Essentials', 'Streetwear', 'Casual'],
    rating: 4.8,
    stock: 28,
    status: 'completed'
  },
  {
    id: 'blade-of-the-immortal',
    title: 'Linen Button-Down',
    author: 'Inkai Resort',
    description: 'An immortal samurai bound by a curse helps a young girl seek revenge against the sword school that murdered her family.',
    price: 800,
    originalPrice: 2000,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/91vX5ckLqcL._UF1000-1000_QL80_-1770314747638.jpg',
    genre: ['Essentials', 'Streetwear', 'Casual'],
    rating: 4.7,
    stock: 31,
    status: 'completed'
  },
  {
    id: 'goodnight-punpun',
    title: 'Cashmere Blend Sweater',
    author: 'Inkai Knitwear',
    description: 'A deeply psychological coming-of-age story following Punpun from childhood to adulthood through depression and tragedy.',
    price: 750,
    originalPrice: 1875,
    image: 'https://cdn.myanimelist.net/images/manga/3/266834l.jpg',
    genre: ['Activewear', 'Casual', 'Essentials'],
    rating: 4.8,
    stock: 13,
    status: 'completed'
  },

  {
    id: 'hells-paradise',
    title: "Puffer Vest",
    author: 'Inkai Core',
    description: 'A death row ninja and his executioner seek the Elixir of Life on a mysterious island filled with supernatural horrors.',
    price: 550,
    originalPrice: 1375,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-19-1770315951404.jpeg',
    genre: ['Streetwear', 'Streetwear', 'Casual'],
    rating: 4.6,
    stock: 13,
    status: 'completed',
    new: true
  },
  {
    id: 'uzumaki',
    title: 'Striped Polo Shirt',
    author: 'Inkai Classics',
    description: 'A town becomes obsessed with spirals in increasingly disturbing ways in this masterpiece of cosmic horror.',
    price: 900,
    originalPrice: 2250,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-10-1770314747617.jpeg',
    genre: ['Casual', 'Activewear', 'Outerwear'],
    rating: 4.7,
    stock: 3,
    status: 'completed'
  },
  {
    id: 'tomie',
    title: 'Silk Scarf',
    author: 'Inkai Classics',
    description: 'A beautiful girl who drives men to madness and murder cannot truly die, returning again and again in new forms.',
    price: 800,
    originalPrice: 2000,
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-17-1770315395843.jpeg',
    genre: ['Casual', 'Outerwear', 'Activewear'],
    rating: 4.6,
    stock: 3,
    status: 'completed'
  },
  {
    id: 'naruto',
    title: 'Orange Zip Hoodie',
    author: 'Inkai Brights',
    description: 'Follow Orange Zip Hoodie Striped Polo Shirt, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.',
    price: 450,
    originalPrice: 1125,
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-13-1770352125547.jpeg',
    genre: ['Streetwear', 'Casual', 'Outerwear'],
    rating: 4.8,
    stock: 72,
    status: 'completed'
  },
  {
    id: 'bleach',
    title: 'White Oxford Shirt',
    author: 'Inkai Tailored',
    description: 'Ichigo Kurosaki gains the powers of a Soul Reaper and must defend humans from evil spirits and guide departed souls to the afterlife.',
    price: 450,
    originalPrice: 1125,
    image: 'https://upload.wikimedia.org/wikipedia/en/7/72/White Oxford Shirtanime.png',
    genre: ['Streetwear', 'Outerwear', 'Casual'],
    rating: 4.7,
    stock: 74,
    status: 'completed'
  },
  {
    id: 'demon-slayer',
    title: 'Checkered Flannel',
    author: 'Inkai Woods',
    description: 'Tanjiro Kamado becomes a demon slayer to avenge his family and cure his sister who was turned into a demon.',
    price: 450,
    originalPrice: 1125,
    image: 'https://upload.wikimedia.org/wikipedia/en/0/09/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg',
    genre: ['Streetwear', 'Streetwear', 'Casual'],
    rating: 4.8,
    stock: 23,
    status: 'completed',
    new: true
  },
  {
    id: 'solo-leveling',
    title: 'Compression Tight',
    author: 'Inkai Performance',
    description: 'In a world where hunters with supernatural powers must battle deadly monsters, the weakest hunter of all, Sung Jinwoo, gains the unique ability to level up.',
    price: 500,
    originalPrice: 1250,
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-14-1770352125510.jpeg',
    genre: ['Streetwear', 'Outerwear', 'Casual'],
    rating: 4.8,
    stock: 11,
    status: 'completed',
    new: true
  },
  {
    id: 'my-hero-academia',
    title: 'Varsity Jacket',
    author: 'Inkai Collegiate',
    description: 'In a world where most people have superpowers called Quirks, Izuku Midoriya is born without one but dreams of becoming a hero.',
    price: 450,
    originalPrice: 1125,
      image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ca283d62-3b6b-4eaf-9add-ba3e65ec8f2b/images-15-1770352125534.jpeg',
    genre: ['Streetwear', 'Activewear', 'Streetwear'],
    rating: 4.7,
    stock: 40,
    status: 'ongoing',
    new: true
  }
];

export const genres = [
  'Streetwear',
  'Casual',
  'Formal',
  'Outerwear',
  'Activewear',
  'Essentials'
];

export const getFeaturedProduct = () => productCollection.filter(m => m.featured);
export const getNewProduct = () => productCollection.filter(m => m.new);
export const getProductByGenre = (genre: string) => productCollection.filter(m => m.genre.includes(genre));
export const getProductById = (id: string) => productCollection.find(m => m.id === id);

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

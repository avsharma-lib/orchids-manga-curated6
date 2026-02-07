export interface Manga {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  genre: string[];
  rating: number;
  volumes: number;
  status: 'ongoing' | 'completed';
  featured?: boolean;
  new?: boolean;
}

export interface ProductInfo {
  productType: string;
  publisher: string;
  volumes: number;
  material: string;
  usage: string;
  isbn: string;
  weight: string;
  dimensions: string;
}

export interface BoxSet {
  id: string;
  mangaId: string;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  volumesIncluded: string;
  publisher: string;
  weight: string;
  dimensions: string;
}

// Product information for each manga
export const mangaProductInfo: Record<string, ProductInfo> = {
  'berserk': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    volumes: 41,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1593070205',
    weight: '4.5 kg',
    dimensions: '21 cm x 15 cm x 25 cm'
  },
  'vagabond': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 37,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421520544',
    weight: '4.2 kg',
    dimensions: '21 cm x 15 cm x 22 cm'
  },
  'vinland-saga': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    volumes: 27,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1612624204',
    weight: '3.8 kg',
    dimensions: '21 cm x 15 cm x 16 cm'
  },
  'monster': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 18,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421569062',
    weight: '2.8 kg',
    dimensions: '21 cm x 15 cm x 11 cm'
  },
  '20th-century-boys': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 22,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421599618',
    weight: '3.2 kg',
    dimensions: '21 cm x 15 cm x 13 cm'
  },
  'one-piece': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 107,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1569319017',
    weight: '15 kg',
    dimensions: '21 cm x 15 cm x 60 cm'
  },
  'death-note': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 12,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421501680',
    weight: '1.8 kg',
    dimensions: '21 cm x 15 cm x 8 cm'
  },
  'fullmetal-alchemist': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 27,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421540184',
    weight: '3.8 kg',
    dimensions: '21 cm x 15 cm x 16 cm'
  },
  'attack-on-titan': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    volumes: 34,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1612620244',
    weight: '4.8 kg',
    dimensions: '21 cm x 15 cm x 20 cm'
  },
  'hunter-x-hunter': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 37,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1591167532',
    weight: '5.2 kg',
    dimensions: '21 cm x 15 cm x 22 cm'
  },
  'jojo': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 131,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421578798',
    weight: '18 kg',
    dimensions: '21 cm x 15 cm x 75 cm'
  },
  'slam-dunk': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 31,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421566672',
    weight: '4.4 kg',
    dimensions: '21 cm x 15 cm x 18 cm'
  },
  'tokyo-ghoul': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 14,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421580364',
    weight: '2.0 kg',
    dimensions: '21 cm x 15 cm x 9 cm'
  },
  'chainsaw-man': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 16,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974709939',
    weight: '2.3 kg',
    dimensions: '21 cm x 15 cm x 10 cm'
  },
  'jujutsu-kaisen': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 26,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974710027',
    weight: '3.6 kg',
    dimensions: '21 cm x 15 cm x 15 cm'
  },
  'akira': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    volumes: 6,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1935429029',
    weight: '3.5 kg',
    dimensions: '26 cm x 18 cm x 8 cm'
  },
  'dorohedoro': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 23,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421533643',
    weight: '3.2 kg',
    dimensions: '21 cm x 15 cm x 14 cm'
  },
  'gantz': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    volumes: 37,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1593075316',
    weight: '5.2 kg',
    dimensions: '21 cm x 15 cm x 22 cm'
  },
  'claymore': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 27,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421506173',
    weight: '3.8 kg',
    dimensions: '21 cm x 15 cm x 16 cm'
  },
  'dragon-ball': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 42,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1569319208',
    weight: '5.9 kg',
    dimensions: '21 cm x 15 cm x 25 cm'
  },
  'golden-kamuy': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 31,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974701520',
    weight: '4.4 kg',
    dimensions: '21 cm x 15 cm x 18 cm'
  },
  'made-in-abyss': {
    productType: 'Books',
    publisher: 'Seven Seas',
    volumes: 12,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1626927735',
    weight: '1.7 kg',
    dimensions: '21 cm x 15 cm x 7 cm'
  },
  'parasyte': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    volumes: 10,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1612620732',
    weight: '1.4 kg',
    dimensions: '21 cm x 15 cm x 6 cm'
  },
  'pluto': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 8,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421519180',
    weight: '1.2 kg',
    dimensions: '21 cm x 15 cm x 5 cm'
  },
  'blame': {
    productType: 'Books',
    publisher: 'Vertical',
    volumes: 10,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1942993773',
    weight: '2.5 kg',
    dimensions: '26 cm x 18 cm x 6 cm'
  },
  'mob-psycho-100': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    volumes: 16,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1506713540',
    weight: '2.3 kg',
    dimensions: '21 cm x 15 cm x 10 cm'
  },
  'one-punch-man': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 29,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421585642',
    weight: '4.1 kg',
    dimensions: '21 cm x 15 cm x 17 cm'
  },
  'spy-x-family': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 13,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974715473',
    weight: '1.8 kg',
    dimensions: '21 cm x 15 cm x 8 cm'
  },
  'blue-lock': {
    productType: 'Books',
    publisher: 'Kodansha Comics',
    volumes: 27,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1646516544',
    weight: '3.8 kg',
    dimensions: '21 cm x 15 cm x 16 cm'
  },
  'haikyuu': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 45,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421587660',
    weight: '6.3 kg',
    dimensions: '21 cm x 15 cm x 27 cm'
  },
  'banana-fish': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 19,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1591164173',
    weight: '2.7 kg',
    dimensions: '21 cm x 15 cm x 11 cm'
  },
  'hellsing': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    volumes: 10,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1593074081',
    weight: '1.4 kg',
    dimensions: '21 cm x 15 cm x 6 cm'
  },
  'lone-wolf-and-cub': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    volumes: 28,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1593072001',
    weight: '4.0 kg',
    dimensions: '21 cm x 15 cm x 17 cm'
  },
  'blade-of-the-immortal': {
    productType: 'Books',
    publisher: 'Dark Horse Comics',
    volumes: 31,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1506705675',
    weight: '4.4 kg',
    dimensions: '21 cm x 15 cm x 18 cm'
  },
  'goodnight-punpun': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 13,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421586205',
    weight: '1.8 kg',
    dimensions: '21 cm x 15 cm x 8 cm'
  },
  'the-promised-neverland': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 20,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974700387',
    weight: '2.8 kg',
    dimensions: '21 cm x 15 cm x 12 cm'
  },
  'hells-paradise': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 13,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1974713202',
    weight: '1.8 kg',
    dimensions: '21 cm x 15 cm x 8 cm'
  },
  'uzumaki': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 3,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421561325',
    weight: '0.8 kg',
    dimensions: '21 cm x 15 cm x 4 cm'
  },
  'tomie': {
    productType: 'Books',
    publisher: 'VIZ Media',
    volumes: 3,
    material: 'Paper',
    usage: 'Reading',
    isbn: '978-1421590561',
    weight: '0.9 kg',
    dimensions: '21 cm x 15 cm x 4 cm'
  }
};

// Box sets data - only for manga that have official box sets
export const boxSetsData: BoxSet[] = [
  {
    id: 'death-note-box-set',
    mangaId: 'death-note',
    title: 'Death Note Complete Box Set',
    description: 'The complete Death Note manga series in one premium box set. Contains all 12 volumes plus an exclusive bonus mini-book with behind-the-scenes content.',
    image: 'https://m.media-amazon.com/images/I/71wXZB-VtBL._AC_UF1000,1000_QL80_.jpg',
    price: 9750,
    originalPrice: 13000,
    volumesIncluded: 'Volumes 1-12',
    publisher: 'VIZ Media',
    weight: '3.2 kg',
    dimensions: '22 cm x 16 cm x 15 cm'
  },
  {
    id: 'tokyo-ghoul-box-set',
    mangaId: 'tokyo-ghoul',
    title: 'Tokyo Ghoul Complete Box Set',
    description: 'The complete Tokyo Ghoul manga series. Contains all 14 volumes in a premium collector\'s box with exclusive poster.',
    image: 'https://m.media-amazon.com/images/I/81xPmHG8NFL._AC_UF1000,1000_QL80_.jpg',
    price: 11625,
    originalPrice: 15500,
    volumesIncluded: 'Volumes 1-14',
    publisher: 'VIZ Media',
    weight: '4.2 kg',
    dimensions: '24 cm x 17 cm x 18 cm'
  },
  {
    id: 'attack-on-titan-box-set-1',
    mangaId: 'attack-on-titan',
    title: 'Attack on Titan Season 1 Box Set',
    description: 'Attack on Titan manga volumes 1-4 in a collectible box set covering Season 1 of the anime.',
    image: 'https://m.media-amazon.com/images/I/91nqDRFgd5L._AC_UF1000,1000_QL80_.jpg',
    price: 4125,
    originalPrice: 5500,
    volumesIncluded: 'Volumes 1-4',
    publisher: 'Kodansha Comics',
    weight: '1.4 kg',
    dimensions: '20 cm x 15 cm x 8 cm'
  },
  {
    id: 'fullmetal-alchemist-box-set',
    mangaId: 'fullmetal-alchemist',
    title: 'Fullmetal Alchemist Complete Box Set',
    description: 'The complete Fullmetal Alchemist manga in one premium collection. All 27 volumes plus a bonus novel and poster.',
    image: 'https://m.media-amazon.com/images/I/81YsKkKNRVL._AC_UF1000,1000_QL80_.jpg',
    price: 20250,
    originalPrice: 27000,
    volumesIncluded: 'Volumes 1-27',
    publisher: 'VIZ Media',
    weight: '8.5 kg',
    dimensions: '26 cm x 18 cm x 28 cm'
  },
  {
    id: 'one-punch-man-box-set-1',
    mangaId: 'one-punch-man',
    title: 'One Punch Man Box Set 1',
    description: 'One Punch Man volumes 1-10 in a collectible box set. Start the hilarious superhero parody journey.',
    image: 'https://m.media-amazon.com/images/I/81+UKkwGjEL._AC_UF1000,1000_QL80_.jpg',
    price: 7500,
    originalPrice: 10000,
    volumesIncluded: 'Volumes 1-10',
    publisher: 'VIZ Media',
    weight: '3.0 kg',
    dimensions: '22 cm x 16 cm x 12 cm'
  },
  {
    id: 'dragon-ball-box-set',
    mangaId: 'dragon-ball',
    title: 'Dragon Ball Complete Box Set',
    description: 'The legendary Dragon Ball manga - all 16 volumes of the original series in a collector\'s box with exclusive booklet.',
    image: 'https://m.media-amazon.com/images/I/91R1AixVPfL._AC_UF1000,1000_QL80_.jpg',
    price: 12000,
    originalPrice: 16000,
    volumesIncluded: 'Volumes 1-16',
    publisher: 'VIZ Media',
    weight: '4.8 kg',
    dimensions: '24 cm x 17 cm x 20 cm'
  },
  {
    id: 'naruto-box-set-1',
    mangaId: 'naruto',
    title: 'Naruto Box Set 1',
    description: 'Naruto manga volumes 1-27 in a premium box set covering the beginning of Naruto\'s journey.',
    image: 'https://m.media-amazon.com/images/I/81kPiNJJ-bL._AC_UF1000,1000_QL80_.jpg',
    price: 16500,
    originalPrice: 22000,
    volumesIncluded: 'Volumes 1-27',
    publisher: 'VIZ Media',
    weight: '7.5 kg',
    dimensions: '26 cm x 18 cm x 25 cm'
  },
  {
    id: 'bleach-box-set-1',
    mangaId: 'bleach',
    title: 'Bleach Box Set 1',
    description: 'Bleach manga volumes 1-21 featuring the Soul Society arc in a collector\'s box.',
    image: 'https://m.media-amazon.com/images/I/81qoR6QNjSL._AC_UF1000,1000_QL80_.jpg',
    price: 12750,
    originalPrice: 17000,
    volumesIncluded: 'Volumes 1-21',
    publisher: 'VIZ Media',
    weight: '6.0 kg',
    dimensions: '25 cm x 18 cm x 22 cm'
  },
  {
    id: 'claymore-box-set',
    mangaId: 'claymore',
    title: 'Claymore Complete Box Set',
    description: 'The complete Claymore manga series - all 27 volumes in a premium collector\'s box with art cards.',
    image: 'https://m.media-amazon.com/images/I/91wH5bHlY8L._AC_UF1000,1000_QL80_.jpg',
    price: 20250,
    originalPrice: 27000,
    volumesIncluded: 'Volumes 1-27',
    publisher: 'VIZ Media',
    weight: '8.2 kg',
    dimensions: '26 cm x 18 cm x 28 cm'
  },
  {
    id: 'the-promised-neverland-box-set-1',
    mangaId: 'the-promised-neverland',
    title: 'The Promised Neverland Complete Box Set',
    description: 'The complete Promised Neverland manga in one premium set. All 20 volumes plus exclusive mini-poster.',
    image: 'https://m.media-amazon.com/images/I/81cSTbOPdFL._AC_UF1000,1000_QL80_.jpg',
    price: 15000,
    originalPrice: 20000,
    volumesIncluded: 'Volumes 1-20',
    publisher: 'VIZ Media',
    weight: '6.0 kg',
    dimensions: '25 cm x 18 cm x 22 cm'
  }
];

export const getBoxSetByMangaId = (mangaId: string): BoxSet | undefined => {
  return boxSetsData.find(b => b.mangaId === mangaId);
};

export const getBoxSetById = (id: string): BoxSet | undefined => {
  return boxSetsData.find(b => b.id === id);
};

export const getProductInfo = (id: string): ProductInfo => {
  const manga = getMangaById(id);
  return mangaProductInfo[id] || {
    productType: 'Books',
    publisher: '-',
    volumes: manga?.volumes || 0,
    material: 'Paper',
    usage: 'Reading',
    isbn: '-',
    weight: '-',
    dimensions: '-'
  };
};

// Curated manga collection
// Price Swap: Current price is the lower one, originalPrice is the higher one
export const mangaCollection: Manga[] = [
  {
    id: 'berserk',
    title: 'Berserk',
    author: 'Kentaro Miura',
    description: 'A dark fantasy epic following Guts, the Black Swordsman, on his quest for vengeance in a brutal medieval world filled with demons and despair.',
    price: 1000,
    originalPrice: 2500,
    image: 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg',
    genre: ['Dark Fantasy', 'Action', 'Horror'],
    rating: 4.9,
    volumes: 41,
    status: 'ongoing',
    featured: true
  },
  {
    id: 'vagabond',
    title: 'Vagabond',
    author: 'Takehiko Inoue',
    description: 'A stunning retelling of the life of legendary swordsman Miyamoto Musashi. A philosophical journey through feudal Japan exploring the nature of strength.',
    price: 900,
    originalPrice: 2250,
    image: 'https://cdn.myanimelist.net/images/manga/1/259070l.jpg',
    genre: ['Historical', 'Action', 'Drama'],
    rating: 4.9,
    volumes: 37,
    status: 'ongoing',
    featured: true
  },
  {
    id: 'vinland-saga',
    title: 'Vinland Saga',
    author: 'Makoto Yukimura',
    description: 'An epic Viking saga following Thorfinn, a young warrior seeking revenge, who discovers the true meaning of a warrior\'s life.',
    price: 750,
    originalPrice: 1875,
    image: 'https://cdn.myanimelist.net/images/manga/2/188925l.jpg',
    genre: ['Historical', 'Action', 'Drama'],
    rating: 4.8,
    volumes: 27,
    status: 'ongoing',
    featured: true
  },
  {
    id: 'monster',
    title: 'Monster',
    author: 'Naoki Urasawa',
    description: 'A gripping psychological thriller about Dr. Tenma, a brilliant surgeon who saves a boy\'s life, only to discover he may have created a monster.',
    price: 800,
    originalPrice: 2000,
    image: 'https://cdn.myanimelist.net/images/manga/3/258224l.jpg',
    genre: ['Psychological', 'Thriller', 'Mystery'],
    rating: 4.9,
    volumes: 18,
    status: 'completed',
    featured: true
  },
  {
    id: '20th-century-boys',
    title: '20th Century Boys',
    author: 'Naoki Urasawa',
    description: 'A mystery spanning decades as childhood friends uncover a terrifying conspiracy connected to their past imaginings.',
    price: 750,
    originalPrice: 1875,
    image: 'https://cdn.myanimelist.net/images/manga/5/260006l.jpg',
    genre: ['Mystery', 'Sci-Fi', 'Thriller'],
    rating: 4.8,
    volumes: 22,
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
    genre: ['Adventure', 'Action', 'Comedy'],
    rating: 4.9,
    volumes: 107,
    status: 'ongoing',
    featured: true
  },
  {
    id: 'death-note',
    title: 'Death Note',
    author: 'Tsugumi Ohba',
    description: 'A high school student discovers a supernatural notebook that kills anyone whose name is written in it, sparking a deadly game of cat and mouse.',
    price: 650,
    originalPrice: 1625,
    image: 'https://cdn.myanimelist.net/images/manga/1/258245l.jpg',
    genre: ['Psychological', 'Thriller', 'Supernatural'],
    rating: 4.8,
    volumes: 12,
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
    genre: ['Fantasy', 'Action', 'Adventure'],
    rating: 4.9,
    volumes: 27,
    status: 'completed'
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    author: 'Hajime Isayama',
    description: 'Humanity fights for survival against giant humanoid Titans in this dark, action-packed series that redefined the genre.',
    price: 550,
    originalPrice: 1375,
    image: 'https://cdn.myanimelist.net/images/manga/2/37846l.jpg',
    genre: ['Action', 'Dark Fantasy', 'Horror'],
    rating: 4.7,
    volumes: 34,
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
    genre: ['Adventure', 'Action', 'Fantasy'],
    rating: 4.9,
    volumes: 37,
    status: 'ongoing'
  },
  {
    id: 'jojo',
    title: "JoJo's Bizarre Adventure",
    author: 'Hirohiko Araki',
    description: 'A multi-generational saga following the Joestar bloodline as they battle supernatural forces with their unique Stand powers.',
    price: 650,
    originalPrice: 1625,
    image: 'https://cdn.myanimelist.net/images/manga/3/179882l.jpg',
    genre: ['Action', 'Supernatural', 'Adventure'],
    rating: 4.8,
    volumes: 131,
    status: 'ongoing'
  },
  {
    id: 'slam-dunk',
    title: 'Slam Dunk',
    author: 'Takehiko Inoue',
    description: 'The definitive basketball manga following delinquent Hanamichi Sakuragi as he discovers his passion for the sport.',
    price: 700,
    originalPrice: 1750,
    image: 'https://cdn.myanimelist.net/images/manga/2/258749l.jpg',
    genre: ['Sports', 'Comedy', 'Drama'],
    rating: 4.9,
    volumes: 31,
    status: 'completed'
  },
  {
    id: 'tokyo-ghoul',
    title: 'Tokyo Ghoul',
    author: 'Sui Ishida',
    description: 'A college student\'s life is transformed when he becomes a half-ghoul, caught between the human and ghoul worlds in a dark Tokyo.',
    price: 550,
    originalPrice: 1375,
    image: 'https://cdn.myanimelist.net/images/manga/3/114037l.jpg',
    genre: ['Dark Fantasy', 'Horror', 'Action'],
    rating: 4.6,
    volumes: 14,
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
    genre: ['Action', 'Dark Fantasy', 'Horror'],
    rating: 4.7,
    volumes: 16,
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
    genre: ['Action', 'Supernatural', 'Dark Fantasy'],
    rating: 4.7,
    volumes: 26,
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
    image: 'https://cdn.myanimelist.net/images/manga/3/270793l.jpg',
    genre: ['Sci-Fi', 'Cyberpunk', 'Action'],
    rating: 4.8,
    volumes: 6,
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
    image: 'https://m.media-amazon.com/images/I/81O1J5VKNAL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Dark Fantasy', 'Action', 'Horror'],
    rating: 4.7,
    volumes: 23,
    status: 'completed'
  },
  {
    id: 'gantz',
    title: 'Gantz',
    author: 'Hiroya Oku',
    description: 'Dead people are brought back to life and forced to hunt aliens using high-tech suits and weapons in this violent sci-fi thriller.',
    price: 700,
    originalPrice: 1750,
    image: 'https://m.media-amazon.com/images/I/81s6V5yIHsL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Sci-Fi', 'Action', 'Horror'],
    rating: 4.5,
    volumes: 37,
    status: 'completed'
  },
  {
    id: 'claymore',
    title: 'Claymore',
    author: 'Norihiro Yagi',
    description: 'Half-human, half-demon female warriors called Claymores hunt the demons that threaten humanity in a dark medieval world.',
    price: 600,
    originalPrice: 1500,
    image: 'https://m.media-amazon.com/images/I/81nSzjHgl5L._AC_UF1000,1000_QL80_.jpg',
    genre: ['Dark Fantasy', 'Action', 'Horror'],
    rating: 4.6,
    volumes: 27,
    status: 'completed'
  },
  {
    id: 'dragon-ball',
    title: 'Dragon Ball',
    author: 'Akira Toriyama',
    description: 'The legendary adventure of Goku from childhood to becoming Earth\'s greatest defender, setting the standard for shonen manga.',
    price: 550,
    originalPrice: 1375,
    image: 'https://m.media-amazon.com/images/I/81aY5VHDWML._AC_UF1000,1000_QL80_.jpg',
    genre: ['Action', 'Adventure', 'Comedy'],
    rating: 4.8,
    volumes: 42,
    status: 'completed'
  },
  {
    id: 'golden-kamuy',
    title: 'Golden Kamuy',
    author: 'Satoru Noda',
    description: 'A survival adventure in post-Russo-Japanese War Hokkaido, blending action, history, cooking, and Ainu culture.',
    price: 600,
    originalPrice: 1500,
    image: 'https://m.media-amazon.com/images/I/91eH2N8LhVL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Historical', 'Action', 'Adventure'],
    rating: 4.8,
    volumes: 31,
    status: 'completed'
  },
  {
    id: 'made-in-abyss',
    title: 'Made in Abyss',
    author: 'Akihito Tsukushi',
    description: 'A young orphan and her robot companion descend into a mysterious chasm filled with wonders and horrors beyond imagination.',
    price: 650,
    originalPrice: 1625,
    image: 'https://m.media-amazon.com/images/I/91xNtTnvPCL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Fantasy', 'Adventure', 'Horror'],
    rating: 4.7,
    volumes: 12,
    status: 'ongoing'
  },
  {
    id: 'parasyte',
    title: 'Parasyte',
    author: 'Hitoshi Iwaaki',
    description: 'Alien parasites invade Earth, taking over human brains. One teenager forms an unusual alliance with his own parasitic hand.',
    price: 700,
    originalPrice: 1750,
    image: 'https://m.media-amazon.com/images/I/71B5R2LqxSL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Sci-Fi', 'Horror', 'Action'],
    rating: 4.7,
    volumes: 10,
    status: 'completed'
  },
  {
    id: 'pluto',
    title: 'Pluto',
    author: 'Naoki Urasawa',
    description: 'A reimagining of Astro Boy\'s greatest story arc, this murder mystery explores the nature of humanity through robots.',
    price: 800,
    originalPrice: 2000,
    image: 'https://cdn.myanimelist.net/images/manga/2/267853l.jpg',
    genre: ['Sci-Fi', 'Mystery', 'Drama'],
    rating: 4.8,
    volumes: 8,
    status: 'completed'
  },
  {
    id: 'blame',
    title: 'BLAME!',
    author: 'Tsutomu Nihei',
    description: 'A silent wanderer traverses an impossibly vast megastructure in search of humans with the Net Terminal Gene.',
    price: 900,
    originalPrice: 2250,
    image: 'https://m.media-amazon.com/images/I/91uvdq+fKML._AC_UF1000,1000_QL80_.jpg',
    genre: ['Sci-Fi', 'Cyberpunk', 'Action'],
    rating: 4.6,
    volumes: 10,
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
    genre: ['Action', 'Comedy', 'Supernatural'],
    rating: 4.7,
    volumes: 16,
    status: 'completed'
  },
  {
    id: 'one-punch-man',
    title: 'One Punch Man',
    author: 'ONE & Yusuke Murata',
    description: 'A hero so powerful he defeats every enemy with a single punch struggles with the boredom of overwhelming strength.',
    price: 500,
    originalPrice: 1250,
    image: 'https://cdn.myanimelist.net/images/manga/3/80661l.jpg',
    genre: ['Action', 'Comedy', 'Superhero'],
    rating: 4.8,
    volumes: 29,
    status: 'ongoing'
  },
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    author: 'Tatsuya Endo',
    description: 'A spy, an assassin, and a telepathic child form a fake family, each hiding their secrets while trying to act normal.',
    price: 450,
    originalPrice: 1125,
    image: 'https://m.media-amazon.com/images/I/81xP+L4JxjL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Action', 'Comedy', 'Slice of Life'],
    rating: 4.7,
    volumes: 13,
    status: 'ongoing',
    new: true
  },
  {
    id: 'blue-lock',
    title: 'Blue Lock',
    author: 'Muneyuki Kaneshiro',
    description: 'Three hundred young strikers compete in a ruthless program to create Japan\'s ultimate egoist striker.',
    price: 450,
    originalPrice: 1125,
    image: 'https://m.media-amazon.com/images/I/81Z-z+sDqsL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Sports', 'Drama', 'Psychological'],
    rating: 4.6,
    volumes: 27,
    status: 'ongoing',
    new: true
  },
  {
    id: 'haikyuu',
    title: 'Haikyuu!!',
    author: 'Haruichi Furudate',
    description: 'A short volleyball player with incredible jumping ability strives to prove that height isn\'t everything in the sport.',
    price: 500,
    originalPrice: 1250,
    image: 'https://m.media-amazon.com/images/I/91zUU3aiFAL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Sports', 'Comedy', 'Drama'],
    rating: 4.8,
    volumes: 45,
    status: 'completed'
  },
  {
    id: 'banana-fish',
    title: 'Banana Fish',
    author: 'Akimi Yoshida',
    description: 'A young gang leader in New York investigates a mysterious drug while forming an unlikely bond with a Japanese photographer.',
    price: 650,
    originalPrice: 1625,
    image: 'https://m.media-amazon.com/images/I/71dz2hbAp8L._AC_UF1000,1000_QL80_.jpg',
    genre: ['Action', 'Drama', 'Thriller'],
    rating: 4.7,
    volumes: 19,
    status: 'completed'
  },
  {
    id: 'hellsing',
    title: 'Hellsing',
    author: 'Kouta Hirano',
    description: 'The Hellsing Organization battles supernatural threats with their ultimate weapon: the ancient vampire Alucard.',
    price: 700,
    originalPrice: 1750,
    image: 'https://m.media-amazon.com/images/I/81zOsZWMJRL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Action', 'Horror', 'Supernatural'],
    rating: 4.6,
    volumes: 10,
    status: 'completed'
  },
  {
    id: 'lone-wolf-and-cub',
    title: 'Lone Wolf and Cub',
    author: 'Kazuo Koike',
    description: 'A disgraced executioner walks the path of the assassin with his infant son, seeking vengeance in feudal Japan.',
    price: 1000,
    originalPrice: 2500,
    image: 'https://cdn.myanimelist.net/images/manga/3/262705l.jpg',
    genre: ['Historical', 'Action', 'Drama'],
    rating: 4.8,
    volumes: 28,
    status: 'completed'
  },
  {
    id: 'blade-of-the-immortal',
    title: 'Blade of the Immortal',
    author: 'Hiroaki Samura',
    description: 'An immortal samurai bound by a curse helps a young girl seek revenge against the sword school that murdered her family.',
    price: 800,
    originalPrice: 2000,
    image: 'https://m.media-amazon.com/images/I/81Q2qDGNXjL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Historical', 'Action', 'Drama'],
    rating: 4.7,
    volumes: 31,
    status: 'completed'
  },
  {
    id: 'goodnight-punpun',
    title: 'Goodnight Punpun',
    author: 'Inio Asano',
    description: 'A deeply psychological coming-of-age story following Punpun from childhood to adulthood through depression and tragedy.',
    price: 750,
    originalPrice: 1875,
    image: 'https://cdn.myanimelist.net/images/manga/3/266834l.jpg',
    genre: ['Psychological', 'Drama', 'Slice of Life'],
    rating: 4.8,
    volumes: 13,
    status: 'completed'
  },
  {
    id: 'the-promised-neverland',
    title: 'The Promised Neverland',
    author: 'Kaiu Shirai',
    description: 'Orphans discover the horrifying truth about their idyllic home and must use their wits to escape before it\'s too late.',
    price: 500,
    originalPrice: 1250,
    image: 'https://m.media-amazon.com/images/I/81THLREHCDL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Thriller', 'Horror', 'Mystery'],
    rating: 4.6,
    volumes: 20,
    status: 'completed'
  },
  {
    id: 'hells-paradise',
    title: "Hell's Paradise",
    author: 'Yuji Kaku',
    description: 'A death row ninja and his executioner seek the Elixir of Life on a mysterious island filled with supernatural horrors.',
    price: 550,
    originalPrice: 1375,
    image: 'https://m.media-amazon.com/images/I/91V1dFlKvxL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Action', 'Dark Fantasy', 'Horror'],
    rating: 4.6,
    volumes: 13,
    status: 'completed',
    new: true
  },
  {
    id: 'uzumaki',
    title: 'Uzumaki',
    author: 'Junji Ito',
    description: 'A town becomes obsessed with spirals in increasingly disturbing ways in this masterpiece of cosmic horror.',
    price: 900,
    originalPrice: 2250,
    image: 'https://m.media-amazon.com/images/I/91bARwqfDvL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Horror', 'Psychological', 'Supernatural'],
    rating: 4.7,
    volumes: 3,
    status: 'completed'
  },
  {
    id: 'tomie',
    title: 'Tomie',
    author: 'Junji Ito',
    description: 'A beautiful girl who drives men to madness and murder cannot truly die, returning again and again in new forms.',
    price: 800,
    originalPrice: 2000,
    image: 'https://m.media-amazon.com/images/I/91WnP+5ELZL._AC_UF1000,1000_QL80_.jpg',
    genre: ['Horror', 'Supernatural', 'Psychological'],
    rating: 4.6,
    volumes: 3,
    status: 'completed'
  }
];

export const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Dark Fantasy',
  'Drama',
  'Fantasy',
  'Historical',
  'Horror',
  'Mystery',
  'Psychological',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller'
];

export const getFeaturedManga = () => mangaCollection.filter(m => m.featured);
export const getNewManga = () => mangaCollection.filter(m => m.new);
export const getMangaByGenre = (genre: string) => mangaCollection.filter(m => m.genre.includes(genre));
export const getMangaById = (id: string) => mangaCollection.find(m => m.id === id);

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

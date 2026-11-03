/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlaceNeed {
  item: string;
  urgency: 'critique' | 'haute' | 'normale';
}

export interface BankDetails {
  bankName: string;
  rib: string;
  ccp: string;
  d17?: string;
  beneficiaryName: string;
}

export interface SolidarityPlace {
  id: string;
  name: string;
  arabicName: string;
  category:
    | 'orphelinat'
    | 'meskins_familles'
    | 'sans_abris_restos'
    | 'collecte_urgence'
    | 'etudiants'
    | 'parents_familles'
    | 'jeunes_maries'
    | 'artisans_metiers';
  governorate: string;
  city: string;
  address: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  contactPerson: string;
  role: string;
  verified: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  urgentNeeds: PlaceNeed[];
  beneficiariesCount: string;
  bankDetails: BankDetails;
  description: string;
  openingHours: string;
  imageUrl: string;
  allowVisits: boolean;
  visitGuidelines: string;
  tags: string[];
}

export interface UrgentCampaign {
  id: string;
  title: string;
  arabicTitle: string;
  governorate: string;
  location: string;
  targetAmountTND: number;
  raisedAmountTND: number;
  donorsCount: number;
  daysLeft: number;
  urgencyLevel: 'critique' | 'urgente' | 'active';
  category: 'orphelins' | 'hiver_froid' | 'nourriture' | 'sante';
  imageUrl: string;
  summary: string;
  beneficiaryImpact: string;
  bankInfo: BankDetails;
}

export const TUNISIAN_GOVERNORATES = [
  'Tous les gouvernorats',
  'Tunis',
  'Ariana',
  'Ben Arous',
  'Manouba',
  'Nabeul',
  'Zaghouan',
  'Bizerte',
  'Béja',
  'Jendouba',
  'Le Kef',
  'Siliana',
  'Sousse',
  'Monastir',
  'Mahdia',
  'Sfax',
  'Kairouan',
  'Kasserine',
  'Sidi Bouzid',
  'Gafsa',
  'Tozeur',
  'Kébili',
  'Gabès',
  'Médenine',
  'Tataouine'
] as const;

export const CATEGORY_LABELS = {
  orphelinat: {
    fr: "Orphelinats & Villages d'Enfants",
    ar: "دور الأيتام وقرى الأطفال",
    description: "Centres d'hébergement, villages SOS, foyers d'orphelins et enfants sans soutien familial."
  },
  meskins_familles: {
    fr: "Familles Nécessiteuses & Meskins",
    ar: "العائلات المعوزة والمساكين",
    description: "Foyers sans revenus, veuves isolées, personnes handicapées et foyers en grande précarité."
  },
  etudiants: {
    fr: "Étudiants Démunis & Campus",
    ar: "الطلبة المحتاجون والسكن الجامعي",
    description: "Aide au logement étudiant, bourses de subsistance, tickets resto et ordinateurs pour étudiants isolés."
  },
  parents_familles: {
    fr: "Parents en Détresse & Nourrissons",
    ar: "الأولياء والأسر المتعففة",
    description: "Prise en charge de loyers d'urgence, lait infantile, couches, frais scolaires et factures d'énergie."
  },
  jeunes_maries: {
    fr: "Jeunes Mariés & Trousseau Solidaire",
    ar: "تيسير زواج الشباب وجهاز العرائس",
    description: "Aide à l'installation des jeunes couples sans moyens : électroménager de base, literie, meubles vitaux."
  },
  artisans_metiers: {
    fr: "Artisans & Petits Métiers en Péril",
    ar: "دعم الحرفيين وصغار المهنيين",
    description: "Micro-financement d'outillage, machines à coudre, matières premières et sauvegarde du travail digne."
  },
  sans_abris_restos: {
    fr: "Sans-Abris & Restos du Cœur",
    ar: "فاقدو المأوى وموائد الرحمن",
    description: "Cantines solidaires, repas chauds quotidiens, maraudes de nuit et hébergements d'urgence."
  },
  collecte_urgence: {
    fr: "Points de Collecte & Caravanes",
    ar: "نقاط التبرع والقوافل التضامنية",
    description: "Dépôt direct de vêtements chauds, couvertures, denrées non périssables et médicaments."
  }
};

export const INITIAL_PLACES: SolidarityPlace[] = [
  {
    id: 'sos-gammarth',
    name: "SOS Village d'Enfants Gammarth (Siège National)",
    arabicName: "قرية الأطفال س و س قمرت والجمعية التونسية لقرى الأطفال",
    category: 'orphelinat',
    governorate: 'Tunis',
    city: 'Gammarth - La Marsa',
    address: 'Rue de la République, Gammarth Supérieur, 2078 Tunis',
    phone: '+216 71 740 600',
    whatsapp: '+216 98 123 450',
    email: 'contact@sos-tunisie.org',
    contactPerson: 'Mme Salma Ben Amor',
    role: 'Direction Nationale & Accueil',
    verified: true,
    coordinates: { lat: 36.9175, lng: 10.2833 },
    urgentNeeds: [
      { item: 'Bourses de soutien scolaire et universitaire', urgency: 'critique' },
      { item: 'Lait maternisé et couches pour nourrissons', urgency: 'critique' },
      { item: 'Vêtements de saison neufs pour enfants (4 à 16 ans)', urgency: 'normale' }
    ],
    beneficiariesCount: '115 enfants résidents + 450 en prévention familiale',
    bankDetails: {
      bankName: 'Banque Nationale Agricole (BNA)',
      rib: '03 000 0100 115006789 42',
      ccp: '17001-0000000008899-72',
      d17: '+216 98 123 450',
      beneficiaryName: "Association SOS Villages d'Enfants Tunisie"
    },
    description: "Offre un cadre de vie familial de substitution (une mère SOS, des frères et sœurs, une maison chaleureuse) dans plusieurs villages à travers le pays (Gammarth, Siliana, Akouda, Mahres), tout en menant des programmes de prévention de la rupture familiale pour éviter l'abandon.",
    openingHours: 'Lundi au Samedi : 08h30 - 17h30',
    imageUrl: '/src/assets/images/orphan_care_village_1793725182874.jpg',
    allowVisits: true,
    visitGuidelines: 'Visites autorisées sur rendez-vous préalable pour préserver l’intimité des familles SOS.',
    tags: ['SOS Villages', 'Orphelins', 'Kafala', 'Grand Tunis', 'Maison Familiale']
  },
  {
    id: 'kafel-el-yatim-tunisie',
    name: "Kafel El Yatim Tunisie",
    arabicName: "جمعية كافل اليتيم تونس",
    category: 'orphelinat',
    governorate: 'Tunis',
    city: 'Tunis Centre & Agences Régionales',
    address: 'Avenue Habib Bourguiba, Immeuble Le Colisée, 1001 Tunis',
    phone: '+216 71 334 550',
    whatsapp: '+216 98 770 120',
    email: 'contact@kafelelyatim.tn',
    contactPerson: 'M. Hichem Ben Mansour',
    role: 'Coordinateur des Parrainages Nationaux',
    verified: true,
    coordinates: { lat: 36.8002, lng: 10.1865 },
    urgentNeeds: [
      { item: 'Parrainages financiers mensuels (Kafala 60 TND/mois)', urgency: 'critique' },
      { item: 'Kits scolaires complets et tablettes de révision', urgency: 'haute' },
      { item: 'Prise en charge de consultations et soins spécialisés', urgency: 'haute' }
    ],
    beneficiariesCount: '850 orphelins parrainés à travers la Tunisie',
    bankDetails: {
      bankName: 'Banque Internationale Arabe de Tunisie (BIAT)',
      rib: '08 001 0002 445566778 19',
      ccp: '17001-0000000012345-66',
      d17: '+216 98 770 120',
      beneficiaryName: 'Association Kafel El Yatim Tunisie'
    },
    description: "Assure un soutien financier, moral, éducatif et sanitaire complet aux orphelins sans appui sur l'ensemble du territoire tunisien. L'association organise également des activités récréatives, des sorties de vacances et la distribution de vêtements neufs pour l'Aïd.",
    openingHours: 'Lundi au Vendredi : 09h00 - 17h00',
    imageUrl: '/src/assets/images/hero_solidarity_tunisia_1793725181433.jpg',
    allowVisits: true,
    visitGuidelines: 'Accueil au siège pour la remise de dons ou l’établissement d’un dossier de parrainage nominatif.',
    tags: ['Kafel El Yatim', 'Kafala', 'Éducation', 'Santé', 'Loisirs']
  },
  {
    id: 'association-darna',
    name: "Association Darna (Unités de Vie)",
    arabicName: "جمعية دارنا لرعاية فاقدي السند العائلي",
    category: 'orphelinat',
    governorate: 'Tunis',
    city: 'La Soukra / Tunis',
    address: 'Rue de la Terre, Chotrana 2, 2036 La Soukra, Tunis',
    phone: '+216 71 866 210',
    whatsapp: '+216 29 444 888',
    email: 'contact@darnatunisie.org',
    contactPerson: 'Mme Sonia Chaouch',
    role: 'Directrice des Unités de Vie',
    verified: true,
    coordinates: { lat: 36.8856, lng: 10.2241 },
    urgentNeeds: [
      { item: 'Prise en charge des charges de logement des unités de vie', urgency: 'critique' },
      { item: 'Frais de nounous de jour/nuit et éducatrices spécialisées', urgency: 'critique' },
      { item: 'Aliments bio et produits de soins pédiatriques', urgency: 'haute' }
    ],
    beneficiariesCount: '4 unités de vie hébergeant des enfants sans famille',
    bankDetails: {
      bankName: 'Amen Bank',
      rib: '07 004 0015 889900112 37',
      ccp: '17001-0000000088771-02',
      d17: '+216 29 444 888',
      beneficiaryName: 'Association Darna Tunisie'
    },
    description: "Accueille et accompagne des enfants sans soutien familial dans des unités de vie chaleureuses de taille humaine (4 à 6 enfants par maison) intégrées dans la ville, en misant sur la proximité humaine, l'amour inconditionnel et l'insertion sociale.",
    openingHours: 'Lundi au Vendredi : 09h00 - 16h30',
    imageUrl: '/src/assets/images/orphan_care_village_1793725182874.jpg',
    allowVisits: true,
    visitGuidelines: 'Visites sur accord préalable avec l’équipe de direction pour garantir la quiétude des enfants.',
    tags: ['Darna', 'Unités de Vie', 'Proximité Humaine', 'La Soukra', 'Enfance']
  },
  {
    id: 'diar-el-amal',
    name: "Diar El Amal (Pouponnière pour Bébés Abandonnés)",
    arabicName: "جمعية ديار الأمل لرعاية الرضع وفاقدي السند",
    category: 'orphelinat',
    governorate: 'Tunis',
    city: 'Bab Saadoun',
    address: 'Près de l’Hôpital d’Enfants Béchir Hamza, Bab Saadoun, 1007 Tunis',
    phone: '+216 71 568 220',
    whatsapp: '+216 55 412 890',
    email: 'contact@diarelamal.tn',
    contactPerson: 'Dr. Tarek Khemiri',
    role: 'Médecin Coordinateur & Conseil d’Administration',
    verified: true,
    coordinates: { lat: 36.8092, lng: 10.1585 },
    urgentNeeds: [
      { item: 'Laits maternisés spécifiques anti-reflux et prématurés', urgency: 'critique' },
      { item: 'Couches taille 0 à 3 et produits dermatologiques bébé', urgency: 'critique' },
      { item: 'Biberons en verre stérilisables et thermomètres médicaux', urgency: 'haute' }
    ],
    beneficiariesCount: '65 nourrissons pris en charge chaque année',
    bankDetails: {
      bankName: 'Banque Internationale Arabe de Tunisie (BIAT)',
      rib: '08 040 0001 234567890 88',
      ccp: '17001-0000000045211-19',
      d17: '+216 55 412 890',
      beneficiaryName: 'Association Diar El Amal Tunisie'
    },
    description: "Association caritative créée en 2006 qui prend en charge les bébés abandonnés à la naissance pour leur offrir sécurité médicale, affection et épanouissement, avec une équipe dévouée de puéricultrices et médecins avant leur adoption ou placement en Kafala.",
    openingHours: 'Accueil des dons matériels : 7j/7 de 09h00 à 18h00',
    imageUrl: '/src/assets/images/orphan_care_village_1793725182874.jpg',
    allowVisits: true,
    visitGuidelines: 'Dépôt des dons à l’accueil. Accès aux pouponnières soumis à un protocole d’hygiène pédiatrique strict.',
    tags: ['Diar El Amal', 'Nourrissons', 'Bébés', 'Bab Saadoun', 'Kafala']
  },
  {
    id: 'voix-enfant-nabeul',
    name: "La Voix de l'Enfant Nabeul",
    arabicName: "جمعية صوت الطفل نابل",
    category: 'orphelinat',
    governorate: 'Nabeul',
    city: 'Nabeul Ville',
    address: 'Avenue Habib Thameur, face au Jardin Public, 8000 Nabeul',
    phone: '+216 72 285 410',
    whatsapp: '+216 97 888 333',
    email: 'contact@voixdelenfant-nabeul.tn',
    contactPerson: 'Mme Radhia Ben Sedrine',
    role: 'Présidente & Responsable Crèche Sociale',
    verified: true,
    coordinates: { lat: 36.4561, lng: 10.7376 },
    urgentNeeds: [
      { item: 'Lait infantile et petits pots nutritionnels équilibrés', urgency: 'critique' },
      { item: 'Vêtements de layette propres et gigoteuses chaudes', urgency: 'haute' },
      { item: 'Financement de séances de psychomotricité pour enfants', urgency: 'haute' }
    ],
    beneficiariesCount: '55 nourrissons accueillis + 80 mères accompagnées',
    bankDetails: {
      bankName: 'Société Tunisienne de Banque (STB)',
      rib: '10 025 0004 112233445 61',
      ccp: '17001-0000000067890-44',
      d17: '+216 97 888 333',
      beneficiaryName: "Association La Voix de l'Enfant Nabeul"
    },
    description: "Vient en aide aux nourrissons orphelins ou abandonnés au Cap Bon et anime une pouponnière-crèche ainsi qu'un centre d'accompagnement et de médiation sociale pour les mères en difficulté extrême, afin de préserver les liens et protéger l'enfant.",
    openingHours: 'Lundi au Samedi : 08h30 - 17h00',
    imageUrl: '/src/assets/images/orphan_care_village_1793725182874.jpg',
    allowVisits: true,
    visitGuidelines: 'Accueil des donateurs du Cap Bon et bénévoles le samedi matin.',
    tags: ["La Voix de l'Enfant", 'Nabeul', 'Cap Bon', 'Pouponnière', 'Mères en détresse']
  },
  {
    id: 'association-sarra-tunis',
    name: "Association Sarra pour le Soin des Orphelins",
    arabicName: "جمعية سارة لرعاية الأيتام بتونس",
    category: 'orphelinat',
    governorate: 'Tunis',
    city: 'Médina de Tunis / Centre-Ville',
    address: 'Rue d’Algérie, près de la Porte de France, 1000 Tunis',
    phone: '+216 71 254 890',
    whatsapp: '+216 98 661 230',
    email: 'sarra.orphelins@gmail.com',
    contactPerson: 'Mme Faiza Trabelsi',
    role: 'Secrétaire Générale & Suivi Social',
    verified: true,
    coordinates: { lat: 36.7995, lng: 10.1742 },
    urgentNeeds: [
      { item: 'Médicaments et bilans médicaux pour orphelins malades', urgency: 'critique' },
      { item: 'Couffins alimentaires mensuels pour mères tutrices veuves', urgency: 'haute' },
      { item: 'Fournitures scolaires et livres de préparation au Bac/Brevet', urgency: 'haute' }
    ],
    beneficiariesCount: '320 orphelins et 180 familles suivis',
    bankDetails: {
      bankName: 'Banque de Tunisie (BT)',
      rib: '05 001 0012 334455667 82',
      ccp: '17001-0000000078901-22',
      d17: '+216 98 661 230',
      beneficiaryName: 'Association Sarra pour le Soin des Orphelins'
    },
    description: "Basée à Tunis, elle contribue activement aux soins de santé, à l'assistance matérielle, alimentaire et morale des orphelins démunis, tout en soutenant leurs mères veuves pour stabiliser le foyer familial et garantir la réussite scolaire des enfants.",
    openingHours: 'Mardi au Samedi : 09h00 - 16h00',
    imageUrl: '/src/assets/images/hero_solidarity_tunisia_1793725181433.jpg',
    allowVisits: true,
    visitGuidelines: 'Permanence d’écoute et réception des dons de vêtements et fournitures.',
    tags: ['Association Sarra', 'Tunis', 'Soins Médicaux', 'Orphelins', 'Veuves']
  },
  {
    id: 'association-ofok',
    name: "Association Ofok (Parrainage d'Orphelinats Régionaux)",
    arabicName: "جمعية أفق لرعاية وتأهيل الأيتام بتونس",
    category: 'orphelinat',
    governorate: 'Ariana',
    city: 'Ariana Ville & Régions de l’Intérieur',
    address: 'Avenue Habib Bourguiba, Cité Ennozha, 2080 Ariana',
    phone: '+216 71 710 400',
    whatsapp: '+216 53 889 900',
    email: 'contact@ofok-tunisie.org',
    contactPerson: 'M. Adel Mathlouthi',
    role: 'Responsable des Programmes de Parrainage',
    verified: true,
    coordinates: { lat: 36.8625, lng: 10.1956 },
    urgentNeeds: [
      { item: 'Parrainages scolaires pour les orphelins des régions rurales', urgency: 'critique' },
      { item: 'Chauffages et vêtements d’hiver pour les foyers du Nord-Ouest', urgency: 'critique' },
      { item: 'Bourses de formation professionnelle pour les jeunes orphelins', urgency: 'haute' }
    ],
    beneficiariesCount: '620 orphelins parrainés dans 12 gouvernorats',
    bankDetails: {
      bankName: 'Banque Nationale Agricole (BNA)',
      rib: '03 010 0018 778899001 44',
      ccp: '17001-0000000089012-33',
      d17: '+216 53 889 900',
      beneficiaryName: 'Association Ofok Tunisie'
    },
    description: "Assure le parrainage régulier de centaines d'orphelins dans différentes régions de la Tunisie (Kasserine, Le Kef, Siliana, Jendouba, Sidi Bouzid). L'association veille à couvrir leurs besoins vitaux, leur scolarité et l'insertion professionnelle des grands adolescents.",
    openingHours: 'Lundi au Vendredi : 08h30 - 17h00',
    imageUrl: '/src/assets/images/winter_relief_tunisia_1793725183416.jpg',
    allowVisits: true,
    visitGuidelines: 'Possibilité d’établir une convention de parrainage direct avec suivi photographique et scolaire.',
    tags: ['Association Ofok', 'Parrainage Régional', 'Kafala', 'Régions Intérieures']
  },
  {
    id: 'association-amen-famille',
    name: "Association Amen de Famille",
    arabicName: "جمعية أمان للأسرة والطفولة",
    category: 'meskins_familles',
    governorate: 'Ben Arous',
    city: 'Mégrine / Ben Arous',
    address: 'Avenue de la République, 2033 Mégrine, Ben Arous',
    phone: '+216 71 296 150',
    whatsapp: '+216 94 550 330',
    email: 'amen.famille@topnet.tn',
    contactPerson: 'Mme Najoua Riahi',
    role: 'Coordinatrice Action Familiale',
    verified: true,
    coordinates: { lat: 36.7695, lng: 10.2356 },
    urgentNeeds: [
      { item: 'Prise en charge de loyers d’urgence pour familles menacées d’expulsion', urgency: 'critique' },
      { item: 'Denrées alimentaires non périssables (semoule, huile, couscous)', urgency: 'haute' },
      { item: 'Soutien psychologique et ateliers de parentalité positive', urgency: 'normale' }
    ],
    beneficiariesCount: '280 familles vulnérables et orphelins accompagnés',
    bankDetails: {
      bankName: 'Union Internationale de Banques (UIB)',
      rib: '12 015 0006 554433221 59',
      ccp: '17001-0000000090123-44',
      d17: '+216 94 550 330',
      beneficiaryName: 'Association Amen de Famille'
    },
    description: "Structure dédiée à la protection de l'enfance sans soutien et au renforcement des familles fragilisées. Elle intervient auprès des orphelins, des enfants en danger moral ou matériel et des mères isolées dans le grand Tunis et Ben Arous.",
    openingHours: 'Lundi au Samedi : 08h30 - 16h30',
    imageUrl: '/src/assets/images/food_basket_tunisia_1793725182929.jpg',
    allowVisits: true,
    visitGuidelines: 'Point de collecte de vêtements et distribution de couffins solidaires.',
    tags: ['Amen de Famille', 'Ben Arous', 'Protection Famille', 'Meskins']
  },
  {
    id: 'association-beity-tunis',
    name: "Association Beity (Femmes & Enfants sans Soutien)",
    arabicName: "جمعية بيتي لرعاية النساء والأطفال فاقدي السند",
    category: 'meskins_familles',
    governorate: 'Tunis',
    city: 'Médina de Tunis / Bab El Alouj',
    address: 'Rue Bab El Alouj, près de Bab Souika, 1006 Tunis Médina',
    phone: '+216 71 573 400',
    whatsapp: '+216 26 112 334',
    email: 'contact@beity-tunisie.org',
    contactPerson: 'Mme Sana Ben Achour',
    role: 'Directrice de l’Hébergement Social',
    verified: true,
    coordinates: { lat: 36.8042, lng: 10.1654 },
    urgentNeeds: [
      { item: 'Hébergement d’urgence et repas chauds pour mères et enfants à la rue', urgency: 'critique' },
      { item: 'Kits d’hygiène féminine et pédiatrique', urgency: 'critique' },
      { item: 'Soutien financier pour réinsertion professionnelle et micro-activités', urgency: 'haute' }
    ],
    beneficiariesCount: '350 femmes et enfants sans abri hébergés et réinsérés chaque année',
    bankDetails: {
      bankName: 'Banque Internationale Arabe de Tunisie (BIAT)',
      rib: '08 050 0003 778899112 05',
      ccp: '17001-0000000010293-84',
      d17: '+216 26 112 334',
      beneficiaryName: 'Association Beity Tunisie'
    },
    description: "Accueille, héberge et réinsère les femmes en situation de grande précarité, les mères célibataires et leurs enfants sans soutien familial ou victimes d'expulsion, en leur offrant un toit digne, une assistance juridique et des formations d'autonomie.",
    openingHours: 'Permanence d’urgence 24h/24 · Accueil administratif 09h00-17h00',
    imageUrl: '/src/assets/images/hero_solidarity_tunisia_1793725181433.jpg',
    allowVisits: true,
    visitGuidelines: 'L’adresse des hébergements d’urgence reste protégée pour la sécurité des résidentes. Dons reçus au siège.',
    tags: ['Beity', 'Sans Soutien', 'Hébergement d’Urgence', 'Mères Isolées', 'Médina Tunis']
  },
  {
    id: 'orphelins-gafsa',
    name: "Association de Soutien des Orphelins à Gafsa & Bassin Minier",
    arabicName: "جمعية رعاية وتأهيل الأيتام بقفصة والحوض المنجمي",
    category: 'orphelinat',
    governorate: 'Gafsa',
    city: 'Gafsa Centre & Métlaoui',
    address: 'Avenue Farhat Hached, face à la Gare, 2100 Gafsa',
    phone: '+216 76 225 900',
    whatsapp: '+216 54 990 110',
    email: 'orphelins.gafsa@gmail.com',
    contactPerson: 'M. Messaoud Chérif',
    role: 'Président du Comité Social',
    verified: true,
    coordinates: { lat: 34.4250, lng: 8.7842 },
    urgentNeeds: [
      { item: 'Aide alimentaire et couffins de première nécessité pour 150 foyers', urgency: 'critique' },
      { item: 'Appareils respiratoires pour enfants asthmatiques du bassin minier', urgency: 'critique' },
      { item: 'Cartables et fournitures pour élèves orphelins scolarisés', urgency: 'haute' }
    ],
    beneficiariesCount: '410 orphelins et 260 veuves pris en charge à Gafsa, Métlaoui et Redeyef',
    bankDetails: {
      bankName: 'Banque Nationale Agricole (BNA)',
      rib: '03 060 0019 112233445 18',
      ccp: '17001-0000000099112-76',
      d17: '+216 54 990 110',
      beneficiaryName: 'Association Soutien Orphelins Gafsa'
    },
    description: "Prend en charge avec dévouement les orphelins et les veuves dans tout le gouvernorat de Gafsa et les cités minières (Métlaoui, Redeyef, Moularès, El Guettar), avec un focus majeur sur la santé pédiatrique, la scolarisation et les colis alimentaires.",
    openingHours: 'Lundi au Samedi : 08h00 - 16h30',
    imageUrl: '/src/assets/images/food_basket_tunisia_1793725182929.jpg',
    allowVisits: true,
    visitGuidelines: 'Accueil chaleureux des donateurs et coordination des distributions directes aux familles.',
    tags: ['Gafsa', 'Bassin Minier', 'Orphelins', 'Kafala', 'Santé']
  },
  {
    id: 'sos-siliana',
    name: "SOS Village d'Enfants Siliana & Hauts-Plateaux",
    arabicName: "قرية الأطفال س و س بسليانة",
    category: 'orphelinat',
    governorate: 'Siliana',
    city: 'Siliana Ville',
    address: 'Avenue Habib Bourguiba, Cité des Roses, 6100 Siliana',
    phone: '+216 78 871 210',
    whatsapp: '+216 92 455 120',
    email: 'siliana@sos-tunisie.org',
    contactPerson: 'M. Hassen Mejri',
    role: 'Directeur du Village',
    verified: true,
    coordinates: { lat: 36.0847, lng: 9.3708 },
    urgentNeeds: [
      { item: 'Combustible & radiateurs à bain d’huile pour l’hiver', urgency: 'critique' },
      { item: 'Bottes de pluie et anoraks imperméables (tailles 4 à 16 ans)', urgency: 'critique' },
      { item: 'Manuels scolaires et ordinateurs portables pour révision', urgency: 'haute' }
    ],
    beneficiariesCount: '92 orphelins résidents + 280 enfants en milieu familial rural',
    bankDetails: {
      bankName: 'Société Tunisienne de Banque (STB)',
      rib: '10 000 0015 998877665 14',
      ccp: '17001-0000000099881-33',
      d17: '+216 92 455 120',
      beneficiaryName: "Comité de Soutien SOS Siliana"
    },
    description: "Situé au cœur de la dorsale tunisienne, ce village protège les orphelins des régions rurales montagneuses exposées aux rudes hivers et soutient également les familles monoparentales des douars voisins.",
    openingHours: 'Tous les jours : 08h00 - 18h00',
    imageUrl: '/src/assets/images/winter_relief_tunisia_1793725183416.jpg',
    allowVisits: true,
    visitGuidelines: 'Accueil chaleureux des bénévoles et donateurs. Visite possible sur préavis téléphonique.',
    tags: ['Hiver Grand Froid', 'Orphelins', 'Siliana', 'Makthar', 'Kafala']
  },
  {
    id: 'el-khalil-ettadhamen',
    name: "Association Solidarité Al-Khalil - Ettadhamen & Douar Hicher",
    arabicName: "جمعية الخليل للتضامن الاجتماعي بالتضامن ودوار هيشر",
    category: 'meskins_familles',
    governorate: 'Ariana',
    city: 'Cité Ettadhamen',
    address: 'Rue 105, Cité Ettadhamen, 2041 Ariana / Tunis',
    phone: '+216 71 544 310',
    whatsapp: '+216 99 778 812',
    email: 'solidarite.khalil@gmail.com',
    contactPerson: 'Cheikh Mourad Trabelsi',
    role: 'Délégué d’Enquêtes Sociales',
    verified: true,
    coordinates: { lat: 36.8375, lng: 10.1189 },
    urgentNeeds: [
      { item: 'Prise en charge de loyers d’urgence pour 14 mères veuves', urgency: 'critique' },
      { item: 'Paniers de denrées de base (huile, semoule, concentré, sucre)', urgency: 'haute' },
      { item: 'Médicaments pour malades chroniques (diabète, hypertension)', urgency: 'haute' }
    ],
    beneficiariesCount: '420 familles nécessiteuses et orphelins répertoriés',
    bankDetails: {
      bankName: 'Banque de Tunisie (BT)',
      rib: '05 101 0200 887766554 21',
      ccp: '17001-0000000055442-90',
      d17: '+216 99 778 812',
      beneficiaryName: 'Association El-Khalil Tadhmon'
    },
    description: "Intervention au sein des quartiers les plus denses de la capitale. Enquêtes de terrain méticuleuses pour identifier les meskins et familles sans aucune source de revenu, afin de leur distribuer des vivres et sécuriser leur loyer.",
    openingHours: 'Mardi au Dimanche : 09h00 - 19h00',
    imageUrl: '/src/assets/images/food_basket_tunisia_1793725182929.jpg',
    allowVisits: true,
    visitGuidelines: 'Possibilité d’accompagner les bénévoles lors des tournées de distribution directe aux familles.',
    tags: ['Meskins', 'Familles Nécessiteuses', 'Paniers Alimentaires', 'Ettadhamen', 'Loyer']
  },
  {
    id: 'resto-coeur-bab-souika',
    name: "Mawäid Al-Khir & Cantine Solidaire Bab Souika",
    arabicName: "موائد الخير والمطعم التضامني بباب سويقة",
    category: 'sans_abris_restos',
    governorate: 'Tunis',
    city: 'Médina de Tunis',
    address: 'Place Bab Souika, derrière la Mosquée Sidi Mahrez, 1006 Tunis',
    phone: '+216 71 570 890',
    whatsapp: '+216 26 333 444',
    email: 'cantine.babsouika@tadhmon.tn',
    contactPerson: 'Ammi Moncef Guerfali',
    role: 'Chef Cuisinier & Responsable des Maraudes',
    verified: true,
    coordinates: { lat: 36.8049, lng: 10.1681 },
    urgentNeeds: [
      { item: 'Sacs de semoule pour couscous et pâtes alimentaires (vrac)', urgency: 'critique' },
      { item: 'Bidons d’huile végétale et viande/poulet frais', urgency: 'critique' },
      { item: 'Conteneurs thermiques et barquettes recyclables', urgency: 'normale' }
    ],
    beneficiariesCount: '350 repas chauds servis chaque midi et soir',
    bankDetails: {
      bankName: 'Attijari Bank Tunisie',
      rib: '04 012 0003 334455667 91',
      ccp: '17001-0000000011223-45',
      d17: '+216 26 333 444',
      beneficiaryName: 'Collectif Mawäid Al-Khir Bab Souika'
    },
    description: "Fournit quotidiennement des repas complets, chauds et dignes aux personnes sans domicile fixe, aux meskins isolés, aux personnes âgées sans retraite et aux étudiants démunis de passage dans la capitale.",
    openingHours: '7j/7 : Service repas 11h30-14h30 et 18h30-20h30',
    imageUrl: '/src/assets/images/community_soup_kitchen_1793727193967.jpg',
    allowVisits: true,
    visitGuidelines: 'Les bénévoles sont les bienvenus chaque matin dès 08h00 pour la préparation des légumes et du service.',
    tags: ['Repas Chauds', 'Sans-Abris', 'Médina Tunis', 'Mawäid Al-Khir', 'Pauvres']
  },
  {
    id: 'caravane-kasserine',
    name: "Collectif Solidarité Chaâmbi & Foussana",
    arabicName: "تجمع تضامن الشعانبي وفوسانة لرعاية الفقراء والمحتاجين",
    category: 'collecte_urgence',
    governorate: 'Kasserine',
    city: 'Foussana / Thala',
    address: 'Route Nationale 13, face au complexe artisanal, 1220 Kasserine',
    phone: '+216 77 470 150',
    whatsapp: '+216 52 119 900',
    email: 'kasserine.solidarite@gmail.com',
    contactPerson: 'Mme Radhia Bouazizi',
    role: 'Coordonnatrice de Terrain',
    verified: true,
    coordinates: { lat: 35.1676, lng: 8.8365 },
    urgentNeeds: [
      { item: 'Couvertures en laine épaisses et matelas neufs', urgency: 'critique' },
      { item: 'Chauffages d’appoint à pétrole et poêles à bois sécurisés', urgency: 'critique' },
      { item: 'Chaussures d’hiver pour enfants des écoles rurales (28 au 38)', urgency: 'critique' }
    ],
    beneficiariesCount: '650 familles et orphelins des zones montagneuses',
    bankDetails: {
      bankName: 'Banque Nationale Agricole (BNA)',
      rib: '03 050 0012 345678901 55',
      ccp: '17001-0000000077889-12',
      d17: '+216 52 119 900',
      beneficiaryName: 'Comité d’Aide d’Urgence Kasserine'
    },
    description: "Point de coordination logistique pour les secours d'hiver dans les hameaux enclavés de Kasserine, Thala, Haïdra et Foussana, où les températures descendent souvent sous zéro degré avec des chutes de neige fréquentes.",
    openingHours: 'Lundi au Dimanche : 08h00 - 20h00',
    imageUrl: '/src/assets/images/winter_relief_tunisia_1793725183416.jpg',
    allowVisits: true,
    visitGuidelines: 'Point de dépose de colis et de départ des convois 4x4 vers les mechtas isolées.',
    tags: ['Kasserine', 'Thala', 'Hiver', 'Couvertures', 'Zone Montagneuse']
  },
  {
    id: 'sos-mahres-sfax',
    name: "SOS Village d'Enfants Mahres & Sud Tunisien",
    arabicName: "قرية الأطفال س و س بالمحرس - صفاقس",
    category: 'orphelinat',
    governorate: 'Sfax',
    city: 'Mahres',
    address: 'Route de Gabès Km 32, 3060 Mahres, Sfax',
    phone: '+216 74 690 410',
    whatsapp: '+216 98 440 330',
    email: 'mahres@sos-tunisie.org',
    contactPerson: 'M. Sami Louhichi',
    role: 'Responsable Pédagogique',
    verified: true,
    coordinates: { lat: 34.5333, lng: 10.5000 },
    urgentNeeds: [
      { item: 'Prise en charge de séances d’orthophonie et psychomotricité', urgency: 'critique' },
      { item: 'Abonnements de transport scolaire pour collégiens et lycéens', urgency: 'haute' },
      { item: 'Kits d’activités artistiques et sportives', urgency: 'normale' }
    ],
    beneficiariesCount: '105 enfants accueillis au village + 310 en soutien familial',
    bankDetails: {
      bankName: 'Amen Bank',
      rib: '07 010 0023 456789012 60',
      ccp: '17001-0000000033445-67',
      d17: '+216 98 440 330',
      beneficiaryName: 'Association SOS Villages Enfants Mahres'
    },
    description: "Refuge chaleureux pour les enfants privés de famille dans la région de Sfax et du Sud tunisien. Le village propose un cadre de vie affectueux, une scolarité suivie et des ateliers de découverte culturelle.",
    openingHours: 'Lundi au Vendredi : 08h30 - 17h00',
    imageUrl: '/src/assets/images/orphan_care_village_1793725182874.jpg',
    allowVisits: true,
    visitGuidelines: 'Accueil des parrains et marraines lors des journées portes ouvertes et sur rendez-vous.',
    tags: ['Sfax', 'Mahres', 'Orphelins', 'Kafala', 'Enfance']
  },
  {
    id: 'sos-akouda-sousse',
    name: "SOS Village d'Enfants Akouda - Sahel",
    arabicName: "قرية الأطفال س و س بأكودة - سوسة",
    category: 'orphelinat',
    governorate: 'Sousse',
    city: 'Akouda',
    address: 'Cité El Wifak, 4022 Akouda, Sousse',
    phone: '+216 73 308 120',
    whatsapp: '+216 94 220 110',
    email: 'akouda@sos-tunisie.org',
    contactPerson: 'Mme Leila Dridi',
    role: 'Directrice Pédagogique',
    verified: true,
    coordinates: { lat: 35.8711, lng: 10.5694 },
    urgentNeeds: [
      { item: 'Équipements pour salle informatique et codage', urgency: 'haute' },
      { item: 'Vêtements de fête pour l’Aïd et chaussures neuves', urgency: 'haute' },
      { item: 'Alimentation saine et produits laitiers frais', urgency: 'normale' }
    ],
    beneficiariesCount: '110 orphelins résidents',
    bankDetails: {
      bankName: 'Union Internationale de Banques (UIB)',
      rib: '12 000 0001 234567890 32',
      ccp: '17001-0000000066778-54',
      d17: '+216 94 220 110',
      beneficiaryName: 'SOS Akouda Sahel'
    },
    description: "Village fondé pour assurer le bien-être, l'éveil intellectuel et la sécurité d'enfants sans soutien familial dans tout le gouvernorat de Sousse, Monastir et Mahdia.",
    openingHours: 'Lundi au Samedi : 09h00 - 17h00',
    imageUrl: '/src/assets/images/orphan_care_village_1793725182874.jpg',
    allowVisits: true,
    visitGuidelines: 'Parrainage individuel et visites familiales organisées chaque premier dimanche du mois.',
    tags: ['Sousse', 'Akouda', 'Sahel', 'Orphelins', 'Kafala']
  },
  {
    id: 'dar-al-yatim-kairouan',
    name: "Foyer Al-Yatim & Soutien des Veuves de Kairouan",
    arabicName: "دار اليتيم وكفالة الأرامل بالقيروان",
    category: 'meskins_familles',
    governorate: 'Kairouan',
    city: 'Kairouan Médina',
    address: 'Près de Bir Barouta, Rue Ali Belhouane, 3100 Kairouan',
    phone: '+216 77 232 500',
    whatsapp: '+216 58 700 900',
    email: 'alyatim.kairouan@gmail.com',
    contactPerson: 'Haj Othman Triki',
    role: 'Président d’Honneur',
    verified: true,
    coordinates: { lat: 35.6781, lng: 10.0963 },
    urgentNeeds: [
      { item: 'Kafalat mensuelles pour 60 orphelins scolarisés (60 TND/mois)', urgency: 'critique' },
      { item: 'Réfection de 8 maisons dégradées de veuves sans ressources', urgency: 'critique' },
      { item: 'Cartables et fournitures scolaires complètes', urgency: 'haute' }
    ],
    beneficiariesCount: '290 orphelins et 180 familles de veuves',
    bankDetails: {
      bankName: 'Banque Nationale Agricole (BNA)',
      rib: '03 015 0005 678901234 77',
      ccp: '17001-0000000088112-29',
      d17: '+216 58 700 900',
      beneficiaryName: 'Association Al-Yatim Kairouan'
    },
    description: "Institution caritative historique de la ville sainte de Kairouan, soutenant les orphelins et les veuves (meskins) des quartiers populaires et des campagnes périphériques (Sbikha, Chebika, Oueslatia).",
    openingHours: 'Samedi au Jeudi : 08h30 - 16h30',
    imageUrl: '/src/assets/images/hero_solidarity_tunisia_1793725181433.jpg',
    allowVisits: true,
    visitGuidelines: 'Accueil des donateurs pour remise directe de dons ou signature d’engagements de parrainage.',
    tags: ['Kairouan', 'Veuves', 'Orphelins', 'Kafala', 'Meskins']
  },
  {
    id: 'banque-alimentaire-sud-gabes',
    name: "Banque Alimentaire & Secours Social Sud (Gabès & Medenine)",
    arabicName: "بنك الغذاء والتضامن بالجنوب التونسي - قابس ومدنين",
    category: 'meskins_familles',
    governorate: 'Gabès',
    city: 'Gabès Ville',
    address: 'Boulevard Mohamed Ali, Bab Bhar, 6000 Gabès',
    phone: '+216 75 275 800',
    whatsapp: '+216 93 660 770',
    email: 'sud.solidarite@tadhmon.tn',
    contactPerson: 'M. Belgacem Zammouri',
    role: 'Directeur Logistique',
    verified: true,
    coordinates: { lat: 33.8815, lng: 10.0982 },
    urgentNeeds: [
      { item: 'Paniers de dattes, huile et farine pour les familles des oasis', urgency: 'critique' },
      { item: 'Aide à l’achat d’eau potable filtrée pour les foyers isolés', urgency: 'haute' },
      { item: 'Médicaments respiratoires et aérosols pédiatriques', urgency: 'haute' }
    ],
    beneficiariesCount: '520 familles démunies prises en charge',
    bankDetails: {
      bankName: 'Banque de l’Habitat (BH Bank)',
      rib: '14 020 0008 123456789 19',
      ccp: '17001-0000000022334-88',
      d17: '+216 93 660 770',
      beneficiaryName: 'Banque Alimentaire Gabès-Sud'
    },
    description: "Apporte une assistance vitale continue aux oasis rurales de Chenini, El Hamma et aux confins de Médenine et Ben Guerdane. Priorité accordée aux personnes âgées sans retraite et aux enfants malades.",
    openingHours: 'Lundi au Vendredi : 08h00 - 17h00',
    imageUrl: '/src/assets/images/food_basket_tunisia_1793725182929.jpg',
    allowVisits: true,
    visitGuidelines: 'Les visiteurs peuvent participer à la confection des colis alimentaires chaque mercredi.',
    tags: ['Gabès', 'Sud Tunisien', 'Oasis', 'Paniers de Secours', 'Meskins']
  },
  {
    id: 'foyer-ain-draham-jendouba',
    name: "Foyer d'Urgence Hivernale & Enfance de Jendouba",
    arabicName: "مركز الطوارئ الشتوية ورعاية الطفولة بجندوبة وعين دراهم",
    category: 'collecte_urgence',
    governorate: 'Jendouba',
    city: 'Aïn Draham',
    address: 'Route des Chênes-Lièges, 8110 Aïn Draham',
    phone: '+216 78 655 400',
    whatsapp: '+216 29 110 880',
    email: 'aindraham.relief@gmail.com',
    contactPerson: 'Mme Fatma Ghazouani',
    role: 'Responsable Action Sociale',
    verified: true,
    coordinates: { lat: 36.7803, lng: 8.6881 },
    urgentNeeds: [
      { item: 'Poêles à bois et combustible sécurisé pour 70 foyers', urgency: 'critique' },
      { item: 'Manteaux très chauds et chaussettes thermiques enfants', urgency: 'critique' },
      { item: 'Denrées caloriques non périssables (semoule, miel, huile, légumineuses)', urgency: 'haute' }
    ],
    beneficiariesCount: '480 habitants et écoliers des montagnes de Kroumirie',
    bankDetails: {
      bankName: 'Banque Nationale Agricole (BNA)',
      rib: '03 070 0014 556677889 05',
      ccp: '17001-0000000044556-78',
      d17: '+216 29 110 880',
      beneficiaryName: 'Secours Montagne Jendouba'
    },
    description: "Dans la région la plus arrosée et la plus froide de Tunisie, ce centre stocke et achemine les dons de vêtements chauds, couvertures et vivres aux familles des douars coupés par les neiges hivernales.",
    openingHours: '7j/7 pendant la saison hivernale (Novembre à Mars)',
    imageUrl: '/src/assets/images/winter_relief_tunisia_1793725183416.jpg',
    allowVisits: true,
    visitGuidelines: 'Dépôt direct de vêtements propres et triés. Caravanes de distribution le week-end.',
    tags: ['Aïn Draham', 'Jendouba', 'Neige', 'Froid', 'Vêtements Chauds']
  },
  {
    id: 'maraudes-nuit-sfax',
    name: "Maraudes Solidaires de Nuit & Refuge Bab Diwan",
    arabicName: "دوريات الإغاثة الليلية وملجأ باب الديوان بصفاقس",
    category: 'sans_abris_restos',
    governorate: 'Sfax',
    city: 'Sfax Médina',
    address: 'Près de Bab Diwan, Rue des Bijoutiers, 3000 Sfax',
    phone: '+216 74 221 900',
    whatsapp: '+216 50 880 770',
    email: 'maraudes.sfax@solidarite.tn',
    contactPerson: 'Dr. Maher Fakhfakh',
    role: 'Médecin Bénévole & Maraudeur',
    verified: true,
    coordinates: { lat: 34.7406, lng: 10.7603 },
    urgentNeeds: [
      { item: 'Sacs de couchage grand froid et bâches isolantes', urgency: 'critique' },
      { item: 'Kits d’hygiène corporelle et soins de premiers secours', urgency: 'haute' },
      { item: 'Thermos et soupes chaudes nutritives prêtes à servir', urgency: 'haute' }
    ],
    beneficiariesCount: '180 sans-abris et personnes en errance suivis',
    bankDetails: {
      bankName: 'Banque Internationale Arabe de Tunisie (BIAT)',
      rib: '08 030 0002 998877665 43',
      ccp: '17001-0000000055667-11',
      d17: '+216 50 880 770',
      beneficiaryName: 'Collectif Maraudes et Secours Sfax'
    },
    description: "Équipes mixtes de soignants et de bénévoles parcourant les rues de Sfax, de la gare et des faubourgs chaque nuit pour apporter soins médicaux, nourriture chaude et écoute aux sans-abris et démunis.",
    openingHours: 'Permanence d’urgence : 20h00 - 02h00 chaque nuit',
    imageUrl: '/src/assets/images/hero_solidarity_tunisia_1793725181433.jpg',
    allowVisits: true,
    visitGuidelines: 'Inscription requise pour participer aux maraudes de nuit (majeurs uniquement).',
    tags: ['Sfax', 'Sans-Abris', 'Maraudes', 'Soins Médicaux', 'Nuit']
  },
  {
    id: 'solidarite-bizerte-menzel',
    name: "Foyer d'Accueil de l'Enfance et des Veuves de Bizerte",
    arabicName: "دار رعاية الطفولة والأرامل ببنزرت ومنزل بورقيبة",
    category: 'orphelinat',
    governorate: 'Bizerte',
    city: 'Menzel Bourguiba',
    address: 'Boulevard de l’Indépendance, 7050 Menzel Bourguiba',
    phone: '+216 72 460 300',
    whatsapp: '+216 97 101 202',
    email: 'enfance.bizerte@gmail.com',
    contactPerson: 'Mme Jamila Boukadida',
    role: 'Assistante Sociale en Chef',
    verified: true,
    coordinates: { lat: 37.1536, lng: 9.7858 },
    urgentNeeds: [
      { item: 'Kits d’ordinateurs reconditionnés pour les lycéens orphelins', urgency: 'haute' },
      { item: 'Chaussures de sport et tenues scolaires neuves', urgency: 'normale' },
      { item: 'Aliments riches en protéines pour la cantine des enfants', urgency: 'normale' }
    ],
    beneficiariesCount: '75 orphelins accueillis + 160 familles suivies',
    bankDetails: {
      bankName: 'Banque Zitouna',
      rib: '25 000 0010 112233445 78',
      ccp: '17001-0000000077665-99',
      d17: '+216 97 101 202',
      beneficiaryName: 'Association Enfance Espoir Bizerte'
    },
    description: "Accompagnement global des enfants ayant perdu l'un ou leurs deux parents dans le nord de la Tunisie. Soutien scolaire intensif, soutien psychologique et aide alimentaire pour la mère veuve tutrice.",
    openingHours: 'Lundi au Vendredi : 08h30 - 17h00',
    imageUrl: '/src/assets/images/orphan_care_village_1793725182874.jpg',
    allowVisits: true,
    visitGuidelines: 'Visite des ateliers éducatifs le mercredi et le samedi matin.',
    tags: ['Bizerte', 'Menzel Bourguiba', 'Orphelins', 'Kafala', 'Éducation']
  },
  {
    id: 'al-inssaf-sidi-bouzid',
    name: "Centre Al-Inssaf de Protection des Orphelins & Pauvres",
    arabicName: "مركز الإنصاف لرعاية الأيتام والمحتاجين بسيدي بوزيد",
    category: 'meskins_familles',
    governorate: 'Sidi Bouzid',
    city: 'Sidi Bouzid Centre',
    address: 'Avenue de la Révolution, Cité Ennour, 9100 Sidi Bouzid',
    phone: '+216 76 630 180',
    whatsapp: '+216 53 440 220',
    email: 'alinssaf.bouzid@gmail.com',
    contactPerson: 'M. Ali Gammoudi',
    role: 'Responsable Projets Solidaires',
    verified: true,
    coordinates: { lat: 35.0382, lng: 9.4849 },
    urgentNeeds: [
      { item: 'Financement de 15 micro-projets artisanaux pour mères orphelines', urgency: 'critique' },
      { item: 'Couvertures et vêtements pour enfants des écoles de campagne', urgency: 'critique' },
      { item: 'Sacs de blé dur et denrées pour les foyers de Regueb et Menzel Bouzaiane', urgency: 'haute' }
    ],
    beneficiariesCount: '380 orphelins et 220 foyers en détresse',
    bankDetails: {
      bankName: 'Banque Nationale Agricole (BNA)',
      rib: '03 040 0011 889900112 34',
      ccp: '17001-0000000099443-18',
      d17: '+216 53 440 220',
      beneficiaryName: 'Association Al-Inssaf Sidi Bouzid'
    },
    description: "Dans le centre de la Tunisie, ce centre lutte contre la précarité extrême en alliant aide d'urgence immédiate (vivres, kafala pour orphelins) et autonomisation économique des femmes veuves chargées d'enfants.",
    openingHours: 'Lundi au Samedi : 08h00 - 16h30',
    imageUrl: '/src/assets/images/food_basket_tunisia_1793725182929.jpg',
    allowVisits: true,
    visitGuidelines: 'Possibilité de rencontrer les familles dans le respect de leur intimité et dignité.',
    tags: ['Sidi Bouzid', 'Autonomie', 'Orphelins', 'Pauvreté', 'Micro-projets']
  },
  {
    id: 'etudiant-solidaire-tunis',
    name: "Maison de l'Étudiant Démuni & Bourses Campus",
    arabicName: "دار الطالب المتكفل والمنح الجامعية التضامنية بتونس",
    category: 'etudiants',
    governorate: 'Tunis',
    city: 'Campus El Manar / Cité Universitaire',
    address: 'Campus Universitaire Farhat Hached, El Manar 1, 2092 Tunis',
    phone: '+216 71 872 300',
    whatsapp: '+216 28 550 440',
    email: 'etudiants.solidaires@tunisie.tn',
    contactPerson: 'Pr. Karim Cherif',
    role: 'Président du Fonds Social Universitaire',
    verified: true,
    coordinates: { lat: 36.8333, lng: 10.1481 },
    urgentNeeds: [
      { item: 'Prise en charge de 45 loyers de chambres étudiantes privées', urgency: 'critique' },
      { item: 'Ordinateurs portables reconditionnés pour étudiants boursiers', urgency: 'critique' },
      { item: 'Recharges de cartes resto et paniers de provisions mensuels', urgency: 'haute' }
    ],
    beneficiariesCount: '340 étudiants venus de régions intérieures sans revenus',
    bankDetails: {
      bankName: 'Banque de Tunisie (BT)',
      rib: '05 010 0003 445566778 92',
      ccp: '17001-0000000088223-14',
      d17: '+216 28 550 440',
      beneficiaryName: 'Comité de Soutien aux Étudiants Démunis'
    },
    description: "Soutient les étudiants brillants mais démunis issus de familles nécessiteuses de l’intérieur du pays (Kasserine, Siliana, Sidi Bouzid, Gafsa, Kébili). Nous finançons leur loyer, leur nourriture, leurs abonnements de transport et leur matériel informatique pour éviter le décrochage.",
    openingHours: 'Lundi au Vendredi : 08h30 - 18h00',
    imageUrl: '/src/assets/images/student_study_tunisia_1793727193083.jpg',
    allowVisits: true,
    visitGuidelines: 'Dons de PC portables fonctionnels, livres universitaires et prise en charge de loyers.',
    tags: ['Étudiants', 'Bourses', 'Campus El Manar', 'Loyer Étudiant', 'Éducation']
  },
  {
    id: 'tayssir-zawaj-tunis',
    name: "Association Tayssir Al-Zawaj & Trousseau Solidaire",
    arabicName: "جمعية تيسير زواج الشباب وجهاز العرائس المتعففات",
    category: 'jeunes_maries',
    governorate: 'Tunis',
    city: 'Tunis Médina & Grand Tunis',
    address: 'Rue de la Kasbah, près de la Place du Gouvernement, 1006 Tunis',
    phone: '+216 71 561 700',
    whatsapp: '+216 96 330 220',
    email: 'tayssir.zawaj@gmail.com',
    contactPerson: 'Cheikh Taoufik Ben Salah',
    role: 'Coordinateur des Dons d’Installation',
    verified: true,
    coordinates: { lat: 36.7988, lng: 10.1672 },
    urgentNeeds: [
      { item: 'Packs électroménager de base (réfrigérateurs, gazinières simples)', urgency: 'critique' },
      { item: 'Matelas orthopédiques neufs et couvertures pour jeunes foyers', urgency: 'critique' },
      { item: 'Trousseaux de literie et vaisselle de cuisine essentielle', urgency: 'haute' }
    ],
    beneficiariesCount: '120 jeunes couples sans ressources accompagnés pour fonder un foyer',
    bankDetails: {
      bankName: 'Banque Zitouna',
      rib: '25 000 0015 667788990 12',
      ccp: '17001-0000000077334-55',
      d17: '+216 96 330 220',
      beneficiaryName: 'Association Tayssir Al-Zawaj Tunisie'
    },
    description: "Permet aux jeunes hommes et jeunes femmes orphelins ou issus de familles très pauvres de se marier dignement. L'association fournit le trousseau de base (jhez), les meubles essentiels et l'électroménager pour démarrer leur vie sans dettes étouffantes.",
    openingHours: 'Mardi au Samedi : 09h00 - 17h00',
    imageUrl: '/src/assets/images/young_couple_home_tunisia_1793727194304.jpg',
    allowVisits: true,
    visitGuidelines: 'Dons de meubles neufs ou en très bon état acceptés au dépôt de stockage.',
    tags: ['Jeunes Mariés', 'Mariage Solidaire', 'Trousseau', 'Électroménager', 'Foyer']
  },
  {
    id: 'artisans-kasb-elyad',
    name: "Fonds Kasb Al-Yad & Ateliers des Artisans en Péril",
    arabicName: "مبادرة كسب اليد لدعم الحرفيين والمهنيين المتعففين",
    category: 'artisans_metiers',
    governorate: 'Tunis',
    city: 'Souks de la Médina & Nabeul',
    address: 'Souk des Chéchias, Médina de Tunis, 1000 Tunis',
    phone: '+216 71 328 400',
    whatsapp: '+216 98 554 110',
    email: 'kasbelyad.tunisie@gmail.com',
    contactPerson: 'Ammi Habib Chaabane',
    role: 'Maître Artisan & Délégué Solidaire',
    verified: true,
    coordinates: { lat: 36.7979, lng: 10.1706 },
    urgentNeeds: [
      { item: 'Achat de 20 machines à coudre professionnelles pour couturières à domicile', urgency: 'critique' },
      { item: 'Fourniture de matières premières (cuir, laine brute, argile, fils)', urgency: 'haute' },
      { item: 'Remplacement d’outils d’ateliers détériorés (menuisiers, cordonniers)', urgency: 'haute' }
    ],
    beneficiariesCount: '190 artisans, menuisiers et couturières relancés dans leur métier',
    bankDetails: {
      bankName: 'Amen Bank',
      rib: '07 020 0011 223344556 81',
      ccp: '17001-0000000066221-90',
      d17: '+216 98 554 110',
      beneficiaryName: 'Collectif Kasb Al-Yad Solidarité Artisans'
    },
    description: "Plutôt que de distribuer seulement de l'aumône passagère, ce fonds permet aux artisans démunis, pères et mères de famille, d'acheter les machines et matières premières indispensables pour vivre dignement du fruit de leurs mains (couture, dinanderie, céramique, menuiserie, cordonnerie).",
    openingHours: 'Lundi au Vendredi : 08h30 - 16h30',
    imageUrl: '/src/assets/images/artisan_pottery_tunisia_1793727193562.jpg',
    allowVisits: true,
    visitGuidelines: 'Visites d’ateliers et commandes solidaires auprès des artisans partenaires.',
    tags: ['Artisans', 'Petits Métiers', 'Machine à Coudre', 'Autonomie', 'Dignité']
  },
  {
    id: 'femmes-potieres-sejnane',
    name: "Atelier Solidaire des Femmes Potières de Sejnane",
    arabicName: "الورشة التضامنية لخزافات سجنان التراثية",
    category: 'artisans_metiers',
    governorate: 'Bizerte',
    city: 'Sejnane',
    address: 'Route de Nefza, 7012 Sejnane, Bizerte',
    phone: '+216 72 490 200',
    whatsapp: '+216 52 334 110',
    email: 'potieres.sejnane@gmail.com',
    contactPerson: 'Khalti Zohra Saidi',
    role: 'Déléguée des Potières de Sejnane',
    verified: true,
    coordinates: { lat: 37.0569, lng: 9.2386 },
    urgentNeeds: [
      { item: 'Fours sécurisés et combustible végétal pour 30 artisanes rurales', urgency: 'critique' },
      { item: 'Financement de transport pour l’acheminement des créations vers les foires', urgency: 'haute' },
      { item: 'Paniers de soutien d’hiver pour les artisanes âgées', urgency: 'haute' }
    ],
    beneficiariesCount: '85 artisanes potières du patrimoine UNESCO soutenues',
    bankDetails: {
      bankName: 'Banque Nationale Agricole (BNA)',
      rib: '03 080 0009 334455667 22',
      ccp: '17001-0000000044119-33',
      d17: '+216 52 334 110',
      beneficiaryName: 'Association Potières Rurales Sejnane'
    },
    description: "Soutient les mères de famille artisanes de Sejnane, dont le savoir-faire ancestral de modelage de l'argile est classé au patrimoine mondial de l'UNESCO. Ces femmes subviennent seules aux besoins de leurs enfants dans une région rurale isolée.",
    openingHours: 'Tous les jours : 08h00 - 17h00',
    imageUrl: '/src/assets/images/artisan_pottery_tunisia_1793727193562.jpg',
    allowVisits: true,
    visitGuidelines: 'Accueil direct au village pour découvrir et acheter directement sans intermédiaire.',
    tags: ['Sejnane', 'Bizerte', 'Potières', 'UNESCO', 'Artisanat Féminin']
  },
  {
    id: 'parents-dignite-nourrissons',
    name: "Réseau Dignité Parents en Détresse & Nourrissons",
    arabicName: "شبكة كرامة الأولياء المتعففين ورعاية الرضع",
    category: 'parents_familles',
    governorate: 'Manouba',
    city: 'Denden & Oued Ellil',
    address: 'Rue Habib Thameur, 2011 Denden, Manouba',
    phone: '+216 71 610 880',
    whatsapp: '+216 99 441 550',
    email: 'parents.dignite@topnet.tn',
    contactPerson: 'Mme Amel Mansouri',
    role: 'Assistante d’Urgence Familiale',
    verified: true,
    coordinates: { lat: 36.8115, lng: 10.1118 },
    urgentNeeds: [
      { item: 'Couches pédiatriques et laits infantiles 1er/2ème âge pour 70 bébés', urgency: 'critique' },
      { item: 'Prise en charge de factures d’énergie (STEG/SONEDE) pour éviter coupures', urgency: 'haute' },
      { item: 'Inscriptions scolaires et fournitures pour enfants de familles monoparentales', urgency: 'haute' }
    ],
    beneficiariesCount: '310 parents isolés et couples avec enfants en bas âge',
    bankDetails: {
      bankName: 'Société Tunisienne de Banque (STB)',
      rib: '10 030 0017 889900112 40',
      ccp: '17001-0000000022881-77',
      d17: '+216 99 441 550',
      beneficiaryName: 'Réseau Dignité Parents Manouba'
    },
    description: "Vient au secours des parents qui ne parviennent plus à joindre les deux bouts : pères de famille au chômage forcé, mères seules avec bébés, parents malades. Nous prévenons les ruptures de foyer et garantissons que les enfants aient à manger, des couches et un toit sécurisé.",
    openingHours: 'Lundi au Samedi : 08h30 - 17h00',
    imageUrl: '/src/assets/images/orphan_care_village_1793725182874.jpg',
    allowVisits: true,
    visitGuidelines: 'Dons de couches, lait en poudre, vêtements pour bébés et paiement direct de factures d’eau/électricité.',
    tags: ['Parents', 'Nourrissons', 'Couches', 'Lait Bébé', 'Manouba']
  },
  {
    id: 'foyer-etudiants-sfax',
    name: "Foyer Solidaire & Entraide Étudiante de Sfax",
    arabicName: "دار التضامن الطلابي والوجبات الجامعية بصفاقس",
    category: 'etudiants',
    governorate: 'Sfax',
    city: 'Sfax Universités (Route de l’Aérodrome / Sakiet Ezzit)',
    address: 'Route de l’Aérodrome Km 3, 3018 Sfax',
    phone: '+216 74 450 110',
    whatsapp: '+216 51 229 880',
    email: 'etudiants.sfax@solidarite.tn',
    contactPerson: 'Dr. Anis Kammoun',
    role: 'Directeur du Restaurant Étudiant Solidaire',
    verified: true,
    coordinates: { lat: 34.7600, lng: 10.7400 },
    urgentNeeds: [
      { item: 'Repas du soir chauds gratuits pour 200 étudiants sans bourse', urgency: 'critique' },
      { item: 'Aide d’urgence au paiement des cautions et loyers de studios partagés', urgency: 'critique' },
      { item: 'Connexions 4G et clés internet pour révisions et thèses de fin d’études', urgency: 'haute' }
    ],
    beneficiariesCount: '250 étudiants du Sud et du Centre accueillis à Sfax',
    bankDetails: {
      bankName: 'Banque Internationale Arabe de Tunisie (BIAT)',
      rib: '08 030 0005 667788990 31',
      ccp: '17001-0000000055119-48',
      d17: '+216 51 229 880',
      beneficiaryName: 'Association Entraide Étudiante Sfax'
    },
    description: "Sfax accueille des milliers d'étudiants venus de Sidi Bouzid, Gafsa, Kasserine, Kébili et Tataouine. Ce centre offre des repas chauds le soir, un espace de travail chauffé avec connexion internet gratuite et une cellule d'aide au logement.",
    openingHours: 'Tous les jours : 10h00 - 22h00',
    imageUrl: '/src/assets/images/student_study_tunisia_1793727193083.jpg',
    allowVisits: true,
    visitGuidelines: 'Les restaurateurs et particuliers peuvent apporter des denrées ou parrainer le repas d’un étudiant.',
    tags: ['Sfax', 'Étudiants', 'Repas Chauds', 'Logement Étudiant', 'Solidarité Universitaire']
  }
];

export const URGENT_CAMPAIGNS: UrgentCampaign[] = [
  {
    id: 'campagne-froid-kasserine-siliana',
    title: 'Caravane Grand Froid : 1 200 Couvertures & Chauffages en Montagne',
    arabicTitle: 'قافلة دفء الشتاء : 1200 غطاء صوفي ووسائل تدفئة لجبال القصرين وسليانة',
    governorate: 'Kasserine & Siliana',
    location: 'Thala, Foussana, Makthar, Kesra',
    targetAmountTND: 45000,
    raisedAmountTND: 34850,
    donorsCount: 412,
    daysLeft: 9,
    urgencyLevel: 'critique',
    category: 'hiver_froid',
    imageUrl: '/src/assets/images/winter_relief_tunisia_1793725183416.jpg',
    summary: 'Les températures sont tombées sous 0°C dans les mechtas isolées. Nous fournissons des couvertures neuves double épaisseur, des anoraks imperméables et du combustible pour 600 foyers de personnes âgées, veuves et orphelins.',
    beneficiaryImpact: 'Une couverture épaisse = 35 TND · Un pack hiver complet enfant = 65 TND',
    bankInfo: {
      bankName: 'BNA Agence Thala',
      rib: '03 050 0012 345678901 55',
      ccp: '17001-0000000077889-12',
      d17: '+216 52 119 900',
      beneficiaryName: 'Comité d’Aide d’Urgence Kasserine'
    }
  },
  {
    id: 'campagne-parrainage-orphelins',
    title: 'Parrainage Annuel (Kafala) de 50 Orphelins Scolarisés',
    arabicTitle: 'كفالة سنوية لـ 50 يتيماً لمواصلة دراستهم بكرامة',
    governorate: 'Tout le pays',
    location: 'SOS Gammarth, Siliana, Akouda, Mahres',
    targetAmountTND: 36000,
    raisedAmountTND: 27900,
    donorsCount: 285,
    daysLeft: 16,
    urgencyLevel: 'urgente',
    category: 'orphelins',
    imageUrl: '/src/assets/images/orphan_care_village_1793725182874.jpg',
    summary: 'Chaque enfant orphelin parrainé reçoit un soutien mensuel régulier pour ses livres, cours particuliers, soins dentaires/médicaux et vêtements neufs. Vous recevez un suivi semestriel sans dévoiler l’intimité de l’enfant.',
    beneficiaryImpact: '60 TND/mois = Kafala Scolaire · 120 TND/mois = Kafala Intégrale Pension',
    bankInfo: {
      bankName: 'BNA Banque Nationale Agricole',
      rib: '03 000 0100 115006789 42',
      ccp: '17001-0000000008899-72',
      d17: '+216 98 123 450',
      beneficiaryName: "SOS Villages d'Enfants Tunisie"
    }
  },
  {
    id: 'campagne-couffins-alimentaires',
    title: 'Couffins Solidaires : 500 Paniers Nourriciers pour Familles Meskins',
    arabicTitle: 'القفة التضامنية : 500 طرد غذائي متكامل للعائلات المعوزة',
    governorate: 'Grand Tunis & Kairouan',
    location: 'Cité Ettadhamen, Douar Hicher, Oueslatia',
    targetAmountTND: 42500,
    raisedAmountTND: 31200,
    donorsCount: 390,
    daysLeft: 12,
    urgencyLevel: 'active',
    category: 'nourriture',
    imageUrl: '/src/assets/images/food_basket_tunisia_1793725182929.jpg',
    summary: 'Un couffin complet garantit 3 semaines de denrées vitales pour une famille de 5 personnes : 5L d’huile d’olive, 10kg de semoule, 5kg de pâtes, concentré de tomate, pois chiches, dattes de Tozeur, savon et lait.',
    beneficiaryImpact: '85 TND = 1 Couffin Familial Complet de 3 semaines',
    bankInfo: {
      bankName: 'BIAT Tunis',
      rib: '08 040 0001 234567890 88',
      ccp: '17001-0000000055442-90',
      d17: '+216 99 778 812',
      beneficiaryName: 'Association El-Khalil Tadhmon'
    }
  },
  {
    id: 'campagne-bourses-etudiants',
    title: 'Bourses & Foyers : 80 Étudiants en Risque d’Abandon Universitaire',
    arabicTitle: 'منح وإيواء تضامني لـ 80 طالباً جامعياً من المناطق الداخلية',
    governorate: 'Tunis & Sfax',
    location: 'Campus Universitaire El Manar & Route Aérodrome Sfax',
    targetAmountTND: 28000,
    raisedAmountTND: 19400,
    donorsCount: 220,
    daysLeft: 14,
    urgencyLevel: 'urgente',
    category: 'sante',
    imageUrl: '/src/assets/images/student_study_tunisia_1793727193083.jpg',
    summary: '80 étudiants méritants des régions intérieures risquent d’interrompre leurs études universitaires par manque de moyens pour régler leur loyer de chambre et leurs repas quotidiens.',
    beneficiaryImpact: '70 TND = 1 Mois de subsistance & tickets resto pour 1 étudiant',
    bankInfo: {
      bankName: 'Banque de Tunisie (BT)',
      rib: '05 010 0003 445566778 92',
      ccp: '17001-0000000088223-14',
      d17: '+216 28 550 440',
      beneficiaryName: 'Comité de Soutien aux Étudiants Démunis'
    }
  },
  {
    id: 'campagne-trousseaux-mariage',
    title: 'Trousseaux & Électroménager pour 30 Jeunes Couples Sans Ressources',
    arabicTitle: 'تجهيز 30 عروساً وتيسير زواج الشباب من العائلات المعوزة',
    governorate: 'Tunis, Kairouan & Sahel',
    location: 'Grand Tunis, Sbikha, Kairouan Médina',
    targetAmountTND: 35000,
    raisedAmountTND: 26100,
    donorsCount: 310,
    daysLeft: 8,
    urgencyLevel: 'active',
    category: 'orphelins',
    imageUrl: '/src/assets/images/young_couple_home_tunisia_1793727194304.jpg',
    summary: 'Aide concrète à l’installation de jeunes hommes et jeunes filles orphelins ou sans soutien : literie complète, gazinière, réfrigérateur simple et trousseau de base pour débuter leur foyer dans l’honneur et la paix.',
    beneficiaryImpact: '140 TND = Pack literie & électroménager solidaire',
    bankInfo: {
      bankName: 'Banque Zitouna',
      rib: '25 000 0015 667788990 12',
      ccp: '17001-0000000077334-55',
      d17: '+216 96 330 220',
      beneficiaryName: 'Association Tayssir Al-Zawaj Tunisie'
    }
  }
];

export const SOLIDARITY_PACKAGES = [
  {
    id: 'pack-couffin',
    title: 'Couffin Alimentaire Vital (القفة الغذائية)',
    costTND: 85,
    equivalentEUR: 25,
    description: 'Semoule de blé, huile, tomates en boîte, pâtes, légumineuses, dattes et produits d’hygiène de base pour 3 semaines.',
    iconName: 'ShoppingBag'
  },
  {
    id: 'pack-orphelin',
    title: 'Kafala Mensuelle Scolaire (كفالة طالب علم)',
    costTND: 60,
    equivalentEUR: 18,
    description: 'Livres scolaires, transport, cours de soutien, fournitures et suivi psychopédagogique d’un orphelin.',
    iconName: 'GraduationCap'
  },
  {
    id: 'pack-etudiant',
    title: 'Bourse & Foyer Étudiant Solidaire (كفالة طالب جامعي)',
    costTND: 70,
    equivalentEUR: 21,
    description: 'Aide loyer de studio partagé, tickets de restaurant universitaire et forfait internet pour étudiant isolé.',
    iconName: 'BookOpen'
  },
  {
    id: 'pack-mariage',
    title: 'Trousseau Jeunes Mariés & Foyer (جهاز العروسة وتيسير الزواج)',
    costTND: 140,
    equivalentEUR: 42,
    description: 'Contribution au trousseau essentiel (électroménager de base, matelas orthopédique, literie et vaisselle).',
    iconName: 'Sparkles'
  },
  {
    id: 'pack-artisan',
    title: 'Kit Outillage Artisan & Machine à Coudre (كسب اليد واستقلالية)',
    costTND: 160,
    equivalentEUR: 48,
    description: 'Achat de machine à coudre, outils de menuiserie/dinanderie ou matières premières pour vivre du travail digne.',
    iconName: 'Wrench'
  },
  {
    id: 'pack-parental',
    title: 'Urgence Parentalité & Lait Bébé (سند الوالدين والرضع)',
    costTND: 65,
    equivalentEUR: 20,
    description: 'Laits maternisés, couches, médicaments pédiatriques et soutien au maintien du logement familial.',
    iconName: 'Baby'
  },
  {
    id: 'pack-hiver',
    title: 'Pack Hiver Grand Froid (دفء الشتاء)',
    costTND: 75,
    equivalentEUR: 22,
    description: '2 couvertures double laine, un manteau d’hiver imperméable et chaussures montantes étanches.',
    iconName: 'Flame'
  },
  {
    id: 'pack-sante',
    title: 'Trousse Santé & Soins d’Urgence (رعاية صحية)',
    costTND: 110,
    equivalentEUR: 33,
    description: 'Médicaments pour affections chroniques (hypertension, diabète), aérosols pour enfants et consultations pédiatriques.',
    iconName: 'HeartPulse'
  }
];

export const GOVERNORATE_COORDINATES: Record<string, { x: number; y: number; lat: number; lng: number }> = {
  'Bizerte': { x: 50, y: 12, lat: 37.2744, lng: 9.8739 },
  'Tunis': { x: 58, y: 22, lat: 36.8065, lng: 10.1815 },
  'Ariana': { x: 56, y: 19, lat: 36.8665, lng: 10.1647 },
  'Ben Arous': { x: 60, y: 25, lat: 36.7531, lng: 10.2189 },
  'Manouba': { x: 52, y: 23, lat: 36.8078, lng: 10.0963 },
  'Nabeul': { x: 70, y: 28, lat: 36.4561, lng: 10.7376 },
  'Zaghouan': { x: 55, y: 31, lat: 36.4029, lng: 10.1429 },
  'Béja': { x: 38, y: 24, lat: 36.7256, lng: 9.1817 },
  'Jendouba': { x: 26, y: 26, lat: 36.5011, lng: 8.7802 },
  'Le Kef': { x: 28, y: 38, lat: 36.1742, lng: 8.7049 },
  'Siliana': { x: 44, y: 39, lat: 36.0847, lng: 9.3708 },
  'Sousse': { x: 68, y: 44, lat: 35.8256, lng: 10.6369 },
  'Monastir': { x: 74, y: 49, lat: 35.7643, lng: 10.8113 },
  'Mahdia': { x: 72, y: 55, lat: 35.5047, lng: 11.0622 },
  'Kairouan': { x: 50, y: 49, lat: 35.6781, lng: 10.0963 },
  'Kasserine': { x: 30, y: 55, lat: 35.1676, lng: 8.8365 },
  'Sidi Bouzid': { x: 44, y: 60, lat: 35.0382, lng: 9.4849 },
  'Sfax': { x: 66, y: 64, lat: 34.7406, lng: 10.7603 },
  'Gafsa': { x: 32, y: 68, lat: 34.4250, lng: 8.7842 },
  'Tozeur': { x: 20, y: 74, lat: 33.9197, lng: 8.1335 },
  'Kébili': { x: 35, y: 78, lat: 33.7044, lng: 8.9690 },
  'Gabès': { x: 58, y: 76, lat: 33.8815, lng: 10.0982 },
  'Médenine': { x: 66, y: 84, lat: 33.3549, lng: 10.5055 },
  'Tataouine': { x: 60, y: 92, lat: 32.9297, lng: 10.4518 }
};

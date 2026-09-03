import logoGcHomes from "@/assets/logos/GC homes.jpeg";
import logoGcRoyal from "@/assets/logos/GC royal.jpeg";
import logoGita from "@/assets/logos/GTA.jpeg";
import logoGulshanHomes from "@/assets/logos/Gulshane chitral homes.jpeg";
import logoGemstones from "@/assets/logos/gemstones.jpeg";

export type CompanyData = {
  slug: string;
  n: string;
  name: string;
  shortName?: string;
  field: string;
  image: string;
  logo?: string;
  aboutParagraphs: string[];
  keyDetailsType: 'list' | 'cards' | 'table' | 'flow' | 'mixed';
  keyDetails?: any; 
  shortDescription: string;
};

export const companiesData: CompanyData[] = [
  {
    slug: "gulshan-e-chitral-homes",
    n: "01",
    name: "Gulshan-e-Chitral Homes (Pvt.) Ltd.",
    field: "Real Estate & Housing Development",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400",
    logo: logoGulshanHomes,
    aboutParagraphs: [
      "Gulshan-e-Chitral Homes (Pvt.) Ltd. operates in the real estate and housing sector, developing and marketing housing projects under the Gulshan-e-Chitral Homes brand in Peshawar.",
      "Gulshan-e-Chitral Homes is focused on providing customers and investors with secure and well-planned residential property investment opportunities. The company aims to promote modern housing communities while creating long-term value for property owners and investors.",
      "The company particularly focuses on providing housing and real estate opportunities for the Chitral community and other property investors, with an emphasis on organized development and sustainable growth."
    ],
    keyDetailsType: 'list',
    keyDetails: {
      title: "Major Projects",
      items: [
        { title: "Gulshan-e-Chitral Homes — Phase 1" },
        { title: "Gulshan-e-Chitral Homes — Phase 2" },
        { title: "Gulshan-e-Chitral Homes — Phase 3" }
      ]
    },
    shortDescription: "Gulshan-e-Chitral Homes (Pvt.) Ltd. is a real estate and housing development company focused on creating organized residential communities and providing secure property investment opportunities for customers and investors."
  },
  {
    slug: "gc-homes",
    n: "02",
    name: "GC Homes (Pvt.) Ltd.",
    field: "Real Estate Marketing, Property Investment & Sales",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400",
    logo: logoGcHomes,
    aboutParagraphs: [
      "GC Homes (Pvt.) Ltd. is a premier real estate entity dedicated to reshaping the landscape of property marketing, acquisition, and investment. Operating with a commitment to excellence, we bridge the gap between visionary real estate projects and discerning investors.",
      "Our approach goes beyond traditional sales; we strategically analyze market trends to identify high-potential housing and commercial developments. By partnering with top-tier developers and offering a diverse portfolio of secure property opportunities, GC Homes ensures that every client makes informed, profitable, and long-lasting real estate decisions. Whether you are looking for a secure residential plot or a high-yield investment, we provide the expertise to guide you every step of the way."
    ],
    keyDetailsType: 'cards',
    keyDetails: {
      title: "Major Projects",
      items: [
        {
          title: "Kingdom Valley Rawalpindi",
          subtitle: "Project Type: Housing Society",
          description: "Kingdom Valley Rawalpindi is an approved housing society offering residential property opportunities. GC Homes has acquired approximately 650 plots within the project for its customers. Through this initiative, GC Homes provides customers with opportunities to acquire property and invest in an established housing development."
        },
        {
          title: "Abdullah City",
          subtitle: "Project Type: Housing Project",
          description: "Abdullah City is a housing project in which GC Homes holds plots. The company has acquired plots within the project and is offering them to its customers and investors through its property sales and marketing network."
        },
        {
          title: "Fatah Jang Road Farmhouse Project",
          subtitle: "Project Type: Farmhouses / Investment Land",
          description: "GC Homes' portfolio also includes an approximately 40-kanal compact farmhouse project on Fatah Jang Road. The project can serve as an opportunity for: Farmhouses, Weekend homes, Private retreats, Long-term property investment, or Potential future educational or university development."
        }
      ]
    },
    shortDescription: "GC Homes (Pvt.) Ltd. focuses on strategic real estate marketing, property acquisition, investment, and customer sales. The company provides customers and investors with access to housing plots, farmhouse projects, and other real estate investment opportunities."
  },
  {
    slug: "chitral-gemstone",
    n: "03",
    name: "Chitral Gemstone (Pvt.) Ltd.",
    field: "Mining, Minerals, Gemstones, Jewelry, Handicrafts & Stone Processing",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=1400",
    logo: logoGemstones,
    aboutParagraphs: [
      "Chitral Gemstone (Pvt.) Ltd. is the mining and minerals business of ETEMAAD100 GROUP, focused on exploring, developing, processing, and commercializing Chitral's natural mineral resources for national and international markets.",
      "The company aims to transform Chitral's rich mineral resources into high-value products while creating opportunities for investment, employment, and economic development.",
      "The primary objective of Chitral Gemstone is to: Commercialize Chitral's natural mineral resources, Develop and process locally sourced minerals, Create value-added products, Promote Chitral's gemstones in national and international markets, and Encourage investment in the mining and minerals sector.",
      "Chitral Gemstone showcases its products at national exhibitions and trade exhibitions, providing opportunities to introduce Chitral's gemstones, minerals, and handicraft products to national and international buyers, investors, and business partners."
    ],
    keyDetailsType: 'mixed',
    keyDetails: {
      blocks: [
        {
          type: "list",
          title: "Mining & Mineral Leases",
          description: "The company holds granted mining leases in different areas of Chitral for various mineral resources, including:",
          items: [
            "Gemstones",
            "Semi-Precious Stones",
            "Metallic Stones & Minerals",
            "Dimension Stones",
            "Industrial Minerals"
          ]
        },
        {
          type: "list",
          title: "Products & Manufacturing",
          description: "Chitral Gemstone produces and develops a range of value-added products, including:",
          items: [
            "Gemstone Jewelry Sets",
            "Semi-Precious Stone Jewelry",
            "Home Decoration Pieces",
            "Office Decoration Pieces",
            "Stone Handicrafts",
            "Cut & Polished Gemstones",
            "Semi-Precious Stone Products"
          ]
        },
        {
          type: "flow",
          title: "Production Unit",
          description: "The company's Production Unit / Industry is located in Chitral, where gemstones and stones undergo various stages of processing:",
          flow: ["Cutting", "Shaping", "Polishing", "Finishing", "Product Manufacturing"],
          footer: "This integrated process allows the company to transform raw mineral resources into finished, market-ready products."
        }
      ]
    },
    shortDescription: "Chitral Gemstone (Pvt.) Ltd. is developing a complete business chain from mining and mineral resource development to processing and value-added manufacturing. The company aims to bring Chitral's gemstones and minerals to national and international markets while promoting investment and growth in the mining and minerals sector."
  },
  {
    slug: "gc-royal-emporium",
    n: "04",
    name: "GC Royal Emporium Chitral (Pvt.) Ltd.",
    field: "Shopping Mall, Commercial Real Estate, Retail & Residential Development",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400",
    logo: logoGcRoyal,
    aboutParagraphs: [
      "GC Royal Emporium Chitral is being developed as a major shopping mall and business destination in Chitral city, designed to bring shopping, commercial, lifestyle, food, and residential facilities together under one development.",
      "GC Royal Emporium aims to establish a modern commercial destination in Chitral where shopping, food, lifestyle, residential, and essential business facilities can be accessed within a single integrated development."
    ],
    keyDetailsType: 'table',
    keyDetails: {
      title: "Project Highlights",
      table: [
        { feature: "Total Area", details: "Approximately 33,000 sq. ft." },
        { feature: "Frontage", details: "Approximately 200 feet" },
        { feature: "Location", details: "Main City / Main Bazaar, Chitral" },
        { feature: "Structure", details: "Basement + 6 Floors" },
        { feature: "Basement", details: "Large Parking Facility" }
      ],
      extraSections: [
        {
          title: "Commercial Floors",
          description: "The first four floors of the development are planned for commercial and shopping activities. The commercial spaces are intended to accommodate a variety of businesses, including: Retail Shops, Hypermarket, National & International Brands, Restaurants, Lifestyle Businesses, Daily-Life Facilities."
        },
        {
          title: "Residential Apartments",
          description: "The 5th and 6th floors are planned for residential apartments, including: 1-Bed Apartments, 2-Bed Apartments, 3-Bed Apartments."
        }
      ]
    },
    shortDescription: "GC Royal Emporium Chitral is a modern multi-purpose commercial and residential development located in the heart of Chitral city. With approximately 33,000 sq. ft. of project area, a 200-foot frontage, basement parking, commercial floors, and residential apartments, the project is designed to establish a new standard for modern retail, business, and lifestyle facilities in Chitral."
  },
  {
    slug: "gita",
    n: "05",
    name: "Gulshan International Travel Agency",
    shortName: "GITA",
    field: "Travel, Tourism & Transportation",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400",
    logo: logoGita,
    aboutParagraphs: [
      "Gulshan International Travel Agency (GITA) is the Travel & Tourism business of ETEMAAD100 GROUP, providing travel, tourism, transportation, and tour-related services across Chitral and various destinations throughout Pakistan.",
      "GITA aims to connect travelers with Pakistan's diverse tourist destinations by providing convenient travel planning, tour arrangements, transportation, and tourism services."
    ],
    keyDetailsType: 'cards',
    keyDetails: {
      title: "Our Services",
      items: [
        {
          title: "Domestic Tours & Packages",
          description: "Planning and arranging customized tourism packages for individuals, families, groups and organizations. We arrange tours to major destinations including Chitral, Gilgit-Baltistan, Swat, Dir, Kashmir, Murree, Islamabad, Peshawar, and Lahore."
        },
        {
          title: "Tourist Transportation",
          description: "Providing suitable vehicles and transportation facilities for tourists traveling to Chitral and other destinations across Pakistan."
        },
        {
          title: "Family & Group Tours",
          description: "Customized travel arrangements for families, friends, educational groups, corporate groups and other organizations."
        },
        {
          title: "Vehicle & Transport Services",
          description: "Providing tourism vehicles and transportation solutions based on group size, destination and travel requirements."
        }
      ]
    },
    shortDescription: "Gulshan International Travel Agency (GITA) aims to connect Pakistan's beautiful tourist destinations with domestic and international travelers. Through travel planning, tour arrangements, transportation, and tourism-related services, GITA provides customers with convenient and memorable travel experiences."
  }
];

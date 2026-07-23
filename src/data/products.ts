import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'dwx-53dc',
    name: 'DWX-53DC',
    brand: 'DGSHAPE',
    brandLabel: 'DGSHAPE by Roland',
    category: 'milling',
    categoryLabel: '5-Axis Dry Milling',
    tagline: 'The world\'s best-selling 5-axis dry dental mill with 6-disc changer.',
    description: 'Engineered for 24-hour unattended productivity with an automated 6-slot disc changer and 15-station tool changer.',
    fullOverview: 'The DWX-53DC features a 6-slot Automatic Disc Changer and a 15-station Automatic Tool Changer for seamless, overnight operation. Its improved spindle and rigid frame ensure the highest precision for zirconia, wax, PMMA, and composite restorations.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { label: 'Axis Control', value: '5-Axis Simultaneous' },
      { label: 'Disc Changer', value: '6 Slots (Automatic)' },
      { label: 'Tool Changer', value: '15 Stations (ATC)' },
      { label: 'Spindle Speed', value: '30,000 RPM' },
      { label: 'Air Pressure', value: '0.2 to 0.3 MPa' },
      { label: 'Compatible Materials', value: 'Zirconia, Wax, PMMA, Composite' }
    ],
    features: [
      'Automated 6-slot disc changer with RFID identification',
      'Built-in webcam for real-time remote monitoring via VPanel',
      'Automatic pressure control for stable air supply',
      'Robust frame designed to minimize vibration and enhance surface finish',
      'Ionizer included to eliminate static dust during PMMA milling'
    ],
    isFeatured: true
  },
  {
    id: 'dwx-52d-plus',
    name: 'DWX-52D Plus',
    brand: 'DGSHAPE',
    brandLabel: 'DGSHAPE by Roland',
    category: 'milling',
    categoryLabel: '5-Axis Dry Milling',
    tagline: 'Industry-standard reliability and precision for dental laboratories.',
    description: 'Unmatched reliability and precision for dry milling. The go-to solution for dental labs worldwide.',
    fullOverview: 'The DWX-52D Plus builds upon the success of industry-standard 5-axis technology. Equipped with a snap-in C-clamp system, intelligent tool management, and dust-resistant internal architecture, it handles crowns, bridges, and full arches with effortless accuracy.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { label: 'Axis Control', value: '5-Axis Simultaneous' },
      { label: 'Disc Adapter', value: 'Snap-in C-Clamp Included' },
      { label: 'Tool Changer', value: '15 Stations' },
      { label: 'Spindle Speed', value: '30,000 RPM' },
      { label: 'Repeatability', value: '± 0.005 mm' }
    ],
    features: [
      'Snap-in disc adapter for fast, repeatable disc clamping',
      '15-station automatic tool changer with tool life tracking',
      'Internal clean room design prevents dust from entering spindle area',
      'Supports open architecture 98.5mm discs'
    ],
    isFeatured: true
  },
  {
    id: 'dwx-42w',
    name: 'DWX-42W',
    brand: 'DGSHAPE',
    brandLabel: 'DGSHAPE by Roland',
    category: 'milling',
    categoryLabel: 'Wet Milling',
    tagline: 'High-speed wet milling for glass ceramics and composite resins.',
    description: 'Engineered for rapid, high-precision wet milling of ceramic blocks and hybrid resins. Ideal for same-day in-lab restorations.',
    fullOverview: 'The DWX-42W is DGSHAPE\'s flagship standalone wet mill. Featuring a high-torque DGSHAPE spindle, 6-station automatic tool changer, and LAN connection capabilities, it delivers smooth margins and fast turnaround for glass-ceramic veneers, inlays, onlays, and single crowns.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { label: 'Milling Mode', value: 'Wet Milling' },
      { label: 'Axis Control', value: '4-Axis Simultaneous' },
      { label: 'Spindle Speed', value: '60,000 RPM' },
      { label: 'ATC', value: '6-Station Automatic' },
      { label: 'Materials', value: 'Glass Ceramics, Composite Resin' }
    ],
    features: [
      '60,000 RPM high-speed spindle developed exclusively by DGSHAPE',
      'Multi-pin clamp holds up to 6 block materials simultaneously',
      'Integrated coolant tank and pump with level sensor',
      'VPanel operation for automatic calibration and tool management'
    ],
    isFeatured: true
  },
  {
    id: 'dwx-52dci',
    name: 'DWX-52DCi',
    brand: 'DGSHAPE',
    brandLabel: 'DGSHAPE by Roland',
    category: 'milling',
    categoryLabel: 'Smart 5-Axis Milling',
    tagline: 'Smart 5-axis mill with automatic disc changer and performance analytics.',
    description: 'Combines automated 6-disc changing with DWINDEX performance tracking software for ultimate laboratory efficiency.',
    fullOverview: 'The DWX-52DCi empowers dental labs with intelligent disc management and DWINDEX performance tracking. Seamlessly switch between material discs and monitor material usage, tool wear, and machine status from anywhere.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    specs: [
      { label: 'Axis Control', value: '5-Axis Simultaneous' },
      { label: 'Disc Changer', value: '6-Slot Automatic' },
      { label: 'Tool Changer', value: '15 Stations' },
      { label: 'Software', value: 'VPanel & DWINDEX Cloud' }
    ],
    features: [
      'DWINDEX data visualization software included',
      'Automatic Disc Changer holds up to 6 different materials/shades',
      'Automatic air pressure regulation',
      'User-replaceable spindle with fast replacement procedure'
    ]
  },
  {
    id: 'vario-press-300e',
    name: 'VARIO PRESS 300.e',
    brand: 'Zubler',
    brandLabel: 'Zubler Dental Equipment',
    category: 'furnaces',
    categoryLabel: 'Pressing & Firing Furnace',
    tagline: 'Patented ADVANCED PRESS technology for flawless ceramic pressings.',
    description: 'The premier ceramic pressing furnace featuring Zubler\'s patented thermal sensing and press drive mechanism.',
    fullOverview: 'Made in Germany, the VARIO PRESS 300.e features patented ADVANCED PRESS technology. By calculating real-time temperature gradients throughout the ring, it avoids reaction layers and guarantees flawless pressing results for lithium disilicate and pressable ceramics.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: [
      { label: 'Muffle Design', value: 'Zubler Quartz Spiral Muffle' },
      { label: 'Press Drive', value: 'Stepper Motor Press Servo' },
      { label: 'Display', value: '7-Inch Touchscreen LCD' },
      { label: 'Programs', value: '500 Customizable Programs' },
      { label: 'Power Supply', value: '230V / 50-60Hz (1500W)' }
    ],
    features: [
      'ADVANCED PRESS system eliminates investment surface reaction layers',
      'High-precision stepper motor drive for controlled ceramic flow',
      'USB port for program backup, restoration, and software updates',
      'PFC (Power Fail Control) memory recovery after temporary blackout'
    ],
    isFeatured: true
  },
  {
    id: 'v60-iplus',
    name: 'V60 i-Plus',
    brand: 'Zubler',
    brandLabel: 'Zubler Dental Equipment',
    category: 'furnaces',
    categoryLabel: 'Ceramic Firing Furnace',
    tagline: 'High-performance ceramic furnace with smart touchscreen control.',
    description: 'Intuitive ceramic firing furnace engineered for absolute thermal uniformity and repeatable aesthetics.',
    fullOverview: 'The Zubler V60 i-Plus represents top-tier German furnace manufacturing. Equipped with an industrial touchscreen interface and high-efficiency heating coils, it produces smooth, consistent porcelain firing across all major dental ceramic brands.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    specs: [
      { label: 'Max Temperature', value: '1200 °C' },
      { label: 'Display', value: 'Full Color Touchscreen' },
      { label: 'Vacuum Control', value: 'Smart Proportional Valve' },
      { label: 'USB Interface', value: 'Yes (Program Transfer)' }
    ],
    features: [
      'Homogeneous temperature field in firing chamber',
      'Customizable firing curves for all ceramic types',
      'Low energy consumption with advanced thermal insulation',
      'Ergonomic motorized firing tray lift'
    ],
    isFeatured: true
  },
  {
    id: 'vario-200zr',
    name: 'VARIO 200ZR',
    brand: 'Zubler',
    brandLabel: 'Zubler Dental Equipment',
    category: 'furnaces',
    categoryLabel: 'Zirconia Firing Furnace',
    tagline: 'Specialized firing furnace engineered for zirconia ceramics.',
    description: 'Designed specifically for the thermal requirements of high-translucency zirconia, glazes, and stain firings.',
    fullOverview: 'The VARIO 200ZR provides precise temperature ramps and cooling curves tailored for modern multi-layered zirconia restorations. Avoid thermal stress micro-cracks with Zubler\'s gentle cooling technology.',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80',
    specs: [
      { label: 'Firing Chamber', value: 'Zirconia Optimized' },
      { label: 'Cooling Mode', value: 'Controlled Linear Cooling' },
      { label: 'Programs', value: '200 Preset Programs' }
    ],
    features: [
      'Linear controlled cooling protocol prevents zirconia chipping',
      'Zubler spiral heating muffle for uniform heat dispersion',
      'Intuitive navigation menu'
    ]
  },
  {
    id: 'z1-eco',
    name: 'Z1 ECO',
    brand: 'Zubler',
    brandLabel: 'Zubler Dental Equipment',
    category: 'suction',
    categoryLabel: 'Lab Dust Extraction',
    tagline: 'Quiet, powerful, single-station laboratory suction unit.',
    description: 'Brushless motor extraction system providing clean air and whisper-quiet operation in dental labs.',
    fullOverview: 'The Z1 ECO by Zubler is an ultra-quiet single-workstation dust collector with a brushless motor guaranteed for long maintenance-free service. Integrated HEPA filtration removes dangerous ceramic and alloy particles.',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
    specs: [
      { label: 'Motor Type', value: 'Brushless (Long Life)' },
      { label: 'Suction Power', value: '15 - 35 l/sec Adjustable' },
      { label: 'Noise Level', value: '44 - 54 dB(A)' },
      { label: 'Filter Class', value: 'HEPA H14 Filter' }
    ],
    features: [
      'Whisper-quiet acoustic sound dampening',
      'Stepless motor speed regulation',
      'Automatic start-stop synchronization with handpieces',
      'Tool-free filter bag replacement'
    ]
  },
  {
    id: 'z1-cam',
    name: 'Z1 CAM',
    brand: 'Zubler',
    brandLabel: 'Zubler Dental Equipment',
    category: 'suction',
    categoryLabel: 'CAD/CAM Milling Suction',
    tagline: 'Dedicated heavy-duty suction system for CAD/CAM milling machines.',
    description: 'Designed for continuous air extraction during intense milling of zirconia, PMMA, wax, and metal.',
    fullOverview: 'Engineered specifically to pair with dental milling machines (such as DGSHAPE DWX series), the Z1 CAM features continuous 24/7 duty cycle capability, automatic signal communication with mills, and heavy-duty particle separation.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    specs: [
      { label: 'Application', value: 'CAM Machine Extraction' },
      { label: 'Interface', value: '24V / Relais Signal Sync' },
      { label: 'Motor', value: 'Industrial Brushless Turbine' },
      { label: 'Filter Volume', value: '7.5 Liters' }
    ],
    features: [
      'Direct signal interface with DGSHAPE milling machines',
      'Continuous operation brushless motor design',
      'HEPA filter traps 99.97% of fine milling dust',
      'Compact footprint under table or in cabinet'
    ]
  }
];

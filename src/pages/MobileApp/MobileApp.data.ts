import { images } from '../../constants/images'
import { transitions } from '../../theme/transitions'

export const ease = transitions.reveal

/** An image taken from the PARK LANE app recordings, with its size in pixels. */
export interface AppImage {
  src: string
  alt: string
  width: number
  height: number
}

const screen = (src: string, alt: string): AppImage => ({ src, alt, width: 390, height: 868 })

// Whole screens from the app video.
export const appScreens = {
  home: screen(images.parkLaneScreenHome, 'PARK LANE home screen greeting Ahmed, with Unit A-302, tonight’s weather and shortcuts to every service'),
  myUnit: screen(images.parkLaneScreenMyUnit, 'My Unit screen for Unit A-302 with the unit overview and financial status'),
  smartHome: screen(images.parkLaneScreenSmartHome, 'Smart Home screen for Unit A-302 with room tabs and lighting, AC, curtains and TV controls'),
  visitors: screen(images.parkLaneScreenVisitors, 'Visitor Access screen with a QR guest pass and the list of upcoming visitors'),
  maintenance: screen(images.parkLaneScreenMaintenance, 'Maintenance screen with service categories and an active request in progress'),
  community: screen(images.parkLaneScreenCommunity, 'Community screen with announcements and upcoming events'),
  assistant: screen(images.parkLaneScreenAssistant, 'EMS AI assistant in chat mode, asking how it can help, with suggested questions'),
  assistantVoice: screen(images.parkLaneScreenAssistantVoice, 'EMS AI assistant in voice mode, ready to listen, with Arabic and English example questions'),
}

// Close-ups of single cards; most come from the sharper iPhone screen recording.
export const appDetails = {
  weather: { src: images.parkLaneDetailWeather, alt: 'Weather chip: 24 C, clear night', width: 188, height: 94 },
  tiles: { src: images.parkLaneDetailTiles, alt: 'Home screen shortcuts: My Unit, Smart Home, BMS, Visitor Access, Parking, Maintenance, Community and Amenities Booking', width: 550, height: 368 },
  controls: { src: images.parkLaneDetailControls, alt: 'Smart Home controls: lighting at 70%, AC set to 24°C, curtains open, pause and close, and TV apps', width: 620, height: 416 },
  energy: { src: images.parkLaneDetailEnergy, alt: 'Energy usage: 12.4 kWh today, 12% less than yesterday; lighting 4.1, AC 5.6, TV and media 1.8, other 0.9 kWh', width: 626, height: 304 },
  automation: { src: images.parkLaneDetailAutomation, alt: 'Device automation: Arrive Home turns on lights, opens curtains and sets the AC to 24°C; Leave Home turns off lights, closes curtains and activates security', width: 626, height: 236 },
  guestPass: { src: images.parkLaneDetailGuestPass, alt: 'QR guest pass for Omar Khaled, 2 guests, 05 Oct 2026 at 02:30 PM, scheduled', width: 620, height: 190 },
  parking: { src: images.parkLaneDetailParking, alt: 'Live parking: 12 of 18 bays available, 7 of 12 guest bays and 3 of 4 chargers free, 18% occupied, with buttons to navigate to the car and reserve guest parking or EV charging', width: 620, height: 302 },
  amenities: { src: images.parkLaneDetailAmenities, alt: 'Amenities: Swimming Pool 06:00–22:00 for up to 20, Gym 05:00–23:00 for up to 15 and Multipurpose Hall 09:00–22:00 for up to 50, each with Book Now', width: 620, height: 512 },
  services: { src: images.parkLaneDetailServices, alt: 'Services: Housekeeping, Bills & Utilities, Deliveries and Moving Request', width: 620, height: 600 },
  fees: { src: images.parkLaneDetailFees, alt: 'Maintenance fees: EGP 18,000 a year, EGP 9,000 paid, next due 15 Oct 2026. Utility consumption this month: 428 kWh of electricity, 31 m³ of water and 54 m³ of gas', width: 620, height: 410 },
  finance: { src: images.parkLaneDetailFinance, alt: 'Financial status: EGP 5,525,000 paid of EGP 8,500,000, 65% paid, next installment EGP 145,000 due 05 Oct 2026', width: 370, height: 166 },
  request: { src: images.parkLaneDetailRequest, alt: 'Active request: AC not cooling properly, submitted, assigned and in progress, with technician Ahmed Hassan visiting on 06 Oct 2026', width: 368, height: 238 },
  poll: { src: images.parkLaneDetailPoll, alt: 'Help Shape Parklane poll: more community events 68%, additional fitness classes 22%, kids and family activities 10%', width: 370, height: 147 },
  prompts: { src: images.parkLaneDetailPrompts, alt: 'Suggested questions: When is my next installment? Do I have visitors today? Where is my parking slot? Any active alarms in the building?', width: 332, height: 111 },
  aiGreeting: { src: images.parkLaneDetailAiGreeting, alt: 'Assistant greeting: How can I help you today? Ask about your unit, visitors, parking, the building or the weather, in Arabic or English', width: 332, height: 151 },
} satisfies Record<string, AppImage>

export const pageMeta = {
  title: 'PARK LANE Smart Community App | EMS Engineering Management Systems',
  description: 'PARK LANE, the smart community app by EMS: smart home control, visitor passes, parking, maintenance, amenities and an AI assistant in one place.',
  url: 'https://www.ems-me.com/mobile-app',
}

export const hero = {
  label: 'PARK LANE smart community app',
  titleLines: ['Smarter Living.', 'Intelligently Connected.'],
  text: 'One intelligent platform bringing community services, connected living, and everyday convenience together.',
  primary: { label: 'Explore the experience', href: '#app-experience' },
  secondary: { label: 'Discuss your app', to: '/contact' },
  note: 'Resident app for Park Lane Compoundhood, New Capital',
  screen: appScreens.home,
  previews: [
    { id: 'weather', image: appDetails.weather },
    { id: 'energy', image: appDetails.energy },
    { id: 'pass', image: appDetails.guestPass },
  ],
}

export const experience = {
  label: 'The experience',
  title: 'Your home, in your hand.',
  text: 'Residents run every room from one screen and let automations handle the routine.',
  phone: { title: 'Smart Home', text: 'Lighting, climate, curtains and media for each room, with a scene for every moment.', image: appScreens.smartHome },
  controls: { title: 'Every control within reach', text: 'Set brightness and colour, dial the AC, open the curtains or start a film.', image: appDetails.controls },
  automation: { title: 'Routines that run themselves', text: 'Arrive Home turns on the lights, opens the curtains and sets the AC to 24°C.', image: appDetails.automation },
}

export interface StoryChapter {
  id: string
  label: string
  title: string
  text: string
  screen: AppImage
  detail: AppImage
  /** Where the close-up sits beside the phone, from the top, as a share of the phone's height. */
  detailTop: string
}

export const story = {
  label: 'Inside the app',
  title: 'One app for everyday community life.',
  text: 'Five parts of the app residents open most, straight from the screen.',
  chapters: [
    { id: 'home', label: 'Home', title: 'Your community at a glance.', text: 'Each resident’s home screen opens on their unit and tonight’s weather, with every service one tap away.', screen: appScreens.home, detail: appDetails.tiles, detailTop: '38%' },
    { id: 'unit', label: 'My Unit', title: 'Your unit and payments, always clear.', text: 'Unit details, payment progress, the next installment, utility use and documents, kept in one place.', screen: appScreens.myUnit, detail: appDetails.finance, detailTop: '58%' },
    { id: 'visitors', label: 'Visitors & parking', title: 'Guests welcomed, parking sorted.', text: 'Create a QR pass for every visitor, follow arrivals at the gate and check live parking before booking a guest bay or an EV charger.', screen: appScreens.visitors, detail: appDetails.parking, detailTop: '52%' },
    { id: 'maintenance', label: 'Maintenance', title: 'Repairs, requested and tracked.', text: 'Report an HVAC, electrical, plumbing, appliance or door and lock problem, then follow it from submitted to completed.', screen: appScreens.maintenance, detail: appDetails.request, detailTop: '60%' },
    { id: 'assistant', label: 'EMS AI', title: 'Ask, and the app answers.', text: 'Questions about installments, visitors, parking or building alarms get a straight answer, in Arabic or English.', screen: appScreens.assistant, detail: appDetails.prompts, detailTop: '68%' },
  ] satisfies StoryChapter[],
}

export interface AppFeature {
  id: string
  label: string
  title: string
  text: string
  image: AppImage
  /** A whole screen shown in a phone beside the close-up. */
  phone?: AppImage
}

export const features = {
  label: 'Features & services',
  title: 'Everything residents use, up close.',
  items: [
    { id: 'amenities', label: 'Amenities Booking', title: 'Book the pool, the gym or the hall.', text: 'Opening hours and capacity at a glance, a slot booked in a tap and every booking kept in one list.', image: appDetails.amenities },
    { id: 'services', label: 'Services', title: 'Everyday services, made easier.', text: 'Book housekeeping, pay electricity, water and gas bills, track deliveries and schedule a move with management.', image: appDetails.services },
    { id: 'community', label: 'Community', title: 'A community that stays in touch.', text: 'Announcements, events residents can sign up for, community alerts and polls that shape what happens next.', image: appDetails.poll, phone: appScreens.community },
    { id: 'fees', label: 'Fees & utilities', title: 'Fees and consumption, without the paperwork.', text: 'Maintenance fees paid and due, and this month’s electricity, water and gas compared with last month.', image: appDetails.fees },
  ] satisfies AppFeature[],
}

export const assistant = {
  label: 'EMS AI assistant',
  title: 'Just ask Parklane.',
  text: 'The built-in assistant answers questions about a resident’s unit, visitors, parking, the building or the weather, in Arabic or English.',
  modes: [
    { title: 'Chat', text: 'Type a question, or tap one of the suggestions to start.' },
    { title: 'Voice', text: 'Tap start and speak. Turn the camera on and ask “what is this?”' },
  ],
  prompts: ['When is my next installment?', 'Do I have visitors today?', 'Where is my parking slot?', 'Any active alarms in the building?'],
  screen: appScreens.assistantVoice,
  greeting: appDetails.aiGreeting,
}

export const closing = {
  title: 'Intelligent Communities Start Here.',
  text: 'Bring a connected resident experience to your next development. Talk to EMS about building yours.',
  primary: { label: 'Contact EMS', to: '/contact' },
  secondary: { label: 'Explore our projects', to: '/projects' },
}

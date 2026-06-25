/**
 * OXATL YOGA - Demo Studio Data
 *
 * This file contains mock data for the demo studio "Oxatl Yoga".
 * It's designed to showcase Tandava's features with realistic data.
 *
 * TO REMOVE FOR PRODUCTION:
 * 1. Delete the entire src/data/demo/ directory
 * 2. Remove demo data imports from components that use them
 * 3. Set VITE_DEMO_MODE=false in your .env
 */

import type {
  Studio,
  Profile,
  UserRole,
  MembershipStatus,
  BookingStatus,
} from '@/types/database';

// ============================================================================
// STUDIO
// ============================================================================

export const OXATL_STUDIO: Studio = {
  id: 'demo-studio-oxatl-001',
  name: '森浴光mm941',
  slug: 'oxatl-yoga',
  description:
    '在繁瑣的都市節奏中，為您打造一處遠離喧囂的城市森林。森之息、浴暖陽、光之甦——真正的美源自內在平衡與通透，讓身體重新定義舒爽，讓靈魂再次發光。',
  logo_url: null,
  cover_image_url: null,
  website: 'https://www.1314mm941.com.tw/',
  email: 'service@1314mm941.com.tw',
  phone: '0910 257 767',
  timezone: 'Asia/Taipei',
  currency: 'TWD',
  stripe_account_id: null,
  stripe_onboarding_complete: false,
  discoverable: true,
  brand_primary_color: '#8B5A2B',
  brand_secondary_color: '#D4A574',
  brand_font: 'DM Sans',
  default_cancellation_minutes: 720, // 12 hours
  late_cancel_fee_cents: 1500,
  no_show_fee_cents: 2000,
  waitlist_limit: 5,
  created_at: '2022-03-15T00:00:00Z',
  updated_at: '2025-01-01T00:00:00Z',
};

// ============================================================================
// LOCATIONS
// ============================================================================

export interface DemoLocation {
  id: string;
  studio_id: string;
  name: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  rooms: DemoRoom[];
  capacity: number;
}

export interface DemoRoom {
  id: string;
  name: string;
  capacity: number;
}

export const OXATL_LOCATIONS: DemoLocation[] = [
  {
    id: 'loc-xizhi',
    studio_id: OXATL_STUDIO.id,
    name: '汐止館',
    address_line1: '新北市汐止區水源路一段115號',
    address_line2: null,
    city: '新北市',
    state: '汐止區',
    postal_code: '',
    country: 'TW',
    lat: 25.065,
    lng: 121.655,
    phone: '02 8646 1868',
    email: 'xizhi@1314mm941.com.tw',
    rooms: [
      { id: 'room-xizhi-main', name: '能量艙室', capacity: 4 },
      { id: 'room-xizhi-care', name: '撥筋護理室', capacity: 6 },
    ],
    capacity: 10,
  },
  {
    id: 'loc-fuxing',
    studio_id: OXATL_STUDIO.id,
    name: '台北復興館',
    address_line1: '台北市復興館',
    address_line2: '詳細門牌請致電店家確認',
    city: '台北市',
    state: '',
    postal_code: '',
    country: 'TW',
    lat: 25.048,
    lng: 121.543,
    phone: '02 2750 5419',
    email: 'fuxing@1314mm941.com.tw',
    rooms: [
      { id: 'room-fuxing-main', name: '光療護理室', capacity: 6 },
    ],
    capacity: 6,
  },
  {
    id: 'loc-east',
    studio_id: OXATL_STUDIO.id,
    name: '台中東區館',
    address_line1: '台中市東區東光園路107號',
    address_line2: null,
    city: '台中市',
    state: '東區',
    postal_code: '',
    country: 'TW',
    lat: 24.136,
    lng: 120.697,
    phone: '0930 866 070',
    email: 'dong@1314mm941.com.tw',
    rooms: [
      { id: 'room-east-main', name: '能量艙室', capacity: 4 },
      { id: 'room-east-small', name: '撥筋護理室', capacity: 6 },
    ],
    capacity: 10,
  },
  {
    id: 'loc-central',
    studio_id: OXATL_STUDIO.id,
    name: '台中北屯館（松竹館）',
    address_line1: '台中市北屯區松竹路一段1-10號',
    address_line2: null,
    city: '台中市',
    state: '北屯區',
    postal_code: '',
    country: 'TW',
    lat: 24.182,
    lng: 120.697,
    phone: '0910 257 767',
    email: 'beitun@1314mm941.com.tw',
    rooms: [
      { id: 'room-central-main', name: '能量艙室', capacity: 4 },
      { id: 'room-central-hot', name: '光療護理室', capacity: 6 },
    ],
    capacity: 10,
  },
  {
    id: 'loc-tainan',
    studio_id: OXATL_STUDIO.id,
    name: '台南健康館',
    address_line1: '台南市永康區新中街307號',
    address_line2: null,
    city: '台南市',
    state: '永康區',
    postal_code: '',
    country: 'TW',
    lat: 23.026,
    lng: 120.257,
    phone: '0919 133 068',
    email: 'tainan@1314mm941.com.tw',
    rooms: [
      { id: 'room-tainan-main', name: '活罐舒壓室', capacity: 6 },
    ],
    capacity: 6,
  },
];

// ============================================================================
// STAFF & TEACHERS
// ============================================================================

export interface DemoStaff {
  profile: Profile;
  role: UserRole;
  location_ids: string[];
  specialties: string[];
  pay_rate_cents: number;
  pay_type: 'per_class' | 'hourly' | 'salary';
  bio: string;
}

// Female teachers - Famous singers + Cute animals
const FEMALE_TEACHERS: Omit<DemoStaff, 'role' | 'pay_rate_cents' | 'pay_type'>[] = [
  {
    profile: makeTeacherProfile('林', '小慧', 'beyonce.pangolin'),
    location_ids: ['loc-central', 'loc-east'],
    specialties: ['活化能量艙', '專業撥筋'],
    bio: '充滿力量的流動序列，鍛鍊肌力與自信。教學經驗超過 10 年。',
  },
  {
    profile: makeTeacherProfile('陳', '雅婷', 'adele.capybara'),
    location_ids: ['loc-central'],
    specialties: ['溫感能量光療', '舒通筋脈'],
    bio: '深沉而動人的練習，專注於釋放與修復。',
  },
  {
    profile: makeTeacherProfile('王', '美玲', 'rihanna.quokka'),
    location_ids: ['loc-east', 'loc-fuxing'],
    specialties: ['活化能量艙', '負離子活罐'],
    bio: '富有創意的序列，帶有島嶼般的輕鬆氛圍。各程度皆歡迎。',
  },
  {
    profile: makeTeacherProfile('張', '佳怡', 'taylor.otter'),
    location_ids: ['loc-fuxing'],
    specialties: ['負離子活罐', '光療＋活罐'],
    bio: '細膩對位導引，搭配富有詩意的口令。',
  },
  {
    profile: makeTeacherProfile('李', '心怡', 'ariana.hedgehog'),
    location_ids: ['loc-central', 'loc-east'],
    specialties: ['能量艙＋撥筋', '活化能量艙'],
    bio: '高能量課程，挑戰自我、激發潛能。',
  },
  {
    profile: makeTeacherProfile('周', '雨晴', 'dua.axolotl'),
    location_ids: ['loc-east'],
    specialties: ['活化能量艙', '負離子活罐'],
    bio: '動感流動搭配優質音樂，在墊上感受懷舊與新潮的交會。',
  },
  {
    profile: makeTeacherProfile('黃', '淑芬', 'billie.chinchilla'),
    location_ids: ['loc-fuxing'],
    specialties: ['溫感能量光療', '光療＋活罐'],
    bio: '寧靜內省的練習，為各種身體提供安全空間。',
  },
  {
    profile: makeTeacherProfile('吳', '佩珊', 'lizzo.wombat'),
    location_ids: ['loc-central'],
    specialties: ['活化能量艙', '專業撥筋'],
    bio: '百分之百的真我老師。身體正向的流動，適合每一具身體。',
  },
  {
    profile: makeTeacherProfile('鄭', '雅文', 'shakira.fennec'),
    location_ids: ['loc-east', 'loc-central'],
    specialties: ['能量艙＋撥筋', '負離子活罐'],
    bio: '以核心為主的課程。臀部不會說謊，良好的對位也不會。',
  },
  {
    profile: makeTeacherProfile('許', '慧君', 'celine.manatee'),
    location_ids: ['loc-fuxing'],
    specialties: ['舒通筋脈', '溫感能量光療'],
    bio: '開展心輪的練習，帶來強而有力的臨在感。',
  },
  {
    profile: makeTeacherProfile('蔡', '宜蓁', 'whitney.puffin'),
    location_ids: ['loc-central'],
    specialties: ['活化能量艙', '光療＋活罐'],
    bio: '讓你昇起的課程，兼具靈性與扎根感。',
  },
  {
    profile: makeTeacherProfile('謝', '佳玲', 'cher.sloth'),
    location_ids: ['loc-east'],
    specialties: ['負離子活罐', '溫感能量光療'],
    bio: '恆久智慧，緩慢而穩定。讓壓力時光倒流。',
  },
  {
    profile: makeTeacherProfile('楊', '雅琪', 'madonna.tapir'),
    location_ids: ['loc-central', 'loc-fuxing'],
    specialties: ['活化能量艙', '專業撥筋'],
    bio: '每堂課重新定義流動。物質女孩，靈性練習。',
  },
  {
    profile: makeTeacherProfile('何', '美華', 'gwen.narwhal'),
    location_ids: ['loc-east'],
    specialties: ['能量艙＋撥筋', '活化能量艙'],
    bio: '毫無疑問——強而有力、風格獨具的序列。',
  },
  {
    profile: makeTeacherProfile('劉', '淑惠', 'dolly.alpaca'),
    location_ids: ['loc-fuxing'],
    specialties: ['負離子活罐', '光療＋活罐'],
    bio: '朝九晚五的上班族？用溫和愉悅的瑜伽放鬆身心。',
  },
];

// Male teachers
const MALE_TEACHERS: Omit<DemoStaff, 'role' | 'pay_rate_cents' | 'pay_type'>[] = [
  {
    profile: makeTeacherProfile('趙', '志明', 'travis.jones'),
    location_ids: ['loc-central', 'loc-east'],
    specialties: ['活化能量艙', '專業撥筋'],
    bio: '帶有嘻哈能量的運動型流動。前運動員轉職瑜伽老師。',
  },
  {
    profile: makeTeacherProfile('孫', '建宏', 'patrick.jones'),
    location_ids: ['loc-fuxing'],
    specialties: ['負離子活罐', '光療＋活罐'],
    bio: '精準對位與正念動作。適合所有運動員的瑜伽。',
  },
  {
    profile: makeTeacherProfile('馬', '俊傑', 'chris.mahomes'),
    location_ids: ['loc-central'],
    specialties: ['能量艙＋撥筋', '活化能量艙'],
    bio: '墊上的 MVP。強而有力、策略性的序列。',
  },
];

function makeTeacherProfile(firstName: string, lastName: string, emailPrefix: string): Profile {
  return {
    id: `teacher-${emailPrefix.replace('.', '-')}`,
    first_name: firstName,
    last_name: lastName,
    display_name: `${firstName} ${lastName}`,
    email: `${emailPrefix}@oxatlyoga.com`,
    phone: `+1 (512) 555-${String(Math.floor(1000 + Math.random() * 9000))}`,
    avatar_url: null,
    date_of_birth: randomDateOfBirth(1980, 1998),
    pronouns: null,
    emergency_contact_name: null,
    emergency_contact_phone: null,
    bio: '',
    specialties: [],
    certifications: ['美容師證照'],
    instagram_handle: `@${emailPrefix.replace('.', '_')}`,
    website: null,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  };
}

export const OXATL_TEACHERS: DemoStaff[] = [
  ...FEMALE_TEACHERS.map((t, i) => ({
    ...t,
    role: 'teacher' as UserRole,
    pay_rate_cents: 4500 + (i % 5) * 500, // $45-$65 per class
    pay_type: 'per_class' as const,
  })),
  ...MALE_TEACHERS.map((t, i) => ({
    ...t,
    role: 'teacher' as UserRole,
    pay_rate_cents: 5000 + (i % 3) * 500,
    pay_type: 'per_class' as const,
  })),
];

// Owner & Front Desk
export const OXATL_OWNER: DemoStaff = {
  profile: {
    id: 'staff-owner-mariana',
    first_name: 'Mariana',
    last_name: 'Trench',
    display_name: 'Mariana Trench',
    email: 'mariana@oxatlyoga.com',
    phone: '+1 (512) 555-0100',
    avatar_url: null,
    date_of_birth: '1985-06-15',
    pronouns: 'she/her',
    emergency_contact_name: null,
    emergency_contact_phone: null,
    bio: '森浴光mm941 創辦人。致力在城市中打造森林般的純淨與暖陽般的包覆。',
    specialties: ['活化能量艙', '專業撥筋', '溫感能量光療'],
    certifications: ['E-RYT 500', 'YACEP'],
    instagram_handle: '@mariana.trench.yoga',
    website: 'https://oxatlyoga.com',
    created_at: '2022-03-15T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  role: 'owner',
  location_ids: ['loc-xizhi', 'loc-fuxing', 'loc-east', 'loc-central', 'loc-tainan'],
  specialties: ['活化能量艙', '專業撥筋', '溫感能量光療'],
  pay_rate_cents: 0,
  pay_type: 'salary',
  bio: '森浴光mm941 創辦人。致力在城市中打造森林般的純淨與暖陽般的包覆。',
};

export const OXATL_FRONT_DESK: DemoStaff = {
  profile: {
    id: 'staff-frontdesk-cassia',
    first_name: 'Cassia',
    last_name: 'Ray',
    display_name: 'Cassia Ray',
    email: 'cassia@oxatlyoga.com',
    phone: '+1 (512) 555-0101',
    avatar_url: null,
    date_of_birth: '1995-09-22',
    pronouns: 'she/her',
    emergency_contact_name: null,
    emergency_contact_phone: null,
    bio: '讓森浴光順利運作。美容師資培訓中！',
    specialties: [],
    certifications: [],
    instagram_handle: '@cassia.ray',
    website: null,
    created_at: '2023-06-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  role: 'front_desk',
  location_ids: ['loc-central'],
  specialties: [],
  pay_rate_cents: 1800, // $18/hour
  pay_type: 'hourly',
  bio: '讓森浴光順利運作。美容師資培訓中！',
};

// ============================================================================
// CLASS TYPES
// ============================================================================

export interface DemoClassType {
  id: string;
  studio_id: string;
  name: string;
  description: string;
  duration_minutes: number;
  default_capacity: number;
  color: string;
  category: string;
}

export const OXATL_CLASS_TYPES: DemoClassType[] = [
  {
    id: 'class-vinyasa',
    studio_id: OXATL_STUDIO.id,
    name: '活化能量艙',
    description: '獨家頂規高階活化艙，紅外線與光熱效應，啟動由內而外的深層代謝與沈靜。',
    duration_minutes: 90,
    default_capacity: 4,
    color: '#E57373',
    category: 'energy',
  },
  {
    id: 'class-yin',
    studio_id: OXATL_STUDIO.id,
    name: '專業撥筋',
    description: '匠心傳承，精準解鎖每一處緊繃，將多年手藝轉化為細膩的體感享受。',
    duration_minutes: 60,
    default_capacity: 6,
    color: '#64B5F6',
    category: 'bodywork',
  },
  {
    id: 'class-hatha',
    studio_id: OXATL_STUDIO.id,
    name: '溫感能量光療',
    description: '如晨曦般的溫柔光熱，喚醒內在沈靜，專為高壓環境下無法放鬆的您設計。',
    duration_minutes: 60,
    default_capacity: 6,
    color: '#81C784',
    category: 'light',
  },
  {
    id: 'class-pilates',
    studio_id: OXATL_STUDIO.id,
    name: '負離子活罐',
    description: '溫潤負離子科技，在吸放之間溫柔卸下累積的沉重，重拾輕盈平衡。',
    duration_minutes: 75,
    default_capacity: 6,
    color: '#FFB74D',
    category: 'wellness',
  },
  {
    id: 'class-meditation',
    studio_id: OXATL_STUDIO.id,
    name: '舒通筋脈',
    description: '流暢手技化解僵硬束縛，讓疲憊身軀回歸輕盈靈活，找回原本的自在節奏。',
    duration_minutes: 60,
    default_capacity: 6,
    color: '#9575CD',
    category: 'bodywork',
  },
  {
    id: 'class-power',
    studio_id: OXATL_STUDIO.id,
    name: '能量艙＋撥筋',
    description: '先鬆開緊繃、後導引能量。物理與光熱加乘，讓放鬆感更透徹、更持久。',
    duration_minutes: 120,
    default_capacity: 4,
    color: '#F06292',
    category: 'combo',
  },
  {
    id: 'class-restorative',
    studio_id: OXATL_STUDIO.id,
    name: '光療＋活罐',
    description: '光熱與負離子雙重舒壓，深層賦活身心，適合需要完整修復的時刻。',
    duration_minutes: 90,
    default_capacity: 4,
    color: '#4DB6AC',
    category: 'combo',
  },
];

// ============================================================================
// SCHEDULE TEMPLATES
// ============================================================================

export interface DemoScheduleSlot {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  time: string; // HH:MM format
  class_type_id: string;
  location_id: string;
  teacher_id: string;
  room_id?: string;
}

// Weekday schedule: 7am, 10:30am, 12pm, 4pm or 6pm
// Saturday: 9am, 12pm, 3pm
// Sunday: 10:30am, 12pm, 4pm
export const OXATL_SCHEDULE: DemoScheduleSlot[] = [
  // MONDAY
  { day: 'monday', time: '07:00', class_type_id: 'class-vinyasa', location_id: 'loc-central', teacher_id: 'teacher-beyonce-pangolin' },
  { day: 'monday', time: '10:30', class_type_id: 'class-hatha', location_id: 'loc-central', teacher_id: 'teacher-adele-capybara' },
  { day: 'monday', time: '12:00', class_type_id: 'class-pilates', location_id: 'loc-central', teacher_id: 'teacher-ariana-hedgehog' },
  { day: 'monday', time: '18:00', class_type_id: 'class-yin', location_id: 'loc-central', teacher_id: 'teacher-billie-chinchilla' },

  { day: 'monday', time: '07:00', class_type_id: 'class-hatha', location_id: 'loc-east', teacher_id: 'teacher-rihanna-quokka' },
  { day: 'monday', time: '10:30', class_type_id: 'class-vinyasa', location_id: 'loc-east', teacher_id: 'teacher-dua-axolotl' },
  { day: 'monday', time: '12:00', class_type_id: 'class-power', location_id: 'loc-east', teacher_id: 'teacher-travis-jones' },
  { day: 'monday', time: '16:00', class_type_id: 'class-yin', location_id: 'loc-east', teacher_id: 'teacher-cher-sloth' },

  { day: 'monday', time: '07:00', class_type_id: 'class-vinyasa', location_id: 'loc-fuxing', teacher_id: 'teacher-taylor-otter' },
  { day: 'monday', time: '10:30', class_type_id: 'class-pilates', location_id: 'loc-fuxing', teacher_id: 'teacher-patrick-jones' },
  { day: 'monday', time: '12:00', class_type_id: 'class-hatha', location_id: 'loc-fuxing', teacher_id: 'teacher-dolly-alpaca' },
  { day: 'monday', time: '18:00', class_type_id: 'class-restorative', location_id: 'loc-fuxing', teacher_id: 'teacher-celine-manatee' },

  { day: 'monday', time: '10:30', class_type_id: 'class-vinyasa', location_id: 'loc-xizhi', teacher_id: 'teacher-beyonce-pangolin' },
  { day: 'monday', time: '14:00', class_type_id: 'class-yin', location_id: 'loc-xizhi', teacher_id: 'teacher-adele-capybara' },
  { day: 'monday', time: '16:00', class_type_id: 'class-pilates', location_id: 'loc-tainan', teacher_id: 'teacher-ariana-hedgehog' },
  { day: 'monday', time: '18:30', class_type_id: 'class-meditation', location_id: 'loc-tainan', teacher_id: 'teacher-billie-chinchilla' },

  // TUESDAY
  { day: 'tuesday', time: '07:00', class_type_id: 'class-power', location_id: 'loc-central', teacher_id: 'teacher-lizzo-wombat' },
  { day: 'tuesday', time: '10:30', class_type_id: 'class-vinyasa', location_id: 'loc-central', teacher_id: 'teacher-madonna-tapir' },
  { day: 'tuesday', time: '12:00', class_type_id: 'class-hatha', location_id: 'loc-central', teacher_id: 'teacher-chris-mahomes' },
  { day: 'tuesday', time: '18:00', class_type_id: 'class-vinyasa', location_id: 'loc-central', teacher_id: 'teacher-whitney-puffin' },

  { day: 'tuesday', time: '07:00', class_type_id: 'class-vinyasa', location_id: 'loc-east', teacher_id: 'teacher-shakira-fennec' },
  { day: 'tuesday', time: '10:30', class_type_id: 'class-yin', location_id: 'loc-east', teacher_id: 'teacher-adele-capybara' },
  { day: 'tuesday', time: '12:00', class_type_id: 'class-pilates', location_id: 'loc-east', teacher_id: 'teacher-gwen-narwhal' },
  { day: 'tuesday', time: '16:00', class_type_id: 'class-hatha', location_id: 'loc-east', teacher_id: 'teacher-dua-axolotl' },

  { day: 'tuesday', time: '07:00', class_type_id: 'class-hatha', location_id: 'loc-fuxing', teacher_id: 'teacher-dolly-alpaca' },
  { day: 'tuesday', time: '10:30', class_type_id: 'class-vinyasa', location_id: 'loc-fuxing', teacher_id: 'teacher-rihanna-quokka' },
  { day: 'tuesday', time: '12:00', class_type_id: 'class-yin', location_id: 'loc-fuxing', teacher_id: 'teacher-billie-chinchilla' },
  { day: 'tuesday', time: '18:00', class_type_id: 'class-power', location_id: 'loc-fuxing', teacher_id: 'teacher-madonna-tapir' },

  // WEDNESDAY
  { day: 'wednesday', time: '07:00', class_type_id: 'class-vinyasa', location_id: 'loc-central', teacher_id: 'teacher-beyonce-pangolin' },
  { day: 'wednesday', time: '10:30', class_type_id: 'class-pilates', location_id: 'loc-central', teacher_id: 'teacher-ariana-hedgehog' },
  { day: 'wednesday', time: '12:00', class_type_id: 'class-yin', location_id: 'loc-central', teacher_id: 'teacher-adele-capybara' },
  { day: 'wednesday', time: '18:00', class_type_id: 'class-hatha', location_id: 'loc-central', teacher_id: 'teacher-whitney-puffin' },

  { day: 'wednesday', time: '07:00', class_type_id: 'class-power', location_id: 'loc-east', teacher_id: 'teacher-travis-jones' },
  { day: 'wednesday', time: '10:30', class_type_id: 'class-hatha', location_id: 'loc-east', teacher_id: 'teacher-cher-sloth' },
  { day: 'wednesday', time: '12:00', class_type_id: 'class-vinyasa', location_id: 'loc-east', teacher_id: 'teacher-rihanna-quokka' },
  { day: 'wednesday', time: '16:00', class_type_id: 'class-pilates', location_id: 'loc-east', teacher_id: 'teacher-shakira-fennec' },

  { day: 'wednesday', time: '07:00', class_type_id: 'class-hatha', location_id: 'loc-fuxing', teacher_id: 'teacher-taylor-otter' },
  { day: 'wednesday', time: '10:30', class_type_id: 'class-yin', location_id: 'loc-fuxing', teacher_id: 'teacher-celine-manatee' },
  { day: 'wednesday', time: '12:00', class_type_id: 'class-vinyasa', location_id: 'loc-fuxing', teacher_id: 'teacher-patrick-jones' },
  { day: 'wednesday', time: '18:00', class_type_id: 'class-restorative', location_id: 'loc-fuxing', teacher_id: 'teacher-billie-chinchilla' },

  // THURSDAY
  { day: 'thursday', time: '07:00', class_type_id: 'class-power', location_id: 'loc-central', teacher_id: 'teacher-lizzo-wombat' },
  { day: 'thursday', time: '10:30', class_type_id: 'class-vinyasa', location_id: 'loc-central', teacher_id: 'teacher-chris-mahomes' },
  { day: 'thursday', time: '12:00', class_type_id: 'class-pilates', location_id: 'loc-central', teacher_id: 'teacher-ariana-hedgehog' },
  { day: 'thursday', time: '18:00', class_type_id: 'class-yin', location_id: 'loc-central', teacher_id: 'teacher-adele-capybara' },

  { day: 'thursday', time: '07:00', class_type_id: 'class-vinyasa', location_id: 'loc-east', teacher_id: 'teacher-beyonce-pangolin' },
  { day: 'thursday', time: '10:30', class_type_id: 'class-hatha', location_id: 'loc-east', teacher_id: 'teacher-dua-axolotl' },
  { day: 'thursday', time: '12:00', class_type_id: 'class-power', location_id: 'loc-east', teacher_id: 'teacher-travis-jones' },
  { day: 'thursday', time: '16:00', class_type_id: 'class-restorative', location_id: 'loc-east', teacher_id: 'teacher-cher-sloth' },

  { day: 'thursday', time: '07:00', class_type_id: 'class-vinyasa', location_id: 'loc-fuxing', teacher_id: 'teacher-madonna-tapir' },
  { day: 'thursday', time: '10:30', class_type_id: 'class-pilates', location_id: 'loc-fuxing', teacher_id: 'teacher-gwen-narwhal' },
  { day: 'thursday', time: '12:00', class_type_id: 'class-hatha', location_id: 'loc-fuxing', teacher_id: 'teacher-dolly-alpaca' },
  { day: 'thursday', time: '18:00', class_type_id: 'class-yin', location_id: 'loc-fuxing', teacher_id: 'teacher-celine-manatee' },

  // FRIDAY
  { day: 'friday', time: '07:00', class_type_id: 'class-vinyasa', location_id: 'loc-central', teacher_id: 'teacher-whitney-puffin' },
  { day: 'friday', time: '10:30', class_type_id: 'class-hatha', location_id: 'loc-central', teacher_id: 'teacher-madonna-tapir' },
  { day: 'friday', time: '12:00', class_type_id: 'class-yin', location_id: 'loc-central', teacher_id: 'teacher-billie-chinchilla' },
  { day: 'friday', time: '16:00', class_type_id: 'class-restorative', location_id: 'loc-central', teacher_id: 'teacher-adele-capybara' },

  { day: 'friday', time: '07:00', class_type_id: 'class-pilates', location_id: 'loc-east', teacher_id: 'teacher-shakira-fennec' },
  { day: 'friday', time: '10:30', class_type_id: 'class-vinyasa', location_id: 'loc-east', teacher_id: 'teacher-rihanna-quokka' },
  { day: 'friday', time: '12:00', class_type_id: 'class-hatha', location_id: 'loc-east', teacher_id: 'teacher-dua-axolotl' },
  { day: 'friday', time: '16:00', class_type_id: 'class-yin', location_id: 'loc-east', teacher_id: 'teacher-cher-sloth' },

  { day: 'friday', time: '07:00', class_type_id: 'class-hatha', location_id: 'loc-fuxing', teacher_id: 'teacher-taylor-otter' },
  { day: 'friday', time: '10:30', class_type_id: 'class-power', location_id: 'loc-fuxing', teacher_id: 'teacher-patrick-jones' },
  { day: 'friday', time: '12:00', class_type_id: 'class-vinyasa', location_id: 'loc-fuxing', teacher_id: 'teacher-dolly-alpaca' },
  { day: 'friday', time: '16:00', class_type_id: 'class-restorative', location_id: 'loc-fuxing', teacher_id: 'teacher-celine-manatee' },

  // SATURDAY - 9am, 12pm, 3pm + Meditation
  { day: 'saturday', time: '09:00', class_type_id: 'class-vinyasa', location_id: 'loc-central', teacher_id: 'teacher-beyonce-pangolin' },
  { day: 'saturday', time: '12:00', class_type_id: 'class-power', location_id: 'loc-central', teacher_id: 'teacher-lizzo-wombat' },
  { day: 'saturday', time: '15:00', class_type_id: 'class-yin', location_id: 'loc-central', teacher_id: 'teacher-adele-capybara' },
  { day: 'saturday', time: '16:30', class_type_id: 'class-meditation', location_id: 'loc-central', teacher_id: 'teacher-billie-chinchilla' },

  { day: 'saturday', time: '09:00', class_type_id: 'class-hatha', location_id: 'loc-east', teacher_id: 'teacher-rihanna-quokka' },
  { day: 'saturday', time: '12:00', class_type_id: 'class-vinyasa', location_id: 'loc-east', teacher_id: 'teacher-travis-jones' },
  { day: 'saturday', time: '15:00', class_type_id: 'class-restorative', location_id: 'loc-east', teacher_id: 'teacher-cher-sloth' },

  { day: 'saturday', time: '09:00', class_type_id: 'class-vinyasa', location_id: 'loc-fuxing', teacher_id: 'teacher-madonna-tapir' },
  { day: 'saturday', time: '12:00', class_type_id: 'class-hatha', location_id: 'loc-fuxing', teacher_id: 'teacher-taylor-otter' },
  { day: 'saturday', time: '15:00', class_type_id: 'class-meditation', location_id: 'loc-fuxing', teacher_id: 'teacher-dolly-alpaca' },

  // SUNDAY - 10:30am, 12pm, 4pm
  { day: 'sunday', time: '10:30', class_type_id: 'class-hatha', location_id: 'loc-central', teacher_id: 'teacher-whitney-puffin' },
  { day: 'sunday', time: '12:00', class_type_id: 'class-vinyasa', location_id: 'loc-central', teacher_id: 'teacher-chris-mahomes' },
  { day: 'sunday', time: '16:00', class_type_id: 'class-restorative', location_id: 'loc-central', teacher_id: 'teacher-adele-capybara' },

  { day: 'sunday', time: '10:30', class_type_id: 'class-vinyasa', location_id: 'loc-east', teacher_id: 'teacher-dua-axolotl' },
  { day: 'sunday', time: '12:00', class_type_id: 'class-yin', location_id: 'loc-east', teacher_id: 'teacher-cher-sloth' },
  { day: 'sunday', time: '16:00', class_type_id: 'class-hatha', location_id: 'loc-east', teacher_id: 'teacher-gwen-narwhal' },

  { day: 'sunday', time: '10:30', class_type_id: 'class-yin', location_id: 'loc-fuxing', teacher_id: 'teacher-celine-manatee' },
  { day: 'sunday', time: '12:00', class_type_id: 'class-vinyasa', location_id: 'loc-fuxing', teacher_id: 'teacher-patrick-jones' },
  { day: 'sunday', time: '16:00', class_type_id: 'class-restorative', location_id: 'loc-fuxing', teacher_id: 'teacher-billie-chinchilla' },
];

// ============================================================================
// WORKSHOPS & EVENTS
// ============================================================================

export interface DemoEvent {
  id: string;
  studio_id: string;
  name: string;
  description: string;
  location_id: string;
  teacher_id: string;
  start_time: string;
  end_time: string;
  capacity: number;
  price_cents: number;
  category: string;
}

// Rotating workshops - 2 per month
export const OXATL_WORKSHOP_TEMPLATES = [
  {
    name: '筋膜放鬆工作坊',
    description: '學習使用按摩球與滾筒的自我按摩技巧，釋放緊繃、改善活動度。帶回可每日練習的實用工具。',
    duration_hours: 2,
    price_cents: 4500,
    category: 'workshop',
    teacher_id: 'teacher-shakira-fennec',
  },
  {
    name: '呼吸之旅',
    description: '探索來自不同傳統的轉化性呼吸技巧。包含調息、全息呼吸與整合練習。',
    duration_hours: 2.5,
    price_cents: 5500,
    category: 'workshop',
    teacher_id: 'teacher-billie-chinchilla',
  },
  {
    name: '咒語與動態',
    description: '結合神聖聲音與溫和動作的力量。無需歌唱經驗——只需一顆開放的心。',
    duration_hours: 2,
    price_cents: 4000,
    category: 'workshop',
    teacher_id: 'teacher-whitney-puffin',
  },
  {
    name: '螢光瑜伽',
    description: '在黑光下進行活化能量艙，搭配螢光身體彩繪。獨特有趣的體驗，喚醒內在光芒。',
    duration_hours: 1.5,
    price_cents: 3500,
    category: 'special',
    teacher_id: 'teacher-lizzo-wombat',
  },
  {
    name: '溫感能量光療與現場音樂',
    description: '深度溫感能量光療練習，伴隨現場原聲音樂。讓聲音帶你進入更深的寧靜。',
    duration_hours: 2,
    price_cents: 4500,
    category: 'workshop',
    teacher_id: 'teacher-adele-capybara',
  },
  {
    name: '頌缽療癒',
    description: '沉浸於水晶缽、銅缽與風鈴的療癒振動中。只需躺下，全然接收。',
    duration_hours: 1.5,
    price_cents: 3500,
    category: 'wellness',
    teacher_id: 'teacher-celine-manatee',
  },
  {
    name: '滿月儀式',
    description: '每月聚會，致敬滿月週期。包含溫和動作、光療＋活罐、書寫與社群連結。',
    duration_hours: 2,
    price_cents: 3000,
    category: 'ceremony',
    teacher_id: 'teacher-taylor-otter',
  },
];

// ============================================================================
// MEMBERSHIP TYPES
// ============================================================================

export interface DemoMembershipType {
  id: string;
  studio_id: string;
  name: string;
  description: string;
  price_cents: number;
  billing_cycle: 'monthly' | 'annual';
  classes_per_period: number | null; // null = unlimited
  features: string[];
}

export const OXATL_MEMBERSHIP_TYPES: DemoMembershipType[] = [
  {
    id: 'mem-unlimited-monthly',
    studio_id: OXATL_STUDIO.id,
    name: '月付無限堂數',
    description: '所有分館無限堂數，另享會員專屬優惠',
    price_cents: 17900,
    billing_cycle: 'monthly',
    classes_per_period: null,
    features: ['無限堂數', '三館通用', '商品 9 折', '工作坊優先報名', '每月 2 次攜伴'],
  },
  {
    id: 'mem-unlimited-annual',
    studio_id: OXATL_STUDIO.id,
    name: '年付無限堂數',
    description: '最超值——年約享兩個月免費',
    price_cents: 179000,
    billing_cycle: 'annual',
    classes_per_period: null,
    features: ['無限堂數', '三館通用', '商品 85 折', '工作坊優先預約', '每月 4 次攜伴', '免費墊位存放'],
  },
  {
    id: 'mem-8-monthly',
    studio_id: OXATL_STUDIO.id,
    name: '每月 8 堂',
    description: '適合每週練習 2 次',
    price_cents: 12900,
    billing_cycle: 'monthly',
    classes_per_period: 8,
    features: ['每月 8 堂', '三館通用', '最多保留 4 堂至下月'],
  },
  {
    id: 'mem-4-monthly',
    studio_id: OXATL_STUDIO.id,
    name: '每月 4 堂',
    description: '適合每週練習 1 次',
    price_cents: 7900,
    billing_cycle: 'monthly',
    classes_per_period: 4,
    features: ['每月 4 堂', '三館通用', '最多保留 2 堂至下月'],
  },
];

// ============================================================================
// CLASS PACKS
// ============================================================================

export interface DemoClassPackType {
  id: string;
  studio_id: string;
  name: string;
  description: string;
  price_cents: number;
  class_count: number;
  validity_days: number;
}

export const OXATL_CLASS_PACK_TYPES: DemoClassPackType[] = [
  {
    id: 'pack-10',
    studio_id: OXATL_STUDIO.id,
    name: '10 堂方案',
    description: '彈性方案，適合不定期練習',
    price_cents: 18000,
    class_count: 10,
    validity_days: 90,
  },
  {
    id: 'pack-20',
    studio_id: OXATL_STUDIO.id,
    name: '20 堂方案',
    description: '固定練習更划算',
    price_cents: 32000,
    class_count: 20,
    validity_days: 180,
  },
  {
    id: 'pack-5',
    studio_id: OXATL_STUDIO.id,
    name: '5 堂方案',
    description: '初次體驗首選',
    price_cents: 9500,
    class_count: 5,
    validity_days: 60,
  },
  {
    id: 'pack-intro',
    studio_id: OXATL_STUDIO.id,
    name: '新學員優惠',
    description: '新學員 30 天無限堂數',
    price_cents: 4900,
    class_count: 999, // effectively unlimited
    validity_days: 30,
  },
];

// ============================================================================
// MEMBERS (Generated)
// ============================================================================

const FIRST_NAMES = [
  'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn',
  'Abigail', 'Emily', 'Elizabeth', 'Sofia', 'Avery', 'Ella', 'Scarlett', 'Grace', 'Chloe', 'Victoria',
  'Riley', 'Aria', 'Lily', 'Aurora', 'Zoey', 'Penelope', 'Luna', 'Camila', 'Layla', 'Mila',
  'James', 'Liam', 'Noah', 'Oliver', 'Elijah', 'Lucas', 'Mason', 'Ethan', 'Alexander', 'Henry',
  'Sebastian', 'Jack', 'Aiden', 'Owen', 'Samuel', 'Ryan', 'Nathan', 'Leo', 'Daniel', 'Matthew',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
];

export interface DemoMember {
  profile: Profile;
  membership_type_id: string | null;
  membership_status: MembershipStatus;
  class_pack_type_id: string | null;
  classes_remaining: number;
  joined_at: string;
  last_visit_at: string | null;
  total_visits: number;
  lifetime_value_cents: number;
  tags: string[];
}

function randomDateOfBirth(minYear: number, maxYear: number): string {
  const year = minYear + Math.floor(Math.random() * (maxYear - minYear));
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function randomPastDate(daysBack: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString();
}

function generateMembers(count: number): DemoMember[] {
  const members: DemoMember[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;

    // Membership distribution (Austin/Seattle boutique studio estimate)
    // ~30% unlimited monthly, ~10% unlimited annual, ~15% 8/month, ~10% 4/month
    // ~20% class packs, ~15% intro/trial
    const rand = Math.random();
    let membershipTypeId: string | null = null;
    let membershipStatus: MembershipStatus = 'active';
    let classPackTypeId: string | null = null;
    let classesRemaining = 0;

    if (rand < 0.30) {
      membershipTypeId = 'mem-unlimited-monthly';
    } else if (rand < 0.40) {
      membershipTypeId = 'mem-unlimited-annual';
    } else if (rand < 0.55) {
      membershipTypeId = 'mem-8-monthly';
    } else if (rand < 0.65) {
      membershipTypeId = 'mem-4-monthly';
    } else if (rand < 0.85) {
      classPackTypeId = Math.random() < 0.6 ? 'pack-10' : 'pack-20';
      classesRemaining = Math.floor(Math.random() * (classPackTypeId === 'pack-10' ? 10 : 20));
    } else {
      classPackTypeId = 'pack-intro';
      classesRemaining = Math.floor(Math.random() * 15);
    }

    // Some members are expired, paused, or past due
    if (membershipTypeId && Math.random() < 0.1) {
      membershipStatus = Math.random() < 0.5 ? 'expired' : (Math.random() < 0.5 ? 'paused' : 'past_due');
    }

    // Visit patterns
    const joinedDaysAgo = Math.floor(Math.random() * 730) + 30; // 1 month to 2 years
    const totalVisits = Math.floor(Math.random() * 200) + 5;
    const lastVisitDaysAgo = membershipStatus === 'active'
      ? Math.floor(Math.random() * 30)
      : Math.floor(Math.random() * 90) + 30;

    // Tags
    const tags: string[] = [];
    if (Math.random() < 0.2) tags.push('vip');
    if (Math.random() < 0.15) tags.push('瑜伽愛好者');
    if (Math.random() < 0.1) tags.push('能量艙＋撥筋愛好者');
    if (lastVisitDaysAgo > 14 && membershipStatus === 'active') tags.push('流失風險');
    if (joinedDaysAgo < 30) tags.push('新會員');

    members.push({
      profile: {
        id: `member-${i.toString().padStart(4, '0')}`,
        first_name: firstName,
        last_name: lastName,
        display_name: `${firstName} ${lastName}`,
        email,
        phone: `+1 (512) 555-${String(Math.floor(1000 + Math.random() * 9000))}`,
        avatar_url: null,
        date_of_birth: randomDateOfBirth(1965, 2005),
        pronouns: null,
        emergency_contact_name: null,
        emergency_contact_phone: null,
        bio: null,
        specialties: [],
        certifications: [],
        instagram_handle: null,
        website: null,
        created_at: randomPastDate(joinedDaysAgo),
        updated_at: randomPastDate(lastVisitDaysAgo),
      },
      membership_type_id: membershipTypeId,
      membership_status: membershipStatus,
      class_pack_type_id: classPackTypeId,
      classes_remaining: classesRemaining,
      joined_at: randomPastDate(joinedDaysAgo),
      last_visit_at: randomPastDate(lastVisitDaysAgo),
      total_visits: totalVisits,
      lifetime_value_cents: totalVisits * 1800 + (membershipTypeId ? 17900 * Math.floor(joinedDaysAgo / 30) : 0),
      tags,
    });
  }

  return members;
}

// Generate 500 members (Austin/Seattle boutique studio size)
export const OXATL_MEMBERS = generateMembers(500);

// ============================================================================
// SUMMARY STATS (for quick reference)
// ============================================================================

export const OXATL_STATS = {
  totalMembers: OXATL_MEMBERS.length,
  activeMembers: OXATL_MEMBERS.filter(m => m.membership_status === 'active').length,
  atRiskMembers: OXATL_MEMBERS.filter(m => m.tags.includes('流失風險')).length,
  newMembers: OXATL_MEMBERS.filter(m => m.tags.includes('新會員')).length,
  vipMembers: OXATL_MEMBERS.filter(m => m.tags.includes('vip')).length,
  totalTeachers: OXATL_TEACHERS.length,
  totalLocations: OXATL_LOCATIONS.length,
  classesPerWeek: OXATL_SCHEDULE.length,
  avgClassPrice: 1800, // $18 average
};

// ============================================================
// AGAPE INTERNATIONAL — TYPE DEFINITIONS
// ============================================================

export type UserRole = "member" | "admin" | "pastor" | "staff";

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  address: string | null;
  member_since: string | null;
  role: UserRole;
  is_directory_visible: boolean;
  created_at: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  series: string | null;
  description: string | null;
  youtube_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  sermon_date: string;
  tags: string[];
  view_count: number;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  start_time: string;
  end_time: string;
  cover_image_url: string | null;
  max_attendees: number | null;
  category: EventCategory;
  is_featured: boolean;
  rsvp_count?: number;
  created_at: string;
}

export type EventCategory =
  | "service"
  | "youth"
  | "women"
  | "men"
  | "community"
  | "outreach"
  | "other";

export interface RSVP {
  id: string;
  event_id: string;
  user_id: string;
  status: "going" | "waitlist" | "cancelled";
  created_at: string;
}

export type DonationFund = "tithe" | "offering" | "missions" | "building";
export type DonationFrequency = "one_time" | "weekly" | "monthly";
export type DonationStatus = "pending" | "succeeded" | "failed";

export interface Donation {
  id: string;
  user_id: string;
  amount_cents: number;
  fund: DonationFund;
  frequency: DonationFrequency;
  stripe_payment_intent_id: string | null;
  stripe_subscription_id: string | null;
  status: DonationStatus;
  created_at: string;
}

export type PrayerCategory =
  | "healing"
  | "provision"
  | "guidance"
  | "family"
  | "other";

export interface PrayerRequest {
  id: string;
  user_id: string | null;
  title: string;
  body: string;
  is_public: boolean;
  is_anonymous: boolean;
  is_approved: boolean;
  is_answered: boolean;
  pray_count: number;
  category: PrayerCategory;
  created_at: string;
  profile?: Pick<Profile, "full_name" | "avatar_url">;
  user_has_prayed?: boolean;
}

export interface SundayPhoto {
  id: string;
  user_id: string;
  image_url: string;
  caption: string | null;
  service_date: string;
  heart_count: number;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
  profile?: Pick<Profile, "full_name" | "avatar_url">;
  user_has_hearted?: boolean;
}

export interface RideOffer {
  id: string;
  driver_id: string;
  pickup_address: string;
  pickup_lat: number | null;
  pickup_lng: number | null;
  service_time: string;
  seats_available: number;
  seats_remaining: number;
  notes: string | null;
  status: "open" | "full" | "cancelled";
  created_at: string;
  driver?: Pick<Profile, "full_name" | "avatar_url" | "phone">;
  distance_km?: number;
}

export interface RideRequest {
  id: string;
  rider_id: string;
  offer_id: string;
  pickup_address: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  offer?: RideOffer;
  rider?: Pick<Profile, "full_name" | "avatar_url" | "phone">;
}

export type GroupCategory =
  | "young-adults"
  | "couples"
  | "men"
  | "women"
  | "seniors"
  | "youth"
  | "bible-study"
  | "home-meeting";

export interface Group {
  id: string;
  name: string;
  description: string | null;
  leader_id: string;
  category: GroupCategory;
  meeting_day: string | null;
  meeting_time: string | null;
  location: string | null;
  max_members: number | null;
  cover_image_url: string | null;
  is_open: boolean;
  created_at: string;
  member_count?: number;
  leader?: Pick<Profile, "full_name" | "avatar_url">;
}

// UI State types
export interface ToastMessage {
  type: "success" | "error" | "info";
  message: string;
}

export interface LiveStreamStatus {
  isLive: boolean;
  videoId: string | null;
  viewerCount: number | null;
  title: string | null;
  thumbnailUrl: string | null;
}

// Admin stats
export interface AdminStats {
  totalMembers: number;
  monthlyGiving: number;
  activePrayerRequests: number;
  eventsThisMonth: number;
}

export interface GivingByFund {
  fund: DonationFund;
  total_cents: number;
}

export interface MonthlyGivingData {
  month: string;
  total_cents: number;
}

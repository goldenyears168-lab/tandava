import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Index = lazy(() => import("@/pages/Index"));
const Schedule = lazy(() => import("@/pages/Schedule"));
const MySchedule = lazy(() => import("@/pages/MySchedule"));
const Community = lazy(() => import("@/pages/Community"));
const Account = lazy(() => import("@/pages/Account"));
const Studios = lazy(() => import("@/pages/Studios"));
const StudioDetail = lazy(() => import("@/pages/StudioDetail"));
const Instructors = lazy(() => import("@/pages/Instructors"));
const InstructorDetail = lazy(() => import("@/pages/InstructorDetail"));
const OnDemand = lazy(() => import("@/pages/OnDemand"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Demo = lazy(() => import("@/pages/Demo"));
const OpenSource = lazy(() => import("@/pages/OpenSource"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogCategory = lazy(() => import("@/pages/blog/BlogCategory"));
const BlogPost = lazy(() => import("@/pages/blog/BlogPost"));
const Kiosk = lazy(() => import("@/pages/Kiosk"));

const ManageDashboard = lazy(() => import("@/pages/manage/Dashboard"));
const ScheduleManage = lazy(() => import("@/pages/manage/ScheduleManage"));
const StudentsManage = lazy(() => import("@/pages/manage/Students"));
const TeachersManage = lazy(() => import("@/pages/manage/Teachers"));
const OfferingsManage = lazy(() => import("@/pages/manage/Offerings"));
const FinancialsManage = lazy(() => import("@/pages/manage/Financials"));
const ReportsManage = lazy(() => import("@/pages/manage/Reports"));
const ImportManage = lazy(() => import("@/pages/manage/Import"));
const SettingsManage = lazy(() => import("@/pages/manage/Settings"));
const OnboardingManage = lazy(() => import("@/pages/manage/Onboarding"));
const MemberDetailManage = lazy(() => import("@/pages/manage/MemberDetail"));
const PromoCodesManage = lazy(() => import("@/pages/manage/PromoCodes"));
const EventsManage = lazy(() => import("@/pages/manage/Events"));
const LandingPagesManage = lazy(() => import("@/pages/manage/LandingPages"));
const AnalyticsHubManage = lazy(() => import("@/pages/manage/AnalyticsHub"));
const MemberAnalyticsManage = lazy(() => import("@/pages/manage/MemberAnalytics"));
const SalesAnalyticsManage = lazy(() => import("@/pages/manage/SalesAnalytics"));
const FinancialAnalyticsManage = lazy(() => import("@/pages/manage/FinancialAnalytics"));
const SiteAnalyticsManage = lazy(() => import("@/pages/manage/SiteAnalytics"));
const DataConnectorsManage = lazy(() => import("@/pages/manage/DataConnectors"));
const ProductsManage = lazy(() => import("@/pages/manage/Products"));
const InventoryManage = lazy(() => import("@/pages/manage/Inventory"));
const PurchaseOrdersManage = lazy(() => import("@/pages/manage/PurchaseOrders"));
const NotificationSettingsManage = lazy(() => import("@/pages/manage/NotificationSettings"));
const SmsInboxManage = lazy(() => import("@/pages/manage/SmsInbox"));
const UtmBuilderManage = lazy(() => import("@/pages/manage/UtmBuilder"));
const CampaignsManage = lazy(() => import("@/pages/manage/Campaigns"));
const TasksManage = lazy(() => import("@/pages/manage/Tasks"));
const OnDemandManage = lazy(() => import("@/pages/manage/OnDemand"));
const FeatureSettingsManage = lazy(() => import("@/pages/manage/FeatureSettings"));
const AuditLogsManage = lazy(() => import("@/pages/manage/AuditLogs"));
const DataDictionaryManage = lazy(() => import("@/pages/manage/DataDictionary"));
const DefinitionsManage = lazy(() => import("@/pages/manage/Definitions"));
const EmbedSettingsManage = lazy(() => import("@/pages/manage/EmbedSettings"));

const NotificationPreferences = lazy(() => import("@/pages/account/NotificationPreferences"));

const TeachDashboard = lazy(() => import("@/pages/teach/Dashboard"));
const TeachSchedule = lazy(() => import("@/pages/teach/Schedule"));
const TeachSubs = lazy(() => import("@/pages/teach/Subs"));
const TeachEarnings = lazy(() => import("@/pages/teach/Earnings"));
const TeachAvailability = lazy(() => import("@/pages/teach/Availability"));
const TeachProfile = lazy(() => import("@/pages/teach/Profile"));

const StaffCheckin = lazy(() => import("@/pages/staff/StaffCheckin"));
const StaffWaitlist = lazy(() => import("@/pages/staff/StaffWaitlist"));

const EmbedSchedule = lazy(() => import("@/pages/embed/EmbedSchedule"));
const EmbedEvent = lazy(() => import("@/pages/embed/EmbedEvent"));

const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminStudios = lazy(() => import("@/pages/admin/AdminStudios"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminBilling = lazy(() => import("@/pages/admin/AdminBilling"));
const AdminFeedback = lazy(() => import("@/pages/admin/AdminFeedback"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));

/* eslint-disable-next-line react-refresh/only-export-components */
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthCallback } from "@/components/auth/AuthCallback";

const routes: RouteObject[] = [
  /* ---- Demo landing page (role picker) ---- */
  { path: "/", element: <Demo /> },
  { path: "/demo", element: <Demo /> },
  { path: "/open-source", element: <OpenSource /> },

  /* ---- Blog ---- */
  { path: "/blog", element: <Blog /> },
  { path: "/blog/category/:category", element: <BlogCategory /> },
  { path: "/blog/:slug", element: <BlogPost /> },

  /* ---- Student-facing routes ---- */
  { path: "/home", element: <Index /> },
  { path: "/schedule", element: <Schedule /> },
  { path: "/events", element: <Studios /> },
  { path: "/events/:id", element: <StudioDetail /> },
  { path: "/instructors", element: <Instructors /> },
  { path: "/instructors/:id", element: <InstructorDetail /> },
  { path: "/on-demand", element: <OnDemand /> },

  /* ---- Auth routes ---- */
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/callback", element: <AuthCallback /> },

  /* ---- Authenticated member routes ---- */
  { path: "/my-schedule", element: <ProtectedRoute permission="member.view_profile"><MySchedule /></ProtectedRoute> },
  { path: "/community", element: <ProtectedRoute permission="member.view_profile"><Community /></ProtectedRoute> },
  { path: "/account", element: <ProtectedRoute permission="member.view_profile"><Account /></ProtectedRoute> },
  { path: "/account/notifications", element: <ProtectedRoute permission="member.view_profile"><NotificationPreferences /></ProtectedRoute> },

  /* ---- Platform admin routes (/admin) ---- */
  { path: "/admin", element: <ProtectedRoute permission="platform.admin"><AdminDashboard /></ProtectedRoute> },
  { path: "/admin/studios", element: <ProtectedRoute permission="platform.manage_studios"><AdminStudios /></ProtectedRoute> },
  { path: "/admin/users", element: <ProtectedRoute permission="platform.manage_users"><AdminUsers /></ProtectedRoute> },
  { path: "/admin/billing", element: <ProtectedRoute permission="platform.manage_billing"><AdminBilling /></ProtectedRoute> },
  { path: "/admin/feedback", element: <ProtectedRoute permission="platform.admin"><AdminFeedback /></ProtectedRoute> },
  { path: "/admin/settings", element: <ProtectedRoute permission="platform.admin"><AdminSettings /></ProtectedRoute> },

  /* ---- Studio management routes (/manage) ---- */
  { path: "/manage", element: <ProtectedRoute permission="studio.manage_schedule"><ManageDashboard /></ProtectedRoute> },
  { path: "/manage/schedule", element: <ProtectedRoute permission="studio.manage_schedule"><ScheduleManage /></ProtectedRoute> },
  { path: "/manage/students", element: <ProtectedRoute permission="studio.manage_schedule"><StudentsManage /></ProtectedRoute> },
  { path: "/manage/teachers", element: <ProtectedRoute permission="studio.manage_schedule"><TeachersManage /></ProtectedRoute> },
  { path: "/manage/offerings", element: <ProtectedRoute permission="studio.manage_schedule"><OfferingsManage /></ProtectedRoute> },
  { path: "/manage/financials", element: <ProtectedRoute permission="studio.manage_settings"><FinancialsManage /></ProtectedRoute> },
  { path: "/manage/reports", element: <ProtectedRoute permission="studio.manage_schedule"><ReportsManage /></ProtectedRoute> },
  { path: "/manage/import", element: <ProtectedRoute permission="studio.manage_settings"><ImportManage /></ProtectedRoute> },
  { path: "/manage/settings", element: <ProtectedRoute permission="studio.manage_settings"><SettingsManage /></ProtectedRoute> },
  { path: "/manage/onboarding", element: <ProtectedRoute permission="studio.manage_settings"><OnboardingManage /></ProtectedRoute> },
  { path: "/manage/members/:id", element: <ProtectedRoute permission="studio.manage_schedule"><MemberDetailManage /></ProtectedRoute> },
  { path: "/manage/promo-codes", element: <ProtectedRoute permission="studio.manage_settings"><PromoCodesManage /></ProtectedRoute> },
  { path: "/manage/events", element: <ProtectedRoute permission="studio.manage_schedule"><EventsManage /></ProtectedRoute> },
  { path: "/manage/landing-pages", element: <ProtectedRoute permission="studio.manage_settings"><LandingPagesManage /></ProtectedRoute> },
  { path: "/manage/analytics", element: <ProtectedRoute permission="studio.manage_schedule"><AnalyticsHubManage /></ProtectedRoute> },
  { path: "/manage/analytics/members", element: <ProtectedRoute permission="studio.manage_schedule"><MemberAnalyticsManage /></ProtectedRoute> },
  { path: "/manage/analytics/sales", element: <ProtectedRoute permission="studio.manage_settings"><SalesAnalyticsManage /></ProtectedRoute> },
  { path: "/manage/analytics/financials", element: <ProtectedRoute permission="studio.manage_settings"><FinancialAnalyticsManage /></ProtectedRoute> },
  { path: "/manage/analytics/site", element: <ProtectedRoute permission="studio.manage_schedule"><SiteAnalyticsManage /></ProtectedRoute> },
  { path: "/manage/connectors", element: <ProtectedRoute permission="studio.manage_settings"><DataConnectorsManage /></ProtectedRoute> },
  { path: "/manage/products", element: <ProtectedRoute permission="studio.manage_schedule"><ProductsManage /></ProtectedRoute> },
  { path: "/manage/inventory", element: <ProtectedRoute permission="studio.manage_schedule"><InventoryManage /></ProtectedRoute> },
  { path: "/manage/purchase-orders", element: <ProtectedRoute permission="studio.manage_settings"><PurchaseOrdersManage /></ProtectedRoute> },
  { path: "/manage/notification-settings", element: <ProtectedRoute permission="studio.manage_settings"><NotificationSettingsManage /></ProtectedRoute> },
  { path: "/manage/sms-inbox", element: <ProtectedRoute permission="studio.view_inbox"><SmsInboxManage /></ProtectedRoute> },
  { path: "/manage/utm-builder", element: <ProtectedRoute permission="studio.manage_settings"><UtmBuilderManage /></ProtectedRoute> },
  { path: "/manage/campaigns", element: <ProtectedRoute permission="studio.manage_settings"><CampaignsManage /></ProtectedRoute> },
  { path: "/manage/tasks", element: <ProtectedRoute permission="studio.manage_schedule"><TasksManage /></ProtectedRoute> },
  { path: "/manage/on-demand", element: <ProtectedRoute permission="studio.manage_schedule"><OnDemandManage /></ProtectedRoute> },
  { path: "/manage/feature-settings", element: <ProtectedRoute permission="studio.manage_settings"><FeatureSettingsManage /></ProtectedRoute> },
  { path: "/manage/audit-logs", element: <ProtectedRoute permission="studio.manage_settings"><AuditLogsManage /></ProtectedRoute> },
  { path: "/manage/data-dictionary", element: <ProtectedRoute permission="studio.manage_schedule"><DataDictionaryManage /></ProtectedRoute> },
  { path: "/manage/definitions", element: <ProtectedRoute permission="studio.manage_schedule"><DefinitionsManage /></ProtectedRoute> },
  { path: "/manage/embed", element: <ProtectedRoute permission="studio.manage_settings"><EmbedSettingsManage /></ProtectedRoute> },

  /* ---- Instructor portal routes (/teach) ---- */
  { path: "/teach", element: <ProtectedRoute permission="studio.teach"><TeachDashboard /></ProtectedRoute> },
  { path: "/teach/schedule", element: <ProtectedRoute permission="studio.teach"><TeachSchedule /></ProtectedRoute> },
  { path: "/teach/availability", element: <ProtectedRoute permission="studio.teach"><TeachAvailability /></ProtectedRoute> },
  { path: "/teach/subs", element: <ProtectedRoute permission="studio.teach"><TeachSubs /></ProtectedRoute> },
  { path: "/teach/earnings", element: <ProtectedRoute permission="studio.teach"><TeachEarnings /></ProtectedRoute> },
  { path: "/teach/profile", element: <ProtectedRoute permission="studio.teach"><TeachProfile /></ProtectedRoute> },

  /* ---- Staff (front desk) routes ---- */
  { path: "/staff/checkin", element: <ProtectedRoute permission="studio.checkin"><StaffCheckin /></ProtectedRoute> },
  { path: "/staff/waitlist", element: <ProtectedRoute permission="studio.manage_waitlist"><StaffWaitlist /></ProtectedRoute> },

  /* ---- Embeddable widget (chrome-less, public) ---- */
  { path: "/embed/schedule/:slug", element: <EmbedSchedule /> },
  { path: "/embed/event/:id", element: <EmbedEvent /> },

  /* ---- Kiosk mode ---- */
  { path: "/kiosk/:studioId", element: <Kiosk /> },

  /* ---- Catch-all ---- */
  { path: "*", element: <NotFound /> },
];

export default routes;
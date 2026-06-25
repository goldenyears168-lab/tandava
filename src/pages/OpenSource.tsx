/**
 * Open Source Landing Page
 *
 * Explains Tandava as an open-source project.
 * Directs visitors to GitHub, documentation, and demo.
 *
 * Target audience:
 * - Studio owners evaluating self-hosting
 * - Developers interested in contributing
 * - Companies considering integration
 */

import { Link } from "react-router-dom";

// ============================================================================
// ICONS
// ============================================================================

const LogoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
    <path
      d="M16 8C16 8 12 12 12 16C12 20 16 24 16 24C16 24 20 20 20 16C20 12 16 8 16 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="16" r="2" fill="currentColor" />
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CodeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
    />
  </svg>
);

const ServerIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z"
    />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
    />
  </svg>
);

const BookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
    />
  </svg>
);

// ============================================================================
// FEATURE CARDS
// ============================================================================

const features = [
  {
    icon: ServerIcon,
    title: "自行託管資料",
    description:
      "在自有基礎設施上運行 Tandava。會員資料由您掌控，無供應商鎖定。",
  },
  {
    icon: CodeIcon,
    title: "完全可客製",
    description:
      "修改原始碼以符合您的需求。新增功能、調整流程、整合自有工具。",
  },
  {
    icon: ShieldIcon,
    title: "無訂閱費用",
    description:
      "永久免費使用，僅支付主機費用。擴展規模無需按會員計費。",
  },
  {
    icon: HeartIcon,
    title: "社群驅動",
    description:
      "由工作室業者為工作室業者打造。貢獻功能或受益於他人分享。",
  },
];

// ============================================================================
// WHAT'S INCLUDED
// ============================================================================

const includedFeatures = [
  "課程表管理",
  "課程預約",
  "學員名單",
  "老師管理",
  "會員與套票",
  "報到系統",
  "分析儀表板",
  "多場館支援",
  "活動與工作坊",
  "老師薪資追蹤",
  "自助報到模式",
  "響應式設計",
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function OpenSource() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <a
        href="#opensource-main"
        className="sr-only absolute left-4 top-4 z-[70] rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-md focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
      >
        跳至主要內容
      </a>

      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
          >
            <LogoIcon className="h-8 w-8 text-slate-900" />
            <span className="text-xl font-semibold text-slate-900">
              Tandava
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/demo"
              className="inline-flex min-h-10 items-center rounded-md px-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
            >
              體驗示範
            </Link>
            <a
              href="https://github.com/TaylorONeal/tandava"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main id="opensource-main">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              開源
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-6">
              工作室管理軟體
              <br />
              <span className="text-slate-500">真正屬於您</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Tandava 是專為瑜伽、皮拉提斯與運動工作室設計的免費開源平台。自行部署、自由客製，不再支付按會員人數計費。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
              >
                體驗示範
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/TaylorONeal/tandava"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
              >
                <GitHubIcon className="h-5 w-5" />
                在 GitHub 上查看
              </a>
            </div>
          </div>
        </section>

        {/* Demo Notice */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
            <p className="mx-auto max-w-3xl text-amber-800">
              <strong>示範模式：</strong>本示範站參考 <a href="https://www.1314mm941.com.tw/" target="_blank" rel="noopener noreferrer" className="underline">森浴光mm941 官網</a> 文案與服務項目，使用模擬資料運行，不會處理真實預約或付款。
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900">
              團隊為何選擇 Tandava
            </h2>
            <p className="mt-2 text-slate-600">
              以掌控力、透明度與長期彈性為工作室營運而建。
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <feature.icon className="h-8 w-8 text-slate-700 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Included */}
        <section className="bg-slate-50 border-y border-slate-200 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
              營運工作室所需的一切
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {includedFeatures.map((feature) => (
                <div
                  key={feature}
                  className="flex min-h-11 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2"
                >
                  <CheckIcon className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Status */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              目前狀態
            </h2>
            <div className="space-y-5">
              <p className="text-slate-600">
                Tandava 正在積極開發中。示範展示 UI 與工作流程，部分功能在正式使用前需整合後端：
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-slate-900 mb-3">
                  示範中可用
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    完整的課程表、預約、名單管理 UI
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    角色權限（館主、櫃檯、老師、會員）
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    含圖表的分析儀表板
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    多場館支援
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    自助報到模式
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-3">
                  需整合後端
                </h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                    付款處理（Stripe Connect 已就緒，尚未連線）
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                    真實身份驗證（目前為模擬使用者）
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                    電子郵件／簡訊通知
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                    資料持久化（Supabase 架構已就緒）
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* For Developers */}
        <section className="bg-slate-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <CodeIcon className="h-12 w-12 mx-auto mb-6 text-slate-400" />
              <h2 className="text-2xl font-bold mb-4">為開發者打造</h2>
              <p className="text-slate-400 mb-8">
                現代技術棧、清晰架構、完整文件。
              </p>
              <div className="mb-8 grid gap-4 text-left sm:grid-cols-3">
                <div className="rounded-lg border border-slate-700 bg-slate-800/70 p-4">
                  <h4 className="font-semibold mb-2">技術棧</h4>
                  <p className="text-sm text-slate-400">
                    React 18 + TypeScript + Vite
                    <br />
                    Tailwind CSS + shadcn/ui
                    <br />
                    Supabase（Postgres + Auth）
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800/70 p-4">
                  <h4 className="font-semibold mb-2">文件</h4>
                  <p className="text-sm text-slate-400">
                    含圖表的領域模型
                    <br />
                    API 架構
                    <br />
                    設計系統與設計代幣
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800/70 p-4">
                  <h4 className="font-semibold mb-2">快速開始</h4>
                  <p className="text-sm text-slate-400">
                    複製、npm install
                    <br />
                    設定 VITE_DEMO_MODE=true
                    <br />
                    npm run dev
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/TaylorONeal/tandava"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <GitHubIcon className="h-5 w-5" />
                在 GitHub 上開始使用
              </a>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            Tandava 適合誰？
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <ServerIcon className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                自行託管工作室
              </h3>
              <p className="text-sm text-slate-600">
                擁有您的資料。避免每月 SaaS 費用。自由客製一切。
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <CodeIcon className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">開發者</h3>
              <p className="text-sm text-slate-600">
                貢獻開源專案。學習現代 React 模式。建立整合方案。
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <HeartIcon className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">社群</h3>
              <p className="text-sm text-slate-600">
                工作室互助工作室。分享改進。共同建設。
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              準備探索了嗎？
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              體驗示範了解 Tandava 的運作方式，或深入 GitHub 查看原始碼。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                體驗示範
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/TaylorONeal/tandava/blob/main/docs/INDEX.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-600 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <BookIcon className="h-5 w-5" />
                閱讀文件
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <LogoIcon className="h-6 w-6 text-slate-400" />
              <span className="text-slate-500 text-sm">
                Tandava 是開源軟體
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a
                href="https://github.com/TaylorONeal/tandava"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
              >
                GitHub
              </a>
              <a
                href="https://github.com/TaylorONeal/tandava/blob/main/docs/INDEX.md"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
              >
                文件
              </a>
              <a
                href="https://github.com/TaylorONeal/tandava/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2"
              >
                貢獻
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

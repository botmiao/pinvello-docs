/**
 * Single-URL bilingual engine for Pinvello static site (zh / en).
 * - Resolves ?lang=zh|en -> localStorage['pinvello-lang'] -> navigator.languages
 * - Keeps full static #zh and #en content in privacy.html & support.html for zero-JS crawlers.
 */

const STORAGE_KEY = 'pinvello-lang';

export const DICT = {
  zh: {
    'nav.overview': '功能与体验',
    'nav.privacy': '隐私政策',
    'nav.support': '支持中心',
    'nav.store': 'Microsoft Store 获取',

    'hero.eyebrow': 'Windows 11 壁纸层拟物便笺 · v0.2.0',
    'hero.title.a': '把重要的小事，',
    'hero.title.b': '真正贴在桌面上',
    'hero.lead':
      '驻留于桌面壁纸之上、图标之下——不是悬浮在窗口顶层的遮挡物。无惧 Win+D 显示桌面与资源管理器重启，自带 64 位随机三维翘角纸感与物理拟真销毁动效。',
    'hero.cta.primary': '从 Microsoft Store 获取',
    'hero.cta.app': '直唤 Windows 商店应用',
    'hero.cta.try': '先在下方试玩桌面沙盒',
    'hero.badge.win11': 'Windows 11 原生单进程',
    'hero.badge.offline': '100% 离线优先',
    'hero.badge.telemetry': '零遥测 / 无账号',
    'hero.badge.i18n': '10 语种自适应',

    'sandbox.title': '互动桌面沙盒 · 动手试试手感',
    'sandbox.hint': '可直接拖拽便笺、勾选待办，或点右上角演示 Win+D',
    'sandbox.theme': '主题色卡',
    'sandbox.paper': '纸张款式',
    'sandbox.fastener': '固定件',
    'sandbox.wind.open': '打开前景窗口',
    'sandbox.wind.hide': '模拟 Win+D',
    'sandbox.reset': '重置排版',
    'sandbox.status.ready': '提示：拖拽任意便笺松手，会自动生成新种子重塑三维翘角轮廓',
    'sandbox.status.dragged': '松手已重塑纸张立体轮廓，且始终贴在桌面图标下方',
    'sandbox.status.todo': '已切换待办状态并同步更新 @time 时间胶囊',
    'sandbox.status.winOpen': '前景应用窗口已打开：再点「模拟 Win+D」看便笺如何稳稳留在桌面',
    'sandbox.status.winD': '已触发 Win+D：前景窗口最小化，壁纸层便笺纹丝不动！',
    'sandbox.icon.pc': '此电脑',
    'sandbox.icon.bin': '回收站',
    'sandbox.mock.title': '正在工作 — 浏览器 / 文档窗口',
    'sandbox.mock.body': '普通窗口在顶层工作；按下 Win+D 最小化所有窗口后，Pinvello 依然静静贴在壁纸上。',

    'showcase.eyebrow': 'REAL WINDOWS 11 CAPTURE',
    'showcase.title': '不是网页概念图，而是 Windows 11 原生 Direct2D 渲染实景',
    'showcase.desc':
      '基于 Rust 与 DirectComposition 预乘 Alpha 渲染，边缘柔和立体，支持 PerMonitorV2 多屏高分屏。点击图片可放大查看细节。',
    'showcase.tab.desktop': '桌面壁纸层实景',
    'showcase.tab.editor': '原位编辑与时间胶囊',
    'showcase.tab.prefs': '响应式偏好设置',
    'showcase.cap.desktop': '5 种纸张款式、7 种固定件与柔和景深阴影直接融合在 Windows 11 桌面壁纸层。',
    'showcase.cap.editor': '单击纸张直接原位编辑，支持中文输入法、@today/@明天 语义化时间胶囊与右上角一键删除。',
    'showcase.cap.prefs': '支持实时切换 10 种语言、6 款开源手绘体平铺预览、主题色卡与删除特效即时试玩。',
    'showcase.zoom': '点击图片放大细节',

    'fx.eyebrow': 'TACTILE PHYSICS & FOLEY',
    'fx.title': '删掉一张完成的小事，也要很有仪式感',
    'fx.desc':
      '搭载 6 种物理删除动效与 44.1kHz 程序化拟真音效（撕胶带、揉皱纸球、投掷入桶、燃烧声、碎纸切条）。偏好设置里随时免费试玩，配合 10 条撤销栈秒删秒回。',
    'fx.stage.title': '物理删除特效交互试验台',
    'fx.duration': '动画时长',
    'fx.replay': '播放效果',
    'fx.undo': '撤销恢复',
    'fx.note.title': '周五发版清单',
    'fx.note.line1': '✓ 核对 10 国语言文案',
    'fx.note.line2': '□ 导出商店预览素材',
    'fx.note.line3': '□ 上传 MSIX 审核包',
    'fx.status.idle': '选择任意特效，点击「播放效果」观察物理曲线',
    'fx.status.playing': '正在播放：{name}（{ms} ms）',
    'fx.status.done': '已移入 10 条内存撤销栈 — 点击「撤销恢复」或等待自动弹回',
    'fx.video.title': 'Windows 11 真机演示预告片（含实机音效）',
    'fx.video.note': '1280×720 网页优化版 · 点击播放按需加载，不占用首屏流量',

    'craft.eyebrow': 'CRAFTSMANSHIP & EXTENSIONS',
    'craft.title': '温润手绘字形，与面向创作者的本地扩展体系',
    'craft.fonts.title': '6 款 SIL OFL-1.1 内置手绘体 + 全部系统字体',
    'craft.fonts.desc': '开箱即用霞鹜文楷与全部本机系统字体；Pro 解锁全部 6 款精选多语种设计字体，或直接向 fonts/ 目录放入自定义 .ttf / .otf。',
    'craft.langs.title': '10 种界面语言即时切换，无需重启',
    'craft.langs.desc': '自动识别 Windows 系统语言初始化，也支持随时在偏好设置一键切换，同步更新菜单、字体检索与 @today/@明天 时间关键词。',
    'craft.doodles.title': '10 款线性角落插画 + doodles/*.svg 关键词自动匹配',
    'craft.doodles.desc': '点击下方演示词，模拟自定义文件 coffee-咖啡-拿铁.svg 如何随正文内容自动显现：',
    'craft.doodles.match': '当前匹配图标：',
    'craft.themes.title': 'themes/*.json 自定义色卡与 %LOCALAPPDATA% 扩展目录',
    'craft.themes.desc': '只需一个 10 行的 UTF-8 JSON 文件，即可为 5 个便笺色槽定义专属纸张与胶带透明色。',

    'pricing.eyebrow': 'TRANSPARENT PRICING',
    'pricing.title': '免费版开箱即用，Pinvello Pro 一次性终身买断',
    'pricing.desc': '没有订阅制焦虑，没有广告与会员弹窗。免费版即可满足轻量桌面便笺日常；需要无限贴纸与全套手作纸感时，一次买断永久解锁。',
    'pricing.free.badge': 'FREE CORE',
    'pricing.free.title': 'Pinvello 免费核心版',
    'pricing.free.price': '免费',
    'pricing.free.sub': '开箱可用 · 绝不限制既有便笺的阅读与编辑',
    'pricing.pro.badge': 'ONE-TIME LIFETIME · 无订阅',
    'pricing.pro.title': 'Pinvello Pro',
    'pricing.pro.price': '一次买断',
    'pricing.pro.sub': '通过 Microsoft Store 内购解锁 · 绑定微软账号多机恢复',
    'pricing.pro.cta': '前往 Microsoft Store 了解与获取',
    'pricing.free.cta': '直接免费下载体验',

    'trust.title': '隐私是第一原则，而不是附加条款',
    'trust.desc':
      '你的每一句草稿、待办和坐标都只保存在本地 %LOCALAPPDATA%\\Pinvello\\。没有账号系统，没有后台埋点，底层钩子仅在内存即时判定桌面点击。',
    'trust.privacy': '阅读完整双语隐私政策',
    'trust.support': '查看快捷键与常见问题',

    'footer.tagline': 'Windows 11 桌面壁纸层拟物便笺 · 开发者 iori · 开源字体兼容闭源商业软件',
    'footer.home': '产品首页',
    'footer.privacy': '隐私政策',
    'footer.support': '支持中心',
    'footer.issues': 'GitHub 反馈',
    'footer.store': 'Microsoft Store',

    'doc.view.both': '双语对照',
    'doc.view.zh': '仅看中文',
    'doc.view.en': 'English Only',
    'privacy.back': '← 返回产品官网',
    'privacy.hero.title': '隐私政策与透明权限说明',
    'privacy.hero.sub': '生效日期：2026-11-24 · 开发者：iori · 微软商店应用 ID：9NRGMTLZ4JXN',
    'privacy.sum1.t': '100% 本地离线存储',
    'privacy.sum1.d': '所有便笺正文、位置、外观与扩展仅保存在 %LOCALAPPDATA%\\Pinvello\\，从不上传服务器。',
    'privacy.sum2.t': '零遥测 / 无账号',
    'privacy.sum2.d': '不要求注册账号，不集成任何第三方统计 SDK、广告 SDK 或行为埋点。',
    'privacy.sum3.t': 'Store 内购 + DPAPI',
    'privacy.sum3.d': '支付由微软商店托管；离线授权 license.bin 仅经当前 Windows 用户 CryptProtectData 加密缓存。',
    'privacy.sum4.t': 'runFullTrust 透明承诺',
    'privacy.sum4.d': 'WH_MOUSE_LL / WH_KEYBOARD_LL 仅本地即时判定点击、拖拽与 Win+D，绝不记录击键。',
    'privacy.toc.title': '目录导航',
    'privacy.toc.sum': '隐私摘要 4 原则',
    'privacy.toc.zh': '中文完整声明',
    'privacy.toc.en': 'English Policy',
    'privacy.toc.oss': '开源字体与第三方声明',

    'support.hero.title': '支持中心、快捷键与常见问题',
    'support.hero.sub': '快速上手桌面操作、恢复 Pinvello Pro 买断权益、备份本地数据或提交问题单',
    'support.card1.t': '下载与更新',
    'support.card1.d': '通过 Microsoft Store 获取 Windows 11 官方签名的最新版 Pinvello。',
    'support.card1.a': '打开商店页面 →',
    'support.card2.t': '恢复 Pro 购买',
    'support.card2.d': '重装系统或换新电脑后，在商店登录同账号并在「偏好设置」点恢复购买。',
    'support.card2.a': '查看详细步骤 ↓',
    'support.card3.t': '反馈问题与建议',
    'support.card3.d': '附带 %LOCALAPPDATA%\\Pinvello\\logs\\ 日志与系统版本，在 GitHub Issues 提交。',
    'support.card3.a': '前往 Issues 提问 →',
    'support.card4.t': '阅读隐私声明',
    'support.card4.d': '了解离线存储位置、DPAPI 离线授权缓存与桌面钩子工作方式。',
    'support.card4.a': '查看隐私政策 →',
  },
  en: {
    'nav.overview': 'Overview',
    'nav.privacy': 'Privacy',
    'nav.support': 'Support',
    'nav.store': 'Get on Microsoft Store',

    'hero.eyebrow': 'Windows 11 Wallpaper-Layer Sticky Notes · v0.2.0',
    'hero.title.a': 'Important little notes, ',
    'hero.title.b': 'pinned right onto your desktop',
    'hero.lead':
      'Lives directly above your wallpaper and behind desktop icons — never another floating window blocking your workspace. Survives Win+D and explorer.exe restarts with procedural 3D paper contours and tactile delete physics.',
    'hero.cta.primary': 'Get from Microsoft Store',
    'hero.cta.app': 'Open Store App',
    'hero.cta.try': 'Play with the Live Sandbox Below',
    'hero.badge.win11': 'Native Windows 11',
    'hero.badge.offline': '100% Offline-First',
    'hero.badge.telemetry': 'Zero Telemetry',
    'hero.badge.i18n': '10 UI Languages',

    'sandbox.title': 'Interactive Desktop Sandbox · Feel the Tactile Physics',
    'sandbox.hint': 'Drag notes, toggle todos, swap paper styles, or test Win+D',
    'sandbox.theme': 'Palette',
    'sandbox.paper': 'Paper',
    'sandbox.fastener': 'Fastener',
    'sandbox.wind.open': 'Open App Window',
    'sandbox.wind.hide': 'Simulate Win+D',
    'sandbox.reset': 'Reset Layout',
    'sandbox.status.ready': 'Tip: Drag any note and release — its 3D curled paper contour reshapes automatically',
    'sandbox.status.dragged': 'Released! Fresh 3D paper contour generated while staying beneath desktop icons',
    'sandbox.status.todo': 'Todo toggled and @time capsule updated in real time',
    'sandbox.status.winOpen': 'Foreground window opened — click "Simulate Win+D" to see wallpaper-layer resilience',
    'sandbox.status.winD': 'Win+D triggered: foreground app minimized, sticky notes stay pinned on your wallpaper!',
    'sandbox.icon.pc': 'This PC',
    'sandbox.icon.bin': 'Recycle Bin',
    'sandbox.mock.title': 'Active Workspace — Browser / Docs Window',
    'sandbox.mock.body': 'Regular apps float on top. When Win+D minimizes every window, Pinvello stays right on your desktop wallpaper.',

    'showcase.eyebrow': 'REAL WINDOWS 11 CAPTURE',
    'showcase.title': 'Not a mockup — native Direct2D & DirectComposition on Windows 11',
    'showcase.desc':
      'Built in Rust with premultiplied-alpha DirectComposition visuals and PerMonitorV2 multi-DPI support. Click any screenshot to inspect full details.',
    'showcase.tab.desktop': 'Desktop Wallpaper Layer',
    'showcase.tab.editor': 'In-Place Editor & @time',
    'showcase.tab.prefs': 'Reactive Preferences',
    'showcase.cap.desktop': '5 paper styles, 7 physical fasteners, and differential 3D cast shadows embedded directly into the Windows 11 desktop.',
    'showcase.cap.editor': 'Click any sheet to edit in place with full IME support, semantic @today/@tomorrow due pills, and a quick corner trash button.',
    'showcase.cap.prefs': 'Instant 10-language switching, 6 bundled SIL OFL fonts, theme swatches, and unrestricted live previews of Pro delete FX.',
    'showcase.zoom': 'Click image to zoom',

    'fx.eyebrow': 'TACTILE PHYSICS & FOLEY',
    'fx.title': 'Checking something off should feel satisfying too',
    'fx.desc':
      'Choose from 6 physics-driven deletion animations paired with synthesized 44.1kHz stereo Foley audio — plus a 10-slot undo stack to bring back any note in one click.',
    'fx.stage.title': 'Delete Physics Interactive Stage',
    'fx.duration': 'Duration',
    'fx.replay': 'Play Effect',
    'fx.undo': 'Undo Restore',
    'fx.note.title': 'Friday Release',
    'fx.note.line1': '✓ Verify 10-language UI',
    'fx.note.line2': '□ Export Store showcase',
    'fx.note.line3': '□ Submit MSIX package',
    'fx.status.idle': 'Pick any effect and click "Play Effect" to inspect the physics curve',
    'fx.status.playing': 'Playing: {name} ({ms} ms)',
    'fx.status.done': 'Saved to 10-slot undo stack — click "Undo Restore" or wait for auto-bounce',
    'fx.video.title': 'Windows 11 Real-Device Trailer (with Foley Audio)',
    'fx.video.note': '1280×720 web-optimized · Loads on demand when you press Play',

    'craft.eyebrow': 'CRAFTSMANSHIP & EXTENSIONS',
    'craft.title': 'Curated handwritten typography & open local extensions',
    'craft.fonts.title': '6 Bundled SIL OFL-1.1 Fonts + All Windows System Fonts',
    'craft.fonts.desc': 'Free tier includes LXGW WenKai and all installed system fonts; Pro unlocks all 6 multi-script curated fonts plus custom fonts/ .ttf/.otf loading.',
    'craft.langs.title': '10 UI Languages with Instant Switching',
    'craft.langs.desc': 'Detects your Windows UI language automatically and switches menus, font sorting, and @today/@tomorrow due parsing live without restarting.',
    'craft.doodles.title': '10 Built-in Line Doodles + doodles/*.svg Keyword Matching',
    'craft.doodles.desc': 'Click a prompt below to see how custom filename keywords like coffee-咖啡-拿铁.svg match note text automatically:',
    'craft.doodles.match': 'Matched doodle:',
    'craft.themes.title': 'themes/*.json Custom Palettes & Local Extensions',
    'craft.themes.desc': 'Drop a 10-line UTF-8 JSON file into %LOCALAPPDATA%\\Pinvello\\themes\\ to define custom paper and tape RGBA pairs.',

    'pricing.eyebrow': 'TRANSPARENT PRICING',
    'pricing.title': 'Generous Free Core, One-Time Lifetime Pinvello Pro',
    'pricing.desc': 'No subscriptions, no nagging ads, no cloud lock-in. Start free on your desktop and unlock unlimited notes & full stationery craft forever with one Store purchase.',
    'pricing.free.badge': 'FREE CORE',
    'pricing.free.title': 'Pinvello Free',
    'pricing.free.price': '$0',
    'pricing.free.sub': 'Ready out of the box · Existing stores >3 notes always stay editable',
    'pricing.pro.badge': 'ONE-TIME LIFETIME · NO SUBSCRIPTION',
    'pricing.pro.title': 'Pinvello Pro',
    'pricing.pro.price': 'One-Time Unlock',
    'pricing.pro.sub': 'Managed via Microsoft Store IAP · Restore anytime across your PCs',
    'pricing.pro.cta': 'View on Microsoft Store',
    'pricing.free.cta': 'Download Free Version',

    'trust.title': 'Privacy is the architecture, not a footnote',
    'trust.desc':
      'Every note, coordinate, and extension stays inside %LOCALAPPDATA%\\Pinvello\\. No accounts, no analytics SDKs, and input hooks evaluate clicks strictly in transient local memory.',
    'trust.privacy': 'Read Full Privacy Policy',
    'trust.support': 'Shortcuts & FAQ',

    'footer.tagline': 'Windows 11 Wallpaper-Layer Sticky Notes · Developer: iori · Proprietary app with SIL OFL bundled fonts',
    'footer.home': 'Overview',
    'footer.privacy': 'Privacy Policy',
    'footer.support': 'Support & FAQ',
    'footer.issues': 'GitHub Issues',
    'footer.store': 'Microsoft Store',

    'doc.view.both': 'Bilingual',
    'doc.view.zh': '中文',
    'doc.view.en': 'English',
    'privacy.back': '← Back to Overview',
    'privacy.hero.title': 'Privacy Policy & Transparency Disclosures',
    'privacy.hero.sub': 'Effective Date: 2026-11-24 · Developer: iori · Microsoft Store ID: 9NRGMTLZ4JXN',
    'privacy.sum1.t': '100% Local Offline Storage',
    'privacy.sum1.d': 'Notes, positions, settings, and extensions live strictly inside %LOCALAPPDATA%\\Pinvello\\ on your PC.',
    'privacy.sum2.t': 'Zero Telemetry & No Account',
    'privacy.sum2.d': 'No login required, and zero third-party analytics, advertising, or behavioral tracking SDKs.',
    'privacy.sum3.t': 'Microsoft Store IAP + DPAPI',
    'privacy.sum3.d': 'Checkout is handled by Windows.Services.Store; offline cache license.bin is protected with Windows DPAPI.',
    'privacy.sum4.t': 'runFullTrust Hook Commitment',
    'privacy.sum4.d': 'WH_MOUSE_LL / WH_KEYBOARD_LL only evaluate desktop clicks, drags, and Win+D in RAM — never keylogging.',
    'privacy.toc.title': 'Contents',
    'privacy.toc.sum': '4 Privacy Commitments',
    'privacy.toc.zh': '中文完整声明',
    'privacy.toc.en': 'English Policy',
    'privacy.toc.oss': 'Third-Party Fonts & Notices',

    'support.hero.title': 'Support Center, Shortcuts & FAQ',
    'support.hero.sub': 'Master desktop shortcuts, restore Pinvello Pro purchases, back up offline notes, or report an issue',
    'support.card1.t': 'Download & Updates',
    'support.card1.d': 'Install the latest signed Windows 11 release directly from Microsoft Store.',
    'support.card1.a': 'Open Store Listing →',
    'support.card2.t': 'Restore Pro Purchase',
    'support.card2.d': 'Sign in with the same Microsoft account in Store, then click Restore Purchase in Preferences.',
    'support.card2.a': 'Read Steps ↓',
    'support.card3.t': 'Report Bug or Idea',
    'support.card3.d': 'Open a ticket on GitHub Issues and attach logs from %LOCALAPPDATA%\\Pinvello\\logs\\.',
    'support.card3.a': 'Open GitHub Issues →',
    'support.card4.t': 'Privacy Architecture',
    'support.card4.d': 'Inspect exact local paths, DPAPI license cache details, and input hook boundaries.',
    'support.card4.a': 'View Privacy Policy →',
  },
};

export function detectLang() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang === 'zh' || urlLang === 'en') return urlLang;

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'zh' || saved === 'en') return saved;

  const navLangs = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || 'zh-CN'];
  return navLangs.some((l) => String(l).toLowerCase().startsWith('zh')) ? 'zh' : 'en';
}

let currentLang = 'zh';

export function getLang() {
  return currentLang;
}

export function t(key, vars = {}) {
  const table = DICT[currentLang] || DICT.zh;
  let str = table[key] ?? DICT.zh[key] ?? key;
  for (const [k, v] of Object.entries(vars)) {
    str = str.replaceAll(`{${k}}`, String(v));
  }
  return str;
}

export function applyLanguage(lang, { persist = true } = {}) {
  currentLang = lang === 'en' ? 'en' : 'zh';
  document.documentElement.lang = currentLang === 'zh' ? 'zh-Hans' : 'en';
  if (persist) {
    try {
      window.localStorage.setItem(STORAGE_KEY, currentLang);
    } catch {
      // ignore private browsing quota errors
    }
  }

  const titleEl = document.querySelector('title[data-title-zh][data-title-en]');
  if (titleEl) {
    document.title = currentLang === 'zh' ? titleEl.dataset.titleZh : titleEl.dataset.titleEn;
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll('[data-zh][data-en]').forEach((el) => {
    el.textContent = currentLang === 'zh' ? el.dataset.zh : el.dataset.en;
  });

  document.querySelectorAll('[data-src-zh][data-src-en]').forEach((el) => {
    const nextSrc = currentLang === 'zh' ? el.dataset.srcZh : el.dataset.srcEn;
    if (el.tagName === 'VIDEO') {
      const nextPoster = currentLang === 'zh' ? el.dataset.posterZh : el.dataset.posterEn;
      if (nextPoster) el.setAttribute('poster', nextPoster);
      if (el.getAttribute('src') !== nextSrc) {
        const wasPlaying = !el.paused && !el.ended;
        el.setAttribute('src', nextSrc);
        if (wasPlaying) {
          el.load();
          el.play().catch(() => {});
        }
      }
    } else if (el.getAttribute('src') !== nextSrc) {
      el.setAttribute('src', nextSrc);
    }
  });

  document.querySelectorAll('[data-alt-zh][data-alt-en]').forEach((el) => {
    el.setAttribute('alt', currentLang === 'zh' ? el.dataset.altZh : el.dataset.altEn);
  });

  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    const active = btn.getAttribute('data-lang-btn') === currentLang;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  window.dispatchEvent(new CustomEvent('pinvello:langchange', { detail: { lang: currentLang } }));
}

export function initI18n() {
  const initial = detectLang();
  applyLanguage(initial, { persist: false });

  document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-lang-btn');
      if (target === 'zh' || target === 'en') {
        applyLanguage(target, { persist: true });
      }
    });
  });

  // Mobile navigation toggle
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navPanel = document.getElementById('site-nav');
  if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => {
      const open = navPanel.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Document pages (privacy.html / support.html): 3-state view switcher with hash fallback
  const docRoot = document.querySelector('[data-doc-page]');
  if (docRoot) {
    const setDocView = (mode) => {
      const safe = ['both', 'zh', 'en'].includes(mode) ? mode : 'both';
      docRoot.setAttribute('data-doc-view', safe);
      document.querySelectorAll('[data-doc-view-btn]').forEach((b) => {
        const isOn = b.getAttribute('data-doc-view-btn') === safe;
        b.classList.toggle('is-active', isOn);
        b.setAttribute('aria-pressed', String(isOn));
      });
    };

    const resolveFromHash = () => {
      const h = (window.location.hash || '').toLowerCase();
      if (h.startsWith('#en')) return 'both';
      if (h.startsWith('#zh')) return 'both';
      return initial;
    };

    setDocView(resolveFromHash());

    document.querySelectorAll('[data-doc-view-btn]').forEach((b) => {
      b.addEventListener('click', () => {
        setDocView(b.getAttribute('data-doc-view-btn'));
      });
    });

    // Ensure clicking any #zh* or #en* TOC link reveals that section if hidden
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        const cur = docRoot.getAttribute('data-doc-view');
        if (href.startsWith('#en') && cur === 'zh') setDocView('both');
        if (href.startsWith('#zh') && cur === 'en') setDocView('both');
      });
    });

    window.addEventListener('pinvello:langchange', (ev) => {
      const cur = docRoot.getAttribute('data-doc-view');
      if (cur !== 'both') {
        setDocView(ev.detail.lang);
      }
    });
  }

  return currentLang;
}

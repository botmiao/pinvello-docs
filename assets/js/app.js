/**
 * Entry module for Pinvello landing page (index.html).
 */

import { initI18n, getLang, t } from './i18n.js';
import { initSandbox } from './sandbox.js';
import { initFxDemo } from './fx-demo.js';
import { DOODLES } from './art-svg.js';

const SHOWCASE_SLIDES = {
  desktop: {
    zh: './assets/img/shot-desktop-zh.webp',
    en: './assets/img/shot-desktop-en.webp',
    capKey: 'showcase.cap.desktop',
    altZh: 'Pinvello Windows 11 壁纸层桌面便笺实机截图',
    altEn: 'Pinvello Windows 11 wallpaper-layer sticky notes screenshot',
  },
  editor: {
    zh: './assets/img/shot-editor-zh.webp',
    en: './assets/img/shot-editor-en.webp',
    capKey: 'showcase.cap.editor',
    altZh: 'Pinvello 原位编辑模式与时间胶囊实机截图',
    altEn: 'Pinvello in-place editor and due capsule screenshot',
  },
  prefs: {
    zh: './assets/img/shot-preferences-zh.webp',
    en: './assets/img/shot-preferences-en.webp',
    capKey: 'showcase.cap.prefs',
    altZh: 'Pinvello 偏好设置窗口实机截图',
    altEn: 'Pinvello Preferences window screenshot',
  },
};

const DOODLE_META = [
  { id: 'leaf', zh: '日常', en: 'Daily' },
  { id: 'sparkles', zh: '重点', en: 'Focus' },
  { id: 'calendar', zh: '日程', en: 'Agenda' },
  { id: 'clock', zh: '时间', en: 'Time' },
  { id: 'chart', zh: '数据', en: 'Stats' },
  { id: 'doc', zh: '文档', en: 'Docs' },
  { id: 'users', zh: '团队', en: 'Team' },
  { id: 'mail', zh: '邮件', en: 'Mail' },
  { id: 'books', zh: '学习', en: 'Study' },
  { id: 'check', zh: '验收', en: 'Check' },
];

function initShowcase() {
  const tabs = document.querySelectorAll('[data-shot-tab]');
  const img = document.getElementById('showcase-img');
  const cap = document.getElementById('showcase-caption');
  const frame = document.getElementById('showcase-frame');
  const dialog = document.getElementById('shot-lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-caption');
  const lbClose = document.getElementById('lightbox-close');
  if (!img || !tabs.length) return;

  let activeTab = 'desktop';

  function renderSlide() {
    const lang = getLang();
    const spec = SHOWCASE_SLIDES[activeTab] || SHOWCASE_SLIDES.desktop;
    const src = lang === 'zh' ? spec.zh : spec.en;
    const alt = lang === 'zh' ? spec.altZh : spec.altEn;
    img.src = src;
    img.alt = alt;
    if (cap) cap.textContent = t(spec.capKey);
    tabs.forEach((btn) => {
      const on = btn.getAttribute('data-shot-tab') === activeTab;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', String(on));
    });
    if (dialog?.open && lbImg) {
      lbImg.src = src;
      lbImg.alt = alt;
      if (lbCap) lbCap.textContent = t(spec.capKey);
    }
  }

  tabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTab = btn.getAttribute('data-shot-tab') || 'desktop';
      renderSlide();
    });
  });

  frame?.addEventListener('click', () => {
    if (!dialog || !lbImg) return;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    if (lbCap && cap) lbCap.textContent = cap.textContent;
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    }
  });

  lbClose?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  window.addEventListener('pinvello:langchange', renderSlide);
  renderSlide();
}

function initDoodlesBento() {
  const strip = document.getElementById('bento-doodles');
  const matchEl = document.getElementById('doodle-match-result');
  const kwBtns = document.querySelectorAll('[data-doodle-demo]');
  if (!strip) return;

  let matchedId = 'calendar';
  let matchedFile = 'calendar';

  function render() {
    const lang = getLang();
    strip.innerHTML = '';
    DOODLE_META.forEach((d) => {
      const cell = document.createElement('div');
      cell.className = `doodle-cell ${d.id === matchedId ? 'is-matched' : ''}`;
      cell.innerHTML = `${DOODLES[d.id] || ''}<span>${d[lang]}</span>`;
      strip.appendChild(cell);
    });
    if (matchEl) {
      matchEl.textContent = matchedFile;
    }
  }

  kwBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      matchedId = btn.getAttribute('data-doodle-target') || 'leaf';
      matchedFile = btn.getAttribute('data-doodle-file') || matchedId;
      kwBtns.forEach((b) => b.classList.toggle('is-accent', b === btn));
      render();
    });
  });

  window.addEventListener('pinvello:langchange', render);
  render();
}

initI18n();
initSandbox();
initShowcase();
initFxDemo();
initDoodlesBento();

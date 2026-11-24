/**
 * Interactive Mini Windows 11 Desktop Sandbox for Hero section.
 * Demonstrates wallpaper-layer pinning, drag-and-recontour physics,
 * live todo checkboxes with @time capsules, 5 built-in theme palettes,
 * 5 paper styles, 7+ fasteners, and Win+D resilience.
 */

import {
  THEMES,
  PAPER_STYLES,
  FASTENER_KINDS,
  DOODLES,
  PAPER_SHADOW_BLEED,
  paperSheetSvg,
  fastenerSvg,
  titleUnderlineSvg,
} from './art-svg.js';
import { getLang, t } from './i18n.js';

const INITIAL_NOTES = [
  {
    id: 'n1',
    slot: 0,
    seed: 104729,
    style: 'curled',
    fastener: 'striped',
    doodle: 'sparkles',
    tilt: -2.2,
    posNorm: { x: 0.14, y: 0.08 },
    content: {
      zh: {
        title: '今日手账清单',
        items: [
          { type: 'todo', done: true, text: '晨间手冲黑咖啡', due: '今天 09:00', state: 'normal' },
          { type: 'todo', done: false, text: '整理桌面工作区', due: '今天 18:00', state: 'soon' },
          { type: 'todo', done: false, text: '设计稿收尾发版', due: '明天 10:30', state: 'normal' },
        ],
      },
      en: {
        title: "Today's Focus",
        items: [
          { type: 'todo', done: true, text: 'Pour morning coffee', due: 'Today 09:00', state: 'normal' },
          { type: 'todo', done: false, text: 'Polish workspace', due: 'Today 18:00', state: 'soon' },
          { type: 'todo', done: false, text: 'Ship store release', due: 'Tomorrow', state: 'normal' },
        ],
      },
    },
  },
  {
    id: 'n2',
    slot: 1,
    seed: 224737,
    style: 'perforated',
    fastener: 'pushpin',
    doodle: 'leaf',
    tilt: 1.6,
    posNorm: { x: 0.57, y: 0.06 },
    content: {
      zh: {
        title: '为什么是 Pinvello',
        items: [
          { type: 'line', text: '贴在壁纸之上、图标之下' },
          { type: 'line', text: 'Win+D 显示桌面稳稳停留' },
          { type: 'line', text: '拖动松手自动重塑翘角' },
        ],
      },
      en: {
        title: 'Wallpaper Layer',
        items: [
          { type: 'line', text: 'Behind desktop icons' },
          { type: 'line', text: 'Survives Win+D & restarts' },
          { type: 'line', text: 'Drag & release to re-curl' },
        ],
      },
    },
  },
  {
    id: 'n3',
    slot: 3,
    seed: 350377,
    style: 'torn',
    fastener: 'washi',
    doodle: 'calendar',
    tilt: -1.4,
    posNorm: { x: 0.34, y: 0.49 },
    content: {
      zh: {
        title: '周五发版安排',
        items: [
          { type: 'todo', done: true, text: '10 语种界面核对', due: null, state: 'normal' },
          { type: 'todo', done: false, text: '勾选试一试胶囊变色', due: '今天 20:00', state: 'soon' },
        ],
      },
      en: {
        title: 'Release Prep',
        items: [
          { type: 'todo', done: true, text: '10-language UI check', due: null, state: 'normal' },
          { type: 'todo', done: false, text: 'Click box to toggle', due: 'Today 20:00', state: 'soon' },
        ],
      },
    },
  },
];

export function initSandbox() {
  const stage = document.getElementById('sandbox-stage');
  const notesLayer = document.getElementById('sandbox-notes-layer');
  const statusEl = document.getElementById('sandbox-status');
  const themeSwatchesEl = document.getElementById('sandbox-theme-swatches');
  const paperSelect = document.getElementById('sandbox-paper-select');
  const fastenerSelect = document.getElementById('sandbox-fastener-select');
  const winDBtn = document.getElementById('sandbox-wind-btn');
  const taskbarShowDesktop = document.getElementById('sandbox-show-desktop');
  const mockWin = document.getElementById('sandbox-mock-window');
  const mockCloseBtn = document.getElementById('sandbox-mock-min');
  const resetBtn = document.getElementById('sandbox-reset-btn');

  if (!stage || !notesLayer) return;

  let themeId = 'classic';
  let activeNoteId = 'n1';
  let topZ = 10;
  let mockOpen = false;
  let seedTick = 9001;
  let lastStacked = null;

  let notes = cloneNotes();

  function cloneNotes() {
    return INITIAL_NOTES.map((n, idx) => ({
      ...n,
      z: idx + 1,
      x: null,
      y: null,
      moved: false,
      content: {
        zh: { ...n.content.zh, items: n.content.zh.items.map((it) => ({ ...it })) },
        en: { ...n.content.en, items: n.content.en.items.map((it) => ({ ...it })) },
      },
    }));
  }

  function setStatus(key) {
    if (statusEl) {
      statusEl.textContent = t(key);
    }
  }

  function getCardDimensions() {
    const w = stage.clientWidth || 560;
    if (w < 460) {
      return { cardW: Math.min(226, Math.max(180, w - 92)), cardH: 138, stacked: true };
    }
    if (w < 580) {
      return { cardW: 196, cardH: 162, stacked: false };
    }
    return { cardW: 214, cardH: 170, stacked: false };
  }

  function ensurePositions() {
    const sw = stage.clientWidth || 560;
    const sh = stage.clientHeight || 420;
    const { cardW, cardH, stacked } = getCardDimensions();
    const maxX = Math.max(12, sw - cardW - 12);
    const maxY = Math.max(14, sh - cardH - 54);
    const modeChanged = lastStacked !== null && lastStacked !== stacked;
    lastStacked = stacked;

    notes.forEach((n, idx) => {
      if (n.x === null || n.y === null || (modeChanged && !n.moved)) {
        if (stacked) {
          const presets = [
            [Math.min(maxX, 74), 16],
            [18, 166],
            [Math.min(maxX, 62), Math.min(maxY, 314)],
          ];
          n.x = presets[idx][0];
          n.y = presets[idx][1];
        } else {
          n.x = Math.round(clamp(n.posNorm.x * sw, 14, maxX));
          n.y = Math.round(clamp(n.posNorm.y * sh, 14, maxY));
        }
      } else {
        n.x = Math.round(clamp(n.x, 8, maxX));
        n.y = Math.round(clamp(n.y, 8, maxY));
      }
    });
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function renderThemeSwatches() {
    if (!themeSwatchesEl) return;
    const lang = getLang();
    themeSwatchesEl.innerHTML = '';
    Object.values(THEMES).forEach((th) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `swatch-pill ${th.id === themeId ? 'is-active' : ''}`;
      btn.setAttribute('aria-pressed', String(th.id === themeId));
      btn.dataset.themeId = th.id;

      const dots = th.tints
        .map(([bg]) => `<span class="swatch-dot" style="background:${bg}"></span>`)
        .join('');
      const proTag = th.pro ? '<span class="mini-pro">PRO</span>' : '';
      btn.innerHTML = `<span class="swatch-dots">${dots}</span><span>${th.name[lang]}</span>${proTag}`;

      btn.addEventListener('click', () => {
        themeId = th.id;
        renderThemeSwatches();
        renderNotes();
      });
      themeSwatchesEl.appendChild(btn);
    });
  }

  function renderSelectOptions() {
    const lang = getLang();
    const active = notes.find((n) => n.id === activeNoteId) || notes[0];
    if (paperSelect) {
      paperSelect.innerHTML = PAPER_STYLES.map(
        (p) =>
          `<option value="${p.id}" ${active.style === p.id ? 'selected' : ''}>${p.label[lang]}${p.pro ? ' (Pro)' : ''}</option>`
      ).join('');
    }
    if (fastenerSelect) {
      fastenerSelect.innerHTML = FASTENER_KINDS.map(
        (f) =>
          `<option value="${f.id}" ${active.fastener === f.id ? 'selected' : ''}>${f.label[lang]}${f.pro ? ' (Pro)' : ''}</option>`
      ).join('');
    }
  }

  function syncMockWindowUI() {
    if (mockWin) {
      mockWin.classList.toggle('is-open', mockOpen);
      mockWin.setAttribute('aria-hidden', String(!mockOpen));
    }
    if (winDBtn) {
      winDBtn.textContent = mockOpen ? t('sandbox.wind.hide') : t('sandbox.wind.open');
      winDBtn.classList.toggle('is-accent', mockOpen);
    }
  }

  function toggleMockWindow() {
    mockOpen = !mockOpen;
    syncMockWindowUI();
    setStatus(mockOpen ? 'sandbox.status.winOpen' : 'sandbox.status.winD');
  }

  function renderNotes() {
    ensurePositions();
    const lang = getLang();
    const theme = THEMES[themeId] || THEMES.classic;
    const { cardW, cardH } = getCardDimensions();
    const bleed = PAPER_SHADOW_BLEED;

    notesLayer.innerHTML = '';

    notes.forEach((note) => {
      const [paperHex, tapeHex] = theme.tints[note.slot % theme.tints.length];
      const copy = note.content[lang];
      const isActive = note.id === activeNoteId;

      const wrap = document.createElement('div');
      wrap.className = `sb-note ${isActive ? 'is-selected' : ''}`;
      wrap.dataset.noteId = note.id;
      wrap.style.left = `${note.x}px`;
      wrap.style.top = `${note.y}px`;
      wrap.style.width = `${cardW}px`;
      wrap.style.height = `${cardH}px`;
      wrap.style.zIndex = String(note.z);
      wrap.style.transform = `rotate(${note.tilt}deg)`;

      // Paper SVG with outer bleed so shadows/curls never clip
      const paperWrap = document.createElement('div');
      paperWrap.className = 'sb-note-paper';
      paperWrap.style.left = `${-bleed}px`;
      paperWrap.style.top = `${-bleed}px`;
      paperWrap.style.width = `${cardW + bleed * 2}px`;
      paperWrap.style.height = `${cardH + bleed * 2}px`;
      paperWrap.innerHTML = paperSheetSvg({
        uid: `sb_${note.id}`,
        seed: note.seed,
        width: cardW,
        height: cardH,
        bgHex: paperHex,
        style: note.style,
      });
      wrap.appendChild(paperWrap);

      // Fastener
      if (note.fastener !== 'none') {
        const fastEl = document.createElement('div');
        fastEl.className = `sb-fastener sb-fastener--${note.fastener}`;
        fastEl.innerHTML = fastenerSvg({
          uid: `sbf_${note.id}`,
          kind: note.fastener,
          colorHex: tapeHex,
        });
        wrap.appendChild(fastEl);
      }

      // Corner Doodle
      if (DOODLES[note.doodle]) {
        const doodleEl = document.createElement('div');
        doodleEl.className = 'sb-doodle';
        doodleEl.innerHTML = DOODLES[note.doodle];
        wrap.appendChild(doodleEl);
      }

      // Content
      const bodyEl = document.createElement('div');
      bodyEl.className = 'sb-note-body';

      const titleRow = document.createElement('div');
      titleRow.className = 'sb-note-title-wrap';
      const titleEl = document.createElement('div');
      titleEl.className = 'sb-note-title';
      titleEl.textContent = copy.title;
      titleRow.appendChild(titleEl);

      const ul = document.createElement('div');
      ul.className = 'sb-title-underline';
      ul.innerHTML = titleUnderlineSvg(Math.min(cardW - 56, 128), 'rgba(74, 52, 34, 0.36)');
      titleRow.appendChild(ul);
      bodyEl.appendChild(titleRow);

      const listEl = document.createElement('div');
      listEl.className = 'sb-note-lines';

      copy.items.forEach((item, idx) => {
        if (item.type === 'todo') {
          const rowBtn = document.createElement('button');
          rowBtn.type = 'button';
          rowBtn.className = `sb-todo-row ${item.done ? 'is-done' : ''}`;
          rowBtn.setAttribute('aria-pressed', String(item.done));

          const box = document.createElement('span');
          box.className = 'sb-checkbox';
          box.textContent = item.done ? '✓' : '';

          const txt = document.createElement('span');
          txt.className = 'sb-todo-text';
          txt.textContent = item.text;

          rowBtn.append(box, txt);

          if (item.due) {
            const pill = document.createElement('span');
            const st = item.done ? 'done' : item.state;
            pill.className = `sb-due sb-due--${st}`;
            pill.textContent = item.due;
            rowBtn.appendChild(pill);
          }

          rowBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
          rowBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nextDone = !item.done;
            note.content.zh.items[idx].done = nextDone;
            note.content.en.items[idx].done = nextDone;
            activeNoteId = note.id;
            setStatus('sandbox.status.todo');
            renderNotes();
            renderSelectOptions();
          });

          listEl.appendChild(rowBtn);
        } else {
          const lineEl = document.createElement('div');
          lineEl.className = 'sb-text-line';
          lineEl.textContent = item.text;
          listEl.appendChild(lineEl);
        }
      });

      bodyEl.appendChild(listEl);
      wrap.appendChild(bodyEl);

      // Drag behavior with pointer capture + contour reshape on release
      let dragState = null;

      wrap.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        activeNoteId = note.id;
        topZ += 1;
        note.z = topZ;
        wrap.style.zIndex = String(note.z);

        document.querySelectorAll('.sb-note').forEach((el) => {
          el.classList.toggle('is-selected', el.dataset.noteId === activeNoteId);
        });
        renderSelectOptions();

        wrap.setPointerCapture(e.pointerId);
        wrap.classList.add('is-dragging');
        wrap.style.transform = 'rotate(0deg) scale(1.02)';

        dragState = {
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          origX: note.x,
          origY: note.y,
          moved: false,
        };
      });

      wrap.addEventListener('pointermove', (e) => {
        if (!dragState || e.pointerId !== dragState.pointerId) return;
        const dx = e.clientX - dragState.startX;
        const dy = e.clientY - dragState.startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          dragState.moved = true;
        }
        const sw = stage.clientWidth || 560;
        const sh = stage.clientHeight || 420;
        note.x = Math.round(clamp(dragState.origX + dx, 8, Math.max(8, sw - cardW - 8)));
        note.y = Math.round(clamp(dragState.origY + dy, 8, Math.max(8, sh - cardH - 48)));
        wrap.style.left = `${note.x}px`;
        wrap.style.top = `${note.y}px`;
      });

      const endDrag = (e) => {
        if (!dragState || e.pointerId !== dragState.pointerId) return;
        const didMove = dragState.moved;
        dragState = null;
        wrap.classList.remove('is-dragging');
        if (wrap.hasPointerCapture(e.pointerId)) {
          wrap.releasePointerCapture(e.pointerId);
        }
        if (didMove) {
          note.moved = true;
          seedTick += 7919;
          note.seed = (note.seed + seedTick) >>> 0;
          setStatus('sandbox.status.dragged');
          renderNotes();
        } else {
          wrap.style.transform = `rotate(${note.tilt}deg)`;
        }
      };

      wrap.addEventListener('pointerup', endDrag);
      wrap.addEventListener('pointercancel', endDrag);

      notesLayer.appendChild(wrap);
    });
  }

  paperSelect?.addEventListener('change', (e) => {
    const active = notes.find((n) => n.id === activeNoteId);
    if (active) {
      active.style = e.target.value;
      renderNotes();
    }
  });

  fastenerSelect?.addEventListener('change', (e) => {
    const active = notes.find((n) => n.id === activeNoteId);
    if (active) {
      active.fastener = e.target.value;
      renderNotes();
    }
  });

  winDBtn?.addEventListener('click', toggleMockWindow);
  taskbarShowDesktop?.addEventListener('click', () => {
    if (mockOpen) {
      toggleMockWindow();
    } else {
      mockOpen = true;
      syncMockWindowUI();
      setTimeout(() => {
        if (mockOpen) toggleMockWindow();
      }, 650);
    }
  });
  mockCloseBtn?.addEventListener('click', () => {
    if (mockOpen) toggleMockWindow();
  });

  resetBtn?.addEventListener('click', () => {
    notes = cloneNotes();
    themeId = 'classic';
    activeNoteId = 'n1';
    mockOpen = false;
    topZ = 10;
    syncMockWindowUI();
    renderThemeSwatches();
    renderSelectOptions();
    setStatus('sandbox.status.ready');
    renderNotes();
  });

  window.addEventListener('pinvello:langchange', () => {
    renderThemeSwatches();
    renderSelectOptions();
    syncMockWindowUI();
    renderNotes();
    setStatus('sandbox.status.ready');
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => renderNotes(), 120);
  });

  renderThemeSwatches();
  renderSelectOptions();
  syncMockWindowUI();
  setStatus('sandbox.status.ready');
  renderNotes();
}

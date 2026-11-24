/**
 * Interactive 6-effect Deletion Physics Playground on high-DPI Canvas 2D.
 * Mirrors the curves from crates/pinvello/src/delete_fx_math.rs:
 *   toss | peel | crumple | burn | shredder | fade
 */

import { getLang, t } from './i18n.js';

export const FX_DEFS = [
  { id: 'toss', pro: true, name: { zh: '丢进回收站', en: 'Recycle Bin Toss' } },
  { id: 'peel', pro: false, name: { zh: '撕下飘落', en: 'Peel & Flutter' } },
  { id: 'crumple', pro: true, name: { zh: '揉成纸团', en: 'Crumple Paper' } },
  { id: 'burn', pro: true, name: { zh: '燃尽化灰', en: 'Burn to Ash' } },
  { id: 'shredder', pro: true, name: { zh: '碎纸机', en: 'Shredder' } },
  { id: 'fade', pro: false, name: { zh: '柔和淡出', en: 'Soft Fade' } },
];

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (e0, e1, x) => {
  const u = clamp01((x - e0) / (e1 - e0));
  return u * u * (3 - 2 * u);
};
const easeOutQuad = (u) => 1 - (1 - clamp01(u)) ** 2;
const easeOutCubic = (u) => 1 - (1 - clamp01(u)) ** 3;
const easeInQuad = (u) => clamp01(u) ** 2;
const pulseBump = (x, c, hw) => {
  const d = Math.abs(x - c);
  if (d >= hw) return 0;
  return Math.sin(0.5 * Math.PI * (1 - d / hw)) ** 2;
};

function makePrng(seed) {
  let s = (seed ^ 0x9e3779b9) >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let r = Math.imul(s ^ (s >>> 15), 1 | s);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCardSnapshot(lang) {
  const W = 216;
  const H = 168;
  const off = document.createElement('canvas');
  off.width = W * 2;
  off.height = H * 2;
  const ctx = off.getContext('2d');
  ctx.scale(2, 2);

  // Drop shadow inside margin
  ctx.save();
  ctx.shadowColor = 'rgba(26, 20, 14, 0.22)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = '#F8E2A2';
  ctx.beginPath();
  ctx.moveTo(10, 8);
  ctx.lineTo(W - 10, 8);
  ctx.quadraticCurveTo(W - 8, H * 0.5, W - 10, H - 24);
  ctx.lineTo(W - 26, H - 10);
  ctx.lineTo(10, H - 10);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Sheet border & gradient
  const grad = ctx.createLinearGradient(10, 8, W - 10, H - 10);
  grad.addColorStop(0, '#FBE9B2');
  grad.addColorStop(1, '#F3D686');
  ctx.fillStyle = grad;
  ctx.strokeStyle = 'rgba(180, 144, 70, 0.35)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(10, 8);
  ctx.lineTo(W - 10, 8);
  ctx.lineTo(W - 10, H - 25);
  ctx.lineTo(W - 27, H - 10);
  ctx.lineTo(10, H - 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Curled corner flap
  ctx.fillStyle = '#E8C56C';
  ctx.beginPath();
  ctx.moveTo(W - 27, H - 10);
  ctx.quadraticCurveTo(W - 22, H - 22, W - 10, H - 25);
  ctx.lineTo(W - 27, H - 25);
  ctx.closePath();
  ctx.fill();

  // Note text
  ctx.fillStyle = '#332419';
  ctx.font = '600 15px "Segoe UI", "Microsoft YaHei UI", sans-serif';
  ctx.fillText(lang === 'zh' ? '周五发版清单' : 'Friday Release', 24, 38);

  // Brush underline
  ctx.strokeStyle = 'rgba(74, 52, 34, 0.36)';
  ctx.lineWidth = 1.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(24, 46);
  ctx.quadraticCurveTo(75, 43, 128, 46);
  ctx.stroke();

  const lines =
    lang === 'zh'
      ? [
          { done: true, text: '核对 10 语种文案' },
          { done: false, text: '导出商店高清视频' },
          { done: false, text: '提交 MSIX 安装包' },
        ]
      : [
          { done: true, text: 'Verify 10 languages' },
          { done: false, text: 'Export Store showcase' },
          { done: false, text: 'Submit MSIX build' },
        ];

  ctx.font = '12.5px "Segoe UI", "Microsoft YaHei UI", sans-serif';
  lines.forEach((ln, i) => {
    const y = 72 + i * 26;
    ctx.strokeStyle = ln.done ? '#7A6855' : '#5C432E';
    ctx.lineWidth = 1.3;
    ctx.strokeRect(24, y - 10, 11, 11);
    if (ln.done) {
      ctx.beginPath();
      ctx.moveTo(26.5, y - 4.5);
      ctx.lineTo(29, y - 2);
      ctx.lineTo(33, y - 8);
      ctx.stroke();
    }
    ctx.fillStyle = ln.done ? 'rgba(74, 52, 34, 0.48)' : '#4A3422';
    ctx.fillText(ln.text, 42, y);
  });

  // Due pill on line 2
  ctx.fillStyle = 'rgba(230, 126, 34, 0.18)';
  ctx.beginPath();
  ctx.roundRect(142, 85, 52, 16, 8);
  ctx.fill();
  ctx.fillStyle = '#D35400';
  ctx.font = '600 9.5px "Segoe UI", "Microsoft YaHei UI", sans-serif';
  ctx.fillText(lang === 'zh' ? '今天 20:00' : 'Today', 148, 96);

  return { canvas: off, w: W, h: H };
}

function drawRecycleBin(ctx, x, y, highlight = 0) {
  ctx.save();
  ctx.translate(x, y);
  if (highlight > 0) {
    ctx.beginPath();
    ctx.arc(0, 0, 26 + highlight * 14, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(92, 67, 46, ${(0.55 * (1 - highlight)).toFixed(2)})`;
    ctx.lineWidth = 2.2;
    ctx.stroke();
  }
  // Soft bin backdrop
  ctx.fillStyle = 'rgba(255, 253, 249, 0.85)';
  ctx.strokeStyle = 'rgba(211, 194, 168, 0.9)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, 0, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Bin icon
  ctx.strokeStyle = '#5C432E';
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(-9, -6);
  ctx.lineTo(9, -6);
  ctx.moveTo(-3.5, -6);
  ctx.lineTo(-3.5, -9.5);
  ctx.lineTo(3.5, -9.5);
  ctx.lineTo(3.5, -6);
  ctx.moveTo(-7, -6);
  ctx.lineTo(-5.5, 9);
  ctx.lineTo(5.5, 9);
  ctx.lineTo(7, -6);
  ctx.moveTo(-2.5, -2);
  ctx.lineTo(-2, 5.5);
  ctx.moveTo(2.5, -2);
  ctx.lineTo(2, 5.5);
  ctx.stroke();
  ctx.restore();
}

function drawFastenerTape(ctx, cx, cy, rotDeg, opacity) {
  if (opacity <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(cx, cy);
  ctx.rotate((rotDeg * Math.PI) / 180);
  ctx.fillStyle = 'rgba(229, 186, 88, 0.82)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 0.8;
  ctx.fillRect(-28, -8, 56, 16);
  ctx.strokeRect(-28, -8, 56, 16);
  ctx.restore();
}

function drawCrumpleBall(ctx, cx, cy, cardW, cardH, prog, rotExtraDeg = 0, scaleMul = 1, alpha = 1) {
  const N = 12;
  const rng = makePrng(4242);
  const baseR = Math.min(cardW, cardH) * 0.25;
  const shades = ['#FFE9AA', '#F8DF95', '#DEC170', '#BE9E4E'];

  const uMorph = clamp01(prog / 0.58);
  const p1 = pulseBump(prog, 0.2, 0.12);
  const p2 = pulseBump(prog, 0.44, 0.12);
  const sx = lerp(1, 0.92, smoothstep(0.32, 0.58, prog)) * (1 - 0.14 * p1 - 0.18 * p2) * scaleMul;
  const sy = lerp(1, 0.92, smoothstep(0.32, 0.58, prog)) * (1 - 0.09 * p1 - 0.13 * p2) * scaleMul;
  const rot = (7.5 * p1 - 9.0 * p2 + rotExtraDeg) * (Math.PI / 180);

  const verts = [];
  for (let i = 0; i < N; i++) {
    const baseTh = (i * Math.PI * 2) / N;
    const th = baseTh + (rng() - 0.5) * 0.28;
    const rad = baseR * (0.76 + rng() * 0.42);
    const tx = Math.cos(th) * rad;
    const ty = Math.sin(th) * rad;

    const c = Math.cos(baseTh);
    const s = Math.sin(baseTh);
    const d = Math.min(
      Math.abs(c) > 1e-5 ? (cardW * 0.46) / Math.abs(c) : 999,
      Math.abs(s) > 1e-5 ? (cardH * 0.44) / Math.abs(s) : 999
    );
    const rx = lerp(c * d, tx, smoothstep(0, 1, uMorph)) * sx;
    const ry = lerp(s * d, ty, smoothstep(0, 1, uMorph)) * sy;
    verts.push({
      x: cx + rx * Math.cos(rot) - ry * Math.sin(rot),
      y: cy + rx * Math.sin(rot) + ry * Math.cos(rot),
    });
  }

  const hub = { x: cx + 3 * Math.cos(rot) * scaleMul, y: cy - 2 * scaleMul };

  ctx.save();
  ctx.globalAlpha = alpha;
  for (let k = 0; k < N; k++) {
    const v0 = verts[k];
    const v1 = verts[(k + 1) % N];
    ctx.fillStyle = shades[(k * 3 + 1) % shades.length];
    ctx.beginPath();
    ctx.moveTo(hub.x, hub.y);
    ctx.lineTo(v0.x, v0.y);
    ctx.lineTo(v1.x, v1.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(92, 67, 46, 0.24)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
  ctx.restore();
}

export function initFxDemo() {
  const canvas = document.getElementById('fx-canvas');
  const pillsEl = document.getElementById('fx-pills');
  const durInput = document.getElementById('fx-duration-slider');
  const durLabel = document.getElementById('fx-duration-value');
  const replayBtn = document.getElementById('fx-replay-btn');
  const undoBtn = document.getElementById('fx-undo-btn');
  const statusEl = document.getElementById('fx-status');

  if (!canvas || !pillsEl) return;

  let currentFx = 'toss';
  let durationMs = Number(durInput?.value || 900);
  let snapshot = buildCardSnapshot(getLang());
  let rafId = null;
  let autoRestoreTimer = null;
  let state = 'idle'; // idle | playing | done

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  function renderPills() {
    const lang = getLang();
    pillsEl.innerHTML = '';
    FX_DEFS.forEach((fx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `fx-pill ${fx.id === currentFx ? 'is-active' : ''}`;
      btn.setAttribute('aria-pressed', String(fx.id === currentFx));
      btn.dataset.fxId = fx.id;
      btn.innerHTML = `<span>${fx.name[lang]}</span>${fx.pro ? '<span class="mini-pro">PRO</span>' : ''}`;
      btn.addEventListener('click', () => {
        currentFx = fx.id;
        renderPills();
        play();
      });
      pillsEl.appendChild(btn);
    });
  }

  function updateStatus(mode) {
    if (!statusEl) return;
    const lang = getLang();
    const def = FX_DEFS.find((f) => f.id === currentFx) || FX_DEFS[0];
    if (mode === 'playing') {
      statusEl.textContent = t('fx.status.playing', { name: def.name[lang], ms: durationMs });
    } else if (mode === 'done') {
      statusEl.textContent = t('fx.status.done');
    } else {
      statusEl.textContent = t('fx.status.idle');
    }
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(300, Math.round(rect.width || 440));
    const h = Math.max(240, Math.round(rect.height || 310));
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w, h };
  }

  function drawStageBackground(ctx, w, h, ripple = 0) {
    ctx.clearRect(0, 0, w, h);
    // Subtle desk dot grid
    ctx.fillStyle = 'rgba(92, 67, 46, 0.08)';
    for (let x = 20; x < w; x += 24) {
      for (let y = 20; y < h; y += 24) {
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (currentFx === 'toss') {
      drawRecycleBin(ctx, w - 48, h - 42, ripple);
    }
  }

  function drawIdle() {
    const { ctx, w, h } = resizeCanvas();
    drawStageBackground(ctx, w, h, 0);
    const cx = w * 0.5;
    const cy = h * 0.47;
    ctx.save();
    ctx.translate(cx - snapshot.w / 2, cy - snapshot.h / 2);
    ctx.drawImage(snapshot.canvas, 0, 0, snapshot.w, snapshot.h);
    ctx.restore();
    drawFastenerTape(ctx, cx, cy - snapshot.h / 2 + 10, -2, 1);
  }

  function drawFrame(prog) {
    const { ctx, w, h } = resizeCanvas();
    const cx = w * 0.5;
    const cy = h * 0.47;
    const cardLeft = cx - snapshot.w / 2;
    const cardTop = cy - snapshot.h / 2;

    if (currentFx === 'toss') {
      const binX = w - 48;
      const binY = h - 42;
      const ripple = prog >= 0.86 ? (prog - 0.86) / 0.14 : 0;
      drawStageBackground(ctx, w, h, ripple);

      if (prog <= 0.38) {
        const ct = (prog / 0.38) * 0.58;
        const cardMix = 1 - smoothstep(0.04, 0.58, ct);
        if (cardMix > 0.02) {
          ctx.save();
          ctx.globalAlpha = cardMix;
          ctx.translate(cx, cy);
          ctx.scale(lerp(1, 0.78, ct), lerp(1, 0.78, ct));
          ctx.drawImage(snapshot.canvas, -snapshot.w / 2, -snapshot.h / 2, snapshot.w, snapshot.h);
          ctx.restore();
        }
        drawCrumpleBall(ctx, cx, cy, snapshot.w, snapshot.h, ct, 0, 1, 1 - cardMix * 0.4);
      } else if (prog <= 0.86) {
        const u = (prog - 0.38) / 0.48;
        const uf = 0.55 * u + 0.45 * u * u;
        const inv = 1 - uf;
        const ctrlX = (cx + binX) * 0.5;
        const ctrlY = Math.min(cy, binY) - 96;
        const px = inv * inv * cx + 2 * inv * uf * ctrlX + uf * uf * binX;
        const py = inv * inv * cy + 2 * inv * uf * ctrlY + uf * uf * binY;
        const sc = lerp(1, 0.65, u);
        drawCrumpleBall(ctx, px, py, snapshot.w, snapshot.h, 0.58, 560 * easeOutQuad(u), sc, 1);
      } else {
        const uSuck = (prog - 0.86) / 0.14;
        const sc = lerp(0.65, 0.08, easeInQuad(uSuck));
        const a = 1 - smoothstep(0.15, 1, uSuck);
        drawCrumpleBall(ctx, binX, binY, snapshot.w, snapshot.h, 0.58, 560 + 42 * uSuck, sc, a);
      }
      return;
    }

    drawStageBackground(ctx, w, h, 0);

    if (currentFx === 'fade') {
      const e = easeOutCubic(prog);
      const sc = lerp(1, 0.92, e);
      const dy = 10 * easeOutQuad(prog);
      const a = 1 - smoothstep(0, 1, prog);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(cx, cy + dy);
      ctx.scale(sc, sc);
      ctx.drawImage(snapshot.canvas, -snapshot.w / 2, -snapshot.h / 2, snapshot.w, snapshot.h);
      ctx.restore();
      drawFastenerTape(ctx, cx, cy - (snapshot.h * sc) / 2 + 10 + dy, -2, a);
      return;
    }

    if (currentFx === 'peel') {
      const uFast = clamp01(prog / 0.22);
      const fastDx = 32 * easeOutCubic(uFast);
      const fastDy = -24 * (2.2 * uFast - 2.6 * uFast * uFast);
      const fastRot = 64 * easeOutCubic(uFast);
      const fastAlpha = prog >= 0.22 ? 0 : 1 - smoothstep(0.1, 0.22, prog);

      const uCard = clamp01((prog - 0.12) / 0.88);
      const swayEnv = smoothstep(0, 0.16, uCard) * Math.exp(-1.15 * uCard);
      const osc = uCard * 2.5 * Math.PI * 2;
      const dx = 34 * swayEnv * Math.sin(osc) + 10 * easeOutQuad(uCard);
      const dy = (h * 0.72) * Math.pow(uCard, 1.85);
      const rot = 6.5 * smoothstep(0, 0.45, uCard) + 14 * swayEnv * Math.cos(osc + 0.85);
      const a = 1 - smoothstep(0.68, 1, prog);

      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(cx + dx, cy + dy);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.drawImage(snapshot.canvas, -snapshot.w / 2, -snapshot.h / 2, snapshot.w, snapshot.h);
      ctx.restore();

      drawFastenerTape(ctx, cx + fastDx, cardTop + 10 + fastDy, fastRot, fastAlpha);
      return;
    }

    if (currentFx === 'crumple') {
      if (prog <= 0.58) {
        const cardMix = 1 - smoothstep(0.04, 0.58, prog);
        if (cardMix > 0.02) {
          ctx.save();
          ctx.globalAlpha = cardMix;
          ctx.translate(cx, cy);
          ctx.scale(lerp(1, 0.72, prog / 0.58), lerp(1, 0.72, prog / 0.58));
          ctx.drawImage(snapshot.canvas, -snapshot.w / 2, -snapshot.h / 2, snapshot.w, snapshot.h);
          ctx.restore();
        }
        drawCrumpleBall(ctx, cx, cy, snapshot.w, snapshot.h, prog, 0, 1, 1 - cardMix * 0.35);
      } else {
        const uf = (prog - 0.58) / 0.42;
        const sc = uf <= 0.18 ? lerp(0.92, 1.03, smoothstep(0, 0.18, uf)) : lerp(1.03, 0.14, easeInQuad((uf - 0.18) / 0.82));
        const dy = 18 * easeInQuad(uf);
        const a = 1 - smoothstep(0.55, 1, uf);
        drawCrumpleBall(ctx, cx, cy + dy, snapshot.w, snapshot.h, 0.58, 18 * easeOutQuad(uf), sc, a);
        // 4 flecks
        const rng = makePrng(777);
        for (let i = 0; i < 4; i++) {
          const ang = i * Math.PI * 0.5 + 0.4;
          const dist = 42 * easeOutCubic(uf) + rng() * 14;
          ctx.save();
          ctx.globalAlpha = a;
          ctx.fillStyle = '#F3D686';
          ctx.translate(cx + Math.cos(ang) * dist, cy + Math.sin(ang) * dist + 14 * uf * uf);
          ctx.rotate(uf * 4);
          ctx.fillRect(-3, -2, 6, 4);
          ctx.restore();
        }
      }
      return;
    }

    if (currentFx === 'burn') {
      const SAMPLES = 24;
      const frontY = (xn) => {
        const wave = 0.05 * Math.sin(xn * 6.5 + 0.7) + 0.03 * Math.sin(xn * 14.3 + 2.1);
        const delay = clamp01(0.12 * (1 - xn) + 0.01 + wave * 0.25);
        const finish = clamp01(0.84 - 0.1 * xn + wave * 0.28);
        const ct = clamp01((prog - delay) / Math.max(0.01, finish - delay));
        return snapshot.h * (1 - Math.pow(ct, 0.94));
      };

      const pts = [];
      for (let i = 0; i < SAMPLES; i++) {
        const xn = i / (SAMPLES - 1);
        pts.push({ x: cardLeft + xn * snapshot.w, y: cardTop + frontY(xn) });
      }

      // Clip unburned upper paper
      ctx.save();
      ctx.globalAlpha = 1 - smoothstep(0.76, 0.94, prog);
      ctx.beginPath();
      ctx.moveTo(cardLeft - 10, cardTop - 10);
      ctx.lineTo(cardLeft + snapshot.w + 10, cardTop - 10);
      for (let i = pts.length - 1; i >= 0; i--) {
        ctx.lineTo(pts[i].x, pts[i].y);
      }
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(snapshot.canvas, cardLeft, cardTop, snapshot.w, snapshot.h);
      ctx.restore();

      // Charred + glowing ember front
      if (prog > 0.02 && prog < 0.92) {
        const env = smoothstep(0, 0.08, prog) * (1 - smoothstep(0.72, 0.92, prog));
        ctx.save();
        ctx.globalAlpha = env;
        ctx.beginPath();
        pts.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.strokeStyle = '#332018';
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        ctx.strokeStyle = '#FF7A1A';
        ctx.lineWidth = 2.6;
        ctx.stroke();

        // Flames & rising embers
        const rng = makePrng(909);
        for (let f = 0; f < 14; f++) {
          const xn = (f + 0.5) / 14;
          const bx = cardLeft + xn * snapshot.w;
          const by = cardTop + frontY(xn);
          if (by >= cardTop + snapshot.h - 2 || by <= cardTop + 2) continue;
          const fh = (18 + 26 * rng()) * env * (0.7 + 0.3 * Math.sin(prog * 26 + f));
          const fg = ctx.createRadialGradient(bx, by - fh * 0.35, 1, bx, by - fh * 0.35, fh);
          fg.addColorStop(0, 'rgba(255, 240, 150, 0.95)');
          fg.addColorStop(0.5, 'rgba(255, 110, 20, 0.78)');
          fg.addColorStop(1, 'rgba(255, 60, 10, 0)');
          ctx.fillStyle = fg;
          ctx.beginPath();
          ctx.ellipse(bx + Math.sin(prog * 18 + f) * 4, by - fh * 0.35, 9, fh * 0.65, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        for (let s = 0; s < 18; s++) {
          const birth = rng() * 0.55;
          const age = clamp01((prog - birth) / 0.42);
          if (age <= 0 || age >= 1) continue;
          const xn = 0.08 + rng() * 0.84;
          const sx = cardLeft + xn * snapshot.w + Math.sin(age * 9 + s) * 12;
          const sy = cardTop + frontY(xn) - age * 70;
          ctx.fillStyle = s % 3 === 0 ? `rgba(60,55,52,${(1 - age) * 0.75})` : `rgba(255,155,40,${1 - age})`;
          ctx.beginPath();
          ctx.arc(sx, sy, s % 3 === 0 ? 2.6 : 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
      return;
    }

    if (currentFx === 'shredder') {
      const COUNT = 11;
      const rng = makePrng(31415);
      // Subtle shredder bar slot
      ctx.save();
      ctx.fillStyle = 'rgba(51, 36, 25, 0.14)';
      ctx.beginPath();
      ctx.roundRect(cardLeft - 12, cardTop + 2, snapshot.w + 24, 6, 3);
      ctx.fill();
      ctx.restore();

      const stripW = snapshot.w / COUNT;
      for (let i = 0; i < COUNT; i++) {
        const delay = rng() * 0.16 + 0.04 * (i % 2);
        const span = 0.68 + rng() * 0.1;
        const u = clamp01((prog - delay) / span);
        const centerOff = (i + 0.5) / COUNT - 0.5;
        const dropDist = snapshot.h * 0.95 + 64 + rng() * 24;
        const dx = (centerOff * 28 + (rng() - 0.5) * 8) * easeOutQuad(u);
        const dy = dropDist * (0.28 * u + 0.72 * u * u);
        const rotDeg = (centerOff * 14 + (rng() - 0.5) * 10) * smoothstep(0, 0.85, u);
        const a = 1 - smoothstep(0.55, 1, u);

        if (a <= 0.01) continue;
        const sx = i * stripW;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.translate(cardLeft + sx + stripW * 0.5 + dx, cardTop + snapshot.h * 0.5 + dy);
        ctx.rotate((rotDeg * Math.PI) / 180);
        ctx.drawImage(
          snapshot.canvas,
          sx * 2,
          0,
          stripW * 2,
          snapshot.h * 2,
          -stripW * 0.5,
          -snapshot.h * 0.5,
          stripW,
          snapshot.h
        );
        ctx.restore();
      }
    }
  }

  function restoreIdle() {
    clearTimeout(autoRestoreTimer);
    cancelAnimationFrame(rafId);
    state = 'idle';
    drawIdle();
    updateStatus('idle');
  }

  function play() {
    clearTimeout(autoRestoreTimer);
    cancelAnimationFrame(rafId);
    state = 'playing';
    updateStatus('playing');

    const dur = reducedMotion ? 260 : durationMs;
    const start = performance.now();

    const step = (now) => {
      const p = clamp01((now - start) / dur);
      drawFrame(p);
      if (p < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        state = 'done';
        updateStatus('done');
        autoRestoreTimer = setTimeout(() => {
          if (state === 'done') restoreIdle();
        }, 1150);
      }
    };
    rafId = requestAnimationFrame(step);
  }

  durInput?.addEventListener('input', (e) => {
    durationMs = Number(e.target.value);
    if (durLabel) durLabel.textContent = `${durationMs} ms`;
  });

  replayBtn?.addEventListener('click', play);
  undoBtn?.addEventListener('click', restoreIdle);

  window.addEventListener('pinvello:langchange', () => {
    snapshot = buildCardSnapshot(getLang());
    renderPills();
    if (state === 'idle') drawIdle();
    updateStatus(state);
  });

  let rz;
  window.addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => {
      if (state === 'idle') drawIdle();
    }, 100);
  });

  if (durLabel) durLabel.textContent = `${durationMs} ms`;
  renderPills();
  drawIdle();
  updateStatus('idle');
}

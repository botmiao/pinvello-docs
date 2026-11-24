/**
 * Faithful JS port of Pinvello's procedural 3D paper contours, fasteners,
 * hand-drawn underlines, 10 built-in doodles, and 5 palette presets
 * from crates/pinvello/src/art.rs & palette.rs.
 *
 * Every inline SVG <defs> id is namespaced with `${uid}_` to avoid global
 * DOM SVG id collisions across multiple notes on the same page.
 */

export const PAPER_SHADOW_BLEED = 28;

export const THEMES = {
  classic: {
    id: 'classic',
    pro: false,
    name: { zh: '经典暖阳', en: 'Classic Warm' },
    tints: [
      ['#F8E2A2', '#E5BA58'],
      ['#CAE6FA', '#7EB4E2'],
      ['#D2F0D5', '#88C890'],
      ['#FDD6E0', '#E692A8'],
      ['#E2D5FA', '#B29CE2'],
    ],
  },
  morandi: {
    id: 'morandi',
    pro: true,
    name: { zh: '莫兰迪灰雾', en: 'Morandi Mist' },
    tints: [
      ['#E2DAD0', '#B6AA9A'],
      ['#C6D2DE', '#8FA4B8'],
      ['#C8D6CA', '#90A894'],
      ['#DFC9CC', '#B89298'],
      ['#D2CCE0', '#A298B8'],
    ],
  },
  vintage: {
    id: 'vintage',
    pro: true,
    name: { zh: '复古牛皮', en: 'Vintage Kraft' },
    tints: [
      ['#E8CCA0', '#C69E64'],
      ['#DDD4C0', '#A89C82'],
      ['#D2DAC0', '#9AA880'],
      ['#E8C4B2', '#C68E74'],
      ['#DCCBC0', '#B09688'],
    ],
  },
  forest: {
    id: 'forest',
    pro: true,
    name: { zh: '清爽森系', en: 'Fresh Forest' },
    tints: [
      ['#ECF0BE', '#C2CC7E'],
      ['#C0ECEE', '#78C0C4'],
      ['#C2ECD0', '#7AC092'],
      ['#F4DDD0', '#D2A48E'],
      ['#D2DEF4', '#94AAD2'],
    ],
  },
  macaron: {
    id: 'macaron',
    pro: true,
    name: { zh: '甜心马卡龙', en: 'Macaron Pastel' },
    tints: [
      ['#FFF0AC', '#F0CA58'],
      ['#C0ECFF', '#74C6EB'],
      ['#CCF5D8', '#82D49A'],
      ['#FFD2E2', '#F092B2'],
      ['#E4D2FF', '#B894EB'],
    ],
  },
};

export const PAPER_STYLES = [
  { id: 'curled', pro: false, label: { zh: '卷角纸', en: 'Curled' } },
  { id: 'torn', pro: true, label: { zh: '手撕毛边', en: 'Torn' } },
  { id: 'perforated', pro: true, label: { zh: '打孔便笺', en: 'Perforated' } },
  { id: 'ruled', pro: true, label: { zh: '横线手账', en: 'Ruled' } },
  { id: 'grid', pro: true, label: { zh: '方格点阵', en: 'Grid' } },
];

export const FASTENER_KINDS = [
  { id: 'washi', pro: false, label: { zh: '和纸胶带', en: 'Washi Tape' } },
  { id: 'striped', pro: true, label: { zh: '斜纹胶带', en: 'Striped Tape' } },
  { id: 'pushpin', pro: false, label: { zh: '立体图钉', en: 'Pushpin' } },
  { id: 'roundPin', pro: true, label: { zh: '圆珠图钉', en: 'Pearl Pin' } },
  { id: 'paperclip', pro: true, label: { zh: '回形针', en: 'Paperclip' } },
  { id: 'binderClip', pro: true, label: { zh: '燕尾夹', en: 'Binder Clip' } },
  { id: 'hook', pro: true, label: { zh: '小挂钩', en: 'Wall Hook' } },
  { id: 'none', pro: false, label: { zh: '无固定件', en: 'None' } },
];

export const DOODLES = {
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"><path d="M 6 20 C 10 17, 13 13, 17 5"/><path d="M 18.6 3.6 C 20.4 6.2, 18.8 10.2, 14.6 10.6 C 13.8 7.4, 15.6 4.4, 18.6 3.6 Z" fill="currentColor" fill-opacity="0.52"/><path d="M 11.8 13.4 C 11.8 9.2, 8.8 7.0, 7.2 8.8 C 6.4 11.2, 8.8 13.6, 11.8 13.4 Z" fill="currentColor" fill-opacity="0.48"/><path d="M 12.8 14.2 C 16.2 12.8, 19.6 13.6, 19.2 15.8 C 17.6 17.6, 14.4 16.8, 12.8 14.2 Z" fill="currentColor" fill-opacity="0.48"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M 12 3 C 12 7.5 10 9.5 5.5 10 C 10 10.5 12 12.5 12 17 C 12 12.5 14 10.5 18.5 10 C 14 9.5 12 7.5 12 3 Z"/><path d="M 19 2 L 19 6 M 17 4 L 21 4"/><path d="M 5 17 L 5 21 M 3 19 L 7 19"/></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><line x1="8" y1="2.5" x2="8" y2="5.5"/><line x1="16" y1="2.5" x2="16" y2="5.5"/><circle cx="8" cy="13" r="0.8" fill="currentColor"/><circle cx="12" cy="13" r="0.8" fill="currentColor"/><circle cx="16" cy="13" r="0.8" fill="currentColor"/><circle cx="8" cy="17" r="0.8" fill="currentColor"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/><circle cx="16" cy="17" r="0.8" fill="currentColor"/></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><polyline points="12 7 12 12 15.5 14"/><path d="M 5 3.5 L 3.5 5 M 19 3.5 L 20.5 5"/></svg>`,
  chart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3.5 4.5 3.5 19.5 20.5 19.5"/><rect x="6" y="12" width="3" height="7.5" rx="0.8"/><rect x="11" y="8" width="3" height="11.5" rx="0.8"/><rect x="16" y="14" width="3" height="5.5" rx="0.8"/><path d="M 6 10 L 12 6 L 18 11"/></svg>`,
  doc: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M 6 3.5 L 14 3.5 L 18.5 8 L 18.5 20.5 C 18.5 21 18 21.5 17.5 21.5 L 6.5 21.5 C 6 21.5 5.5 21 5.5 20.5 L 5.5 4.5 C 5.5 4 6 3.5 6.5 3.5 Z"/><polyline points="14 3.5 14 8 18.5 8"/><line x1="8.5" y1="12" x2="15.5" y2="12"/><line x1="8.5" y1="15.5" x2="15.5" y2="15.5"/><line x1="8.5" y1="19" x2="12.5" y2="19"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M 3.5 19 C 3.5 15.5 6 14 9 14 C 12 14 14.5 15.5 14.5 19"/><path d="M 14.5 5.5 C 15.2 5.1 16 5.2 16.5 5.8 C 17.1 6.5 17 7.5 16.5 8.2"/><path d="M 16.5 14 C 18.2 14.5 19.5 15.8 19.5 18"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><polyline points="4 6.5 12 12.5 20 6.5"/></svg>`,
  books: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M 5 6 L 18 6 C 18.8 6 19.5 6.7 19.5 7.5 C 19.5 8.3 18.8 9 18 9 L 5 9 C 4.2 9 3.5 8.3 3.5 7.5 C 3.5 6.7 4.2 6 5 6 Z"/><path d="M 5 11 L 18 11 C 18.8 11 19.5 11.7 19.5 12.5 C 19.5 13.3 18.8 14 18 14 L 5 14 C 4.2 14 3.5 13.3 3.5 12.5 C 3.5 11.7 4.2 11 5 11 Z"/><path d="M 4 16 L 19 16 C 19.8 16 20.5 16.7 20.5 17.5 C 20.5 18.3 19.8 19 19 19 L 4 19 C 3.2 19 2.5 18.3 2.5 17.5 C 2.5 16.7 3.2 16 4 16 Z"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><polyline points="8 12 11 15 16 9"/></svg>`,
};

export function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  const val = parseInt(clean.slice(0, 6), 16);
  return {
    r: (val >> 16) & 0xff,
    g: (val >> 8) & 0xff,
    b: val & 0xff,
  };
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function makeRng(seed) {
  let state = (BigInt(seed) ^ 0xd6e8feb86659fd93n) & 0xffffffffffffffffn;
  const nextU64 = () => {
    state = (state + 0x9e3779b97f4a7c15n) & 0xffffffffffffffffn;
    let z = state;
    z = ((z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n) & 0xffffffffffffffffn;
    z = ((z ^ (z >> 27n)) * 0x94d049bb133111ebn) & 0xffffffffffffffffn;
    return (z ^ (z >> 31n)) & 0xffffffffffffffffn;
  };
  const nextF = () => Number(nextU64() >> 40n) / 16777215;
  return { nextU64, nextF };
}

export function paperSheetSvg({
  uid,
  seed = 1,
  width = 240,
  height = 200,
  bgHex = '#F8E2A2',
  style = 'curled',
}) {
  const w = Math.max(80, width);
  const h = Math.max(80, height);
  const bleed = PAPER_SHADOW_BLEED;
  const sw = w + bleed * 2;
  const sh = h + bleed * 2;
  const ox = bleed;
  const oy = bleed;
  const amp = clamp(w / 320, 0.65, 1.15);

  const rng = makeRng(seed);
  const mix = rng.nextU64();
  const r = Array.from({ length: 16 }, () => rng.nextF());

  const { r: rc0, g: gc0, b: bc0 } = hexToRgb(bgHex);
  const aCol = 0.955;

  const topR = Math.min(255, Math.round(rc0 * 1.022));
  const topG = Math.min(255, Math.round(gc0 * 1.02));
  const topB = Math.min(255, Math.round(bc0 * 1.015));
  const botR = Math.round(rc0 * 0.962);
  const botG = Math.round(gc0 * 0.954);
  const botB = Math.round(bc0 * 0.936);

  const shadeR = Math.round(rc0 * 0.86);
  const shadeG = Math.round(gc0 * 0.83);
  const shadeB = Math.round(bc0 * 0.75);

  const flapDarkR = Math.round(rc0 * 0.86);
  const flapDarkG = Math.round(gc0 * 0.82);
  const flapDarkB = Math.round(bc0 * 0.73);
  const flapMidR = Math.round(rc0 * 0.95);
  const flapMidG = Math.round(gc0 * 0.92);
  const flapMidB = Math.round(bc0 * 0.86);
  const flapHiR = Math.min(255, Math.round(rc0 * 1.05));
  const flapHiG = Math.min(255, Math.round(gc0 * 1.04));
  const flapHiB = Math.min(255, Math.round(bc0 * 1.02));

  const edgeR = Math.round(rc0 * 0.8);
  const edgeG = Math.round(gc0 * 0.77);
  const edgeB = Math.round(bc0 * 0.7);

  const rc = Math.min(2.4, w * 0.06, h * 0.06);

  let liftL;
  let liftR;
  if (r[0] < 0.5) {
    liftL = -0.14 + r[2] * 0.34;
    liftR = 0.48 + r[1] * 0.52;
  } else if (r[0] < 0.78) {
    liftL = 0.34 + r[1] * 0.56;
    liftR = 0.38 + r[2] * 0.58;
  } else if (r[0] < 0.92) {
    liftL = 0.46 + r[1] * 0.54;
    liftR = -0.12 + r[2] * 0.32;
  } else {
    liftL = 0.22 + r[1] * 0.44;
    liftR = 0.52 + r[2] * 0.46;
  }

  const tlDx = (-2.2 + r[3] * 6.0) * amp;
  const tlDy = (-1.2 + r[4] * 2.4) * amp;
  const trDx = (-3.8 + r[5] * 6.0) * amp;
  const trDy = (-1.2 + r[6] * 2.4) * amp;

  const blDx = -(2.0 + Math.max(0, liftL) * 7.6 + r[7] * 2.4) * amp;
  const brDx = (2.0 + Math.max(0, liftR) * 8.0 + r[8] * 2.4) * amp;
  const blDy = (3.0 - liftL * 13.0 + (r[9] - 0.5) * 2.4) * amp;
  const brDy = (3.0 - liftR * 13.4 + (r[10] - 0.5) * 2.4) * amp;

  const topBow = (r[11] < 0.5 ? -1 : 1) * (1.2 + r[12] * 1.9) * amp;
  const topC1Dy = tlDy * 0.67 + trDy * 0.33 + topBow;
  const topC2Dy = tlDy * 0.33 + trDy * 0.67 + topBow * (0.6 + r[3] * 0.7);

  const leftS = r[13] < 0.58;
  const leftBow = (2.8 + r[14] * 4.2) * amp;
  const leftC1Dx = blDx * 0.68 + tlDx * 0.32 + (leftS ? -leftBow * 0.75 : -leftBow);
  const leftC2Dx = blDx * 0.33 + tlDx * 0.67 + (leftS ? leftBow * 0.85 : -leftBow * 0.55);

  const rightS = r[14] < 0.62;
  const rightBow = (3.0 + r[13] * 4.4) * amp;
  const rightC1Dx = trDx * 0.67 + brDx * 0.33 + (rightS ? -rightBow * 0.85 : rightBow * 0.55);
  const rightC2Dx = trDx * 0.32 + brDx * 0.68 + (rightS ? rightBow * 0.8 : rightBow);

  const botArchSign = r[15] < 0.54 ? 1 : -1;
  const botBow = (3.2 + r[11] * 4.4) * amp;
  const botC1Dy = brDy * 0.66 + blDy * 0.34 + botArchSign * botBow;
  const botC2Dy = brDy * 0.32 + blDy * 0.68 + botArchSign * botBow * (0.45 + r[12] * 0.75);

  let curl = null;
  if (style !== 'torn' && (style === 'curled' || (liftR > 0.3 && r[12] < 0.62))) {
    if (liftR > 0.25 && r[12] < 0.7) {
      const cw = (20 + r[15] * 18) * amp;
      const ch = clamp(cw * (0.72 + r[13] * 0.15), 15 * amp, 32 * amp);
      curl = { cw, ch, tipKx: 0.37 + r[14] * 0.13, tipKy: 0.82 + r[10] * 0.09 };
    }
  }

  const shBl = [(-0.6 - Math.max(0, liftL) * 5.8) * amp, (5.2 + Math.max(0, liftL) * 10.2) * amp];
  const shBr = [(1.8 + Math.max(0, liftR) * 6.2) * amp, (5.4 + Math.max(0, liftR) * 10.6) * amp];
  const domeX = clamp(50 + (liftL - liftR) * 13, 32, 68);
  const domeY = clamp(32 + r[4] * 8, 28, 44);
  const bx1 = clamp(50 - (liftR - liftL) * 28, 15, 85);
  const bx2 = clamp(50 + (liftR - liftL) * 46, 4, 98);

  const tlX = ox + tlDx;
  const tlY = oy + tlDy;
  const trX = ox + w + trDx;
  const trY = oy + trDy;
  const blX = ox + blDx;
  const blY = oy + h + blDy;
  const brX = ox + w + brDx;
  const brY = oy + h + brDy;

  const topC1X = ox + w * 0.33;
  const topC1Y = oy + topC1Dy;
  const topC2X = ox + w * 0.67;
  const topC2Y = oy + topC2Dy;

  const rightC1X = ox + w + rightC1Dx;
  const rightC1Y = oy + h * 0.33;
  const rightC2X = ox + w + rightC2Dx;
  const rightC2Y = oy + h * 0.68;

  const botC1X = ox + w * 0.66;
  const botC1Y = oy + h + botC1Dy;
  const botC2X = ox + w * 0.32;
  const botC2Y = oy + h + botC2Dy;

  const leftC1X = ox + leftC1Dx;
  const leftC1Y = oy + h * 0.68;
  const leftC2X = ox + leftC2Dx;
  const leftC2Y = oy + h * 0.33;

  const shTlX = tlX + 1;
  const shTlY = tlY + 2;
  const shTrX = trX + 1.4;
  const shTrY = trY + 2.2;
  const shBlX = blX + shBl[0];
  const shBlY = oy + h + shBl[1];
  const shBrX = ox + w + shBr[0];
  const shBrY = oy + h + shBr[1];
  const shBotMidY = (shBlY + shBrY) * 0.5 + 1.5;

  const f = (n) => n.toFixed(2);
  const shadowD = `M ${f(shTlX)} ${f(shTlY)} C ${f(topC1X)} ${f(topC1Y + 2)}, ${f(topC2X)} ${f(topC2Y + 2.2)}, ${f(shTrX)} ${f(shTrY)} C ${f(rightC1X + 2.5)} ${f(rightC1Y)}, ${f(rightC2X + shBr[0] * 0.45)} ${f(rightC2Y)}, ${f(shBrX)} ${f(shBrY)} Q ${f(ox + w * 0.5)} ${f(shBotMidY)}, ${f(shBlX)} ${f(shBlY)} C ${f(leftC1X + shBl[0] * 0.45)} ${f(leftC1Y)}, ${f(leftC2X + 1)} ${f(leftC2Y)}, ${f(shTlX)} ${f(shTlY)} Z`;

  let basePaperD = '';
  let curlOverlay = '';

  const tlXr = tlX + rc;
  const tlYr = tlY + rc;
  const trXr = trX - rc;
  const trYr = trY + rc;
  const blXr = blX + rc;
  const blYr = blY - rc;
  const brXr = brX - rc;
  const brYr = brY - rc;

  if (style === 'torn') {
    const segs = clamp(Math.round(w / 12), 14, 48);
    const startY = Math.min(brY - 2, oy + h - 1.5);
    const endY = Math.min(blY - 2, oy + h - 1.5);
    let tornPts = '';
    let fiberD = `M ${f(brX)} ${f(startY)}`;
    for (let s = 1; s <= segs; s++) {
      const t = 1 - s / segs;
      const px = blX + (brX - blX) * t;
      const baseY = endY + (startY - endY) * t + Math.sin(t * Math.PI) * 2.2;
      const hStep = (mix + BigInt(s) * 0x94d049bb133111ebn) & 0xffffffffffffffffn;
      const rot = ((hStep >> 19n) | (hStep << 45n)) & 0xffn;
      const wave = (Number(rot) / 255 - 0.5) * 5.6;
      const py = baseY + wave;
      tornPts += ` L ${f(px)} ${f(py)}`;
      fiberD += ` L ${f(px)} ${f(py - 1.4)}`;
    }
    basePaperD = `M ${f(tlXr)} ${f(tlY)} C ${f(topC1X)} ${f(topC1Y)}, ${f(topC2X)} ${f(topC2Y)}, ${f(trXr)} ${f(trY)} Q ${f(trX)} ${f(trY)}, ${f(trX)} ${f(trYr)} C ${f(rightC1X)} ${f(rightC1Y)}, ${f(rightC2X)} ${f(rightC2Y)}, ${f(brX)} ${f(startY)} ${tornPts} C ${f(leftC1X)} ${f(leftC1Y)}, ${f(leftC2X)} ${f(leftC2Y)}, ${f(tlX)} ${f(tlYr)} Q ${f(tlX)} ${f(tlY)}, ${f(tlXr)} ${f(tlY)} Z`;
    curlOverlay = `<path d="${fiberD}" fill="none" stroke="rgba(255,255,255,0.62)" stroke-width="1.35" stroke-linejoin="round" stroke-linecap="round"/>`;
  } else if (curl) {
    const cw = Math.min(curl.cw, w * 0.24);
    const ch = Math.min(curl.ch, h * 0.22);
    const curlAx = brX - cw;
    const curlAy = brY - 2.2;
    const curlBy = brY - ch;
    const rEndX = brX - 0.5;
    const rEndY = curlBy;
    const rimC1X = brX - cw * 0.14;
    const rimC1Y = brY - ch * 0.46;
    const rimC2X = brX - cw * 0.5;
    const rimC2Y = brY - ch * 0.12;

    basePaperD = `M ${f(tlXr)} ${f(tlY)} C ${f(topC1X)} ${f(topC1Y)}, ${f(topC2X)} ${f(topC2Y)}, ${f(trXr)} ${f(trY)} Q ${f(trX)} ${f(trY)}, ${f(trX)} ${f(trYr)} C ${f(rightC1X)} ${f(rightC1Y)}, ${f(rightC2X)} ${f(rightC2Y)}, ${f(rEndX)} ${f(rEndY)} C ${f(rimC1X)} ${f(rimC1Y)}, ${f(rimC2X)} ${f(rimC2Y)}, ${f(curlAx)} ${f(curlAy)} C ${f(botC1X)} ${f(botC1Y)}, ${f(botC2X)} ${f(botC2Y)}, ${f(blXr)} ${f(blY)} Q ${f(blX)} ${f(blY)}, ${f(blX)} ${f(blYr)} C ${f(leftC1X)} ${f(leftC1Y)}, ${f(leftC2X)} ${f(leftC2Y)}, ${f(tlX)} ${f(tlYr)} Q ${f(tlX)} ${f(tlY)}, ${f(tlXr)} ${f(tlY)} Z`;

    const flapTipX = brX - cw * curl.tipKx;
    const flapTipY = brY - ch * curl.tipKy;
    const inC1X = brX - cw * 0.64;
    const inC1Y = brY - ch * 0.26;
    const inC2X = brX - cw * 0.54;
    const inC2Y = brY - ch * 0.68;
    const topCX = brX - cw * 0.16;
    const topCY = brY - ch * 0.92;
    const shadeQX = brX - cw * 0.82;
    const shadeQY = brY - ch * 0.82;

    curlOverlay = `
      <path d="M ${f(curlAx)} ${f(curlAy)} Q ${f(shadeQX)} ${f(shadeQY)}, ${f(rEndX)} ${f(rEndY)} C ${f(rimC1X)} ${f(rimC1Y)}, ${f(rimC2X)} ${f(rimC2Y)}, ${f(curlAx)} ${f(curlAy)} Z" fill="url(#${uid}_curl_face_shade)"/>
      <path d="M ${f(curlAx)} ${f(curlAy)} C ${f(inC1X)} ${f(inC1Y)}, ${f(inC2X)} ${f(inC2Y)}, ${f(flapTipX)} ${f(flapTipY)} Q ${f(topCX)} ${f(topCY)}, ${f(rEndX)} ${f(rEndY)} C ${f(rimC1X)} ${f(rimC1Y)}, ${f(rimC2X)} ${f(rimC2Y)}, ${f(curlAx)} ${f(curlAy)} Z" fill="url(#${uid}_flap_grad)"/>
      <path d="M ${f(curlAx)} ${f(curlAy)} C ${f(inC1X)} ${f(inC1Y)}, ${f(inC2X)} ${f(inC2Y)}, ${f(flapTipX)} ${f(flapTipY)} Q ${f(topCX)} ${f(topCY)}, ${f(rEndX)} ${f(rEndY)}" fill="none" stroke="rgba(255,255,255,0.58)" stroke-width="0.8" stroke-linecap="round"/>
    `;
  } else {
    basePaperD = `M ${f(tlXr)} ${f(tlY)} C ${f(topC1X)} ${f(topC1Y)}, ${f(topC2X)} ${f(topC2Y)}, ${f(trXr)} ${f(trY)} Q ${f(trX)} ${f(trY)}, ${f(trX)} ${f(trYr)} C ${f(rightC1X)} ${f(rightC1Y)}, ${f(rightC2X)} ${f(rightC2Y)}, ${f(brX)} ${f(brYr)} Q ${f(brX)} ${f(brY)}, ${f(brXr)} ${f(brY)} C ${f(botC1X)} ${f(botC1Y)}, ${f(botC2X)} ${f(botC2Y)}, ${f(blXr)} ${f(blY)} Q ${f(blX)} ${f(blY)}, ${f(blX)} ${f(blYr)} C ${f(leftC1X)} ${f(leftC1Y)}, ${f(leftC2X)} ${f(leftC2Y)}, ${f(tlX)} ${f(tlYr)} Q ${f(tlX)} ${f(tlY)}, ${f(tlXr)} ${f(tlY)} Z`;
    curlOverlay = `<path d="M ${f(botC1X)} ${f(botC1Y - 0.6)} Q ${f((botC1X + brX) * 0.5)} ${f((botC1Y + brY) * 0.5 - 1.2)}, ${f(brXr)} ${f(brY - 0.6)}" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="0.85" stroke-linecap="round"/>`;
  }

  let paperD = basePaperD;
  let styleDecor = '';
  if (style === 'perforated') {
    const step = 20;
    const margin = 20;
    const count = Math.max(3, Math.floor((w - margin * 2) / step));
    const span = (count - 1) * step;
    const startX = ox + (w - span) * 0.5;
    const hy = oy + 10.5;
    const hr = 2.9;
    let rings = '';
    for (let i = 0; i < count; i++) {
      const hx = startX + i * step;
      paperD += ` M ${f(hx - hr)} ${f(hy)} a ${f(hr)} ${f(hr)} 0 1 0 ${f(hr * 2)} 0 a ${f(hr)} ${f(hr)} 0 1 0 ${f(-hr * 2)} 0 Z`;
      rings += `<circle cx="${f(hx)}" cy="${f(hy)}" r="${f(hr)}" fill="none" stroke="rgba(${edgeR},${edgeG},${edgeB},0.36)" stroke-width="0.7"/>`;
    }
    const tearY = oy + 18.5;
    styleDecor = `${rings}<line x1="${(ox + 10).toFixed(1)}" y1="${tearY.toFixed(1)}" x2="${(ox + w - 10).toFixed(1)}" y2="${tearY.toFixed(1)}" stroke="rgba(${edgeR},${edgeG},${edgeB},0.32)" stroke-width="0.85" stroke-dasharray="3.2 2.8"/>`;
  } else if (style === 'ruled') {
    let lines = '';
    for (let ry = oy + 54; ry < oy + h - 14; ry += 28) {
      lines += `<line x1="${(ox - 10).toFixed(1)}" y1="${ry.toFixed(1)}" x2="${(ox + w + 12).toFixed(1)}" y2="${ry.toFixed(1)}" stroke="rgba(110,92,72,0.13)" stroke-width="0.85"/>`;
    }
    styleDecor = `<g clip-path="url(#${uid}_sheet_clip)"><line x1="${(ox + 15).toFixed(1)}" y1="${(oy - 2).toFixed(1)}" x2="${(ox + 15).toFixed(1)}" y2="${(oy + h + 6).toFixed(1)}" stroke="rgba(196,108,98,0.16)" stroke-width="0.85"/>${lines}</g>`;
  } else if (style === 'grid') {
    let grid = '';
    const step = 16;
    for (let gx = ox - 6; gx < ox + w + 12; gx += step) {
      grid += `<line x1="${gx.toFixed(1)}" y1="${(oy - 4).toFixed(1)}" x2="${gx.toFixed(1)}" y2="${(oy + h + 8).toFixed(1)}" stroke="rgba(105,92,76,0.095)" stroke-width="0.7"/>`;
    }
    for (let gy = oy + 14; gy < oy + h + 8; gy += step) {
      grid += `<line x1="${(ox - 10).toFixed(1)}" y1="${gy.toFixed(1)}" x2="${(ox + w + 12).toFixed(1)}" y2="${gy.toFixed(1)}" stroke="rgba(105,92,76,0.095)" stroke-width="0.7"/>`;
    }
    styleDecor = `<g clip-path="url(#${uid}_sheet_clip)">${grid}</g>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sw} ${sh}" width="${sw}" height="${sh}" aria-hidden="true">
    <defs>
      <filter id="${uid}_wall_contact_blur" x="-12%" y="-12%" width="124%" height="128%"><feGaussianBlur stdDeviation="2.0"/></filter>
      <filter id="${uid}_card_lift_blur" x="-22%" y="-20%" width="146%" height="150%"><feGaussianBlur stdDeviation="6.0"/></filter>
      <clipPath id="${uid}_sheet_clip"><path d="${paperD}" clip-rule="evenodd"/></clipPath>
      <linearGradient id="${uid}_sheet_grad" x1="8%" y1="0%" x2="88%" y2="100%">
        <stop offset="0%" stop-color="rgba(${topR},${topG},${topB},${aCol})"/>
        <stop offset="68%" stop-color="rgba(${rc0},${gc0},${bc0},${aCol})"/>
        <stop offset="100%" stop-color="rgba(${botR},${botG},${botB},${aCol})"/>
      </linearGradient>
      <radialGradient id="${uid}_dome_light" cx="${domeX.toFixed(1)}%" cy="${domeY.toFixed(1)}%" r="62%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.28)"/>
        <stop offset="58%" stop-color="rgba(255,255,255,0.08)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
      <linearGradient id="${uid}_bend_shade" x1="${bx1.toFixed(1)}%" y1="20%" x2="${bx2.toFixed(1)}%" y2="97%">
        <stop offset="0%" stop-color="rgba(${shadeR},${shadeG},${shadeB},0)"/>
        <stop offset="76%" stop-color="rgba(${shadeR},${shadeG},${shadeB},0.145)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.12)"/>
      </linearGradient>
      <linearGradient id="${uid}_curl_face_shade" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(${shadeR},${shadeG},${shadeB},0)"/>
        <stop offset="100%" stop-color="rgba(${shadeR},${shadeG},${shadeB},0.25)"/>
      </linearGradient>
      <linearGradient id="${uid}_flap_grad" x1="12%" y1="88%" x2="78%" y2="12%">
        <stop offset="0%" stop-color="rgba(${flapDarkR},${flapDarkG},${flapDarkB},0.98)"/>
        <stop offset="48%" stop-color="rgba(${flapMidR},${flapMidG},${flapMidB},0.98)"/>
        <stop offset="100%" stop-color="rgba(${flapHiR},${flapHiG},${flapHiB},0.98)"/>
      </linearGradient>
    </defs>
    <path d="${shadowD}" fill="rgba(14,20,32,0.185)" filter="url(#${uid}_card_lift_blur)"/>
    <path d="${paperD}" fill-rule="evenodd" transform="translate(0.7, 1.8)" fill="rgba(18,22,30,0.085)" filter="url(#${uid}_wall_contact_blur)"/>
    <path d="${paperD}" fill-rule="evenodd" fill="url(#${uid}_sheet_grad)" stroke="rgba(${edgeR},${edgeG},${edgeB},0.28)" stroke-width="0.75" stroke-linejoin="round"/>
    <g clip-path="url(#${uid}_sheet_clip)">
      <rect x="0" y="0" width="${sw}" height="${sh}" fill="url(#${uid}_dome_light)"/>
      <rect x="0" y="0" width="${sw}" height="${sh}" fill="url(#${uid}_bend_shade)"/>
    </g>
    <path d="M ${f(tlXr)} ${f(tlY + 0.55)} C ${f(topC1X)} ${f(topC1Y + 0.55)}, ${f(topC2X)} ${f(topC2Y + 0.55)}, ${f(trXr)} ${f(trY + 0.55)}" fill="none" stroke="rgba(255,255,255,0.56)" stroke-width="0.82" stroke-linecap="round"/>
    ${styleDecor}
    ${curlOverlay}
  </svg>`;
}

export function fastenerSvg({ uid, kind = 'washi', colorHex = '#E5BA58' }) {
  if (kind === 'none') return '';
  const { r, g, b } = hexToRgb(colorHex);
  const mixBlack = (c, k) => clamp(Math.round(c * k), 0, 255);
  const mixWhite = (c, t) => clamp(Math.round(c + (255 - c) * t), 0, 255);

  if (kind === 'washi' || kind === 'striped') {
    const a = 0.72;
    const hiR = mixWhite(r, 0.38);
    const hiG = mixWhite(g, 0.38);
    const hiB = mixWhite(b, 0.38);
    const edgeR = mixBlack(r, 0.82);
    const edgeG = mixBlack(g, 0.82);
    const edgeB = mixBlack(b, 0.82);
    const tapeD = 'M 3.2 2.0 L 78.8 1.6 L 80.2 5.2 L 78.4 8.8 L 80.0 12.4 L 78.3 16.0 L 79.8 19.6 L 78.5 22.0 L 3.0 22.4 L 1.8 19.2 L 3.4 15.6 L 1.9 12.0 L 3.5 8.4 L 2.0 5.0 Z';
    let stripes = '';
    if (kind === 'striped') {
      for (let sx = -16; sx < 92; sx += 11) {
        stripes += `<line x1="${sx}" y1="24" x2="${sx + 18}" y2="0" stroke="rgba(255,255,255,0.36)" stroke-width="3.6"/>`;
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="82" height="24" viewBox="0 0 82 24" aria-hidden="true">
      <defs>
        <clipPath id="${uid}_tape_clip"><path d="${tapeD}"/></clipPath>
        <linearGradient id="${uid}_tape_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(${hiR},${hiG},${hiB},${a})"/>
          <stop offset="55%" stop-color="rgba(${r},${g},${b},${a})"/>
          <stop offset="100%" stop-color="rgba(${edgeR},${edgeG},${edgeB},${a})"/>
        </linearGradient>
      </defs>
      <path d="${tapeD}" transform="translate(0.4, 1.1)" fill="rgba(20,22,28,0.09)"/>
      <path d="${tapeD}" fill="url(#${uid}_tape_grad)" stroke="rgba(255,255,255,0.30)" stroke-width="0.55"/>
      <g clip-path="url(#${uid}_tape_clip)">${stripes}</g>
    </svg>`;
  }

  if (kind === 'pushpin') {
    const hiR = mixWhite(r, 0.46), hiG = mixWhite(g, 0.46), hiB = mixWhite(b, 0.46);
    const lR = mixWhite(r, 0.22), lG = mixWhite(g, 0.22), lB = mixWhite(b, 0.22);
    const mR = mixBlack(r, 0.9), mG = mixBlack(g, 0.88), mB = mixBlack(b, 0.9);
    const dR = mixBlack(r, 0.78), dG = mixBlack(g, 0.75), dB = mixBlack(b, 0.79);
    const dpR = mixBlack(r, 0.67), dpG = mixBlack(g, 0.64), dpB = mixBlack(b, 0.69);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <defs>
        <filter id="${uid}_pin_rim_soft" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="0.65"/></filter>
        <filter id="${uid}_pin_stem_blend" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.45"/></filter>
        <clipPath id="${uid}_cap_clip"><ellipse cx="20.8" cy="11.4" rx="6.4" ry="5.2" transform="rotate(28 20.8 11.4)"/></clipPath>
        <clipPath id="${uid}_collar_clip"><ellipse cx="16.7" cy="19.8" rx="7.9" ry="6.6" transform="rotate(28 16.7 19.8)"/></clipPath>
        <linearGradient id="${uid}_pin_sphere" x1="18%" y1="15%" x2="85%" y2="88%">
          <stop offset="0%" stop-color="rgba(${hiR},${hiG},${hiB},1)"/><stop offset="35%" stop-color="rgba(${lR},${lG},${lB},1)"/><stop offset="75%" stop-color="rgba(${r},${g},${b},1)"/><stop offset="100%" stop-color="rgba(${mR},${mG},${mB},1)"/>
        </linearGradient>
        <radialGradient id="${uid}_pin_collar_grad" cx="24%" cy="30%" r="76%">
          <stop offset="0%" stop-color="rgba(${hiR},${hiG},${hiB},1)"/><stop offset="28%" stop-color="rgba(${lR},${lG},${lB},1)"/><stop offset="62%" stop-color="rgba(${dR},${dG},${dB},1)"/><stop offset="100%" stop-color="rgba(${dpR},${dpG},${dpB},1)"/>
        </radialGradient>
        <radialGradient id="${uid}_pin_ground_shadow" cx="48%" cy="48%" r="52%"><stop offset="0%" stop-color="rgba(0,0,0,0.25)"/><stop offset="58%" stop-color="rgba(0,0,0,0.10)"/><stop offset="100%" stop-color="rgba(0,0,0,0)"/></radialGradient>
        <radialGradient id="${uid}_pin_core_shadow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(30,14,18,0.34)"/><stop offset="62%" stop-color="rgba(30,14,18,0.10)"/><stop offset="100%" stop-color="rgba(30,14,18,0)"/></radialGradient>
        <linearGradient id="${uid}_pin_needle_grad" x1="0%" y1="0%" x2="100%" y2="55%"><stop offset="0%" stop-color="rgb(225,232,238)"/><stop offset="48%" stop-color="rgb(155,168,178)"/><stop offset="100%" stop-color="rgb(98,110,120)"/></linearGradient>
        <linearGradient id="${uid}_pin_waist_grad" x1="0%" y1="22%" x2="92%" y2="75%"><stop offset="0%" stop-color="rgb(${lR},${lG},${lB})"/><stop offset="34%" stop-color="rgb(${dR},${dG},${dB})"/><stop offset="100%" stop-color="rgb(${dpR},${dpG},${dpB})"/></linearGradient>
      </defs>
      <ellipse cx="16.8" cy="25.2" rx="11" ry="7.6" transform="rotate(14 16.8 25.2)" fill="url(#${uid}_pin_ground_shadow)"/>
      <ellipse cx="14.2" cy="26.8" rx="5.5" ry="3.8" transform="rotate(18 14.2 26.8)" fill="url(#${uid}_pin_core_shadow)"/>
      <ellipse cx="12.5" cy="27.8" rx="1.15" ry="0.72" transform="rotate(24 12.5 27.8)" fill="rgba(36,22,24,0.34)"/>
      <line x1="15.2" y1="22.8" x2="12.6" y2="27.6" stroke="url(#${uid}_pin_needle_grad)" stroke-width="1.75" stroke-linecap="round"/>
      <line x1="14.9" y1="23.0" x2="12.7" y2="27.1" stroke="rgba(248,251,255,0.42)" stroke-width="0.55" stroke-linecap="round"/>
      <ellipse cx="16.3" cy="20.6" rx="8" ry="6.7" transform="rotate(28 16.3 20.6)" fill="rgb(${dpR},${dpG},${dpB})"/>
      <ellipse cx="16.7" cy="19.8" rx="7.9" ry="6.6" transform="rotate(28 16.7 19.8)" fill="url(#${uid}_pin_collar_grad)"/>
      <g clip-path="url(#${uid}_collar_clip)"><ellipse cx="17.5" cy="20.6" rx="7.7" ry="6.4" transform="rotate(28 17.5 20.6)" fill="none" stroke="rgba(255,242,246,0.5)" stroke-width="1.4" filter="url(#${uid}_pin_rim_soft)"/></g>
      <ellipse cx="17.2" cy="19.1" rx="3.9" ry="3.1" transform="rotate(28 17.2 19.1)" fill="rgb(${dpR},${dpG},${dpB})" filter="url(#${uid}_pin_stem_blend)"/>
      <path d="M 13.9 17.8 C 15.1 16.1, 16.2 14.2, 16.8 12.1 L 22.7 15.3 C 21.4 16.8, 20.3 18.7, 19.7 20.7 C 17.6 21.2, 15.1 19.9, 13.9 17.8 Z" fill="url(#${uid}_pin_waist_grad)"/>
      <path d="M 15.7 14.0 C 16.3 13.0, 16.8 12.0, 17.0 11.6 L 22.7 14.8 C 22.2 15.5, 21.6 16.3, 21.0 17.0 C 19.1 16.4, 17.2 15.3, 15.7 14.0 Z" fill="rgba(35,14,20,0.12)" filter="url(#${uid}_pin_stem_blend)"/>
      <ellipse cx="20.2" cy="12.5" rx="6.5" ry="5.4" transform="rotate(28 20.2 12.5)" fill="rgb(${dR},${dG},${dB})"/>
      <ellipse cx="20.8" cy="11.4" rx="6.4" ry="5.2" transform="rotate(28 20.8 11.4)" fill="url(#${uid}_pin_sphere)"/>
      <g clip-path="url(#${uid}_cap_clip)"><ellipse cx="21.4" cy="12.0" rx="6.3" ry="5.1" transform="rotate(28 21.4 12.0)" fill="none" stroke="rgba(255,246,249,0.5)" stroke-width="1.1" filter="url(#${uid}_pin_rim_soft)"/></g>
    </svg>`;
  }

  if (kind === 'roundPin') {
    const hiR = mixWhite(r, 0.62), hiG = mixWhite(g, 0.62), hiB = mixWhite(b, 0.62);
    const dkR = mixBlack(r, 0.68), dkG = mixBlack(g, 0.65), dkB = mixBlack(b, 0.7);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <defs>
        <radialGradient id="${uid}_pearl_shadow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="rgba(24,18,16,0.30)"/><stop offset="58%" stop-color="rgba(24,18,16,0.10)"/><stop offset="100%" stop-color="rgba(24,18,16,0)"/></radialGradient>
        <radialGradient id="${uid}_pearl_ball" cx="34%" cy="30%" r="68%"><stop offset="0%" stop-color="rgb(${hiR},${hiG},${hiB})"/><stop offset="44%" stop-color="rgb(${r},${g},${b})"/><stop offset="86%" stop-color="rgb(${dkR},${dkG},${dkB})"/><stop offset="100%" stop-color="rgb(${r},${g},${b})"/></radialGradient>
      </defs>
      <ellipse cx="16.2" cy="25.8" rx="9.2" ry="5.6" transform="rotate(14 16.2 25.8)" fill="url(#${uid}_pearl_shadow)"/>
      <ellipse cx="13.8" cy="27.2" rx="1.15" ry="0.72" fill="rgba(36,24,22,0.38)"/>
      <line x1="17.2" y1="20.4" x2="13.9" y2="27.0" stroke="rgb(162,174,186)" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="16.9" y1="20.6" x2="14.0" y2="26.5" stroke="rgba(246,250,255,0.72)" stroke-width="0.6" stroke-linecap="round"/>
      <circle cx="19.2" cy="14.2" r="8.2" fill="url(#${uid}_pearl_ball)"/>
      <ellipse cx="16.4" cy="10.8" rx="2.9" ry="1.8" transform="rotate(-28 16.4 10.8)" fill="rgba(255,255,255,0.62)"/>
    </svg>`;
  }

  if (kind === 'paperclip') {
    const dkR = mixBlack(r, 0.72), dkG = mixBlack(g, 0.72), dkB = mixBlack(b, 0.75);
    const hiR = mixWhite(r, 0.58), hiG = mixWhite(g, 0.58), hiB = mixWhite(b, 0.58);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="48" viewBox="0 0 34 48" fill="none" aria-hidden="true">
      <g transform="rotate(5 17 22)">
        <path d="M 10.5 14.2 L 10.5 8.5 A 6.8 6.8 0 0 1 24.1 8.5 L 24.1 35.5 A 5.2 5.2 0 0 1 13.7 35.5 L 13.7 16.5" transform="translate(1.1, 1.5)" stroke="rgba(20,22,28,0.16)" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M 10.5 14.2 L 10.5 8.5 A 6.8 6.8 0 0 1 24.1 8.5 L 24.1 35.5 A 5.2 5.2 0 0 1 13.7 35.5 L 13.7 16.5" stroke="rgba(${dkR},${dkG},${dkB},0.96)" stroke-width="2.45" stroke-linecap="round"/>
        <path d="M 10.5 13.8 L 10.5 8.5 A 6.8 6.8 0 0 1 24.1 8.5 L 24.1 35.5 A 5.2 5.2 0 0 1 13.7 35.5 L 13.7 16.5" stroke="rgba(${hiR},${hiG},${hiB},0.72)" stroke-width="0.85" stroke-linecap="round"/>
      </g>
    </svg>`;
  }

  if (kind === 'binderClip') {
    const br = Math.round(r * 0.58), bg = Math.round(g * 0.58), bb = Math.round(b * 0.6);
    const tr = Math.min(255, br + 38), tg = Math.min(255, bg + 38), tb = Math.min(255, bb + 40);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="42" viewBox="0 0 44 42" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="${uid}_clip_body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(${tr},${tg},${tb},0.98)"/>
          <stop offset="100%" stop-color="rgba(${br},${bg},${bb},0.98)"/>
        </linearGradient>
      </defs>
      <rect x="8" y="20" width="29" height="15" rx="2.4" fill="rgba(18,20,26,0.18)"/>
      <path d="M 16 19 L 13.5 6.5 A 3.6 3.6 0 0 1 20.6 5.6 L 20.2 19" stroke="rgba(164,174,186,0.95)" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M 28 19 L 30.5 6.5 A 3.6 3.6 0 0 0 23.4 5.6 L 23.8 19" stroke="rgba(186,196,208,0.95)" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M 10.5 18.0 L 33.5 18.0 L 35.8 31.8 Q 36.0 33.2, 34.4 33.2 L 9.6 33.2 Q 8.0 33.2, 8.2 31.8 Z" fill="url(#${uid}_clip_body)" stroke="rgba(255,255,255,0.22)" stroke-width="0.6"/>
      <line x1="10.8" y1="19.4" x2="33.2" y2="19.4" stroke="rgba(255,255,255,0.35)" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`;
  }

  // hook
  const dkR = mixBlack(r, 0.72), dkG = mixBlack(g, 0.72), dkB = mixBlack(b, 0.75);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44" fill="none" aria-hidden="true">
    <circle cx="18.8" cy="10.2" r="7.4" fill="rgba(16,20,26,0.20)"/>
    <circle cx="18.0" cy="8.8" r="7.0" fill="rgba(${r},${g},${b},0.98)" stroke="rgba(255,255,255,0.52)" stroke-width="0.9"/>
    <circle cx="16.2" cy="6.8" r="2.0" fill="rgba(255,255,255,0.36)"/>
    <circle cx="18.0" cy="30.0" r="5.6" fill="rgba(${dkR},${dkG},${dkB},0.92)" stroke="rgba(255,255,255,0.42)" stroke-width="0.75"/>
    <circle cx="18.0" cy="30.0" r="2.5" fill="rgba(38,32,28,0.62)"/>
    <path d="M 18.0 9.0 L 18.0 25.8 C 18.0 31.8, 23.4 31.8, 23.0 26.6" stroke="rgba(116,126,138,0.98)" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M 17.5 9.0 L 17.5 25.6 C 17.5 30.8, 22.6 30.8, 22.4 26.6" stroke="rgba(245,249,255,0.82)" stroke-width="0.95" stroke-linecap="round"/>
  </svg>`;
}

export function titleUnderlineSvg(width = 110, strokeColor = 'rgba(74, 52, 34, 0.42)') {
  const w = Math.max(24, width);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="8" viewBox="0 0 ${w} 8" fill="none" aria-hidden="true">
    <path d="M 2 4.2 Q ${(w * 0.28).toFixed(1)} 2.2, ${(w * 0.65).toFixed(1)} 5.4 T ${(w - 2).toFixed(1)} 3.8" stroke="${strokeColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

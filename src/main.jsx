import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './upload-state.css';
import './guide-content.css';
import './coming-soon.css';
import './adobe-inspired.css';
import './footer-nav.css';
import './legal.css';
import './refine-2027.css';
import './workflow.css';
import './workflow-mobile.css';
import './workflow-carousel.css';
import './results-design.css';
import './home-directory.css';
import './home-state.css';
import './shared-theme.css';
import './search-state.css';
import { LEGAL_PAGES, LEGAL_ORDER, LEGAL_PATHS, LEGAL_UPDATED, LEGAL_CONTACT } from './legal.jsx';

const RULES = {
  photo: { label: 'Photograph', ratio: 3.5 / 4.5, ratioText: '3.5 : 4.5', minW: 200, maxW: 530, minH: 260, maxH: 690, minKb: 5, maxKb: 600, guide: 'Face should cover roughly 60–70% of the frame.' },
  signature: { label: 'Signature', ratio: 3.25, ratioText: '2.75–3.75 : 1', minW: 250, maxW: 580, minH: 80, maxH: 180, minKb: 3, maxKb: 300, guide: 'Ink should cover roughly 70–80% of the image.' }
};

const PRODUCTS = {
  gate: { name: 'GATE', eyebrow: 'GATE · image preparation', description: 'Prepare a photograph or signature for your GATE application.', officialUrl: 'https://gate2027.iitm.ac.in/photograph_and_signature', officialLabel: 'Read GATE rules ↗', verified: true },
  jee: { name: 'JEE', eyebrow: 'JEE · image preparation', description: 'Prepare application photographs and signatures in one private workspace.' },
  neet: { name: 'NEET', eyebrow: 'NEET · image preparation', description: 'Prepare application photographs and signatures in one private workspace.' },
  ssc: { name: 'SSC', eyebrow: 'SSC · image preparation', description: 'Prepare application photographs and signatures in one private workspace.' },
  rrb: { name: 'RRB', eyebrow: 'RRB · image preparation', description: 'Prepare application photographs and signatures in one private workspace.' },
  upsc: { name: 'UPSC', eyebrow: 'UPSC · image preparation', description: 'Prepare application photographs and signatures in one private workspace.' },
  passport: { name: 'Passport', eyebrow: 'Passport · photo preparation', description: 'Crop and export a clean passport-style photograph from your browser.' },
  compress: { name: 'Image compressor', eyebrow: 'Image · resize & compression', description: 'Resize, crop and export an image with settings you control.' }
};

const currentPath = window.location.pathname.split('/').filter(Boolean)[0] || '';
const legalKey = LEGAL_PAGES[currentPath] ? currentPath : null;
const isHome = !legalKey && currentPath === '';
const productKey = (legalKey || isHome) ? 'gate' : (PRODUCTS[currentPath] ? currentPath : 'gate');
const product = PRODUCTS[productKey];

function formatBytes(bytes) { return `${Math.max(0.1, bytes / 1024).toFixed(1)} kB`; }

const OUTPUT_PRESETS = {
  photo: [
    { label: '530×690', w: 530, h: 690 },
    { label: '480×640', w: 480, h: 640 },
    { label: '240×320', w: 240, h: 320 },
    { label: '200×260', w: 200, h: 260 }
  ],
  signature: [
    { label: '580×180', w: 580, h: 180 },
    { label: '448×140', w: 448, h: 140 },
    { label: '250×80', w: 250, h: 80 }
  ]
};

function compressToTarget(canvas, maxBytes) {
  return new Promise(resolve => {
    const attempt = (lo, hi) => {
      if (hi - lo < 0.02) { canvas.toBlob(b => resolve(b), 'image/jpeg', lo); return; }
      const q = Math.round(((lo + hi) / 2) * 100) / 100;
      canvas.toBlob(b => {
        if (b.size > maxBytes) attempt(lo, q - 0.02);
        else attempt(q + 0.02, hi);
      }, 'image/jpeg', q);
    };
    attempt(0.06, 0.94);
  });
}

function LandingPage() {
  const tools = [
    { name: 'GATE 2027', desc: 'Photo & signature resizer with IIT Madras checks.', href: '/gate', live: true },
    { name: 'JEE', desc: 'Application photo & signature presets.', href: '/gate', live: false },
    { name: 'NEET', desc: 'Application photo & signature presets.', href: '/gate', live: false },
    { name: 'SSC', desc: 'Application photo & signature presets.', href: '/gate', live: false },
    { name: 'UPSC', desc: 'Application photo & signature presets.', href: '/gate', live: false },
    { name: 'Passport', desc: 'Clean passport-style photograph export.', href: '/gate', live: false },
  ];
  return <>
    <header className="topbar"><a className="brand" href="/" aria-label="ResizePhoto.online home"><span className="brand-mark">R</span><span>ResizePhoto<br /><b>.online</b></span></a><nav aria-label="ResizePhoto.online"><a href="/gate">GATE 2027 tool</a><a href="#tools">All tools</a><a href="#how">How it works</a></nav><div className="nav-status"><span></span>Private & local</div><a className="nav-cta" href="/gate">Open resizer <span>→</span></a></header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="pulse"></span> Free exam image tools</p><h1>Exam photos,<br /><em>sized right.</em></h1><p className="hero-lede">Free browser-based photo and signature Resizers for GATE 2027 and more. Crop, resize and check your JPG against official pixels, ratio and file-size limits — locally, nothing uploaded.</p><div className="hero-actions"><a className="primary" href="/gate">Open GATE 2027 resizer <span>→</span></a><a className="secondary" href="#tools">Browse tools</a></div><p className="microcopy"><b>Private by default</b> · your image is processed locally and never uploaded.</p></div><div className="hero-card"><div className="card-label">Featured tool</div><div className="brief-row"><strong>EXAM</strong><span>GATE 2027</span></div><div className="brief-row"><strong>OUTPUT</strong><span>JPG · measurable checks</span></div><div className="rule-line"></div><p>Photo 200×260–530×690 px · Signature 250×80–580×180 px. Ratio and KB checks built in.</p><div className="stamp">GATE<br /><small>2027</small></div></div></section>
      <section className="rules" id="tools"><div className="section-kicker">Tools <span>Pick yours</span></div><div className="rules-intro"><h2>One workspace<br /><em>per exam.</em></h2><p>Start with the live GATE 2027 tool. More exam presets are on the way — same private, browser-only engine.</p></div><div className="rule-cards">{tools.map(t => <article key={t.name}><span className="rule-num">{t.live ? 'LIVE' : 'SOON'}</span><h3>{t.name}</h3><p>{t.desc}</p><p><a className="secondary" href={t.href}>{t.live ? 'Open tool →' : 'Preview in GATE tool →'}</a></p></article>)}</div></section>
      <section className="rules" id="how"><div className="section-kicker">How it works</div><div className="rules-intro"><h2>Three steps,<br /><em>two minutes.</em></h2><p>Your image stays in this browser. Frame it, check the measurable requirements, download a submission-ready JPG.</p></div><div className="rule-cards"><article><span className="rule-num">01</span><h3>Upload</h3><p>JPG, PNG or WebP up to 10 MB. Nothing is sent to a server.</p></article><article><span className="rule-num">02</span><h3>Crop & position</h3><p>Zoom, rotate and drag inside the exam frame.</p></article><article><span className="rule-num">03</span><h3>Check & download</h3><p>Review pixels, ratio and file size, then download the JPG.</p></article></div><div className="official-guidelines"><div className="section-kicker">Trust</div><h3>Private by design</h3><p>Local Canvas processing · No accounts · No uploads · Free forever. Read the <a href="/privacy">Privacy Policy</a>, <a href="/terms">Terms</a> and <a href="/disclaimer">Disclaimer</a> before submitting anywhere.</p><p className="official-source"><a href="/gate">Open the GATE 2027 resizer →</a></p></div></section>
    </main>
    <SiteFooter />
  </>;
}

function ExamDirectoryPage() {
  const groups = [
    { icon:'🏛️', title:'Central Government Exams', items:['NEET UG/PG','JEE Main/Adv','UPSC IAS/IPS','SSC CGL/CHSL','GATE 2027','PSU Recruitment','RRB NTPC','RRB Group-D','RRB ALP (Loco Pilot)','Indian Army Agniveer CEE'] },
    { icon:'🏦', title:'Banking Exams', items:['IBPS PO/Clerk','SBI Clerk (JA)','SBI PO','RBI Grade B','IBPS RRB','LIC AAO/ADO'] },
    { icon:'🏛️', title:'State PSC Exams', items:['BPSC (Bihar)','MPPSC (MP)','JPSC (Jharkhand)','UPPSC (UP)','WBCS (West Bengal)','MPSC (Maharashtra)'] },
    { icon:'📋', title:'State Exams', items:['Bihar Teacher - TRE 4.0','RTPS'] },
    { icon:'👮', title:'Police Recruitment', items:['All State Police Exam Resizer'] }
  ];
  const [query, setQuery] = useState('');
  const filtered = groups.map(group => ({...group, items: group.items.filter(item => item.toLowerCase().includes(query.toLowerCase()))})).filter(group => group.items.length);
  useEffect(() => {
    document.querySelectorAll('.exam-card').forEach(card => {
      const live = card.textContent.includes('GATE 2027');
      card.classList.toggle('live-tool', live);
      card.classList.toggle('soon-tool', !live);
    });
  }, [query]);
  return <>
    <header className="directory-nav"><a className="directory-brand" href="/" aria-label="ResizePhoto.online home"><span className="directory-logo">▣</span><span>ResizePhoto.online</span></a><nav><a href="#central">Central Exams</a><a href="#state">State Exams</a><a href="#banking">Banking</a><a href="#police">Police</a><a href="#tools">All Tools</a></nav><a className="directory-result" href="#tools">Sarkari Result</a></header>
    <main className="directory-home">
      <section className="directory-hero"><div className="hero-stars"></div><p className="directory-kicker">Free exam image tools</p><h1>Resize image for any exam form</h1><p>The simple way to compress photos and signatures for UPSC, SSC, IBPS, GATE, and state exams.</p><label className="exam-search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search exam (e.g. NEET, SBI, 20kb)..." aria-label="Search exams" /></label></section>
      <section className="directory-list" id="tools">{filtered.map((group, index) => <section className={`exam-group group-${index}`} id={group.title.toLowerCase().replace(/[^a-z]+/g,'-')} key={group.title}><div className="group-heading"><h2><span>{group.icon}</span>{group.title}</h2><span>{group.items.length} tools</span></div><div className="exam-grid">{group.items.map(item => <a className={`exam-card ${item === 'GATE 2027' || item.includes('Police') ? 'featured' : ''}`} href="/gate#tool" key={item}><span>{item}</span><b>→</b></a>)}</div></section>)}{!filtered.length && <div className="empty-exams">No exam found. Try “GATE”, “SBI”, or “UPSC”.</div>}</section>
    </main><SiteFooter />
  </>;
}

function FooterBase() {
  const guide = currentPath === 'gate' ? <Gate2027GuideContent /> : null;
  return <footer><div className="footer-top"><div className="footer-brand"><span className="brand-mark">R</span><span>ResizePhoto<br /><b>.online</b></span></div><p>Prepare every application image with less guesswork.</p><div className="footer-private"><span></span> Runs locally in your browser</div></div><div className="footer-links"><div><strong>Tools</strong><a href="/gate#tool">GATE photograph</a><a href="/gate#tool">GATE signature</a><a href="/gate#rules">How it works</a></div><div><strong>Official guidance</strong><a href="https://gate2027.iitm.ac.in/photograph_and_signature" target="_blank" rel="noreferrer">GATE 2027 requirements ↗</a><a href="https://gate2027.iitm.ac.in/" target="_blank" rel="noreferrer">GATE 2027 home ↗</a></div><div><strong>More tools</strong><span>JEE · NEET · SSC</span><span>RRB · UPSC · Passport</span><span>More tools coming soon</span></div><div><strong>Legal</strong><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/disclaimer">Disclaimer</a><a href="/cookies">Cookie Policy</a></div></div><div className="footer-bottom"><small>© 2027 ResizePhoto.online · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/disclaimer">Disclaimer</a> · <a href="/cookies">Cookies</a></small><small>Images are processed locally · Nothing is uploaded or stored</small></div></footer>;
}

function SiteFooter() {
  return <>{currentPath === 'gate' && <Gate2027GuideContent />}<FooterBase /></>;
}

function LegalPage({ pageKey }) {
  const page = LEGAL_PAGES[pageKey];
  if (!page) return null;
  return <>
    <header className="topbar"><a className="brand" href="/gate" aria-label="ResizePhoto.online home"><span className="brand-mark">R</span><span>ResizePhoto<br /><b>.online</b></span></a><nav aria-label="ResizePhoto.online"><a href="/gate#tool">Image tool</a><a href="/gate#rules">How it works</a><a href="https://gate2027.iitm.ac.in/photograph_and_signature" target="_blank" rel="noreferrer">Requirements ↗</a></nav><div className="nav-status"><span></span>Private & local</div><a className="nav-cta" href="/gate#tool">Start adjusting <span>→</span></a></header>
    <main className="legal-wrap">
      <div className="legal-crumb"><a href="/gate">← Back to resizer</a><span>·</span><span>Legal</span><span>·</span><span>{page.nav}</span></div>
      <article className="legal-card">
        <div className="legal-head"><p className="eyebrow">ResizePhoto.online · Legal</p><h1>{page.heading}</h1><p>{page.intro}</p><div className="legal-meta"><span>Last updated: {LEGAL_UPDATED}</span><span>Contact: {LEGAL_CONTACT}</span><span>resizephoto.online{LEGAL_PATHS[pageKey]}</span></div></div>
        <div className="legal-body">
          <div className="legal-note"><strong>Protective summary:</strong> this is an independent, free browser tool with no uploads, no accounts, and no affiliation with GATE / IIT Madras. Always verify the official GATE 2027 instructions before submitting. Passing on-screen checks never guarantees acceptance.</div>
          <nav className="legal-toc" aria-label="On this page"><strong>On this page</strong><ol>{page.sections.map((s, i) => <li key={i}><a href={`#lsec-${i + 1}`}>{s.h}</a></li>)}</ol></nav>
          {page.sections.map((s, i) => <section key={i} id={`lsec-${i + 1}`}><h2><span>{String(i + 1).padStart(2, '0')}</span>{s.h.replace(/^\d+\.\s*/, '')}</h2>{s.p.map((para, j) => <p key={j}>{para}</p>)}</section>)}
          <div className="legal-note"><strong>Not legal advice.</strong> These pages explain how the service works and limit misuse and misunderstanding. For specific legal questions, consult a qualified lawyer in India.</div>
        </div>
        <div className="legal-foot">{LEGAL_ORDER.filter(k => k !== pageKey).map(k => <a key={k} href={LEGAL_PATHS[k]}>{LEGAL_PAGES[k].nav}</a>)}<a className="primary2" href="/gate#tool">Back to free resizer →</a></div>
      </article>
    </main>
    <SiteFooter />
  </>;
}

function Gate2027GuideContent() {
  return <section className="gate-guide-content" id="gate-2027-guide"><div className="section-kicker">GATE 2027 guide <span>Current reference</span></div><div className="guide-copy"><p className="mini-label">Before you upload</p><h2>Prepare a GATE 2027 photo or signature with confidence.</h2><p>ResizePhoto.online helps you prepare the measurable parts of your GATE 2027 upload in three steps: choose a clear source, crop it to the correct frame, and download a JPG that matches the published pixel, ratio, and file-size ranges.</p><div className="guide-columns"><article><h3>Photograph</h3><p>Use a recent colour passport-style photograph with a plain white background and a frontal face. The official range is <b>200×260 to 530×690 pixels</b>, aspect ratio <b>0.66–0.89</b>, and <b>5–600 kB</b> in JPG/JPEG format.</p></article><article><h3>Signature</h3><p>Use your natural handwritten signature in black or dark-blue ink on plain paper. The official range is <b>250×80 to 580×180 pixels</b>, aspect ratio <b>2.75–3.75</b>, and <b>3–300 kB</b> in JPG/JPEG format.</p></article></div><h3>Common reasons for rejection</h3><ul><li>Face too small, too large, off-centre, blurred, or covered by glare and shadows.</li><li>Coloured or patterned background, sunglasses, heavy filters, or an unclear recent photograph.</li><li>Signature written in block capitals, made with the wrong ink, too small, or surrounded by excess paper.</li><li>Wrong dimensions, aspect ratio, file format, or file size.</li></ul><p className="guide-disclaimer">These are preparation checks, not an admission guarantee. Always compare your final file with the current official IIT Madras GATE 2027 instructions before submitting.</p><p><a className="primary" href="#tool">Prepare your GATE 2027 file <span>→</span></a></p></div></section>;
}

function App() {
  const [mode, setMode] = useState('photo');
  const [file, setFile] = useState(null);
  const [sourceUrl, setSourceUrl] = useState('');
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const [output, setOutput] = useState(null);
  const [notice, setNotice] = useState('');
  const [customWidth, setCustomWidth] = useState(1200);
  const [customHeight, setCustomHeight] = useState(800);
  const [dpi, setDpi] = useState(72);
  const [preset, setPreset] = useState('530×690');
  const [customW, setCustomW] = useState(530);
  const [customH, setCustomH] = useState(690);
  const [maxKbText, setMaxKbText] = useState('600');
  const inputRef = useRef(null);
  const isCustomTool = productKey === 'compress';
  const rule = isCustomTool ? { label: 'Custom image', ratio: customWidth / customHeight, ratioText: `${customWidth} : ${customHeight}`, minW: 1, maxW: 10000, minH: 1, maxH: 10000, minKb: 0, maxKb: Infinity, guide: 'Check your destination’s required dimensions before downloading.' } : RULES[mode];
  const outDims = useMemo(() => {
    if (preset === 'custom') return { w: Math.max(1, Math.round(customW) || 1), h: Math.max(1, Math.round(customH) || 1) };
    return OUTPUT_PRESETS[mode].find(p => p.label === preset) || OUTPUT_PRESETS[mode][0];
  }, [preset, customW, customH, mode]);
  const sizeTargetKb = isCustomTool ? rule.maxKb : Math.max(1, parseFloat(maxKbText) || rule.maxKb);

  useEffect(() => () => sourceUrl && URL.revokeObjectURL(sourceUrl), [sourceUrl]);
  useEffect(() => { setFile(null); setOutput(null); setZoom(1); setRotation(0); setPan({ x: 0, y: 0 }); setNotice(''); const first = OUTPUT_PRESETS[mode][0]; setPreset(first.label); setCustomW(first.w); setCustomH(first.h); setMaxKbText(String(RULES[mode].maxKb)); }, [mode]);
  // Per-route SEO: GATE page keeps the keyword title; other presets get their own title.
  // Never overwrites the GATE keyword title with a generic one.
  useEffect(() => {
    const SITE = 'https://resizephoto.online';
    document.querySelectorAll('.brand').forEach(link => { link.setAttribute('href', '/'); });
    if (!legalKey && currentPath === '') {
      const title = 'ResizePhoto.online — Free Photo & Signature Resizer for Exams';
      const desc = 'ResizePhoto.online offers free browser-based photo and signature tools for GATE 2027 and more exams. Crop, resize and check JPG images locally — nothing is uploaded.';
      document.title = title;
      const setMeta = (sel, attr, val, content) => { let el = document.head.querySelector(sel); if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); } el.setAttribute('content', content); };
      setMeta('meta[name="description"]', 'name', 'description', desc);
      setMeta('meta[property="og:title"]', 'property', 'og:title', title);
      setMeta('meta[property="og:url"]', 'property', 'og:url', `${SITE}/`);
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
      setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');
      let canon = document.head.querySelector('link[rel="canonical"]');
      if (!canon) { canon = document.createElement('link'); canon.setAttribute('rel', 'canonical'); document.head.appendChild(canon); }
      canon.setAttribute('href', `${SITE}/`);
      return;
    }
    if (legalKey && LEGAL_PAGES[legalKey]) {
      const page = LEGAL_PAGES[legalKey];
      document.title = page.title;
      const setMeta = (sel, attr, val, content) => { let el = document.head.querySelector(sel); if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); } el.setAttribute('content', content); };
      setMeta('meta[name="description"]', 'name', 'description', page.intro.slice(0, 155));
      setMeta('meta[property="og:title"]', 'property', 'og:title', page.title);
      setMeta('meta[property="og:url"]', 'property', 'og:url', `${SITE}${LEGAL_PATHS[legalKey]}`);
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.title);
      setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow');
      let canon = document.head.querySelector('link[rel="canonical"]');
      if (!canon) { canon = document.createElement('link'); canon.setAttribute('rel', 'canonical'); document.head.appendChild(canon); }
      canon.setAttribute('href', `${SITE}${LEGAL_PATHS[legalKey]}`);
      return;
    }
    const titles = { gate: 'GATE 2027 Photo & Signature Resizer | ResizePhoto.online', compress: 'Image Compressor — Resize & Compress JPG Online | ResizePhoto.online', passport: 'Passport Photo Resizer — Free Online Tool | ResizePhoto.online' };
    const descs = { gate: 'Free online GATE 2027 photo resizer and signature resizer. Crop, resize, convert and check JPG images against IIT Madras pixel, ratio and KB requirements.' };
    const title = titles[productKey] || `${product.name} Photo & Signature Resizer — Free Online Tool`;
    document.title = title;
    const setMeta = (sel, attr, val, content) => { let el = document.head.querySelector(sel); if (!el) { el = document.createElement('meta'); el.setAttribute(attr, val); document.head.appendChild(el); } el.setAttribute('content', content); };
    setMeta('meta[name="description"]', 'name', 'description', descs[productKey] || product.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:url"]', 'property', 'og:url', `${SITE}/${productKey}`);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    let canon = document.head.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.setAttribute('rel', 'canonical'); document.head.appendChild(canon); }
    canon.setAttribute('href', `${SITE}/${productKey}`);
  }, [productKey, product]);

  const metrics = useMemo(() => output ? [
    ['Format', 'JPEG', true],
    ['Dimensions', `${output.width} × ${output.height}px`, output.width >= rule.minW && output.width <= rule.maxW && output.height >= rule.minH && output.height <= rule.maxH],
    ['Aspect ratio', (output.width / output.height).toFixed(3), isCustomTool || (mode === 'photo' ? (output.width / output.height >= .66 && output.width / output.height <= .89) : (output.width / output.height >= 2.75 && output.width / output.height <= 3.75))],
    ['File size', formatBytes(output.blob.size), output.blob.size >= rule.minKb * 1024 && output.blob.size <= sizeTargetKb * 1024]
  ] : [], [output, rule, mode, isCustomTool, sizeTargetKb]);

  function onPick(nextFile) {
    if (!nextFile) return;
    if (!nextFile.type.match(/^image\/(jpeg|jpg|png|webp)$/)) { setNotice('Choose a JPG, PNG or WebP image to begin.'); return; }
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    setFile(nextFile); setSourceUrl(URL.createObjectURL(nextFile)); setOutput(null); setNotice('');
  }

  function reset() { setZoom(1); setRotation(0); setPan({ x: 0, y: 0 }); setOutput(null); setNotice(''); }

  function startDrag(e) { if (!file) return; e.currentTarget.setPointerCapture?.(e.pointerId); dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }; }
  function moveDrag(e) { if (!dragRef.current) return; setPan({ x: dragRef.current.px + e.clientX - dragRef.current.x, y: dragRef.current.py + e.clientY - dragRef.current.y }); }
  function stopDrag() { dragRef.current = null; }

  function exportImage() {
    if (!file || !sourceUrl) return;
    const image = new Image();
    image.onload = () => {
      const targetRatio = rule.ratio;
      let sw = image.width, sh = image.height;
      if (sw / sh > targetRatio) sw = sh * targetRatio; else sh = sw / targetRatio;
      const sx = (image.width - sw) / 2, sy = (image.height - sh) / 2;
      const width = isCustomTool ? customWidth : outDims.w, height = isCustomTool ? customHeight : outDims.h;
      const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, width, height);
      ctx.save(); ctx.translate(width / 2, height / 2); ctx.rotate(rotation * Math.PI / 180); ctx.scale(zoom, zoom);
      ctx.drawImage(image, sx, sy, sw, sh, -width / 2 + pan.x, -height / 2 + pan.y, width, height); ctx.restore();
      compressToTarget(canvas, sizeTargetKb * 1024).then(blob => { setOutput({ blob, width, height, url: URL.createObjectURL(blob) }); setNotice('Preview generated. Review the human-check items before downloading.'); });
    };
    image.src = sourceUrl;
  }

  useEffect(() => {
    if (!output) return;
    const result = document.querySelector('.results');
    if (!result || result.querySelector('.output-preview')) return;
    const preview = document.createElement('img');
    preview.className = 'output-preview';
    preview.src = output.url;
    preview.alt = 'Generated GATE JPG preview';
    result.prepend(preview);
  }, [output]);

  const allPass = metrics.length && metrics.every(item => item[2]);
  if (legalKey && LEGAL_PAGES[legalKey]) return <LegalPage pageKey={legalKey} />;
  if (isHome) return <ExamDirectoryPage />;
  return <>
    <header className="topbar"><a className="brand" href="/gate" aria-label="ResizePhoto.online home"><span className="brand-mark">R</span><span>ResizePhoto<br /><b>.online</b></span></a><nav aria-label="ResizePhoto.online"><a href="#tool">Image tool</a><a href="#rules">How it works</a><a href="https://gate2027.iitm.ac.in/photograph_and_signature" target="_blank" rel="noreferrer">Requirements ↗</a></nav><div className="nav-status"><span></span>Private & local</div><a className="nav-cta" href="#tool">Start adjusting <span>→</span></a></header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="pulse"></span> {product.eyebrow}</p><h1>{isCustomTool ? <>Resize your image.<br /><em>Your settings.</em></> : <>GATE 2027 photo &amp;<br /><em>signature resizer.</em></>}</h1><p className="hero-lede">{isCustomTool ? product.description : 'Free browser-based JPG tool to crop, resize and check your GATE photograph or signature against IIT Madras requirements for pixels, aspect ratio and file size.'}</p><p className="answer-first"><b>Short answer:</b> upload a JPG, PNG or WebP, crop to the GATE 2027 frame, then export a JPG and confirm pixels, aspect ratio and file size. Photo: 200×260–530×690 px, ratio 0.66–0.89, 5–600 kB. Signature: 250×80–580×180 px, ratio 2.75–3.75, 3–300 kB. Runs locally — nothing is uploaded.</p><div className="hero-actions"><a className="primary" href="#tool">{isCustomTool ? 'Set image dimensions' : 'Resize a photograph'} <span>→</span></a>{!isCustomTool && <button className="secondary" onClick={() => { setMode('signature'); document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' }); }}>Resize a signature <span>→</span></button>}</div><p className="microcopy"><b>Private by default</b> · your image is processed locally and never uploaded.</p></div><div className="hero-card"><div className="card-label">{product.name} workspace</div><div className="brief-row"><strong>INPUT</strong><span>JPG · PNG · WebP</span></div><div className="brief-row"><strong>OUTPUT</strong><span>{isCustomTool ? 'Custom dimensions · JPG' : 'JPG · measurable checks'}</span></div><div className="rule-line"></div><p>{product.verified ? 'Verified GATE guardrails are built in. Visual guidance stays beside your preview.' : 'This is a starter preset. Confirm the current official notice before you submit.'}</p><div className="stamp">{product.name}<br /><small>TOOLS</small></div></div></section>
            <section className="tool-section" id="tool"><div className="section-kicker">Image desk <span>01 / 02</span></div><div className="tool-shell"><aside className="tool-sidebar"><h2>Choose a file</h2><p>Start with a clear source image. You can fine-tune the framing after it loads.</p><div className="mode-switch" role="tablist"><button className={mode === 'photo' ? 'active' : ''} onClick={() => setMode('photo')} role="tab">Photograph <small>01</small></button><button className={mode === 'signature' ? 'active' : ''} onClick={() => setMode('signature')} role="tab">Signature <small>02</small></button></div><div className="dropzone" onClick={() => inputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); onPick(e.dataTransfer.files?.[0]); }}><input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={e => onPick(e.target.files?.[0])} /><span className="upload-icon">↑</span><strong>{file ? file.name : 'Drop an image here'}</strong><span>or click to browse</span><small>JPG, PNG or WebP · up to 10 MB</small></div><div className="tool-note"><span>i</span><p>Images are processed locally. Nothing leaves your device.</p></div></aside><div className="editor"><div className="editor-head"><div><span className="mini-label">Editing</span><h2>{rule.label}</h2></div><div className="editor-actions">{!isCustomTool && <span className="target-chip" title="Output settings">Target <b>{outDims.w}×{outDims.h}px</b> · ratio <b>{(outDims.w / outDims.h).toFixed(2)}</b> · ≤ <b>{sizeTargetKb} kB</b></span>}<button className="icon-button" onClick={reset} disabled={!file} title="Reset">↺ <span>Reset</span></button></div></div><div className={`canvas-stage ${file ? 'has-image' : ''}`}><div className="crop-window" style={{aspectRatio: rule.ratio}} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag}>{file ? <img src={sourceUrl} alt="Uploaded source preview" style={{transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`}} draggable="false" /> : <div className="empty-canvas"><span className="crosshair">+</span><strong>Your preview appears here</strong><span>Upload a {mode} to begin</span></div>}{file && mode === 'photo' && <div className="face-grid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>}</div><div className="canvas-caption"><span>Crop ratio <b>{rule.ratioText}</b></span><span>Keep the face inside the central cells · forehead to chin visible</span></div></div><div className="controls"><label>Zoom <input type="range" min="1" max="2" step=".01" value={zoom} onChange={e => setZoom(Number(e.target.value))} disabled={!file} /></label><output>{zoom.toFixed(2)}×</output>{!isCustomTool && <div className="out-settings"><div className="out-head"><span>Output size</span><span>Max file size <b>{sizeTargetKb} kB</b></span></div><div className="preset-chips">{OUTPUT_PRESETS[mode].map(p => <button key={p.label} className={preset === p.label ? 'active' : ''} onClick={() => { setPreset(p.label); setCustomW(p.w); setCustomH(p.h); }} disabled={!file} title={`${p.w} × ${p.h} px`}>{p.label}</button>)}<button className={preset === 'custom' ? 'active' : ''} onClick={() => setPreset('custom')} disabled={!file}>Custom…</button></div>{preset === 'custom' && <div className="custom-px"><label>Width <input type="number" min={rule.minW} max={rule.maxW} value={customW} onChange={e => setCustomW(e.target.value)} disabled={!file} /></label><span>×</span><label>Height <input type="number" min={rule.minH} max={rule.maxH} value={customH} onChange={e => setCustomH(e.target.value)} disabled={!file} /></label><span>px</span></div>}<label className="kb-target">Max file size <input type="number" min="1" max="20000" step="10" value={maxKbText} onChange={e => setMaxKbText(e.target.value)} disabled={!file} /><span>kB</span></label></div>}<button onClick={() => setRotation((rotation + 90) % 360)} disabled={!file}>↻ Rotate</button><button className="render-button" onClick={exportImage} disabled={!file}>Generate preview →</button></div>{notice && <p className="notice">{notice}</p>}{output && <div className="results"><div className="results-title"><div><span className="mini-label">Export check</span><h3>{allPass ? 'Ready to download' : 'Review the measurements'}</h3></div><span className={allPass ? 'pass-pill' : 'warn-pill'}>{allPass ? '✓ Measurable checks pass' : 'Needs review'}</span></div><div className="metrics">{metrics.map(([name, value, pass]) => <div className="metric" key={name}><span>{name}</span><strong>{value}</strong><b className={pass ? 'ok' : 'bad'}>{pass ? 'Pass' : 'Check'}</b></div>)}</div><div className="human-check"><span>◎</span><p><strong>Human checks still matter.</strong> Confirm {rule.guide.toLowerCase()} Also check the official guidance for glare, shadows, background and visibility.</p></div><div className="result-actions"><a className={`download ${!allPass ? 'disabled' : ''}`} href={allPass ? output.url : undefined} download={`gate-2027-${mode}.jpg`}>Download JPG <span>↓</span></a><a href="https://gate2027.iitm.ac.in/photograph_and_signature" target="_blank" rel="noreferrer" className="text-link">Read full rules ↗</a></div></div>}</div></div></section>
      <section className="rules" id="rules"><div className="section-kicker">How the tool works</div><div className="rules-intro"><h2>From upload to ready file.<br /><em>Three simple steps.</em></h2><p>Your image stays in this browser. We help you frame it, check the measurable requirements, and download a submission-ready JPG.</p></div><div className="rule-cards"><article><span className="rule-num">01</span><h3>Upload</h3><p>Choose a clear photograph or signature, or drag it into the upload area. Nothing is sent to a server.</p></article><article><span className="rule-num">02</span><h3>Crop & position</h3><p>Use the crop window, zoom and rotate controls to centre the face or keep the signature comfortably inside the frame.</p></article><article><span className="rule-num">03</span><h3>Check & download</h3><p>Generate a JPG preview, review the dimensions, ratio and file size, then download when the checks pass.</p></article></div><div className="official-guidelines"><div className="section-kicker">GATE 2027 guidelines</div><h3>What IIT Madras expects</h3><p>Photograph: color passport-size image, 3.5 × 4.5 cm, white background, frontal face covering 60–70%, aspect ratio 0.66–0.89, 200 × 260 to 530 × 690 pixels, and 5–600 kB JPG/JPEG.</p><p>Signature: black or dark-blue ink, JPG/JPEG, aspect ratio 1:R where R is 2.75–3.75, signature covering 70–80%, 250 × 80 to 580 × 180 pixels, and 3–300 kB.</p><p className="official-source"><a href="https://gate2027.iitm.ac.in/photograph_and_signature" target="_blank" rel="noreferrer">Read the official GATE 2027 photograph and signature instructions ↗</a></p></div></section>
      <section className="faq"><div><span className="mini-label">Good to know</span><h2>Questions, answered.</h2></div><div className="faq-list"><details open><summary>Does the tool upload my image?</summary><p>No. Processing happens in your browser using the native Canvas API. We do not need an account or server upload.</p></details><details><summary>Will passing the checks guarantee acceptance?</summary><p>No. Pixel dimensions, ratio and file size can be measured automatically. Face position, glare, shadows and handwriting still need your final visual review.</p></details><details><summary>Where do these requirements come from?</summary><p>From the official GATE 2027 Photograph and Signature instructions published by IIT Madras for the gate2027.iitm.ac.in portal.</p></details><details><summary>Which photograph does GATE 2027 accept?</summary><p>A color passport-size image in JPEG/JPG: 200×260 to 530×690 pixels, aspect ratio 0.66–0.89, 5–600 kB, plain white background, with the face covering about 60–70% of the frame.</p></details><details><summary>Which signature does GATE 2027 accept?</summary><p>A JPG/JPEG of the candidate’s full signature in black or dark-blue ink: 250×80 to 580×180 pixels, aspect ratio 2.75–3.75, 3–300 kB, with the signature covering about 70–80% of the image. Typewritten or all-caps block signatures are not accepted.</p></details><details><summary>Can I wear spectacles in the photograph?</summary><p>Yes, if they are normal vision-correcting glasses with no glare. Sunglasses and tinted lenses are not allowed; if glare cannot be avoided, remove the spectacles.</p></details><details><summary>Why would my photograph or signature be rejected?</summary><p>Common reasons: a face covering under 60% or over 70%, caps or hats, sunglasses or glass glare, covered or blurred faces, colored backgrounds with shadows or people, typewritten signatures, red or light ink, or a signature that is too small. See the rejection checklist below.</p></details><details><summary>Who is conducting GATE 2027?</summary><p>IIT Madras is the organizing institute for GATE 2027. Apply through the GOAPS portal at gate2027.iitm.ac.in.</p></details></div></section>
    <section className="guide" id="specs"><div className="section-kicker">GATE 2027 specs <span>Reference</span></div><div className="g-head"><h2>Photograph &amp; signature<br /><em>at a glance.</em></h2><p>Running values from the official IIT Madras instructions. The tool checks the measurable columns automatically.</p></div><div className="spec-wrap"><table className="spec-table"><thead><tr><th>Requirement</th><th>Photograph</th><th>Signature</th></tr></thead><tbody><tr><td>Format</td><td>JPEG / JPG</td><td>JPEG / JPG</td></tr><tr><td>Resolution</td><td>200 × 260 min · 530 × 690 max px</td><td>250 × 80 min · 580 × 180 max px</td></tr><tr><td>Aspect ratio</td><td>1 : R, R = 0.66 – 0.89</td><td>1 : R, R = 2.75 – 3.75</td></tr><tr><td>File size</td><td>5 kB – 600 kB</td><td>3 kB – 300 kB</td></tr><tr><td>Content</td><td>Passport 3.5 × 4.5 cm · face ~60–70%</td><td>Ink covers ~70–80% of the image</td></tr><tr><td>Background</td><td>Plain white, no objects or people</td><td>Plain paper, black / dark-blue ink</td></tr></tbody></table></div><p className="g-src">Source: <a href="https://gate2027.iitm.ac.in/photograph_and_signature" target="_blank" rel="noreferrer">gate2027.iitm.ac.in — Photograph and Signature ↗</a> (GATE 2027, IIT Madras). Re-check before submission.</p></section>
      <section className="guide" id="reasons"><div className="section-kicker">Rejection checklist <span>Before you submit</span></div><div className="g-head"><h2>Why GATE photos<br /><em>get rejected.</em></h2><p>Reasons from past GATE notices grouped by image type. The tool can only auto-check the measurable ones.</p></div><div className="reject-grid"><div className="reject-card"><h3>Photograph</h3><ul className="reject-list"><li><b>Face</b> — face covering under 60% or over 70% of the frame.</li><li><b>Headwear</b> — caps, hats, headbands or scarves (religious coverings are an exception).</li><li><b>Glasses</b> — sunglasses or tinted lenses; glare on normal spectacles.</li><li><b>Covered face</b> — mask, cloth or objects across the face.</li><li><b>Background</b> — colored or patterned backdrop, or a shadow on the wall behind you.</li><li><b>Quality</b> — blurred, poorly lit, or cropped through the forehead or chin.</li></ul></div><div className="reject-card"><h3>Signature</h3><ul className="reject-list"><li><b>Style</b> — all-caps block letters or a digitally generated signature.</li><li><b>Ink</b> — red, green or non-black/dark-blue ink.</li><li><b>Coverage</b> — signature covering under 70% or over 80% of the image.</li><li><b>Size</b> — too small, or below the 250 × 80 pixel minimum.</li><li><b>Content</b> — initials, stamps or extra marks beside the name.</li><li><b>Scan</b> — dark background, folded paper, or blur.</li></ul></div></div><p className="g-src">The official instructions also ask that the face in the photograph covers grid cells <b>A2, A3, B2, B3, C2 and C3</b> of the 3 × 3 guide — keep the face centered, large and facing the camera.</p></section>
    </main><SiteFooter />
  </>;
}

createRoot(document.getElementById('root')).render(<App />);

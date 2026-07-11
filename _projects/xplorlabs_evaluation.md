---
layout: page
title: "Program Evaluation"
description: "This is a mixed-methods program evaluation where I co-developed survey instrument with the team, ran full statistical analysis in R, conducted focus group research, and instructional artifact review across a full academic year with a national cohort of educators."
img: assets/img/xplorlabs_presenting.jpg
importance: 1
category: work
---

<style>
/* =============================================
   XPLORLABS EVALUATION - PORTFOLIO PAGE
   ============================================= */

/* Hide default al-folio post header (replaced by hero) */
.post > header.post-header { display: none !important; }
body { overflow-x: hidden; }

:root {
  --xp-red:    #8C1D40;
  --xp-gold:   #FFC627;
  --xp-navy:   #1a3a5c;
  --xp-forest: #1e5631;
  --xp-light:  #f7f7f7;
  --xp-border: #e4e4e4;
  --xp-r: 8px;
}

/* ---- REVEAL ---- */
.xp-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .65s cubic-bezier(.22,.68,0,1.2),
              transform .65s cubic-bezier(.22,.68,0,1.2);
}
.xp-reveal.xp-in { opacity: 1; transform: translateY(0); }
.xp-reveal.d1 { transition-delay:.05s; }
.xp-reveal.d2 { transition-delay:.15s; }
.xp-reveal.d3 { transition-delay:.25s; }
.xp-reveal.d4 { transition-delay:.35s; }

/* ---- HERO (centered) ---- */
.xp-hero {
  position: relative;
  height: 520px;
  background-size: cover;
  background-position: center 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
}
.xp-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top,rgba(8,8,8,.88) 0%,rgba(8,8,8,.45) 55%,rgba(0,0,0,.25) 100%);
}
.xp-hero-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
  max-width: 680px;
  width: 100%;
  text-align: center;
}
.xp-eyebrow {
  font-size: .67rem;
  font-weight: 700;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--xp-gold);
  margin-bottom: .8rem;
}
.xp-hero-title {
  font-size: clamp(1.75rem,4vw,2.75rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.12;
  margin: 0 0 .65rem;
}
.xp-hero-sub {
  font-size: 1rem;
  color: rgba(255,255,255,.76);
  line-height: 1.5;
  margin: 0 0 1.4rem;
  min-height: 1.6em;
}
.xp-hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.xp-hero-chip {
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: .74rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: .04em;
  backdrop-filter: blur(6px);
}

/* ---- SECTIONS ---- */
.xp-section { margin-bottom: 4rem; scroll-margin-top: 80px; }
.xp-label {
  display: inline-block;
  font-size: .63rem;
  font-weight: 800;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--xp-red);
  background: rgba(140,29,64,.07);
  border-radius: 4px;
  padding: 3px 10px;
  margin-bottom: .6rem;
}
.xp-section h2 {
  font-size: 1.55rem;
  font-weight: 800;
  color: #111;
  margin: 0 0 1rem;
  line-height: 1.2;
}
.xp-divider {
  border: none;
  border-top: 1px solid var(--xp-border);
  margin: 3rem 0;
}

/* ---- FRAMING BANNER (light) ---- */
.xp-frame-banner {
  background: #fff;
  border: 1px solid var(--xp-border);
  border-radius: var(--xp-r);
  padding: 2rem 2.2rem;
  margin-bottom: 3.5rem;
  position: relative;
  overflow: hidden;
}
.xp-frame-banner::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, var(--xp-gold), var(--xp-red));
}
.xp-frame-body {
  font-size: .93rem;
  color: #333;
  line-height: 1.78;
  margin: 0 0 .6rem;
  max-width: 680px;
}
.xp-frame-ps {
  font-size: .78rem;
  color: #888;
  font-style: italic;
  margin: .8rem 0 0;
}

/* ---- SVG ARCHITECTURE (triangle funnel) ---- */
.xp-arch-wrap {
  background: var(--xp-light);
  border-radius: var(--xp-r);
  padding: 1.5rem 1rem 2rem;
  overflow-x: auto;
}
.xp-arch-wrap svg { width: 100%; min-width: 560px; display: block; }

/* pill headers */
.xp-pill { opacity: 0; transition: opacity .4s ease; }
/* strand vertical lines */
.xp-vline { fill: none; stroke-linecap: round; stroke-dasharray: 200; stroke-dashoffset: 200; }
/* milestone nodes */
.xp-mnode { opacity: 0; transition: opacity .3s ease; }
.xp-mtext { opacity: 0; transition: opacity .3s ease; font-size: 9.5px; font-family: -apple-system,sans-serif; }
/* converging lines */
.xp-conv2 { fill: none; stroke-linecap: round; opacity: 0; transition: opacity .4s ease; }
/* synthesis group */
.xp-synth2 { opacity: 0; transition: opacity .45s ease; }

/* animation triggers */
.xp-arch-wrap.anim .xp-pill       { opacity: 1; }
.xp-arch-wrap.anim .xp-pill.p0    { transition-delay:.05s; }
.xp-arch-wrap.anim .xp-pill.p1    { transition-delay:.15s; }
.xp-arch-wrap.anim .xp-pill.p2    { transition-delay:.25s; }

.xp-arch-wrap.anim .vl-s { animation: xpVDraw .55s ease .35s forwards; }
.xp-arch-wrap.anim .vl-i { animation: xpVDraw .4s  ease .35s forwards; }
.xp-arch-wrap.anim .vl-a { animation: xpVDraw .55s ease .35s forwards; }

.xp-arch-wrap.anim .xp-mnode,
.xp-arch-wrap.anim .xp-mtext { opacity: 1; }
.xp-arch-wrap.anim .ms0  { transition-delay:.65s; }
.xp-arch-wrap.anim .ms1  { transition-delay:.75s; }
.xp-arch-wrap.anim .ms2  { transition-delay:.85s; }
.xp-arch-wrap.anim .mi0  { transition-delay:.65s; }
.xp-arch-wrap.anim .mi1  { transition-delay:.75s; }
.xp-arch-wrap.anim .ma0  { transition-delay:.65s; }
.xp-arch-wrap.anim .ma1  { transition-delay:.75s; }
.xp-arch-wrap.anim .ma2  { transition-delay:.85s; }

.xp-arch-wrap.anim .xp-conv2  { opacity: 1; transition-delay:.98s; }
.xp-arch-wrap.anim .xp-synth2 { opacity: 1; transition-delay:1.22s; }

@keyframes xpVDraw {
  from { stroke-dashoffset: 200; }
  to   { stroke-dashoffset: 0; }
}

/* ---- RESPONSIBILITIES GRID ---- */
.xp-resp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
  gap: 10px;
  margin: 1.2rem 0;
}
.xp-resp-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--xp-light);
  border-radius: var(--xp-r);
  padding: 12px 14px;
  font-size: .82rem;
  color: #333;
  line-height: 1.45;
  border-left: 3px solid var(--xp-red);
}
.xp-ri-icon { font-size: 1.05rem; flex-shrink: 0; margin-top: 2px; }

/* ---- BURST CHART ---- */
.xp-burst-wrap {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  align-items: start;
  margin: 1.5rem 0;
}
@media (max-width: 640px) {
  .xp-burst-wrap { grid-template-columns: 1fr; }
}
#xp-burst-svg { width: 100%; cursor: pointer; display: block; }
.xp-burst-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: .5rem;
}
.xp-burst-leg-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: .75rem;
  font-weight: 600;
  color: #444;
  cursor: pointer;
  padding: 4px 10px 4px 6px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: border-color .18s, background .18s;
}
.xp-burst-leg-item:hover { background: var(--xp-light); border-color: var(--xp-border); }
.xp-burst-leg-swatch { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }
.xp-burst-detail {
  background: var(--xp-light);
  border-radius: var(--xp-r);
  border-left: 4px solid var(--xp-red);
  padding: 1.2rem 1.4rem;
  min-height: 140px;
  transition: all .2s ease;
}
.xp-burst-detail h4 { margin: 0 0 .4rem; font-size: .95rem; font-weight: 800; }
.xp-burst-detail p  { font-size: .83rem; color: #444; line-height: 1.65; margin: .4rem 0 .7rem; }
.xp-dim-badge {
  display: inline-flex; align-items: center; gap: 4px;
  margin: 3px 4px 3px 0;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: .69rem;
  font-weight: 700;
  letter-spacing: .03em;
}

/* ---- HORIZONTAL TIMELINE ---- */
.xp-tl-rail {
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
  padding-bottom: .5rem;
  position: relative;
  scrollbar-width: thin;
}
.xp-tl-rail::before {
  content: '';
  position: absolute;
  top: 22px; left: 30px; right: 30px;
  height: 2px;
  background: linear-gradient(to right, var(--xp-red), var(--xp-gold));
  pointer-events: none;
}
.xp-phase-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  width: 116px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  text-align: center;
}
.xp-phase-circle {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
  font-weight: 800;
  color: #999;
  transition: all .22s;
  z-index: 1;
  box-shadow: 0 0 0 4px #fff;
}
.xp-phase-btn.active .xp-phase-circle,
.xp-phase-btn:hover .xp-phase-circle {
  background: var(--xp-red);
  border-color: var(--xp-red);
  color: #fff;
  transform: scale(1.12);
}
.xp-phase-date  { font-size: .61rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--xp-red); line-height: 1.3; }
.xp-phase-label { font-size: .69rem; font-weight: 600; color: #666; line-height: 1.35; max-width: 96px; }
.xp-phase-detail {
  display: none;
  background: #fff;
  border: 1px solid var(--xp-border);
  border-left: 4px solid var(--xp-red);
  border-radius: 0 var(--xp-r) var(--xp-r) 0;
  padding: 1.2rem 1.5rem;
  font-size: .875rem;
  line-height: 1.72;
  color: #444;
  margin-top: 1.2rem;
  animation: xpSlide .28s ease;
}
.xp-phase-detail.active { display: block; }
.xp-phase-detail strong { color: var(--xp-red); }
@keyframes xpSlide {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ---- ANALYSIS SIDE-BY-SIDE ---- */
.xp-analysis-grid {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  gap: 0 2.2rem;
  margin: 1.5rem 0;
}
.xp-analysis-divider { background: var(--xp-border); align-self: stretch; }
.xp-analysis-head {
  font-size: .67rem; font-weight: 800;
  letter-spacing: .13em; text-transform: uppercase;
  padding: 5px 14px; border-radius: 4px;
  display: inline-block; margin-bottom: 1rem;
}
.xp-analysis-head.quant { background: var(--xp-red); color: #fff; }
.xp-analysis-head.qual  { background: var(--xp-navy); color: #fff; }
.xp-analysis-panel p { font-size: .875rem; line-height: 1.72; color: #444; }

@media (max-width: 680px) {
  .xp-analysis-grid { grid-template-columns: 1fr; }
  .xp-analysis-divider { display: none; }
}

/* Six-phase list */
.xp-phases { list-style: none; padding: 0; margin: .75rem 0; counter-reset: phase; }
.xp-phases li {
  counter-increment: phase;
  display: flex; gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: .83rem; color: #444; line-height: 1.55;
  align-items: flex-start;
}
.xp-phases li:last-child { border-bottom: none; }
.xp-phases li::before {
  content: counter(phase, decimal-leading-zero);
  font-size: .61rem; font-weight: 900;
  color: var(--xp-navy); min-width: 22px;
  padding-top: 3px; letter-spacing: .05em;
}

/* Artifact cards */
.xp-artifact-row { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem; }
.xp-artifact-card {
  flex: 1; min-width: 150px;
  background: var(--xp-light);
  border-radius: var(--xp-r);
  padding: 14px 16px;
  border-top: 3px solid var(--xp-forest);
}
.xp-artifact-card h4 { font-size: .73rem; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: var(--xp-forest); margin: 0 0 6px; }
.xp-artifact-card p { font-size: .79rem; color: #555; line-height: 1.6; margin: 0; }

/* ---- SYNTHESIS BLOCK (light) ---- */
.xp-synth-block {
  background: var(--xp-light);
  color: #333;
  border-left: 4px solid var(--xp-gold);
  border-radius: var(--xp-r);
  padding: 1.6rem 2rem;
  margin: 1.2rem 0;
  font-size: .9rem;
  line-height: 1.72;
}
.xp-synth-block p { margin: 0; }
.xp-synth-block strong { color: var(--xp-red); }

/* ---- GALLERY ---- */
.xp-gallery { columns: 2 240px; column-gap: 12px; margin: 1.5rem 0; }
.xp-gal-item {
  break-inside: avoid; margin: 0 0 12px;
  border-radius: var(--xp-r); overflow: hidden;
  position: relative; cursor: default;
}
.xp-gal-item img { width: 100%; display: block; transition: transform .45s cubic-bezier(.22,.68,0,1.2); }
.xp-gal-item:hover img { transform: scale(1.04); }
.xp-gal-cap {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent,rgba(0,0,0,.78));
  color: #fff; padding: 36px 14px 12px;
  font-size: .74rem; line-height: 1.45;
  transform: translateY(100%); transition: transform .32s ease;
}
.xp-gal-item:hover .xp-gal-cap { transform: translateY(0); }

/* ---- REFLECTION ---- */
.xp-pull {
  font-size: clamp(1rem,2.2vw,1.25rem);
  line-height: 1.72; color: #222;
  border-left: 4px solid var(--xp-gold);
  padding-left: 1.5rem;
  margin: 1.5rem 0 2rem;
  font-style: italic;
}
.xp-body p { font-size: .9rem; line-height: 1.78; color: #444; margin-bottom: 1rem; }

/* ---- SKILL TAGS ---- */
.xp-tags { display: flex; flex-wrap: wrap; gap: 7px; margin: 1.2rem 0; }
.xp-tag {
  font-size: .68rem; font-weight: 700;
  padding: 4px 12px; border-radius: 14px;
  background: var(--xp-light); color: #555;
  letter-spacing: .05em; text-transform: uppercase;
  border: 1px solid var(--xp-border);
}

/* ---- CALL TO ACTION ---- */
.xp-cta {
  background: linear-gradient(135deg, var(--xp-red) 0%, #5a1129 100%);
  border-radius: var(--xp-r);
  padding: 2.5rem 2.2rem;
  text-align: center;
  margin: 3rem 0;
}
.xp-cta h2 { color: #fff; font-size: 1.4rem; font-weight: 800; margin: 0 0 .6rem; }
.xp-cta p  { color: rgba(255,255,255,.82); font-size: .92rem; line-height: 1.7; margin: 0 0 1rem; max-width: 560px; margin-left: auto; margin-right: auto; }
.xp-cta a.xp-cta-link {
  display: inline-block;
  background: var(--xp-gold);
  color: #111;
  font-weight: 800;
  font-size: .82rem;
  letter-spacing: .06em;
  padding: 10px 24px;
  border-radius: 22px;
  text-decoration: none;
  margin: 0 6px 8px;
  transition: transform .18s, box-shadow .18s;
}
.xp-cta a.xp-cta-link:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,.25); }
.xp-cta a.xp-cta-link.outline {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,.5);
}
.xp-cta a.xp-cta-link.outline:hover { border-color: #fff; background: rgba(255,255,255,.08); }

/* ---- SIDENAV ---- */
.xp-sidenav {
  position: fixed; left: 16px; top: 50%;
  transform: translateY(-50%);
  width: 130px;
  padding: 12px 0 12px 12px;
  border-left: 2px solid var(--xp-red);
  z-index: 300; line-height: 2.1;
}
.xp-sidenav a {
  display: block; font-size: .66rem;
  text-transform: uppercase; letter-spacing: .09em;
  color: #bbb; text-decoration: none;
  transition: color .2s, font-weight .2s;
}
.xp-sidenav a.xpa,
.xp-sidenav a:hover { color: var(--xp-red); font-weight: 700; }
@media (max-width: 1320px) { .xp-sidenav { display: none; } }
</style>

<!-- Side Navigation -->
<nav class="xp-sidenav" aria-label="Page sections">
  <a href="#xp-top">Top</a>
  <a href="#xp-lens">Context</a>
  <a href="#xp-arch">Design</a>
  <a href="#xp-role">My Role</a>
  <a href="#xp-matrix">Framework</a>
  <a href="#xp-tl">Timeline</a>
  <a href="#xp-an">Analysis</a>
  <a href="#xp-rec">Synthesis</a>
  <a href="#xp-gal">Gallery</a>
  <a href="#xp-ref">Reflection</a>
  <a href="#xp-cta">Contact</a>
</nav>

<!-- ═══ HERO ═══════════════════════════════════════ -->
<div class="xp-hero" id="xp-top"
     style="background-image:url('{{ '/assets/img/xplorlabs_presenting.jpg' | relative_url }}');">
  <div class="xp-hero-content">
    <div class="xp-eyebrow">Product Research &nbsp;&middot;&nbsp; Program Evaluation &nbsp;&middot;&nbsp; UX Research</div>
    <h1 class="xp-hero-title">Xplorlabs Educator<br>Fellowship</h1>
    <p class="xp-hero-sub" id="xp-tw">&nbsp;</p>
    <div class="xp-hero-chips">
      <span class="xp-hero-chip"><span class="xpc" data-t="3" data-s=" data sources">3 data sources</span></span>
      <span class="xp-hero-chip"><span class="xpc" data-t="12" data-s=" months">12 months</span></span>
      <span class="xp-hero-chip"><span class="xpc" data-t="8" data-s=" states">8 states</span></span>
      <span class="xp-hero-chip"><span class="xpc" data-t="2" data-s=" institutions">2 institutions</span></span>
    </div>
  </div>
</div>

<!-- ═══ LENS ════════════════════════════════════════ -->
<div id="xp-lens" class="xp-reveal" style="scroll-margin-top:80px;">
<div class="xp-frame-banner">
  <p class="xp-frame-body">The platform (Xplorlabs.org) the fellowship was based on is a suite of open-access STEM safety science resources developed by UL Research Institutes for educators across the US annually. The Fellowship was structured to onboard and move educators from awareness to active classroom integration. My job was to understand whether that adoption actually changed how educators taught, and what role the platform played in that change. I treated educators as the users, their classrooms as the use context, and the fellowship experience as the adoption journey. To offer a comprehensive insight for the stakeholders and teams, I used both quantitative and qualitative methods. For this project, I took the mindset of researcher-as-listener. Importantly, I worked within a team and duly acknowledge that!</p>
  <p class="xp-frame-ps">PS: While this is a program evaluation of a fellowship, I&rsquo;m presenting it as product research.</p>
</div>
</div>

<!-- ═══ ARCHITECTURE ════════════════════════════════ -->
<div id="xp-arch" class="xp-section xp-reveal" style="scroll-margin-top:80px;">
<span class="xp-label">The Design</span>
<h2>How the Strands Connect</h2>
<p style="font-size:.9rem;color:#555;margin-bottom:1.2rem;">Three independent data streams, each answering a different kind of question about the adoption journey, funnel into a single synthesis. The diagram draws itself as you scroll to it.</p>

<div class="xp-arch-wrap" id="xp-arch-el">
<svg viewBox="0 0 760 296" xmlns="http://www.w3.org/2000/svg"
     aria-label="Three evaluation strands converging to synthesis">

  <!-- Pill headers -->
  <g class="xp-pill p0">
    <rect x="28" y="14" width="166" height="36" rx="18" fill="#8C1D40"/>
    <text x="111" y="37" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="-apple-system,sans-serif">Survey</text>
  </g>
  <g class="xp-pill p1">
    <rect x="297" y="14" width="166" height="36" rx="18" fill="#1a3a5c"/>
    <text x="380" y="37" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="-apple-system,sans-serif">Interviews</text>
  </g>
  <g class="xp-pill p2">
    <rect x="566" y="14" width="166" height="36" rx="18" fill="#1e5631"/>
    <text x="649" y="37" text-anchor="middle" font-size="13" font-weight="800" fill="#fff" font-family="-apple-system,sans-serif">Artifacts</text>
  </g>

  <!-- Vertical strand lines -->
  <line class="xp-vline vl-s" x1="111" y1="50" x2="111" y2="180" stroke="#8C1D40" stroke-width="2.5"/>
  <line class="xp-vline vl-i" x1="380" y1="50" x2="380" y2="148" stroke="#1a3a5c" stroke-width="2.5"/>
  <line class="xp-vline vl-a" x1="649" y1="50" x2="649" y2="180" stroke="#1e5631" stroke-width="2.5"/>

  <!-- Survey milestones -->
  <circle class="xp-mnode ms0" cx="111" cy="88"  r="6" fill="#8C1D40"/>
  <text   class="xp-mtext ms0" x="118" y="92"  fill="#8C1D40">Baseline</text>
  <circle class="xp-mnode ms1" cx="111" cy="126" r="6" fill="#8C1D40"/>
  <text   class="xp-mtext ms1" x="118" y="130" fill="#8C1D40">Mid-year</text>
  <circle class="xp-mnode ms2" cx="111" cy="164" r="6" fill="#8C1D40"/>
  <text   class="xp-mtext ms2" x="118" y="168" fill="#8C1D40">Post-program</text>

  <!-- Interview milestones -->
  <circle class="xp-mnode mi0" cx="380" cy="90"  r="6" fill="#1a3a5c"/>
  <text   class="xp-mtext mi0" x="270" y="94"  text-anchor="end" fill="#1a3a5c">Protocol design</text>
  <circle class="xp-mnode mi1" cx="380" cy="130" r="6" fill="#1a3a5c"/>
  <text   class="xp-mtext mi1" x="270" y="134" text-anchor="end" fill="#1a3a5c">Focus groups</text>

  <!-- Artifact milestones -->
  <circle class="xp-mnode ma0" cx="649" cy="88"  r="6" fill="#1e5631"/>
  <text   class="xp-mtext ma0" x="642" y="92"  text-anchor="end" fill="#1e5631">Coding scheme</text>
  <circle class="xp-mnode ma1" cx="649" cy="126" r="6" fill="#1e5631"/>
  <text   class="xp-mtext ma1" x="642" y="130" text-anchor="end" fill="#1e5631">Iteration</text>
  <circle class="xp-mnode ma2" cx="649" cy="164" r="6" fill="#1e5631"/>
  <text   class="xp-mtext ma2" x="642" y="168" text-anchor="end" fill="#1e5631">Final artifacts</text>

  <!-- Converging lines -->
  <line class="xp-conv2" x1="111" y1="182" x2="380" y2="244" stroke="#8C1D40" stroke-width="2" stroke-dasharray="5 3"/>
  <line class="xp-conv2" x1="380" y1="150" x2="380" y2="244" stroke="#1a3a5c" stroke-width="2" stroke-dasharray="5 3"/>
  <line class="xp-conv2" x1="649" y1="182" x2="380" y2="244" stroke="#1e5631" stroke-width="2" stroke-dasharray="5 3"/>

  <!-- Synthesis node -->
  <circle class="xp-synth2" cx="380" cy="264" r="28" fill="#8C1D40"/>
  <circle class="xp-synth2" cx="380" cy="264" r="22" fill="none" stroke="#FFC627" stroke-width="1.8"/>
  <text class="xp-synth2" x="380" y="268" text-anchor="middle" font-size="11" font-weight="900" fill="#fff" font-family="-apple-system,sans-serif" letter-spacing=".06em">SYNTHESIS</text>
</svg>
</div>
</div>

<hr class="xp-divider">

<!-- ═══ MY ROLE ══════════════════════════════════════ -->
<div id="xp-role" class="xp-section">
<span class="xp-label">My Role</span>
<h2 class="xp-reveal">Product Evaluation Researcher</h2>
<p class="xp-reveal d1" style="font-size:.95rem;line-height:1.75;color:#444;">I was involved in the program from day one and present at key events as a member of the cross-institutional evaluation team at Arizona State University, observing the fellowship unfold in real time, while simultaneously co-designing the instruments to measure it. That dual position is both a methodological advantage and a discipline problem: I saw things none of our surveys captured and neither did the interviews help. What eventually helped was my active engagement with the participant every step of the way. I had sufficient context for most of the questions that made us scratch our heads.</p>
<p class="xp-reveal d2" style="font-size:.95rem;line-height:1.75;color:#444;margin-bottom:1.4rem;">My responsibilities included the full product research lifecycle including but not limited to co-authoring the evaluation logic model to running analysis pipelines and writing the final stakeholder report. I will now share what my experience was like:</p>

<div class="xp-resp-grid">
  <div class="xp-resp-item xp-reveal d1"><span class="xp-ri-icon">🗺️</span><span><strong>Logic model co-design:</strong> translating program goals into measurable evaluation questions about platform adoption</span></div>
  <div class="xp-resp-item xp-reveal d2"><span class="xp-ri-icon">📋</span><span><strong>Instrument adaptation:</strong> mapping the T-STEM scale to this platform&rsquo;s specific content domains and pedagogy</span></div>
  <div class="xp-resp-item xp-reveal d3"><span class="xp-ri-icon">🎙️</span><span><strong>Participant research:</strong> designing and facilitating focus groups with educator-users across two cohorts</span></div>
  <div class="xp-resp-item xp-reveal d4"><span class="xp-ri-icon">📊</span><span><strong>Quantitative analysis:</strong> Welch&rsquo;s t-tests, descriptive statistics, and visualization in R</span></div>
  <div class="xp-resp-item xp-reveal d1"><span class="xp-ri-icon">🔍</span><span><strong>Thematic analysis:</strong> six-phase reflexive coding of all focus group transcripts</span></div>
  <div class="xp-resp-item xp-reveal d2"><span class="xp-ri-icon">📄</span><span><strong>Artifact review:</strong> coding educator-produced instructional documents across multiple development versions</span></div>
  <div class="xp-resp-item xp-reveal d3"><span class="xp-ri-icon">⚖️</span><span><strong>Cross-strand synthesis:</strong> triangulating survey, interview, and artifact data before drawing conclusions</span></div>
  <div class="xp-resp-item xp-reveal d4"><span class="xp-ri-icon">📢</span><span><strong>Research storytelling:</strong> structuring insights for product and program leadership across both institutions</span></div>
</div>
</div>

<hr class="xp-divider">

<!-- ═══ METHODS FRAMEWORK (interactive burst chart) ══ -->
<div id="xp-matrix" class="xp-section xp-reveal">
<span class="xp-label">Research Framework</span>
<h2>What Each Method Was Built to Answer</h2>
<p style="font-size:.9rem;color:#555;margin-bottom:1.4rem;">I organized my inquiry across four dimensions of the educator adoption experience: <strong>Confidence</strong>, <strong>Attitudes</strong>, <strong>Knowledge</strong>, and <strong>Application</strong>. Each method was chosen because it addressed something the others could not. <strong>Click or tap a segment</strong> to explore what each method covers.</p>

<div class="xp-burst-wrap">
  <div>
    <svg id="xp-burst-svg" viewBox="0 0 280 280" aria-label="Interactive method coverage chart"></svg>
    <div class="xp-burst-legend" id="xp-burst-legend"></div>
  </div>
  <div class="xp-burst-detail" id="xp-burst-detail">
    <p style="color:#aaa;font-size:.85rem;margin:0;padding-top:.5rem;">Select a segment or a method in the legend to see what dimensions it covers and how I used it.</p>
  </div>
</div>
</div>

<hr class="xp-divider">

<!-- ═══ TIMELINE ═════════════════════════════════════ -->
<div id="xp-tl" class="xp-section xp-reveal">
<span class="xp-label">Evaluation Timeline</span>
<h2>Twelve Months of Data Collection</h2>
<p style="font-size:.9rem;color:#555;margin-bottom:1.5rem;">Click a phase to see what data collection and product research work I did at each stage.</p>

<div class="xp-tl-rail">
  <button class="xp-phase-btn" onclick="xpPh(0,this)">
    <div class="xp-phase-circle">1</div>
    <div class="xp-phase-date">June 2024</div>
    <div class="xp-phase-label">Kickoff &amp; Baseline</div>
  </button>
  <button class="xp-phase-btn" onclick="xpPh(1,this)">
    <div class="xp-phase-circle">2</div>
    <div class="xp-phase-date">July 2024</div>
    <div class="xp-phase-label">Fellowship Summit</div>
  </button>
  <button class="xp-phase-btn" onclick="xpPh(2,this)">
    <div class="xp-phase-circle">3</div>
    <div class="xp-phase-date">Sep&ndash;Oct 2024</div>
    <div class="xp-phase-label">Research Symposium</div>
  </button>
  <button class="xp-phase-btn" onclick="xpPh(3,this)">
    <div class="xp-phase-circle">4</div>
    <div class="xp-phase-date">Aug&ndash;May</div>
    <div class="xp-phase-label">Community of Practice</div>
  </button>
  <button class="xp-phase-btn" onclick="xpPh(4,this)">
    <div class="xp-phase-circle">5</div>
    <div class="xp-phase-date">Spring 2025</div>
    <div class="xp-phase-label">Post-Survey &amp; Interviews</div>
  </button>
  <button class="xp-phase-btn" onclick="xpPh(5,this)">
    <div class="xp-phase-circle">6</div>
    <div class="xp-phase-date">May 2025</div>
    <div class="xp-phase-label">Celebration &amp; Artifacts</div>
  </button>
  <button class="xp-phase-btn" onclick="xpPh(6,this)">
    <div class="xp-phase-circle">7</div>
    <div class="xp-phase-date">Summer 2025</div>
    <div class="xp-phase-label">Analysis &amp; Report</div>
  </button>
</div>

<div class="xp-phase-detail" id="xppd0"><strong>Pre-adoption baseline.</strong> The pre-program T-STEM survey was sent out at the virtual kickoff, establishing baseline measures across all four adoption dimensions. Field notes from the onboarding session helped contextualize early instrument responses and identify items that needed refinement before subsequent checkpoints.</div>
<div class="xp-phase-detail" id="xppd1"><strong>Field observation, Tempe, Arizona.</strong> I attended the three-day in-person Fellowship Summit, co-facilitating a lab tour for participants while collecting detailed observational notes. Being present at this event gave me the contextual grounding to interpret survey responses later, and shaped the focus group protocols I co-designed for year-end participant interviews.</div>
<div class="xp-phase-detail" id="xppd2"><strong>Participant engagement, Atlanta, Georgia.</strong> At a three-day research symposium, I co-facilitated a structured reflection session with program participants, documenting how direct engagement with safety science research was influencing their instructional thinking and their relationship to the platform.</div>
<div class="xp-phase-detail" id="xppd3"><strong>Longitudinal qualitative touchpoints.</strong> Monthly virtual community sessions served as ongoing observation points across the program year, tracking shifts in how participants talked about the platform, their confidence in using it, and how their instructional designs evolved through the artifact checkpoints submitted each month.</div>
<div class="xp-phase-detail" id="xppd4"><strong>Post-adoption survey and structured focus groups.</strong> The post-program T-STEM survey was administered, and I co-facilitated structured focus group sessions with both participant cohorts. Protocols were designed to surface what drove adoption changes and how participants planned to sustain it.</div>
<div class="xp-phase-detail" id="xppd5"><strong>Final artifact collection.</strong> I attended the in-person celebration where participants showcased completed instructional artifacts in a gallery walk. Collecting final versions here completed the longitudinal artifact record, covering first draft through final version, for every participant.</div>
<div class="xp-phase-detail" id="xppd6"><strong>I ran the full analysis pipeline.</strong> I ran Welch&rsquo;s t-tests and descriptive statistics in R with ggplot2 visualizations. I also applied Braun &amp; Clarke&rsquo;s six-phase thematic analysis to all interview transcripts. Instructional artifacts were also coded using the pre-developed scheme. I then synthesized across all three strands, organized by evaluation question, to produce the final report.</div>
</div>

<hr class="xp-divider">

<!-- ═══ ANALYSIS ══════════════════════════════════════ -->
<div id="xp-an" class="xp-section xp-reveal">
<span class="xp-label">Analysis Pipeline</span>
<h2>Running the Numbers &amp; the Themes in Parallel</h2>
<p style="font-size:.9rem;color:#555;margin-bottom:1.5rem;">Both strands ran simultaneously, each informing how I interpreted the other. The quantitative data showed <em>what</em> changed in educators&rsquo; work using the platform. The qualitative data told me <em>why it mattered</em> to the people living through it.</p>

<div class="xp-analysis-grid">
  <div class="xp-analysis-panel">
    <span class="xp-analysis-head quant">Quantitative</span>
    <p><strong>Instrument adaptation.</strong> I worked with the team to map T-STEM&rsquo;s existing items to the Fellowship&rsquo;s content domains (safety science, sustainability, Action-Oriented Pedagogies, and platform resources) and co-wrote new items for constructs the original scale didn&rsquo;t cover. This required reading the program&rsquo;s logic model alongside the instrument&rsquo;s validation literature to make principled decisions about what to preserve and what to adapt.</p>
    <p><strong>Statistical pipeline.</strong> After discussing with my supervisors and presenting the analysis techniques I would suggest, I went on to use Welch&rsquo;s independent samples t-test because it does not assume equal variance, which of course was a more defensible choice for this participant profile than the standard alternative. Before running any inferential tests, I generated descriptive statistics and exploratory boxplots to examine distributions and flag anomalies that could affect interpretation.</p>
    {% include figure.liquid loading="eager" path="assets/img/xplorlabs_ranalysis.png" title="R analysis environment" class="img-fluid rounded" %}
    <p style="font-size:.73rem;color:#888;margin-top:6px;line-height:1.5;">R environment: survey data pipeline, Welch&rsquo;s t-test code, and a pre/post confidence boxplot. Statistical values redacted.</p>
  </div>

  <div class="xp-analysis-divider"></div>

  <div class="xp-analysis-panel">
    <span class="xp-analysis-head qual">Qualitative</span>
    <p><strong>Reflexive thematic analysis.</strong> I applied Braun &amp; Clarke&rsquo;s six-phase framework to all focus group transcripts. This requires deep engagement with the data at every step and a willingness to return to earlier phases when new readings reveal patterns underweighted the first time.</p>
    <ol class="xp-phases">
      <li><strong>Familiarization:</strong> Multiple transcript readings before any coding. Resisting premature closure.</li>
      <li><strong>Initial coding:</strong> Line-by-line inductive coding across the full dataset.</li>
      <li><strong>Generating themes:</strong> Organizing codes into candidate themes that captured dataset-wide patterns.</li>
      <li><strong>Reviewing themes:</strong> Testing each theme against the data; merging where distinctions weren&rsquo;t analytically meaningful.</li>
      <li><strong>Defining &amp; naming:</strong> Articulating the core meaning of each theme precisely enough to write about consistently.</li>
      <li><strong>Writing up:</strong> Producing the analytic narrative organized by evaluation question.</li>
    </ol>
  </div>
</div>

<p style="font-size:.88rem;color:#555;margin-top:1.5rem;"><strong>Artifact analysis</strong> served as the third lens, coding educator-produced instructional documents across multiple versions per participant to trace how their platform integration evolved. When survey and interview data told different stories, the artifacts provided the third point of evidence that resolved the tension, or confirmed that both patterns were real in different participant subgroups.</p>

<div class="xp-artifact-row">
  <div class="xp-artifact-card"><h4>Coding Scheme</h4><p>Built from the logic model, with dimensions including content alignment, pedagogical approach, and platform resource integration.</p></div>
  <div class="xp-artifact-card"><h4>Longitudinal View</h4><p>Multiple document versions per participant traced how instructional thinking changed through the adoption arc.</p></div>
  <div class="xp-artifact-card"><h4>Triangulation Role</h4><p>Used to test and refine interpretations from the survey and interview strands before finalizing any conclusion.</p></div>
</div>
</div>

<hr class="xp-divider">

<!-- ═══ SYNTHESIS ═════════════════════════════════════ -->
<div id="xp-rec" class="xp-section xp-reveal">
<span class="xp-label">From Evidence to Recommendations</span>
<h2>The Translation Problem</h2>
<p style="font-size:.95rem;line-height:1.75;color:#444;">The hardest part of product evaluation is not analysis. It is translation, the work of converting patterns observed in data into recommendations specific enough to be actionable yet grounded enough to be credible. The distance between &ldquo;here&rsquo;s what the data shows&rdquo; and &ldquo;here&rsquo;s what the program and product team should do differently&rdquo; is where most evaluation reports quietly fail.</p>
<p style="font-size:.95rem;line-height:1.75;color:#444;margin-bottom:1.2rem;">I approached this by organizing the synthesis around each evaluation question, assembling evidence from all three strands before drawing any conclusion, then framing recommendations explicitly in the program&rsquo;s own logic model so stakeholders could engage with them without having to re-learn the research vocabulary.</p>

<div class="xp-synth-block">
  <p>Convergence across strands <strong>raised my confidence</strong> in a pattern. Divergence <strong>prompted investigation</strong>: did two sources disagree because they were measuring different things, or because one had a limitation the other did not? The answer shaped both the conclusion and the recommendation that followed it.</p>
</div>

<p style="font-size:.95rem;line-height:1.75;color:#444;margin-top:1.2rem;">Recommendations were written to influence program strategy, naming what to change in the platform&rsquo;s onboarding model, what to sustain, and what to examine more closely in the next adoption cycle. The goal was to give decision-makers evidence they could act on, not just a report they could file.</p>
</div>

<hr class="xp-divider">

<!-- ═══ PRESENTING ════════════════════════════════════ -->
<div id="xp-presenting" class="xp-section xp-reveal">
<span class="xp-label">Stakeholder Communication</span>
<h2>Presenting to the People Who Make the Decisions</h2>
<p style="font-size:.95rem;line-height:1.75;color:#444;margin-bottom:1.4rem;">The final evaluation was prepared for product and program leadership. This required a deliberate translation step, moving from the vocabulary of research methods to the vocabulary of product design and program improvement. Importantly, different participants applied what they learned from the fellowship in their unique context, as such, the presentation images (left panel) while still about safety science, does not immediately look like it without checking other slides.</p>

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/xplorlabs_presenting.jpg" title="Giving a presentation as AZSTA, Mesa, Arizona" class="img-fluid rounded z-depth-1" %}
    <p style="font-size:.74rem;color:#888;margin-top:6px;line-height:1.45;">Giving a presentation as AZSTA, Mesa, Arizona.</p>
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/xplorlabs_podium.jpg" title="Presenting research at a professional conference" class="img-fluid rounded z-depth-1" %}
    <p style="font-size:.74rem;color:#888;margin-top:6px;line-height:1.45;">Also presenting alongside participants at NSTA in Philadelphia.</p>
  </div>
</div>

<p style="font-size:.95rem;line-height:1.75;color:#444;margin-top:1.4rem;">I focused the stakeholder presentation around the evaluation questions and logic model that had framed the work from the beginning. Where the data told a more complex story than a clean summary would convey, I made that complexity explicit and showed what it meant for future product and program decisions in the form of recommendations. Unfortunately, I cannot share the findings and will leave this section here.</p>
</div>

<hr class="xp-divider">

<!-- ═══ GALLERY ═══════════════════════════════════════ -->
<div id="xp-gal" class="xp-section xp-reveal">
<span class="xp-label">Gallery</span>
<h2>From the Field</h2>
<p style="font-size:.85rem;color:#888;margin-bottom:1.2rem;">Hover any image for context. Participants&rsquo; faces obscured where applicable.</p>

<div class="xp-gallery">
  <figure class="xp-gal-item">
    <img src="{{ '/assets/img/xplorlabs_workshop.jpg' | relative_url }}" alt="Educators in a hands-on science session at the Fellowship Summit" loading="lazy">
    <figcaption class="xp-gal-cap">Participants engaged in a hands-on safety science session at the Fellowship Summit at UPenn; an exciting trip we all made all the way from Arizona to Philly. I did not eat Philly steaks unfortunately.</figcaption>
  </figure>
  <figure class="xp-gal-item">
    <img src="{{ '/assets/img/xplorlabs_ranalysis.png' | relative_url }}" alt="R analysis pipeline" loading="lazy">
    <figcaption class="xp-gal-cap">The R analysis environment: survey data pipeline, Welch&rsquo;s t-test code, and a pre/post boxplot for a confidence measure. Statistical values redacted.</figcaption>
  </figure>
  <figure class="xp-gal-item">
    <img src="{{ '/assets/img/xplorlabs_atlanta.jpg' | relative_url }}" alt="Atlanta, Georgia" loading="lazy">
    <figcaption class="xp-gal-cap">Atlanta, Georgia, where we had the national research symposium.</figcaption>
  </figure>
  <figure class="xp-gal-item">
    <img src="{{ '/assets/img/xplorlabs_podium.jpg' | relative_url }}" alt="Presenting at a research conference" loading="lazy">
    <figcaption class="xp-gal-cap">Presenting research at NSTA, Philly.</figcaption>
  </figure>
</div>
</div>

<hr class="xp-divider">

<!-- ═══ REFLECTION ════════════════════════════════════ -->
<div id="xp-ref" class="xp-section xp-reveal">
<span class="xp-label">Reflection</span>
<h2>What I Carry Forward</h2>

<blockquote class="xp-pull">
  Product evaluation is user research with higher stakes and a harder audience. The participants are the users. The platform is the product. The logic model is the research question. The report is the deliverable. The job, in every case, is to understand people well enough to say something useful about them, and honest enough to say it even when it complicates the story the product team came in hoping to hear.
</blockquote>

<div class="xp-body">
  <p>This project clarified something I had suspected but not tested at this scale: the decisions that most shape an evaluation&rsquo;s validity are made before any data is collected. Which constructs to measure, which instrument to adapt, what to observe rather than quantify. Those choices ripple through everything that follows. Getting them right requires genuine familiarity with the product and its adoption context, not just command of the methodological toolkit.</p>
  <p>Running quantitative and qualitative pipelines in parallel forces a kind of interpretive discipline you don&rsquo;t get from either method alone. When the two strands agreed, I gained confidence. Better still, I had less doubt. When they disagreed, I had to sit with the tension until I understood why. That investigation almost always produced a more precise account of the adoption experience than either strand would have suggested on its own. Even when both methods produce contesting results, that could also be valuable, but that was not the case for this project.</p>
  <p>While I have led and participated in several month-long projects, this is the longest project I have been fully immersed in all the way; although I was part of the cohort before this particular one I am reporting about and also the one after it; I was not taking leading role in those. This was a one-shot opportunity.</p>
</div>

<div class="xp-tags">
  <span class="xp-tag">Product Research</span>
  <span class="xp-tag">Mixed Methods</span>
  <span class="xp-tag">Program Evaluation</span>
  <span class="xp-tag">T-STEM Instrument</span>
  <span class="xp-tag">Braun &amp; Clarke TA</span>
  <span class="xp-tag">Welch&rsquo;s t-Test</span>
  <span class="xp-tag">R / ggplot2</span>
  <span class="xp-tag">Focus Groups</span>
  <span class="xp-tag">Artifact Analysis</span>
  <span class="xp-tag">Research Storytelling</span>
  <span class="xp-tag">Data Triangulation</span>
  <span class="xp-tag">Stakeholder Communication</span>
</div>
</div>

<!-- ═══ CALL TO ACTION ════════════════════════════════ -->
<div id="xp-cta" class="xp-cta xp-reveal">
  <h2>Let&rsquo;s Talk</h2>
  <p>I am actively looking for <span style="background:rgba(255,198,39,.25);color:#fff;font-weight:900;padding:2px 8px;border-radius:4px;font-size:1rem;">UX Researcher</span> or <span style="background:rgba(255,198,39,.25);color:#fff;font-weight:900;padding:2px 8px;border-radius:4px;font-size:1rem;">Research Scientist</span> roles and would be happy to connect. If my work resonates with what your team is building, reach out at <span style="background:#FFC627;color:#111;font-weight:900;padding:2px 10px;border-radius:4px;font-size:.95rem;letter-spacing:.02em;">eadeloju[at]asu[dot]edu</span>. You can also visit my homepage to see my full CV and other work.</p>
  <a href="{{ '/' | relative_url }}" class="xp-cta-link outline">View My Homepage &amp; CV</a>
  <a href="mailto:eadeloju@asu.edu" class="xp-cta-link">Get in Touch</a>
</div>

<script>
(function(){

/* Full-bleed hero */
function fillHero(){
  var h=document.querySelector('.xp-hero'); if(!h) return;
  var off=h.getBoundingClientRect().left+(window.pageXOffset||0);
  h.style.marginLeft='-'+off+'px';
  h.style.width=window.innerWidth+'px';
}
fillHero();
window.addEventListener('resize',fillHero);

/* Typewriter — single line only */
var lines=['A mixed-methods program evaluation of educator platform adoption.'];
var tw=document.getElementById('xp-tw'); var li=0,ci=0,txt='';
function type(){
  if(!tw||li>=lines.length) return;
  if(ci<lines[li].length){ txt+=lines[li].charAt(ci++); tw.textContent=txt; setTimeout(type,34); }
}
setTimeout(type,700);

/* Count-up chips */
function countUp(el){
  var t=parseInt(el.dataset.t,10),s=el.dataset.s,v=0,step=t/56;
  (function tick(){ v+=step; if(v<t){ el.textContent=Math.floor(v)+s; requestAnimationFrame(tick); } else { el.textContent=t+s; } })();
}
setTimeout(function(){ document.querySelectorAll('.xpc').forEach(countUp); },900);

/* Scroll reveal */
var ro=new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('xp-in'); ro.unobserve(e.target); } });
},{threshold:0.10});
document.querySelectorAll('.xp-reveal').forEach(function(el){ ro.observe(el); });

/* SVG architecture animation */
var arch=document.getElementById('xp-arch-el');
if(arch){
  var ao=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('anim'); ao.unobserve(e.target); } });
  },{threshold:0.25});
  ao.observe(arch);
}

/* ---- INTERACTIVE BURST CHART ---- */
var methods=[
  {name:'T-STEM Survey',          short:'T-STEM',       color:'#8C1D40', dims:[1,1,1,0],
   desc:'I adapted the validated T-STEM scale to measure educator confidence, attitudes, and knowledge at three time points across the program year. I added new items for constructs the original instrument did not cover.'},
  {name:'Focus Group Interviews', short:'Focus Groups',  color:'#1a3a5c', dims:[1,1,1,1],
   desc:'I designed and facilitated structured focus group sessions with both educator cohorts to surface adoption mechanisms, platform experience, and plans for sustained use after the fellowship ended.'},
  {name:'Artifact Analysis',      short:'Artifacts',     color:'#1e5631', dims:[0,0,1,1],
   desc:'I coded educator-produced instructional materials from first draft to final version to trace how platform integration evolved longitudinally across the program year.'},
  {name:"Welch's t-Tests (R)",   short:'t-Tests (R)',   color:'#b75a00', dims:[1,0,1,0],
   desc:'I ran independent-samples Welch\'s t-tests in R with ggplot2 visualizations to measure pre/post shifts without the equal-variance assumption, a more defensible choice for this participant profile.'},
  {name:'Thematic Analysis',      short:'Thematic TA',  color:'#5b2c8b', dims:[1,1,1,1],
   desc:'I applied Braun & Clarke\'s six-phase reflexive thematic analysis to all focus group transcripts, moving through familiarization, coding, theme generation, review, definition, and write-up.'},
  {name:'Logic Model Framework',  short:'Logic Model',  color:'#2c6e87', dims:[0,0,1,1],
   desc:'The program logic model served as my organizing framework, grounding evaluation questions in program theory and ensuring my recommendations were legible to program and product stakeholders.'}
];
var dimNames=['Confidence','Attitudes','Knowledge','Application'];
var dimColors=['#8C1D40','#1a3a5c','#1e5631','#b75a00'];

var svg=document.getElementById('xp-burst-svg');
var legend=document.getElementById('xp-burst-legend');
var detail=document.getElementById('xp-burst-detail');
if(!svg||!legend||!detail) return;

var NS='http://www.w3.org/2000/svg';
var cx=140,cy=140,ro=128,ri=58,n=methods.length;
var TAU=2*Math.PI, gap=0.03;
var slices=[];

function pt(a,r){ return [(cx+r*Math.cos(a)).toFixed(2),(cy+r*Math.sin(a)).toFixed(2)]; }

function makePath(i,scale){
  var seg=TAU/n, a0=-Math.PI/2+i*seg+gap/2, a1=a0+seg-gap;
  var o0=pt(a0,ro*scale),o1=pt(a1,ro*scale),i1=pt(a1,ri*scale),i0=pt(a0,ri*scale);
  return 'M'+o0.join(',')+'A'+(ro*scale)+','+(ro*scale)+' 0 0 1 '+o1.join(',')
        +'L'+i1.join(',')+'A'+(ri*scale)+','+(ri*scale)+' 0 0 0 '+i0.join(',')+'Z';
}

methods.forEach(function(m,i){
  var seg=TAU/n, a0=-Math.PI/2+i*seg+gap/2, a1=a0+seg-gap;
  var mid=(a0+a1)/2, lr=(ro+ri)/2;

  var path=document.createElementNS(NS,'path');
  path.setAttribute('d',makePath(i,1));
  path.setAttribute('fill',m.color);
  path.setAttribute('opacity','0.82');
  path.style.transition='d .18s ease, opacity .18s, transform .18s';
  path.style.transformOrigin=cx+'px '+cy+'px';
  path.style.cursor='pointer';
  svg.appendChild(path);

  /* short label inside slice — only if large enough (always 60deg so fine) */
  var lx=(cx+lr*Math.cos(mid)).toFixed(1), ly=(cy+lr*Math.sin(mid)).toFixed(1);
  var txt=document.createElementNS(NS,'text');
  txt.setAttribute('x',lx); txt.setAttribute('y',ly);
  txt.setAttribute('text-anchor','middle'); txt.setAttribute('dominant-baseline','middle');
  txt.setAttribute('font-size','8.5'); txt.setAttribute('font-weight','800');
  txt.setAttribute('fill','#fff'); txt.setAttribute('pointer-events','none');
  txt.setAttribute('font-family','-apple-system,sans-serif');
  /* break short name onto 2 lines if needed */
  var words=m.short.split(' ');
  if(words.length===1){
    txt.textContent=words[0];
  } else {
    var t1=document.createElementNS(NS,'tspan');
    t1.setAttribute('x',lx); t1.setAttribute('dy','-0.55em');
    t1.textContent=words.slice(0,Math.ceil(words.length/2)).join(' ');
    var t2=document.createElementNS(NS,'tspan');
    t2.setAttribute('x',lx); t2.setAttribute('dy','1.2em');
    t2.textContent=words.slice(Math.ceil(words.length/2)).join(' ');
    txt.appendChild(t1); txt.appendChild(t2);
  }
  svg.appendChild(txt);
  slices.push({path:path});

  function activate(){
    slices.forEach(function(s,j){
      s.path.setAttribute('opacity', j===i ? '1' : '0.45');
      s.path.style.transform = j===i ? 'scale(1.07)' : '';
    });
    showBurstDetail(i);
  }
  path.addEventListener('mouseenter',activate);
  path.addEventListener('click',activate);

  /* legend item */
  var li=document.createElement('div');
  li.className='xp-burst-leg-item';
  li.innerHTML='<span class="xp-burst-leg-swatch" style="background:'+m.color+'"></span>'+m.name;
  li.addEventListener('click',function(){ activate(); });
  legend.appendChild(li);
});

/* center label */
var cTxt=document.createElementNS(NS,'text');
cTxt.setAttribute('x',cx); cTxt.setAttribute('y',cy-5);
cTxt.setAttribute('text-anchor','middle'); cTxt.setAttribute('font-size','10');
cTxt.setAttribute('font-weight','700'); cTxt.setAttribute('fill','#aaa');
cTxt.setAttribute('font-family','-apple-system,sans-serif'); cTxt.textContent='6';
var cTxt2=document.createElementNS(NS,'text');
cTxt2.setAttribute('x',cx); cTxt2.setAttribute('y',cy+8);
cTxt2.setAttribute('text-anchor','middle'); cTxt2.setAttribute('font-size','9');
cTxt2.setAttribute('fill','#aaa'); cTxt2.setAttribute('font-family','-apple-system,sans-serif');
cTxt2.textContent='methods';
svg.appendChild(cTxt); svg.appendChild(cTxt2);

svg.addEventListener('mouseleave',function(){
  slices.forEach(function(s){ s.path.setAttribute('opacity','0.82'); s.path.style.transform=''; });
});

function showBurstDetail(i){
  var m=methods[i];
  var dimHtml=dimNames.map(function(d,j){
    var on=m.dims[j];
    return '<span class="xp-dim-badge" style="background:'+(on?dimColors[j]:'#f0f0f0')+';color:'+(on?'#fff':'#bbb')+';border:1px solid '+(on?dimColors[j]:'#e0e0e0')+';">'+
      (on?'&#10003; ':'')+d+'</span>';
  }).join('');
  detail.innerHTML='<h4 style="margin:0 0 .35rem;color:'+m.color+';">'+m.name+'</h4>'
    +'<p>'+m.desc+'</p>'
    +'<div><span style="font-size:.65rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#999;">Dimensions covered</span>'
    +'<div style="margin-top:.4rem;">'+dimHtml+'</div></div>';
  detail.style.borderLeftColor=m.color;
}

/* Timeline phase toggle */
var activePh=-1;
window.xpPh=function(idx,btn){
  var btns=document.querySelectorAll('.xp-phase-btn');
  var panels=document.querySelectorAll('.xp-phase-detail');
  if(activePh===idx){
    panels[idx].classList.remove('active');
    btn.classList.remove('active');
    activePh=-1; return;
  }
  btns.forEach(function(b){ b.classList.remove('active'); });
  panels.forEach(function(p){ p.classList.remove('active'); });
  btn.classList.add('active');
  panels[idx].classList.add('active');
  activePh=idx;
};

/* Sidenav scroll-spy */
var ids=['xp-top','xp-lens','xp-arch','xp-role','xp-matrix','xp-tl','xp-an','xp-rec','xp-gal','xp-ref','xp-cta'];
var nl=document.querySelectorAll('.xp-sidenav a');
window.addEventListener('scroll',function(){
  var sy=window.pageYOffset+140,cur=ids[0];
  ids.forEach(function(id){ var el=document.getElementById(id); if(el&&el.offsetTop<=sy) cur=id; });
  nl.forEach(function(a){ a.classList.toggle('xpa',a.getAttribute('href')==='#'+cur); });
},{passive:true});

})();
</script>

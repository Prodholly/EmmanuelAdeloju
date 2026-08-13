---
layout: page
title: "Designing in Uncertainty"
description: "A practitioner inquiry into how GenAI can serve as a creative partner — not a shortcut — in a graduate seminar grounded in the Five Spaces of Design in Education. Published in the Journal of Instructional Design and Technology, 2026."
img: assets/img/llmprediction.jpg
importance: 1
category: research
---

<style>
/* =========================================
   JIDT PAPER PAGE — DESIGNING IN UNCERTAINTY
   ========================================= */

.post > header.post-header { display: none !important; }
body { overflow-x: hidden; }

:root {
  --jd-navy:    #1b2a4a;
  --jd-indigo:  #2d4373;
  --jd-amber:   #c8860a;
  --jd-gold:    #f0b429;
  --jd-cream:   #fdf8f0;
  --jd-light:   #f5f3ef;
  --jd-border:  #e2d9c8;
  --jd-text:    #2a2a2a;
  --jd-muted:   #5a5a5a;
  --jd-r:       10px;
}

/* ---- REVEAL ---- */
.jd-reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity .65s cubic-bezier(.22,.68,0,1.2),
              transform .65s cubic-bezier(.22,.68,0,1.2);
}
.jd-reveal.jd-in { opacity: 1; transform: translateY(0); }
.jd-reveal.d1 { transition-delay: .06s; }
.jd-reveal.d2 { transition-delay: .14s; }
.jd-reveal.d3 { transition-delay: .22s; }
.jd-reveal.d4 { transition-delay: .30s; }
.jd-reveal.d5 { transition-delay: .38s; }

/* ---- HERO ---- */
.jd-hero {
  position: relative;
  min-height: 520px;
  background: linear-gradient(135deg, var(--jd-navy) 0%, var(--jd-indigo) 55%, #3a5298 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 3rem;
  overflow: hidden;
}
.jd-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
}
.jd-hero-inner {
  position: relative;
  max-width: 780px;
}
.jd-journal-badge {
  display: inline-block;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.25);
  color: var(--jd-gold);
  font-size: .75rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  padding: .35rem 1rem;
  border-radius: 50px;
  margin-bottom: 1.6rem;
}
.jd-hero h1 {
  color: #fff;
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: .6rem;
}
.jd-hero-sub {
  color: var(--jd-gold);
  font-size: 1.05rem;
  font-style: italic;
  margin-bottom: 1.6rem;
}
.jd-hero-authors {
  color: rgba(255,255,255,.75);
  font-size: .88rem;
  margin-bottom: 2rem;
}
.jd-hero-meta {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.jd-hero-meta span {
  color: rgba(255,255,255,.6);
  font-size: .82rem;
  display: flex;
  align-items: center;
  gap: .4rem;
}
.jd-hero-meta span::before {
  content: '▸';
  color: var(--jd-gold);
}
.jd-doi-btn {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  background: var(--jd-amber);
  color: #fff !important;
  text-decoration: none !important;
  font-weight: 700;
  font-size: .85rem;
  padding: .65rem 1.4rem;
  border-radius: 50px;
  margin-top: 1.8rem;
  transition: background .2s, transform .15s;
}
.jd-doi-btn:hover { background: var(--jd-gold); transform: translateY(-2px); }

/* ---- SECTION WRAPPER ---- */
.jd-section {
  max-width: 860px;
  margin: 0 auto 3.5rem;
  padding: 0 1.5rem;
}
.jd-section-label {
  display: flex;
  align-items: center;
  gap: .7rem;
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--jd-amber);
  margin-bottom: 1rem;
}
.jd-section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--jd-border);
}
.jd-section h2 {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--jd-navy);
  margin-bottom: 1rem;
  line-height: 1.3;
}
.jd-section p {
  font-size: 1rem;
  color: var(--jd-text);
  line-height: 1.75;
  margin-bottom: 1rem;
}

/* ---- ABSTRACT CARD ---- */
.jd-abstract {
  background: var(--jd-cream);
  border-left: 4px solid var(--jd-amber);
  border-radius: 0 var(--jd-r) var(--jd-r) 0;
  padding: 1.6rem 2rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--jd-muted);
  line-height: 1.8;
}

/* ---- FIVE SPACES GRID ---- */
.jd-spaces-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}
.jd-space-card {
  background: var(--jd-cream);
  border: 1px solid var(--jd-border);
  border-radius: var(--jd-r);
  padding: 1.2rem 1rem;
  text-align: center;
  transition: transform .2s, box-shadow .2s;
}
.jd-space-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(27,42,74,.12);
}
.jd-space-icon {
  font-size: 1.8rem;
  margin-bottom: .5rem;
}
.jd-space-name {
  font-weight: 800;
  font-size: .92rem;
  color: var(--jd-navy);
  margin-bottom: .3rem;
}
.jd-space-desc {
  font-size: .8rem;
  color: var(--jd-muted);
  line-height: 1.5;
}

/* ---- PARTICIPANT BANNER ---- */
.jd-participant-banner {
  background: linear-gradient(135deg, var(--jd-navy) 0%, var(--jd-indigo) 100%);
  border-radius: var(--jd-r);
  padding: 2rem;
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
}
.jd-stat {
  text-align: center;
  color: #fff;
}
.jd-stat-num {
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--jd-gold);
  line-height: 1;
}
.jd-stat-label {
  font-size: .78rem;
  color: rgba(255,255,255,.7);
  margin-top: .25rem;
  line-height: 1.4;
}
.jd-stat-divider {
  width: 1px;
  height: 50px;
  background: rgba(255,255,255,.2);
}

/* ---- ASSIGNMENT LEVELS ---- */
.jd-levels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
  margin: 2rem 0;
}
.jd-level-card {
  border-radius: var(--jd-r);
  padding: 1.4rem 1.2rem;
  position: relative;
  overflow: hidden;
}
.jd-level-card.micro  { background: #eef5fb; border: 1px solid #c5ddf0; }
.jd-level-card.meso   { background: #f0f4ff; border: 1px solid #c5cfed; }
.jd-level-card.macro  { background: #fff8ec; border: 1px solid #f0d99a; }
.jd-level-tag {
  font-size: .7rem;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  padding: .2rem .6rem;
  border-radius: 50px;
  display: inline-block;
  margin-bottom: .7rem;
}
.micro  .jd-level-tag { background: #1a6b9a; color: #fff; }
.meso   .jd-level-tag { background: #3a52a3; color: #fff; }
.macro  .jd-level-tag { background: var(--jd-amber); color: #fff; }
.jd-level-title {
  font-weight: 700;
  font-size: .97rem;
  color: var(--jd-navy);
  margin-bottom: .4rem;
}
.jd-level-desc {
  font-size: .85rem;
  color: var(--jd-muted);
  line-height: 1.55;
}

/* ---- VIBE CODE ARTIFACTS ---- */
.jd-artifacts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: .9rem;
  margin: 1.5rem 0;
}
.jd-artifact-chip {
  background: var(--jd-light);
  border: 1px solid var(--jd-border);
  border-radius: 8px;
  padding: .7rem 1rem;
  font-size: .84rem;
  color: var(--jd-navy);
  display: flex;
  align-items: center;
  gap: .6rem;
}
.jd-artifact-chip span:first-child {
  font-size: 1.1rem;
}

/* ---- QUOTE BLOCK ---- */
.jd-quote {
  border-left: 3px solid var(--jd-gold);
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  background: var(--jd-cream);
  border-radius: 0 var(--jd-r) var(--jd-r) 0;
}
.jd-quote p {
  font-style: italic;
  color: var(--jd-muted);
  font-size: .97rem;
  margin: 0;
}

/* ---- FINDING CARD ---- */
.jd-finding {
  background: linear-gradient(135deg, var(--jd-navy), var(--jd-indigo));
  border-radius: var(--jd-r);
  padding: 2.2rem 2rem;
  text-align: center;
  color: #fff;
  margin: 2rem 0;
}
.jd-finding-heading {
  font-size: .7rem;
  font-weight: 800;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: var(--jd-gold);
  margin-bottom: 1rem;
}
.jd-finding p {
  font-size: 1.15rem;
  line-height: 1.7;
  color: rgba(255,255,255,.92);
  max-width: 620px;
  margin: 0 auto;
}

/* ---- UXR TRANSFER SECTION ---- */
.jd-uxr-section {
  background: var(--jd-cream);
  border: 1px solid var(--jd-border);
  border-radius: var(--jd-r);
  padding: 2rem;
  margin: 2rem 0;
}
.jd-uxr-section h3 {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--jd-navy);
  margin-bottom: .3rem;
}
.jd-uxr-note {
  font-size: .85rem;
  color: var(--jd-muted);
  font-style: italic;
  margin-bottom: 1.4rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--jd-border);
}
.jd-transfer-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.jd-transfer-list li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: .7rem;
  align-items: start;
}
.jd-transfer-icon {
  width: 28px;
  height: 28px;
  background: var(--jd-amber);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .85rem;
  flex-shrink: 0;
  margin-top: 2px;
}
.jd-transfer-text strong {
  display: block;
  font-size: .92rem;
  color: var(--jd-navy);
  font-weight: 700;
  margin-bottom: .2rem;
}
.jd-transfer-text span {
  font-size: .85rem;
  color: var(--jd-muted);
  line-height: 1.55;
}

/* ---- FOOTER CTA ---- */
.jd-cta {
  background: var(--jd-navy);
  border-radius: var(--jd-r);
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
}
.jd-cta h3 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: .5rem;
}
.jd-cta p {
  color: rgba(255,255,255,.65);
  font-size: .88rem;
  margin-bottom: 1.2rem;
}
.jd-cta a {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  background: var(--jd-amber);
  color: #fff !important;
  text-decoration: none !important;
  font-weight: 700;
  font-size: .88rem;
  padding: .65rem 1.5rem;
  border-radius: 50px;
  transition: background .2s;
}
.jd-cta a:hover { background: var(--jd-gold); }

@media (max-width: 600px) {
  .jd-stat-divider { display: none; }
  .jd-participant-banner { gap: 1rem; }
}
</style>

<!-- ======================================================
     HERO
     ====================================================== -->
<div class="jd-hero jd-reveal">
  <div class="jd-hero-inner">
    <div class="jd-journal-badge">Journal of Instructional Design and Technology · 2026</div>
    <h1>Designing in Uncertainty</h1>
    <div class="jd-hero-sub">GenAI and Creative Agency in a Graduate Seminar</div>
    <div class="jd-hero-authors">
      Emmanuel Adeloju &nbsp;·&nbsp; Punya Mishra &nbsp;·&nbsp; Lindsey McCaleb &nbsp;·&nbsp; Nicole Oster<br>
      <small style="opacity:.7">Mary Lou Fulton College for Teaching and Learning Innovation, Arizona State University</small>
    </div>
    <div class="jd-hero-meta">
      <span>Vol. 1, Issue 2, pp. 1–7</span>
      <span>IRB Approved</span>
      <span>Practitioner Inquiry</span>
      <span>Design-Based Pedagogy</span>
    </div>
    <a class="jd-doi-btn" href="https://doi.org/10.65201/RKHM9093" target="_blank">
      Read Full Paper ↗
    </a>
  </div>
</div>

<!-- ======================================================
     ABSTRACT
     ====================================================== -->
<div class="jd-section jd-reveal d1">
  <div class="jd-section-label">The Argument</div>
  <h2>Making GenAI Educational Is a Design Act</h2>
  <div class="jd-abstract">
    Generative AI has arrived in education faster than educators can make sense of it — and the dominant responses, prohibition or uncritical adoption, both miss a fundamental point: AI was not designed for educational purposes. Making it educational is a design act, one that demands comfort with uncertainty, iterative reasoning, and creative agency. This paper examines a graduate-level course grounded in the Five Spaces of Design in Education framework, positioning educators and learners as designers operating across multiple levels of an educational ecosystem.
  </div>
  <p>We argue that design-centered approaches cultivate the creative agency needed to act with purpose when the ground is shifting — precisely the disposition educators need in an era defined by technological uncertainty.</p>
</div>

<!-- ======================================================
     FIVE SPACES FRAMEWORK
     ====================================================== -->
<div class="jd-section jd-reveal d2">
  <div class="jd-section-label">Conceptual Framework</div>
  <h2>Five Spaces of Design in Education</h2>
  <p>The course was grounded in this framework (Mishra et al., 2018), which treats education as a complex design problem — not a content delivery problem. GenAI was positioned as a creative partner within each space, not as a standalone tool.</p>

  <div class="jd-spaces-grid">
    <div class="jd-space-card">
      <div class="jd-space-icon">🧱</div>
      <div class="jd-space-name">Artifacts</div>
      <div class="jd-space-desc">The materials that mediate learning — assignments, tools, platforms, and AI-generated outputs</div>
    </div>
    <div class="jd-space-card">
      <div class="jd-space-icon">⚙️</div>
      <div class="jd-space-name">Processes</div>
      <div class="jd-space-desc">Pedagogical structures, sequencing, facilitation, and the iterative design of learning</div>
    </div>
    <div class="jd-space-card">
      <div class="jd-space-icon">🌀</div>
      <div class="jd-space-name">Experiences</div>
      <div class="jd-space-desc">How learners encounter and make meaning through participation and interaction over time</div>
    </div>
    <div class="jd-space-card">
      <div class="jd-space-icon">🏛️</div>
      <div class="jd-space-name">Systems</div>
      <div class="jd-space-desc">Institutional arrangements, policies, and infrastructures that enable or constrain design</div>
    </div>
    <div class="jd-space-card">
      <div class="jd-space-icon">🌐</div>
      <div class="jd-space-name">Culture</div>
      <div class="jd-space-desc">Shared values, assumptions, and ways of being that shape how design and learning are understood</div>
    </div>
  </div>
</div>

<!-- ======================================================
     THE PARTICIPANTS
     ====================================================== -->
<div class="jd-section jd-reveal d2">
  <div class="jd-section-label">Who Was in the Room</div>
  <h2>A Deliberately Heterogeneous Learning Community</h2>
  <p>The course brought together participants across age, discipline, and institutional role — all working as equals in a shared, open, public space on campus. This diversity was not incidental; it was a core design feature.</p>

  <div class="jd-participant-banner">
    <div class="jd-stat">
      <div class="jd-stat-num">25</div>
      <div class="jd-stat-label">Total participants</div>
    </div>
    <div class="jd-stat-divider"></div>
    <div class="jd-stat">
      <div class="jd-stat-num">14</div>
      <div class="jd-stat-label">Weeks, once per week<br><small>(Fall 2025)</small></div>
    </div>
    <div class="jd-stat-divider"></div>
    <div class="jd-stat">
      <div class="jd-stat-num">4</div>
      <div class="jd-stat-label">Participant roles:<br><small>High school students,<br>Master's, Doctoral, Faculty</small></div>
    </div>
    <div class="jd-stat-divider"></div>
    <div class="jd-stat">
      <div class="jd-stat-num">IRB</div>
      <div class="jd-stat-label">Approved study<br><small>Ethical data collection</small></div>
    </div>
  </div>

  <div class="jd-quote">
    <p>"We had people with different careers, different life stories, different ages, and yet it never felt uncomfortable or intimidating. If anything, that diversity made discussions richer and made me learn more from my classmates than I expected."</p>
  </div>
</div>

<!-- ======================================================
     COURSE DESIGN: THREE SCALES
     ====================================================== -->
<div class="jd-section jd-reveal d3">
  <div class="jd-section-label">Course Design</div>
  <h2>Three Scales of Design Work</h2>
  <p>Assignments were structured across three levels of complexity and scope, with GenAI integrated as a creative partner at every level — not as an optional supplement, but as the medium through which students documented, reflected, and designed.</p>

  <div class="jd-levels">
    <div class="jd-level-card micro">
      <div class="jd-level-tag">Micro</div>
      <div class="jd-level-title">Weekly Reflection & Noticing</div>
      <div class="jd-level-desc">Students identified good and bad designs in their everyday environments, submitted curiosities before each class, and produced AfterClass Rapid Reflections — creative AI-assisted snapshots of each session (podcasts, poems, videos, infographics).</div>
    </div>
    <div class="jd-level-card meso">
      <div class="jd-level-tag">Meso</div>
      <div class="jd-level-title">Group Design Challenges</div>
      <div class="jd-level-desc">AI-sponsored commercials for fictional companies, short video reels introducing design theorists, and a real challenge from the Vice Provost's office: reimagine distributed learning for populations historically excluded from higher education.</div>
    </div>
    <div class="jd-level-card macro">
      <div class="jd-level-tag">Macro</div>
      <div class="jd-level-title">Semester-Long Design Project</div>
      <div class="jd-level-desc">Each student identified a self-chosen educational design problem and used AI to iteratively prototype a solution. This included Vibe Coding for Learning — building functional simulations, apps, and websites with AI assistance. The semester ended with a public AI Carnival.</div>
    </div>
  </div>
</div>

<!-- ======================================================
     VIBE CODING
     ====================================================== -->
<div class="jd-section jd-reveal d3">
  <div class="jd-section-label">Vibe Coding for Learning</div>
  <h2>Students Built Real Things With AI</h2>
  <p>One of the distinctive macro-level assignments was <em>Vibe Coding for Learning</em> — where students used GenAI tools to design and build functional digital artifacts for educational purposes, whether or not they identified as "coders." By semester's end, students had shipped minimum viable products across a wide range of domains:</p>

  <div class="jd-artifacts-grid">
    <div class="jd-artifact-chip"><span>🎵</span> Music therapy self-regulation game</div>
    <div class="jd-artifact-chip"><span>🍎</span> Calorie tracking application</div>
    <div class="jd-artifact-chip"><span>🌌</span> Interstellar exploration simulator</div>
    <div class="jd-artifact-chip"><span>🎸</span> JianPu notation interactive tool</div>
    <div class="jd-artifact-chip"><span>🏛️</span> Historical technology museum</div>
    <div class="jd-artifact-chip"><span>🌿</span> Carbon footprint calculator</div>
    <div class="jd-artifact-chip"><span>🌐</span> Web-building educational tools</div>
    <div class="jd-artifact-chip"><span>📱</span> Interactive learning apps</div>
  </div>

  <div class="jd-quote">
    <p>"I felt overwhelmed and unsure where to start… Later, when the JianPu notation in my early prototypes turned out to be incorrect and I had to negotiate with Claude to fix it."</p>
  </div>

  <p>These artifacts were presented publicly at the <strong>AI Carnival</strong> — a capstone showcase co-organized by students and faculty, open to high school students, teachers, community members, and researchers. Making the work public was not a bonus; it was structural. Design becomes complete when users interact with it.</p>
</div>

<!-- ======================================================
     CORE FINDING
     ====================================================== -->
<div class="jd-section jd-reveal d4">
  <div class="jd-section-label">Core Finding</div>
  <div class="jd-finding">
    <div class="jd-finding-heading">What the students left with</div>
    <p>Students in this course did not emerge with settled answers about GenAI in education. They emerged with something more durable: the capacity to inquire, construct, communicate, and express in the face of the unknown — the creative agency to engage in design, to devise courses of action aimed at changing existing situations into preferred ones.</p>
  </div>

  <p>Uncertainty was not an obstacle. It was the condition of the work. The course demonstrated that a design disposition does not promise to eliminate technological uncertainty — it treats uncertainty as something to work with, not around.</p>
</div>

<!-- ======================================================
     UXR LENS — WHAT TRANSFERS
     ====================================================== -->
<div class="jd-section jd-reveal d4">
  <div class="jd-section-label">Honest Reflection</div>
  <h2>What This Offers a UXR Lens</h2>

  <div class="jd-uxr-section">
    <h3>This is design-centered research, not a UXR study.</h3>
    <div class="jd-uxr-note">
      The paper's core contribution is to design scholarship and educational practice — it is not framed as user research and I am not reframing it as one. But for anyone asking what transferable signals this work carries into a UXR context, here is an honest read.
    </div>

    <ul class="jd-transfer-list">
      <li>
        <div class="jd-transfer-icon">🔬</div>
        <div class="jd-transfer-text">
          <strong>IRB-approved human-subjects research</strong>
          <span>Full ethics review, consent protocols, and approved data collection from a heterogeneous group of 25 participants — the same infrastructure that grounds any responsible user study.</span>
        </div>
      </li>
      <li>
        <div class="jd-transfer-icon">👁️</div>
        <div class="jd-transfer-text">
          <strong>Naturalistic observation of human-AI interaction</strong>
          <span>Participants used GenAI tools across 14 weeks without restriction — a rare longitudinal window into how real people develop, revise, and negotiate relationships with AI systems in practice.</span>
        </div>
      </li>
      <li>
        <div class="jd-transfer-icon">📋</div>
        <div class="jd-transfer-text">
          <strong>Qualitative analysis of user reflections</strong>
          <span>Student reflection papers were used as practitioner evidence — triangulating across written reflections, created artifacts, and observed behavior. Structurally similar to analyzing open-ended survey responses and think-aloud data.</span>
        </div>
      </li>
      <li>
        <div class="jd-transfer-icon">🗂️</div>
        <div class="jd-transfer-text">
          <strong>Participant diversity as a research design feature</strong>
          <span>The heterogeneous composition (age, discipline, role) was intentional, not incidental — the equivalent of deliberately recruiting a diverse participant panel to surface a wider range of behaviors and perspectives.</span>
        </div>
      </li>
      <li>
        <div class="jd-transfer-icon">🔄</div>
        <div class="jd-transfer-text">
          <strong>Iterative prototyping as observable behavior</strong>
          <span>The vibe coding assignment captured novice users designing and iterating on functional digital products with AI assistance — essentially a longitudinal study of how non-technical users navigate AI-assisted product creation.</span>
        </div>
      </li>
      <li>
        <div class="jd-transfer-icon">💡</div>
        <div class="jd-transfer-text">
          <strong>Mental model shifts under uncertainty</strong>
          <span>The paper tracks how participants' understanding of AI tools evolved over the course — from anxiety and over-reliance to confident negotiation. That arc is a substantive finding about how users develop fluency with AI products.</span>
        </div>
      </li>
    </ul>
  </div>
</div>

<!-- ======================================================
     CTA
     ====================================================== -->
<div class="jd-section jd-reveal d5">
  <div class="jd-cta">
    <h3>Read the Full Paper</h3>
    <p>Published open access in the <em>Journal of Instructional Design and Technology</em>, Vol. 1, Issue 2, 2026 · DOI: 10.65201/RKHM9093</p>
    <a href="https://doi.org/10.65201/RKHM9093" target="_blank">Access Paper ↗</a>
  </div>
</div>

<script>
(function(){
  const els = document.querySelectorAll('.jd-reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('jd-in'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
})();
</script>

---
layout: page
title: 
permalink: /
description: Science Data Sensemaking with AI — A course for educators
nav: false
nav_order: 2
---

<div class="modules-index">

## Science Data Sensemaking with AI

A comprehensive course designed to help teachers understand and effectively use Large Language Models for data analysis and sensemaking in science education.

---

<div class="modules-grid">
{% assign sorted_modules = site.modules | sort: "module_number" %}
{% for module in sorted_modules %}
<a href="{{ module.url | relative_url }}" class="module-card">
  <div class="module-card-number">Module {{ module.module_number }}</div>
  <h3 class="module-card-title">{{ module.title }}</h3>
  {% if module.description %}
  <p class="module-card-description">{{ module.description }}</p>
  {% endif %}
  <span class="module-card-link">Start Module <i class="fa-solid fa-arrow-right"></i></span>
</a>
{% endfor %}
</div>

</div>

<style>
.modules-index {
  max-width: 900px;
  margin: 0 auto;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.module-card {
  display: flex;
  flex-direction: column;
  background-color: var(--global-bg-color);
  border: 1px solid var(--global-divider-color);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.module-card:hover {
  border-color: var(--global-theme-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  text-decoration: none;
}

.module-card-number {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--global-theme-color);
  margin-bottom: 0.5rem;
}

.module-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--global-text-color);
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.module-card-description {
  font-size: 0.9rem;
  color: var(--global-text-color-light);
  line-height: 1.5;
  flex-grow: 1;
  margin-bottom: 1rem;
}

.module-card-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--global-theme-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.module-card:hover .module-card-link {
  gap: 0.75rem;
}
</style>

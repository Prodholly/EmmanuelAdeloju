---
layout: page
permalink: /publications/
title: publications
description: A list of my publications, conference presentations, talks, and other scholarly works.
nav: true
nav_order: 2
---

<!-- Bibsearch Feature -->
{% include bib_search.liquid %}

<div class="publications">

<h2 class="bibliography">Peer Reviewed Papers and Conference Proceedings</h2>
{% bibliography -q @article %}
{% bibliography -q @inproceedings %}
{% bibliography -q @incollection %}

<h2 class="bibliography">Conference and Workshop Presentations</h2>
{% bibliography -q @misc[keywords=workshop] %}
{% bibliography -q @misc[keywords=poster] %}
{% bibliography -q @conference %}
{% bibliography -q @misc[keywords=invited] %}
{% bibliography -q @techreport %}
{% bibliography -q @misc[keywords=blog] %}

</div>

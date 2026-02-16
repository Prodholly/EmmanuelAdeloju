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

<h2 class="bibliography">Journal Articles</h2>
{% bibliography -q @article %}

<h2 class="bibliography">Book Chapters</h2>
{% bibliography -q @incollection %}

<h2 class="bibliography">Peer-Reviewed Conference Papers</h2>
{% bibliography -q @inproceedings %}

<h2 class="bibliography">Conference Presentations</h2>
{% bibliography -q @conference %}

<h2 class="bibliography">Poster Presentations</h2>
{% bibliography -q @misc[keywords=poster] %}

<h2 class="bibliography">Workshop Presentations</h2>
{% bibliography -q @misc[keywords=workshop] %}

<h2 class="bibliography">Invited Talks &amp; Panels</h2>
{% bibliography -q @misc[keywords=invited] %}

<h2 class="bibliography">Reports &amp; Culminating Products</h2>
{% bibliography -q @techreport %}

</div>

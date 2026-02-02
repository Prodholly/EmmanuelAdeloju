---
layout: distill
title: "Communicate and Propose Action"
description: "Translating data investigation results into clear narratives and evidence-based recommendations that inform real-world decisions."
tags: [data communication, science communication, evidence-based decisions, data storytelling, science education]
giscus_comments: true
date: 2026-02-01
featured: true

authors:
  - name: Emmanuel Adeloju
    affiliations:
      name: Arizona State University

# Optional distill feature toggles (keep what you actually use)
mermaid:
  enabled: true
  zoomable: true
chart:
  chartjs: true
  echarts: true
  vega_lite: true
tikzjax: true

# Table of Contents
# IMPORTANT: section names MUST exactly match your Markdown headers
toc:
  - name: "Context: Using Electrical Fire Data to Inform Decisions"
  - name: "Why This Phase Matters"
  - name: "From Results to Meaning"
  - name: "Step-by-Step Communication and Action Workflow"
  - name: "Step 1: Reconnect Findings to the Original Problem"
  - name: "Step 2: Make Evidence-Based Claims"
  - name: "Step 3: Craft a Data Story"
  - name: "Step 4: Propose Actions Supported by Evidence"
  - name: "Step 5: Tailor Communication to the Audience"
  - name: "Step 6: Reflect, Revise, and Extend"
  - name: "Key Takeaway"

---

## Context: Using Electrical Fire Data to Inform Decisions

Throughout this module, we continue working with our running example of investigating electrical fire incidents, now focusing on how to communicate findings and propose evidence-based actions.

---

## Why This Phase Matters

Data investigations do not end with models or visualizations. They end when evidence is translated into understanding and action. In this phase, you connect results back to the real-world problem, craft a clear data story, and propose actions that are supported by evidence.

Communication is not an afterthought, it is part of the analysis. How results are framed, explained, and delivered directly affects whether insights are understood, trusted, and used.

---

## From Results to Meaning

At this point in the investigation, you have:

- Cleaned and explored electrical fire data
- Built and evaluated models
- Identified patterns, relationships, and uncertainty

Now, you ask:

- What do these results mean in context?
- What claims can be supported by evidence?
- What actions are reasonable given the limits of the data?

---

## Step-by-Step Communication and Action Workflow

The following six-step workflow guides the process of communicating findings and proposing evidence-based actions.

---

## Step 1: Reconnect Findings to the Original Problem

Begin by returning to the broader issue that motivated the investigation.

**Electrical fire example:**

**Broader issue:** Community safety and infrastructure reliability

**Investigative question:** How does building age relate to electrical fire incidents?

Here, explicitly connect models and visualizations back to the problem they were meant to address.

**Prompting technique:** Zero-shot prompting

> *"Summarize how the results of this analysis address the original question about electrical fire risk."*

---

## Step 2: Make Evidence-Based Claims

Translate results into claims that are directly supported by data. Each claim is paired with specific evidence.

**Example claims:**

- "Electrical fires occur more frequently in buildings older than 30 years."
- "Copper wiring appears in most incidents, but this may reflect its prevalence rather than increased risk."

Avoid overstating conclusions and clearly acknowledge uncertainty.

**Prompting technique:** Chain-of-thought prompting

> *"Step by step, distinguish which conclusions are strongly supported by the data and which are tentative."*

---

## Step 3: Craft a Data Story

Rather than presenting isolated charts, organize findings into a coherent narrative:

- The problem and why it matters
- What the data shows
- What the models suggest
- What remains uncertain

A good data story helps others follow the reasoning without needing to inspect every technical detail.

**Prompting technique:** Few-shot prompting

> *"Here are two examples of data stories used in public safety reports.*  
> *Based on these, help structure a clear narrative for the electrical fire findings."*

---

## Step 4: Propose Actions Supported by Evidence

Propose actions that are:

- Grounded in the findings
- Appropriate to the data's scope
- Explicit about limitations

**Electrical fire examples:**

- Prioritize electrical inspections in older buildings
- Target public awareness campaigns in neighborhoods with aging infrastructure
- Collect additional data on wiring condition, not just age

Actions are framed as recommendations, not prescriptions.

**Prompting technique:** Prompt chaining

**Prompt 1:**
> *"Based on these findings, list reasonable actions supported by the data."*

**Prompt 2:**
> *"For each action, explain what evidence supports it and what uncertainties remain."*

---

## Step 5: Tailor Communication to the Audience

Different stakeholders require different levels of detail and language.

**Possible audiences include:**

- Community members
- School administrators
- City officials
- Fire safety professionals

Adapt:

- Vocabulary and tone
- Visual complexity
- Format (report, infographic, slide deck, one-page guide)

**Prompting technique:** Self-consistency

> *"Explain these findings once for a technical audience and once for a general audience.*  
> *Check that both versions remain consistent with the evidence."*

---

## Step 6: Reflect, Revise, and Extend

Often, proposing actions reveals new questions:

- What data is missing?
- What assumptions need testing?
- What should be investigated next?

This phase frequently leads to:

- Revisiting earlier data
- Collecting additional information
- Framing a new investigative question

This is not failure, it is how data investigations continue.

---

## Key Takeaway

Communicating data is not about presenting results, it is about **enabling informed decisions**. In the context of electrical fire investigations, this means telling a clear, honest data story that connects evidence to action while respecting uncertainty.

**LLMs can help with:**

- Structuring narratives
- Translating findings across audiences
- Stress-testing claims and recommendations

But responsibility for interpretation, ethics, and action always remains with the investigator.

---
layout: distill
title: "Data Exploration and Visualization"
description: "Using visualization as a thinking tool to discover patterns, relationships, and uncertainties in science data investigations."
tags: [data visualization, data exploration, science education, data literacy, charts]
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
  - name: "Context: Electrical Fire Incidents and Contributing Factors"
  - name: "Why This Phase Matters"
  - name: "A Critical Stance Toward LLMs"
  - name: "Exploration and Visualization Workflow"
  - name: "Step 1: Clarify the Visualization Goal"
  - name: "Step 2: Select Chart Type and Map Variables"
  - name: "Step 3: Build a First-Draft Visualization"
  - name: "Step 4: Interpret What the Data Shows"
  - name: "Step 5: Critique the Visualization"
  - name: "Step 6: Communicate Findings"
  - name: "Step 7: Review, Revise, and Archive"
  - name: "Key Takeaway"

---

## Context: Electrical Fire Incidents and Contributing Factors

Throughout this module, we continue working with our running example of investigating electrical fire incidents, focusing on how visualization helps reveal patterns and relationships that inform our understanding of contributing factors.

---

## Why This Phase Matters

Once data has been cleaned and structured, the next step is to explore it visually. Exploration is not about proving a conclusion, it is about **discovering patterns, relationships, anomalies, and uncertainties** that help refine understanding of a real-world problem.

In investigations of electrical fires, visualization helps reveal:

- **Trends over time** (e.g., changes in incidents by year)
- **Differences across categories** (e.g., wire material, building age)
- **Relationships among variables** (e.g., wiring age and fire frequency)

This phase is closely connected to modeling and interpretation. What you see here may lead you to revise your research question, request additional data, or rethink earlier assumptions.

---

## A Critical Stance Toward LLMs

Throughout this phase, LLMs function as **idea generators and explanation partners, not authorities**.

Any chart, interpretation, or narrative produced with LLM assistance must be:

- Verified against the dataset
- Checked for misleading design choices
- Documented and cited when appropriate

---

## Exploration and Visualization Workflow

The following seven-step workflow guides the process of exploring data visually and communicating findings responsibly.

---

## Step 1: Clarify the Visualization Goal

Before creating any chart, you may restate my investigative question and decide what kind of insight you are looking for.

**Electrical fire examples:**

- Are electrical fires more common in older buildings?
- Do certain wire materials appear more frequently in fire incidents?
- Has the number of electrical fires increased or decreased over time?

Each question implies a different visualization goal:

- **Comparison** (e.g., fires by wire material)
- **Trend** (e.g., fires per year)
- **Distribution** (e.g., building ages involved in fires)
- **Relationship** (e.g., wiring age vs. fire occurrence)

**Prompting technique:** Zero-shot prompting

> *"Given this research question about electrical fire causes, what type of insight should a visualization aim to show: trend, comparison, distribution, or relationship?"*

---

## Step 2: Select Chart Type and Map Variables

Once the goal is clear, choose a chart that matches it and decide how variables map to:

- Axes (x, y)
- Color or grouping
- Size or facets
- Time windows or aggregation levels

**Examples:**

- **Bar chart:** number of fires by wire material
- **Line chart:** yearly count of electrical fires
- **Scatterplot:** building age vs. number of incidents

**Prompting technique:** Few-shot prompting

> *"Here is my data on fire safety analysis.*  
> *Based on these, suggest an appropriate chart for comparing electrical fire incidents across wire materials."*

I treat the output as a suggestion, not a final decision.

---

## Step 3: Build a First-Draft Visualization

At this stage, the goal is **exploration, not polish**.

Generate an initial chart and ask:

- What stands out?
- What surprises me?
- What looks unclear or suspicious?

**Prompting technique:** Prompt chaining

**Prompt 1:**
> *"Create a simple bar chart comparing electrical fire incidents by wire material."*

**Prompt 2:**
> *"Explain what patterns or differences are most noticeable in this chart."*

---

## Step 4: Interpret What the Data Shows

Interpretation involves describing what the data actually displays, not explaining why it happens.

Separate:

- **Observed patterns** (what the data shows)
- **Speculation or hypotheses** (possible explanations)

**Example interpretation:**

**Observed:** "Buildings with wiring older than 30 years appear more frequently in the dataset."

**Speculation:** "Older insulation materials may degrade over time, increasing fire risk."

**Prompting technique:** Chain-of-thought prompting

> *"Step by step, describe the main patterns in this electrical fire visualization.*  
> *Clearly separate observed data patterns from possible explanations. Use the attached data as context"*

---

## Step 5: Critique the Visualization

Before communicating results, check whether the visualization could mislead.

**Key questions:**

- Are axes scaled appropriately?
- Is any data hidden by aggregation?
- Are categories uneven or misleading?
- Is important context missing?

**Prompting technique:** Self-consistency

> *"Review this visualization for potential sources of misinterpretation.*  
> *Then review it again from the perspective of a skeptical reader."*

This helps surface issues you might overlook.

---

## Step 6: Communicate Findings

Once the visualization is accurate and interpretable, translate it into communication products:

- A short written results section
- A slide or poster figure
- A one-page infographic or handout

**Each figure includes:**

- A clear title
- Labeled axes with units
- A concise caption explaining what the visualization shows
- Notes on data source and processing decisions


---

## Step 7: Review, Revise, and Archive

Data visualization is rarely final on the first attempt.

You should:

- Share the visualization for peer feedback
- Revise both the chart and interpretation
- Archive the final visualization, dataset, and a brief README describing how it was created

This ensures transparency and reproducibility.

---

## Key Takeaway

Exploration and visualization are not just about presentation, they are **thinking tools**. In investigating electrical fire data, visualizations help surface relationships, challenge assumptions, and guide next steps in analysis.

LLMs can accelerate this process by suggesting options and explanations, but the responsibility for accuracy, interpretation, and ethical use always remains with the investigator.

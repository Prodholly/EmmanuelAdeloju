---
layout: distill
title: "Prompt Engineering Framework for Data Sensemaking"
description: "Introducing SENSE, a structured framework for designing prompts that support scientific data sensemaking with Large Language Models."
tags: [LLMs, prompt engineering, data sensemaking, science education, SENSE framework]
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
  - name: "What is Data Sensemaking?"
  - name: "The SENSE Framework for Data Sensemaking Prompts"
  - name: "1. Specify the Phenomenon"
  - name: "2. Establish the Data and Variables"
  - name: "3. Name the Analytical Task"
  - name: "4. Support Claims with Evidence"
  - name: "5. Examine Limitations and Uncertainty"
  - name: "Full SENSE Prompt Example (Integrated)"

---

## What is Data Sensemaking?

**Data sensemaking** is the process of engaging with data to explain, interpret, and understand a phenomenon, not just compute results.

In science education, sensemaking involves connecting numerical patterns to underlying mechanisms, evidence, and uncertainty. It moves beyond simple calculation to ask:
- What does this pattern mean?
- Why might it occur?
- What are we still uncertain about?

When working with LLMs, prompt engineering becomes the method by which we structure scientific thinking, guiding the model to reason with data in ways aligned with scientific inquiry.

---

## The SENSE Framework for Data Sensemaking Prompts

We introduce **SENSE**, a prompt engineering framework grounded in core practices of scientific investigation:

**S** — Specify the phenomenon  
**E** — Establish the data and variables  
**N** — Name the analytical task  
**S** — Support claims with evidence  
**E** — Examine limitations and uncertainty

This framework helps teachers and students move from raw data to meaningful explanations that support understanding of phenomena of interest.

---

## 1. Specify the Phenomenon

Clearly state what real-world or scientific phenomenon the data represents.

This anchors the model in **meaning, not just numbers**.

**Example (Physics):**

> *"The data represents how the period of a pendulum changes as string length increases."*

By naming the phenomenon explicitly, you help the model connect calculations to real-world scientific concepts rather than treating the data as abstract numbers.

---

## 2. Establish the Data and Variables

Explicitly describe:
- What each variable represents
- Units of measurement
- Sample size or conditions (if known)

This prevents the model from inventing assumptions.

**Example (Chemistry):**

> *"The dataset includes temperature (°C) and reaction rate (mol/s) measured across five trials."*

Providing this context ensures the model grounds its reasoning in the actual structure and constraints of your data.

---

## 3. Name the Analytical Task

State exactly what kind of sensemaking is required, not just "analyze."

**Examples of tasks:**
- Identify patterns or trends
- Compare groups
- Quantify relationships
- Interpret variability

**Example (Biology):**

> *"Identify any relationship between light intensity and plant growth rate."*

Being specific about the analytical task helps the model focus its reasoning on the appropriate type of pattern recognition or comparison.

---

## 4. Support Claims with Evidence

Require the model to tie every claim to the data, using numbers or comparisons.

This mirrors **scientific argumentation**.

**Example (Mathematics / Statistics):**

> *"Use specific values or ranges from the dataset to support each claim you make."*

This step ensures that explanations are grounded in evidence rather than general statements that could apply to any dataset.

---

## 5. Examine Limitations and Uncertainty

Prompt reflection on:
- Measurement error
- Sample size
- Missing variables
- Alternative explanations

This step models **scientific humility**.

**Example:**

> *"Identify at least one limitation of the dataset that affects how confidently we can interpret the results."*

By explicitly asking for limitations, you encourage critical thinking about the strength of conclusions and the boundaries of what the data can support.

---

## Full SENSE Prompt Example (Integrated)

**Context:** Middle school science — electrical resistance

> *"The data represents measurements of electrical resistance (ohms) for wires of different lengths (meters). The dataset includes wire length and resistance values from one classroom experiment. Analyze the relationship between wire length and resistance. Use specific data values to support your explanation. Finally, identify one limitation of this dataset that affects the strength of your conclusion."*

**Breaking down the SENSE components:**

**S — Specify the phenomenon:**  
"measurements of electrical resistance (ohms) for wires of different lengths (meters)"

**E — Establish the data and variables:**  
"wire length and resistance values from one classroom experiment"

**N — Name the analytical task:**  
"Analyze the relationship between wire length and resistance"

**S — Support claims with evidence:**  
"Use specific data values to support your explanation"

**E — Examine limitations and uncertainty:**  
"identify one limitation of this dataset that affects the strength of your conclusion"

This integrated prompt guides the LLM through a complete cycle of scientific reasoning, from phenomenon to evidence to critical reflection.

---

## Moving Forward

The SENSE framework provides a structured approach to prompt engineering that aligns with scientific thinking. By systematically incorporating these five elements, teachers can design prompts that support genuine data sensemaking rather than superficial pattern description.

In practice, not every prompt needs all five elements—but being intentional about which elements to include helps ensure that LLM outputs support rather than replace scientific reasoning.

---
layout: distill
title: "Consider Data"
description: "Learning to evaluate data sources, understand metadata, and make informed decisions about data quality and ethical implications in science investigations."
tags: [data investigation, data quality, metadata, data ethics, science education]
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
  - name: "Why This Module Matters"
  - name: "Learning Goals"
  - name: "Running Example (Continued Context)"
  - name: "Step 1: Identify the Data Needed (Before Looking at Files)"
    subsections:
      - name: "Example Variables (Electrical Fire Case)"
      - name: "LLM Support"
  - name: "Step 2: Assess Data Provenance (Where Does the Data Come From?)"
    subsections:
      - name: "Example"
      - name: "LLM Support"
  - name: "Step 3: Read and Interpret Metadata (What Does the Data Actually Represent?)"
    subsections:
      - name: "Example"
      - name: "LLM Support"
  - name: "Step 4: Consider Bias and Ethical Implications"
    subsections:
      - name: "Example"
      - name: "LLM Support"
  - name: "Step 5: Decide Whether Additional Data Is Needed"
    subsections:
      - name: "Example"
      - name: "LLM Support"
  - name: "Step 6: Choose Storage Format and Organize Data"
    subsections:
      - name: "LLM Support"
  - name: "Step 7: (Optional) Merge or Join Datasets"
    subsections:
      - name: "LLM Support"
  - name: "Closing the Module"

---

## Why This Module Matters

Once a problem is framed and a research question is defined, the next step is to ask:

**What data can actually help us answer this question, and can we trust it?**

In real data investigations, data does not magically appear clean, complete, or perfectly aligned with our goals. According to Lee et al. (2022), considering and gathering data involves understanding what data exists, what data is missing, how it was collected, and whose interests it represents.

This module is where students begin to act like **data investigators, not just data users**.

---

## Learning Goals

By the end of this module, teachers and students will be able to:

- Identify what data is needed to answer a research question
- Evaluate data sources for relevance, quality, and bias
- Understand how data attributes are defined and measured
- Make informed decisions about storing and organizing datasets
- Use LLMs strategically to support data evaluation and planning

---

## Running Example (Continued Context)

**Framed Research Question:**

> *What types of electrical wire materials are most commonly associated with residential electrical fire incidents?*

All examples in this module connect back to this question.

---

## Step 1: Identify the Data Needed (Before Looking at Files)

Before opening any dataset, articulate what data would be useful.

**Key questions:**

- What variables would help answer the research question?
- What measurements matter?
- What units should those measurements be in?

### Example Variables (Electrical Fire Case)

- Wire material (e.g., aluminum, copper)
- Year of installation
- Location of fire
- Severity of damage

### LLM Support

**Prompting technique:** Zero-shot prompting (best for Understand level tasks)

**Example prompt:**

> *"Based on this [insert research question here], list the types of data variables that would be useful for investigating it."*

The LLM helps generate ideas, but students must decide what is actually feasible and relevant.

---

## Step 2: Assess Data Provenance (Where Does the Data Come From?)

**Data provenance** refers to where the data originates, who collected it, and why it exists.

Students should investigate:

- Who collected the data?
- For what purpose?
- Was it collected for safety, research, policy, or another reason?

### Example

Fire incident data might come from:

- A city fire department
- A state safety agency
- Insurance records

Each source implies different priorities and limitations.

### LLM Support

**Prompting technique:** Chain-of-Thought Prompting (Best for: Analyze / Evaluate tasks)

**Example prompt:**

> *"This dataset comes from a municipal fire department.*  
> *Step by step, analyze the strengths and limitations of this data source for investigating electrical fire causes.*  
> *Consider how the data was collected, what variables are included or missing, and any potential sources of bias."*

Here, the model is asked to evaluate the data source rather than describe it.

---

## Step 3: Read and Interpret Metadata (What Does the Data Actually Represent?)

Metadata includes information about:

- Column names
- Units of measurement
- Data descriptions
- Collection dates

Many people often skip this step, but **it's where misunderstandings begin**.

### Example

A column labeled `WIRE_TYPE` might:

- Use codes instead of names
- Combine multiple materials into one category
- Be missing values for older buildings

### LLM Support

**Prompting technique:** Few-shot prompting (best for Understand / Apply tasks)

**Example prompt:**

> *"Here is an example of a well-described dataset column and explanation.*  
> *Now help interpret these column names and suggest questions a student should ask about them."*

Few-shot prompting helps the model mirror good interpretive habits.

---

## Step 4: Consider Bias and Ethical Implications

Not all data represents everyone equally.

Students should ask:

- Who is included in this data?
- Who might be missing?
- Does the data reflect reporting practices rather than actual incidence?

### Example

Electrical fires may be underreported in:

- Older buildings
- Low-income neighborhoods
- Rural areas

### LLM Support

**Prompting technique:** Self-consistency prompting (best for Analyze / Evaluate tasks)

**Example prompt:**

> **Take note to use this same prompt 3 different times and compare answers.**
>
> *"Generate three different ways this dataset [attach dataset] might be biased.*  
> *Then explain which bias is most concerning for this investigation and why."*

This encourages multiple perspectives before settling on one interpretation.

---

## Step 5: Decide Whether Additional Data Is Needed

Sometimes the available data is not enough.

Students must decide:

- Do we need more samples?
- Do we need different attributes?
- Do we need data from another source?

### Example

The dataset might list fire incidents but not wire material. That signals a need for:

- Building inspection records
- Construction databases

### LLM Support

**Prompting technique:** Self-consistency prompting (best for Analyze / Create tasks)

**Example prompt:**

> *"Given this dataset's limitations, propose three ways to strengthen the investigation using additional data."*

---

## Step 6: Choose Storage Format and Organize Data

Once data is selected, students should standardize how it is stored.

**Best practices:**

- Use a consistent format (Excel recommended for K–12)
- Clear file naming (e.g., `FireData_2024_Cleaned.xlsx`)
- Document any changes made to the data

### LLM Support

**Prompting technique:** Zero-shot prompting (best for Apply tasks)

**Example prompt:**

> *"Suggest a clear file naming convention for this dataset and explain why it supports good data practice."*

---

## Step 7: (Optional) Merge or Join Datasets

If multiple datasets are relevant, students may explore joining them using:

- Date
- Location
- Building ID

This step reinforces that data analysis decisions affect results.

### LLM Support

**Prompting technique:** Prompt chaining (best for Apply → Analyze tasks)

**Example chain:**

**Prompt 1:**
> *"What variables could be used to join these datasets?"*

**Prompt 2:**
> *"What problems might arise when joining on this variable?"*

---

## Closing the Module

In this module, students learn that data is not neutral, complete, or self-explanatory. Considering data carefully—its source, structure, limitations, and ethics—is essential for meaningful science investigations.

LLMs play a valuable role here as thinking partners, helping students ask better questions about data rather than rushing into analysis.

In the next module, we move into exploring and visualizing data, where patterns, variability, and evidence begin to take shape.

---

**Reference:**

Lee, V. R., Wilkerson, M. H., & Lanouette, K. (2022). A call for a reimagined science education data literacy. *Journal of Research in Science Teaching*, 59(6), 1019-1049.

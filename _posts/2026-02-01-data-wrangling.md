---
layout: distill
title: "Data Wrangling (Processing & Transforming Data)"
description: "Learning to clean, organize, and transform data through iterative decision-making to prepare it for meaningful scientific analysis."
tags: [data wrangling, data cleaning, data transformation, science education, data literacy]
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
  - name: "Why Data Wrangling Matters"
  - name: "What You Are Doing in This Phase"
  - name: "Core Data Wrangling Actions"
  - name: "1. Filtering: Focus on What Matters"
  - name: "2. Grouping: Create Meaningful Comparisons"
  - name: "3. Data Cleaning: Address Messiness Explicitly"
  - name: "4. Data Transformation: Make Data More Useful"
  - name: "5. Summarizing: Describe the Data Before Explaining It"
  - name: "A Critical Reminder"

---

## Why Data Wrangling Matters

Real data is almost never ready for analysis. Measurements are missing, values are inconsistent, units don't match, and datasets include information that doesn't actually help answer your question.

**Data wrangling** is the process of cleaning, organizing, and transforming data so it becomes usable for sensemaking. This phase is where you decide what data matters, how it should be structured, and what transformations best support your investigation.

In practice, this is also where most of the work happens.

---

## What You Are Doing in This Phase

Data wrangling is not a checklist; it is **iterative decision-making**. At each step, you:

- Inspect the data
- Decide what to keep, change, or remove
- Justify those decisions based on your investigation goals

LLMs can help by explaining options, consequences, and tradeoffs, but you remain responsible for the final choices.

**By the end of this phase, you should have:**

- A cleaned and well-structured dataset
- Transformed variables that support your research question
- A table of descriptive statistics
- A clear rationale for each wrangling decision

---

## Core Data Wrangling Actions

The following five actions represent the fundamental work of data wrangling. Each requires scientific judgment and intentional decision-making.

---

## 1. Filtering: Focus on What Matters

**Filtering** means selecting only the subset of data relevant to your question.

This helps reduce noise and keeps the analysis aligned with the phenomenon you are studying.

**Science examples:**

- Keeping only temperature readings from one location
- Selecting trials conducted under the same experimental conditions

**LLM support (Zero-shot or Few-shot prompting):**

Use the LLM model to suggest reasonable filtering criteria based on your research question, then decide whether they make scientific sense.

---

## 2. Grouping: Create Meaningful Comparisons

**Grouping** involves organizing data into categories or levels so comparisons are possible.

This is essential for identifying patterns and differences.

**Science examples:**

- Grouping electrical resistance data by wire material
- Grouping biology measurements by species or treatment group
- Grouping math test scores by problem type

**LLM support (Few-shot prompting):**

Provide examples of how grouping is used in similar investigations and ask the LLM model to suggest groupings, but validate them against your data context.

---

## 3. Data Cleaning: Address Messiness Explicitly

**Cleaning** means identifying and deciding how to handle:

- Missing values
- Outliers
- Duplicates
- Inconsistent units or labels

There is rarely one "correct" cleaning choice—each decision affects interpretation.

**Science examples:**

- Deciding whether to remove a temperature reading far outside the rest
- Choosing how to handle a missing measurement in a lab trial
- Converting all lengths to meters for consistency

**LLM support (Chain-of-thought prompting):**

Ask the LLM model to walk through possible cleaning options and their consequences. Use this to compare alternatives, not to outsource judgment.

---

## 4. Data Transformation: Make Data More Useful

**Transformation** involves creating new variables or modifying existing ones to better support analysis.

This step often connects raw measurements to scientific meaning.

**Science examples:**

- Calculating speed from distance and time
- Creating ratios (e.g., mass per unit volume)
- Converting continuous values into categories (bins)
- Aggregating daily measurements into weekly averages

**LLM support (Prompt chaining):**

**First prompt:** Identify useful transformations.

**Second prompt:** Explain how each transformation would support the investigation.

---

## 5. Summarizing: Describe the Data Before Explaining It

Before interpreting patterns, you need a descriptive overview of the dataset.

**Common summaries include:**

- Mean, median, mode
- Minimum and maximum
- Range and standard deviation

These summaries help you understand variability and typical values.

**Science examples:**

- Average reaction rate across trials
- Variation in plant height within a treatment group
- Spread of resistance values for different wire lengths

**LLM support (Self-consistency prompting):**

Ask the LLM model to generate summaries multiple times or in different formats to check for stability and consistency in interpretation.

---

## A Critical Reminder

Data wrangling is not neutral. Every choice, what to remove, how to group, what to transform, shapes the story the data can tell.

**LLMs are most useful here as thinking partners:**

- Explaining options
- Surfacing tradeoffs
- Checking reasoning

They do not decide what is scientifically appropriate, **you do**.

---

In the next module, we move from preparing data to analyzing it, where patterns become evidence and claims require justification.

---
layout: distill
title: "Consider Models"
description: "Learning to select, evaluate, and interpret models as evidence-building tools that balance clarity, uncertainty, and real-world relevance."
tags: [statistical models, data modeling, science education, data literacy, inference]
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
  - name: "Context: Explaining and Predicting Electrical Fire Incidents"
  - name: "Why Models Matter"
  - name: "What Counts as a Model?"
  - name: "Modeling Is Iterative"
  - name: "Step-by-Step Modeling Workflow"
  - name: "Step 1: Clarify the Modeling Goal"
  - name: "Step 2: Select Candidate Models"
  - name: "Step 3: Evaluate Model Fit and Usefulness"
  - name: "Step 4: Consider Variability and Uncertainty"
  - name: "Step 5: Balance Interpretability and Performance"
  - name: "Step 6: Iterate When Needed"
  - name: "Key Takeaway"

---

## Context: Explaining and Predicting Electrical Fire Incidents

Throughout this module, we continue working with our running example of investigating electrical fire incidents, now focusing on how models help us move from patterns to evidence-based claims.

---

## Why Models Matter

After exploring and visualizing data, the next step is to select models that help answer your investigative question.

A **model** is not just an equation, it is a simplified representation of reality that helps you explain patterns, test claims, or make predictions while acknowledging variability and uncertainty.

In the context of electrical fire investigations, models help move from "what we see" to "what evidence supports a claim."

---

## What Counts as a Model?

In this module, models include:

- Statistical summaries (means, rates, proportions)
- Visual models (trend lines, distributions)
- Relationship models (correlation, regression)
- Predictive or classification models (when appropriate)

Not every model you try will be useful. A key part of this phase is choosing which models to keep, and which to discard.

---

## Modeling Is Iterative

Modeling rarely happens in a straight line. Often, when testing a model, you realize that:

- Variables need further transformation
- Data needs to be regrouped or filtered
- Additional data may be required

Going back to earlier phases is expected—and productive.

---

## Step-by-Step Modeling Workflow

The following six-step workflow guides the process of selecting, evaluating, and iterating on models for data investigations.

---

## Step 1: Clarify the Modeling Goal

Begin by restating your investigative question and asking what kind of evidence would meaningfully address it.

**Electrical fire examples:**

- Do older buildings experience more electrical fires? → **Inference**
- Can we estimate fire risk based on building age and wiring type? → **Prediction**
- Which factors appear most strongly associated with fire incidents? → **Explanation**

This distinction matters because different goals require different models.

**Prompting technique:** Zero-shot prompting

> *"Given this investigative question about electrical fires, is the goal better described as inference, explanation, or prediction? Explain why."*

---

## Step 2: Select Candidate Models

Identify several possible models that could address the question, knowing you may discard some later.

**Examples for electrical fire data:**

- Mean number of fires by building age group
- Line of best fit between wiring age and incident frequency
- Correlation between wire material and fire occurrence
- Simple regression predicting fire count from building age

**Prompting technique:** Few-shot prompting

> *"Here is my data and my research questions*  
> *Based on those, suggest appropriate models for investigating electrical fire causes."*

---

## Step 3: Evaluate Model Fit and Usefulness

Test each model by asking:

- Does this model help answer my question?
- Is the result interpretable in a real-world fire safety context?
- Does it respect the limits of the data?

Models that do not add insight are set aside, not forced into the analysis.

**Prompting technique:** Chain-of-thought prompting

> *"Step by step, evaluate whether this model provides meaningful evidence for the research question about electrical fire risk."*

---

## Step 4: Consider Variability and Uncertainty

No model perfectly represents reality. So, eexamine:

- Spread and variability in the data
- Sensitivity to outliers
- Whether small sample sizes limit conclusions

This step helps avoid overconfident claims.

**Prompting technique:** Self-consistency

> *"Analyze this model's results twice [insert], focusing once on patterns and once on uncertainty.*  
> *Do both interpretations support the same conclusion?"*


---

## Step 5: Balance Interpretability and Performance

Decide how much interpretability matters for the investigation.

**For electrical fire analysis:**

Simple, interpretable models (e.g., averages, linear trends) often matter more than high-performance black-box models.

However, more complex models can sometimes reveal upper bounds or hidden structure.

Choose models that align with the purpose of the investigation, not just technical sophistication.

**Prompting technique:** Prompt chaining

**Prompt 1:**
> *"Explain this model in plain language for a community safety report."*

**Prompt 2:**
> *"Now explain what this model cannot tell us."*

---

## Step 6: Iterate When Needed

If modeling reveals gaps or limitations, return to earlier phases:

- Collect or include additional variables (e.g., building use type)
- Transform variables (e.g., age categories)
- Revisit filtering or grouping decisions

Modeling informs what to do next, not just what to conclude.

---

## Key Takeaway

Models are **evidence-building tools, not final answers**. In electrical fire investigations, choosing the right model means balancing clarity, uncertainty, and real-world relevance.

**LLMs can assist by:**

- Suggesting model options
- Explaining assumptions
- Helping critique interpretability

But deciding which models matter and why is an essential part of data sensemaking, and remains the your responsibility.

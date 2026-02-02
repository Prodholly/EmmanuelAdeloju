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

In the context of science education, data sensemaking involves understanding a phenomenon of interest and seeking certain outcomes from a given data. It moves beyond simple calculation to ask:
- What does this pattern mean?
- Why might it occur?
- What can we learn from this?
- What can we do with what we have learned?

Central to using LLMs for data sensemaking is engaging in a cycle of questioning at every instance.

Hence, when working with LLMs, prompt engineering becomes the method by which we structure our scientific inquiry necessary for data sensemaking, guiding the LLM model to found its responses in the data provided or stipulated instructions.

---

## The SENSE Framework for Data Sensemaking

I introduce **SENSE**, a prompt engineering framework grounded in core practices of scientific data sensemaking:

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

> *"This task is about how the period of a pendulum changes as string length increases."*

By naming the phenomenon explicitly, you help the model connect calculations to real-world scientific concepts rather than treating the data as abstract numbers.

---

## 2. Establish the Data and Variables

This involves giving as much information as you can about the data. From data provenance to the data types to the descriptions of the variables.

Explicitly describe:
- What the data is about
- What type of data (ex. numerical or categorical?)
- What each variable represents
- Units of measurement
- Sample size or conditions (if known)

This prevents the model from inventing assumptions. Most of the above information usually accompany secondary data you collect. In the case where you are working with a primary data (you or your student collected from experiment), then you will have to define these data descriptions. These are not by-tasks! They are core to getting the best sensemaking experience with LLMs.

**Example (Chemistry):**

> *"The dataset includes two columns which are temperature (°C) and reaction rate (mol/s) measured across five trials. The data contains information of an experiment carried out in a grade 10 chemistry class focused on how temperature affect the rate of decomposition of sodium carbonate on reaction with hydrochloric acid. "*

It is also important to have inspected the data to observe any anomaly or insight that may help the LLM have better understand the data. For example, you may notice that some of the temperature values are categorical (for example, instead of "2", you see "two"). This is an imputation error you want to fix or ask the LLM to fix when the time comes.

Essentially, providing context ensures the LLM model grounds its reasoning in the actual structure and constraints of your data.

---

## 3. Name the Analytical Task

State exactly what kind of sensemaking is required, not just "analyze."

**Examples of tasks:**
- Identify patterns or trends
- Compare groups
- Quantify relationships
- Interpret variability

This involves any statistical tests (t-test, ANOVA, Correlation test) you want to run or models (linear regression, logistic regression, time series) you want to build.

**Example (Biology):**

> *"Identify the correlation between light intensity and plant growth rate."*

Being specific about the analytical task helps the model focus its execution on the appropriate type of pattern recognition or comparison to make.

---

## 4. Support Claims with Evidence

Require the model to tie every claim to the data, using numbers or comparisons. You want to make sure every output from the LLM model is rooted in the data. Remember LLMs hallucinate! If you want to make sense of data, you want every computation and insight to be true to the data and lead to genuine scientific understanding. You must be able to trace insight to the data.

This mirrors **scientific argumentation**.

**Example (Mathematics / Statistics):**

> *"Citing specific values or variables from the dataset to support each claim you make, do this ...]"*

This step ensures that explanations are grounded in data/evidence rather than general statements that could apply to any dataset or cannot be traced.

---

## 5. Examine Limitations and Uncertainty

Ensuring you audit the outputs of the LLM is key. Indeed, latest LLM models can self-audit and tell you where they might have made some errors. Also, you have the duty as someone with subject matter expertise to audit the responses and respond accordingly.

Prompt reflection on:
- Measurement error
- Sample size
- Missing variables
- Alternative explanations

This step helps you engage the LLM on verifying the outputs and fixing any possible error. Remember again that LLMs hallucinate, so you want to make sure this step is done.

**Example:**

> *"Identify at least one limitation of the dataset that affects how confidently we can interpret the results."*

By explicitly asking for limitations, you encourage critical thinking about the strength of conclusions and the boundaries of what the data can support.

---

## Full SENSE Prompt Example

**Context:** Middle school science — electrical resistance

> *"The data represents measurements of electrical resistance (ohms) for wires of different lengths (meters). The dataset includes wire length and resistance values from one classroom experiment. Analyze the relationship between wire length and resistance. Use specific data values to support your explanation. Finally, identify one limitation of this dataset that affects the strength of your conclusion."*


**NOTE: The above prompt is encompassing and may not be always suitable to give a one-shot prompt. So you may breakdown the prompt as a form of "Prompt Chaining"**
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

The SENSE framework provides a structured approach to prompt engineering that supports data sensemaking. By systematically incorporating these five elements, teachers can design prompts that support genuine data sensemaking rather than superficial pattern description.

In practice, not every prompt needs all five elements, but being intentional about which elements to include helps ensure that LLM outputs support rather than replace scientific reasoning.

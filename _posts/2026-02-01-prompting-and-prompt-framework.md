---
layout: distill
title: "Prompting Techniques for Science Data Analysis and Sensemaking"
description: "A guide to choosing and applying the right prompting techniques for different levels of data tasks in science education."
tags: [LLMs, prompt engineering, data analysis, science education]
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
  - name: "Understanding Prompt Engineering"
  - name: "Components of a Prompt"
  - name: "The Role of Context in Prompting"
    subsections:
      - name: "Example Without Much Context"
      - name: "Example With Richer Context"
  - name: "Prompting Techniques Mapped to Bloom's Taxonomy"
  - name: "1. Zero-Shot Prompting"
    subsections:
      - name: "Best Use (Bloom's Taxonomy)"
      - name: "Physics Task Example"
  - name: "2. Few-Shot Prompting"
    subsections:
      - name: "Best Use (Bloom's Taxonomy)"
      - name: "Chemistry Task Example"
  - name: "3. Chain-of-Thought Prompting"
    subsections:
      - name: "Best Use (Bloom's Taxonomy)"
      - name: "Biology Task Example"
  - name: "4. Self-Consistency Prompting"
    subsections:
      - name: "Best Use (Bloom's Taxonomy)"
      - name: "Environmental Science Task Example"
  - name: "5. Prompt Chaining"
    subsections:
      - name: "Best Use (Bloom's Taxonomy)"
      - name: "Science Data Example (Mathematics / Physics)"
  - name: "Moving Forward"

---

## Understanding Prompt Engineering

Before we dive into specific techniques, let me briefly remind you of what prompt engineering is—from a slightly different angle that may deepen your understanding.

**Prompt engineering is the design of tasks in natural language to LLMs to produce desired outputs.**

An important note: these prompt engineering guidelines work across different LLM models and tools. Whether you're using ChatGPT, Claude, Gemini, or another model, these principles remain consistent.

---

## Components of a Prompt

Before writing effective prompts, we need to understand their building blocks. Every well-designed prompt contains some combination of these components:

**Instruction:** An instruction or task you want the model to do

**Context:** Additional information you add to your instruction to make the model give better output

**Input data:** The question or task you are asking the model

**Output indicator:** How you want the output to be

Understanding these components allows you to intentionally craft prompts that guide the model toward the kind of response you need.

---

## The Role of Context in Prompting

In prompt writing, **context** is the background information and framing you give the model so it knows how to approach a task, not just what calculation to perform.

When you ask an LLM to calculate the mean of 5 numbers, the bare question might be:

> *"What is the mean of these 5 numbers: 4, 7, 9, 10, 15?"*

Context is everything extra you add around that, such as:
- who the explanation is for,
- how detailed it should be, and
- what format to use.

### Example Without Much Context

> *"Find the mean of these 5 numbers: 4, 7, 9, 10, 15."*

The model knows it should compute the mean, but it doesn't know:
- if it should show steps,
- explain the concept, or
- just output the final number.

And even: mean of what numbers? Temperature or number of eggs?

### Example With Richer Context

> *"You are a friendly math tutor helping a 6th-grade student.*
> *Calculate the mean of the temperatures measured in five days: 4, 7, 9, 10, 15.*
> *First, show how to add the numbers, then divide by how many numbers there are, and finally give the answer in a full sentence the student can understand."*

Here, the context includes:

- **Role:** "friendly math tutor"
- **Audience:** "6th-grade student"
- **Process:** "show how to add," then "divide by how many numbers," then "give the answer in a full sentence"

All of that shapes how the model performs the same core task: calculating the mean of 5 numbers.

---

## Prompting Techniques Mapped to Bloom's Taxonomy

At this point, I assume we can agree that **how we ask an LLM to work with data matters**.

So, let me introduce several prompting techniques and, more importantly, help you decide which technique fits which kind of data task.

> **Important note:**  
> I do not recommend using all of these techniques all the time. Each technique is best suited for specific levels of task complexity, which I map explicitly to **Bloom's Taxonomy** so teachers can make intentional choices.

---

## 1. Zero-Shot Prompting

**Zero-shot prompting** means asking the model to complete a task without providing any examples of how to do it.

You give:
- The task
- The data
- Minimal framing

### Best Use (Bloom's Taxonomy)

- **Remember**
- **Understand**

This technique works best for simple, well-defined tasks where the goal is recall, identification, or basic interpretation.

### Physics Task Example

> *"What is a projectile?"*

This task is entirely about remembering and recalling. No need for any reasoning or evaluation.

---

## 2. Few-Shot Prompting

**Few-shot prompting** provides one or more examples before asking the model to perform a new but similar task (Brown et al., 2020).

This helps the model infer:
- The type of reasoning expected
- The structure of the response

### Best Use (Bloom's Taxonomy)

- **Understand**
- **Apply**

This technique is ideal for patterned data tasks or where students have to apply what they have learned to new forms of the same problem space.

### Chemistry Task Example

> *"Example:*  
> *Data: Temperature (°C): 10, 20, 30*  
> *Solubility (g): 15, 25, 35*  
> *Interpretation: As temperature increases, solubility increases.*
>
> *Now analyze this data:*  
> *Temperature (°C): 15, 12, 10*  
> *Solubility (g): 18, 12, 8*  
> *Describe the pattern."*

The model sees the example and learns from that. Then mirrors the pattern to answer the new task.

---

## 3. Chain-of-Thought Prompting

**Chain-of-thought prompting** explicitly asks the model to show its (intermediate) reasoning steps (Wei et al., 2022).

Use this sparingly and intentionally, especially when modeling reasoning.

### Best Use (Bloom's Taxonomy)

- **Apply**
- **Analyze**

This technique is best for multi-step data analysis, where the reasoning process matters as much as the answer.

### Biology Task Example

> *"A student measured heart rate (beats/min) before and after exercise:*  
> *Before: 72, 75, 73*  
> *After: 110, 115, 112*  
> *Calculate the mean for each condition and explain, step by step, what the data suggests about the effect of exercise."*

In fact, there are two variations of chain-of-thought prompting:

- **Zero-shot CoT:** Ask the model to reason step by step without providing examples.
- **Few-shot CoT:** Provide a few step-by-step examples in the prompt to guide the model's reasoning.

---

## 4. Self-Consistency Prompting

**Self-consistency** involves asking the model to generate multiple independent interpretations and then compare them (Wang et al., 2022).

The goal is not agreement, but **range and uncertainty**.

### Best Use (Bloom's Taxonomy)

- **Analyze**
- **Evaluate**

This technique is especially useful for ambiguous or noisy data.

### Environmental Science Task Example

> *"Based on this dataset showing CO₂ levels and temperature over time, generate three possible interpretations.*  
> *Then identify which interpretation is best supported by the data and explain why."*

You may also paste the exact prompt into your LLM multiple times and compare the outputs and pick the majority answer. Your discretion is important here too—sometimes, the majority response will also be wrong.

---

## 5. Prompt Chaining

**Prompt chaining** breaks a complex task into a sequence of smaller prompts, where each output feeds into the next.

This mirrors how we scaffold student thinking.

### Best Use (Bloom's Taxonomy)

- **Apply**
- **Analyze**
- **Evaluate**

This is ideal for extended data investigations.

### Science Data Example (Mathematics / Physics)

In different prompts, do these:

**Prompt 1:**
> *"Calculate the mean velocity from this data."*

**Prompt 2:**
> *"Describe the trend shown in the velocity values."*

**Prompt 3:**
> *"Explain what this trend suggests about the motion."*

---

## Moving Forward

You now have a general understanding of how to prompt LLMs. We can then move on to how to construct prompts for data tasks, specifically.

In the next module, we will apply these techniques to real science data analysis scenarios and explore how to design prompts that support authentic student sensemaking while maintaining scientific rigor.

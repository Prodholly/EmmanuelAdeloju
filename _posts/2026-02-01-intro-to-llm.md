---
layout: distill
title: "Intro to Large Language Models"
description: "Building a shared mental model of what Large Language Models actually are, and what they are not."
tags: [LLMs, AI literacy, education, data science]
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
  - name: "What Is a Large Language Model (LLM)?"
  - name: "LLMs Are Pattern-Based, Not Reasoning Agents"
  - name: "How Do LLMs Learn? (A Teacher-Friendly Overview)"
    subsections:
      - name: "Training at a High Level"
      - name: "Stage 1: Data Collection and Preprocessing"
      - name: "Stage 2: Pretraining (Learning Language Patterns)"
      - name: "Stage 3: Fine-Tuning (Specialization)"
  - name: "Prompting and Prompt Engineering"
    subsections:
      - name: "What Is a Prompt?"
      - name: "What Is Prompt Engineering?"
  - name: "Why LLMs Can Be Helpful for Science Data Sensemaking"
  - name: "Major Risks Teachers Need to Be Aware Of"

---

## Why This Module Matters

Before asking teachers to use AI for data analysis and sensemaking, it is important to slow down and build a **shared mental model** of what Large Language Models (LLMs) actually are—and what they are not.

This matters because how we understand these tools directly shapes:
- how we use them in instruction,
- how much we trust them, and
- how we design prompts for them.

Without a clear mental model, it is easy to overestimate what LLMs can do or to misuse them in ways that undermine student sensemaking rather than support it.

---

## What Is a Large Language Model (LLM)?

Large Language Models (LLMs) are a type of Artificial Intelligence (AI) designed to work with **human language**. They are trained on massive collections of text and learn **statistical patterns in language**, enabling them to generate new text that sounds coherent and contextually appropriate.

In practical terms, LLMs can:
- respond to questions,
- summarize text,
- generate explanations,
- translate languages,
- write code, and
- support *language-based sensemaking* around data.

Common examples include:
- **ChatGPT** (OpenAI)
- **Claude** (Anthropic)
- **Gemini** (Google)
- **LLaMA** (Meta)

Most models teachers encounter are **general-purpose models**. This means they are designed to perform reasonably well across many tasks, rather than being experts in a single discipline such as statistics or data science.

> **Key takeaway:**  
> LLMs are *language models*, not data analysis engines or reasoning agents.


{% include figure.liquid 
  path="assets/img/prompt.png" 
  class="img-fluid rounded z-depth-1" 
  zoomable=true 
  caption="A simplified view of how a prompt guides a Large Language Model to generate a response by predicting likely next words rather than reasoning from data."
%}

Fig 1. A simplified view of how a prompt guides a Large Language Model to generate a response by predicting likely next words rather than reasoning from data

---

## LLMs Are Pattern-Based, Not Reasoning Agents

This is one of the most important ideas in this module.

LLMs do not *understand* data, concepts, or scientific phenomena in the way humans do. Instead, they generate responses by predicting what words are most likely to come next based on patterns learned during training.

When an LLM provides a convincing explanation of a graph or trend, it is **not reasoning from first principles**. It is drawing on patterns it has encountered in similar explanations across its training data.

This is why LLM outputs can:
- sound confident even when incorrect,
- use appropriate scientific language without grounding claims in evidence, and
- miss contextual details that matter in classrooms.

Understanding this limitation is essential for using LLMs productively in science education.

---

## How Do LLMs Learn? (A Teacher-Friendly Overview)

Teachers do not need all the technical details—but they *do* need intuition. Understanding how these models are trained helps us interact with them more critically and productively.

### Training at a High Level

LLMs are trained in three main stages.



### Stage 1: Data Collection and Preprocessing

The model is first exposed to enormous amounts of text from sources such as:
- websites,
- Wikipedia,
- books,
- articles, and
- other publicly available text.

This data is cleaned and filtered to remove low-quality or duplicate content. While this process is extensive, it is imperfect—meaning biases and gaps can remain.

**Educational implication:**  
What the model “knows” depends entirely on what it has encountered in text form.


### Stage 2: Pretraining (Learning Language Patterns)

During pretraining, the model learns general patterns in language by predicting missing or next words across **billions (or trillions) of words**.

For example, an earlier version of ChatGPT (GPT-3.5) was trained on approximately **45 TB of compressed text before filtering**, and about **570 GB after filtering** (Brown et al., 2020), representing hundreds of billions to trillions of words. Training on such broad and diverse text sources results in **general-purpose models** rather than deep expertise in any single discipline.

For instance, if given the prompt:

> *“When the temperature increases, the solubility of most solids in water…”*

The model learns that phrases like *“also increases”* are statistically likely to follow.

This stage creates a model that can respond across many topics, but without disciplinary understanding.

{% include figure.liquid 
  path="assets/img/llmprediction.jpg" 
  class="img-fluid rounded z-depth-1" 
  zoomable=true 
  caption="Large Language Models generate responses by predicting the most probable next tokens based on patterns learned during training, not by reasoning from first principles."
%}


### Stage 3: Fine-Tuning (Specialization)

After pretraining, models can be fine-tuned using smaller, more focused datasets or human feedback.

Fine-tuning means adjusting a pretrained model so it performs better on specific types of tasks (e.g., education, coding, or scientific explanation). This process often relies on **transfer learning**—using general language knowledge as a foundation rather than learning from scratch.

**Plain-language definition:**  
*Transfer learning* means starting with a broadly trained model and refining it for a specific purpose.

**Educational implication:**  
Even “education-focused” AI tools still rely on general language patterns, not deep disciplinary understanding.

---

## Prompting and Prompt Engineering

### What Is a Prompt?

A prompt is the input we give an LLM—usually text—that describes:
- the task,
- the context, and
- the expected type of response.

**Example prompt:**

> *“Explain the trend shown in this graph to a 7th-grade student using evidence from the data.”*


### What Is Prompt Engineering?

Prompt engineering is the intentional design and refinement of prompts to:
- clarify the task,
- constrain the model’s response, and
- align outputs with instructional goals.

In education, prompt engineering is less about “hacking” the model and more about **pedagogical precision**.

I think of prompt engineering as **lesson design for an AI collaborator**.

We will discuss Prompt Engineering more in Module 2.

---

## Why LLMs Can Be Helpful for Science Data Sensemaking

Despite their limitations, LLMs can be powerful sensemaking supports when used carefully.

They are especially useful for:
- translating data patterns into explanatory language,
- generating multiple interpretations of the same dataset,
- supporting claim–evidence–reasoning (CER),
- helping teachers anticipate student misconceptions.

What they cannot do reliably is:
- validate conclusions,
- detect subtle data errors, or
- replace student reasoning or disciplinary judgment.

---

## Major Risks Teachers Need to Be Aware Of

To use LLMs responsibly, we need to be explicit about the risks.

### Attributing Human-Like Reasoning

Fluent language can easily be mistaken for genuine understanding. This may lead to overconfidence in explanations that are not grounded in the data.

### Uncritical Trust in Outputs

Repeated “good enough” responses can create a false sense of reliability. Without verification, incorrect interpretations may go unnoticed.

### Invisible Influence on Thinking

LLMs do not just answer questions—they **frame problems**. Their suggestions can subtly shape how data is interpreted or narrow the range of explanations considered.

### Displacement of Collaborative Sensemaking

Over-reliance on AI can reduce opportunities for productive struggle, discussion, and collaborative reasoning, all of which are essential in science learning.

### Erosion of Analytical Judgment

When teachers or students defer too often to AI-generated interpretations, their ability to independently evaluate evidence and detect errors may weaken over time.

---

## Closing Reflection

The goal of this module is not to convince you that LLMs are good or bad. Rather, it is to help you see these tools clearly—as powerful language-based systems that can support science data sensemaking **only when humans remain firmly in the loop**.

This understanding sets the foundation for the next module, where we move from *what LLMs are* to *how we design prompts* that support meaningful data analysis in classrooms.

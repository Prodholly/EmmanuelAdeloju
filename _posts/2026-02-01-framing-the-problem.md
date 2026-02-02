---
layout: distill
title: "Frame the Problem"
description: "Understanding how to anchor data investigations in real-world phenomena by framing problems before analysis begins."
tags: [data investigation, problem framing, science education, data sensemaking]
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
  - name: "Why Framing the Problem Comes First"
  - name: "Learning Goals for This Module"
  - name: "Step 1: Identify the Broader Issue (Context First)"
    subsections:
      - name: "Example: Electrical Fires (Physical Science / Engineering Context)"
      - name: "How LLMs May Support This Step"
  - name: "Step 2: Clarify Why the Problem Matters"
    subsections:
      - name: "Classroom Example"
      - name: "Using LLMs Thoughtfully"
  - name: "Step 3: Develop Investigative (Research) Questions"
    subsections:
      - name: "From Broad Issue to Research Question"
      - name: "Using LLMs to Refine Questions"
  - name: "Step 4: Identify and Evaluate Available Data"
    subsections:
      - name: "Example Continued"
      - name: "LLMs as Data-Selection Aids"
  - name: "Step 5: Revisiting the Frame (Iterative Sensemaking)"
  - name: "Closing the Module"

---
## Why Framing the Problem Comes First

Before we graph data, calculate averages, or run statistical tests, we need to step back and ask:

**What problem are we actually trying to understand?**

Framing the problem anchors a data investigation in real-world phenomena. According to Lee et al. (2022), effective data investigations do not begin with tools or techniques; they begin with context, purpose, and questions worth answering. This framing phase shapes every decision that follows, from the research question we pose to the data we choose to analyze.

Importantly, this is not a one-time step. Throughout a data investigation, we return to the framing phase to ensure our analysis still aligns with the real-world problem we care about.

---

## Learning Goals for This Module

By the end of this module, teachers and students will be able to:

- Situate a data investigation in a real-world scientific context
- Move from broad issues → focused research questions
- Select or evaluate datasets that align with those questions
- Use LLMs productively to support (not replace) human sensemaking during framing

---

## Step 1: Identify the Broader Issue

Data investigations begin with real-world phenomena, not datasets.

At this stage, I will ask you to zoom out and identify:

- What is happening in the world?
- Why does it matter?
- Who is affected?

This is where background information comes in. We are not analyzing data yet; we are building contextual understanding.

### Example: Electrical Fires (Physical Science / Engineering Context)

Suppose we want to investigate electrical fires.

The broader issue might include:

- Repeated electrical fires in a community
- Power outages affecting homes and businesses
- Safety risks and economic consequences

Here, the investigation is grounded in a real system that could be improved, which emphasizes problem-solving in real-world context.

### How LLMs May Support This Step

LLMs are especially useful here for brainstorming and contextual exploration.

**Example prompt (Zero-shot prompt):**

> *"Act as a science teacher helping students understand a real-world problem.*  
> *What are some typical broader issues related to electrical fires in residential neighborhoods?"*

At this stage, the LLM helps surface possibilities, not answers. Teachers and students still decide which issues are relevant and meaningful in their context.

---

## Step 2: Clarify Why the Problem Matters

Once the broader issue is identified, the next step is to articulate why the investigation is important.

This helps you move beyond "we have data" to "this data helps us understand something meaningful."

Questions that may be asked here include:

- What could change if we understood this problem better?
- What decisions might this data inform?
- How does this connect to science learning goals?

### Classroom Example

In the electrical fire case:

- Understanding causes could inform safer building practices
- Data could help prioritize inspections or upgrades
- The investigation connects to concepts like conductivity, resistance, and materials science

### Using LLMs Thoughtfully

**Example prompt (Zero-shot prompt):**

> *"Why might understanding the causes of electrical fires be important for community safety and engineering decisions?"*

This supports sensemaking, but students should still discuss and refine the importance in their own words.

---

## Step 3: Develop Investigative (Research) Questions

Only after understanding the broader issue do we narrow our focus.

Framing the problem includes determining what focus is most productive. Sometimes, the initial problem needs to be reframed into a question that is more answerable with available data.

### From Broad Issue to Research Question

**Broad issue:**

> *Electrical fires are increasing in residential areas.*

**Focused investigative question:**

> *"What types of electrical wire materials are most commonly associated with electrical fire incidents?"*

This question:
- Is specific
- Can be answered using data
- Connects directly to scientific concepts (materials, conductivity, heat)

### Using LLMs to Refine Questions

LLMs are particularly useful for question refinement, not question generation alone.

**Example prompt (Zero-shot prompt):**

> *"Here is a broad issue: electrical fires in residential buildings.*  
> *Suggest three possible data-driven research questions that could be investigated using existing datasets."*

Teachers and students then evaluate:

- Which question is measurable?
- Which aligns with the data we can access?
- Which best supports our learning goals?

---

## Step 4: Identify and Evaluate Available Data

Once a research question is defined, we ask:

**What data would help us answer this question?**

This includes:

- What variables are needed?
- What measurements matter?
- What limitations exist in the data?

### Example Continued

**Research question:**

> *"What electrical wire materials are most commonly used in electrical fire incidents?"*

Possible datasets might include:

- Fire incident reports
- Building inspection records
- Material type and installation year

Here, alignment matters. A dataset that lacks wire material information, even if large, is not useful for this question.

### LLMs as Data-Selection Aids

**Example prompt:**

> *"Given this research question [paste research question here], what types of data variables would be necessary to investigate it?"*

The LLM helps identify what to look for, but teachers and students still evaluate data quality and relevance.

---

## Step 5: Revisiting the Frame (Iterative Sensemaking)

A key point from Lee et al. (2022) is that framing the problem is **iterative**.

As data is explored, we may realize:

- The question is too broad
- The data is incomplete
- A different question is more productive

At this point, we return to framing, not as failure, but as scientific practice.

**Example Reflection Prompt (Zero-shot prompting):**

> *"Based on the available data, does this research question need to be refined? If so, suggest how."*

This models authentic data science and scientific inquiry.

---

## Closing the Module

In this module, I want teachers and students to see that data investigation begins long before analysis. Framing the problem shapes the questions we ask, the data we select, and the conclusions we draw.

LLMs are powerful partners in this phase, but only when used to expand thinking, not replace it.

In the next module, we move from framing to exploring and preparing data, where numbers, variability, and patterns take center stage.

---

**Reference:**

Lee, V. R., Wilkerson, M. H., & Lanouette, K. (2022). A call for a reimagined science education data literacy. *Journal of Research in Science Teaching*, 59(6), 1019-1049.

---
layout: module
title: Understanding Large Language Models (LLMs) for Science Data Sensemaking
short_title: Understanding LLMs
module_number: 1
description: Building a shared mental model of what Large Language Models actually are, and what they are not.
toc: true
---

## Why This Module Matters

Before I ask teachers to use AI for data analysis and sensemaking, I want to slow us down and build a shared mental model of what Large Language Models actually are, and what they are not. This matters because how we understand these tools directly shapes how we use them in instruction, how much we trust them, and how we design prompts for them.

---

## 1. What Is a Large Language Model (LLM)?

Large Language Models (LLMs) are a type of Artificial Intelligence (AI) designed to work with human language. They are trained on massive collections of text and learn statistical patterns in language, enabling them to generate new text that sounds coherent and contextually appropriate.

<div class="capability-box">
  <div class="capability-title">In practical terms, LLMs can:</div>
  <div class="capability-grid">
    <div class="capability-item"><i class="fa-solid fa-comments"></i> Respond to questions</div>
    <div class="capability-item"><i class="fa-solid fa-compress"></i> Summarize text</div>
    <div class="capability-item"><i class="fa-solid fa-lightbulb"></i> Generate explanations</div>
    <div class="capability-item"><i class="fa-solid fa-language"></i> Translate languages</div>
    <div class="capability-item"><i class="fa-solid fa-code"></i> Write code</div>
    <div class="capability-item"><i class="fa-solid fa-chart-line"></i> Support data sensemaking</div>
  </div>
</div>

<div class="models-grid">
  <div class="model-item">
    <div class="model-name">ChatGPT</div>
    <div class="model-company">OpenAI</div>
  </div>
  <div class="model-item">
    <div class="model-name">Claude</div>
    <div class="model-company">Anthropic</div>
  </div>
  <div class="model-item">
    <div class="model-name">Gemini</div>
    <div class="model-company">Google</div>
  </div>
  <div class="model-item">
    <div class="model-name">LLaMA</div>
    <div class="model-company">Meta</div>
  </div>
</div>

Most of the models teachers encounter are **general-purpose models**. That means they are designed to perform reasonably well across many tasks, rather than being experts in a single discipline like statistics or data science.

<div class="takeaway-box">
  <div class="takeaway-label"><i class="fa-solid fa-key"></i> Key Takeaway</div>
  <div class="takeaway-content">
    LLMs are language models, not data analysis engines or reasoning agents.
  </div>
</div>

<figure>
  <img src="{{ '/assets/img/prompt.png' | relative_url }}" alt="Visual representation of LLMs" style="width: 100%; border-radius: 8px;">
</figure>

---

## 2. LLMs Are Pattern-Based, Not Reasoning Agents

This is one of the most important ideas in this module.

LLMs do not "understand" data, concepts, or scientific phenomena in the way humans do. Instead, they generate responses by predicting what words are most likely to come next based on patterns learned during training.

When an LLM gives a convincing explanation of a graph or trend, it is not reasoning from first principles. It is drawing on patterns it has seen in similar explanations across its training data.

<div class="info-box">
  <div class="box-title"><i class="fa-solid fa-triangle-exclamation"></i> This is why LLM outputs can:</div>
  <div class="box-content">
    <p><strong>Sound confident even when incorrect</strong> — The model generates fluent text regardless of accuracy.</p>
    <p><strong>Use appropriate scientific language without grounding claims in evidence</strong> — It mimics the style without the substance.</p>
    <p><strong>Miss contextual details that matter in classrooms</strong> — It lacks awareness of your specific teaching context.</p>
  </div>
</div>

---

## 3. How Do LLMs Learn? (A Teacher-Friendly Overview)

I don't think teachers need all the technical details, but they do need intuition. Understanding how these models are trained helps us interact with them more critically and productively.

### 3.1 Training at a High Level

LLMs are trained in three main stages:

<div class="stage-box">
  <div class="stage-number">1</div>
  <div class="stage-title">Data Collection and Preprocessing</div>
  <div class="stage-content">
    <p>The model is first exposed to enormous amounts of text from sources such as websites, Wikipedia, books, articles, and other publicly available text.</p>
    <p>This data is cleaned and filtered to remove low-quality or duplicate content. While this process is extensive, it is imperfect — which means biases and gaps can remain.</p>
  </div>
</div>

<div class="implication-box">
  <div class="implication-label"><i class="fa-solid fa-graduation-cap"></i> Educational Implication</div>
  <div class="implication-content">
    What the model "knows" depends entirely on what it has seen in text form.
  </div>
</div>

<div class="stage-box">
  <div class="stage-number">2</div>
  <div class="stage-title">Pretraining (Learning Language Patterns)</div>
  <div class="stage-content">
    <p>During pretraining, the model learns general patterns in language by predicting missing or next words across billions (or trillions) of words.</p>
    <p>LLMs are trained on massive text datasets drawn from sources such as the internet, Wikipedia, and books. For example, an earlier version of ChatGPT (GPT-3.5) model was trained on approximately 45TB of compressed text before filtering and about 570GB after filtering (Brown et al., 2020), representing hundreds of billions to trillions of words.</p>
    <p>Training on such broad, diverse text sources results in general-purpose models that can generate domain-agnostic responses across many topics, rather than deep expertise in any single discipline.</p>
  </div>
</div>

<div class="example-box">
  <code>If given: "When the temperature increases, the solubility of most solids in water…"

The model learns that phrases like "also increases" are statistically likely to follow.</code>
</div>

This stage creates a general-purpose model that can respond to a wide range of prompts but does not specialize in any one domain.

<figure>
  <img src="{{ '/assets/img/llmprediction.jpg' | relative_url }}" alt="LLM Pretraining visualization" style="width: 100%; border-radius: 8px;">
</figure>

<div class="stage-box">
  <div class="stage-number">3</div>
  <div class="stage-title">Fine-Tuning (Specialization)</div>
  <div class="stage-content">
    <p>After pretraining, models can be fine-tuned using smaller, more focused datasets or human feedback.</p>
    <p>Fine-tuning means adjusting a pretrained model so it performs better on specific types of tasks (e.g., education, coding, or scientific explanation).</p>
    <p>This process often relies on <strong>transfer learning</strong>, which means the model transfers its general language knowledge to a new, more specialized context rather than learning from scratch.</p>
  </div>
</div>

<div class="definition-box">
  <div class="definition-term">Transfer Learning</div>
  <div class="definition-meaning">
    Starting with a broadly trained model and refining it for a specific purpose.
  </div>
</div>

<div class="implication-box">
  <div class="implication-label"><i class="fa-solid fa-graduation-cap"></i> Educational Implication</div>
  <div class="implication-content">
    Even "education-focused" AI tools still rely on general language patterns, not deep disciplinary understanding.
  </div>
</div>

---

## 4. Prompting and Prompt Engineering

### What Is a Prompt?

A prompt is the input we give an LLM, usually text, that describes the task, the context, and the expected type of response.

<div class="example-box">
  <code>"Explain the trend shown in this graph to a 7th-grade student using evidence from the data."</code>
</div>

### What Is Prompt Engineering?

<div class="info-box">
  <div class="box-title"><i class="fa-solid fa-wand-magic-sparkles"></i> Prompt Engineering Is:</div>
  <div class="box-content">
    <p>The intentional design and refinement of prompts to clarify the task, constrain the model's response, and align outputs with instructional goals.</p>
    <p>In education, prompt engineering is less about "hacking" the model and more about <strong>pedagogical precision</strong>.</p>
  </div>
</div>

<div class="takeaway-box">
  <div class="takeaway-label"><i class="fa-solid fa-lightbulb"></i> A Helpful Frame</div>
  <div class="takeaway-content">
    I think of prompt engineering as <em>lesson design for an AI collaborator</em>.
  </div>
</div>

---

## 5. Why LLMs Can Be Helpful for Science Data Sensemaking

Despite their limitations, LLMs can be powerful sensemaking supports when used carefully.

<div class="comparison-box">
  <div class="comparison-column helpful">
    <div class="comparison-title"><i class="fa-solid fa-check"></i> LLMs Are Especially Useful For</div>
    <div class="comparison-content">
      <p>Translating data patterns into explanatory language</p>
      <p>Generating multiple interpretations of the same dataset</p>
      <p>Supporting claim–evidence–reasoning (CER)</p>
      <p>Helping teachers anticipate student misconceptions</p>
    </div>
  </div>
  <div class="comparison-column unhelpful">
    <div class="comparison-title"><i class="fa-solid fa-xmark"></i> What They Cannot Do Reliably</div>
    <div class="comparison-content">
      <p>Validate conclusions</p>
      <p>Detect subtle data errors</p>
      <p>Replace student reasoning or disciplinary judgment</p>
    </div>
  </div>
</div>

---

## 6. Major Risks Teachers Need to Be Aware Of

To use LLMs responsibly, we need to be explicit about the risks.

<div class="risk-box">
  <div class="risk-title"><i class="fa-solid fa-user-slash"></i> 6.1 Attributing Human-Like Reasoning</div>
  <div class="risk-content">
    It is easy to mistake fluent language for genuine understanding and human-level expertise. This can lead to overconfidence in explanations that are not grounded in the data.
  </div>
</div>

<div class="risk-box">
  <div class="risk-title"><i class="fa-solid fa-shield-halved"></i> 6.2 Uncritical Trust in Outputs</div>
  <div class="risk-content">
    Repeated "good enough" responses can create a false sense of reliability. Without verification, incorrect interpretations may go unnoticed.
  </div>
</div>

<div class="risk-box">
  <div class="risk-title"><i class="fa-solid fa-eye-slash"></i> 6.3 Invisible Influence on Thinking</div>
  <div class="risk-content">
    LLMs don't just answer questions; they frame problems. Their suggestions can subtly shape how we interpret data or narrow the range of explanations we consider.
  </div>
</div>

<div class="risk-box">
  <div class="risk-title"><i class="fa-solid fa-users-slash"></i> 6.4 Displacement of Collaborative Sensemaking</div>
  <div class="risk-content">
    Over-reliance on AI can reduce opportunities for productive struggle, discussion, and collaborative reasoning, all of which are essential in science learning.
  </div>
</div>

<div class="risk-box">
  <div class="risk-title"><i class="fa-solid fa-brain"></i> 6.5 Erosion of Analytical Judgment</div>
  <div class="risk-content">
    When teachers or students defer too often to AI-generated interpretations, their ability to independently evaluate evidence and detect errors may weaken over time.
  </div>
</div>

---

<div class="closing-box">
  <div class="closing-content">
    <p>My goal is not to convince you that LLMs are good or bad. It is to help you see these tools clearly — as powerful language-based systems that can support science data sensemaking <strong>only when we design prompts carefully and keep humans firmly in the loop</strong>.</p>
    <p>This understanding sets the foundation for the next module, where we move from <em>what LLMs are</em> to <em>how we design prompts that support meaningful data analysis in classrooms</em>.</p>
  </div>
</div>

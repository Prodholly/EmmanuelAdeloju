// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-emmanuel-adeloju",
    title: "Emmanuel Adeloju",
    section: "Navigation",
    handler: () => {
      window.location.href = "/EmmanuelAdeloju/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/EmmanuelAdeloju/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "A list of my publications, conference presentations, talks, and other scholarly works.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/EmmanuelAdeloju/publications/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A selection of research, evaluation, and applied work.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/EmmanuelAdeloju/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "My GitHub profile and repositories.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/EmmanuelAdeloju/repositories/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Course materials, schedules, and resources for classes I taught.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/EmmanuelAdeloju/teaching/";
          },
        },{id: "post-on-conducting-interviews-a-guide-for-ux-and-hai-researchers",
        
          title: "On Conducting Interviews: A guide for UX and HAI Researchers",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/on-conducting-interviews/";
          
        },
      },{id: "post-what-ai-sycophancy-means-for-k-12-students",
        
          title: "What AI Sycophancy Means for K-12 Students",
        
        description: "With great power comes great responsibility (risks)",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/ai-sycophancy-students/";
          
        },
      },{id: "post-prompting-techniques-for-science-data-analysis-and-sensemaking",
        
          title: "Prompting Techniques for Science Data Analysis and Sensemaking",
        
        description: "A guide to choosing and applying the right prompting techniques for different levels of data tasks in science education.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/prompt-techniques/";
          
        },
      },{id: "post-prompt-engineering-framework-for-data-sensemaking",
        
          title: "Prompt Engineering Framework for Data Sensemaking",
        
        description: "Introducing SENSE, a structured framework for designing prompts that support scientific data sensemaking with Large Language Models.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/prompt-framework/";
          
        },
      },{id: "post-intro-to-large-language-models",
        
          title: "Intro to Large Language Models",
        
        description: "Building a shared mental model of what Large Language Models actually are, and what they are not.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/intro-to-llm/";
          
        },
      },{id: "post-frame-the-problem",
        
          title: "Frame the Problem",
        
        description: "Understanding how to anchor data investigations in real-world phenomena by framing problems before analysis begins.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/framing-the-problem/";
          
        },
      },{id: "post-data-wrangling-processing-amp-transforming-data",
        
          title: "Data Wrangling (Processing &amp; Transforming Data)",
        
        description: "Learning to clean, organize, and transform data through iterative decision-making to prepare it for meaningful scientific analysis.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/data-wrangling/";
          
        },
      },{id: "post-data-exploration-and-visualization",
        
          title: "Data Exploration and Visualization",
        
        description: "Using visualization as a thinking tool to discover patterns, relationships, and uncertainties in science data investigations.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/data-exploration/";
          
        },
      },{id: "post-consider-models",
        
          title: "Consider Models",
        
        description: "Learning to select, evaluate, and interpret models as evidence-building tools that balance clarity, uncertainty, and real-world relevance.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/consider-models/";
          
        },
      },{id: "post-consider-data",
        
          title: "Consider Data",
        
        description: "Learning to evaluate data sources, understand metadata, and make informed decisions about data quality and ethical implications in science investigations.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/consider-data/";
          
        },
      },{id: "post-communicate-and-propose-action",
        
          title: "Communicate and Propose Action",
        
        description: "Translating data investigation results into clear narratives and evidence-based recommendations that inform real-world decisions.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/EmmanuelAdeloju/blog/2026/communicate-action/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/EmmanuelAdeloju/books/the_godfather/";
            },},{id: "news-received-the-graduate-support-award-from-arizona-state-university-in-recognition-of-remarkable-dedication-and-invaluable-contributions-as-a-member-of-the-asu-community",
          title: 'Received the Graduate Support Award from Arizona State University in recognition of remarkable...',
          description: "",
          section: "News",},{id: "news-awarded-the-2025-mary-lou-fulton-endowment-scholarship",
          title: 'Awarded the 2025 Mary Lou Fulton Endowment Scholarship.',
          description: "",
          section: "News",},{id: "news-gave-an-invited-talk-on-introduction-to-llm-for-data-sensemaking-at-asu-preparatory-academy",
          title: 'Gave an invited talk on Introduction to LLM for Data Sensemaking at ASU...',
          description: "",
          section: "News",},{id: "news-i-passed-my-comprehensive-exam",
          title: 'I passed my Comprehensive Exam.',
          description: "",
          section: "News",},{id: "news-received-a-college-dissertation-research-grant",
          title: 'Received a College Dissertation Research Grant.',
          description: "",
          section: "News",},{id: "news-i-passed-my-phd-proposal-defense-candidacy",
          title: 'I passed my PhD Proposal Defense (Candidacy).',
          description: "",
          section: "News",},{id: "news-volunteered-at-the-learning-engineering-research-network-conference-lern-2026",
          title: 'Volunteered at the Learning Engineering Research Network Conference (LERN 2026).',
          description: "",
          section: "News",},{id: "news-paper-accepted-at-society-for-information-technology-amp-amp-teacher-education-site-2026-march-23-27-philadelphia-the-psychological-other-student-relationships-with-genai-an-exploratory-study",
          title: 'Paper accepted at Society for Information Technology &amp;amp;amp; Teacher Education (SITE) 2026 (March...',
          description: "",
          section: "News",},{id: "news-paper-accepted-at-society-for-information-technology-amp-amp-teacher-education-site-2026-march-23-27-philadelphia-education-by-design-navigating-wicked-problems-with-generative-ai-and-collaborative-learning",
          title: 'Paper accepted at Society for Information Technology &amp;amp;amp; Teacher Education (SITE) 2026 (March...',
          description: "",
          section: "News",},{id: "news-gave-an-invited-guest-lecture-on-ai-for-research-to-graduate-students-in-dr-michelle-jordan-s-class-at-arizona-state-university",
          title: 'Gave an invited guest lecture on AI for Research to graduate students in...',
          description: "",
          section: "News",},{id: "news-awarded-the-cvpr26-broadening-participation-scholarship-award",
          title: 'Awarded the CVPR26 Broadening Participation Scholarship Award.',
          description: "",
          section: "News",},{id: "news-our-paper-from-policy-to-design-uncovering-socioemotional-risks-in-generative-ai-systems-for-education-was-accepted-at-the-humans-of-generative-ai-workshop-cvpr-2026-denver-colorado",
          title: 'Our paper From Policy to Design: Uncovering Socioemotional Risks in Generative AI Systems...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/9_project/";
            },},{id: "projects-program-evaluation",
          title: 'Program Evaluation',
          description: "This is a mixed-methods program evaluation where I co-developed survey instrument with the team, ran full statistical analysis in R, conducted focus group research, and instructional artifact review across a full academic year with a national cohort of educators.",
          section: "Projects",handler: () => {
              window.location.href = "/EmmanuelAdeloju/projects/xplorlabs_evaluation/";
            },},{id: "teachings-introduction-to-data-analysis",
          title: 'Introduction to Data Analysis',
          description: "Descriptive statistics, visual approaches, estimation, and inferential methods for univariate and bivariate educational research problems. Experience using statistical software, including Microsoft Excel.",
          section: "Teachings",handler: () => {
              window.location.href = "/EmmanuelAdeloju/teachings/intro-to-data-analysis/";
            },},{id: "teachings-",
          title: '',
          description: "",
          section: "Teachings",handler: () => {
              window.location.href = "/EmmanuelAdeloju/teachings/introduction-to-machine-learning/";
            },},{id: "teachings-nature-and-society-an-introduction-to-environmental-studies",
          title: 'Nature and Society An Introduction to Environmental Studies',
          description: "This course introduces environmental studies through scientific thinking. Students examine global environmental challenges, analyze earth systems, and apply evidence-based reasoning to develop sustainable solutions.",
          section: "Teachings",handler: () => {
              window.location.href = "/EmmanuelAdeloju/teachings/nature-and-society/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%65%61%64%65%6C%6F%6A%75@%61%73%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/emmanuel-adeloju", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=nxcqT2QAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

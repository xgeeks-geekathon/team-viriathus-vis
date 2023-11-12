- [**Description: What is it?**](#description-what-is-it)
- [**Problem: What problem is this solving?**](#problem-what-problem-is-this-solving)
- [**How: What does it look like in a product:**](#how-what-does-it-look-like-in-a-product)
- [**Audience: Who are we building for?**](#audience-who-are-we-building-for)
  - [**Who needs it the most?**](#who-needs-it-the-most)
  - [Why:](#why)
- [**User journeys:**](#user-journeys)
- [**Dev Roadmap:**](#dev-roadmap)
  - [**_Phase 1:_** Problem Identification and Conceptualization](#phase-1-problem-identification-and-conceptualization)
  - [**_Phase 2:_** Design and Architecture](#phase-2-design-and-architecture)
  - [**_Phase 3:_** Prototyping and Testing](#phase-3-prototyping-and-testing)
  - [**_Phase 4:_** Feature Development](#phase-4-feature-development)
  - [**_Phase 5:_** Integration and Deployment](#phase-5-integration-and-deployment)
- [**How do we know if we’ve solved this problem?**](#how-do-we-know-if-weve-solved-this-problem)


## **Description: What is it?**

**Product category:** AI assistant to Developers and Engineering Managers

## **Problem: What problem is this solving?**

- Developers struggle with understanding how their individual or team's work aligns with the broader organizational objectives

- Crafting specific and measurable Key Results is challenging, leading to ambiguity in tracking progress

- Developers lack real-time visibility into the progress of their OKRs and how they contribute to the overall goals

- Inadequate communication and collaboration on OKRs can lead to misunderstandings and hinder progress


## **How: What does it look like in a product:**

1. **AI assistant can provide real-time updates and explanations on how individual or team tasks align with broader organizational objectives.** By understanding natural language prompts, developers can ask questions like, "How does my current task contribute to our overall objectives?" The AI assistant can then offer detailed responses, fostering a clearer connection between daily work and organizational goals.
2. **Developers can interact with the AI assistant to get guidance on creating specific and measurable Key Results.** For instance, they might ask, "Can you help me define measurable outcomes for this task?" The AI assistant can provide suggestions, ensuring that the Key Results are SMART (Specific, Measurable, Achievable, Relevant, Time-bound).
3. **The AI assistant can offer real-time updates on OKR progress, allowing developers to inquire about the status of their tasks and the overall team's achievements.** Questions like, "What's the current progress on my team's OKRs?" can prompt the AI assistant to provide instant feedback, enhancing visibility and helping developers stay informed.
4. **Developers can use the AI assistant to facilitate communication and collaboration on OKRs.** By asking questions such as, "Can you update the team on our progress?" or "What are the key priorities for this quarter?", the AI assistant can disseminate information efficiently, ensuring that everyone is on the same page and fostering collaboration among team members.

## **Audience: Who are we building for?**

### **Who needs it the most?**

Devs and EMs at Innovative Tech Companies:

Size: **SMEs** transitioning to large enterprises.

### Why:

**_Tech Environment:_** Technology-driven companies often work on complex projects and need efficient ways to align tasks with broader objectives. An AI assistant aids in tracking progress, setting measurable outcomes, and adapting to evolving priorities.

**_Cross-Functional Collaboration:_** As tech companies grow, they may have cross-functional teams. An AI assistant facilitates communication and collaboration across diverse teams

 
## **User journeys:**

**1. Intro:** Assistant Guides the user through setting up their profile and preferences -> The developer asks the AI assistant, "How does my current task contribute to our overall objectives?" -> The AI assistant provides a detailed response, highlighting the task's relevance to broader organizational goals.

2\. **Key Result Guidance:** The developer asks, "Can you help me define measurable outcomes for this task?" -> The AI assistant offers suggestions, ensuring that the Key Results are SMART and align with organizational objectives.

3\. **Real-Time Progress Updates:** The developer inquires, "What's the current progress on my team's OKRs?" -> The AI assistant provides instant feedback, offering insights into individual and team achievements.

4\. **Ongoing Engagement:** The developer continues to engage with the AI assistant for daily updates and guidance -> The AI assistant proactively provides relevant updates and suggestions based on the developer's ongoing tasks. -> Reminds the developer of approaching deadlines and milestones.

5\. **Performance Review:** User Scenario: During performance reviews, the developer utilizes the AI-assisted insights for self-assessment. -> The AI assistant compiles a summary of the developer's contributions, aligned tasks, and key achievements for performance evaluation.


## **Dev Roadmap:**

### **_Phase 1:_** Problem Identification and Conceptualization

1\. User Research:

   - Conduct interviews and surveys with developers to identify common challenges in aligning tasks with organizational goals. 

   - Gather insights on the difficulties in creating and tracking Key Results.

2\. Problem Definition:

   - Clearly define the problems identified, emphasizing the lack of real-time visibility and communication gaps in OKR management.

### **_Phase 2:_** Design and Architecture

1\. AI Capabilities:

   - Choose and implement an NLP library (e.g., SpaCy, NLTK) to enhance the AI assistant's understanding of natural language.

2\. User Interface (UI) Design:

   - Design an intuitive and accessible interface for developers to interact with the AI assistant.

   - Prioritize features that enable easy querying about task alignment, Key Result definition, and progress tracking.

### **_Phase 3:_** Prototyping and Testing

1\. Prototype Development:  - Use Python, JavaScript for frontend to build the prototype of the AI assistant with basic features for task alignment and Key Result assistance. (WHAT USED FOR BACKEND?)

2\. User Testing:

   - Conduct usability tests with a group of developers to gather feedback on the prototype (Kissmetrics, Amplitude, Mixpanel for analytics)

   - Iteratively refine the AI assistant based on user input.

### **_Phase 4:_** Feature Development

1\. Real-time Updates:

   - Develop algorithms for real-time tracking of task and OKR progress with natural language

   - Ensure the AI assistant can provide instant and accurate updates to developers.

### **_Phase 5:_** Integration and Deployment

1\. Integration with Development Tools:

   - Integrate the AI assistant with popular development tools like GitHub, GitLab 
   - Integrate with monitoring or observability tools like DataDog, Splunk, New Relic, etc.
   - Integrate with project management tools like Jira, Asana, Trello, etc. 

2\. Deployment Strategy:

   - Roll out the product to a small group of users for initial testing and feedback.
   - Utilize GitLab CI or Github Actions for automated deployment processes.

## **How do we know if we’ve solved this problem?**

- High **Conversion**, **Adoption** rates 
- Users comment on **more efficient ceremonies**: Retros, Post-mortems, OKR plannings, Reviews
- **Feedback with Increased understanding** and alignment among developers regarding how their tasks contribute to broader organizational objectives
- **Feedback on more specific and measurable** key results from EMs
- **Positive changes in performance metrics**, such as task completion rates and achievement of Key Results

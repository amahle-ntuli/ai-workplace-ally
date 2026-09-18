# AI Workplace Ally

Build a modern, responsive web application called AI Workplace Productivity Assistant.

Purpose

Create a professional SaaS-style AI assistant that helps professionals complete common workplace tasks using AI-generated responses.

Core Features

1. Smart Email Generator

Allow users to enter the purpose/content of an email.
Let users select a tone:
Formal
Friendly
Persuasive
Generate a complete, professional email using AI.
Make the generated email fully editable.
Include a clear option to regenerate the response.

2. AI Task Planner

Allow users to enter their tasks for the day or week.
Ask the AI to organise, prioritise, and structure the tasks.
Generate a realistic daily or weekly schedule based on the user's input.
Allow users to edit the generated schedule.
Prioritisation should consider urgency and importance.

3. AI Workplace Chatbot

Provide an interactive chat interface where users can ask workplace-related questions or request assistance.
Responses must be generated dynamically by AI based on the user's prompt.
Do not use generic placeholder responses or pre-written chatbot answers.
The chatbot should assist with workplace communication, organisation, productivity, planning, brainstorming, and professional writing.
UI/UX Design

Use a clean, modern, professional SaaS dashboard aesthetic inspired by organic modernism.

Colour palette:

Warm beige
Sage/forest green
Soft brown
White/off-white
Use dark green or brown for text where appropriate.

Include:

Left sidebar navigation
Dashboard/home page
Email Generator page
Task Planner page
AI Chat page
Clear navigation between features
Modern cards, buttons, forms, and input fields
Spacious layouts and subtle rounded corners
Responsive design for desktop, tablet, and mobile
Accessible typography and strong visual hierarchy
Dashboard

Create a simple dashboard showing the three main AI tools:

Smart Email Generator
AI Task Planner
AI Workplace Chatbot

The dashboard should immediately communicate what the application does and allow users to access each tool quickly.

AI Behaviour

All substantive outputs must be generated dynamically by AI based on the user's input.

Use structured prompts behind each feature so the AI understands:

The user's request
The desired output format
The selected tone or priority
The workplace/professional context

Do not hard-code generic AI responses.

Editable Outputs

All AI-generated emails, schedules, and other generated content should appear in editable fields or editable content areas so users can modify the results before using them.

Include actions such as:

Generate
Regenerate
Edit
Copy
Data & Backend Restrictions

This application must NOT have a backend, database, authentication system, or persistent data storage.

Do not store user prompts, conversations, generated emails, schedules, or personal information.

The application should function as a frontend AI tool, with AI responses generated dynamically during the user's session.

Do not add unnecessary account systems, dashboards requiring saved data, databases, analytics, or persistent user profiles.

Responsible AI

Include a clearly visible but unobtrusive Responsible AI disclaimer stating that AI-generated content should be reviewed by the user for accuracy, appropriateness, confidentiality, and potential errors before being used in a professional setting.

Important Build Instructions

Prioritise the three core AI features and a polished responsive UI.

Keep the application simple and lightweight. Do not add features outside the requirements above.

Do not create mock AI responses or placeholder content where AI generation is required. The application's actual outputs should come from AI.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9d66bb7a-2aea-46ed-9e68-29b2bdada592).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

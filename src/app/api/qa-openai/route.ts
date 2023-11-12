import dotenv from "dotenv";
import {
  StreamingTextResponse,
  LangChainStream,
  OpenAIStream,
  streamToResponse,
} from "ai";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getEncoding, encodingForModel } from "js-tiktoken";

dotenv.config({ path: `.env.local` });

// const model = "gpt-4-1106-preview";
const model = "gpt-3.5-turbo-16k";

const data = `Below we define a list of tickets in the following structure:
    {
      "title": "Title of the jira ticket",
      "body": "Text describing the ticket",
      "assignees": "An array of the people working on the ticket",
      "epic": "The epic associated with the ticket",
      "duration": "How many hours the ticket has been in development, null if not yet started",
      "estimate": "How many hours we estimate the ticket will take",
      "time_spent_in_blocked": How many hours the ticket spent in blocked state,
      "status": "The current state of the ticket",
      "sprint_name": "Name of the sprint associated with the ticket",
      "okr": "The Objective associated with this ticket",
    }

  Consider the following JSON structure:
  {
    "title": "Implement User Authentication",
    "body": "Develop user authentication functionality using OAuth 2.0.",
    "assignees": ["John Doe"],
    "epic": "User Management",
    "duration": 40,
    "estimate": 16,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 01/2023",
    "okr": "Enhance user security",
  },
  {
    "title": "Create Product Listing Page",
    "body": "Design and implement the product listing page with filters and sorting options.",
    "assignees": ["Jane Smith"],
    "epic": "Product Management",
    "duration": 40,
    "estimate": 24,
    "time_spent_in_blocked": 8,
    "status": "In progress",
    "sprint_name": "Sprint 01/2023",
    "okr": "Enhance product discovery",
  },
  {
    "title": "Integrate Payment Gateway",
    "body": "Integrate a secure payment gateway for processing transactions.",
    "assignees": ["John Doe", "Jane Smith"],
    "epic": "Payment Processing",
    "duration": 0,
    "estimate": 32,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 01/2023",
    "okr": "Facilitate seamless transactions",
  },
  {
    "title": "Implement Order Tracking",
    "body": "Develop order tracking feature to allow users to monitor their shipments.",
    "assignees": ["Michael Johnson"],
    "epic": "Order Management",
    "duration": 16,
    "estimate": 16,
    "time_spent_in_blocked": 0,
    "status": "In progress",
    "sprint_name": "Sprint 02/2023",
    "okr": "Enhance user experience",
  },
  {
    "title": "Optimize Database Queries",
    "body": "Identify and optimize slow-performing database queries for improved platform performance.",
    "assignees": ["Alice Brown"],
    "epic": "Performance Optimization",
    "duration": 40,
    "estimate": 40,
    "time_spent_in_blocked": ,
    "status": "In review",
    "sprint_name": "Sprint 02/2023",
    "okr": "Improve system performance",
  },
  {
    "title": "Implement Wishlist Feature",
    "body": "Create a wishlist functionality to allow users to save and manage their favorite products.",
    "assignees": ["John Doe"],
    "epic": "User Experience",
    "duration": 0,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "Done",
    "sprint_name": "Sprint 02/2023",
    "okr": "Enhance user engagement",
  },
  {
    "title": "Fix Security Vulnerabilities",
    "body": "Conduct a security audit and address any identified vulnerabilities in the system.",
    "assignees": ["Alice Brown", "Michael Johnson"],
    "epic": "Security",
    "duration": 32,
    "estimate": 32,
    "time_spent_in_blocked": 8,
    "status": "In progress",
    "sprint_name": "Sprint 03/2023",
    "okr": "Enhance system security",
  },
  {
    "title": "Implement Admin Dashboard",
    "body": "Develop an admin dashboard for managing users, products, and orders.",
    "assignees": ["Jane Smith"],
    "epic": "Admin Tools",
    "duration": 0,
    "estimate": 40,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 03/2023",
    "okr": "Improve admin functionality",
  },
  {
    "title": "Enhance Search Functionality",
    "body": "Improve the search algorithm for better accuracy and relevance.",
    "assignees": ["John Doe"],
    "epic": "Search Optimization",
    "duration": 24,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "Blocked",
    "sprint_name": "Sprint 03/2023",
    "okr": "Optimize search functionality",
  },
  {
    "title": "Implement Mobile Responsiveness",
    "body": "Optimize the platform for a seamless user experience on mobile devices.",
    "assignees": ["Alice Brown"],
    "epic": "User Experience",
    "duration": 32,
    "estimate": 32,
    "time_spent_in_blocked": 0,
    "status": "In progress",
    "sprint_name": "Sprint 04/2023",
    "okr": "Improve mobile user experience",
  },
  {
    "title": "Refactor Codebase",
    "body": "Refactor the existing codebase to improve maintainability and code quality.",
    "assignees": ["Michael Johnson"],
    "epic": "Code Refactoring",
    "duration": 40,
    "estimate": 40,
    "time_spent_in_blocked": 8,
    "status": "In review",
    "sprint_name": "Sprint 04/2023",
    "okr": "Enhance code quality",
  },
  {
    "title": "Implement Customer Reviews",
    "body": "Integrate a customer review system for products with rating and comments.",
    "assignees": ["Jane Smith"],
    "epic": "User Feedback",
    "duration": 0,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "Done",
    "sprint_name": "Sprint 04/2023",
    "okr": "Encourage user feedback",
  },
  {
    "title": "Fix UI Bugs",
    "body": "Identify and fix any UI bugs reported by users for a smoother experience.",
    "assignees": ["John Doe"],
    "epic": "User Interface",
    "duration": 0,
    "estimate": 16,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 05/2023",
    "okr": "Enhance user interface",
  },
  {
    "title": "Implement Social Media Integration",
    "body": "Allow users to share products and purchases on social media platforms.",
    "assignees": ["Alice Brown"],
    "epic": "Social Integration",
    "duration": 32,
    "estimate": 32,
    "time_spent_in_blocked": 0,
    "status": "In progress",
    "sprint_name": "Sprint 05/2023",
    "okr": "Expand social reach",
  },
  {
    "title": "Conduct Load Testing",
    "body": "Perform load testing to ensure the platform can handle high traffic loads.",
    "assignees": ["Michael Johnson"],
    "epic": "Performance Testing",
    "duration": 32,
    "estimate": 40,
    "time_spent_in_blocked": ,
    "status": "Blocked",
    "sprint_name": "Sprint 05/2023",
    "okr": "Ensure scalability",
  },
  {
    "title": "Implement Subscription Service",
    "body": "Create a subscription service for users to receive regular updates and promotions.",
    "assignees": ["Jane Smith"],
    "epic": "User Experience",
    "duration": 0,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 06/2023",
    "okr": "Enhance user engagement",
  },
  {
    "title": "Enhance Product Recommendation Algorithm",
    "body": "Improve the product recommendation algorithm based on user behavior.",
    "assignees": ["John Doe"],
    "epic": "Recommendation System",
    "duration": 24,
    "estimate": 32,
    "time_spent_in_blocked": 0,
    "status": "In progress",
    "sprint_name": "Sprint 06/2023",
    "okr": "Increase personalized recommendations",
  },
  {
    "title": "Implement Multi-Language Support",
    "body": "Add support for multiple languages to cater to a diverse user base.",
    "assignees": ["Alice Brown"],
    "epic": "Localization",
    "duration": 32,
    "estimate": 40,
    "time_spent_in_blocked": 0,
    "status": "In review",
    "sprint_name": "Sprint 06/2023",
    "okr": "Enhance accessibility",
  },
  {
    "title": "Fix Checkout Process Issues",
    "body": "Address issues reported during the checkout process for a smoother user experience.",
    "assignees": ["Michael Johnson"],
    "epic": "User Experience",
    "duration": 40,
    "estimate": 40,
    "time_spent_in_blocked": 8,
    "status": "Done",
    "sprint_name": "Sprint 06/2023",
    "okr": "Optimize checkout process",
  },
  {
    "title": "Enhance User Profile Page",
    "body": "Improve the user profile page with additional information and customization options.",
    "assignees": ["Jane Smith"],
    "epic": "User Experience",
    "duration": 16,
    "estimate": 16,
    "time_spent_in_blocked": 0,
    "status": "In progress",
    "sprint_name": "Sprint 07/2023",
    "okr": "Personalize user experience",
  },
  {
    "title": "Implement Real-time Chat",
    "body": "Integrate a real-time chat feature for users to communicate within the platform.",
    "assignees": ["John Doe"],
    "epic": "Communication",
    "duration": 32,
    "estimate": 32,
    "time_spent_in_blocked": 8,
    "status": "To do",
    "sprint_name": "Sprint 07/2023",
    "okr": "Facilitate user communication",
  },
  {
    "title": "Implement AI-Powered Recommendations",
    "body": "Integrate AI algorithms to provide personalized product recommendations to users.",
    "assignees": ["Alice Brown"],
    "epic": "Recommendation System",
    "duration": 0,
    "estimate": 40,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 07/2023",
    "okr": "Enhance recommendation accuracy",
  },
  {
    "title": "Implement Image Recognition for Products",
    "body": "Enable image recognition to automatically categorize and tag products.",
    "assignees": ["Michael Johnson"],
    "epic": "Technology Innovation",
    "duration": 24,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "Done",
    "sprint_name": "Sprint 07/2023",
    "okr": "Enhance product management",
  },
  {
    "title": "Conduct Usability Testing",
    "body": "Organize usability testing sessions to gather feedback on the platform's user interface.",
    "assignees": ["Jane Smith"],
    "epic": "User Experience",
    "duration": 0,
    "estimate": 16,
    "time_spent_in_blocked": 0,
    "status": "In progress",
    "sprint_name": "Sprint 08/2023",
    "okr": "Optimize user interface",
  },
  {
    "title": "Implement Push Notifications",
    "body": "Integrate push notification functionality for user engagement and updates.",
    "assignees": ["John Doe"],
    "epic": "User Engagement",
    "duration": 24,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 08/2023",
    "okr": "Increase user engagement",
  },
  {
    "title": "Optimize Mobile App Performance",
    "body": "Identify and resolve performance issues in the mobile app version of the platform.",
    "assignees": ["Alice Brown"],
    "epic": "Mobile Optimization",
    "duration": 0,
    "estimate": 32,
    "time_spent_in_blocked": 8,
    "status": "Blocked",
    "sprint_name": "Sprint 08/2023",
    "okr": "Ensure smooth mobile experience",
  },
  {
    "title": "Enhance Product Page Layout",
    "body": "Redesign the product page layout for improved visual appeal and user interaction.",
    "assignees": ["Michael Johnson"],
    "epic": "User Interface",
    "duration": 16,
    "estimate": 16,
    "time_spent_in_blocked": 0,
    "status": "In review",
    "sprint_name": "Sprint 09/2023",
    "okr": "Optimize product presentation",
  },
  {
    "title": "Implement In-App Purchase Functionality",
    "body": "Enable users to make purchases directly within the mobile app.",
    "assignees": ["Jane Smith"],
    "epic": "Mobile Integration",
    "duration": 0,
    "estimate": 32,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 09/2023",
    "okr": "Facilitate in-app transactions",
  },
  {
    "title": "Implement Advanced Search Filters",
    "body": "Expand search functionality with advanced filters for more precise results.",
    "assignees": ["John Doe"],
    "epic": "Search Optimization",
    "duration": 0,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "Done",
    "sprint_name": "Sprint 09/2023",
    "okr": "Optimize search experience",
  },
  {
    "title": "Enhance Customer Support System",
    "body": "Integrate a comprehensive customer support system for user assistance and issue resolution.",
    "assignees": ["Alice Brown"],
    "epic": "Customer Support",
    "duration": 40,
    "estimate": 40,
    "time_spent_in_blocked": 8,
    "status": "In progress",
    "sprint_name": "Sprint 10/2023",
    "okr": "Improve customer satisfaction",
  },
  {
    "title": "Implement Augmented Reality Product Preview",
    "body": "Enable users to preview products in augmented reality for a more immersive shopping experience.",
    "assignees": ["Michael Johnson"],
    "epic": "Innovation",
    "duration": 32,
    "estimate": 32,
    "time_spent_in_blocked": 0,
    "status": "Done",
    "sprint_name": "Sprint 10/2023",
    "okr": "Enhance product visualization",
  },
  {
    "title": "Implement Gamification Elements",
    "body": "Introduce gamification elements to enhance user engagement and loyalty.",
    "assignees": ["Jane Smith"],
    "epic": "User Engagement",
    "duration": 0,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 10/2023",
    "okr": "Increase user loyalty",
  },
  {
    "title": "Optimize Checkout Page Load Time",
    "body": "Identify and reduce load times on the checkout page for a smoother transaction process.",
    "assignees": ["John Doe"],
    "epic": "User Experience",
    "duration": 40,
    "estimate": 40,
    "time_spent_in_blocked": 0,
    "status": "In review",
    "sprint_name": "Sprint 11/2023",
    "okr": "Streamline checkout process",
  },
  {
    "title": "Implement Social Authentication",
    "body": "Allow users to log in and register using their social media accounts.",
    "assignees": ["Alice Brown"],
    "epic": "User Authentication",
    "duration": 0,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "Blocked",
    "sprint_name": "Sprint 11/2023",
    "okr": "Simplify user registration",
  },
  {
    "title": "Implement Dynamic Pricing",
    "body": "Introduce dynamic pricing based on user behavior, demand, and market trends.",
    "assignees": ["Michael Johnson"],
    "epic": "Pricing Strategy",
    "duration": 0,
    "estimate": 32,
    "time_spent_in_blocked": 0,
    "status": "To do",
    "sprint_name": "Sprint 11/2023",
    "okr": "Optimize pricing",
  },
  {
    "title": "Enhance Seller Dashboard",
    "body": "Improve the dashboard for sellers to manage products, orders, and analytics.",
    "assignees": ["Jane Smith"],
    "epic": "Seller Tools",
    "duration": 24,
    "estimate": 24,
    "time_spent_in_blocked": 0,
    "status": "Done",
    "sprint_name": "Sprint 11/2023",
    "okr": "Empower sellers",
  },
  {
    "title": "Implement Voice Search",
    "body": "Integrate voice search functionality for users to search for products using voice commands.",
    "assignees": ["John Doe"],
    "epic": "Search Optimization",
    "duration": 32,
    "estimate": 32,
    "time_spent_in_blocked": 8,
    "status": "In progress",
    "sprint_name": "Sprint 12/2023",
    "okr": "Enhance search accessibility",
  }

  Using the JSON data above, answer the following question:\n`;

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: data + prompt }],
    temperature: 0,
    model,
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}

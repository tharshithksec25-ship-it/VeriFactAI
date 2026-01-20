
# Deployment Guide for VeriFact Secure AI

This guide will walk you through deploying your application to the cloud. We recommend **Vercel** for the frontend and **Render** for the backend.

## Prerequisites

-   A GitHub account.
-   Your code pushed to a GitHub repository.

---

## Part 1: Deploy Backend (Server) to Render

1.  **Sign up/Login** to [Render.com](https://render.com/).
2.  Click **"New +"** and select **"Web Service"**.
3.  Connect your GitHub repository.
4.  Configure the service:
    -   **Name**: `verifact-server`
    -   **Root Directory**: `server`
    -   **Runtime**: `Node`
    -   **Build Command**: `npm install && npm run build`
    -   **Start Command**: `npm start`
5.  **Environment Variables**:
    -   `GEMINI_API_KEY`: [Your API Key]
    -   `PORT`: `5000`
    -   `FRONTEND_URL`: [Your Vercel URL - add this after Part 2]
6.  Click **"Create Web Service"**.

---

## Part 2: Deploy Frontend (Client) to Vercel

1.  **Sign up/Login** to [Vercel.com](https://vercel.com/).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  Configure the project:
    -   **Framework Preset**: Vite
    -   **Root Directory**: `client`
5.  **Environment Variables**:
    -   `VITE_API_URL`: [Your Render Backend URL] (e.g., `https://verifact-server.onrender.com`)
        -   *Note: Do not include a trailing slash.*
6.  Click **"Deploy"**.

---

## Part 3: Code Adjustments

The agent has automatically updated your code to support these deployments:
-   **Frontend**: Now uses `VITE_API_URL` environment variable.
-   **Backend**: Now accepts `FRONTEND_URL` environment variable for CORS security.

## Verification

1.  Open your Vercel URL.
2.  Test the analyzer.

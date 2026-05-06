# UPSC AI Chatbot

A premium, modern AI-powered platform designed specifically for UPSC aspirants. This application provides tools for MCQ practice, daily news analysis, and direct interaction with an AI mentor tailored for the Civil Services Examination.

## 🚀 Live Demo
**[Click here to access the Local Application](http://localhost:5173/)**

## ✨ Features
- **OTP-Based Authentication**: Secure login using phone numbers and OTP verification.
- **AI Mentor**: Interactive chat interface for clearing UPSC-related doubts.
- **MCQ Practice**: Practice multiple-choice questions with real-time feedback.
- **Daily News**: Stay updated with curated news relevant to UPSC preparation.
- **Subject-Specific Focus**: Tailored assistance for subjects like History, Anthropology, and more.
- **Dark Mode**: Premium glassmorphic UI with dynamic theme switching.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: FastAPI (Python).
- **Styling**: Vanilla CSS & Tailwind for a premium aesthetic.

## 📦 Installation

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the API server:
   ```bash
   python main.py
   ```

### Data Pipeline (Automation)
The daily news analysis is automated via a dedicated scraper pipeline.
1. Run the scraper manually or as a background service:
   ```bash
   python pipeline/daily_news_scraper.py
   ```
2. The script will automatically fetch data from *The Hindu* and *PIB* every day at **06:00 AM**.
3. It updates both **MongoDB** and a local **JSON file** (`backend/data/daily_news.json`) for frontend synchronization.

## 📄 License
This project is licensed under the MIT License.
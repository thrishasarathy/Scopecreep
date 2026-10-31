# ScopeCreep 🔍

### AI-Powered Software Requirements and Risk Analyzer

ScopeCreep is an academic portfolio project designed to analyze software project briefs, identify potentially unclear requirements, estimate project complexity, and highlight possible risks before development begins.

The goal is to help developers understand project requirements more clearly, recognize potential scope creep, and make better project planning decisions.

## 🎯 Project Objectives

* Analyze client-provided software project briefs.
* Identify ambiguous or unclear requirements.
* Estimate project effort and complexity.
* Generate a project risk score from 0 to 100.
* Explain clauses or requirements that may create problems.
* Save previous analyses for future reference.

## ✨ Key Features

* **Requirement Analysis:** Analyze software project descriptions.
* **Ambiguity Detection:** Highlight requirements that may need clarification.
* **Effort Estimation:** Categorize estimated effort as Low, Medium, or High.
* **Risk Assessment:** Display a risk score between 0 and 100.
* **Explanation of Findings:** Help users understand potential project issues.
* **Analysis History:** Store and retrieve previous analyses.
* **Simple User Interface:** Provide an accessible interface for entering project briefs and viewing results.

## 🛠️ Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Analysis

* JavaScript-based Naive Bayes classifier

### Development Tools

* Visual Studio Code
* Git
* GitHub
* npm

## ⚙️ How It Works

1. The user enters a software project brief.
2. The application analyzes the submitted requirements.
3. The system identifies potentially ambiguous requirements and possible risks.
4. The application displays an estimated effort category and risk score.
5. The analysis is saved to the database.
6. The user can review previous analyses through the history feature.

## 🚀 Getting Started

Follow these steps to run the project on your local computer.

### Prerequisites

Install the following tools:

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)
* [MongoDB](https://www.mongodb.com/)

A MongoDB database connection is required for database-related features.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your GitHub repository URL.

### 2. Navigate to the Project Folder

```bash
cd YOUR_PROJECT_FOLDER
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Vite will display a local URL in the terminal. Open that URL in your browser to access the application.

**Note:** The frontend development server may run separately from the backend. Follow the project's configured scripts to start the backend and connect the database if required.

## 📁 Project Structure

The project currently uses a Vite-based structure. The exact folder organization may change as development continues.

```text
ScopeCreep/
├── public/
│   └── favicon.svg
├── src/
│   └── Application source files
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
└── README.md
```

Backend and database files may be organized into additional folders as those components are implemented.

## 🎓 Project Purpose

ScopeCreep is being developed as an academic portfolio project to demonstrate practical skills in frontend development, backend development, database integration, and software requirements analysis.

It also provides an opportunity to explore basic machine learning classification techniques using JavaScript.

## 🔮 Future Improvements

* Improve ambiguity detection and requirement classification.
* Add user authentication.
* Provide more detailed risk explanations.
* Improve the analysis history interface.
* Add project reports and export functionality.
* Deploy the application online.

## 👨‍💻 Author

Developed as an academic portfolio project.

## 📄 License

This project is intended for educational and portfolio purposes. A license can be added when the distribution terms are decided.

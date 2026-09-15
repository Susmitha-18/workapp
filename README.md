# 🏆 Sports Website

A modern sports-focused web application built using **React.js, Vite, and Firebase**.  
The website provides a centralized platform for sports-related content, user authentication, sports news, performance insights, training guidance, and user support.

## 🚀 Features

- 🔐 User Sign In and Sign Up
- 🔥 Firebase integration
- 📰 Sports news and updates
- 👤 User profile and profile details
- 📊 Performance insights
- 🏋️ Training guidance
- 💬 Support section
- 📱 User-friendly and responsive interface

## 🛠️ Technologies Used

- **Frontend:** React.js
- **Build Tool:** Vite
- **Backend / Authentication:** Firebase
- **Programming Language:** JavaScript / JSX
- **Development Environment:** Visual Studio Code
- **Package Manager:** npm

## 🔥 Firebase Integration

Firebase is integrated into the project to provide application services such as authentication and Firebase project configuration.

The Firebase configuration is maintained in:

```text
src/firebase.js
```

Firebase is initialized using the Firebase SDK:

```javascript
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

Firebase provides the project with a reliable platform for handling authentication and other backend-related services.

> **Note:** Firebase web configuration is normally included in client-side applications. Appropriate Firebase Security Rules and authentication controls should be configured for production use.

## 📂 Project Structure

```text
sports-website/
│
├── src/
│   ├── firebase.js
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── ProfileDetails.jsx
│   ├── PerformanceInsights.jsx
│   ├── SportsNews.jsx
│   ├── Support.jsx
│   ├── TrainingGuidance.jsx
│   └── ...
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🔐 Sign In Page

The application provides a simple and user-friendly sign-in page that allows users to securely access the sports website.

### Sign In Page Preview

![Sports Website Sign In](screenshots/Screenshot%202025-09-19%20100527.png)

## 🔥 Firebase Project Setup

The project was integrated with Firebase during development. The Firebase project was initialized from the sports website project directory.

The Firebase configuration and initialization can be found in:

```text
src/firebase.js
```

### Firebase Setup Screenshot

![Firebase Setup in VS Code](screenshots/Screenshot%202025-09-19%20203622.png)

The screenshot shows the **Sports Website project structure in Visual Studio Code**, the `firebase.js` configuration file, and the Firebase initialization process in the terminal.

## ▶️ How to Run the Project

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd sports-website
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

After starting the development server, Vite will provide a local URL, usually:

```text
http://localhost:5173
```

Open the URL in your browser to view the Sports Website.

## 🔥 Firebase Setup

To configure Firebase for the project:

1. Create a project in Firebase Console.
2. Register the web application.
3. Copy the Firebase configuration.
4. Add the configuration to `src/firebase.js`.
5. Enable the required Firebase services.
6. Run the application using Vite.

Example Firebase initialization:

```javascript
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // Firebase configuration
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

## 📸 Screenshots

### Sign In Page

![Sign In Page](screenshots/Screenshot%202025-09-19%20100527.png)

### Firebase Integration

![Firebase Integration](screenshots/Screenshot%202025-09-19%20203622.png)

## 🎯 Project Objective

The main objective of this project is to develop a sports-oriented web platform that combines **user authentication, sports information, performance-related features, training guidance, and user support** in a single application.

The project demonstrates the use of modern frontend development with React and Vite along with Firebase integration.

## 🔮 Future Enhancements

- 🏟️ Live sports scores and match updates
- 📊 Advanced player performance analytics
- 👤 Personalized player dashboards
- 🔔 Sports event notifications
- 🏆 Tournament and match tracking
- 📱 Improved mobile responsiveness
- 🔥 Additional Firebase-based features
- 🤖 AI-powered sports and training recommendations

## 👩‍💻 Author

**Susmitha Sivakumar**

---

⭐ If you find this project useful, consider giving the repository a star!

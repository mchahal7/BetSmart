Perfect. Here's a clean, professional, and natural-sounding `README.md` file for your Bet Smart project:

---

## Bet Smart

### Description

**Bet Smart** is a sports odds web application that allows users to view daily matchups and compare betting odds from multiple bookmakers. The goal of the project is to present betting data in a clear, user-friendly format so users can make more informed decisions. The app includes voice-controlled navigation, chart visualizations of betting odds, and a clean interface that works across modern browsers.

### Supported Browsers

Bet Smart is optimized for use in the latest versions of:

* Google Chrome
* Mozilla Firefox
* Microsoft Edge
* Safari (macOS and iOS)

### Developer Manual

[Jump to Developer Manual](#developer-manual)

---

## Developer Manual

### Installation Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/bet-smart-frontend.git
   ```
2. Navigate into the project folder:

   ```bash
   cd bet-smart-frontend
   ```
3. No build step is required. All files are static. You can open `index.html` directly in a browser or serve the files using a simple static server like `Live Server` in VS Code.

---

### Project Structure

* `index.html` – Home page with sport selection and team search
* `about.html` – Project background and team information
* `daily-matches.html` – Displays matchups and bookmaker odds
* `script.js` – Handles fetching and navigating to matches
* `daily-matches.js` – Fetches match data and renders odds
* `betsmart.css` – Shared styling across all pages

---

### Fetch API Use

The app uses the Fetch API to:

* Load available sports
* Fetch daily matches and odds from The Odds API
* (Optional) Connect with backend routes (in progress)

---

### External Libraries Used

* **Chart.js** – Used to display visual comparisons of odds across bookmakers
* **Annyang.js** – Enables basic voice command features like navigation and match search

---

### Known Issues

* Backend integration is still in progress. While the Node.js server and Supabase database are configured, the browser could not reach `/matches` consistently during testing. This appears to be an environment-specific issue and does not affect the core functionality of the frontend.
* Voice command accuracy may vary depending on browser and microphone settings.

---

### Roadmap

* Finalize connection to backend API to store and retrieve match data from Supabase
* Allow users to save favorite matchups
* Add user authentication for personalized features
* Improve mobile responsiveness and accessibility

---


Thanks! Here's the updated documentation tailored to your project:

---

# 🧠 Tic-Tac-Toe Game with AI  
**GitHub:** [inusha-thathsara/tictactoe](https://github.com/inusha-thathsara/tictactoe)  
**Live Demo:** [Play Online](https://inusha-thathsara.github.io/tictactoe/)

A clean and modern Tic-Tac-Toe game built using **TypeScript**, where users can play against another player or an AI opponent with four difficulty levels: Easy, Normal, Hard, and Impossible (Minimax-based). Hosted via GitHub Pages.

---

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Game Modes](#game-modes)
- [AI Difficulty Levels](#ai-difficulty-levels)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

---

## 🎮 Features

- 🧑‍🤝‍🧑 **Player vs Player**: Two users can play locally
- 🤖 **Player vs AI**: Face off against computer opponents
- 🧠 **4 Difficulty Levels**:
  - Easy
  - Normal
  - Hard
  - Impossible (unbeatable AI using Minimax)
- 🎯 Win detection & end screen
- ♻️ Reset and restart options
- 📱 Mobile-responsive design

---

## 🛠️ Tech Stack

| Language / Tech | Role                        |
|------------------|-----------------------------|
| **TypeScript**   | Core game logic & AI        |
| **CSS**          | Responsive styling          |
| **JavaScript**   | UI handling (minimal)       |
| **HTML**         | Structure and layout        |

> **GitHub Language Distribution:**
> - TypeScript: 88.5%  
> - CSS: 5.9%  
> - JavaScript: 3.5%  
> - HTML: 2.1%  

---

## 🎯 Game Modes

- **👤 Player vs Player**  
  Two users take turns on the same device.

- **🤖 Player vs AI**  
  Choose from four AI difficulties and test your skill.

---

## 🤖 AI Difficulty Levels

| Level       | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| Easy        | Picks random available cells                                                |
| Normal      | Blocks immediate threats, no strategy                                       |
| Hard        | Combines blocking and simple win prediction                                 |
| Impossible  | Implements the **Minimax algorithm** for perfect and unbeatable gameplay    |

---

## 🚀 Getting Started

### ▶️ Play Online

Click here: 👉 [https://inusha-thathsara.github.io/tictactoe/](https://inusha-thathsara.github.io/tictactoe/)

### 💻 Run Locally

```bash
# Clone the repository
git clone https://github.com/inusha-thathsara/tictactoe.git
cd tictactoe

# Open index.html in your browser
```

No build tools are required. This is a fully static site.

---

## 📁 Project Structure

```
tictactoe/
├── index.html                # Main HTML file
├── style.css                 # Game styles
├── script.js                 # DOM interactions (optional)
├── typescript/
│   └── game.ts               # Game logic and AI (main logic here)
├── README.md
└── LICENSE
```

---

## ⚙️ How It Works

- Game board is a 3x3 grid dynamically updated based on user input.
- All logic is handled in **TypeScript**, including turn tracking, win detection, and AI logic.
- The Impossible mode AI uses the **Minimax algorithm** to guarantee optimal play.
- CSS handles layout and responsiveness, while JavaScript connects UI with game logic.

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push to your branch: `git push origin feature-name`
5. Submit a pull request

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

Would you like me to generate this as a downloadable `README.md` file for you?
## Getting Started

1. Run `npm install`
2. Run `npm run dev`

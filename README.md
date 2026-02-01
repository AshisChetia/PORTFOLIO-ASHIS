# ⚡ Ashish Chetia | Backend Architect Portfolio

A high-performance, dark-themed personal portfolio built with **React, Vite, and GSAP**.  
Designed to showcase backend architecture expertise with fluid animations and a premium interactive experience.

🔗 **Live Demo:** [https://portfolio-ashis.vercel.app](https://portfolio-ashis.vercel.app)

---

## 🛠 Tech Stack

* **Core:** React.js (Vite)
* **Styling:** CSS3 (Custom Variables, Responsive Grid)
* **Animations:** GSAP (ScrollTrigger, Timeline, Tween)
* **Icons:** React Icons (FontAwesome)
* **Form Handling:** Formspree (Serverless)
* **Deployment:** Vercel

---

## ✨ Key Features

### 1. 🎭 Advanced Animations (GSAP)
* **Hero Section:** Synchronized text stagger and image reveal sequence on load.
* **Scroll Triggers:** Elements fade in and slide up gracefully as you scroll.
* **Magnetic Hover Effects:** Buttons and cards have micro-interactions for a tactile feel.

### 2. 📂 "Sticky" Project Gallery
* **Desktop:** Uses `position: sticky` to create a stacking card effect, where new projects slide over previous ones.
* **Mobile:** Switches to a clean vertical feed for better performance.
* **Interactive Media:** Projects display high-res covers that crossfade into **autoplay videos** on hover.

### 3. 🖥 Mac-Style Navigation Dock
* A floating, glassmorphism dock at the bottom of the screen for quick navigation between sections (Home, Skills, Work, About, Contact).

### 4. 📬 Functional Contact System
* Integrated with **Formspree** for serverless email handling.
* Includes client-side validation.
* Custom **Toast Notifications** (Success/Error) replacing standard alerts.
* Secured using Environment Variables.

---

## 🚀 Setup & Installation

If you want to run this project locally:

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/AshisChetia/PORTFOLIO-ASHIS.git](https://github.com/AshisChetia/PORTFOLIO-ASHIS.git)
    cd PORTFOLIO-ASHIS
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your keys:
    ```env
    VITE_FORMSPREE_ID=your_formspree_id_here
    VITE_MY_EMAIL=your_email@example.com
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

---

## 📁 Project Structure

```text
src/
 ├── assets/           # (Empty or unused assets)
 ├── components/       # Core UI Components
 │   ├── About.jsx     # Bio, Resume Download & Socials
 │   ├── About.css     # Styling for About Section
 │   ├── Contact.jsx   # Formspree Form & Toast Logic
 │   ├── Contact.css   # Styling for Contact Section
 │   ├── Dock.jsx      # Mac-Style Floating Navigation
 │   ├── Dock.css      # Styling for Dock
 │   ├── Landing.jsx   # Hero Section (Clock, Intro & GSAP Animations)
 │   ├── Landing.css   # Styling for Landing Section
 │   ├── Projects.jsx  # Sticky Card Gallery & Video Logic
 │   ├── Projects.css  # Styling for Projects Section
 │   ├── Skills.jsx    # Tech Stack & Hover Effects
 │   └── Skills.css    # Styling for Skills Section
 ├── data/
 │   └── projectData.js # Static Data for Projects (Videos, Links, Text)
 ├── App.jsx           # Main Layout & Component Composition
 ├── App.css           # Global Styles & Variables
 ├── index.css         # Base Tailwind/Global Resets
 ├── main.jsx          # React DOM Entry Point
 └── vite-env.d.ts     # (Vite Types)
public/
 ├── aboutImg.jpg      # Profile Photo for About Section
 ├── coding.png        # (Asset)
 ├── heroImg.jpg       # Main Hero Image
 ├── resume.pdf        # Downloadable Resume File
 └── sweetbite.png     # Project Thumbnail

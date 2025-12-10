# ***3D Portfolio***

An immersive, interactive 3D personal website built to showcase my projects and skills. This project leverages **WebGL** and **React** to create a unique, gamified user experience, featuring real-time 3D rendering, physics-based animations, and responsive interactions.

**Live Site:** [https://Advaith1509.github.io/portfolio-website](https://Advaith1509.github.io/portfolio-website)

---

## ***Tech Stack***

This project is built with a modern frontend stack focused on performance and 3D graphics:

*   **Core**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Fast HMR & Bundling)
*   **3D Engine**: [Three.js](https://threejs.org/)
*   **React Integration**: 
    *   [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber): React renderer for Three.js.
    *   [@react-three/drei](https://github.com/pmndrs/drei): Useful helpers for R3F (OrbitControls, loaders, etc.).
*   **Animations**: 
    *   [GSAP](https://greensock.com/gsap/): Complex timeline animations and scroll transitions.
    *   **Custom Shaders/Particles**: HTML5 Canvas API for background effects.
*   **Styling**: [Styled Components](https://styled-components.com/) (CSS-in-JS).

## ***Key Features***

*   **Interactive 3D Assets**:
    *   **Voxel Dog Model**: A GLTF model (`dog3.glb`) customized with a dynamically mapped texture (`minecraft_screen.png`) applied to the screen mesh at runtime.
    *   **Physics-based Skills**: A `SkillBall` component using `three-spritetext` and physics simulations for a floating tag look.
*   **Performance Optimization**:
    *   **Canvas Particle System**: A lightweight 2D canvas layer (`ParticlesBackground.jsx`) that runs outside the main React render cycle for smooth 60fps backgrounds without WebGL overhead.
    *   **Lazy Loading**: Assets and components are loaded efficiently using Vite.
*   **Custom Aesthetics**:
    *   **Minecraft/Pixel Art Theme**: Unified design language across project thumbnails and favicons.
    *   **Dynamic Lighting**: Scene lighting reacts to view (Mobile/Desktop) tweaks.

## ***Project Structure***

```bash
src/
├── assets/             # GLTF models, Images, and Global Styles
├── components/         # Reusable UI components (Navbar, Buttons, Layouts)
│   └── ParticlesBackground.jsx  # Optimized 2D Canvas background
├── context/            # Global state (Navbar context)
├── data/               # Static data for Projects and Experience
├── pages/              # Main Route Components
│   ├── home/           # Landing page with 3D Dog scene
│   ├── About/          # Skills sphere and bio
│   └── Projects/       # Project carousel
└── utils/              # Theme configuration (colors, typography)
```

## ***Getting Started***

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Advaith1509/portfolio-website.git
    cd portfolio-website
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run development server**:
    ```bash
    npm run dev
    ```

## ***Deployment***

This project is configured for **GitHub Pages**.

To deploy a new version:

```bash
npm run deploy
```

This script builds the project (`vite build`) and pushes the `dist` folder to the `gh-pages` branch.

---

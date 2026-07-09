import { normalize } from "polished";
import { createGlobalStyle } from "styled-components";
import { primaryFont } from "./typography";

export const GlobalStyles = createGlobalStyle`
${normalize()}
:root {
  --accent: #2ad4e6;
  --accent-ink: #04252b;
  font-size: 16px;
  line-height: 24px;
  font-family: ${primaryFont};
  color-scheme: dark;
  color: rgba(255, 255, 255, 0.87);
  background:
    radial-gradient(1200px 800px at 80% -10%, rgba(42, 212, 230, 0.06), transparent 60%),
    #1a1712;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

*, *::after, *::before{
  box-sizing: border-box;
  margin: 0;
  padding:0;
  text-decoration: none;
}

body {
  margin: 0;
  min-height: 100vh;
}

body.custom-cursor,
body.custom-cursor * {
  cursor: none !important;
}

::selection {
  background: var(--accent);
  color: var(--accent-ink);
}

a {
  color: var(--accent);
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--accent);
  border: 2px solid #1a1712;
}
`;

import { createGlobalStyle, css } from "styled-components";

export const RootStyle = createGlobalStyle(css`
  :root {
    /* Colors */
    --color-background: hsl(358deg, 74%, 94%);
    --color-text: hsl(240deg, 21%, 15%);
    --color-accent: hsl(355deg, 80%, 70%);

    --color-light: hsl(220deg, 23%, 95%);
    --color-dark: hsl(240deg, 23%, 9%);

    --color-accent-dark: hsl(355deg, 70%, 60%);
    --color-light-dim: hsla(240deg, 100%, 100%, 40%);
    --color-light-dimmer: hsla(240deg, 100%, 100%, 20%);

    --color-green: hsl(96deg, 44%, 60%);
    --color-red: hsl(359deg, 68%, 60%);

    --color-green-dark: hsl(96deg, 44%, 50%);
    --color-red-dark: hsl(359deg, 68%, 50%);

    /* Fonts */
    --font-highlight: "Fjalla One";
    --font-normal: "Space Grotesk";
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
  }

  #root {
    min-height: calc(100svh - 64px);
    margin: 0 auto;
    margin-bottom: 64px;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: var(--font-normal), system-ui, sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`);

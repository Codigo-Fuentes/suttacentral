import { html,css } from 'lit-element';

export const commonStyles = css`
  :root{
    --sc-screen-sm: 600px;
    --sc-screen-md: 840px;
    --sc-screen-l: 960px;
    --sc-screen-xl: 1280px;

    --sc-size-xxs: 2px;
    --sc-size-xs: 4px;
    --sc-size-sm: 8px;
    --sc-size-md: 16px;
    --sc-size-md-larger: 24px;
    --sc-size-lg: 32px;
    --sc-size-xl: 48px;
    --sc-size-xxl: 64px;
     font-size: var(--sc-skolar-font-size-md);
  }
  * {
  margin: 0
}

  main {
    display: flex;
    justify-content: center;
    background-color: var(--sc-tertiary-background-color);
    color: var(--sc-primary-text-color);

          }
          article{
                margin: 4em 1em ;
          }
  header {
    text-align: center;
    color: var(--sc-secondary-text-color);
    margin: 4em 0;
  }
  header li span.text
  {
    font-variant-caps: all-small-caps;
    font-weight: normal;
    font-family: var(--sc-sans-font);
  }


header ul{
  margin: 0.7em 0;
  list-style-type: none;
}

h2, h3, h4, h5, h6 {
  margin: 1em 0 0 0;
  color: var(--sc-secondary-text-color);
}
p, ul, ol{
  margin: 0.75em 0 0 0;
  line-height: 1.5;
  font-family: var(--sc-serif-font);
  font-size: 1em;
  padding: 0
}
/* font sizes */
h1, h2, h3, h4, h5, h6{
    line-height: 1.3333;
    font-family: var(--sc-serif-font);
}
h1{
  font-size: 2em;
  font-size: clamp(1.5em, 5vw, 2em);
  font-weight: 300;
  font-variant-caps: small-caps;
  letter-spacing: var(--sc-caps-letter-spacing);
  text-align: center;
}
h2{
  font-size: 1.5em;
  font-size: clamp(1.125em, 3.75vw, 1.5em);
  font-weight: 400;
  font-variant-caps: small-caps;
  letter-spacing: var(--sc-caps-letter-spacing);
  text-align: center;
}
h3{
  font-size: 1.333em;
  font-size: clamp(1em, 3.333vw, 1.333em);
  font-weight: 400;
  font-variant-caps: small-caps;
  letter-spacing: var(--sc-caps-letter-spacing);
  text-align: center;
}
h4{
  font-size: clamp(1em, 5vw, 1.333em);;
  font-weight: 600;
}
h5{
  font-size: 1em;
  font-weight: 600;
}
h6{
  font-size: 1em;
  font-weight: 400;
}

  .evam  {
    font-variant-caps: all-small-caps;
  }

  blockquote {
    margin-left: 2em;
    margin-right: 2em;
  }

   .endsection,
  .end,
  .endkanda  {
    font-style: italic;
    text-align: center;
    color: var(--sc-secondary-text-color);
  }

  .endsutta {
    font-weight: bold;
    text-align: center;
    color: var(--sc-secondary-text-color);
  }
    .endbook {
    font-weight: bold;
    text-align: center;
    color: var(--sc-secondary-text-color);
    text-transform: uppercase;
    letter-spacing: var(--sc-caps-letter-spacing);
  }

  .endvagga {
    text-align: center;
    color: var(--sc-secondary-text-color);
    text-transform: uppercase;
    letter-spacing: var(--sc-caps-letter-spacing);
  }

  .uddana .text,
  .uddanagatha .text
   {
    color: var(--sc-secondary-text-color);
    font-size: var(--sc-skolar-font-size-s);
    font-weight: 400;
  }

  .uddana-intro .text {
    font-weight: bold;
    color: var(--sc-secondary-text-color);
  }


/* Notes */

  /* Anchor tooltips. */
  article {
    position: relative;
  }

  .variant,
  .comment,
  a {
    display: inline-block;
    font-family: var(--sc-sans-font);
    z-index: 10;
    box-sizing: border-box;
    color: var(--sc-secondary-text-color);
  }

  .variant,
  .comment {
    padding: var(--sc-size-sm) var(--sc-size-md);
    border-radius: var(--sc-size-sm);
    background-color: var(--sc-secondary-background-color);
    font-size: var(--sc-skolar-font-size-s);
    line-height: 1.3333;

  }

  .variant:hover,
  .comment:hover{
    cursor: help;
  }

.reference  a {
    color: var(--sc-secondary-text-color);
    text-decoration: none;
    white-space: nowrap;
   font-feature-settings: "dnom";
  font-weight: 500;
  font-style: normal;
  letter-spacing: -0.4px;
  font-variant-caps: normal;
  }
  .reference  a:after{
    content: " ";
    white-space: pre;
  }
  header .reference a,
  h2 .reference a,
  h3 .reference a,
  h4 .reference a,
  h5 .reference a,
  h6 .reference a{
    display: none
  }

  .pts:before{
    content: "pts";
    font-variant-caps: all-small-caps;
     font-feature-settings: "ordn";
  }



  /* Set shared styles for the tooltip, but don't show it. Specify classes, avoid unattributed attribute selector for performance.*/

  .comment[data-tooltip]::after,
  .variant[data-tooltip]::after {
    content: attr(data-tooltip);
    display: none;
    position: absolute;
    white-space: normal;
    width: 300px;
    left: 50%;
    margin-left: -150px;
    padding: var(--sc-size-sm) var(--sc-size-md);
    border-radius: var(--sc-size-sm);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    z-index: 10;
    box-sizing: border-box;
    background-color: var(--sc-secondary-background-color);
    color: var(--sc-secondary-text-color);
  }

  .comment[data-tooltip]::after {
    border-style: solid;
    border-width: 1px 1px 1px 4px;
    border-color: var(--sc-primary-accent-color);
  }

  .variant[data-tooltip]::after {
    border-style: solid;
    border-width: 1px 1px 1px 4px;
    border-color: var(--sc-secondary-accent-color);
  }

  .spanFocused {
    background-color: var(--sc-primary-color-light);
    color: var(--sc-paper-tooltip-color);
  }

  span, p, li {
    hanging-punctuation: first last;
  }

`;

export const plainStyles = html`
  <style>
    article {
      max-width: 720px;
    }

    .reference,
    .root {
      display: none;
    }

    /* Set styles for tooltip marker. First we hide the actual content. These settings ensure the beginning, i.e. the :before content, is visible and the rest is hidden. Height is important to maintain even line-height. */
    .comment,
    .variant {
      width: 12px;
      height: 1em;
      white-space: nowrap;
      background-color: inherit;
      padding: 0 6px 0 0;
      overflow: hidden;
      border: none;
    }

    /* Set asterisk as note marker, align it as superscript, and ensure the line-height is not affected. */
    .comment::before,
    .variant::before {
      content: "✱";
      color: var(--sc-primary-color);
      vertical-align: super;
      line-height: 1;
    }

    .comment[data-tooltip]:hover,
    .variant[data-tooltip]:hover{
      cursor: help;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
  </style>
`;

export const plainPlusStyles = html`
  <style>
    .root {
      display: none;
    }

    /* Let min width be handled by media queries, max width according to the nested grid width.*/
    .segment {
      display: grid;
      grid-template-columns: 100px minmax(0, auto);
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;
    }

    .translation {
      grid-column: 2;
    }

    .translation {
      display: grid;
      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
      position: relative;
    }

    .text {
      grid-column: 1;
    }

    .comment {
      grid-column: 2;
      position: absolute;
      grid-row: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }

    .comment {
      border-style: solid;
      border-width: 1px 1px 1px 4px;
      border-color: var(--sc-primary-accent-color);
    }

    /* click on notes to raise obscured note when they overlap. this should be replaced by JS  */
    .comment:active{
      z-index: 1000;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    /* remove <br> tags to avoid unsighlty spaces in verses. */
    br {
      content: "";
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .reference,
      .translation,
      .root {
        display: block;
      }

      .variant,
      .comment {
        display: table;
        position: relative;
        margin-top: var(--sc-size-sm);
      }

      .comment:active,
      .variant:active {
        z-index: 1;
        box-shadow: none;
      }
    }
  </style>
`;

export const sideBySideStyles = html`
  <style>
    .segment {
      display: grid;
      grid-template-columns: minmax(240px, 720px) minmax(240px, 720px);
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      display: none;
    }

    .translation {
      grid-column: 1;
    }

    .root {
      grid-column: 2;
    }

    br {
      content: "";
    }

    /* Center the tooltip in the respective column */
    .translation,
    .root {
      position: relative
    }

    /* Set styles for tooltip marker. First we hide the actual content of the .comment tag. These settings ensure the beginning of .comment, i.e. the :before content, is visible and the rest is hidden. Height is important to maintain even line-height. */
    .comment,
    .variant {
      width: 12px;
      height: 1em;
      white-space: nowrap;
      background-color: inherit;
      padding: 0 5px 0 0;
      overflow: hidden;
    }

    /* Set asterisk as note marker, align it as superscript, and ensure the line-height is not affected. */
    .comment:before,
    .variant:before {
      content: "✱";
      color: var(--sc-primary-color);
      vertical-align: super;
      line-height: 1;
    }

    .comment[data-tooltip]:hover,
    .variant[data-tooltip]:hover {
      cursor: help;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .translation,
      .root {
          display: block;
          position: relative;
      }
      .root .text {
          color: var(--sc-secondary-text-color);
      }
    }
  </style>
`;

export const sideBySidePlusStyles = html`
  <style>
    .segment {
      display: grid;
      grid-template-columns: 100px  minmax(0, auto) minmax(0, auto);
      grid-column-gap: var(--sc-size-lg);
      position: relative;
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;
    }

    .translation{
      grid-column: 2;
    }

    .root{
      grid-column: 3;
    }

    .translation,
    .root {
      display: grid;
      grid-template-columns: minmax(240px, 720px) minmax(120px, 300px);
      grid-column-gap: var(--sc-size-lg);
      position: relative;
    }

    .text {
      grid-column: 1;
    }

    .comment,
    .variant {
      grid-column: 2;
      position: absolute;
      grid-row: 1;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .variant {
      border-style: solid;
      border-width: 1px 1px 1px 4px;
      border-color: var(--sc-secondary-accent-color);
    }

    .comment {
      border-style: solid;
      border-width: 1px 1px 1px 4px;
      border-color: var(--sc-primary-accent-color);
    }

    .comment:active,
    .variant:active {
      z-index: 1000;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    br {
      content: "";
    }

    blockquote {
      margin: 0;
    }

    @media only screen and (max-width: 1280px) {
      .translation,
      .root,
      .variant,
      .comment {
        display: table;
        position: relative;
        box-shadow: none;
        margin-top: var(--sc-size-sm);
      }

      .segment {
        grid-template-columns: minmax(240px, 720px) minmax(240px, 720px);
      }

      .reference {
        grid-column: 1 / span 2;
      }

      .translation{
        grid-column: 1;
      }

      .root{
        grid-column: 2;
      }

      .comment:active,
      .variant:active {
        z-index: 1;
        box-shadow: none;
      }
    }

    @media only screen and (max-width: 600px) {
      .segment,
      .reference,
      .translation,
      .root {
        display: block;
      }

      .variant,
      .comment {
        display: table;
        position: relative;
        box-shadow: none;
        margin-top: var(--sc-size-sm);
      }

      .comment:active,
      .variant:active {
        z-index: 1;
        box-shadow: none;
      }

      .root .text {
        color: var(--sc-secondary-text-color);
      }
    }
  </style>
`;

export const lineByLineStyles = html`
  <style>
    .segment {
      display: grid;
      grid-template-columns: minmax(200px, 720px);
    }

    .reference {
      display: none;
    }

    .translation {
      grid-column: 1;
    }

    .root {
      grid-column: 1;
    }

    .root .text {
      color: var(--sc-secondary-text-color);
    }

    br {
      content: "";
    }

    .comment,
    .variant {
      width: 12px;
      height: 1em;
      white-space: nowrap;
      background-color: inherit;
      padding: 0 5px 0 0;
      overflow: hidden;
    }

    /* Set asterisk as note marker, align it as superscript, and ensure the line-height is not affected. */
    .comment:before,
    .variant:before {
      content: "✱";
      color: var(--sc-primary-color);
      vertical-align: super;
      line-height: 1;
    }

    .comment[data-tooltip]:hover,
    .variant[data-tooltip]:hover {
      cursor: help;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
    </style>
  `;

  export const lineByLinePlusStyles = html`
    <style>
    .segment {
      display: grid;
      grid-template-columns: 100px minmax(0, auto);
      grid-column-gap: var(--sc-size-lg);
    }

    .reference {
      grid-column: 1;
      grid-row: 1 / span 3;
    }

    .translation {
      grid-column: 2;
    }

    .root{
      grid-column: 2;
    }

    .root .text {
      color: var(--sc-secondary-text-color);
    }

    .translation,
    .root {
      display: grid;
      grid-template-columns: minmax(240px, 720px) minmax(120px, 480px);
      grid-column-gap: var(--sc-size-lg);
      position: relative;
    }

    .text {
      grid-column: 1;
    }

    .comment,
    .variant {
      grid-column: 2;
      position: absolute;
      grid-row: 1;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    .variant {
      border-style: solid;
      border-width: 1px 1px 1px 4px;
      border-color: var(--sc-secondary-accent-color);
    }

    .comment {
      border-style: solid;
      border-width: 1px 1px 1px 4px;
      border-color: var(--sc-primary-accent-color);
    }

    .comment:active,
    .variant:active {
      z-index: 1000;
      box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    br {
      content:"";
    }

    blockquote {
      margin: 0;
    }

    blockquote .text {
      margin-left: 2em;
    }

    @media only screen and (max-width: 840px) {
      .segment,
      .reference,
      .translation,
      .root {
        display: block;
      }

      .variant,
      .comment {
        display: table;
        position: relative;
        box-shadow: none;
        margin-top: var(--sc-size-sm);
      }

      .comment:active,
      .variant:active{
        z-index: 1;
        box-shadow: none;
      }
    }
  </style>
`;

export const allInlineReferenceStyles = html`
  <style>
    /* Set column width on article. Position: relative ensures that the tooltips anchor to <article> */
    article {
      max-width: 720px;
    }

    .variant,
    .root {
      display: none;
    }

    /* Set styles for tooltip marker. First we hide the actual content of the .comment tag. These settings ensure the beginning of .comment, i.e. the :before content, is visible and the rest is hidden. Height is important to maintain even line-height. */
    .comment,
    .variant {
      width: 12px;
      height: 1em;
      white-space: nowrap;
      background-color: inherit;
      padding: 0 5px 0 0;
      overflow: hidden;
    }

    /* Set asterisk as note marker, align it as superscript, and ensure the line-height is not affected. */
    .comment:before,
    .variant:before {
      content: "✱";
      color: red;
      vertical-align: super;
      line-height: 1;
    }

    .comment[data-tooltip]:hover,
    .variant[data-tooltip]:hover {
      cursor: help;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
  </style>
`;

export const mainInlineReferenceStyles = html`
  <style>
    /* Set column width on article. Position: relative ensures that the tooltips anchor to <article> */
    article {
      max-width: 720px;
    }

    .variant,
    .root,
    a {
      display: none;
    }

    a:first-of-type {
      display: inline-block;
    }

    /* Set styles for tooltip marker. First we hide the actual content of the .comment tag. These settings ensure the beginning of .comment, i.e. the :before content, is visible and the rest is hidden. Height is important to maintain even line-height. */
    .comment,
    .variant {
      width: 12px;
      height: 1em;
      white-space: nowrap;
      background-color: inherit;
      padding: 0 5px 0 0;
      overflow: hidden;
    }

    /* Set asterisk as note marker, align it as superscript, and ensure the line-height is not affected. */
    .comment:before,
    .variant:before {
      content: "✱";
      color: red;
      vertical-align: super;
      line-height: 1;
    }

    .comment[data-tooltip]:hover,
    .variant[data-tooltip]:hover {
      cursor: help;
    }

    /* Show the tooltip. Note that using this technique it is not possible to use transition on the display.*/
    .comment[data-tooltip]:hover::after,
    .variant[data-tooltip]:hover::after {
      display: block;
    }
  </style>
`;
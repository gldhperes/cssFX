// Define e exporta a função
export const generatePreviewDocument = (htmlCode, cssCode) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <style>
    ${defaultCSS}
    ${cssCode}
    </style>
  </head>
  <body>
    ${htmlCode}
  </body>
  </html>
`;

const defaultCSS = `
  html, body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  }
`


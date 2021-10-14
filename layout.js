'use strict';

function layout(title, content) {
  return /* html */ `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Post-it Board" />
    <meta name="keywords" content="Post-it, memo, micro-blogging" />
    <meta name="author" content="lopezelpesado, elenamarinaki, moggach, aaadriana" />
    <link rel="stylesheet" href="./styles.css" /> 
    <title>${title}</title>
  </head>
  <body>
    ${content}
  </body>
  </html>
    `;
}

module.exports = layout;

'use strict';

const layout = require('../layout');

function get(request, response) {
  const html = /*html*/ `
    <header>
        <h1 class='center'>Post-It Board</h1>
    </header>
    <main>
        <section>
            <div class='center links'>
                <a href="/sign-up">Sign-Up</a>
                <a href="/log-in">Log-in</a>
            </div>    
        </section>
    </main>
`;
  response.send(layout('home', html));
}

module.exports = { get };

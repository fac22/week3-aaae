'use strict';

const layout = require('../layout');

function get(request, response) {
  const html = /*html*/ `
    <header>
        <div class="center row">
        <img src="images/post-it.png" alt="post-it" />
        <h1>Post-It Board</h1>
        </div>
    </header>
    <main>
        <section>
            <a href="/sign-up">Sign-Up</a>
            <a href="/log-in">Log-in</a>
        </section>
    </main>
`;
  response.send(layout('home', html));
}

module.exports = { get };

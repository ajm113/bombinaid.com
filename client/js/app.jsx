import { h, render } from 'preact';
import { Router, route } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Home from './components/Home.jsx';

function requireAll (r) { r.keys().forEach(r); }

requireAll(require.context('../pug', true, /\.pug$/));

import '../scss/style.scss';

const Main = () => (
    <div class="container grid-lg" id="root">
        <Router>
            <Home default path="/" />
        </Router>
    </div>
);

render(<Main />, document.body);


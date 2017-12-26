import { h, render } from 'preact';
import { Router, route } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Home from './components/Home.jsx';
import Error from './components/Error.jsx';

function requireAll (r) { r.keys().forEach(r); }

requireAll(require.context('../pug', true, /\.pug$/));

function getSearch(url, cb, props){
    return System.import('./components/Search.jsx').then(module => module.default);
}


import '../scss/style.scss';

const Main = () => (
    <div class="container grid-lg">
        <Router>
            <Home path="/" />
            <AsyncRoute path="/q/:query" getComponent={getSearch} loading={ () => <div>Thinking...</div> } />
            <Error type="404" default />
        </Router>
    </div>
);

render(<Main />, document.body);


/* Globals: System */
import { h, render } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Home from './components/Home.jsx';
import Error from './components/Error.jsx';

function requireAll (r) { r.keys().forEach(r); }

requireAll(require.context('../pug', true, /\.pug$/));

function getSearch(){
    return System.import('./components/Search.jsx').then(module => module.default);
}

const displayLoadingContent = () => {
    return (<h2>Thinking...</h2>);
};


import '../scss/style.scss';

const Main = () => (
    <Router>
        <Home path="/" />
        <AsyncRoute path="/q/:query" getComponent={getSearch} loading={displayLoadingContent} />
        <Error type="404" default />
    </Router>
);

render(<Main />, document.body);


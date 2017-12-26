import { h, Component, render } from 'preact';

export default class Header extends Component {

    render({query}) {
        return(
            <header class="navbar">
                <section class="navbar-section">
                    <a href="/" class="navbar-brand mr-2">Bombinaid</a>
                    <form class="input-group input-inline">
                        <input class="form-input" type="search" placeholder="search" value={query} />
                        <button class="btn btn-primary input-group-btn" type="submit">Search</button>
                    </form>
                </section>
            </header>
        );
    }
}

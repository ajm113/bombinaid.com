import { h, Component, render } from 'preact';
import { route } from 'preact-router';

export default class Header extends Component {

    constructor() {
        super();
        this.state = { query: "" };
    }

    submitQuery = e => {
        e.preventDefault();

        if(this.state.query.length)
            route("/q/"+this.state.query, false);
    };

    updateQuery = e => {
        this.setState({ query: e.target.value });
    };

    render({query}) {
        return(
            <header class="navbar container p-2 fixed bg-gray">
                <section class="navbar-section">
                    <a href="/" class="navbar-brand mr-2">Bombinaid</a>
                    <form class="input-group input-inline" onSubmit={this.submitQuery}>
                        <input class="form-input" type="search" placeholder="search" value={query} onChange={this.updateQuery} />
                        <button class="btn btn-primary input-group-btn" type="submit">Search</button>
                    </form>
                </section>
            </header>
        );
    }
}

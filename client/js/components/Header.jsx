import { h, Component } from 'preact';
import SearchField from './SearchField.jsx';

export default class Header extends Component {

    render({query}) {
        return(
            <header class="navbar container p-2 fixed bg-gray">
                <section class="navbar-section">
                    <a href="/" class="navbar-brand mr-2">Bombinaid</a>
                    <SearchField query={query} isHeader="true" />
                </section>
            </header>
        );
    }
}

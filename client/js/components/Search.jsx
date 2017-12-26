import { h, Component, render } from 'preact';
import Header from './Header.jsx';

export default class Search extends Component {

    render({ query }) {
        return(
            <div>
                <Header query={query} />
                <div class="columns">

                </div>
            </div>
        );
    }
}

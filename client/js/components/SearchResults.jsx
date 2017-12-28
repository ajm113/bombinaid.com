import { h, Component } from 'preact';
import SearchResult from './SearchResult.jsx';

export default class Search extends Component {

    constructor() {
        super();
    }

    render({ searchResults }) {

        if (!searchResults) {
            return (<div class="loading loading-lg"/>);
        }

        if(!searchResults.length) {
            return (<h2>Sorry, nothing found, please change your query!.</h2>);
        }

        return(
            <div>
                {
                    searchResults.map((result) => <SearchResult result={result} />)
                }
            </div>
        );

    }
}

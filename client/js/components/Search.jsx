import { h, Component, render } from 'preact';
import Header from './Header.jsx';
import SearchResult from './SearchResult.jsx';
import axios from 'axios';

export default class Search extends Component {

    constructor({ query }) {
        super();

        this.state = {
            searchResults: []
        };

        var _this = this;

        axios.get('/api/search/'+query)
        .then(function (response) {
            _this.setState({ searchResults: response.data });
        })
        .catch(function (error) {
            console.error(error);
        });
    }

    render({ query }) {

        return(
            <div>
                <Header query={query} />
                <div class="container p-2" id="searchResults">
                    <div class="columns">
                        <div class="col-7 col-md-7 col-sm-12">
                            {
                                this.state.searchResults.map((result) => <SearchResult result={result} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

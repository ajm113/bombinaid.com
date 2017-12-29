import { h, Component } from 'preact';
import Header from './Header.jsx';
import SearchResults from './SearchResults.jsx';
import axios from 'axios';

export default class Search extends Component {

    constructor({ query }) {
        super();

        this.state = {
            searchResults: null
        };

        var _this = this;

        axios.get('/api/search/'+encodeURIComponent(query))
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
                            <SearchResults searchResults={this.state.searchResults} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

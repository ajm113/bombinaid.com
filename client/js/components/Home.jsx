import { h, Component } from 'preact';
import SearchField from './SearchField.jsx';

export default class Home extends Component {

    render() {
        return(
            <div class="container grid-lg">
                <div class="columns p-2">
                    <div class="col-sm-10 col-md-12 col-10 col-mx-auto">
                        <h1 class="text-center text-primary">Bombinaid</h1>
                        <p class="text-center text-gray">Fast, no ads, open sourced, secure searching!</p>
                        <SearchField />
                    </div>
                </div>
            </div>
        );
    }
}

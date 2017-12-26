import { h, Component, render } from 'preact';
import { route } from 'preact-router';

export default class Home extends Component {
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

    render({}, { query }) {
        return(
            <div class="container grid-lg">
                <div class="columns p-2">
                    <div class="col-sm-10 col-md-12 col-10 col-mx-auto">
                        <h1 class="text-center text-primary">Bombinaid</h1>
                        <p class="text-center text-gray">Fast, no ads, open sourced, secure searching!</p>
                        <form onSubmit={this.submitQuery}>
                            <div class="input-group has-icon-left">
                                <input type="text" class="form-input" placeholder="Search!" onChange={this.updateQuery} />
                                <button class="btn btn-primary input-group-btn hide-xs" type="submit" >Query</button>
                                <i class="form-icon icon icon-search"></i>
                            </div>
                            <div class="p-2">
                                <button class="btn btn-primary btn-block show-xs" type="submit">Query</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

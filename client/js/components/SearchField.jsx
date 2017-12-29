import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class SearchField extends Component {

    constructor({query}) {
        super();

        this.state = { query: query };
    }

    submitQuery = e => {
        e.preventDefault();

        if(this.state.query.length)
            route("/q/" + encodeURIComponent(this.state.query), false);
    };

    updateQuery = e => {
        this.setState({ query: e.target.value });
    };

    render({ isHeader }) {

        var InputField = ({query, onChange}) => {
            return (<input class="form-input" type="text" placeholder="Query me!" maxlength="2048" spellcheck="false"
                    autocomplete="off" value={query} onChange={onChange} title="Query" autofocus />
                );
        };

        var BlockButton = ({isHeader}) => {
            const rootDivClass = (isHeader) ? 'd-none' : 'p-2';
            return (
                <div class={rootDivClass}>
                    <button class="btn btn-primary btn-block show-xs" type="submit">Query</button>
                </div>
            );
        };

        const formClass = (isHeader) ? 'input-group input-inline' : '';
        const submitClass = (isHeader) ? 'btn btn-primary input-group-btn' : 'btn btn-primary input-group-btn hide-xs';

        return(
            <form class={formClass} onSubmit={this.submitQuery}>
                <div class="input-group has-icon-left">
                    <InputField query={this.state.query} onChange={this.updateQuery} />
                    <button class={submitClass} type="submit">Query</button>
                    <i class="form-icon icon icon-search"/>
                </div>
                <BlockButton isHeader={isHeader} />
            </form>
        );
    }
}

import { h, Component, render } from 'preact';

export default class Error extends Component {

    render({type, url}) {
        return(
            <div class="p-2">
                <h1 class="text-center text-error">Error {type}</h1>
                <p class="text-gray">It looks like we hit a snag.</p>
                <pre>{url}</pre>
            </div>
        );
    }
}

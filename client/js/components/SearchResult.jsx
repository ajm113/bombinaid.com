import { h, Component, render } from 'preact';

export default class SearchResult extends Component {

    render({result}) {
        console.log(result);
        return(
            <div class="tile">
                <div class="tile-icon">
                    <div class="example-tile-icon">
                        <i class="icon icon-file centered"></i>
                    </div>
                </div>
                <div class="tile-content">
                    <a href={result.link} class="tile-title text-primary">{result.title}</a>
                    <p class="tile-subtitle">{result.snippet}</p>
                    <p class="text-success">{result.displayLink}</p>
                </div>
            </div>
        );
    }
}

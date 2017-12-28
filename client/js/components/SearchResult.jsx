import { h, Component } from 'preact';

export default class SearchResult extends Component {

    render({result}) {
        return(
            <div class="tile">
                <div class="tile-icon">
                    <div class="example-tile-icon">
                        <i class="icon icon-file centered"/>
                    </div>
                </div>
                <div class="tile-content">
                    <a href={result.link} class="tile-title text-primary">{result.title}</a>
                    <p class="tile-subtitle text-gray">{result.snippet}</p>
                    <p class="text-success display-link">{result.displayLink}</p>
                </div>
            </div>
        );
    }
}

import { h, Component, render } from 'preact';

export default class Home extends Component {

    render() {
        return(
            <div class="columns p-2">
                <div class="col-sm-10 col-md-12 col-10 col-mx-auto">
                    <h1 class="text-center text-primary">Bombinaid</h1>
                    <p class="text-center text-gray">Fast, no ads, open sourced, secure searching!</p>
                    <form>
                        <div class="input-group has-icon-left">
                            <input type="text" class="form-input" placeholder="Search!" />
                            <button class="btn btn-primary input-group-btn" type="submit">Submit</button>
                            <i class="form-icon icon icon-search"></i>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

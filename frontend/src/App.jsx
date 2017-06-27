import React from 'react';
import axios from 'axios';
import PancakeForm from './PancakeForm.jsx';
import PancakeList from './PancakeList.jsx';

/**
 * The application main root component. Our application does pancake things like
 * create and list glorious pancakes of the world.
 */
class App extends React.Component {
    /**
     * Constructor for the application. Here we setup some initial state data
     * before our API calls populate the state with the persisted data from our
     * DB.
     * @param  {Object} props React props object
     * @return {void}
     */
    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
    }

    /**
     * Sends a get request for the data when the component is added to the DOM.
     * Once the data is fetched the state is updated causing the application to
     * re-render any new data.
     * @return {void}
     */
    componentDidMount () {
        axios.get('http://localhost:9001/api/v1/pancakes')
            .then((response) => {
                this.setState({
                    data: response.data.pancakes
                });
            });
    }

    /**
     * A function to add a pancake. This will create a API call to persist a new
     * pancake with the title/name given and update the React state with the
     * response adding the newly created pancake. We pass this function to our
     * PancakeForm component so it knows how to add a pancake while keeping the
     * state reference that we update in this component.
     * @param {String} title A name for the pancake to create
     * @returns {void}
     */
    addPancake (title) {
        axios.post('http://localhost:9001/api/v1/pancakes',{pancake: {name: title}})
            .then( (response) => {
                // push new pancake into our state data
                this.state.data.push(response.data.pancake);
                // update state with new state that include the new pancake
                this.setState({data: this.state.data});
            });
    }

    /**
     * Renders the application.
     * @return {Object} Our application
     */
    render () {
        return (
            <div>
                <h1>Pancakes</h1>
                <PancakeForm createPancake = {this.addPancake.bind(this)}/>
                <PancakeList pancakes = {this.state.data} />
            </div>
        );
    }
}

export default App;

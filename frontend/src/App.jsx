import React from 'react';
import PancakeForm from './PancakeForm.jsx';
import PancakeList from './PancakeList.jsx';
import axios from 'axios';

/**
 * An app
 */
class App extends React.Component {

    /**
     * Constructor
     * @param  {Object} props [description]
     * @return {void}       [description]
     */
    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
    }

    /**
     * Sends a get reqyest for the data
     * @return {void} [description]
     */
    componentDidMount () {
        axios.get('http://localhost:9001/api/v1/pancakes')
            .then((response) => {
                console.log('pancakes are: ', response.data.pancakes);
                this.setState({
                    data: response.data.pancakes
                });
            });
    }

    /**
     * a function to add a pancake
     * @param {String} title [description]
     * @returns {void}
     */
    addPancake (title) {
        console.log('todo title', title);
        //push new state
        this.state.data.push({title: title});
        //react to the change
        this.setState({data: this.state.data});
    }

    /**
     * [render description]
     * @return {[type]} [description]
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

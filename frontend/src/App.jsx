import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


import Home from './Home.jsx';
import About from './About.jsx';
import PancakeDetails from './PancakeDetails.jsx';

/**
 * The application main root component. Our application does pancake things like
 * create and list glorious pancakes of the world.
 */
class App extends React.Component {

    /**
     * Renders the application.
     * @return {Object} Our application
     */
    render () {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/pancakes/:id" component={PancakeDetails}/>
                </div>
            </Router>
        );
    }
}

export default App;

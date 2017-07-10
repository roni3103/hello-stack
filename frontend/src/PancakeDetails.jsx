import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * A component for each pancake item in our pancake items list.
 */
class PancakeDetails extends React.Component {
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
            data: {}
        };
    }

    /**
   * Sends a get request for the data when the component is added to the DOM.
   * Once the data is fetched the state is updated causing the application to
   * re-render any new data.
   * @return {void}
   */
    componentDidMount () {
        let pancakeId = this.props.match.params.id;
        axios.get(`http://localhost:9001/api/v1/pancakes/${pancakeId}`)
            .then((response) => {
                this.setState({
                    data: response.data.pancake
                });

            });
    }

    /**
     * Renders the pancake item component.
     * @return {Object} Our component
     */
    render () {
        return (
            <div>
              This stuff comes from the database
                <h1>{this.state.data.name}</h1>
                <p>{this.state.data._id}</p>
            </div>
        );
    }
}


PancakeDetails.propTypes = {
    match: PropTypes.object.isRequired
};
export default PancakeDetails;

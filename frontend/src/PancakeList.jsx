import React from 'react';
import PropTypes from 'prop-types';
import PancakeItem from './PancakeItem.jsx';

/**
 * A component to list a array of pancakes.
 */
class PancakeList extends React.Component {
    /**
     * Function to build up an array of PancakeItem components for each pancake
     * in our pancake data passed to this component.
     * @param  {Array} pancakes Array of pancakes to be rendered
     * @return {Object} The outputted list of pancakes
     */
    createPancakeItems (pancakes) {
        const pancakeStack = pancakes.map( (pancake) => {
            return (<PancakeItem title = {pancake.name} key = {pancake._id} />);
        });
        return (<div>{pancakeStack}</div>);
    }

    /**
     * Renders the list component with multiple item components for each
     * pancake.
     * @return {Object} Our component
     */
    render () {
        return (
            <div>
                {this.createPancakeItems(this.props.pancakes)}
            </div>
        );
    }
}

PancakeList.propTypes = {
    pancakes: PropTypes.array.isRequired
};

export default PancakeList;

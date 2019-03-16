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
        console.log('passed to frontend', pancakes)
        const pancakeStack = pancakes.map( (pancake) => {
            return (<li><PancakeItem title = {pancake.Name} key = {pancake._id} /></li>);
        });
        return (<div><ul>{pancakeStack}</ul></div>);
    }

    // createPancakeItems (cards) {
    //     console.log('passed to frontend', cards)
    //     const cardStack = cards.map( (card) => {
    //         return (<li><PancakeItem title = {card.Name} key = {card._id} /></li>);
    //     });
    //     return (<div><ul>{cardStack}</ul></div>);
    // }
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

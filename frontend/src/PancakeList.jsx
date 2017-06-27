import React from 'react';
import PropTypes from 'prop-types';
import PancakeItem from './PancakeItem.jsx';
/**
 * a Component
 */
class PancakeList extends React.Component {
    /**
     * Constructs the initial list of pancakes
     * @param  {Object} props [description]
     * @return {void}       [description]
     */
    constructor (props) {
        super(props);
        this.pancakes = props.pancakes;
    }

    /**
     * Adds a list of pancake items
     * @param  {Object} pancakes the pancakes to be added
     * @return {PancakeItem}     the outputted list of pancakes
     */
    createPancakeItems (pancakes) {
        console.log('in createPancakeItems', pancakes);
        const pancakeStack = pancakes.map( (pancake) => {
            return (<PancakeItem title = {pancake.name} key = {pancake._id} />);
        });
        return (<div>{pancakeStack}</div>);
    }

    /**
     * Renders a list of pancake items
     * @param  {Object} pancake [description]
     * @return {void}         [description]
     */
    render () {
        return (
            <div>
                {this.createPancakeItems(this.pancakes)}
            </div>
        );
    }

}

PancakeList.propTypes = {
    pancakes: PropTypes.array.isRequired
};

export default PancakeList;

import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component for each pancake item in our pancake items list.
 */
class PancakeItem extends React.Component {
    /**
     * Renders the pancake item component.
     * @return {Object} Our component
     */
    render () {
        return (
            <div>
                {this.props.title}
            </div>
        );
    }
}

PancakeItem.propTypes = {
    title: PropTypes.string.isRequired
};

export default PancakeItem;

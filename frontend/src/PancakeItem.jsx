import React from 'react';
import {Link} from 'react-router-dom';
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
                <Link to={`/pancakes/${this.props.id}`}>{this.props.title}</Link>
            </div>
        );
    }
}

PancakeItem.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default PancakeItem;

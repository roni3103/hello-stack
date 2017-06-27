import React from 'react';
import PropTypes from 'prop-types';
/**
 * a Component
 */
class PancakeItem extends React.Component {

    /**
     * [constructor description]
     * @param  {Object} props [description]
     * @return {Object}       [description]
     */
    constructor (props) {
        super(props);
        this.title = props.title;
    }
    /**
     * [render description]
     * @return {[type]} [description]
     */
    render () {
        return (
            <div>
                {this.title}
            </div>
        );
    }

}

PancakeItem.propTypes = {
    title: PropTypes.string.isRequired
};

export default PancakeItem;

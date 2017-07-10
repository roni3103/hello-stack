import React from 'react';
import PropTypes from 'prop-types';

/**
 * A component for adding a pancake item.
 */
class PancakeForm extends React.Component {
    /**
     * Function called when the form to add an item is submitted. Stops the
     * default browser form submit behavior, calls the createPancake prop passed
     * to the component and finally resets the input value in the form.
     * @param {Object} event Form submit event
     * @returns {void}
     */
    add (event) {
        event.preventDefault();
        this.props.createPancake(this.input.value);
        this.input.value = '';
    }

    /**
     * Renders the form component.
     * @return {Object} Our component
     */
    render () {
        return (
            <form onSubmit={this.add.bind(this)}>
                <input type="text" ref={node => { this.input = node; }}/>
                <button>Add</button>
            </form>
        );
    }
}

PancakeForm.propTypes = {
    createPancake: PropTypes.func.isRequired
};

export default PancakeForm;

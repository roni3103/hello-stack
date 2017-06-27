import React from 'react';
import PropTypes from 'prop-types';
/**
 * a Component
 */
class PancakeForm extends React.Component {
    /**
     * [constructor description]
     * @param  {[type]} props [description]
     * @return {[type]}       [description]
     */
    constructor (props) {
        super(props);
        this.addPancake = props.createPancake;
    }


    /**
     * [render description]
     * @return {[type]} [description]
     */
    render () {
        return (
            <form onSubmit={
                (event) => {
                    event.preventDefault();
                    this.addPancake(this.input.value);
                    this.input.value = '';
                }
            }>
                <input type="text" ref={node => {
                    this.input = node;
                }}/>
                <button>Add</button>
            </form>
        );
    }

}
PancakeForm.propTypes = {
    createPancake: PropTypes.func.isRequired
};
export default PancakeForm;

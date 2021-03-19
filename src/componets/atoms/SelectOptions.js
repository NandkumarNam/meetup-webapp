import React from 'react';

import Form from 'react-bootstrap/Form';

class SelectOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onChange(e);
    }
    render() {
        let options = this.props.options.map((option, index) => {
            return <option key={"option-" + option} value={option}>{option}</option>
        });
        return (
        <div className="form-group">
            <label>{this.props.label}:</label>
            <select
                className="form-control"
                name={this.props.name}
                multiple={false}
                value={this.props.value}
                onChange={this.handleChange}>
                {options}
            </select>
            <Form.Control.Feedback type="invalid">
                Please select an option.
            </Form.Control.Feedback>
        </div>
        )
    }
}

export default SelectOptions;
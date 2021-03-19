import React from 'react';

import Form from 'react-bootstrap/Form';

class ControlledInput extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.props.onChange(e);
    }
    render(){
        let styleName = this.props.label.toLowerCase().replace(' ','-'),
            isrequired = this.props.isRequired ? 'required' : '';
        return (
            <div className="form-group">
                <label className={styleName}>{this.props.label}:</label>
                
                <input 
                className="form-control" 
                name={this.props.name} 
                type="text" 
                value={this.props.inputValue} 
                onChange={this.handleChange} 
                disabled={this.props.disabled}
                required={isrequired}/>
                <Form.Control.Feedback type="invalid">
                Please enter a name.
                </Form.Control.Feedback>
            </div>
        )
    }
}

export default ControlledInput;
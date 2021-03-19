import React from 'react';

class TextArea extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            userInputValue: ''
        }
    }

    handleChange = (event) => {
        if((event.target.value).length < 51){
            this.setState({
                userInputValue: event.target.value,
            });
            this.props.onChange(event);
        } else{
            return false;
        }
        
    }

    render(){
        return (
            <div className="form-group">
                <label>{this.props.label}:</label>

                <textarea
                    className="form-control"
                    type="text"
                    name={this.props.name} 
                    onChange={this.handleChange}
                    value={this.state.userInputValue} />
            </div>
          );
    }
}

export default TextArea;
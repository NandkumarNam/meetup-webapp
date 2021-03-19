import React from 'react';
import axios from 'axios';

//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

//atoms
import ControlledInput from '../atoms/ControlledInput';
import SelectOptions from '../atoms/SelectOptions';
import DateOfBirth from '../atoms/dateOfBirth';
import TextArea from '../atoms/TextArea';

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectOptionsProfession: ["Employed", "Student"],
            selectOptionsNumberOfGuests: [0,1,2],
            fname: '',
            age: 0,
            profession: 'Employed', 
            locality: '',
            numberOfGuest: 0,
            address: '',
            validated: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    handleFormSubmit(e) {
        const form = e.currentTarget;
        
        let newlyRegistered;
        
        newlyRegistered = {
            fname: this.state.fname,
            locality: this.state.locality,
            profession: this.state.profession,
            numberOfGuest: this.state.numberOfGuest,
            age: this.state.age,
            address: this.state.address,
        };
        
        axios.post('https://meetup.free.beeceptor.com/api/registration', newlyRegistered)
          .then(function (response) {
            console.log(response);
        });

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({validated: true})

        //this.handleClearForm(e)
    }

    handleClearForm(e) {
        e.preventDefault();
        // reset form fields
        e.currentTarget.reset();
    }

    handleInputChangeAge = (personAge) => {
        this.setState({
            age: personAge
        })
    }

    componentDidMount(){
        const apiBaseUrl = 'https://meetup.free.beeceptor.com'; 
        const endPoint = "/registration";
        axios.get(`${apiBaseUrl}${endPoint}`).then(
            response => {
                console.log(response);
            }
        );
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={12}>
                        <h1>Course Registration</h1>
                        <Form  noValidate validated={this.state.validated}  onSubmit={this.handleFormSubmit} >
                            <ControlledInput 
                                label="Name" 
                                name="fname" 
                                inputValue={this.state.fname} 
                                onChange={this.handleInputChange} 
                                isRequired={true} />
                            <DateOfBirth
                                label="Date of Birth"
                                onChange={this.handleInputChangeAge} 
                            />
                            <SelectOptions 
                                label="Profession"
                                name="profession" 
                                options={this.state.selectOptionsProfession} 
                                onChange={this.handleInputChange} 
                                isRequired={false} />
                            <ControlledInput 
                                label="Locality" 
                                name="locality" 
                                inputValue={this.state.locality} 
                                onChange={this.handleInputChange} 
                                isRequired={true} />
                            <SelectOptions 
                                label="Number Of Guest"
                                name="numberOfGuest" 
                                options={this.state.selectOptionsNumberOfGuests} 
                                onChange={this.handleInputChange} 
                                isRequired={false} />
                            <TextArea
                                label="Address"
                                name="address"
                                inputValue={this.state.address}
                                onChange={this.handleInputChange} />

                            <button className="btn btn-primary">Submit</button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Registration;
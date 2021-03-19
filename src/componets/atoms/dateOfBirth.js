import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, getYear, getMonth } from 'date-fns';
import range from "lodash/range";

import ControlledInput from './ControlledInput';

//Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateOfBirth = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [dateOfBirth, setDateOfBirth] = useState(0);
    const years = range(1950, getYear(new Date()) + 1, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const onChangeDatePicker = (date) => {
        setDateOfBirth(dobChange(date));
        setStartDate(date);
    }

    const dobChange = (dob) => {
        let diff_ms = Date.now() - dob.getTime();
        let age_dt = new Date(diff_ms); 
        let age = Math.abs(age_dt.getUTCFullYear() - 1970);

        props.onChange(age);
        return age;
    }

    return (
        <Container>
            <Row>
            <Col sm={6} className="p-0">
            <div className="form-group">
                <label>{props.label}:</label>
                <div>
                    <DatePicker 
                        renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled
                          }) => (
                            <div
                              style={{
                                margin: 10,
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                {"<"}
                              </button>
                              <select
                                value={getYear(date)}
                                onChange={({ target: { value } }) => changeYear(value)}
                              >
                                {years.map(option => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                    
                              <select
                                value={months[getMonth(date)]}
                                onChange={({ target: { value } }) =>
                                  changeMonth(months.indexOf(value))
                                }
                              >
                                {months.map(option => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                    
                              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                {">"}
                              </button>
                            </div>
                          )}
                        selected={startDate} 
                        dateFormat="dd/MM/yyyy"
                        maxDate={addDays(new Date(), 0)}
                        onChange={date => onChangeDatePicker(date)} />
                </div>
            </div>
            </Col>
            <Col sm={6} className="p-0">
                <ControlledInput 
                    label="Age" 
                    name="age" 
                    inputValue={dateOfBirth}
                    isRequired={true}
                    disabled={true} />
            </Col>
            </Row>
        </Container>
        
        
    );
};

export default DateOfBirth;


import React from 'react';

class ListRegistered extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(listPos) {
        this.props.onChange(listPos);
    }
    render() {
        let list = this.props.isRegistered.map((reg) => {
            if(reg) {
                return <li className="columns" key={reg.listPos}>
                    <div className="column">
                        <a className="delete" onClick={ () => this.handleChange(reg.listPos)}></a>
                    </div>
                    <div className="column">
                        {reg.fname}
                    </div>
                    <div className="column">
                        {reg.lname}
                    </div>
                    <div className="column">
                        {reg.activity}
                    </div>
                    <div className="column">
                        {reg.restrictions.sort().join('/')}
                    </div>
                </li>
            }
        });
        return(
            <ul className="registered-list">
                {list}
            </ul>
        )
    }
}

export default ListRegistered;
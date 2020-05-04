import React, {Component} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import HygieneInfoDelete from './HygieneInfoDelete';
class Customer extends Component {
    render() {
        return (
            
                <TableRow>
                    <TableCell>
                        {this.props.id}
                    </TableCell>
                    <TableCell>
                        <img src={this.props.image} alt="profile" />
                    </TableCell>
                    <TableCell>
                        {this.props.name}
                    </TableCell>
                    <TableCell>
                        {this.props.gender}
                    </TableCell>
                    <TableCell>
                        {this.props.birth}
                    </TableCell>
                    <TableCell>
                        {this.props.job}
                    </TableCell>
                    <TableCell>
                        <HygieneInfoDelete stateRefresh={this.props.stateRefresh} id={this.props.id} />
                    </TableCell>
                </TableRow>
                
        );
    }
}

export default Customer;
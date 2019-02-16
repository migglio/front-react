import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class CitiesList extends React.Component{


    renderStep(){
        return ( this.props.steps.map((step, index) =>
        <TableRow key={index}>
            <TableCell component="th" scope="row"> {step.name} </TableCell>
      </TableRow>
  ) );
    }

    render(){
        return(
            <h1>Hola</h1>
            )
    }

}

export default CitiesList;


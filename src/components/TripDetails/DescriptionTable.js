import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PersonAdd from '@material-ui/icons/PersonAdd';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function getSeats(list){
    let max = 0;
    const result = [];
    for (let index = 0; index < list.length-1; index++) {
      if (max<list[index].passengers.total)
            max = list[index].passengers.total;
    }

    for (let i = 0; i < max; i++)
        result.push(i) 
    
    return result;
}

function getSteps(steps){
  const list = []
  if (steps[0].name != undefined){
    let from = steps[0];
    for (let index = 1; index < steps.length; index++) {
      let to = steps[index];
      list.push({from:from,to:to});
      from = to;
    }
    return list;
  }
  else return []
}

function SimpleTable(props) {
  const { classes } = props;

  const list = getSteps(props.steps);
  const seats = getSeats(props.steps);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>City</TableCell>
            <TableCell string>Time</TableCell>
            <TableCell numeric>Driver</TableCell>
            {seats.map( n => {
                return (
                    <TableCell numeric>              
                      <PermIdentityIcon className={classes.icon} style={{ color:blue[500]}}/>
                    </TableCell>
                );
          })}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((step,index) => {
            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {step.from.name + ' - ' + step.to.name }
                </TableCell>
                <TableCell component="th" scope="row">
                  {step.from.time}
                </TableCell>
                <TableCell component="th" scope="row">
                <Avatar>D</Avatar>
                </TableCell>
                {seats.map( (n ,i) => {
                  if (i>=list[index].from.passengers.users.length)
                    return (
                      <TableCell component="th" scope="row">
                          <PersonAdd className={classes.icon} style={{ color:green[800]}}/>
                      </TableCell>
                    );              
                  else
                      return (
                        <TableCell component="th" scope="row">
                          <Avatar>P</Avatar>
                        </TableCell>
                      );
                })}

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);

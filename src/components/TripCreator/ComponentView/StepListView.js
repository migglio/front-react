import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { TextField, Input } from '@material-ui/core';
import TimeInput from 'material-ui-time-picker'
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from '@material-ui/core/FormControl';
import TimePicker from 'material-ui-time-picker/lib/TimePicker';

export default class StepList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            errors:{
                price:[],
                time:[]
			}
        }
    }

    getError(value){
		if (!value)
			return 'Field required'	
		else
		if (value<1)
			return 'It must be a positive number'
		else
			return ''
    }
    
    initErrorList(name, value){
        const errs = this.state.errors;
        errs[name] = [];
        for (let index = 0; index < this.props.steps.length; index++) 
            errs[name].push(this.getError(value));

        this.setState({errors:errs});
    }

	handleUserInput(e,index) {
        const newStep = this.props.steps[index];
        const name = e.target.name;
        const value = e.target.value;
        newStep[name] = value;
        //errors
        this.initErrorList(name, value);
        this.props.updateStep(newStep,index);
    }

    handleTime(time,index) {
        const newStep = this.props.steps[index];
        newStep['time'] = time;
        const errs = this.state.errors
        errs.time[index] = '';
        this.setState({errors:errs});
        this.props.updateStep(newStep,index);
    }

    getPairSteps(steps){
		const list = [];
		let from = steps[0];
		let to = undefined;
		for (let index=1; index<steps.length; index++){
			to = steps[index];
			list.push({from:from, to:to, price:from.price, time:from.time});
			from = to;
		};
		return list;
	}

    initErrors(){
        const errs = this.state.errors;
        errs['price'] = [];
        errs['time'] = [];
        this.props.steps.forEach(step => { 
            errs['price'].push(this.getError(step.price));    
            if (step.time == undefined)
                errs['time'].push('Field required');
            else
                errs['time'].push('');    
        });

    }

    renderStep(){
        this.initErrors();
        const pairSteps=this.getPairSteps(this.props.steps);
        return ( pairSteps.map((step, index) =>
        <ListItem>
            <TextField label='from' value={step.from.name} readonly='readonly' />
            <TextField label='to' value={step.to.name} readonly='readonly' />

            <TimeInput 
                key={index} 
                mode='24h' 
                label='Trip time' 
                defaultValue={step.time}
                onChange={time => this.handleTime(time, index)}
                error={this.state.errors.time[index]}
                required
                helperText={this.state.errors.time[index]}	/>               

            <FormControl>
                <TextField
                    clearable
                    key={index}
                    name='price'
                    label='Price per passenger:'
                    type="number"
                    placeholder='Example: $120'
                    id="inputPrice"
                    inputProps={{ min: "1" }}
                    value={step.price}
                    onChange={(e) => this.handleUserInput(e,index)}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    error={this.state.errors.price[index]}
                    required
                    helperText={this.state.errors.price[index]}				
                />
            </FormControl>

      </ListItem>
  ) );
    }

    render(){
        return(
            <List>
                {this.renderStep()}
            </List>
        )
    }
}


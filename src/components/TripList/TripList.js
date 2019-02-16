import React from 'react';
import handleServerResponse from '../../response'
import axios from 'axios'
import url from '../../config'
import DrawerContainer  from './DrawerContainer'
import CircularProgress from '@material-ui/core/CircularProgress';

const queryString = require('query-string');


class TripList extends React.Component {
    constructor(props){
        super(props)
        //Default State
        this.state={
            data: queryString.parse(this.props.location.search),
            trips:[],
            loaded:false
        }
    }
    //Carga de Datos
    componentWillMount() {
      axios.all([this.loadTripList()])
      .then(axios.spread((res1) => {
        if(res1!==undefined)
          this.setState({
            trips: res1.data,
            loaded:true
        })
      }))
    }

    loadTripList(){
      return axios.get(url.api + 'trips', {params:this.state.data})
      .catch((error) => {
          handleServerResponse(error, 'An error occured when getting the trips data')
      })
    }  


    //Render
    render() {
      return (
      <div style={{"textAlign":"center",'marginLeft':  '15%','marginRight':  '15%'}}>
          
          <div style={{'marginLeft':  '5%',}}>
              
           </div>
           {this.state.loaded?(<DrawerContainer trips={this.state.trips} data={this.state.data}/>):(<CircularProgress />)}
        </div>
      )
    }

    
}

export default TripList
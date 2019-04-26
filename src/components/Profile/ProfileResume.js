import React from 'react';
import url from '../../config'
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Avatar } from 'material-ui';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import StarIcon from '@material-ui/icons/Star';
import yellow from '@material-ui/core/colors/yellow';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
      },    
    avatar: {
      margin: 10,
    },
    bigAvatar: {
      margin: 10,
      width: 80,
      height: 80,
    },
  });
  

class ProfileResume extends React.Component{

    constructor(props){
		super(props);

		this.state = {
            nickname: undefined,
            mail: '',
            reviews: '',
			userLoaded:true,
		}
	}

    componentWillMount(){
        Axios.get(url.api+'user/'+this.props.tripData.owner)
        .then((response)=>{
          this.setState({
              nickname:response.data.nickname,
              mail:response.data.mail,
              reviews: response.data.reviews,
              userLoaded:true
            })//Check response.local
        })
        .catch(function (error) {
          alert(error);
        })
      }
    

    render(){
        const { classes } = this.props;

        return (
			<div style={{"textAlign":"center","alignItems":"center"}}>
				{this.state.userLoaded?(
					<div>
              <Grid container justify="center" alignItems="center">
                <Avatar src="https://scontent.faep9-1.fna.fbcdn.net/v/t1.0-9/12963492_10209579536151536_6662472157604379054_n.jpg?_nc_cat=100&_nc_ht=scontent.faep9-1.fna&oh=39a1c64cf2e477c9c4ff8e617780aa2f&oe=5D29225F" />
              </Grid>         
              <Typography variant="headline" gutterBottom style={{ color:'#054752',fontWeight: 700, padding: '0%'}} >
                  {this.state.userLoaded?(this.state.nickname):(<CircularProgress />)}
              </Typography>
              <Typography variant="subheading" gutterBottom style={{ color:'#054752',fontWeight: 700, padding: '0%'}} >
                  {this.state.userLoaded?(this.state.mail):(<CircularProgress />)}
              </Typography>
              <Typography variant="caption" gutterBottom style={{ color:'#054752',fontWeight: 700, padding: '0%'}} >
                  Je suis quelques fois dans l'année amenée à me déplacer de Nantes, vers la Normandie (jusqu'à Rouen), vers la Bretagne (Rennes), et jusqu'à Bordeaux. Je voyage régulièrement avec mon ami, nous sommes donc deux conducteurs potentiels. Une chose est sûre, on n'a jamais mangé personne ^^
                  <br/>BIOGRAFIA SUPER HARCODEADA
              </Typography>
              <hr/>

              <StarIcon style={{ color:yellow[900]}}/>
              <Typography  style={{fontWeight: 600 }}>
                  2.5/5
              </Typography>
              <Typography variant="caption">
                {this.state.reviews.length} viajes publicados 
              </Typography>


 					</div>
				
				)
				:(<CircularProgress />)}
		 	</div>
         );
    }
}

export default withStyles(styles)(ProfileResume); 
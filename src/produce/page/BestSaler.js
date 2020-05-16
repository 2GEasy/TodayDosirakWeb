import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import img1 from '../img/1.jpg';
import img2 from '../img/2.png';
import img3 from '../img/3.jpg';

const styles = theme => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    contents: {
        marginLeft: '200px',
        marginRight: '200px',
    },
    bigfont: {
        fontSize: '20px',
        fontStyle: 'bold',
    },
})

class BestSaler extends Component{
    constructor(props) {
        super(props);
        this.state= {
            value: 5,
        }
    }
    render() {
        const {classes} = this.props;
        return (
            <>
            <h2>이달의 판매자</h2>
            <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Avatar alt="Remy Sharp" src={img1} className={classes.large} />
                        <p>김도시락</p>
                        <p>소감: Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <Rating name="read-only" value={this.state.value} readOnly />
                    </Grid>
                    <Grid item xs={4}>
                        <Avatar alt="Remy Sharp" src={img2} className={classes.large} />
                        <p>박홈메이드 도시락</p>
                        <p>소감: Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <Rating name="read-only" value={this.state.value} readOnly />
                    </Grid>
                    <Grid item xs={4}>
                        <Avatar alt="Remy Sharp" src={img3} className={classes.large} />
                        <p>이씨네 도시락</p>
                        <p>소감: Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <Rating name="read-only" value={this.state.value} readOnly />
                    </Grid>
            </Grid>
            </>
        )
    }
}
export default withStyles(styles)(BestSaler);
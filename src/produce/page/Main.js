import React, { Fragment } from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Nav from '../component/Nav';
import Slider from '../component/Slider';
import Bottom from '../component/Bottom';
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
        
    },
    bigfont: {
        fontSize: '20px',
        fontStyle: 'bold',
    },
})
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '5',
        }
    }
    render() {
        const {classes} = this.props;
        
        return(
            <Fragment>
                
                
                <div className={classes.contents}>
                <Grid container spacing={3}>
                    <Grid item xs={12}><Slider /></Grid>
                    <Grid item xs={4}>
                        <p>오늘도시락은 신선하고 맛있는 리얼홈메이드 수제도시락 판매를 위한 서비스입니다.</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>우리네 가정의 어머니, 아버지, 나, 형제가 직접 만드는 도시락을 신선하게 즐기세요.</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>오늘도시락은 신선하고 맛있는 리얼홈메이드 수제도시락 판매를 위한 서비스입니다.</p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </Grid>
                    <Grid item xs={12}><p className={classes.bigfont}>이달의 판매자</p></Grid>
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
                </div>

                <hr/>
                
            </Fragment>
        );
    }
}
export default withStyles(styles)(Main);
import React,{Component} from 'react';
import { Grid, TextareaAutosize, Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CardView from './CardView';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import img1 from '../img/normaldsr.jpg';
import img2 from '../img/healthdsr.jpg';
import img3 from '../img/dndsr.gif';
import img4 from '../img/premiumdsr.jpg';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles,makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card:{
        MuiPaper:{
            margin:'0 auto',
        },
        width:'28vw',height:'28vh',margin:'0',
        maxWidth:'430px',minWidth:'380px'
    },
    cardMedia:{
        width:'28vw',height:'20vh',margin:'0',
        maxWidth:'430px',minWidth:'380px'
    },
    gridItem:{
        margin:0,
        padding:10
    }
});

export default function Category(props) {
    
        const style = {
            root: {
                marginTop: '20px',
                marginBottom:'20px',
                minHeight:'100%',
                width: '100%'
            },
            link: {
                textDecoration: 'none'
            }
        }
        const classes = useStyles();
        return (
            <>
                <Container maxWidth="md">
                <Grid container direction="rows" align="center">
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <Link to="/customer/category/normal" style={style.link}>
                        <Card className={classes.card} >
                            <Hidden>
                                <CardMedia className={classes.cardMedia} image={img1} />
                            </Hidden>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                <Typography component="h5" variant="h6">
                                    일반 도시락
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                맛있는 일반식
                                </Typography>
                                </CardContent>
                            </div>
                        </Card>
                            {/* <CardView img={img1} width="100%" height="120" title="일반 도시락" content="맛있는 일반식"/> */}
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <Link to="/customer/category/health" style={style.link}>
                            <Card className={classes.card}>
                                <Hidden>
                                    <CardMedia className={classes.cardMedia} image={img2} />
                                </Hidden>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                    <Typography component="h5" variant="h6">
                                    건강 도시락
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    관리를 위한 건강식
                                    </Typography>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <Link to="/customer/category/lowsalt" style={style.link}>
                            <Card className={classes.card} >
                                <Hidden>
                                    <CardMedia className={classes.cardMedia} image={img3}  />
                                </Hidden>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                    <Typography component="h5" variant="h6">
                                    특별식 도시락
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    당뇨 식단, 저염식
                                    </Typography>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <Link to={`/customer/category/premium`} style={style.link}>
                            <Card className={classes.card} >
                                <Hidden>
                                    <CardMedia className={classes.cardMedia} image={img4}  />
                                </Hidden>
                                <div className={classes.cardDetails}>
                                    <CardContent>
                                    <Typography component="h5" variant="h6">
                                    프리미엄 도시락
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    특별한 날과 특별한 나를 위한 프리미엄 도시락
                                    </Typography>
                                    </CardContent>
                                </div>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
                </Container>
            </>
        );
    
}

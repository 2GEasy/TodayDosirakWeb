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

const useStyles = makeStyles((theme) => ({
  
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    title:{
        fontSize: '1rem'
    },
    desc:{
        fontSize: '0.8rem'
    }
  }));

export default function Category(props) {
    
        const style = {
            link: {
                textDecoration: 'none'
            }
        }
        const classes = useStyles();
        return (
                <>
                <Grid container spacing={4}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Link to="/customer/category/normal" style={style.link}>
                        <Card className={classes.card}>
                        <Hidden>
                            <CardMedia className={classes.cardMedia} image={img1} />
                        </Hidden>
                        <CardContent className={classes.cardContent}>
                        <Typography className={classes.title}>
                            일반 도시락
                        </Typography>
                        <Typography className={classes.desc} variant="subtitle1" color="textSecondary">
                            맛있는 일반식
                        </Typography>
                        </CardContent>
                        </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Link to="/customer/category/health" style={style.link}>
                        <Card className={classes.card}>
                        <Hidden>
                            <CardMedia className={classes.cardMedia} image={img2} />
                        </Hidden>
                        <CardContent className={classes.cardContent}>
                        <Typography className={classes.title}>
                            건강 도시락
                        </Typography>
                        <Typography className={classes.desc} variant="subtitle1" color="textSecondary">
                            관리를 위한 건강식
                        </Typography>
                        </CardContent>
                        </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Link to="/customer/category/lowsalt" style={style.link}>
                        <Card className={classes.card}>
                        <Hidden>
                            <CardMedia className={classes.cardMedia} image={img3} />
                        </Hidden>
                        <CardContent className={classes.cardContent}>
                        <Typography className={classes.title}>
                            특별식 도시락
                        </Typography>
                        <Typography className={classes.desc} variant="subtitle1" color="textSecondary">
                            당뇨 식단, 저염식
                        </Typography>
                        </CardContent>
                        </Card>
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}>
                        <Link to={`/customer/category/premium`} style={style.link}>
                        <Card className={classes.card}>
                        <Hidden>
                            <CardMedia className={classes.cardMedia} image={img4} />
                        </Hidden>
                        <CardContent className={classes.cardContent}>
                        <Typography className={classes.title}>
                            프리미엄 도시락
                        </Typography>
                        <Typography className={classes.desc} variant="subtitle1" color="textSecondary">
                            특별한 날과 특별한 나를 위한 프리미엄 도시락
                        </Typography>
                        </CardContent>
                        </Card>
                        </Link>
                    </Grid>
                </Grid>
                
                </>
        );
    
}

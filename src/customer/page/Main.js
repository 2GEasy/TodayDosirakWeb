import React from 'react';
import Container from '@material-ui/core/Container';
import Category from '../component/Category';
import BottomNav from '../component/BottomNav';
import Bottom from '../component/Bottom';
import Appbar from '../component/Appbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
}));
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Main(props) {
    
      const classes = useStyles();
        return(
          
          <Appbar>
            {/* <Container className={classes.cardGrid} style={{position:'relative',margin:"0 auto",width:"850px",height:"auto",align:"center"}}> */}
            <Container className={classes.cardGrid} maxWidth="md">
              <Category/>
              <BottomNav/>
            </Container>
            {/* </Container> */}
          </Appbar>
         
        );
    
}
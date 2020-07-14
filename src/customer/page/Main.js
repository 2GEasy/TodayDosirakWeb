import React from 'react';
import Container from '@material-ui/core/Container';
import Category from '../component/Category';
import BottomNav from '../component/BottomNav';
import Appbar from '../component/Appbar';
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
import React, { Fragment } from 'react';
import { Component } from 'react';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import { Divider, Typography,Container,Paper,Grid } from '@material-ui/core';
import logo from '../img/logo.png';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="produce/">
          오늘도시락
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default function Botton(props) {
        const classes = useStyles;
        return(
            <div className={classes.root}>
                 <footer className={classes.footer}>
                    <Container maxWidth="sm">
                    <Typography variant="body1">오늘도시락은 통신판매 중개자로서, 상품/거래정보 및 거래와 관련하여 통신판매 당사자의 고의 또는 과실로 소비자에게 발생하는 손해에 대해 책임을 지지 않습니다. 상품 및 거래에 대한 정확한 정보는 해당 판매자에게 직접 확인 바랍니다.</Typography>
                    <Copyright />
                    </Container>
                </footer>
            </div>
        );
}

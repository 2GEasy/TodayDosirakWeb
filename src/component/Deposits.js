import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>이달의 매출</Title>
      <Typography component="p" variant="h4">
        302만원
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        4월 22일, 2020
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          상세보기
        </Link>
      </div>
    </React.Fragment>
  );
}
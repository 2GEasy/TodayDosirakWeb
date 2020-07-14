import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width:'auto',
    // minWidth: 150,
    maxWidth: 500,
    // minHeight: 200,
    maxHeight: 200,
    margin: 1,
  },
  font: {
    fontSize: '1rem'
  }
});

export default function CardView(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="img"
          width={props.width}
          height={props.height}
          image={props.img}
          title="img"
        />
        <CardContent>
          <Typography gutterBottom variant="inherit" component="h2" className={classes.font}>
            {props.title}
          </Typography>
          <Typography variant="inherit" color="textSecondary" component="p" className={classes.font}>
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
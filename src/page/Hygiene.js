import React,{useState} from 'react';
import Customer from '../component/Customer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import HygieneInfoAdd from '../component/HygieneInfoAdd';

import {fade} from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    root: {
      width: '100%',
      minWidth: 1080
    },
    paper: {
      maringLeft: 18,
      marginRight: 18
    },
    tableHead: {
      fontSize: '1rem'
    },
    menu: {
      marginTop:15,
      marginBottom:15,
      display: 'flex',
      justifyContent: 'center'
    },
    progress : {
      margin : theme.spacing(2)
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    }
  })

stateRefresh =()=>{
    this.setState({
      hygiene:'',
      completed:0,
      searchKeyword: ''
    });
    this.callApi()
    .then(res => this.setState({hygiene:res}))
    .catch(err => console.log(err));
  }
  componentDidMount() =() =>{
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({hygiene:res}))
    .catch(err => console.log(err));
  }
  callApi= async() => {
    const response = await fetch('/hygiene');
    const body = await response.json();
    return body;
  }
  progress = () => {
    const {completed} = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed + 1});
  }
  handleValueChange = (e) => {
    let nextState ={};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  export default function Hygiene(props) {
      const [hygiene,setHygiene] = useState('');
      const [completed,setCompleted] = useState(0);
      const cellList = ["번호","이미지","이름","옵션"];
      const classes = styles;
    return (
        <div className={classes.menu}>
            <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
            <Table className={classes.table}>
            <TableHead>
                <TableRow>
                {cellList.map(c => {
                    return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
                </TableRow>
            </TableHead>
            <TableBody>
            {/* {
            hygiene ? 
                filteredComponents(hygiene)
            : 
            <TableRow>
                <TableCell colspan="6" align="center">
                <CircularProgress className={classes.progress} variant="determinate" value={completed} color="secondary" />
                </TableCell>
            </TableRow>
            } */}
            </TableBody>
            </Table>
        </Paper>
    );
}
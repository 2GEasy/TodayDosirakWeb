import React,{Component} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import logo from '../img/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Bottom from './Bottom';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
    
  },
  padding: {
    padding: theme.spacing(1),
  },
  demo2: {
    backgroundColor: '#ffffff',
    marginLeft: '400px',
    marginRight: '400px',
    minHeight: '800px',
  },
  logo:{
    color: '#ed7d31',
    fontStyle: 'bold',
    fontSize: '20px',
  },
  lg:{
    marginLeft : "30px",
    paddingTop: "10px"
  },
  tabs: {
    borderBottom: '#000000'
    
  },
  tab: {
    '&:focus': {
      opacity: 1,
    }
  },
});


class CustomizedTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    }
  }
  handleChange = (e, newValue) => {
    this.setState({value: newValue});
  };
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:'#F57C00'}}>
        <Toolbar>
        <Tabs TabIndicatorProps={{style: {backgroundColor: "#F57C00"}}} value={this.state.value} onChange={this.handleChange} aria-label="styled tabs example">
          <RouterLink to="/produce/"><img className={classes.lg} src={logo} width="60px" height="60px"/></RouterLink>
          <Tab label="공지사항" disableRipple component={RouterLink} to="/produce/notice"/>
          <Tab label="소개" disableRipple component={RouterLink} to="/produce/produce" />
          <Tab label="이달의 판매자" disableRipple component={RouterLink} to="/produce/bsaler" />
          <Tab label="문의" disableRipple component={RouterLink} to="/produce/inquire" />
        </Tabs>
        <Typography className={classes.padding} />
        </Toolbar>
      </AppBar>
      <div className={classes.demo2}>
      <main>
        <div id="content" style={{margin: 'auto'}}>
            {React.cloneElement(this.props.children)}
        </div>
      </main>
      </div>
      <Bottom style={{position: 'absolute',left: 0,bottom: 0,width: '100%',padding: '15px 0',marginTop: '-200px'}}/>
    </div>
    );
  }
}

export default withStyles(useStyles)(CustomizedTabs);
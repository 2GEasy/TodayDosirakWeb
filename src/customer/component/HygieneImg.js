import React,{useState,useEffect} from 'react';
import ApiService from '../ApiService';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function HygieneImg(props) {
    const classes = useStyles();
    const [himg,setHimg] = useState({});
    useEffect(()=>{
        console.log(props.su_id, props.hgn_id);
        if(props.su_id !== null && props.hgn_id !==null){
            fetchHygieneImg(props.su_id, props.hgn_id);
        }
    },[])
    const fetchHygieneImg=(su_id,hgn_id)=>{
        ApiService.fetchHygieneImg(su_id,hgn_id)
        .then(res=>{
            console.log("fetchHygieneImg." ,res.data);
            setHimg(res.data);
        })
        .catch(err=>{
            console.log("fetchHygieneImg ERR!",err);
        })
    }
    const path="/"+himg.path+himg.fileName;
    return(
        <>
            <div className={classes.root}>
            {/* <GridList className={classes.gridList} cols={2.5}>
                <GridListTile> */}
                    <img src={path} alt="hygiene image" width={100} height={100} />
                {/* </GridListTile>
            </GridList> */}
            </div>
        </>
    );
}
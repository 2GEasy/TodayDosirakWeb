/* eslint-disable max-len */
import React,{useState,useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ApiService from "../ApiService";
import {Link} from 'react-router-dom';


EngagementCard01.getTheme = muiBaseTheme => ({
  MuiCard: {
    root: {
      "&.MuiEngagementCard--01": {
        transition: "0.3s",
        maxWidth: 304,
        margin: "auto",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
        "& .MuiCardMedia-root": {
          paddingTop: "56.25%"
        },
        "& .MuiCardContent-root": {
          textAlign: "left",
          padding: muiBaseTheme.spacing.unit * 3
        },
        "& .MuiDivider-root": {
          margin: `${muiBaseTheme.spacing.unit * 3}px 0`
        },
        "& .MuiTypography--heading": {
          fontWeight: "bold"
        },
        "& .MuiTypography--subheading": {
          lineHeight: 1.8
        },
        "& .MuiAvatar-root": {
          display: "inline-block",
          border: "2px solid white",
          "&:not(:first-of-type)": {
            marginLeft: -muiBaseTheme.spacing.unit
          }
        }
      }
    }
  }
});
export default function EngagementCard01 (props) {
    const [file,setFile] = useState('');
    useEffect(()=>{
      if(props.fileChk) {
        fetchMenuImage(props.su_id,props.mn_id);
      }
    },[])
    const fetchMenuImage=(su_id,mn_id)=>{
      ApiService.fetchMenuImage(su_id,mn_id)
      .then(res=>{
        setFile(res.data);
        console.log("fetchMenuImage.",res.data);
      })
      .catch(err=>{
        console.log("fetchMenuImage ERR.",err);
      })
    }
    const path ="/"+ file.path+file.fileName;
    return (
      <Link to={{pathname:`/customer/menu/${props.su_id}/${props.mn_id}`,state: {name:props.name,produce:props.produce,price:props.price,img:path}}}>
        <Card className={"MuiEngagementCard--01"}>
            <CardMedia
            className={"MuiCardMedia-root"}
            component="img"
            src={path}
            height={400}
            style={{float:'left'}}
            />
            <CardContent className={"MuiCardContent-root"}>
            <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
            >
                {props.name}
            </Typography>
            <Typography className={"MuiTypography--subheading"} variant={"caption"}>
                {props.produce}
            </Typography><br/>
            <Typography className={"MuiTypography--subheading"} variant={"caption"}>
                {props.price}원
            </Typography>
            </CardContent>
        </Card>
     </Link>
    );
}

import React,{Component} from 'react';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CardView from './CardView';
import img1 from '../img/normaldsr.jpg';
import img2 from '../img/healthdsr.jpg';
import img3 from '../img/dndsr.gif';
import img4 from '../img/premiumdsr.jpg';
import {Link} from 'react-router-dom';

class Category extends Component {
    render() {
        const style = {
            root: {
                marginTop: '20px',
                marginBottom:'20px',
                minHeight:'100%',
                width: '100%'
            },
            link: {
                textDecoration: 'none'
            }
        }
        return (
            <>
            <div style={style.root}>
            <Grid container spacing={1} style={{align:'center'}}>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                        <Link to="/customer/category/normal" style={style.link}>
                            <CardView img={img1} width="100%" height="120" title="일반 도시락" content="맛있는 일반식"/>
                        </Link>
                    </Grid>
                    <Grid item xs={3}>\
                    <Link to="/customer/category/health" style={style.link}>
                        <CardView img={img2} width="100%" height="120" title="건강 도시락" content="관리를 위한 건강식"/>
                    </Link>
                    </Grid>
                    <Grid item xs={3}></Grid>
            </Grid>
            <Grid container spacing={1}>
            <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                <Link to="/customer/category/lowsalt" style={style.link}>
                    <CardView img={img3} width="100%" height="120" title="특별식 도시락" content="당뇨 식단, 저염식"/>
                </Link>
                </Grid>
                <Grid item xs={3}>
                <Link to={`/customer/category/premium`} style={style.link}>
                    <CardView img={img4} width="100%" height="120" title="프리미엄 도시락" content="특별한 날과 특별한 나를 위한 프리미엄 도시락"/>
                </Link>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
            </div>
            </>
        );
    }
}
export default Category;
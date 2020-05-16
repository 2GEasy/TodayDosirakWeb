import React,{Component} from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import ApiService from '../ApiService';


class NoticeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice: [],
            message: null,
        }
    }
    componentDidMount() {
        this.reloadNoticeList();
    }
    reloadNoticeList = () => {
        ApiService.fetchNotice()
        .then(res=> {
            this.setState({
                notice: res.data
            });
        })
        .catch(err => {
            console.log('reloadNoticeList() Error!', err)
        });
    }
    render() {
        const style={
            label:{
                    fontSize: '30px',
                    color: '#000000',
                    marginBottom: '20px',
            },
        }
        
        
        const cellList = ["번호","제목","작성자","작성일","조회수"];
        return(
            <div>
                <Typography style={style.label} variant="h6" noWrap>
                    <b>공지사항</b>
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            
                                {cellList.map(c => {
                                    return <TableCell>{c}</TableCell>
                                })}
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.notice.map(b => 
                        <TableRow key={b.ntcb_id}>
                                <TableCell>{b.ntcb_id}</TableCell>
                                <RouterLink to={`/produce/noticeview/${b.ntcb_id}`}><TableCell>{b.title}</TableCell></RouterLink>
                                <TableCell>관리자</TableCell>
                                <TableCell>{b.regDate}</TableCell>
                                <TableCell>{b.viewCount}</TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
        );
    }
}
export default NoticeBoard;
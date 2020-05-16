import React,{Component} from 'react';
import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import ApiService from '../ApiService';
class NoticeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.ntcb_id,
            title: '',
            content: '',
            viewCount: '',
            regDate: '',

        }
    }
    componentDidMount() {
        this.reloadNotice();
    }
    reloadNotice = () => {
        ApiService.fetchNoticeByID(this.state.id)
        .then(res=> {
            let notice = res.data
            this.setState({
                title: notice.title,
                content: notice.content,
                viewCount: notice.viewCount,
                regDate: notice.regDate
            });
        })
        .catch(err => {
            console.log('reloadNoticeList() Error!', err)
        });
    }
    
    onClick = () => {
        this.props.history.push("/notice");
    }
    render() {
        const style ={
            label: {
                fontSize: '30px',
                color: '#000000',
                marginBottom: '20px',
            },
            content : {
                minHeight: "800px",
                height: "600px",
                verticalAlign: "top"
            },
            button: {
                // backgroundColor: '#FF9800',
                borderColor: '#FF9800',
                color: '#FF9800',
                margin: "20px"
            }
        }
        return(
            <>
            <Typography style={style.label}><b>공지사항</b></Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            제목
                        </TableCell>
                        <TableCell align="left">
                            {this.state.title}
                        </TableCell>
                        <TableCell align="left">
                            {this.state.regDate}
                        </TableCell>
                    </TableRow>
                    <TableRow style={style.content}>
                        <TableCell align="left">
                            내용
                        </TableCell>
                        <TableCell colSpan="2" align="left">
                            {this.state.content}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="2">
                        </TableCell>
                        <TableCell align="right">조회수 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.viewCount}</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
            <Button style={style.button} variant="outlined" onClick={this.onClick}><b>목록</b></Button>
            </>
        );
    }
}
export default NoticeView;
import React,{Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const style = {
    
    label : {
        fontSize: '40px',
        color: '#000000',
        fontStyle: 'bold'
    },
    content: {
        
    },
    button: {
        backgroundColor: '#FF9800',
        marginTop: '15px',
        color:'#ffffff',
        fontFamily: 'bold'
    }
}
const OrangeTextField = withStyles({
    root: {
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#FF9800', // Solid underline on hover
          },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#F57C00',
        },
    }
})(TextField);
class Inquire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sender : '',
            subject : '',
            contents : '',
            
        }
    }
    render() {
        return (
            <div style={style.content}>
            <Typography style={style.label}>문의</Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>보내는분</TableCell>
                        <TableCell><OrangeTextField type="text" fullWidth value={this.state.sender} onChange={this.onChange} placeholder="이메일 주소를 입력해주세요."/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell><OrangeTextField type="text" value={this.state.sender} onChange={this.onChange} placeholder="연락처를 입력해주세요."/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>제목</TableCell>
                        <TableCell><OrangeTextField type="text" fullWidth value={this.state.sender} onChange={this.onChange} placeholder="제목을 입력해주세요." /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>내용</TableCell>
                        <TableCell>
                            <OrangeTextField
                                placeholder="내용을 입력해주세요."
                                fullWidth
                                multiline
                                
                                rows={20}
                                rowsMax={100}
                                cols={100}
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>파일첨부</TableCell>
                        <TableCell><input type="file"></input></TableCell>
                    </TableRow>
                    <TableRow>
                        <Button variant="contained" style={style.button} colSpan="2">전송</Button>
                    </TableRow>
                </TableBody>
            </Table>
            </div>
        );
    }
}
export default Inquire;
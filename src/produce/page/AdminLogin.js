import React,{Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ApiService from '../ApiService';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            pw:''
        }
    }
    render () {
        onChange =(e)=>{
            this.setState({
                [e.target.name] : e.target.value
            });
        }
        onClick =(id,pw)=> {
            ApiService.adminLogin(id,pw)
            .then(res => {
                
            })
        }
        return (
            <>
            <h5>관리자페이지 로그인</h5>
            
            <TextField name="id" placeholder="ID를 입력해주세요." value={this.state.id} onChange={this.onChange}></TextField>
            <TextField name="pw" placeholder="Passowrd를 입력해주세요." value={this.state.pw} onChange={this.onChange}></TextField>
            <Button onClick={this.onClick(this.state.id,this.state.pw)}>로그인</Button>
            </>
        );
    }
}
export default AdminLogin;
import React,{useState,useEffect} from 'react';
import firebase from '../../firebase';
import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper';

export default function TEST(props) {
  const [real,setReal] = useState([]);
  const [de,setDe] = useState({
    user_id: '',
    title: '',
    message: ''
  });
  // let url = "http://localhost:8080/stream/"+window.sessionStorage.getItem('cid');
  // let eventSource = new EventSource(url,{withCredentials:true});
  var database = firebase.database();
  useEffect(()=>{
    getData();
  },[])
  useEffect(()=>{
    console.log(real[0]);
  },[real])
  const getData=async ()=>{
    database.ref('/').once('value')
    .then(res=>{
      setReal(real.concat(res.val().test));
      setDe({
        user_id: res.val().test.user_id,
        title: res.val().test.title,
        message: res.val().test.message
      })
    })
  }
  const testWrite=()=>{
    database.ref('/test').set({
      user_id:de.user_id,
      title:de.title,
      message:de.message,
      chk:false
    });
  }
  const testRef = database.ref('/test');
  testRef.on('child_changed',function(data) {
    console.log(data.val());

  })
  const onChange=(e)=>{
    setDe({
      ...de,[e.target.name] : e.target.value
    })
  }
  return (
    <>
      {real.map((c)=>{
        return (
        <>
        <h1>{c.user_id}</h1>
        <h1>{c.title}</h1>
        <h1>{c.message}</h1>
        </>
        );
      })}
      <input type="text" value={de.user_id} name="user_id" onChange={onChange}/>
      <input type="text" value={de.title} name="title" onChange={onChange}/>
      <input type="text" value={de.message} name="message" onChange={onChange}/>
      <button onClick={()=>testWrite()}>쓰기</button>
    </>
  );
}
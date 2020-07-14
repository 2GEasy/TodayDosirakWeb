import React,{useState,useEffect} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


let sockJS = new SockJS("http://localhost:8080/webSocket");
let stompClient = Stomp.over(sockJS);
stompClient.debug=()=>{};
export default function ChatContainer(props) {
    const [contents,setContents] = useState([]);
    const [username,setUsername] = useState('');
    const [message,setMessage] = useState("");

    useEffect(()=>{
        stompClient.subscribe('/topic/roomId',(data)=>{
            const newMessage = JSON.parse(data.body);
            addMessage(newMessage);
        })
    },[contents])

    const handleEnter=(username,content)=>{
        const newMessage = {username: username, content: content};
        stompClient.send("/hello",{},JSON.stringify(newMessage));
        setMessage("");
    }
    const addMessage=(message)=>{
        setContents(...message,message:)
    }
}
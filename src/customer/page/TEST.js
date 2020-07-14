import React,{useState,useEffect} from 'react';

export default function TEST(props) {
  var eventSource= new EventSource("http://localhost:8080/stream/"+window.sessionStorage.getItem('cid'));

  eventSource.addEventListener('open',function(e) {
    console.log("Connected!");
  })
  eventSource.addEventListener('error',function(e) {
    if(e.readyState == EventSource.CLOSED) {
      console.log("Connection was closed.");
    }
    
  })
  eventSource.addEventListener('message',function(e) {
    console.log(e.data);
  })
  return (
    <>
      
    </>
  );
}
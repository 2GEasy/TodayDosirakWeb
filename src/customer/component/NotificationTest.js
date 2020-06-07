import React,{useState,useEffect} from 'react';

export default function NotificationTest(props) {
    useEffect(()=>{
        if (Notification && Notification.permission !== "granted") {
            Notification.requestPermission(function (status) {
              console.log("requestPermission:", status);
              if (Notification.permission !== status) {
                Notification.permission = status;
              }
            });
        }
    },[])
    const onNoti=()=>{
        if (Notification && Notification.permission === "granted") {
            var i = 0;
            // 어떤 브라우저(파이어폭스 등)는 일정 시간 동안 알림이 너무 많은 경우 차단하기 때문에 인터벌 사용.
            var interval = window.setInterval(function () {
              // 태그 덕분에 "안녕! 9" 알림만 보여야 함
              var n = new Notification("안녕! " + i, {tag: '알림너무많음'});
              if (i++ == 9) {
                window.clearInterval(interval);
              }
            }, 200);
          }
      
          // 사용자가 알림을 받을지 말지 답하지 않은 경우
          // 참고: 크롬 때문에 권한 속성이 설정됐는지 알 수 없으므로
          // "기본" 값을 확인하는 것은 안전하지 않음
          else if (Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function (status) {
              console.log(status);
              // 사용자가 ok한 경우
              if (status === "granted") {
                var i = 0;
                // 어떤 브라우저(파이어폭스 등)는 일정 시간 동안 알림이 너무 많은 경우 차단하기 때문에 인터벌 사용.
                var interval = window.setInterval(function () {
                  // 태그 덕분에 "안녕! 9" 알림만 보여야 함
                  var n = new Notification("안녕! " + i, {tag: '알림너무많음'});
                  if (i++ == 9) {
                    window.clearInterval(interval);
                  }
                }, 200);
              }
      
              // 그 외의 경우 일반적인 모달 alert로 폴백
              else {
                alert("안녕!");
              }
            });
          }
      
          // 사용자가 알림을 거부한 경우
          else {
            // 일반적인 모달 alert로 폴백
            alert("안녕!");
          }
    }
    return(
        <>
        <button id="enable" onClick={()=>onNoti()}>알림 허용</button>
        </>
    );
}
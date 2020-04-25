import React,{useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from '@fullcalendar/core/locales/ko';
import './main.scss';
import { Typography } from '@material-ui/core';
const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
}
const calendarComponentRef = React.createRef();
export default function MonthMenu(props) {
    return(
        <div style={{margin: '0 auto', maxWidth: '900px'}}>
        <Typography style={{fontSize: '1.8rem',marginTop:'20px'}}><b>식단표</b></Typography><br/>
        <FullCalendar 
        plugins={[dayGridPlugin, interactionPlugin,bootstrapPlugin]} 
        defaultView="dayGridMonth"
        locale={koLocale}
        ref={ calendarComponentRef }
        events={[
            { title: '불고기 도시락', date: '2020-04-25' },
            { title: '햄에그 도시락', date: '2020-04-25' }
          ]}
          header={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth dayGridWeek'
          }}
        dateClick={handleDateClick}
        ></FullCalendar>
        </div>
    );
}
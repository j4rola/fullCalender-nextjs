import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from "@fullcalendar/interaction"
import { useState, useEffect, useRef } from 'react'


export default function Calendar() {  

  const calendarRef = useRef(null);
  const [activeView, setActiveView] = useState("dayGridMonth")
  const [width, setWidth] = useState(null)  

  useEffect(() => {

    if (typeof window !== "undefined") { 

      const handleResize = () => {
        setWidth(window.innerWidth)
        console.log(width)
  
        if (width < 900) {setActiveView("listMonth")} else {setActiveView("dayGridMonth")}
      }
  
      window.addEventListener('resize', handleResize) 
      
      
    }

    console.log("View Changed", activeView);
    const { current: calendarDom } = calendarRef;
    const API = calendarDom ? calendarDom.getApi() : null;
    API && API.changeView(activeView);
  }, [activeView]);

  useEffect(() => {

    if (typeof window !== "undefined") { 
      console.log(window)
      if (window.innerWidth > 900) {
        setActiveView("dayGridMonth")
      } else { setActiveView("listMonth")}

   }}, []);
  

    const events = [

      { title: 'Meeting', start: '2023-03-09T22:54:52.289Z', description: 'Another meeting!' }, 
      { title: 'Meeting', start: '2023-03-10T22:30:52.289Z', description: 'Another meeting!' }
    ]

    

  return (
    <div>
      <button
        onClick={() =>
          setActiveView((previous) =>
            previous === "dayGridMonth" ? "listMonth" : "dayGridMonth"
          )
        }
      >
        Toggle View
      </button>
      <h1>Demo App</h1>
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView={activeView}
        ref={calendarRef}
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
      
    </div>)
  
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
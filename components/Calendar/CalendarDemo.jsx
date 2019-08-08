import { memo, useState } from 'react';

export const CalendarDemo = memo(({ children }) => {
  const [events, setEvents] = useState([]);
  const onSelectEvent = event => {
    console.log('Calender', 'onSelectEvent', { event });
    window.alert(event.title);
  };
  const onSelectSlot = slot => {
    console.log('Calendar', 'onSelectSlot', { slot });
    const title = window.prompt('Event Title');
    if (!title) return;
    const newEvent = {
      title,
      start: slot.start,
      end: slot.end,
    };
    setEvents([...events, newEvent]);
  };
  return children({ events, onSelectEvent, onSelectSlot });
});

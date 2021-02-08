import React from 'react';

function createCalendarHeaders(days) {
  return days.map(( day ) =>
    <th scope="col" key={day.fullName} title={day.fullName}>{day.shortName}</th>
  );
}

function createCalendarWeek(fromDay, currentDay, monthLength, monthStartFromDayOfWeek, previousMonthLength) {
  const week = [];
  let nextMonth = false;
  let previousMounth = false;
  
  let day = fromDay;

  if (day === 1 && monthStartFromDayOfWeek !== 0) {
    day = previousMonthLength - monthStartFromDayOfWeek + 1;
    previousMounth = true;
  }

  for (let i = 0; i < 7; i += 1) {
    // define class for day
    let className;
    if (nextMonth || previousMounth) {
      className = 'ui-datepicker-other-month';
    } else if (day === currentDay) {
      className = 'ui-datepicker-today';
    }
    
    // add day (main action)
    week.push(<td key={day} className={className}>{day}</td>);
    day += 1;

    // previous month handler
    if (previousMounth && day > previousMonthLength) {
      day = 1;
      previousMounth = false;
    }
    
    // next month handler
    if (!previousMounth && day > monthLength) {
      day = 1;
      nextMonth = true;
    }
  }
  return (<tr key={'week-from-' + fromDay}>{week}</tr>);
}

function createCalendarFullMonth(currentDay, monthLength, monthStartFromDayOfWeek, previousMonthLength) {
  let calendar = [];
  for (let i = 1; i <= monthLength; i += 7 ) {
    calendar.push(createCalendarWeek(i, currentDay, monthLength, monthStartFromDayOfWeek, previousMonthLength))
    
    // previous month handler
    if (i === 1) {
      i -= monthStartFromDayOfWeek;
    }
  }
  return calendar;
}

function getFebrauryLength(year) {
  if (year % 4 === 0 && year % 100 !== 0) {
    return 29;
  }
  return 28;
}

export default function Calendar({ date }) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  const monthStart = new Date(year, month, day);
  monthStart.setDate(0);
  const monthStartFromDayOfWeek = monthStart.getDay();
  const previousMounth = month - 1 === -1 ? 11 : month - 1;

  const days = [
    { fullName: 'Понедельник', shortName: 'Пн', },
    { fullName: 'Вторник', shortName: 'Вт', },
    { fullName: 'Среда', shortName: 'Ср', },
    { fullName: 'Четверг', shortName: 'Чт', },
    { fullName: 'Пятница', shortName: 'Пт', },
    { fullName: 'Суббота', shortName: 'Сб', },
    { fullName: 'Воскресенье', shortName: 'Вс', },
  ];

  const months = [
    {monthName: 'Январь', monthNameGen: 'Января', monthLength: 31},
    {monthName: 'Февраль', monthNameGen: 'Февраля', monthLength: getFebrauryLength(year)},
    {monthName: 'Март', monthNameGen: 'Марта', monthLength: 31},
    {monthName: 'Апрель', monthNameGen: 'Апреля', monthLength: 30},
    {monthName: 'Май', monthNameGen: 'Мая', monthLength: 31},
    {monthName: 'Июнь', monthNameGen: 'Июня', monthLength: 30},
    {monthName: 'Июль', monthNameGen: 'Июля', monthLength: 31},
    {monthName: 'Август', monthNameGen: 'Августа', monthLength: 31},
    {monthName: 'Сентябрь', monthNameGen: 'Сентября', monthLength: 30},
    {monthName: 'Октябрь', monthNameGen: 'Октября', monthLength: 31},
    {monthName: 'Ноябрь', monthNameGen: 'Ноября', monthLength: 30},
    {monthName: 'Декабрь', monthNameGen: 'Декабря', monthLength: 31},
  ];
  
  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{days[dayOfWeek].fullName}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{day}</div>
          <div className="ui-datepicker-material-month">{months[month].monthNameGen}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{months[month].monthName}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            {createCalendarHeaders(days)}
          </tr>
        </thead>
        <tbody>
          {createCalendarFullMonth(day, months[month].monthLength, monthStartFromDayOfWeek, months[previousMounth].monthLength)}
        </tbody>
      </table>
    </div>
  );
}
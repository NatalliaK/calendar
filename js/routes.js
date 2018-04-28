var routes = {
  '': function() {
    drawInteractiveCalendar(
      calendar,
      currentYear,
      currentMonth,
      calendarHeader
    );
  },
  calendar: function() {
    drawInteractiveCalendar(
      calendar,
      currentYear,
      currentMonth,
      calendarHeader
    );
    document.querySelector('#createCalendar').innerHTML = '';
    document.querySelector('#about').innerHTML = '';
  },
  createCalendar: function() {
    document.querySelector('#createCalendar').innerHTML = 'create';
    calendar.innerHTML = '';
    calendarHeader.innerHTML = '';
    document.querySelector('#about').innerHTML = '';
  },
  about: function() {
    document.querySelector('#about').innerHTML = 'about';
    calendar.innerHTML = '';
    calendarHeader.innerHTML = '';
    document.querySelector('#createCalendar').innerHTML = '';
  }
};

function handleUrl() {
  var url = window.location.hash.replace('#', '');
  routes[url]();
}

window.addEventListener('hashchange', handleUrl);

handleUrl();

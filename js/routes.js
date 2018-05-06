var calendar = document.querySelector('#calendar');

var routes = {
  '': function() {
		document.querySelector('#createCalendar').innerHTML = '';
		document.querySelector('#about').innerHTML = '';

		var value = {
			el: calendar,
			changeMonth: true,
			allowAdd: true,
			allowRemove: true,
			year: currentYear,
			month: currentMonth
		};

		drawInteractiveCalendar(value);
		getLocalStorageValue();
  },
  calendar: function() {
		document.querySelector('#createCalendar').innerHTML = '';
		document.querySelector('#about').innerHTML = '';

		var value = {
			el: calendar,
			changeMonth: true,
			allowAdd: true,
			allowRemove: true,
			year: currentYear,
			month: currentMonth
		};

		drawInteractiveCalendar(value);
		getLocalStorageValue();
  },
  createCalendar: function() {
    calendar.innerHTML = '';

    if (document.querySelector('#calendar-header')) {
			document.querySelector('#calendar-header').remove();
		}

    document.querySelector('#about').innerHTML = '';

		createForm();
		selectedData();
		settingsCalendar();
  },
  about: function() {
    document.querySelector('#about').innerHTML = 'about';
    calendar.innerHTML = '';

		if (document.querySelector('#calendar-header')) {
			document.querySelector('#calendar-header').remove();
		}

		document.querySelector('#createCalendar').innerHTML = '';
  }
};

function handleUrl() {
  var url = window.location.hash.replace('#', '');
  routes[url]();
}

window.addEventListener('hashchange', handleUrl);

handleUrl();
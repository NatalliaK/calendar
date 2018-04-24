function waitFor(func, delay) {
	var res = func();
	if (!res) {
		setTimeout(function() {
			func();
		}, delay)
	}
}

waitFor(getLocalStorageValue, 100);

function getLocalStorageValue() {
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		console.log(key);
		var arr = key.match(/\d+/g);
		var event = arr[0];
		var day = arr[1];
		var month = arr[2];
		var year = arr[3];
		var allDay = calendar.querySelectorAll('span[data-day]');
		allDay.forEach(function(el) {
			if (year === el.getAttribute('data-year') && month === el.getAttribute('data-month') && day === el.getAttribute('data-day')) {
				var value = localStorage.getItem(key);
				var td = el.parentNode;
				var userTask = document.createElement('div');
				var wrap;

				if (!td.querySelector('div')) {
					wrap = document.createElement('div');
					wrap.className = 'user-tasks-wrap';
					td.appendChild(wrap);
				} else {
					wrap = td.querySelector('.user-tasks-wrap');
				}

				userTask.className = 'user-task';
				userTask.setAttribute('data-num', event);
				userTask.setAttribute('data-day', day);
				userTask.setAttribute('data-month', month);
				userTask.setAttribute('data-year', year);
				userTask.innerHTML = '<p class="user-task__p">' + value + '</p><button data-close="close" class="user-task__btn btn"><img src="./img/cross.png"></button>';
				wrap.appendChild(userTask);
			}
		});
	}
	return allDay;
}
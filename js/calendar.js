var calendar = document.querySelector('#calendar');
var calendarHeader = document.querySelector('#calendar-header');
var res = document.querySelector('#result');
var date = new Date();
var currentMonth = date.getMonth() + 1;
var currentYear = date.getFullYear();
res.innerHTML = localStorage.getItem('saveValue');

function createCalendar(year, month) {
	--month;
	var rows = [];
	var d = new Date(year, month);
	var topRow = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
	rows = [topRow];
	var mon = d.getMonth();
	var row = [];
	var numDaysOfMonth = 0;
	var i = 0;

	rows.push(row);

	while (i < getDay(d)) {
		row.push(null);
		i++;
	}

	while (i < 7) {
		row.push(d.getDate());
		d.setDate(d.getDate() + 1);
		i++;
		numDaysOfMonth++;
	}

	while (mon == d.getMonth()) {
		i = 0;

		if (i % 7 === 0) {
			var nextRow = [];
			rows.push(nextRow);

			while (i < 7 && mon == d.getMonth()) {
				d.setDate(d.getDate() + 1);
				numDaysOfMonth++;
				nextRow.push(numDaysOfMonth);
				i++;
			}

			while (i < 7) {
				nextRow.push(null);
				i++;
			}
		}
	}
	return rows;
}

function drawCalendar(year, month, htmlEl) {
	var result;
	var count = 0;
	var rows = createCalendar(year, month);
	result =
		'<table id="table" class="calendar__table"><tr class="calendar__row calendar__row--header">';

	rows.forEach(function(elem) {
		if (count === 0) {
			elem.forEach(function(el) {
				result +=
					'<th class="calendar__cell calendar__cell--header">' + el + '</th>';
			});
			result += '</tr>';
		} else {
			result += '<tr class="calendar__row">';
			elem.forEach(function(el) {
				if (!el) {
					result += '<td class="calendar__cell"></td>';
				} else {
					result += '<td class="calendar__cell"><span data-day="'+ el + '" data-month="' + month + '" data-year="' + year + '">' + el + '</span></td>';
				}
			});
			result += '</tr>';
		}
		count++;
	});

	result += '</tr>';

	result += '</table>';
	htmlEl.innerHTML = result;
}

function getDay(date) {
	var day = date.getDay();

	if (day === 0) {
		day = 7;
	}
	return day - 1;
}

function writeMonthAndYear(year, month, htmlElHeader) {
	--month;
	date = new Date(year, month);
	var writeMonth = date.toLocaleString('ru', { month: 'long' });
	var writeYear = date.toLocaleString('ru', { year: 'numeric' });
	htmlElHeader.innerHTML =
		'<button data-btn="prev" class="btn calendar-header__btn  calendar-header__btn--prev"><img src="./img/prev.png" alt="previous"></button><span class="calendar-header__span">' +
		writeMonth +
		' ' +
		writeYear +
		'</span><button data-btn="next" class="btn calendar-header__btn calendar-header__btn--next"><img src="./img/next.png" alt="next"></button>';
}

function getPrevMonth(htmlEl, month, year, htmlElHeader) {
	var prev = htmlElHeader.querySelector('button[data-btn="prev"]');
	prev.addEventListener('click', function() {
		--month;
		if (month < 0) {
			month = 11;
			year -= 1;
		}
		date = new Date(year, month);
		drawInteractiveCalendar(htmlEl, year, month, htmlElHeader);
		return date;
	});
}

function getNextMonth(htmlEl, month, year, htmlElHeader) {
	var next = htmlElHeader.querySelector('button[data-btn="next"]');
	next.addEventListener('click', function() {
		++month;
		if (month > 11) {
			month = 0;
			year += 1;
		}
		date = new Date(year, month);
		drawInteractiveCalendar(htmlEl, year, month, htmlElHeader);
		return date;
	});
}

function drawInteractiveCalendar(htmlEl, year, month, htmlElHeader) {
	drawCalendar(year, month, htmlEl);
	writeMonthAndYear(year, month, htmlElHeader);
	getPrevMonth(htmlEl, month, year, htmlElHeader);
	getNextMonth(htmlEl, month, year, htmlElHeader);
}

drawInteractiveCalendar(calendar, currentYear, currentMonth, calendarHeader);

calendar.addEventListener('click', function(e) {
	var target = e.target;
	var targetData;
	if (target.tagName === 'TD' && target.innerHTML !== '' || target.tagName === 'SPAN') {
		var targetTd;
		if (target.tagName === 'TD') {
			targetData = target.querySelector('span');
		} else targetData = target;
		targetTd = targetData.parentNode;

		askQuestion();

		/** add task*/
		document.querySelector('#addTask').addEventListener('click', function() {
			var userTask = document.createElement('div'),
				targetDay = targetData.getAttribute('data-day'),
				targetMonth = targetData.getAttribute('data-month'),
				targetYear = targetData.getAttribute('data-year'),
				inputValue = document.querySelector('#task-input').value,
				i,
				keyName;

			if (!inputValue) {
				inputValue = 'Решать задачки';
			}

			if(!target.parentNode.querySelector('div')) {
				var wrap = document.createElement('div');
				wrap.className = 'user-tasks-wrap';
				targetTd.appendChild(wrap);
				i = 1;
			} else {
				var len = target.parentNode.querySelectorAll('[data-num]').length;
				i = len + 1;
			}
			userTask.className = 'user-task';
			userTask.setAttribute('data-num', i);
			keyName = 'event' + userTask.getAttribute("data-num") + ' for day' + targetDay + ' month' + targetMonth + ' year' + targetYear;

			waitFor(setLocalStorage, 10);

			userTask.innerHTML = '<p class="user-task__p">' + inputValue + '</p><button data-close="close" class="user-task__btn btn"><img src="./img/cross.png"></button>';
			targetTd.querySelector('.user-tasks-wrap').appendChild(userTask);

			function setLocalStorage() {
				localStorage.setItem(keyName, inputValue);
			}

			document.querySelector('#task').remove();
		});

		/**cancel task*/
		document.querySelector('#cancelTask').addEventListener('click', function() {
			document.querySelector('#task').remove();
		});
	}

/** delete task*/
	if (target.parentNode.hasAttribute('data-close')) {
		var btnClose = target.parentNode;
		var userTasks = btnClose.parentNode.parentNode;
		var confirm = document.createElement('div');
		confirm.id = 'confirm';
		confirm.classList = 'task';
		confirm.innerHTML = '<p class="task__p">Точно удалить задание?</p><p class="task__p">Может все-таки задачки порешаем?</p><button id="deleteTask" class="task__btn btn">Удалить</button><button id="cancelRemove" class="task__btn btn">Отмена</button>';
		calendar.appendChild(confirm);

		var deleteTask = document.querySelector('#deleteTask');
		var cancelRemove = document.querySelector('#cancelRemove');

		deleteTask.addEventListener('click', function() {
			var parentDiv = btnClose.parentNode;
			var keyName = 'event' + parentDiv.getAttribute('data-num') + ' for day' + parentDiv.getAttribute('data-day') + ' month' + parentDiv.getAttribute('data-month') + ' year' + parentDiv.getAttribute('data-year');
			localStorage.removeItem(keyName);
			parentDiv.remove();

			if (userTasks.innerHTML === '') {
				userTasks.remove();
			}
			confirm.remove();
		});

		cancelRemove.addEventListener('click', function() {
			confirm.remove();
		});
	}
});

/**create modal box*/
function askQuestion() {
	var task = document.createElement('div');
	task.id = 'task';
	task.classList = 'task';
	task.innerHTML = '<label><p class="task__p">Что собираетесь делать?</p><input id="task-input" class="task__input" type="text" placeholder="Решать задачки" autofocus></label><button id="addTask" class="task__btn btn">Готово</button><button id="cancelTask" class="task__btn btn">Отмена</button>';
	calendar.appendChild(task);
}

function waitFor(func, delay) {
	var res = func();
	if (!res) {
		setTimeout(function() {
			func();
		}, delay)
	}
}

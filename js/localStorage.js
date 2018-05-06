function getLocalStorageValue() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i),
    	arr = key.match(/\d+/g),
    	event = arr[0],
    	day = arr[1],
    	month = arr[2],
    	year = arr[3],
    	allDay = calendar.querySelectorAll('span[data-day]');

    allDay.forEach(function(el) {
      if (
        year === el.getAttribute('data-year') &&
        month === el.getAttribute('data-month') &&
        day === el.getAttribute('data-day')
      ) {
				function valueLocStorage(key) {
					return new Promise(function(resolve) {
						setTimeout(function() {
							var value = localStorage.getItem(key);
							resolve(value);
						}.bind(key), 10)
					});
				}

        var td = el.parentNode,
					userTask = document.createElement('div'),
					wrap;

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

        valueLocStorage(key).then(function(value) {
					userTask.innerHTML =
						'<p class="user-task__p">' +
						value +
						'</p><button data-close="close" class="user-task__btn btn"><img src="./img/cross.png"></button>';
					wrap.appendChild(userTask);
				});
      }
    });
  }
  return allDay;
}

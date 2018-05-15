function settingsCalendar() {
  var form = document.querySelector('#settingsCalendar'),
    previewCalendar = document.querySelector('#previewCalendar'),
    createCalendar = document.querySelector('#createCalendar'),
    selectMonthValue = null,
    selectYearValue = null,
    value = {
      el: 'calendar' + Math.random().toFixed(4) * 10000,
      changeMonth: false,
      allowAdd: true,
      allowRemove: true,
      displayData: false,
      year: null,
      month: null
    };

  form.addEventListener('change', function(e) {
    e.preventDefault();
    previewCalendar.innerHTML = '';
    var target = e.target,
      parentNode = e.target.parentNode,
      selectMonth = parentNode.querySelector('select[name="month"]'),
      selectYear = parentNode.querySelector('select[name="year"]');

    if (parentNode.tagName === 'LABEL') {
      if (form.querySelector('input[value="changeMonth"]').checked) {
        value.changeMonth = true;
      } else {
        value.changeMonth = false;
      }

      if (form.querySelector('input[value="addTasks"]').checked) {
        value.allowAdd = true;
      } else {
        value.allowAdd = false;
      }

      if (form.querySelector('input[value="removeTasks"]').checked) {
        value.allowRemove = true;
      } else {
        value.allowRemove = false;
      }

      if (form.querySelector('input[value="displayData"]').checked) {
        value.displayData = true;
      } else {
        value.displayData = false;
      }
    }

    if (target.tagName === 'SELECT') {
      var options = target.querySelectorAll('option');

      options.forEach(function(el) {
        el.removeAttribute('selected');
      });

      if (target === selectMonth) {
        selectMonthValue = selectMonth.value;
      } else if (target === selectYear) {
        selectYearValue = selectYear.value;
      }
    }

    var drawMonth = selectMonthValue;
    if (!drawMonth) {
      drawMonth = 'месяц не выбран';
    } else {
      value.month = drawMonth;
    }

    var drawYear = selectYearValue;
    if (!drawYear) {
      drawYear = 'год не выбран';
    } else {
      value.year = drawYear;
    }
    document.querySelector('#settingsResult').innerHTML =
      'Месяц: ' + drawMonth + ', год: ' + drawYear;

    value.el = 'calendar' + Math.random().toFixed(4) * 10000;

    setScript(value);
    drawPrevCalendar(value);
  });

  setScript(value);
  drawPrevCalendar(value);

  function drawPrevCalendar(value) {
    previewCalendar.innerHTML = '<div id="' + value.el + '">';
    drawInteractiveCalendar(value);
    document.getElementById(value.el).firstElementChild.className =
      'calendar__table calendar__table--big';
  }

  function setScript(value) {
    document.querySelector('#output').innerText =
      '<script src="https://github.com/NatalliaK/calendar/blob/master/js/calendar.js"></script>\n' +
      '<script src="https://github.com/NatalliaK/calendar/blob/master/js/localStorage.js"></script>\n' +
      '<script >\n' +
      '(function()\n' +
      '{var id = "' +
      value.el +
      '";\n' +
      ' document.write(\'<div id=" + id + "></div>);\n' +
      '\t\t\t  new drawInteractiveCalendar({\n' +
      '\t\t\t    el: ' +
      value.el +
      ',\n' +
      '\t\t\t    showMonth: ' +
      value.changeMonth +
      ',\n' +
      '\t\t\t    allowAdd: ' +
      value.allowAdd +
      ',\n' +
      '\t\t\t    allowRemove: ' +
      value.allowRemove +
      ',\n' +
      '\t\t\t    month: ' +
      value.month +
      ',\n' +
      '\t\t\t		 year: ' +
      value.year +
      '\n' +
      '\t\t\t  })})();\n' +
      '</script>';
  }
}

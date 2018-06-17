function createForm() {
  var createCalendar = document.querySelector('#createCalendar');

  createCalendar.innerHTML =
    '<form id="settingsCalendar" class="create-calendar__form"><fieldset class="create-calendar__form-field"><legend class="create-calendar__form-name">Настройка календаря</legend><label class="create-calendar__label"><input type="checkbox" value="changeMonth"><span class="create-calendar__text-label">Возможность изменения месяца</span></label><label class="create-calendar__label"><input type="checkbox" value="addTasks" checked><span class="create-calendar__text-label">Возможность добавления заданий</span></label><label class="create-calendar__label"><input type="checkbox" value="removeTasks" checked><span class="create-calendar__text-label">Возможность удаления заданий</span></label><div class="create-calendar__wrap-radio" id="wrap-radio"><label class="create-calendar__label"><input type="radio" value="localStorage" name="database" checked><span class="create-calendar__text-label">Хранить данные в localStorage</span></label><label class="create-calendar__label"><input type="radio" value="firebase" name="database"><span class="create-calendar__text-label">Хранить данные в БД firebase</span></label></div><label class="create-calendar__label"><input type="checkbox" value="displayData"><span class="create-calendar__text-label">Отображать месяц и год</span></label><label class="create-calendar__label"><span class="create-calendar__text-label">Выбрать месяц</span><select name="month" class="create-calendar__select"><option value="1">январь</option><option value="2">февраль</option><option value="3">март</option><option value="4">апрель</option><option value="5">май</option><option value="6">июнь</option><option value="7">июль</option><option value="8">август</option><option value="9">сентябрь</option><option value="10">октябрь</option><option value="11">ноябрь</option><option value="12">декабрь</option></select></label><label class="create-calendar__label"><span class="create-calendar__text-label">Выбрать год</span><select name="year" class="create-calendar__select"><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option><option value="2022">2022</option></select></label><div><p class="create-calendar__text">Выбранный Вами год и месяц</p><div id="settingsResult" class="create-calendar__output-date"></div></div></fieldset></form><div id="previewCalendar" class="preview-calendar"></div><div id="output" class="output"></div>';
}

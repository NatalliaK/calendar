'use strict';

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup('bdd');
var assert = chai.assert;

describe('drawInteractiveCalendar', function() {
	var monthAdjustment = -1;
	var el, elHeader;
	beforeEach(function() {
		el = document.createElement('div');
		elHeader = document.createElement('div');
	});
	it('функция', function() {
		assert.isOk(typeof drawInteractiveCalendar === 'function');
	});
	it('принимает html-элемент аргументом', function() {
		drawInteractiveCalendar(el, 2018, 1, elHeader);
		assert.isOk(el.innerHTML.trim() !== '');
	});
	it('возвращает разный html для разных месяцев', function() {
		drawInteractiveCalendar(el, 2018, 1, elHeader);
		var el1 = el.innerHTML;
		drawInteractiveCalendar(el, 2018, 2, elHeader);
		var el2 = el.innerHTML;
		assert.isOk(el1 !== el2);
	});
	it('возвращает правильную дату', function() {
		drawInteractiveCalendar(el, 2018, 4, elHeader);
		assert.isOk(el.innerHTML.indexOf('30') > 1);
		assert.isOk(el.innerHTML.indexOf('31') < 1);
		drawInteractiveCalendar(el, 2018, 2, elHeader);
		assert.isOk(el.innerHTML.indexOf('28') > 1);
		assert.isOk(el.innerHTML.indexOf('29') < 1);
	});
	it('Отображаемая дата соответствует дате в календаре', function() {
		drawInteractiveCalendar(el, 2018, 4, elHeader);
		var date = new Date(2018, 4 + monthAdjustment);
		var span = elHeader.querySelector('.calendar-header__span');
		var writeMonth = date.toLocaleString('ru', { month: 'long' });
		var writeYear = date.toLocaleString('ru', { year: 'numeric' });
		assert.isOk(span.innerHTML === writeMonth + ' ' + writeYear);
	});
	it('нажатие кнопки "назад" отображает предыдущий месяц', function() {
		drawInteractiveCalendar(el, 2018, 3, elHeader);
		elHeader.querySelector('button[data-btn="prev"]').click();
		assert.isOk(el.innerHTML.indexOf('28') > 1);
		assert.isOk(el.innerHTML.indexOf('29') < 1);
	});
	it('при нажатии кнопки "назад" дата в календаре соответствует дате в заголовке', function() {
		drawInteractiveCalendar(el, 2018, 4, elHeader);
		elHeader.querySelector('button[data-btn="prev"]').click();
		var date = new Date(2018, 4 - 1 + monthAdjustment);
		var writeMonth = date.toLocaleString('ru', { month: 'long' });
		var writeYear = date.toLocaleString('ru', { year: 'numeric' });
		assert.equal(
			elHeader.querySelector('span').innerHTML,
			writeMonth + ' ' + writeYear
		);

		drawInteractiveCalendar(el, 2018, 1, elHeader);
		elHeader.querySelector('button[data-btn="prev"]').click();
		date = new Date(2018, 1 - 1 + monthAdjustment);
		writeMonth = date.toLocaleString('ru', { month: 'long' });
		writeYear = date.toLocaleString('ru', { year: 'numeric' });
		assert.equal(
			elHeader.querySelector('span').innerHTML,
			writeMonth + ' ' + writeYear
		);
	});
	it('при нажатии кнопки "назад" возвращает правильную дату', function() {
		drawInteractiveCalendar(el, 2018, 3, elHeader);
		elHeader.querySelector('button[data-btn="prev"]').click();
		assert.isOk(el.innerHTML.indexOf('28') > 1);
		assert.isOk(el.innerHTML.indexOf('29') < 1);
	});
	it('нажатие кнопки "вперед" отображает следующий месяц', function() {
		drawInteractiveCalendar(el, 2018, 1, elHeader);
		elHeader.querySelector('button[data-btn="next"]').click();
		assert.isOk(el.innerHTML.indexOf('28') > 1);
		assert.isOk(el.innerHTML.indexOf('29') < 1);
	});
	it('при нажатии кнопки "вперед" дата в календаре соответствует дате в заголовке', function() {
		drawInteractiveCalendar(el, 2018, 4, elHeader);
		elHeader.querySelector('button[data-btn="next"]').click();
		var date = new Date(2018, 4 + 1 + monthAdjustment);
		var writeMonth = date.toLocaleString('ru', { month: 'long' });
		var writeYear = date.toLocaleString('ru', { year: 'numeric' });
		assert.equal(
			elHeader.querySelector('span').innerHTML,
			writeMonth + ' ' + writeYear
		);

		drawInteractiveCalendar(el, 2017, 11, elHeader);
		elHeader.querySelector('button[data-btn="next"]').click();
		elHeader.querySelector('button[data-btn="next"]').click();
		date = new Date(2017, 11 + 2 + monthAdjustment);
		writeMonth = date.toLocaleString('ru', { month: 'long' });
		writeYear = date.toLocaleString('ru', { year: 'numeric' });
		assert.equal(
			elHeader.querySelector('span').innerHTML,
			writeMonth + ' ' + writeYear
		);
	});
	it('при нажатии кнопки "вперед" возвращает правильную дату', function() {
		drawInteractiveCalendar(el, 2018, 1, elHeader);
		elHeader.querySelector('button[data-btn="next"]').click();
		assert.isOk(el.innerHTML.indexOf('28') > 1);
		assert.isOk(el.innerHTML.indexOf('29') < 1);
	});
});
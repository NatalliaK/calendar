"@fixture createCalendar";
"@page https://natalliak.github.io/#createCalendar";

"@test"["test1"] = {
    '1.Click link "Создать календарь"': function() {
        act.click(":containsExcludeChildren(Создать календарь)");
    },
    "2.Assert": function() {
        eq($("#calendar").html() === "", true);
        eq($("#about").html() === "", true);
    },
    '3.Click link "Обо мне"': function() {
        act.click(":containsExcludeChildren(Обо мне)");
    },
    "4.Assert": function() {
        eq($("#createCalendar").html() === "", true);
        eq($("#calendar").html() === "", true);
    },
    '5.Click link "Создать календарь"': function() {
        act.click(":containsExcludeChildren(Создать календарь)");
    },
    '6.Click span "Отображать месяц и..."': function() {
        act.click(":containsExcludeChildren(Отображать месяц и год)");
    },
    "7.Assert": function() {
        eq($(":containsExcludeChildren(май 2018)").length > 0, true);
    },
    '8.Click span "Возможность..."': function() {
        act.click(":containsExcludeChildren(Возможность изменения месяца)");
    },
    "9.Assert": function() {
        eq($("[alt='previous']").length > 0, true);
        eq($("[alt='next']").length > 0, true);
    },
    '10.Click select "month"': function() {
        act.click("[name='month'].create-calendar__select");
    },
    '11.Click option "март"': function() {
        act.click(":containsExcludeChildren(март)");
    },
    "12.Assert": function() {
        eq($(":containsExcludeChildren(март 2018)").html() === "март 2018", true);
        eq($("#settingsResult").html() === "Месяц: 3, год: год не выбран", true);
    },
    '13.Click select "year"': function() {
        act.click("[name='year'].create-calendar__select");
    },
    '14.Click option "2016"': function() {
        act.click(":containsExcludeChildren(2016)");
    },
    "15.Assert": function() {
        eq($(":containsExcludeChildren(март 2016)").html() === "март 2016", true);
        eq($("#settingsResult").html() === "Месяц: 3, год: 2016", true);
    }
};


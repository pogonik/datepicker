export function dayNames(lang = 'en-US', firstDayOfWeek = 0) {
    let days = [];
    for (var i = firstDayOfWeek; i < (7 + firstDayOfWeek); i++) {
        let d = new Date(0,0,i);
        let day = {
            narrow: d.toLocaleDateString(lang, { weekday: "narrow" }),
            short: d.toLocaleDateString(lang, { weekday: "short" }),
            long: d.toLocaleDateString(lang, { weekday: "long" })
        };
        days.push(day);
    }
    return days;
};

export function MonthsNames(lang = 'en-US') {
    let months = [];
    for (var i = 0; i < 12; i++) {
        let d = new Date(0,i);
        months[i] = {
            narrow: d.toLocaleDateString(lang, { month: "narrow" }),
            short: d.toLocaleDateString(lang, { month: "short" }),
            long: d.toLocaleDateString(lang, { month: "long" })
        };
    }
    return months;
};


export function getMonthData(start, firstDayOfWeek = 0) {

    let today = new Date();
    today.setHours(0,0,0,0);

    start = (!start || start === null) ? new Date(today.getFullYear(),today.getMonth()) : start;
    let end = new Date(start.getFullYear(), parseInt(start.getMonth())+1, 0);

    let date = {
        today: today,
        start: start,
        end: end,
        year: start.getFullYear(),
        month: start.getMonth(),
        days: []
    };

    let diff1 = (start.getDay() < firstDayOfWeek ? 7 : 0) + start.getDay() - firstDayOfWeek;
    let startDate = new Date(date.year, date.month, 1 - diff1);
    startDate.setHours(0,0,0,0);

    let diff2 = (end.getDay() < firstDayOfWeek ? -7 : 0) + 6 - (end.getDay() - firstDayOfWeek);
    let endDate = new Date(date.year, date.month, end.getDate() + diff2);
    endDate.setHours(0,0,0,0);

    while(startDate.getTime() <= endDate.getTime()) {
        date.days.push({
            day: startDate,
            unixDay: startDate.getTime(),
            today: startDate.getTime() === today.getTime() ? true : false,
            inMonth: startDate.getMonth() === date.month ? true : false
        });
        startDate = new Date(startDate.getTime() + 86400000);
        startDate.setHours(0,0,0,0);
    }

   return date;
};


export function getWeek(date) {
    let onejan = new Date(date.getFullYear(), 0, 1);
    let stamp = (new Date(date.getFullYear(), date.getMonth(), date.getDate()) - onejan) / 86400000;
    return Math.ceil((stamp + onejan.getDay() + 1) / 7);
}

export function getWeekByDay(d = new Date(), firstDayOfWeek = 0) {
   let res = [];
   d.setDate(d.getDate() - (d.getDay() - firstDayOfWeek));
   d.setHours(0, 0, 0, 0);

   res[0] = d;
   for (var i = 1; i < 7; i++) {
      res[i] = new Date(res[i - 1].getTime() + 86400000);
   }
   return res;
}

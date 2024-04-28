import { delayWhen } from 'rxjs/operators';

const isArray = (val: any) => {
  return Array.isArray(val);
};
const isBool = (val: any) => typeof val === 'boolean' || val instanceof Boolean;
const isDate = (val: any) => val instanceof Date;
const isEmpty = (val: any) => {
  return val === undefined || val === null || val == '';
};
const isEmptyAll = (args: any[]) => {
  for (let val of args) {
    if (!isEmpty(val)) {
      return false;
    }
  }
  return true;
};
const isEmptyOne = (args: any[]) => {
  for (let val of args) {
    if (isEmpty(val)) {
      return true;
    }
  }
  return false;
};
const isFunc = (val: any) => typeof val === 'function';
const isNumber = (val: any) => {
  return typeof val === 'number' && isFinite(val);
};
const isObject = (val: any) => typeof val === 'object' || val instanceof Object;
const isRegex = (val: any) => typeof val == 'object' && val instanceof RegExp;
const isString = (val: any) => {
  return typeof val === 'string' || val instanceof String;
};

const lpad = (nbr: any, w: number, z?: any) => {
  z = z || '0';
  nbr = nbr + '';
  if (nbr.length >= w) {
    return nbr;
  }
  let nc = w - nbr.length;
  for (let i = 0; i < nc; i++) {
    nbr = z + nbr;
  }
  return nbr;
};

const dateDiff = (d2: Date, d1: Date) => {
  let t2 = !isEmpty(d2) ? d2.getTime() : 0;
  let t1 = !isEmpty(d1) ? d1.getTime() : 0;
  return t2 - t1;
};

const dateDiffStr = (d2: Date, d1: Date) => {
  let milis = dateDiff(d2, d1);
  let sign = milis < 0 ? '-' : '';
  milis = Math.abs(milis);
  let totalSecs = Math.round(milis / 1000);
  let rSecs = totalSecs % 60;
  let totalMins = (totalSecs - rSecs) / 60;
  let rMins = totalMins % 60;
  let hours = (totalMins - rMins) / 60;
  return sign + lpad(hours, 2) + ':' + lpad(rMins, 2) + ':' + lpad(rSecs, 2);
};

const parseDate = (str: string, def?: Date) => {
  try {
    // parse date string to date object. Format 'yyyy/mm/dd hh:mm:ss'
    str = str.trim();
    let arr = str.split(/[ ]/g);

    let defVal = def !== undefined && def !== null ? def : new Date();

    if (arr.length < 1) {
      //Invalid string, return default value
      return defVal;
    }

    let arr2 = arr[0].split(/[\/]/g);
    if (arr2.length < 3) {
      return defVal;
    }

    let year = parseInt(arr2[0]);
    let mon = parseInt(arr2[1]);
    let day = parseInt(arr2[2]);

    let h = 0;
    let m = 0;
    let s = 0;
    if (arr.length > 1) {
      arr2 = arr[1].split(/[:]/g);
      if (arr2.length > 0) {
        h = parseInt(arr2[0]);
      }
      if (arr2.length > 1) {
        m = parseInt(arr2[1]);
      }
      if (arr2.length > 2) {
        s = parseInt(arr2[2]);
      }
    }
    //console.log('date parts', year, mon, day, h, m, s);
    const res: Date = new Date(year, mon - 1, day, h, m, s);

    //console.log('res day', res.getDate());

    let resStr = strftime('%Y/%m/%d %H:%M:%S', res);
    //console.log('Re-format date', resStr);

    return res;
  } catch (error) {
    console.log('Error parse date', str, error);
    return def;
  }
};

const prepareUrl = (url: string, params: Object) => {
  return url.replace(/:[^\/]+/g, function(m) {
    //console.log('match', m);
    return params[m.substring(1)];
  });
};

const prepareData = (url: string, params: Object) => {
  return url.replace(/:[A-Za-z0-9]+/g, function(m) {
    //console.log('match', m);
    return params[m.substring(1)];
  });
};

const clone = (obj: any) => {
  if (obj === undefined || obj === null) {
    return obj;
  }

  //array
  if (isArray(obj)) {
    return obj.map(x => clone(x));
  }

  if (isObject(obj)) {
    let copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
    }
    return copy;
  }

  //return object itself by default
  return obj;
};

/*
 * Port of strftime() by T. H. Doan (https://thdoan.github.io/strftime/)
 *
 * Day of year (%j) code based on Joe Orost's answer:
 * http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
 *
 * Week number (%V) code based on Taco van den Broek's prototype:
 * http://techblog.procurios.nl/k/news/view/33796/14863/calculate-iso-8601-week-and-year-in-javascript.html
 *
 * %a 	Abbreviated name of the day of the week.
 * %A 	Full name of the day of the week.
 * %b 	Abbreviated month name.
 * %B 	Full month name.
 * %c 	Preferred date and time (UTC) representation for the current locale.
 * %C 	Century number (year/100) as a 2-digit integer.
 * %d 	Day of the month as a decimal number (range 01 to 31).
 * %e 	Day of the month as a decimal number (range 1 to 31).
 * %F 	ISO 8601 date format (equivalent to %Y-%m-%d).
 * %G 	ISO 8601 week-based year with century as a decimal number. The 4-digit year corresponds to the ISO week number (see %V). This has the same format and value as %Y, except that if the ISO week number belongs to the previous or next year, that year is used instead.
 * %g 	Like %G, but without century, that is, with a 2-digit year (00-99).
 * %H 	Hour as a decimal number using a 24-hour clock (range 00 to 23). See also %k.
 * %I 	Hour as a decimal number using a 12-hour clock (range 01 to 12). See also %l.
 * %j 	Day of the year as a decimal number (range 001 to 366).
 * %k 	Hour as a decimal number using a 24-hour clock (range 0 to 23). See also %H.
 * %l 	Hour as a decimal number using a 12-hour clock (range 1 to 12). See also %I.
 * %m 	Month as a decimal number (range 01 to 12).
 * %n 	Month as a decimal number (range 1 to 12).
 * %M 	Minute as a decimal number (range 00 to 59).
 * %p 	Either "AM" or "PM" according to the given time value. Noon is treated as "PM" and midnight as "AM".
 * %P 	Like %p but in lowercase ("am" or "pm").
 * %s 	Number of seconds since the Epoch, 1970-01-01 00:00:00 +0000 (UTC).
 * %S 	Second as a decimal number (range 00 to 59).
 * %u 	Day of the week as a decimal (range 1 to 7), Monday being 1. See also %w.
 * %V 	ISO 8601 week number of the current year as a decimal number (range 01 to 53), where week 1 is the first week that has at least 4 days in the new year (that is, the first Thursday).
 * %w 	Day of the week as a decimal (range 0 to 6), Sunday being 0. See also %u.
 * %x 	Preferred date representation for the current locale without the time.
 * %X 	Preferred time representation for the current locale without the date.
 * %y 	Year as a decimal number without a century (range 00 to 99).
 * %Y 	Year as a decimal number including the century.
 * %z 	The +hhmm or -hhmm numeric timezone (that is, the hour and minute offset from UTC).
 * %Z 	Timezone name or abbreviation.
 *
 * Example: strftime('%Y:%m:%d %H:%M:%S') => '2018:11:19 14:04:36'
 *
 * Compatibility notes:
 * %c - formatted string is slightly different
 * %D - not implemented (use %m/%d/%y or %d/%m/%y)
 * %e - space is not added
 * %E - not implemented
 * %h - not implemented (use %b)
 * %k - space is not added
 * %n - like %m, but no leading zero (use \n for newline)
 * %O - not implemented
 * %r - not implemented (use %I:%M:%S %p)
 * %R - not implemented (use %H:%M)
 * %t - not implemented (use \t)
 * %T - not implemented (use %H:%M:%S)
 * %U - not implemented
 * %W - not implemented
 * %+ - not implemented
 * %% - not implemented (use %)
 */
const strftime = (sFormat, date) => {
  if (!(date instanceof Date)) {
    date = new Date();
  }
  var nDay = date.getDay(),
    nDate = date.getDate(),
    nMonth = date.getMonth(),
    nYear = date.getFullYear(),
    nHour = date.getHours(),
    aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    aMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    isLeapYear = function() {
      return (nYear % 4 === 0 && nYear % 100 !== 0) || nYear % 400 === 0;
    },
    // getThursday = function () {
    //     var target = new Date(date);
    //     target.setDate(nDate - ((nDay + 6) % 7) + 3);
    //     return target;
    // },
    zeroPad = function(nNum, nPad) {
      return (Math.pow(10, nPad) + nNum + '').slice(1);
    };
  return sFormat.replace(/%[a-z]/gi, function(sMatch) {
    return (
      ({
        '%a': aDays[nDay].slice(0, 3),
        '%A': aDays[nDay],
        '%b': aMonths[nMonth].slice(0, 3),
        '%B': aMonths[nMonth],
        '%c': date.toUTCString(),
        '%C': Math.floor(nYear / 100),
        '%d': zeroPad(nDate, 2),
        '%e': nDate,
        '%F': date.toISOString().slice(0, 10),
        // '%G': getThursday().getFullYear(),
        // '%g': (getThursday().getFullYear() + '').slice(2),
        '%H': zeroPad(nHour, 2),
        '%I': zeroPad(((nHour + 11) % 12) + 1, 2),
        '%j': zeroPad(aDayCount[nMonth] + nDate + (nMonth > 1 && isLeapYear() ? 1 : 0), 3),
        '%k': nHour,
        '%l': ((nHour + 11) % 12) + 1,
        '%m': zeroPad(nMonth + 1, 2),
        '%n': nMonth + 1,
        '%M': zeroPad(date.getMinutes(), 2),
        '%p': nHour < 12 ? 'AM' : 'PM',
        '%P': nHour < 12 ? 'am' : 'pm',
        '%s': Math.round(date.getTime() / 1000),
        '%S': zeroPad(date.getSeconds(), 2),
        '%u': nDay || 7,
        // '%V': (function () {
        //     var target = getThursday(),
        //         n1stThu = target.valueOf();
        //     target.setMonth(0, 1);
        //     var nJan1 = target.getDay();
        //     if (nJan1 !== 4) target.setMonth(0, 1 + ((4 - nJan1) + 7) % 7);
        //     return zeroPad(1 + Math.ceil((n1stThu - target) / 604800000), 2);
        // })(),
        '%w': nDay,
        '%x': date.toLocaleDateString(),
        '%X': date.toLocaleTimeString(),
        '%y': (nYear + '').slice(2),
        '%Y': nYear,
        '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
        '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
      }[sMatch] || '') + '' || sMatch
    );
  });
};

const formatTime = date => {
  const year = date.getFullYear(),
    month = date.getMonth() + 1, // months are zero indexed
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    millisecond = date.getMilliseconds(),
    hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
    minuteFormatted = minute < 10 ? '0' + minute : minute,
    secondFormatted = second < 10 ? '0' + second : second,
    millisecondFormatted = millisecond < 100 ? '0' + millisecond : millisecond;

  // return `${ month }/${ day }/${ year } ${ hourFormatted }:${ minuteFormatted }:${ secondFormatted }`;
  return `${hourFormatted}:${minuteFormatted}:${secondFormatted}.${millisecondFormatted}`;
};

const CommonFunc = {
  clone,
  dateDiff,
  dateDiffStr,
  isArray,
  isBool,
  isDate,
  isEmpty,
  isEmptyAll,
  isEmptyOne,
  isFunc,
  isNumber,
  isObject,
  isRegex,
  lpad,
  prepareData,
  isString,
  prepareUrl,
  parseDate,
  strftime,
  formatTime
};

export { CommonFunc };

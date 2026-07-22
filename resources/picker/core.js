// src/core/config.ts
var DEFAULT_LABELS = {
  gregorianTab: "\u05DC\u05D5\u05E2\u05D6\u05D9",
  hebrewTab: "\u05E2\u05D1\u05E8\u05D9",
  today: "\u05D4\u05D9\u05D5\u05DD",
  clear: "\u05E0\u05E7\u05D4",
  confirm: "\u05D0\u05D9\u05E9\u05D5\u05E8",
  rangeStart: "\u05DE\u05EA\u05D0\u05E8\u05D9\u05DA",
  rangeEnd: "\u05E2\u05D3 \u05EA\u05D0\u05E8\u05D9\u05DA",
  pickMonth: "\u05D1\u05D7\u05D9\u05E8\u05EA \u05D7\u05D5\u05D3\u05E9",
  pickYear: "\u05D1\u05D7\u05D9\u05E8\u05EA \u05E9\u05E0\u05D4",
  prevMonth: "\u05D7\u05D5\u05D3\u05E9 \u05E7\u05D5\u05D3\u05DD",
  nextMonth: "\u05D7\u05D5\u05D3\u05E9 \u05D4\u05D1\u05D0",
  prevYear: "\u05E9\u05E0\u05D4 \u05E7\u05D5\u05D3\u05DE\u05EA",
  nextYear: "\u05E9\u05E0\u05D4 \u05D4\u05D1\u05D0\u05D4",
  jumpPrevYear: "\u05E9\u05E0\u05D4 \u05D0\u05D7\u05D5\u05E8\u05D4",
  jumpNextYear: "\u05E9\u05E0\u05D4 \u05E7\u05D3\u05D9\u05DE\u05D4",
  hebrewPreview: "\u05E2\u05D1\u05E8\u05D9",
  gregorianPreview: "\u05DC\u05D5\u05E2\u05D6\u05D9",
  presetToday: "\u05D4\u05D9\u05D5\u05DD",
  presetYesterday: "\u05D0\u05EA\u05DE\u05D5\u05DC",
  presetLast7Days: "7 \u05D4\u05D9\u05DE\u05D9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",
  presetLast30Days: "30 \u05D4\u05D9\u05DE\u05D9\u05DD \u05D4\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD",
  presetThisMonth: "\u05D4\u05D7\u05D5\u05D3\u05E9 \u05D4\u05D6\u05D4",
  presetLastMonth: "\u05D4\u05D7\u05D5\u05D3\u05E9 \u05E9\u05E2\u05D1\u05E8",
  presetThisYear: "\u05D4\u05E9\u05E0\u05D4 \u05D4\u05D6\u05D5",
  presetLastYear: "\u05D4\u05E9\u05E0\u05D4 \u05E9\u05E2\u05D1\u05E8\u05D4",
  presetCustom: "\u05DE\u05D5\u05EA\u05D0\u05DD \u05D0\u05D9\u05E9\u05D9\u05EA",
  weekdays: ["\u05D0", "\u05D1", "\u05D2", "\u05D3", "\u05D4", "\u05D5", "\u05E9"]
};
var DEFAULT_LABELS_EN = {
  gregorianTab: "Gregorian",
  hebrewTab: "Hebrew",
  today: "Today",
  clear: "Clear",
  confirm: "OK",
  rangeStart: "From",
  rangeEnd: "To",
  pickMonth: "Pick month",
  pickYear: "Pick year",
  prevMonth: "Previous month",
  nextMonth: "Next month",
  prevYear: "Previous year",
  nextYear: "Next year",
  jumpPrevYear: "Previous year",
  jumpNextYear: "Next year",
  hebrewPreview: "Hebrew",
  gregorianPreview: "Gregorian",
  presetToday: "Today",
  presetYesterday: "Yesterday",
  presetLast7Days: "Last 7 days",
  presetLast30Days: "Last 30 days",
  presetThisMonth: "This month",
  presetLastMonth: "Last month",
  presetThisYear: "This year",
  presetLastYear: "Last year",
  presetCustom: "Custom",
  weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
};
function langPreset(lang) {
  return lang === "en" ? { labels: { ...DEFAULT_LABELS_EN }, locale: "en-US" } : { labels: { ...DEFAULT_LABELS }, locale: "he-IL" };
}
var globalConfig = {
  calendar: "hebrew",
  highlightShabbat: true,
  highlightHolidays: true,
  showParasha: true,
  showTooltips: true,
  outsideDays: true,
  diaspora: false,
  displayCalendar: "hebrew",
  time: false,
  seconds: false,
  timeFormat: "24",
  timeStyle: "normal",
  lang: "he",
  rounded: false,
  headerBorder: true,
  primaryColor: "",
  size: "md",
  compact: false,
  closeOnSelect: true,
  locale: "he-IL",
  labels: { ...DEFAULT_LABELS }
};
function setGlobalConfig(partial) {
  if (partial.labels) {
    globalConfig.labels = { ...globalConfig.labels, ...partial.labels };
    delete partial.labels;
  }
  Object.assign(globalConfig, partial);
  return getGlobalConfig();
}
function getGlobalConfig() {
  return { ...globalConfig, labels: { ...globalConfig.labels } };
}
function resetGlobalConfig() {
  setGlobalConfig({
    calendar: "hebrew",
    highlightShabbat: true,
    highlightHolidays: true,
    showParasha: true,
    showTooltips: true,
    outsideDays: false,
    diaspora: false,
    displayCalendar: "hebrew",
    time: false,
    seconds: false,
    timeFormat: "24",
    timeStyle: "normal",
    lang: "he",
    rounded: false,
    primaryColor: "",
    size: "md",
    compact: false,
    closeOnSelect: true,
    locale: "he-IL",
    labels: { ...DEFAULT_LABELS }
  });
}

// src/core/hebrew.ts
var fmtNum = new Intl.DateTimeFormat("en-u-ca-hebrew", {
  day: "numeric",
  month: "numeric",
  year: "numeric"
});
function hebMonthFmt() {
  return new Intl.DateTimeFormat(getGlobalConfig().locale + "-u-ca-hebrew", {
    month: "long"
  });
}
var G_HUNDREDS = ["", "\u05E7", "\u05E8", "\u05E9", "\u05EA", "\u05EA\u05E7", "\u05EA\u05E8", "\u05EA\u05E9", "\u05EA\u05EA", "\u05EA\u05EA\u05E7"];
var G_TENS = ["", "\u05D9", "\u05DB", "\u05DC", "\u05DE", "\u05E0", "\u05E1", "\u05E2", "\u05E4", "\u05E6"];
var G_ONES = ["", "\u05D0", "\u05D1", "\u05D2", "\u05D3", "\u05D4", "\u05D5", "\u05D6", "\u05D7", "\u05D8"];
function gematriaThree(n) {
  let h = Math.floor(n / 100);
  const rest = n % 100;
  let out = "";
  while (h > 9) {
    out += "\u05EA\u05EA\u05E7";
    h -= 9;
  }
  out += G_HUNDREDS[h];
  const t = Math.floor(rest / 10);
  const o = rest % 10;
  if (t === 1 && o === 5) out += "\u05D8\u05D5";
  else if (t === 1 && o === 6) out += "\u05D8\u05D6";
  else out += G_TENS[t] + G_ONES[o];
  return out;
}
function insertGershayim(s) {
  if (s.length === 0) return s;
  if (s.length === 1) return s + "\u05F3";
  return s.slice(0, -1) + "\u05F4" + s.slice(-1);
}
function hebYearGematria(y) {
  const inThousand = y % 1e3;
  if (inThousand === 0) return String(y);
  return insertGershayim(gematriaThree(inThousand));
}
function hebYearGematriaFull(y) {
  const thousands = Math.floor(y / 1e3);
  const rest = y % 1e3;
  if (thousands < 1 || thousands > 9) return hebYearGematria(y);
  const prefix = G_ONES[thousands] + "\u05F3";
  if (rest === 0) return prefix;
  return prefix + insertGershayim(gematriaThree(rest));
}
function hebDayGematria(d) {
  if (d < 1 || d > 30) return String(d);
  if (d === 15) return "\u05D8\u05F4\u05D5";
  if (d === 16) return "\u05D8\u05F4\u05D6";
  if (d < 10) return G_ONES[d] + "\u05F3";
  if (d === 10) return "\u05D9\u05F3";
  if (d === 20) return "\u05DB\u05F3";
  if (d === 30) return "\u05DC\u05F3";
  const t = Math.floor(d / 10);
  const o = d % 10;
  return G_TENS[t] + "\u05F4" + G_ONES[o];
}
function toInt(v) {
  const m = String(v).match(/-?\d+/);
  return m ? parseInt(m[0], 10) : NaN;
}
function gregToHebParts(date) {
  const parts = fmtNum.formatToParts(date);
  return {
    year: toInt(parts.find((p) => p.type === "year").value),
    month: parts.find((p) => p.type === "month").value,
    day: toInt(parts.find((p) => p.type === "day").value)
  };
}
function hebMonthName(date) {
  return hebMonthFmt().format(date).replace(/וון/g, "\u05D5\u05DF");
}
function hebFullString(date) {
  const p = gregToHebParts(date);
  return `${hebDayGematria(p.day)} ${hebMonthName(date)} ${hebYearGematria(p.year)}`;
}
var yearCache = {};
function buildYear(hebYear) {
  if (yearCache[hebYear]) return yearCache[hebYear];
  const baseGreg = hebYear - 3761;
  const from = new Date(baseGreg, 7, 1, 12);
  from.setFullYear(baseGreg);
  const to = new Date(baseGreg + 1, 10, 30, 12);
  to.setFullYear(baseGreg + 1);
  const months = [];
  let cur = null;
  for (const d = new Date(from); d.getTime() <= to.getTime(); d.setDate(d.getDate() + 1)) {
    const p = gregToHebParts(d);
    if (p.year !== hebYear) {
      if (cur) {
        months.push(cur);
        cur = null;
      }
      if (months.length > 0) break;
      continue;
    }
    if (!cur || cur.num !== p.month) {
      if (cur) months.push(cur);
      cur = {
        num: p.month,
        name: hebMonthName(d),
        firstGreg: new Date(d),
        days: 1
      };
    } else {
      cur.days++;
    }
  }
  if (cur && !months.includes(cur)) months.push(cur);
  const info = { months, leap: months.length === 13 };
  yearCache[hebYear] = info;
  return info;
}
function hebToGreg(hebYear, monthNum, day) {
  const info = buildYear(hebYear);
  const m = info.months.find((mm) => mm.num === monthNum);
  if (!m) return null;
  const clamped = Math.max(1, Math.min(m.days, day));
  const d = new Date(m.firstGreg);
  d.setDate(d.getDate() + (clamped - 1));
  return d;
}
function getMonthsForYear(hebYear) {
  return buildYear(hebYear).months;
}
function isLeapYear(hebYear) {
  return buildYear(hebYear).leap;
}
function hebMonthYearLabel(date) {
  const p = gregToHebParts(date);
  return `${hebMonthName(date)} ${hebYearGematria(p.year)}`;
}

// src/core/jewish-events.ts
var HOLIDAYS = {
  Tishri: {
    1: { name: "\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05D0\u05F3", type: "yomtov" },
    2: { name: "\u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4 \u05D1\u05F3", type: "yomtov" },
    3: { name: "\u05E6\u05D5\u05DD \u05D2\u05D3\u05DC\u05D9\u05D4", type: "fast" },
    10: { name: "\u05D9\u05D5\u05DD \u05D4\u05DB\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD", type: "yomtov" },
    15: { name: "\u05E1\u05D5\u05DB\u05D5\u05EA \u05D0\u05F3", type: "yomtov" },
    16: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E1\u05D5\u05DB\u05D5\u05EA", type: "cholhamoed" },
    17: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E1\u05D5\u05DB\u05D5\u05EA", type: "cholhamoed" },
    18: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E1\u05D5\u05DB\u05D5\u05EA", type: "cholhamoed" },
    19: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E1\u05D5\u05DB\u05D5\u05EA", type: "cholhamoed" },
    20: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E1\u05D5\u05DB\u05D5\u05EA", type: "cholhamoed" },
    21: { name: "\u05D4\u05D5\u05E9\u05E2\u05E0\u05D0 \u05E8\u05D1\u05D4", type: "cholhamoed" },
    22: { name: "\u05E9\u05DE\u05D9\u05E0\u05D9 \u05E2\u05E6\u05E8\u05EA / \u05E9\u05DE\u05D7\u05EA \u05EA\u05D5\u05E8\u05D4", type: "yomtov" }
  },
  Kislev: {
    25: { name: "\u05D7\u05E0\u05D5\u05DB\u05D4 \u05D0\u05F3", type: "chanukah" },
    26: { name: "\u05D7\u05E0\u05D5\u05DB\u05D4 \u05D1\u05F3", type: "chanukah" },
    27: { name: "\u05D7\u05E0\u05D5\u05DB\u05D4 \u05D2\u05F3", type: "chanukah" },
    28: { name: "\u05D7\u05E0\u05D5\u05DB\u05D4 \u05D3\u05F3", type: "chanukah" },
    29: { name: "\u05D7\u05E0\u05D5\u05DB\u05D4 \u05D4\u05F3", type: "chanukah" },
    30: { name: "\u05D7\u05E0\u05D5\u05DB\u05D4 \u05D5\u05F3", type: "chanukah" }
  },
  Tevet: {
    1: { name: "\u05D7\u05E0\u05D5\u05DB\u05D4", type: "chanukah" },
    2: { name: "\u05D7\u05E0\u05D5\u05DB\u05D4", type: "chanukah" },
    3: { name: "\u05D7\u05E0\u05D5\u05DB\u05D4", type: "chanukah" },
    10: { name: "\u05E2\u05E9\u05E8\u05D4 \u05D1\u05D8\u05D1\u05EA", type: "fast" }
  },
  Shevat: {
    15: { name: "\u05D8\u05F4\u05D5 \u05D1\u05E9\u05D1\u05D8", type: "minor" }
  },
  Adar: {
    13: { name: "\u05EA\u05E2\u05E0\u05D9\u05EA \u05D0\u05E1\u05EA\u05E8", type: "fast" },
    14: { name: "\u05E4\u05D5\u05E8\u05D9\u05DD", type: "minor" },
    15: { name: "\u05E9\u05D5\u05E9\u05DF \u05E4\u05D5\u05E8\u05D9\u05DD", type: "minor" }
  },
  "Adar I": {
    14: { name: "\u05E4\u05D5\u05E8\u05D9\u05DD \u05E7\u05D8\u05DF", type: "minor" },
    15: { name: "\u05E9\u05D5\u05E9\u05DF \u05E4\u05D5\u05E8\u05D9\u05DD \u05E7\u05D8\u05DF", type: "minor" }
  },
  "Adar II": {
    13: { name: "\u05EA\u05E2\u05E0\u05D9\u05EA \u05D0\u05E1\u05EA\u05E8", type: "fast" },
    14: { name: "\u05E4\u05D5\u05E8\u05D9\u05DD", type: "minor" },
    15: { name: "\u05E9\u05D5\u05E9\u05DF \u05E4\u05D5\u05E8\u05D9\u05DD", type: "minor" }
  },
  Nisan: {
    14: { name: "\u05E2\u05E8\u05D1 \u05E4\u05E1\u05D7", type: "minor" },
    15: { name: "\u05E4\u05E1\u05D7 \u05D0\u05F3", type: "yomtov" },
    16: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E4\u05E1\u05D7", type: "cholhamoed" },
    17: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E4\u05E1\u05D7", type: "cholhamoed" },
    18: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E4\u05E1\u05D7", type: "cholhamoed" },
    19: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E4\u05E1\u05D7", type: "cholhamoed" },
    20: { name: "\u05D7\u05D5\u05D4\u05F4\u05DE \u05E4\u05E1\u05D7", type: "cholhamoed" },
    21: { name: "\u05E9\u05D1\u05D9\u05E2\u05D9 \u05E9\u05DC \u05E4\u05E1\u05D7", type: "yomtov" }
  },
  Iyar: {
    14: { name: "\u05E4\u05E1\u05D7 \u05E9\u05E0\u05D9", type: "minor" },
    18: { name: "\u05DC\u05F4\u05D2 \u05D1\u05E2\u05D5\u05DE\u05E8", type: "minor" }
  },
  Sivan: {
    6: { name: "\u05E9\u05D1\u05D5\u05E2\u05D5\u05EA", type: "yomtov" }
  },
  Tammuz: {
    17: { name: "\u05D9\u05F4\u05D6 \u05D1\u05EA\u05DE\u05D5\u05D6", type: "fast" }
  },
  Av: {
    9: { name: "\u05EA\u05E9\u05E2\u05D4 \u05D1\u05D0\u05D1", type: "fast" },
    15: { name: "\u05D8\u05F4\u05D5 \u05D1\u05D0\u05D1", type: "minor" }
  }
};
var HOLIDAYS_DIASPORA = {
  Tishri: {
    16: { name: "\u05E1\u05D5\u05DB\u05D5\u05EA \u05D1\u05F3", type: "yomtov" },
    22: { name: "\u05E9\u05DE\u05D9\u05E0\u05D9 \u05E2\u05E6\u05E8\u05EA", type: "yomtov" },
    23: { name: "\u05E9\u05DE\u05D7\u05EA \u05EA\u05D5\u05E8\u05D4", type: "yomtov" }
  },
  Nisan: {
    16: { name: "\u05E4\u05E1\u05D7 \u05D1\u05F3", type: "yomtov" },
    22: { name: "\u05D0\u05D7\u05E8\u05D5\u05DF \u05E9\u05DC \u05E4\u05E1\u05D7", type: "yomtov" }
  },
  Sivan: {
    7: { name: "\u05E9\u05D1\u05D5\u05E2\u05D5\u05EA \u05D1\u05F3", type: "yomtov" }
  }
};
function getHoliday(date, opts = {}) {
  const p = gregToHebParts(date);
  const monthHolidays = HOLIDAYS[p.month];
  let holiday = monthHolidays && monthHolidays[p.day] || null;
  if (opts.diaspora) {
    const d = HOLIDAYS_DIASPORA[p.month];
    if (d && d[p.day]) holiday = d[p.day];
  }
  if (date.getDay() === 6) {
    if (p.month === "Tishri" && p.day === 3 || p.month === "Tammuz" && p.day === 17 || p.month === "Av" && p.day === 9 || (p.month === "Adar" || p.month === "Adar II") && p.day === 13) {
      holiday = null;
    }
  } else {
    if (date.getDay() === 0) {
      if (p.month === "Tishri" && p.day === 4) {
        const prev = new Date(date);
        prev.setDate(prev.getDate() - 1);
        if (prev.getDay() === 6) return { name: "\u05E6\u05D5\u05DD \u05D2\u05D3\u05DC\u05D9\u05D4 (\u05E0\u05D3\u05D7\u05D4)", type: "fast" };
      }
      if (p.month === "Tammuz" && p.day === 18) {
        const prev = new Date(date);
        prev.setDate(prev.getDate() - 1);
        if (prev.getDay() === 6) return { name: "\u05D9\u05F4\u05D6 \u05D1\u05EA\u05DE\u05D5\u05D6 (\u05E0\u05D3\u05D7\u05D4)", type: "fast" };
      }
      if (p.month === "Av" && p.day === 10) {
        const prev = new Date(date);
        prev.setDate(prev.getDate() - 1);
        if (prev.getDay() === 6) return { name: "\u05EA\u05E9\u05E2\u05D4 \u05D1\u05D0\u05D1 (\u05E0\u05D3\u05D7\u05D4)", type: "fast" };
      }
    }
    if (date.getDay() === 4) {
      if ((p.month === "Adar" || p.month === "Adar II") && p.day === 11) {
        const d13 = new Date(date);
        d13.setDate(d13.getDate() + 2);
        if (d13.getDay() === 6) return { name: "\u05EA\u05E2\u05E0\u05D9\u05EA \u05D0\u05E1\u05EA\u05E8 (\u05DE\u05D5\u05E7\u05D3\u05DD)", type: "fast" };
      }
    }
  }
  return holiday;
}
function getRoshChodesh(date) {
  const p = gregToHebParts(date);
  if (p.day === 1) {
    if (p.month === "Tishri") return null;
    return { name: "\u05E8\u05D0\u05E9 \u05D7\u05D5\u05D3\u05E9 " + hebMonthName(date), type: "roshchodesh" };
  }
  if (p.day === 30) {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    const np = gregToHebParts(next);
    if (np.day === 1 && np.month !== "Tishri") {
      return { name: "\u05E8\u05D0\u05E9 \u05D7\u05D5\u05D3\u05E9 " + hebMonthName(next), type: "roshchodesh" };
    }
  }
  return null;
}
var PARASHOT = [
  null,
  "\u05D1\u05E8\u05D0\u05E9\u05D9\u05EA",
  "\u05E0\u05D7",
  "\u05DC\u05DA \u05DC\u05DA",
  "\u05D5\u05D9\u05E8\u05D0",
  "\u05D7\u05D9\u05D9 \u05E9\u05E8\u05D4",
  "\u05EA\u05D5\u05DC\u05D3\u05D5\u05EA",
  "\u05D5\u05D9\u05E6\u05D0",
  "\u05D5\u05D9\u05E9\u05DC\u05D7",
  "\u05D5\u05D9\u05E9\u05D1",
  "\u05DE\u05E7\u05E5",
  "\u05D5\u05D9\u05D2\u05E9",
  "\u05D5\u05D9\u05D7\u05D9",
  "\u05E9\u05DE\u05D5\u05EA",
  "\u05D5\u05D0\u05E8\u05D0",
  "\u05D1\u05D0",
  "\u05D1\u05E9\u05DC\u05D7",
  "\u05D9\u05EA\u05E8\u05D5",
  "\u05DE\u05E9\u05E4\u05D8\u05D9\u05DD",
  "\u05EA\u05E8\u05D5\u05DE\u05D4",
  "\u05EA\u05E6\u05D5\u05D4",
  "\u05DB\u05D9 \u05EA\u05E9\u05D0",
  "\u05D5\u05D9\u05E7\u05D4\u05DC",
  "\u05E4\u05E7\u05D5\u05D3\u05D9",
  "\u05D5\u05D9\u05E7\u05E8\u05D0",
  "\u05E6\u05D5",
  "\u05E9\u05DE\u05D9\u05E0\u05D9",
  "\u05EA\u05D6\u05E8\u05D9\u05E2",
  "\u05DE\u05E6\u05D5\u05E8\u05E2",
  "\u05D0\u05D7\u05E8\u05D9 \u05DE\u05D5\u05EA",
  "\u05E7\u05D3\u05D5\u05E9\u05D9\u05DD",
  "\u05D0\u05DE\u05D5\u05E8",
  "\u05D1\u05D4\u05E8",
  "\u05D1\u05D7\u05D5\u05E7\u05D5\u05EA\u05D9",
  "\u05D1\u05DE\u05D3\u05D1\u05E8",
  "\u05E0\u05E9\u05D0",
  "\u05D1\u05D4\u05E2\u05DC\u05D5\u05EA\u05DA",
  "\u05E9\u05DC\u05D7",
  "\u05E7\u05E8\u05D7",
  "\u05D7\u05D5\u05E7\u05EA",
  "\u05D1\u05DC\u05E7",
  "\u05E4\u05D9\u05E0\u05D7\u05E1",
  "\u05DE\u05D8\u05D5\u05EA",
  "\u05DE\u05E1\u05E2\u05D9",
  "\u05D3\u05D1\u05E8\u05D9\u05DD",
  "\u05D5\u05D0\u05EA\u05D7\u05E0\u05DF",
  "\u05E2\u05E7\u05D1",
  "\u05E8\u05D0\u05D4",
  "\u05E9\u05D5\u05E4\u05D8\u05D9\u05DD",
  "\u05DB\u05D9 \u05EA\u05E6\u05D0",
  "\u05DB\u05D9 \u05EA\u05D1\u05D5\u05D0",
  "\u05E0\u05E6\u05D1\u05D9\u05DD",
  "\u05D5\u05D9\u05DC\u05DA",
  "\u05D4\u05D0\u05D6\u05D9\u05E0\u05D5",
  "\u05D5\u05D6\u05D0\u05EA \u05D4\u05D1\u05E8\u05DB\u05D4"
];
var SEG2_PAIRS = [42, 39];
var SEG3_PAIRS = [51];
function pad2(n) {
  return String(n).padStart(2, "0");
}
function toISOlocal(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}
function festivalShabbatLabel(date, diaspora) {
  const p = gregToHebParts(date);
  if (p.month === "Tishri") {
    if (p.day === 1 || p.day === 2) return "\u05E9\u05D1\u05EA \u05E8\u05D0\u05E9 \u05D4\u05E9\u05E0\u05D4";
    if (p.day === 10) return "\u05E9\u05D1\u05EA \u05D9\u05D5\u05DD \u05D4\u05DB\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD";
    if (p.day === 15) return "\u05E9\u05D1\u05EA \u05E1\u05D5\u05DB\u05D5\u05EA";
    if (diaspora && p.day === 16) return "\u05E9\u05D1\u05EA \u05E1\u05D5\u05DB\u05D5\u05EA";
    if (p.day >= 16 && p.day <= 21) return "\u05E9\u05D1\u05EA \u05D7\u05D5\u05DC \u05D4\u05DE\u05D5\u05E2\u05D3 \u05E1\u05D5\u05DB\u05D5\u05EA";
    if (p.day === 22) return "\u05E9\u05D1\u05EA \u05E9\u05DE\u05D9\u05E0\u05D9 \u05E2\u05E6\u05E8\u05EA";
    if (diaspora && p.day === 23) return "\u05E9\u05D1\u05EA \u05E9\u05DE\u05D7\u05EA \u05EA\u05D5\u05E8\u05D4";
  }
  if (p.month === "Nisan") {
    if (p.day === 15) return "\u05E9\u05D1\u05EA \u05E4\u05E1\u05D7";
    if (diaspora && p.day === 16) return "\u05E9\u05D1\u05EA \u05E4\u05E1\u05D7";
    if (p.day >= 16 && p.day <= 20) return "\u05E9\u05D1\u05EA \u05D7\u05D5\u05DC \u05D4\u05DE\u05D5\u05E2\u05D3 \u05E4\u05E1\u05D7";
    if (p.day === 21) return "\u05E9\u05D1\u05EA \u05E9\u05D1\u05D9\u05E2\u05D9 \u05E9\u05DC \u05E4\u05E1\u05D7";
    if (diaspora && p.day === 22) return "\u05E9\u05D1\u05EA \u05D0\u05D7\u05E8\u05D5\u05DF \u05E9\u05DC \u05E4\u05E1\u05D7";
  }
  if (p.month === "Sivan") {
    if (p.day === 6) return "\u05E9\u05D1\u05EA \u05E9\u05D1\u05D5\u05E2\u05D5\u05EA";
    if (diaspora && p.day === 7) return "\u05E9\u05D1\u05EA \u05E9\u05D1\u05D5\u05E2\u05D5\u05EA";
  }
  return null;
}
var yearParashaCache = {};
function buildYearParashot(hebYear, diaspora) {
  const cacheKey = `${hebYear}:${diaspora ? "d" : "i"}`;
  if (yearParashaCache[cacheKey]) return yearParashaCache[cacheKey];
  const info = buildYear(hebYear);
  const tishri = info.months.find((m) => m.num === "Tishri");
  if (!tishri) return {};
  const stOffset = diaspora ? 23 : 22;
  const d23 = new Date(tishri.firstGreg);
  d23.setDate(d23.getDate() + stOffset);
  const firstShabbat = new Date(d23);
  while (firstShabbat.getDay() !== 6) firstShabbat.setDate(firstShabbat.getDate() + 1);
  const nextInfo = buildYear(hebYear + 1);
  const nextTishri = nextInfo.months.find((m) => m.num === "Tishri");
  const endDate = new Date(nextTishri.firstGreg);
  endDate.setDate(endDate.getDate() + (stOffset - 1));
  const all = [];
  const cur = new Date(firstShabbat);
  while (cur <= endDate) {
    all.push(new Date(cur));
    cur.setDate(cur.getDate() + 7);
  }
  const result = {};
  const R = [];
  for (const s of all) {
    const fest = festivalShabbatLabel(s, diaspora);
    if (fest) result[toISOlocal(s)] = fest;
    else R.push(s);
  }
  const av10 = hebToGreg(hebYear, "Av", 10);
  const av10t = av10 ? av10.getTime() : Infinity;
  let idxDevarim = -1;
  R.forEach((d, i) => {
    if (d.getTime() < av10t) idxDevarim = i;
  });
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const combinedSet = /* @__PURE__ */ new Set();
  const slotsA = idxDevarim + 1;
  let needA = clamp(44 - slotsA, 0, 6);
  const spring = info.leap ? [] : [22, 27, 29, 32];
  const springUsed = Math.min(spring.length, needA);
  for (let i = 0; i < springUsed; i++) combinedSet.add(spring[i]);
  needA -= springUsed;
  for (let i = 0; i < needA && i < SEG2_PAIRS.length; i++) {
    combinedSet.add(SEG2_PAIRS[i]);
  }
  const slotsB = R.length - 1 - idxDevarim;
  const cB = clamp(9 - slotsB, 0, SEG3_PAIRS.length);
  for (let i = 0; i < cB; i++) combinedSet.add(SEG3_PAIRS[i]);
  let paraIdx = 1;
  for (const shab of R) {
    if (paraIdx > 53) break;
    const iso = toISOlocal(shab);
    if (combinedSet.has(paraIdx)) {
      result[iso] = PARASHOT[paraIdx] + "-" + PARASHOT[paraIdx + 1];
      paraIdx += 2;
    } else {
      result[iso] = PARASHOT[paraIdx];
      paraIdx += 1;
    }
  }
  yearParashaCache[cacheKey] = result;
  return result;
}
function getParasha(date, opts = {}) {
  if (date.getDay() !== 6) return null;
  const diaspora = !!opts.diaspora;
  const p = gregToHebParts(date);
  const stDay = diaspora ? 23 : 22;
  let cycleYear = p.year;
  if (p.month === "Tishri" && p.day <= stDay) cycleYear = p.year - 1;
  const schedule = buildYearParashot(cycleYear, diaspora);
  return schedule[toISOlocal(date)] || null;
}
function getDayEvents(date, opts = {}) {
  const out = [];
  const holiday = getHoliday(date, opts);
  if (holiday) out.push(holiday);
  const rc = getRoshChodesh(date);
  if (rc) out.push(rc);
  if (date.getDay() === 6) {
    const parasha = getParasha(date, opts);
    const name = !parasha ? "\u05E9\u05D1\u05EA" : parasha.startsWith("\u05E9\u05D1\u05EA") ? parasha : "\u05E9\u05D1\u05EA " + parasha;
    out.push({ name, type: "shabbat" });
  }
  return out;
}

// src/core/dates.ts
function pad(n) {
  return String(n).padStart(2, "0");
}
function splitISO(s) {
  const m = String(s).match(/^(-?\d+)-(\d{1,2})-(\d{1,2})/);
  if (!m) return null;
  return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
}
function parseISO(s) {
  if (!s) return null;
  const p = splitISO(s);
  if (!p || !p[1] || !p[2] || isNaN(p[0])) return null;
  const d = new Date(p[0], p[1] - 1, p[2]);
  d.setFullYear(p[0]);
  return d;
}
function toISO(date) {
  if (!date) return "";
  const y = date.getFullYear();
  const ys = y < 0 ? "-" + String(-y).padStart(4, "0") : String(y).padStart(4, "0");
  return `${ys}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
var MIN_DATE = (() => {
  const d = new Date(2e3, 8, 7);
  d.setFullYear(-3760);
  return d;
})();
var MIN_ISO = toISO(MIN_DATE);
function clampToMin(d) {
  return d.getTime() < MIN_DATE.getTime() ? new Date(MIN_DATE) : d;
}
function gregMonthNames() {
  const fmt = new Intl.DateTimeFormat(getGlobalConfig().locale, {
    month: "long"
  });
  return Array.from({ length: 12 }, (_, i) => fmt.format(new Date(2021, i, 1)));
}
function compareISO(a, b) {
  if (a === b) return 0;
  if (!a) return -1;
  if (!b) return 1;
  const pa = splitISO(a);
  const pb = splitISO(b);
  if (pa && pb) {
    for (let i = 0; i < 3; i++) {
      if (pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1;
    }
  }
  return a < b ? -1 : a > b ? 1 : 0;
}

// src/core/calendar-view.ts
var YEAR_BLOCK = 20;
var EVENT_TYPE_CLASS = {
  yomtov: "hdp-evt-yomtov",
  cholhamoed: "hdp-evt-cholhamoed",
  fast: "hdp-evt-fast",
  minor: "hdp-evt-minor",
  chanukah: "hdp-evt-chanukah",
  roshchodesh: "hdp-evt-roshchodesh",
  shabbat: "hdp-evt-shabbat"
};
var CalendarView = class {
  constructor(root, opt) {
    this.gridView = null;
    /** Start year of the visible 20-year block (years view). null = derive from selection. */
    this.yearBlockStart = null;
    /** Last day-cell click, for manual double-click detection. */
    this.lastClick = null;
    // ===== Keyboard =====
    this.onKey = (e) => {
      const arrows = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
      if (e.key === "Enter") {
        e.preventDefault();
        if (this.gridView === "years") {
          if (this.opt.precision === "year") {
            this.commit();
          } else {
            this.gridView = "months";
            this.render();
          }
        } else if (this.gridView === "months") {
          if (this.opt.precision === "month") {
            this.commit();
          } else {
            this.gridView = null;
            this.render();
          }
        } else {
          this.commit();
        }
        return;
      }
      if (!arrows.includes(e.key)) return;
      e.preventDefault();
      if (this.gridView === "months") {
        this.keyMonths(e);
        return;
      }
      if (this.gridView === "years") {
        this.keyYears(e);
        return;
      }
      if (this.opt.type === "gregorian") {
        let dt = new Date(this.greg.getFullYear(), this.greg.getMonth(), this.greg.getDate());
        if (e.key === "ArrowRight") dt.setDate(dt.getDate() - 1);
        else if (e.key === "ArrowLeft") dt.setDate(dt.getDate() + 1);
        else if (e.key === "ArrowUp") dt.setDate(dt.getDate() - 7);
        else if (e.key === "ArrowDown") dt.setDate(dt.getDate() + 7);
        else if (e.key === "PageUp") {
          if (e.shiftKey) dt.setFullYear(dt.getFullYear() - 1);
          else dt.setMonth(dt.getMonth() - 1);
        } else if (e.key === "PageDown") {
          if (e.shiftKey) dt.setFullYear(dt.getFullYear() + 1);
          else dt.setMonth(dt.getMonth() + 1);
        } else if (e.key === "Home") dt = makeGreg(dt.getFullYear(), dt.getMonth(), 1);
        else if (e.key === "End") dt = makeGreg(dt.getFullYear(), dt.getMonth(), 31);
        this.greg = clampToMin(dt);
        this.heb = { ...gregToHebParts(this.greg) };
        this.render();
        this.changed();
      } else {
        let gr = hebToGreg(this.heb.year, this.heb.month, this.heb.day);
        if (!gr) return;
        gr = new Date(gr.getFullYear(), gr.getMonth(), gr.getDate());
        if (e.key === "PageUp" && e.shiftKey) {
          this.hebYearJump(-1);
          this.changed();
          return;
        }
        if (e.key === "PageDown" && e.shiftKey) {
          this.hebYearJump(1);
          this.changed();
          return;
        }
        if (e.key === "ArrowRight") gr.setDate(gr.getDate() - 1);
        else if (e.key === "ArrowLeft") gr.setDate(gr.getDate() + 1);
        else if (e.key === "ArrowUp") gr.setDate(gr.getDate() - 7);
        else if (e.key === "ArrowDown") gr.setDate(gr.getDate() + 7);
        else if (e.key === "PageUp") gr.setDate(gr.getDate() - 29);
        else if (e.key === "PageDown") gr.setDate(gr.getDate() + 29);
        else if (e.key === "Home") {
          this.heb.day = 1;
          this.render();
          this.changed();
          return;
        } else if (e.key === "End") {
          const cm = getMonthsForYear(this.heb.year).find((m) => m.num === this.heb.month);
          if (cm) this.heb.day = cm.days;
          this.render();
          this.changed();
          return;
        }
        this.greg = clampToMin(gr);
        this.heb = { ...gregToHebParts(this.greg) };
        this.render();
        this.changed();
      }
    };
    this.root = root;
    this.opt = opt;
    const init = opt.value ? parseISO(opt.value) : null;
    this.greg = init || /* @__PURE__ */ new Date();
    this.heb = { ...gregToHebParts(this.greg) };
    if (opt.precision === "month") this.gridView = "months";
    else if (opt.precision === "year") this.gridView = "years";
    this.root.classList.add("hdp-cal");
    this.root.classList.add(opt.type === "hebrew" ? "hdp-cal-hebrew" : "hdp-cal-greg");
    this.root.tabIndex = 0;
    this.root.addEventListener("keydown", this.onKey);
    this.root.addEventListener("mouseleave", () => {
      if (this.opt.rangeStart && !this.opt.rangeEnd) {
        if (this.opt.onHoverEnd) this.opt.onHoverEnd();
        else this.clearPreview();
      }
    });
    this.render();
  }
  destroy() {
    this.root.removeEventListener("keydown", this.onKey);
    this.root.innerHTML = "";
    hideTip();
  }
  getISO() {
    if (this.opt.type === "gregorian") {
      if (this.opt.precision === "year") return toISO(new Date(this.greg.getFullYear(), 0, 1));
      return this.opt.precision === "month" ? toISO(new Date(this.greg.getFullYear(), this.greg.getMonth(), 1)) : toISO(this.greg);
    }
    if (this.opt.precision === "year") {
      const firstMonth = getMonthsForYear(this.heb.year)[0].num;
      const dy = hebToGreg(this.heb.year, firstMonth, 1);
      return dy ? toISO(dy) : "";
    }
    const d = this.opt.precision === "month" ? hebToGreg(this.heb.year, this.heb.month, 1) : hebToGreg(this.heb.year, this.heb.month, this.heb.day);
    return d ? toISO(d) : "";
  }
  setValue(iso) {
    const d = iso ? parseISO(iso) : null;
    if (d) {
      this.greg = d;
      this.heb = { ...gregToHebParts(d) };
      this.render();
    }
  }
  focus() {
    this.root.focus();
  }
  /** Update the highlighted range without changing the visible month. */
  setRange(start, end) {
    this.opt.rangeStart = start;
    this.opt.rangeEnd = end;
    this.render();
  }
  /** Public: highlight the prospective range [a, b] on this calendar's cells
   * (used by the picker to mirror the hover preview across both calendars). */
  previewFrom(aIso, bIso) {
    this.applyPreview(aIso, bIso);
  }
  /** Public: clear any hover preview, restoring the committed range highlight. */
  clearPreviewPublic() {
    this.clearPreview();
  }
  applyRange(cell, iso) {
    const a = this.opt.rangeStart || "";
    const b = this.opt.rangeEnd || "";
    if (a && b) {
      const lo = compareISO(a, b) <= 0 ? a : b;
      const hi = lo === a ? b : a;
      if (iso === lo) cell.classList.add("is-range-start");
      if (iso === hi) cell.classList.add("is-range-end");
      if (iso === lo && iso === hi) cell.classList.add("is-range-single");
      if (compareISO(iso, lo) > 0 && compareISO(iso, hi) < 0) {
        cell.classList.add("is-in-range");
      }
    } else if (a && iso === a) {
      cell.classList.add("is-range-start");
    }
  }
  applyPreview(aIso, bIso) {
    const lo = compareISO(aIso, bIso) <= 0 ? aIso : bIso;
    const hi = lo === aIso ? bIso : aIso;
    this.root.querySelectorAll(".hdp-cell").forEach((cell) => {
      const ds = cell.dataset.iso;
      if (!ds) return;
      cell.classList.remove("is-in-range", "is-range-end", "is-range-start", "is-range-single");
      if (ds === lo) cell.classList.add("is-range-start");
      if (ds === hi && hi !== lo) cell.classList.add("is-range-end");
      if (compareISO(ds, lo) > 0 && compareISO(ds, hi) < 0) cell.classList.add("is-in-range");
    });
  }
  clearPreview() {
    this.root.querySelectorAll(".hdp-cell").forEach((cell) => {
      const ds = cell.dataset.iso;
      if (!ds) return;
      cell.classList.remove("is-in-range", "is-range-end", "is-range-start", "is-range-single");
      this.applyRange(cell, ds);
    });
  }
  wireDay(cell, iso) {
    cell.dataset.iso = iso;
    this.applyRange(cell, iso);
    cell.addEventListener("mouseenter", () => {
      if (this.opt.onDblPick && this.opt.rangeStart && !this.opt.rangeEnd) {
        if (this.opt.onHover) this.opt.onHover(iso);
        else this.applyPreview(this.opt.rangeStart, iso);
      }
    });
    cell.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.root.focus();
    });
  }
  /** Run a day's single-click action, detecting a double-click (same day within
   * ~350ms) and dispatching onDblPick instead — robust across grid rebuilds. */
  activate(iso, single) {
    const now = Date.now();
    if (this.lastClick && this.lastClick.iso === iso && now - this.lastClick.t < 350) {
      this.lastClick = null;
      if (this.opt.onDblPick && !this.isDisabled(iso)) {
        this.opt.onDblPick(iso);
        return;
      }
    }
    this.lastClick = { iso, t: now };
    single();
  }
  commit() {
    this.opt.onPick(this.getISO());
  }
  changed() {
    if (this.opt.onChange) this.opt.onChange(this.getISO());
  }
  isDisabled(iso) {
    if (compareISO(iso, MIN_ISO) < 0) return true;
    if (this.opt.min && compareISO(iso, this.opt.min) < 0) return true;
    if (this.opt.max && compareISO(iso, this.opt.max) > 0) return true;
    return false;
  }
  // ===== Rendering =====
  render() {
    const keepFocus = typeof document !== "undefined" && (document.activeElement === this.root || this.root.contains(document.activeElement));
    hideTip();
    this.root.innerHTML = "";
    if (this.opt.type === "gregorian") this.renderGreg();
    else this.renderHeb();
    if (keepFocus) this.root.focus();
  }
  makeHeader(titleNodes, onPrev, onNext, prevTip, nextTip, yearNav) {
    const head = el("div", "hdp-head");
    const navBtn = (cls, html, tip, fn) => {
      const b = el("button", cls);
      b.type = "button";
      b.innerHTML = html;
      if (this.opt.showTooltips) b.title = tip;
      b.onclick = (e) => {
        e.stopPropagation();
        fn();
      };
      return b;
    };
    if (yearNav) head.appendChild(navBtn("hdp-nav hdp-nav-year", "&#171;", yearNav.prevTip, yearNav.onPrev));
    head.appendChild(navBtn("hdp-nav", "&#8249;", prevTip, onPrev));
    const title = el("div", "hdp-title");
    titleNodes.forEach((n) => title.appendChild(n));
    head.appendChild(title);
    head.appendChild(navBtn("hdp-nav", "&#8250;", nextTip, onNext));
    if (yearNav) head.appendChild(navBtn("hdp-nav hdp-nav-year", "&#187;", yearNav.nextTip, yearNav.onNext));
    this.root.appendChild(head);
  }
  weekdayRow() {
    const wk = el("div", "hdp-weekdays");
    this.opt.labels.weekdays.forEach((w) => {
      const c = el("div", "hdp-wd");
      c.textContent = w;
      wk.appendChild(c);
    });
    this.root.appendChild(wk);
  }
  decorateDayCell(cell, date) {
    if (date.getDay() === 6 && this.opt.highlightShabbat) {
      cell.classList.add("hdp-shabbat");
    }
    if (this.opt.highlightHolidays || this.opt.showParasha) {
      const events = getDayEvents(date, { diaspora: this.opt.diaspora });
      const display = [];
      for (const ev of events) {
        if (ev.type === "shabbat") {
          if (this.opt.showParasha) display.push(ev);
        } else if (this.opt.highlightHolidays) {
          display.push(ev);
          cell.classList.add("hdp-holiday");
          const typeClass = EVENT_TYPE_CLASS[ev.type];
          if (typeClass) cell.classList.add(typeClass);
        }
      }
      if (display.length) {
        attachTip(cell, display);
      }
      if (this.opt.highlightHolidays && events.some((e) => e.type !== "shabbat")) {
        const dot = el("span", "hdp-dot");
        cell.appendChild(dot);
      }
    }
  }
  // ----- Gregorian -----
  renderGreg() {
    const cur = this.greg;
    const curY = cur.getFullYear();
    const curM = cur.getMonth();
    const curD = cur.getDate();
    const monthNames = gregMonthNames();
    const L = this.opt.labels;
    const mBtn = pill(monthNames[curM], L.pickMonth, () => {
      this.gridView = "months";
      this.render();
    });
    const yBtn = pill(String(curY), L.pickYear, () => {
      this.gridView = "years";
      this.yearBlockStart = null;
      this.render();
    });
    if (this.gridView === "months") {
      this.makeHeader(
        [pill(String(curY), L.pickYear, () => {
          this.gridView = "years";
          this.yearBlockStart = null;
          this.render();
        })],
        () => this.shiftGregYear(-1),
        () => this.shiftGregYear(1),
        `${L.prevYear} (PgUp)`,
        `${L.nextYear} (PgDn)`
      );
      this.renderGregMonthsGrid(curY, curM, curD);
      return;
    }
    if (this.gridView === "years") {
      const start = this.gregBlockStart(curY);
      this.makeHeader(
        [yearRangeLabel(start)],
        () => this.pageGregYearBlock(-1),
        () => this.pageGregYearBlock(1),
        "PgUp",
        "PgDn"
      );
      this.renderGregYearsGrid(start, curY, curM, curD);
      return;
    }
    this.makeHeader(
      [mBtn, yBtn],
      () => this.shiftGregMonth(-1),
      () => this.shiftGregMonth(1),
      `${L.prevMonth} (PgUp)`,
      `${L.nextMonth} (PgDn)`,
      {
        onPrev: () => this.shiftGregYear(-1),
        onNext: () => this.shiftGregYear(1),
        prevTip: `${L.jumpPrevYear} (Shift+PgUp)`,
        nextTip: `${L.jumpNextYear} (Shift+PgDn)`
      }
    );
    const sub = el("div", "hdp-sub");
    sub.textContent = this.gregHebSubtitle(curY, curM);
    this.root.appendChild(sub);
    this.weekdayRow();
    const grid = el("div", "hdp-grid");
    const first = makeGreg(curY, curM, 1);
    const firstWd = first.getDay();
    const lastDay = makeGreg(curY, curM, 31).getDate();
    const rows = Math.ceil((firstWd + lastDay) / 7);
    const total = rows * 7;
    const today = /* @__PURE__ */ new Date();
    for (let i = 0; i < total; i++) {
      const dayNum = i - firstWd + 1;
      const inMonth = dayNum >= 1 && dayNum <= lastDay;
      if (!inMonth && !this.opt.outsideDays) {
        grid.appendChild(el("div", "hdp-cell is-blank"));
        continue;
      }
      const date = new Date(first);
      date.setDate(dayNum);
      const iso = toISO(date);
      const cell = el("button", "hdp-cell");
      cell.type = "button";
      if (!inMonth) cell.classList.add("is-outside");
      if (inMonth && this.opt.markSelected !== false && dayNum === curD) cell.classList.add("is-selected");
      if (sameDay(today, date)) cell.classList.add("is-today");
      if (this.isDisabled(iso)) cell.classList.add("is-disabled");
      cell.innerHTML = `<span class="hdp-num">${date.getDate()}</span><span class="hdp-gem-sm">${hebDayGematria(gregToHebParts(date).day)}</span>`;
      this.decorateDayCell(cell, date);
      this.wireDay(cell, iso);
      cell.onclick = (e) => {
        e.stopPropagation();
        if (this.isDisabled(iso)) return;
        this.activate(iso, () => {
          this.greg = date;
          this.heb = { ...gregToHebParts(date) };
          this.render();
          this.commit();
        });
      };
      grid.appendChild(cell);
    }
    this.root.appendChild(grid);
    this.preview();
  }
  renderGregMonthsGrid(curY, curM, curD) {
    const grid = el("div", "hdp-mygrid hdp-mygrid-m");
    gregMonthNames().forEach((n, i) => {
      const c = el("button", "hdp-mycell" + (i === curM ? " is-selected" : ""));
      c.type = "button";
      c.textContent = n;
      c.onclick = (e) => {
        e.stopPropagation();
        this.greg = clampToMin(makeGreg(curY, i, curD));
        this.heb = { ...gregToHebParts(this.greg) };
        if (this.opt.precision === "month") {
          this.commit();
        } else {
          this.gridView = null;
          this.render();
        }
      };
      grid.appendChild(c);
    });
    this.root.appendChild(grid);
    this.preview();
  }
  renderGregYearsGrid(start, selY, curM, curD) {
    const grid = el("div", "hdp-mygrid hdp-mygrid-y");
    const minYear = MIN_DATE.getFullYear();
    for (let y = start; y <= start + YEAR_BLOCK - 1; y++) {
      const c = el("button", "hdp-mycell" + (y === selY ? " is-selected" : ""));
      c.type = "button";
      c.textContent = String(y);
      if (y < minYear) {
        c.classList.add("is-disabled");
        c.disabled = true;
        grid.appendChild(c);
        continue;
      }
      c.onclick = (e) => {
        e.stopPropagation();
        this.greg = clampToMin(makeGreg(y, curM, curD));
        this.heb = { ...gregToHebParts(this.greg) };
        if (this.opt.precision === "year") {
          this.render();
          this.commit();
        } else {
          this.gridView = "months";
          this.yearBlockStart = null;
          this.render();
        }
      };
      grid.appendChild(c);
    }
    this.root.appendChild(grid);
    this.preview();
  }
  gregHebSubtitle(curY, curM) {
    const start = gregToHebParts(makeGreg(curY, curM, 1));
    const end = gregToHebParts(makeGreg(curY, curM, 31));
    const sName = getMonthsForYear(start.year).find((m) => m.num === start.month);
    const eName = getMonthsForYear(end.year).find((m) => m.num === end.month);
    if (!sName || !eName) return "";
    if (start.year === end.year && start.month === end.month) {
      return `${sName.name} ${hebYearGematriaFull(start.year)}`;
    }
    return `${sName.name} \u2013 ${eName.name} ${hebYearGematriaFull(end.year)}`;
  }
  shiftGregMonth(delta) {
    const raw = this.greg.getMonth() + delta;
    const ny = this.greg.getFullYear() + Math.floor(raw / 12);
    const nm = (raw % 12 + 12) % 12;
    this.greg = clampToMin(makeGreg(ny, nm, this.greg.getDate()));
    this.heb = { ...gregToHebParts(this.greg) };
    this.render();
  }
  shiftGregYear(delta) {
    this.greg = clampToMin(
      makeGreg(this.greg.getFullYear() + delta, this.greg.getMonth(), this.greg.getDate())
    );
    this.heb = { ...gregToHebParts(this.greg) };
    this.render();
  }
  /** Resolve the 20-year block start for the years grid (aligned to YEAR_BLOCK). */
  gregBlockStart(selY) {
    if (this.yearBlockStart === null) this.yearBlockStart = Math.floor(selY / YEAR_BLOCK) * YEAR_BLOCK;
    return this.yearBlockStart;
  }
  /** Page the visible 20-year block (and move the selection with it), never
   * paging past the block that holds the Hebrew-epoch floor. */
  pageGregYearBlock(dir) {
    const minBlock = Math.floor(MIN_DATE.getFullYear() / YEAR_BLOCK) * YEAR_BLOCK;
    const next = this.gregBlockStart(this.greg.getFullYear()) + dir * YEAR_BLOCK;
    if (next < minBlock) return;
    this.yearBlockStart = next;
    this.shiftGregYear(dir * YEAR_BLOCK);
  }
  // ----- Hebrew -----
  renderHeb() {
    const L = this.opt.labels;
    let months = getMonthsForYear(this.heb.year);
    if (months.length === 0) {
      this.heb = { ...gregToHebParts(/* @__PURE__ */ new Date()) };
      this.greg = /* @__PURE__ */ new Date();
      months = getMonthsForYear(this.heb.year);
    }
    const curMonth = months.find((m) => m.num === this.heb.month) || months[0];
    this.heb.month = curMonth.num;
    const mBtn = pill(curMonth.name, L.pickMonth, () => {
      this.gridView = "months";
      this.render();
    });
    const yBtn = pill(hebYearGematria(this.heb.year), L.pickYear, () => {
      this.gridView = "years";
      this.yearBlockStart = null;
      this.render();
    });
    if (this.gridView === "months") {
      this.makeHeader(
        [pill(hebYearGematria(this.heb.year), L.pickYear, () => {
          this.gridView = "years";
          this.yearBlockStart = null;
          this.render();
        })],
        () => this.shiftHebYear(-1),
        () => this.shiftHebYear(1),
        `${L.prevYear} - ${hebYearGematria(this.heb.year - 1)} (PgUp)`,
        `${L.nextYear} - ${hebYearGematria(this.heb.year + 1)} (PgDn)`
      );
      this.renderHebMonthsGrid();
      return;
    }
    if (this.gridView === "years") {
      const start = this.hebBlockStart(this.heb.year);
      this.makeHeader(
        [yearRangeLabelHeb(start)],
        () => this.pageHebYearBlock(-1),
        () => this.pageHebYearBlock(1),
        "PgUp",
        "PgDn"
      );
      this.renderHebYearsGrid(start);
      return;
    }
    const prevInfo = this.neighborHebMonth(-1);
    const nextInfo = this.neighborHebMonth(1);
    this.makeHeader(
      [mBtn, yBtn],
      () => this.shiftHebMonth(-1),
      () => this.shiftHebMonth(1),
      `${L.prevMonth} - ${prevInfo.name} (PgUp)`,
      `${L.nextMonth} - ${nextInfo.name} (PgDn)`,
      {
        onPrev: () => this.hebYearJump(-1),
        onNext: () => this.hebYearJump(1),
        prevTip: `${L.jumpPrevYear} - ${hebYearGematria(this.heb.year - 1)} (Shift+PgUp)`,
        nextTip: `${L.jumpNextYear} - ${hebYearGematria(this.heb.year + 1)} (Shift+PgDn)`
      }
    );
    const sub = el("div", "hdp-sub");
    sub.textContent = this.hebGregSubtitle(curMonth);
    this.root.appendChild(sub);
    this.weekdayRow();
    const grid = el("div", "hdp-grid");
    const firstGreg = hebToGreg(this.heb.year, this.heb.month, 1);
    const firstWd = firstGreg ? firstGreg.getDay() : 0;
    const base = firstGreg ? new Date(firstGreg.getFullYear(), firstGreg.getMonth(), firstGreg.getDate()) : /* @__PURE__ */ new Date();
    const rows = Math.ceil((firstWd + curMonth.days) / 7);
    const total = rows * 7;
    const todayHeb = gregToHebParts(/* @__PURE__ */ new Date());
    for (let i = 0; i < total; i++) {
      const offset = i - firstWd;
      const gr = new Date(base.getFullYear(), base.getMonth(), base.getDate() + offset);
      const parts = gregToHebParts(gr);
      const inMonth = parts.year === this.heb.year && parts.month === this.heb.month;
      if (!inMonth && !this.opt.outsideDays) {
        grid.appendChild(el("div", "hdp-cell is-blank"));
        continue;
      }
      const iso = toISO(gr);
      const cell = el("button", "hdp-cell");
      cell.type = "button";
      if (!inMonth) cell.classList.add("is-outside");
      if (inMonth && this.opt.markSelected !== false && parts.day === this.heb.day) {
        cell.classList.add("is-selected");
      }
      if (todayHeb.year === parts.year && todayHeb.month === parts.month && todayHeb.day === parts.day) {
        cell.classList.add("is-today");
      }
      if (this.isDisabled(iso)) cell.classList.add("is-disabled");
      cell.innerHTML = `<span class="hdp-gem">${hebDayGematria(parts.day)}</span><span class="hdp-num">${gr.getDate()}</span>`;
      this.decorateDayCell(cell, gr);
      this.wireDay(cell, iso);
      cell.onclick = (e) => {
        e.stopPropagation();
        if (this.isDisabled(iso)) return;
        this.activate(iso, () => {
          this.heb = { ...parts };
          this.greg = gr;
          this.render();
          this.commit();
        });
      };
      grid.appendChild(cell);
    }
    this.root.appendChild(grid);
    this.preview();
  }
  renderHebMonthsGrid() {
    const months = getMonthsForYear(this.heb.year);
    const grid = el("div", "hdp-mygrid hdp-mygrid-m");
    months.forEach((m) => {
      const c = el("button", "hdp-mycell" + (m.num === this.heb.month ? " is-selected" : ""));
      c.type = "button";
      c.textContent = m.name;
      c.onclick = (e) => {
        e.stopPropagation();
        this.heb.month = m.num;
        if (this.heb.day > m.days) this.heb.day = m.days;
        const gr = hebToGreg(this.heb.year, this.heb.month, this.heb.day);
        if (gr) this.greg = gr;
        if (this.opt.precision === "month") {
          this.commit();
        } else {
          this.gridView = null;
          this.render();
        }
      };
      grid.appendChild(c);
    });
    this.root.appendChild(grid);
    this.preview();
  }
  renderHebYearsGrid(start) {
    const grid = el("div", "hdp-mygrid hdp-mygrid-y");
    for (let y = start; y <= start + YEAR_BLOCK - 1; y++) {
      const c = el("button", "hdp-mycell" + (y === this.heb.year ? " is-selected" : ""));
      c.type = "button";
      c.textContent = hebYearGematria(y);
      if (y < 1) {
        c.classList.add("is-disabled");
        c.disabled = true;
        grid.appendChild(c);
        continue;
      }
      c.onclick = (e) => {
        e.stopPropagation();
        this.heb.year = y;
        const ms = getMonthsForYear(y);
        if (!ms.find((m) => m.num === this.heb.month)) this.heb.month = ms[0].num;
        if (this.opt.precision === "year") {
          const gr = hebToGreg(this.heb.year, ms[0].num, 1);
          if (gr) this.greg = gr;
          this.render();
          this.commit();
        } else {
          this.gridView = "months";
          this.yearBlockStart = null;
          this.render();
        }
      };
      grid.appendChild(c);
    }
    this.root.appendChild(grid);
    this.preview();
  }
  hebBlockStart(selY) {
    if (this.yearBlockStart === null) this.yearBlockStart = Math.floor(selY / YEAR_BLOCK) * YEAR_BLOCK;
    return this.yearBlockStart;
  }
  pageHebYearBlock(dir) {
    const next = this.hebBlockStart(this.heb.year) + dir * YEAR_BLOCK;
    if (next < 0) return;
    this.yearBlockStart = next;
    this.shiftHebYear(dir * YEAR_BLOCK);
  }
  neighborHebMonth(delta) {
    let yr = this.heb.year;
    let list = getMonthsForYear(yr);
    let idx = list.findIndex((m) => m.num === this.heb.month);
    if (idx < 0) idx = 0;
    idx += delta;
    if (idx < 0) {
      if (yr - 1 < 1) {
        idx = 0;
      } else {
        yr -= 1;
        list = getMonthsForYear(yr);
        idx = list.length - 1;
      }
    } else if (idx >= list.length) {
      yr += 1;
      list = getMonthsForYear(yr);
      idx = 0;
    }
    return { year: yr, month: list[idx].num, name: list[idx].name };
  }
  hebGregSubtitle(curMonth) {
    const gFirst = hebToGreg(this.heb.year, this.heb.month, 1);
    const gLast = hebToGreg(this.heb.year, this.heb.month, curMonth.days);
    if (!gFirst || !gLast) return "";
    const ms = gregMonthNames();
    if (gFirst.getFullYear() === gLast.getFullYear() && gFirst.getMonth() === gLast.getMonth()) {
      return `${ms[gFirst.getMonth()]} ${gFirst.getFullYear()}`;
    }
    return `${ms[gFirst.getMonth()]} \u2013 ${ms[gLast.getMonth()]} ${gLast.getFullYear()}`;
  }
  shiftHebMonth(delta) {
    const n = this.neighborHebMonth(delta);
    this.heb.year = n.year;
    this.heb.month = n.month;
    const cur = getMonthsForYear(n.year).find((m) => m.num === n.month);
    if (this.heb.day > cur.days) this.heb.day = cur.days;
    this.render();
  }
  shiftHebYear(delta) {
    this.heb.year = Math.max(1, this.heb.year + delta);
    const ms = getMonthsForYear(this.heb.year);
    if (!ms.find((m) => m.num === this.heb.month)) this.heb.month = ms[0].num;
    this.render();
  }
  /** Day-view full-year jump (keeps the selected day, clamped to the month). */
  hebYearJump(delta) {
    this.heb.year = Math.max(1, this.heb.year + delta);
    const ms = getMonthsForYear(this.heb.year);
    const cur = ms.find((m) => m.num === this.heb.month) || ms[0];
    this.heb.month = cur.num;
    if (this.heb.day > cur.days) this.heb.day = cur.days;
    const gr = hebToGreg(this.heb.year, this.heb.month, this.heb.day);
    if (gr) this.greg = gr;
    this.render();
  }
  // ===== Preview =====
  preview() {
    let node = this.root.querySelector(".hdp-preview");
    if (!node) {
      node = el("div", "hdp-preview");
      this.root.appendChild(node);
    }
    if (this.opt.type === "gregorian") {
      node.textContent = `${this.opt.labels.hebrewPreview}: ${hebFullString(this.greg)}`;
    } else {
      const g = hebToGreg(this.heb.year, this.heb.month, this.heb.day);
      node.textContent = `${this.opt.labels.gregorianPreview}: ${g ? g.toLocaleDateString(this.opt.locale) : "\u2014"}`;
    }
  }
  keyMonths(e) {
    if (e.key === "PageUp" || e.key === "PageDown") {
      const dir = e.key === "PageUp" ? -1 : 1;
      if (this.opt.type === "gregorian") this.shiftGregYear(dir);
      else this.shiftHebYear(dir);
      return;
    }
    if (this.opt.type === "gregorian") {
      let mi = this.greg.getMonth();
      if (e.key === "ArrowRight") mi -= 1;
      else if (e.key === "ArrowLeft") mi += 1;
      else if (e.key === "ArrowUp") mi -= 3;
      else if (e.key === "ArrowDown") mi += 3;
      else if (e.key === "Home") mi = 0;
      else if (e.key === "End") mi = 11;
      let yy = this.greg.getFullYear();
      while (mi < 0) {
        mi += 12;
        yy -= 1;
      }
      while (mi > 11) {
        mi -= 12;
        yy += 1;
      }
      this.greg = clampToMin(makeGreg(yy, mi, this.greg.getDate()));
      this.heb = { ...gregToHebParts(this.greg) };
    } else {
      const months = getMonthsForYear(this.heb.year);
      let idx = months.findIndex((m) => m.num === this.heb.month);
      if (idx < 0) idx = 0;
      if (e.key === "ArrowRight") idx -= 1;
      else if (e.key === "ArrowLeft") idx += 1;
      else if (e.key === "ArrowUp") idx -= 3;
      else if (e.key === "ArrowDown") idx += 3;
      else if (e.key === "Home") idx = 0;
      else if (e.key === "End") idx = months.length - 1;
      let yy = this.heb.year;
      let list = months;
      while (idx < 0) {
        if (yy - 1 < 1) {
          idx = 0;
          break;
        }
        yy -= 1;
        list = getMonthsForYear(yy);
        idx += list.length;
      }
      while (idx >= list.length) {
        idx -= list.length;
        yy += 1;
        list = getMonthsForYear(yy);
      }
      this.heb.year = yy;
      this.heb.month = list[idx].num;
    }
    this.render();
    this.changed();
  }
  keyYears(e) {
    const greg = this.opt.type === "gregorian";
    const sel2 = greg ? this.greg.getFullYear() : this.heb.year;
    const start = greg ? this.gregBlockStart(sel2) : this.hebBlockStart(sel2);
    const minBlock = greg ? Math.floor(MIN_DATE.getFullYear() / YEAR_BLOCK) * YEAR_BLOCK : 0;
    if (e.key === "PageUp" || e.key === "PageDown") {
      const dir = e.key === "PageUp" ? -1 : 1;
      const next = start + dir * YEAR_BLOCK;
      if (next < minBlock) return;
      this.yearBlockStart = next;
      if (greg) this.shiftGregYear(dir * YEAR_BLOCK);
      else this.shiftHebYear(dir * YEAR_BLOCK);
      this.changed();
      return;
    }
    let dy = 0;
    if (e.key === "ArrowRight") dy = -1;
    else if (e.key === "ArrowLeft") dy = 1;
    else if (e.key === "ArrowUp") dy = -4;
    else if (e.key === "ArrowDown") dy = 4;
    else if (e.key === "Home") dy = start - sel2;
    else if (e.key === "End") dy = start + YEAR_BLOCK - 1 - sel2;
    const newSel = sel2 + dy;
    let bs = start;
    while (newSel < bs) bs -= YEAR_BLOCK;
    while (newSel > bs + YEAR_BLOCK - 1) bs += YEAR_BLOCK;
    this.yearBlockStart = Math.max(minBlock, bs);
    if (greg) this.shiftGregYear(dy);
    else this.shiftHebYear(dy);
    this.changed();
  }
};
var tipEl = null;
function ensureTip() {
  if (!tipEl) {
    tipEl = document.createElement("div");
    tipEl.className = "hdp-tip";
    tipEl.setAttribute("role", "tooltip");
    document.body.appendChild(tipEl);
  }
  return tipEl;
}
function hideTip() {
  if (tipEl) tipEl.classList.remove("is-visible");
}
function removeTip() {
  if (tipEl) {
    tipEl.remove();
    tipEl = null;
  }
}
function attachTip(cell, events) {
  const show = () => {
    const tip = ensureTip();
    tip.innerHTML = "";
    events.forEach((e) => {
      const row = document.createElement("div");
      row.className = "hdp-tip-row hdp-tip-" + e.type;
      if (e.type !== "shabbat") {
        const dot = document.createElement("span");
        dot.className = "hdp-tip-dot";
        row.appendChild(dot);
      }
      const txt = document.createElement("span");
      txt.textContent = e.name;
      row.appendChild(txt);
      tip.appendChild(row);
    });
    tip.classList.add("is-visible");
    const r = cell.getBoundingClientRect();
    const tr = tip.getBoundingClientRect();
    let top = r.top - tr.height - 8;
    if (top < 4) top = r.bottom + 8;
    let left = r.left + r.width / 2 - tr.width / 2;
    left = Math.max(6, Math.min(left, window.innerWidth - tr.width - 6));
    tip.style.top = top + "px";
    tip.style.left = left + "px";
  };
  const hide = () => {
    if (tipEl) tipEl.classList.remove("is-visible");
  };
  cell.addEventListener("mouseenter", show);
  cell.addEventListener("mouseleave", hide);
  cell.addEventListener("focus", show, true);
  cell.addEventListener("blur", hide, true);
}
function el(tag, className) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  return e;
}
function pill(text, tip, onClick) {
  const b = el("button", "hdp-pill");
  b.type = "button";
  b.textContent = text;
  b.title = tip;
  b.onclick = (e) => {
    e.stopPropagation();
    onClick();
  };
  return b;
}
function yearRangeLabel(start) {
  const span = el("div", "hdp-title-text");
  span.textContent = `${start} \u2013 ${start + YEAR_BLOCK - 1}`;
  return span;
}
function yearRangeLabelHeb(start) {
  const span = el("div", "hdp-title-text");
  span.textContent = `${hebYearGematriaFull(Math.max(1, start))} \u2013 ${hebYearGematriaFull(start + YEAR_BLOCK - 1)}`;
  return span;
}
function isLeapGreg(y) {
  return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
}
function makeGreg(y, m, day) {
  const lengths = [31, isLeapGreg(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const d = new Date(2e3, m, Math.min(day, lengths[m]));
  d.setFullYear(y);
  return d;
}
function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// src/core/time-clock.ts
var NS = "http://www.w3.org/2000/svg";
function svg(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  return e;
}
function ce(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}
var SIZE = 220;
var C = SIZE / 2;
var R_OUTER = 90;
var R_INNER = 58;
function buildClockTime(p) {
  const wrap = ce("div", "hdp-clock");
  const withSec = !!p.seconds;
  let mode = "hours";
  const pad3 = (n) => String(n).padStart(2, "0");
  const parse = () => {
    const a = (p.get() || "00:00").split(":").map((n) => parseInt(n, 10));
    return [isNaN(a[0]) ? 0 : a[0], isNaN(a[1]) ? 0 : a[1], isNaN(a[2]) ? 0 : a[2]];
  };
  const store = (h, m, s) => {
    const H = (h % 24 + 24) % 24;
    const M = (m % 60 + 60) % 60;
    const S = (s % 60 + 60) % 60;
    p.set(withSec ? `${pad3(H)}:${pad3(M)}:${pad3(S)}` : `${pad3(H)}:${pad3(M)}`);
    render();
  };
  function numNode(label, angleDeg, radius, active, onPick) {
    const rad = angleDeg * Math.PI / 180;
    const x = C + radius * Math.cos(rad);
    const y = C + radius * Math.sin(rad);
    const g = svg("g", { class: "hdp-clock-num" + (active ? " is-active" : "") });
    g.setAttribute("tabindex", "-1");
    const circ = svg("circle", { cx: x, cy: y, r: 15, class: "hdp-clock-numbg" });
    const txt = svg("text", {
      x,
      y,
      "text-anchor": "middle",
      "dominant-baseline": "central",
      class: "hdp-clock-txt"
    });
    txt.textContent = label;
    g.appendChild(circ);
    g.appendChild(txt);
    g.onclick = (e) => {
      e.stopPropagation();
      onPick();
    };
    return g;
  }
  function render() {
    wrap.innerHTML = "";
    const [hh, mm, ss] = parse();
    const dispH = p.is12 ? (hh + 11) % 12 + 1 : hh;
    const ampm = hh < 12 ? "AM" : "PM";
    const head = ce("div", "hdp-clock-head");
    const digit = (text, on, onClick) => {
      const b = ce("button", "hdp-clock-digit" + (on ? " is-active" : ""));
      b.type = "button";
      b.textContent = text;
      b.onclick = (e) => {
        e.stopPropagation();
        onClick();
      };
      return b;
    };
    const colon = () => {
      const c = ce("span", "hdp-clock-colon");
      c.textContent = ":";
      return c;
    };
    head.appendChild(digit(pad3(dispH), mode === "hours", () => {
      mode = "hours";
      render();
    }));
    head.appendChild(colon());
    head.appendChild(digit(pad3(mm), mode === "minutes", () => {
      mode = "minutes";
      render();
    }));
    if (withSec) {
      head.appendChild(colon());
      head.appendChild(digit(pad3(ss), mode === "seconds", () => {
        mode = "seconds";
        render();
      }));
    }
    if (p.is12) {
      const ap = ce("div", "hdp-clock-ampm");
      ["AM", "PM"].forEach((t) => {
        const b = ce("button", "hdp-clock-ap" + (ampm === t ? " is-active" : ""));
        b.type = "button";
        b.textContent = t;
        b.onclick = (e) => {
          e.stopPropagation();
          const base = hh % 12;
          store(t === "PM" ? base + 12 : base, mm, ss);
        };
        ap.appendChild(b);
      });
      head.appendChild(ap);
    }
    wrap.appendChild(head);
    const s = svg("svg", { width: SIZE, height: SIZE, viewBox: `0 0 ${SIZE} ${SIZE}`, class: "hdp-clock-dial" });
    s.appendChild(svg("circle", { cx: C, cy: C, r: C - 4, class: "hdp-clock-face" }));
    s.appendChild(svg("circle", { cx: C, cy: C, r: 3, class: "hdp-clock-center" }));
    let handAngle = null;
    let handR = R_OUTER;
    const hand = svg("line", { x1: C, y1: C, x2: C, y2: C, class: "hdp-clock-hand" });
    s.appendChild(hand);
    const setHand = (angleDeg, r) => {
      handAngle = angleDeg;
      handR = r;
    };
    if (mode === "minutes" || mode === "seconds") {
      s.onclick = (e) => {
        const rect = s.getBoundingClientRect();
        const scale = rect.width ? SIZE / rect.width : 1;
        const x = (e.clientX - rect.left) * scale - C;
        const y = (e.clientY - rect.top) * scale - C;
        let ang = Math.atan2(y, x) * 180 / Math.PI;
        ang = (ang + 90 + 360) % 360;
        const val = Math.round(ang / 6) % 60;
        if (mode === "minutes") store(hh, val, ss);
        else store(hh, mm, val);
      };
    }
    if (mode === "hours") {
      for (let pos = 1; pos <= 12; pos++) {
        const ang = pos * 30 - 90;
        const outActive = p.is12 ? dispH === pos : hh === pos;
        s.appendChild(numNode(String(pos).padStart(2, "0"), ang, R_OUTER, outActive, () => {
          if (p.is12) {
            const base = pos % 12;
            store(ampm === "PM" ? base + 12 : base, mm, ss);
          } else {
            store(pos, mm, ss);
          }
          mode = "minutes";
          render();
        }));
        if (outActive) setHand(ang, R_OUTER);
        if (!p.is12) {
          const innVal = pos === 12 ? 0 : pos + 12;
          const innActive = hh === innVal;
          s.appendChild(numNode(String(innVal).padStart(2, "0"), ang, R_INNER, innActive, () => {
            store(innVal, mm, ss);
            mode = "minutes";
            render();
          }));
          if (innActive) setHand(ang, R_INNER);
        }
      }
    } else {
      const cur = mode === "minutes" ? mm : ss;
      const exactAng = (cur * 6 - 90) * Math.PI / 180;
      s.appendChild(svg("circle", {
        cx: C + R_OUTER * Math.cos(exactAng),
        cy: C + R_OUTER * Math.sin(exactAng),
        r: 16,
        class: "hdp-clock-sel"
      }));
      const nearest = Math.round(cur / 5) * 5 % 60;
      const d = Math.abs(cur - nearest);
      const covered = Math.min(d, 60 - d) <= 2;
      for (let pos = 0; pos < 12; pos++) {
        const v = pos * 5;
        const ang = pos * 30 - 90;
        const onValue = mode === "minutes" ? (vv) => store(hh, vv, ss) : (vv) => store(hh, mm, vv);
        s.appendChild(numNode(String(v).padStart(2, "0"), ang, R_OUTER, v === nearest && covered, () => onValue(v)));
      }
      setHand(cur * 6 - 90, R_OUTER);
    }
    if (handAngle !== null) {
      const rad = handAngle * Math.PI / 180;
      hand.setAttribute("x2", String(C + handR * Math.cos(rad)));
      hand.setAttribute("y2", String(C + handR * Math.sin(rad)));
    }
    wrap.appendChild(s);
    if (mode !== "hours") {
      const fine = ce("div", "hdp-clock-fine");
      const cur = mode === "minutes" ? mm : ss;
      const apply = (v) => mode === "minutes" ? store(hh, v, ss) : store(hh, mm, v);
      const minus = ce("button", "hdp-clock-fine-btn");
      minus.type = "button";
      minus.textContent = "\u2212";
      minus.onclick = (e) => {
        e.stopPropagation();
        apply(cur - 1);
      };
      const val = ce("input", "hdp-clock-fine-val");
      val.type = "text";
      val.inputMode = "numeric";
      val.value = pad3(cur);
      val.onclick = (e) => e.stopPropagation();
      val.onchange = (e) => {
        e.stopPropagation();
        let n = parseInt(e.target.value, 10);
        if (isNaN(n)) n = 0;
        apply((n % 60 + 60) % 60);
      };
      const plus = ce("button", "hdp-clock-fine-btn");
      plus.type = "button";
      plus.textContent = "+";
      plus.onclick = (e) => {
        e.stopPropagation();
        apply(cur + 1);
      };
      const lbl = ce("span", "hdp-clock-fine-label");
      lbl.textContent = mode === "minutes" ? "min" : "sec";
      fine.appendChild(minus);
      fine.appendChild(val);
      fine.appendChild(plus);
      fine.appendChild(lbl);
      wrap.appendChild(fine);
    }
  }
  render();
  return wrap;
}

// src/core/picker.ts
function onPrimaryColor(color) {
  try {
    if (typeof document === "undefined") return "#ffffff";
    const probe = document.createElement("span");
    probe.style.color = color;
    document.body.appendChild(probe);
    const rgb = getComputedStyle(probe).color;
    probe.remove();
    const m = rgb.match(/\d+(\.\d+)?/g);
    if (!m || m.length < 3) return "#ffffff";
    const [r, g, b] = m.map(Number);
    const yiq = (r * 299 + g * 587 + b * 114) / 1e3;
    return yiq >= 150 ? "#111827" : "#ffffff";
  } catch {
    return "#ffffff";
  }
}
var DatePicker = class {
  constructor(options = {}) {
    this.views = [];
    this.startTime = "00:00";
    this.endTime = "00:00";
    this.previewClearTimer = null;
    this.detachers = [];
    /** Which range column the user last interacted with ('start' = leading, 'end' = trailing). */
    this.lastFocusedCol = "start";
    /** The quick-range presets sidebar (range mode, `presets` option). */
    this.presetsEl = null;
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    const g = getGlobalConfig();
    const lang = (_a = options.lang) != null ? _a : g.lang;
    this.lang = lang;
    const isEn = lang === "en";
    const baseLabels = isEn ? DEFAULT_LABELS_EN : g.labels;
    const seconds = (_b = options.seconds) != null ? _b : g.seconds;
    this.opt = {
      calendar: (_c = options.calendar) != null ? _c : g.calendar,
      mode: (_d = options.mode) != null ? _d : "single",
      precision: (_e = options.precision) != null ? _e : "day",
      inline: (_f = options.inline) != null ? _f : false,
      min: (_g = options.min) != null ? _g : null,
      max: (_h = options.max) != null ? _h : null,
      highlightShabbat: (_i = options.highlightShabbat) != null ? _i : g.highlightShabbat,
      highlightHolidays: (_j = options.highlightHolidays) != null ? _j : g.highlightHolidays,
      showParasha: (_k = options.showParasha) != null ? _k : g.showParasha,
      showTooltips: (_l = options.showTooltips) != null ? _l : g.showTooltips,
      outsideDays: (_m = options.outsideDays) != null ? _m : g.outsideDays,
      diaspora: (_n = options.diaspora) != null ? _n : g.diaspora,
      time: (_o = options.time) != null ? _o : g.time,
      seconds,
      timeFormat: (_p = options.timeFormat) != null ? _p : g.timeFormat,
      timeStyle: (_q = options.timeStyle) != null ? _q : g.timeStyle,
      rounded: (_r = options.rounded) != null ? _r : g.rounded,
      headerBorder: (_s = options.headerBorder) != null ? _s : g.headerBorder,
      primaryColor: (_t = options.primaryColor) != null ? _t : g.primaryColor,
      theme: (_u = options.theme) != null ? _u : "light",
      size: (_v = options.size) != null ? _v : g.size,
      compact: (_w = options.compact) != null ? _w : g.compact,
      closeOnSelect: (_x = options.closeOnSelect) != null ? _x : g.closeOnSelect,
      presets: (_y = options.presets) != null ? _y : false,
      labels: { ...baseLabels, ...options.labels || {} },
      locale: isEn ? "en-US" : g.locale,
      onSelect: options.onSelect,
      onClose: options.onClose
    };
    this.type = this.opt.calendar;
    this.originalValue = (_z = options.value) != null ? _z : null;
    const v = options.value;
    const pad22 = (n) => String(n).padStart(2, "0");
    const defTime = seconds ? "00:00:00" : "00:00";
    const split = (iso) => {
      if (iso && iso.includes("T")) {
        const [d, t] = iso.split("T");
        const parts = (t || "").split(":").map((x) => parseInt(x, 10));
        const h = pad22(parts[0] || 0), m = pad22(parts[1] || 0), s = pad22(parts[2] || 0);
        return [d, seconds ? `${h}:${m}:${s}` : `${h}:${m}`];
      }
      return [iso || "", defTime];
    };
    if (v && typeof v === "object") {
      [this.startISO, this.startTime] = split(v.start || "");
      [this.endISO, this.endTime] = split(v.end || "");
    } else {
      [this.startISO, this.startTime] = split(v || "");
      this.endISO = "";
    }
  }
  // ===== Mounting =====
  /** Render inline into a container element. Returns this. */
  mount(container) {
    this.opt.inline = true;
    this.buildPanel();
    container.appendChild(this.panel);
    this.applyContrast();
    return this;
  }
  /**
   * Set --hdp-on-primary (black/white) from the RESOLVED --hdp-primary, whether
   * it came from the primaryColor option or a stylesheet/theme (e.g. Filament).
   * Runs once the panel is in the DOM so the CSS variable is resolvable.
   */
  applyContrast() {
    if (typeof getComputedStyle === "undefined" || !this.panel) return;
    const primary = getComputedStyle(this.panel).getPropertyValue("--hdp-primary").trim();
    if (primary) this.panel.style.setProperty("--hdp-on-primary", onPrimaryColor(primary));
  }
  /** Open as a popup anchored to `anchor`. Returns this. */
  open(anchor) {
    this.close();
    this.opt.inline = false;
    this.buildPanel();
    document.body.appendChild(this.panel);
    this.applyContrast();
    this.position(anchor);
    const reposition = () => this.position(anchor);
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    this.detachers.push(() => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    });
    const outside = (e) => {
      const t = e.target;
      if (!this.panel.contains(t) && t !== anchor && !anchor.contains(t)) this.close();
    };
    const esc = (e) => {
      if (e.key === "Escape") this.close();
    };
    setTimeout(() => {
      document.addEventListener("mousedown", outside, true);
      document.addEventListener("keydown", esc);
    }, 0);
    this.detachers.push(() => {
      document.removeEventListener("mousedown", outside, true);
      document.removeEventListener("keydown", esc);
    });
    if (this.views[0]) this.views[0].focus();
    return this;
  }
  /** Close a popup / tear down. */
  close() {
    if (this.previewClearTimer !== null) {
      clearTimeout(this.previewClearTimer);
      this.previewClearTimer = null;
    }
    this.detachers.forEach((d) => d());
    this.detachers = [];
    this.views.forEach((v) => v.destroy());
    this.views = [];
    removeTip();
    if (this.panel && this.panel.parentElement && !this.opt.inline) {
      this.panel.remove();
    }
    if (this.opt.onClose) this.opt.onClose();
  }
  /** Remove everything (inline or popup). */
  destroy() {
    if (this.previewClearTimer !== null) {
      clearTimeout(this.previewClearTimer);
      this.previewClearTimer = null;
    }
    this.detachers.forEach((d) => d());
    this.detachers = [];
    this.views.forEach((v) => v.destroy());
    this.views = [];
    removeTip();
    if (this.panel) this.panel.remove();
  }
  /** Switch the UI language at runtime ('he' ⇄ 'en'); flips RTL/LTR and labels. */
  setLang(lang) {
    if (lang === this.lang) return;
    this.lang = lang;
    const isEn = lang === "en";
    const g = getGlobalConfig();
    this.opt.labels = isEn ? { ...DEFAULT_LABELS_EN } : { ...g.labels };
    this.opt.locale = isEn ? "en-US" : g.locale;
    if (this.panel) {
      this.panel.dir = isEn ? "ltr" : "rtl";
      this.panel.classList.toggle("hdp-ltr", isEn);
      this.renderPanel();
    }
  }
  /** Switch the color theme at runtime ('light' | 'dark' | 'auto'). */
  setTheme(theme) {
    if (theme === this.opt.theme) return;
    this.opt.theme = theme;
    if (this.panel) {
      this.panel.classList.toggle("hdp-dark", theme === "dark");
      this.panel.classList.toggle("hdp-theme-auto", theme === "auto");
    }
  }
  getValue() {
    return this.result();
  }
  /**
   * Programmatically set the picker's value while it stays open, WITHOUT
   * reopening or stealing focus (so it can mirror an external input the user is
   * typing into). Accepts an ISO date/datetime, a {start,end} range, or null to
   * clear. Does not emit `onSelect`.
   */
  setValue(value) {
    var _a, _b, _c;
    const datePart = (iso) => iso && iso.includes("T") ? iso.split("T")[0] : iso || "";
    if (value && typeof value === "object") {
      this.startISO = datePart(value.start || "");
      this.endISO = datePart(value.end || "");
    } else {
      this.startISO = datePart(value || "");
      this.endISO = "";
    }
    if (this.opt.mode === "range") {
      (_a = this.views[0]) == null ? void 0 : _a.setValue(this.startISO || null);
      (_b = this.views[this.views.length - 1]) == null ? void 0 : _b.setValue(this.endISO || null);
      this.refreshRange();
    } else {
      (_c = this.views[0]) == null ? void 0 : _c.setValue(this.startISO || null);
    }
  }
  // ===== Build =====
  buildPanel() {
    this.panel = document.createElement("div");
    const ltr = this.lang === "en";
    this.panel.className = "hdp" + (this.opt.inline ? " hdp-inline" : " hdp-popup") + " hdp-size-" + this.opt.size + (this.opt.compact ? " hdp-compact" : "") + (this.opt.rounded ? " hdp-rounded" : "") + (this.opt.headerBorder ? "" : " hdp-head-plain") + (this.opt.theme === "dark" ? " hdp-dark" : "") + (this.opt.theme === "auto" ? " hdp-theme-auto" : "") + (ltr ? " hdp-ltr" : "");
    this.panel.dir = ltr ? "ltr" : "rtl";
    if (this.opt.primaryColor) {
      this.panel.style.setProperty("--hdp-primary", this.opt.primaryColor);
      this.panel.style.setProperty(
        "--hdp-primary-soft",
        `color-mix(in srgb, ${this.opt.primaryColor} 14%, transparent)`
      );
      this.panel.style.setProperty("--hdp-on-primary", onPrimaryColor(this.opt.primaryColor));
    }
    this.renderPanel();
  }
  renderPanel() {
    this.panel.innerHTML = "";
    this.views.forEach((v) => v.destroy());
    this.views = [];
    const tabs = document.createElement("div");
    tabs.className = "hdp-tabs";
    const order = this.opt.calendar === "hebrew" ? ["hebrew", "gregorian"] : ["gregorian", "hebrew"];
    order.forEach((t) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hdp-tab" + (this.type === t ? " is-active" : "");
      b.textContent = t === "gregorian" ? this.opt.labels.gregorianTab : this.opt.labels.hebrewTab;
      b.onclick = (e) => {
        e.stopPropagation();
        this.type = t;
        this.renderPanel();
      };
      tabs.appendChild(b);
    });
    this.panel.appendChild(tabs);
    const body = document.createElement("div");
    body.className = "hdp-body" + (this.opt.mode === "range" ? " hdp-range" : "");
    this.panel.appendChild(body);
    this.presetsEl = null;
    if (this.opt.mode === "range") {
      if (this.opt.presets) body.appendChild(this.buildPresets());
      body.appendChild(this.buildRangeColumn("start"));
      body.appendChild(this.buildRangeColumn("end"));
    } else {
      const col = document.createElement("div");
      col.className = "hdp-col";
      const grid = document.createElement("div");
      col.appendChild(grid);
      this.views.push(this.makeView(grid, this.startISO, (iso) => {
        this.startISO = iso;
        if (!this.opt.time && this.opt.closeOnSelect) this.commitClose();
        else this.emit();
      }, {
        // Double-clicking a day always picks it and closes — even when
        // closeOnSelect is false or a time picker is shown.
        onDblPick: (iso) => this.onSingleDbl(iso)
      }));
      if (this.opt.time) {
        col.appendChild(
          this.buildTimeControl(() => this.startTime, (t) => {
            this.startTime = t;
            this.emit();
          })
        );
      }
      body.appendChild(col);
    }
    this.panel.appendChild(this.buildActions());
  }
  // ===== Quick-range presets (range mode) =====
  /** Resolve the preset list (custom array or the built-ins) to static ranges,
   * evaluated against the ACTIVE calendar tab. */
  resolvedPresets() {
    const list = Array.isArray(this.opt.presets) ? this.opt.presets : builtinPresets(this.opt.labels);
    return list.map((p) => {
      const r = typeof p.range === "function" ? p.range(this.type) : p.range;
      return { label: p.label, start: r.start, end: r.end };
    });
  }
  buildPresets() {
    const wrap = ce2("div", "hdp-presets");
    this.resolvedPresets().forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hdp-preset";
      b.textContent = p.label;
      b.dataset.start = p.start;
      b.dataset.end = p.end;
      if (this.opt.showTooltips) b.title = `${p.start} \u2190 ${p.end}`;
      b.onclick = (e) => {
        e.stopPropagation();
        this.applyPreset(p.start, p.end);
      };
      wrap.appendChild(b);
    });
    const custom = document.createElement("button");
    custom.type = "button";
    custom.className = "hdp-preset hdp-preset-custom";
    custom.textContent = this.opt.labels.presetCustom;
    custom.onclick = (e) => {
      var _a;
      e.stopPropagation();
      (_a = this.views[0]) == null ? void 0 : _a.focus();
    };
    wrap.appendChild(custom);
    this.presetsEl = wrap;
    this.updatePresetActive();
    return wrap;
  }
  applyPreset(start, end) {
    var _a, _b;
    this.startISO = start;
    this.endISO = end;
    (_a = this.views[0]) == null ? void 0 : _a.setValue(start);
    (_b = this.views[this.views.length - 1]) == null ? void 0 : _b.setValue(end);
    this.refreshRange();
    this.emit();
    if (!this.opt.time && this.opt.closeOnSelect && !this.opt.inline) this.close();
  }
  /** Highlight the preset matching the committed range (or "custom" when none). */
  updatePresetActive() {
    var _a;
    if (!this.presetsEl) return;
    const complete = !!this.startISO && !!this.endISO;
    const [a, b] = complete ? this.sortedRange() : ["", ""];
    let matched = false;
    this.presetsEl.querySelectorAll(".hdp-preset").forEach((item) => {
      if (item.classList.contains("hdp-preset-custom")) return;
      const on = complete && item.dataset.start === a && item.dataset.end === b;
      item.classList.toggle("is-active", on);
      if (on) matched = true;
    });
    (_a = this.presetsEl.querySelector(".hdp-preset-custom")) == null ? void 0 : _a.classList.toggle("is-active", complete && !matched);
  }
  buildRangeColumn(which) {
    const col = document.createElement("div");
    col.className = "hdp-col";
    const track = () => {
      this.lastFocusedCol = which;
    };
    col.addEventListener("mousedown", track, true);
    col.addEventListener("focusin", track);
    const label = document.createElement("div");
    label.className = "hdp-col-label";
    label.textContent = which === "start" ? this.opt.labels.rangeStart : this.opt.labels.rangeEnd;
    col.appendChild(label);
    const grid = document.createElement("div");
    col.appendChild(grid);
    const initial = which === "start" ? this.startISO || null : this.endISO || this.nextMonthISO(this.startISO);
    const [lo, hi] = this.rangeForDisplay();
    this.views.push(
      this.makeView(grid, initial || "", (iso) => this.onRangeClick(iso, which), {
        rangeStart: lo,
        rangeEnd: hi,
        onDblPick: (iso) => this.onRangeDbl(iso),
        markSelected: false,
        // Mirror the hover preview across BOTH calendars (not just the one the
        // pointer is over): hovering a day in either grid highlights the whole
        // prospective range in both.
        onHover: (iso) => this.previewAll(iso),
        onHoverEnd: () => this.scheduleClearPreview()
      })
    );
    if (this.opt.time) {
      const getT = which === "start" ? () => this.startTime : () => this.endTime;
      const setT = which === "start" ? (t) => {
        this.startTime = t;
        this.emit();
      } : (t) => {
        this.endTime = t;
        this.emit();
      };
      col.appendChild(this.buildTimeControl(getT, setT));
    }
    return col;
  }
  // Range selection has two phases:
  //  1) BEFORE a full range exists — a click *sequence*: the first click sets
  //     the start, the second sets the end. This works within a single calendar
  //     (click day A then day B in the same grid) or across both.
  //  2) AFTER a full range exists — *column-aware* adjustment: a click in the
  //     start calendar moves the START (keeping the end), a click in the end
  //     calendar moves the END (keeping the start). So clicking inside an
  //     existing range shrinks it from that side instead of wiping it.
  // Endpoints are normalised so start ≤ end.
  onRangeClick(iso, which) {
    const complete = !!this.startISO && !!this.endISO;
    if (!complete) {
      if (!this.startISO) this.startISO = iso;
      else this.endISO = iso;
    } else if (which === "start") {
      this.startISO = iso;
    } else {
      this.endISO = iso;
    }
    if (this.startISO && this.endISO && compareISO(this.startISO, this.endISO) > 0) {
      const t = this.startISO;
      this.startISO = this.endISO;
      this.endISO = t;
    }
    this.refreshRange();
    this.emit();
    if (this.startISO && this.endISO && !this.opt.time && this.opt.closeOnSelect) {
      this.commitClose();
    }
  }
  onRangeDbl(iso) {
    this.startISO = iso;
    this.endISO = iso;
    this.refreshRange();
    this.emit();
    if (!this.opt.inline) this.close();
  }
  // Single mode: double-clicking a day picks it and closes the popup, even when
  // closeOnSelect is false or a time picker is shown.
  onSingleDbl(iso) {
    this.startISO = iso;
    this.emit();
    if (!this.opt.inline) this.close();
  }
  // For highlighting: when only one endpoint is chosen, that endpoint is the
  // range start and the end is null (so the views know we're mid-pick and can
  // show the hover preview). When both are set, return them sorted.
  rangeForDisplay() {
    if (this.startISO && this.endISO) {
      const [a, b] = this.sortedRange();
      return [a, b];
    }
    return [this.startISO || this.endISO || null, null];
  }
  refreshRange() {
    const [lo, hi] = this.rangeForDisplay();
    this.views.forEach((v) => v.setRange(lo, hi));
    this.updateRangeHint();
    this.updatePresetActive();
  }
  // Show the prospective range (start → hovered) on BOTH calendars while the
  // pointer is over either grid (mid-pick: a start is chosen, no end yet).
  previewAll(iso) {
    if (this.previewClearTimer !== null) {
      clearTimeout(this.previewClearTimer);
      this.previewClearTimer = null;
    }
    const bothSet = !!this.startISO && !!this.endISO;
    const anchor = this.startISO || this.endISO;
    if (anchor && !bothSet) {
      this.views.forEach((v) => v.previewFrom(anchor, iso));
    }
  }
  // Defer the clear so moving the pointer from one calendar to the other (which
  // fires mouseleave then mouseenter) doesn't flash the highlight off.
  scheduleClearPreview() {
    if (this.previewClearTimer !== null) clearTimeout(this.previewClearTimer);
    this.previewClearTimer = setTimeout(() => {
      this.views.forEach((v) => v.clearPreviewPublic());
      this.previewClearTimer = null;
    }, 60);
  }
  makeView(host, value, onPick, rangeOpts) {
    return new CalendarView(host, {
      type: this.type,
      precision: this.opt.precision,
      labels: this.opt.labels,
      locale: this.opt.locale,
      highlightShabbat: this.opt.highlightShabbat,
      highlightHolidays: this.opt.highlightHolidays,
      showParasha: this.opt.showParasha,
      showTooltips: this.opt.showTooltips,
      outsideDays: this.opt.outsideDays,
      diaspora: this.opt.diaspora,
      min: this.opt.min,
      max: this.opt.max,
      value: value || null,
      onPick,
      ...rangeOpts
    });
  }
  timeStyleNorm() {
    switch (this.opt.timeStyle) {
      case "native":
        return "native";
      case "stepper":
        return "stepper";
      case "clock":
      case "mobile":
        return "clock";
      default:
        return "dropdown";
    }
  }
  // Time picker control (per column). Styles: native | dropdown | stepper | clock.
  buildTimeControl(get, set) {
    const is12 = this.opt.timeFormat === "12";
    const withSec = this.opt.seconds;
    const style = this.timeStyleNorm();
    if (style === "clock") return buildClockTime({ is12, seconds: withSec, get, set });
    if (style === "native") return buildNativeTime(get, set, withSec);
    const wrap = ce2("div", "hdp-time hdp-time-" + style);
    const parse = () => {
      const p = (get() || "").split(":").map((n) => parseInt(n, 10));
      return [isNaN(p[0]) ? 0 : p[0], isNaN(p[1]) ? 0 : p[1], isNaN(p[2]) ? 0 : p[2]];
    };
    const p22 = (n) => String(n).padStart(2, "0");
    const store = (h, m, s) => {
      const H = (h % 24 + 24) % 24;
      const M = (m % 60 + 60) % 60;
      const S = (s % 60 + 60) % 60;
      set(withSec ? `${p22(H)}:${p22(M)}:${p22(S)}` : `${p22(H)}:${p22(M)}`);
      render();
    };
    const colonNode = () => {
      const c = ce2("span", "hdp-time-colon");
      c.textContent = ":";
      return c;
    };
    const render = () => {
      wrap.innerHTML = "";
      const [hh, mm, ss] = parse();
      const dispHour = is12 ? (hh + 11) % 12 + 1 : hh;
      const ampm = hh < 12 ? "AM" : "PM";
      if (style === "stepper") {
        wrap.appendChild(stepper(
          dispHour,
          (delta) => store(hh + delta, mm, ss),
          (v) => store(is12 ? to24(v, ampm) : v, mm, ss),
          is12 ? 1 : 0,
          is12 ? 12 : 23
        ));
        wrap.appendChild(colonNode());
        wrap.appendChild(stepper(mm, (delta) => store(hh, mm + delta, ss), (v) => store(hh, v, ss), 0, 59));
        if (withSec) {
          wrap.appendChild(colonNode());
          wrap.appendChild(stepper(ss, (delta) => store(hh, mm, ss + delta), (v) => store(hh, mm, v), 0, 59));
        }
        if (is12) {
          const t = ce2("button", "hdp-time-ampm");
          t.type = "button";
          t.textContent = ampm;
          t.onclick = (e) => {
            e.stopPropagation();
            store((hh + 12) % 24, mm, ss);
          };
          wrap.appendChild(t);
        }
      } else {
        const hourSel = sel(
          range(is12 ? 1 : 0, is12 ? 12 : 23).map((v) => [String(v).padStart(2, "0"), v]),
          dispHour,
          (v) => store(is12 ? to24(Number(v), ampm) : Number(v), mm, ss)
        );
        const minSel = sel(
          range(0, 59).map((v) => [String(v).padStart(2, "0"), v]),
          mm,
          (v) => store(hh, Number(v), ss)
        );
        wrap.appendChild(hourSel);
        wrap.appendChild(colonNode());
        wrap.appendChild(minSel);
        if (withSec) {
          wrap.appendChild(colonNode());
          wrap.appendChild(sel(
            range(0, 59).map((v) => [String(v).padStart(2, "0"), v]),
            ss,
            (v) => store(hh, mm, Number(v))
          ));
        }
        if (is12) {
          wrap.appendChild(sel([["AM", "AM"], ["PM", "PM"]], ampm, (v) => {
            store(to24(dispHour, String(v)), mm, ss);
          }));
        }
      }
    };
    render();
    return wrap;
  }
  buildActions() {
    const actions = document.createElement("div");
    actions.className = "hdp-actions";
    const L = this.opt.labels;
    const clear = btn("hdp-btn hdp-btn-ghost", L.clear, () => {
      this.startISO = "";
      this.endISO = "";
      this.refreshRange();
      if (this.opt.onSelect) this.opt.onSelect(this.result());
      if (!this.opt.inline) this.close();
    });
    const today = btn("hdp-btn hdp-btn-ghost", L.today, () => {
      var _a, _b;
      const iso = toISO(/* @__PURE__ */ new Date());
      if (this.opt.mode === "range") {
        const complete = !!this.startISO && !!this.endISO;
        const which = !complete ? this.startISO ? "end" : "start" : this.lastFocusedCol;
        const viewIdx = which === "start" ? 0 : this.views.length - 1;
        (_a = this.views[viewIdx]) == null ? void 0 : _a.setValue(iso);
        this.onRangeClick(iso, which);
      } else {
        this.startISO = iso;
        (_b = this.views[0]) == null ? void 0 : _b.setValue(iso);
        this.emit();
      }
    });
    const ok = btn("hdp-btn hdp-btn-primary", L.confirm, () => this.commitClose());
    if (this.opt.showTooltips) ok.title = `${L.confirm} (Enter)`;
    actions.appendChild(clear);
    actions.appendChild(today);
    const spacer = document.createElement("div");
    spacer.style.flex = "1";
    actions.appendChild(spacer);
    if (this.opt.mode === "range") {
      const hint = document.createElement("div");
      hint.className = "hdp-range-hint";
      actions.appendChild(hint);
    }
    actions.appendChild(ok);
    return actions;
  }
  updateRangeHint() {
    const hint = this.panel.querySelector(".hdp-range-hint");
    if (!hint) return;
    if (this.startISO && this.endISO) {
      const [a, b] = this.sortedRange();
      hint.textContent = `${a} \u2190 ${b}`;
    } else {
      hint.textContent = "";
    }
  }
  sortedRange() {
    if (compareISO(this.startISO, this.endISO) <= 0) return [this.startISO, this.endISO];
    return [this.endISO, this.startISO];
  }
  combine(date, time) {
    if (!date) return "";
    return this.opt.time ? `${date}T${time}` : date;
  }
  result() {
    if (this.opt.mode === "range") {
      let aDT = this.combine(this.startISO, this.startTime);
      let bDT = this.combine(this.endISO, this.endTime);
      if (aDT && bDT && compareISO(aDT, bDT) > 0) {
        const t = aDT;
        aDT = bDT;
        bDT = t;
      }
      return { start: aDT, end: bDT, type: this.type };
    }
    return { iso: this.combine(this.startISO, this.startTime), type: this.type };
  }
  emit() {
    if (this.opt.onSelect) this.opt.onSelect(this.result());
  }
  commitClose() {
    this.emit();
    if (!this.opt.inline) this.close();
  }
  nextMonthISO(base) {
    const d = base ? new Date(base) : /* @__PURE__ */ new Date();
    const day = d.getDate();
    const nd = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    const lastD = new Date(nd.getFullYear(), nd.getMonth() + 1, 0).getDate();
    nd.setDate(Math.min(day, lastD));
    return toISO(nd);
  }
  // ===== Popup positioning =====
  position(anchor) {
    const r = anchor.getBoundingClientRect();
    const pw = this.panel.offsetWidth;
    const ph = this.panel.offsetHeight;
    let top = r.bottom + 6;
    let left = r.left;
    if (r.bottom + ph > window.innerHeight - 10) top = Math.max(8, r.top - ph - 6);
    const maxTop = Math.max(8, window.innerHeight - ph - 8);
    top = Math.max(8, Math.min(top, maxTop));
    if (left + pw > window.innerWidth - 10) left = Math.max(8, window.innerWidth - pw - 10);
    if (left < 8) left = 8;
    this.panel.style.position = "fixed";
    this.panel.style.top = top + "px";
    this.panel.style.left = left + "px";
  }
  /** Suppress unused-warning for stored original value (kept for re-init). */
  _origin() {
    return this.originalValue;
  }
};
function startOfToday() {
  const n = /* @__PURE__ */ new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function shiftDays(d, n) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}
function hebMonthInYear(year, month) {
  const ms = getMonthsForYear(year);
  return ms.find((m) => m.num === month) || (month.startsWith("Adar") ? ms.find((m) => m.num.startsWith("Adar")) : void 0) || ms[0];
}
function hebSameDayLastYear() {
  const t = startOfToday();
  const p = gregToHebParts(t);
  if (p.year - 1 < 1) return t;
  const m = hebMonthInYear(p.year - 1, p.month);
  return hebToGreg(p.year - 1, m.num, p.day) || t;
}
function hebSameDayLastMonth() {
  const t = startOfToday();
  const p = gregToHebParts(t);
  let year = p.year;
  let ms = getMonthsForYear(year);
  let idx = ms.findIndex((m) => m.num === p.month);
  if (idx < 0) idx = 0;
  idx -= 1;
  if (idx < 0) {
    if (year - 1 < 1) return t;
    year -= 1;
    ms = getMonthsForYear(year);
    idx = ms.length - 1;
  }
  return hebToGreg(year, ms[idx].num, p.day) || t;
}
function gregSameDayLastMonth() {
  const t = startOfToday();
  const lastD = new Date(t.getFullYear(), t.getMonth(), 0).getDate();
  return new Date(t.getFullYear(), t.getMonth() - 1, Math.min(t.getDate(), lastD));
}
function gregSameDayLastYear() {
  const t = startOfToday();
  const y = t.getFullYear() - 1;
  const lastD = new Date(y, t.getMonth() + 1, 0).getDate();
  return new Date(y, t.getMonth(), Math.min(t.getDate(), lastD));
}
function hebLastMonthSpan() {
  const p = gregToHebParts(startOfToday());
  let year = p.year;
  let months = getMonthsForYear(year);
  let idx = months.findIndex((m2) => m2.num === p.month);
  if (idx < 0) idx = 0;
  idx -= 1;
  if (idx < 0) {
    year -= 1;
    months = getMonthsForYear(year);
    idx = months.length - 1;
  }
  const m = months[idx];
  return { start: toISO(m.firstGreg), end: toISO(shiftDays(m.firstGreg, m.days - 1)) };
}
function hebLastYearSpan() {
  const year = gregToHebParts(startOfToday()).year - 1;
  const months = getMonthsForYear(year);
  const last = months[months.length - 1];
  return {
    start: toISO(months[0].firstGreg),
    end: toISO(shiftDays(last.firstGreg, last.days - 1))
  };
}
function gregLastMonthSpan() {
  const t = startOfToday();
  return {
    start: toISO(new Date(t.getFullYear(), t.getMonth() - 1, 1)),
    end: toISO(new Date(t.getFullYear(), t.getMonth(), 0))
  };
}
function gregLastYearSpan() {
  const y = startOfToday().getFullYear() - 1;
  return { start: toISO(new Date(y, 0, 1)), end: toISO(new Date(y, 11, 31)) };
}
function builtinPresets(L) {
  const rolling = (start) => ({
    start: toISO(start),
    end: toISO(startOfToday())
  });
  return [
    { label: L.presetToday, range: () => {
      const t = toISO(startOfToday());
      return { start: t, end: t };
    } },
    { label: L.presetYesterday, range: () => {
      const y = toISO(shiftDays(startOfToday(), -1));
      return { start: y, end: y };
    } },
    { label: L.presetLast7Days, range: () => rolling(shiftDays(startOfToday(), -6)) },
    { label: L.presetLast30Days, range: () => rolling(shiftDays(startOfToday(), -29)) },
    { label: L.presetThisMonth, range: (cal) => rolling(cal === "hebrew" ? hebSameDayLastMonth() : gregSameDayLastMonth()) },
    { label: L.presetLastMonth, range: (cal) => cal === "hebrew" ? hebLastMonthSpan() : gregLastMonthSpan() },
    { label: L.presetThisYear, range: (cal) => rolling(cal === "hebrew" ? hebSameDayLastYear() : gregSameDayLastYear()) },
    { label: L.presetLastYear, range: (cal) => cal === "hebrew" ? hebLastYearSpan() : gregLastYearSpan() }
  ];
}
function ce2(tag, cls) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  return e;
}
function range(a, b) {
  const out = [];
  for (let i = a; i <= b; i++) out.push(i);
  return out;
}
function to24(displayHour, ampm) {
  const base = displayHour % 12;
  return ampm === "PM" ? base + 12 : base;
}
function sel(options, value, onChange) {
  const s = document.createElement("select");
  s.className = "hdp-time-sel";
  options.forEach(([label, val]) => {
    const o = document.createElement("option");
    o.value = String(val);
    o.textContent = label;
    if (val === value) o.selected = true;
    s.appendChild(o);
  });
  s.onchange = (e) => {
    e.stopPropagation();
    const raw = e.target.value;
    const num = Number(raw);
    onChange(isNaN(num) || raw === "AM" || raw === "PM" ? raw : num);
  };
  s.onclick = (e) => e.stopPropagation();
  return s;
}
function stepper(value, step, setVal, min, max) {
  const col = ce2("div", "hdp-time-spin");
  const up = ce2("button", "hdp-time-step");
  up.type = "button";
  up.textContent = "\u25B2";
  up.onclick = (e) => {
    e.stopPropagation();
    step(1);
  };
  const val = ce2("input", "hdp-time-val");
  val.type = "text";
  val.inputMode = "numeric";
  val.value = String(value).padStart(2, "0");
  val.onclick = (e) => e.stopPropagation();
  val.onchange = (e) => {
    e.stopPropagation();
    let n = parseInt(e.target.value, 10);
    if (isNaN(n)) n = min;
    n = Math.max(min, Math.min(max, n));
    setVal(n);
  };
  const down = ce2("button", "hdp-time-step");
  down.type = "button";
  down.textContent = "\u25BC";
  down.onclick = (e) => {
    e.stopPropagation();
    step(-1);
  };
  col.appendChild(up);
  col.appendChild(val);
  col.appendChild(down);
  return col;
}
function buildNativeTime(get, set, withSec = false) {
  const wrap = ce2("div", "hdp-time hdp-time-native");
  const inp = ce2("input", "hdp-time-input");
  inp.type = "time";
  inp.step = withSec ? "1" : "60";
  const [h, m, s] = (get() || "00:00").split(":");
  const p = (x) => (x || "00").padStart(2, "0");
  inp.value = withSec ? `${p(h)}:${p(m)}:${p(s)}` : `${p(h)}:${p(m)}`;
  inp.onclick = (e) => e.stopPropagation();
  inp.onchange = (e) => {
    e.stopPropagation();
    if (inp.value) set(inp.value);
  };
  wrap.appendChild(inp);
  return wrap;
}
function btn(cls, text, onClick) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = cls;
  b.textContent = text;
  b.onclick = (e) => {
    e.stopPropagation();
    onClick();
  };
  return b;
}

// src/core/date-input.ts
var CAL_ICON = '<svg class="hdp-cal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
var p2 = (n) => String(n).padStart(2, "0");
function maskDate(text) {
  const dg = String(text).replace(/\D/g, "").slice(0, 8);
  let day = dg.slice(0, 2), mon = dg.slice(2, 4);
  const yr = dg.slice(4, 8);
  if (day.length === 2) day = p2(Math.min(31, Math.max(1, +day)));
  if (mon.length === 2) mon = p2(Math.min(12, Math.max(1, +mon)));
  let s = day;
  if (dg.length >= 2) s += "/" + mon;
  if (dg.length >= 4) s += "/" + yr;
  return s;
}
function parseTyped(text) {
  const m = String(text).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return "";
  const d = new Date(+m[3], +m[2] - 1, +m[1]);
  return d.getDate() === +m[1] && d.getMonth() === +m[2] - 1 ? toISO(d) : "";
}
function parseGregFlexible(text) {
  text = String(text).trim();
  let m = text.match(/^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})$/);
  if (m) {
    const d = new Date(+m[3], +m[2] - 1, +m[1]);
    if (d.getDate() === +m[1] && d.getMonth() === +m[2] - 1) return toISO(d);
  }
  m = text.match(/^(\d{4})[/.\-](\d{1,2})[/.\-](\d{1,2})$/);
  if (m) {
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    if (d.getMonth() === +m[2] - 1 && d.getDate() === +m[3]) return toISO(d);
  }
  return "";
}
var DateInput = class {
  constructor(opt = {}) {
    this.picker = null;
    this.isOpen = false;
    var _a, _b, _c;
    this.opt = opt;
    this.value = (_a = opt.value) != null ? _a : null;
    this.isRange = opt.mode === "range";
    const gregDisplay = ((_b = opt.displayCalendar) != null ? _b : getGlobalConfig().displayCalendar) === "gregorian";
    this.editable = gregDisplay && ((_c = opt.precision) != null ? _c : "day") === "day" && !this.isRange;
    this.openByInputClick = !gregDisplay || opt.openOnInputClick !== false;
  }
  mount(host) {
    var _a;
    const wrap = document.createElement("span");
    wrap.className = "hdp-field";
    wrap.innerHTML = CAL_ICON + '<input class="hdp-input" type="text" inputmode="numeric" /><button class="hdp-clear" type="button" tabindex="-1" aria-label="clear">\xD7</button>';
    const icon = wrap.querySelector(".hdp-cal-icon");
    this.input = wrap.querySelector(".hdp-input");
    this.clearBtn = wrap.querySelector(".hdp-clear");
    this.input.readOnly = false;
    this.input.placeholder = (_a = this.opt.placeholder) != null ? _a : "";
    if (this.editable) this.input.dir = "ltr";
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      this.open();
    });
    if (this.openByInputClick) {
      this.input.addEventListener("click", () => this.open());
      this.input.addEventListener("focus", () => this.open());
    }
    this.input.addEventListener("paste", (e) => {
      var _a2;
      const txt = ((_a2 = e.clipboardData || window.clipboardData) == null ? void 0 : _a2.getData("text")) || "";
      const iso = parseGregFlexible(txt);
      if (iso) {
        e.preventDefault();
        this.commit(iso);
        if (this.picker) this.picker.setValue(iso);
      }
    });
    if (this.editable) {
      this.input.addEventListener("input", () => this.onType());
      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const iso = parseTyped(maskDate(this.input.value));
          if (iso) {
            this.commit(iso);
            this.refresh();
            this.close();
          }
        }
      });
      this.input.addEventListener("blur", () => setTimeout(() => this.refresh(), 150));
    } else {
      this.input.addEventListener("keydown", (e) => {
        if (!e.ctrlKey && !e.metaKey && e.key.length === 1) e.preventDefault();
      });
    }
    this.clearBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.commit(null);
      this.refresh();
      this.close();
    });
    host.appendChild(wrap);
    this.wrap = wrap;
    this.refresh();
    return this;
  }
  /** Programmatically set the value (e.g. from a framework model). */
  setValue(v) {
    var _a;
    this.value = v != null ? v : null;
    if (!(this.editable && document.activeElement === this.input)) this.refresh();
    (_a = this.picker) == null ? void 0 : _a.setValue(v != null ? v : null);
  }
  getValue() {
    return this.value;
  }
  destroy() {
    var _a, _b;
    (_a = this.picker) == null ? void 0 : _a.destroy();
    this.picker = null;
    (_b = this.wrap) == null ? void 0 : _b.remove();
  }
  close() {
    var _a;
    (_a = this.picker) == null ? void 0 : _a.close();
  }
  // ---- internals ----
  onType() {
    var _a;
    const caret = (_a = this.input.selectionStart) != null ? _a : this.input.value.length;
    const before = this.input.value;
    const masked = maskDate(before);
    if (masked !== before) {
      const digitsBefore = before.slice(0, caret).replace(/\D/g, "").length;
      this.input.value = masked;
      let idx = 0, seen = 0;
      while (idx < masked.length && seen < digitsBefore) {
        if (/\d/.test(masked[idx])) seen++;
        idx++;
      }
      try {
        this.input.setSelectionRange(idx, idx);
      } catch {
      }
    }
    this.clearBtn.classList.toggle("is-shown", !!this.input.value);
    const iso = parseTyped(this.input.value);
    if (iso) {
      this.commit(iso);
      if (this.picker) this.picker.setValue(iso);
      else this.open();
    }
  }
  commit(v) {
    this.value = v;
    if (this.opt.onSelect) this.opt.onSelect(this.result());
  }
  result() {
    var _a, _b;
    if (this.isRange) {
      const r = this.value && typeof this.value === "object" ? this.value : { start: "", end: "" };
      return { start: r.start, end: r.end, type: (_a = this.opt.calendar) != null ? _a : getGlobalConfig().calendar };
    }
    return { iso: typeof this.value === "string" ? this.value : "", type: (_b = this.opt.calendar) != null ? _b : getGlobalConfig().calendar };
  }
  open() {
    var _a;
    if (this.isOpen) return;
    this.picker = new DatePicker({
      ...this.opt,
      inline: false,
      value: (_a = this.value) != null ? _a : null,
      onClose: () => {
        this.isOpen = false;
      },
      onSelect: (r) => {
        this.value = "iso" in r ? r.iso : { start: r.start, end: r.end };
        if (this.opt.onSelect) this.opt.onSelect(r);
        if (!(this.editable && document.activeElement === this.input)) this.refresh();
      }
    }).open(this.input);
    this.isOpen = true;
  }
  hasValue() {
    if (this.isRange) return !!(this.value && typeof this.value === "object" && (this.value.start || this.value.end));
    return !!this.value;
  }
  fmtOne(iso) {
    var _a, _b;
    if (!iso) return "";
    const d = parseISO(iso.split("T")[0]);
    if (!d) return "";
    const cal = (_a = this.opt.displayCalendar) != null ? _a : getGlobalConfig().displayCalendar;
    const prec = (_b = this.opt.precision) != null ? _b : "day";
    const t = this.opt.time && iso.includes("T") ? " " + iso.split("T")[1].slice(0, this.opt.seconds ? 8 : 5) : "";
    if (prec === "year") return cal === "hebrew" ? hebYearGematriaFull(gregToHebParts(d).year) : String(d.getFullYear());
    if (prec === "month") return cal === "hebrew" ? hebMonthYearLabel(d) : `${p2(d.getMonth() + 1)}/${d.getFullYear()}`;
    if (cal === "hebrew") return hebFullString(d) + t;
    return `${p2(d.getDate())}/${p2(d.getMonth() + 1)}/${d.getFullYear()}` + t;
  }
  refresh() {
    if (this.isRange) {
      const v = this.value && typeof this.value === "object" ? this.value : { start: "", end: "" };
      this.input.value = v.start || v.end ? `${this.fmtOne(v.start)} \u2013 ${this.fmtOne(v.end)}` : "";
    } else {
      this.input.value = this.fmtOne(typeof this.value === "string" ? this.value : "");
    }
    this.clearBtn.classList.toggle("is-shown", this.hasValue());
  }
};

export { CalendarView, DEFAULT_LABELS, DEFAULT_LABELS_EN, DateInput, DatePicker, MIN_DATE, MIN_ISO, buildYear, compareISO, getDayEvents, getGlobalConfig, getHoliday, getMonthsForYear, getParasha, getRoshChodesh, gregMonthNames, gregToHebParts, hebDayGematria, hebFullString, hebMonthName, hebMonthYearLabel, hebToGreg, hebYearGematria, hebYearGematriaFull, isLeapYear, langPreset, parseISO, resetGlobalConfig, setGlobalConfig, toISO };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
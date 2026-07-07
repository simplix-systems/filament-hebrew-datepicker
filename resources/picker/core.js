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
  hebrewPreview: "\u05E2\u05D1\u05E8\u05D9",
  gregorianPreview: "\u05DC\u05D5\u05E2\u05D6\u05D9",
  weekdays: ["\u05D0", "\u05D1", "\u05D2", "\u05D3", "\u05D4", "\u05D5", "\u05E9"]
};
var globalConfig = {
  calendar: "hebrew",
  highlightShabbat: true,
  highlightHolidays: true,
  showParasha: true,
  showTooltips: true,
  diaspora: false,
  displayCalendar: "hebrew",
  time: false,
  timeFormat: "24",
  timeStyle: "normal",
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
    diaspora: false,
    displayCalendar: "hebrew",
    time: false,
    timeFormat: "24",
    timeStyle: "normal",
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
  return hebMonthFmt().format(date);
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
  const to = new Date(baseGreg + 1, 10, 30, 12);
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
function parseISO(s) {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}
function toISO(date) {
  if (!date) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
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
  return a < b ? -1 : 1;
}

// src/core/calendar-view.ts
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
    this.yearOffset = 0;
    // ===== Keyboard =====
    this.onKey = (e) => {
      const arrows = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
      if (e.key === "Enter") {
        e.preventDefault();
        this.commit();
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
        else if (e.key === "PageUp") dt.setMonth(dt.getMonth() - 1);
        else if (e.key === "PageDown") dt.setMonth(dt.getMonth() + 1);
        else if (e.key === "Home") dt = new Date(dt.getFullYear(), dt.getMonth(), 1);
        else if (e.key === "End") dt = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
        this.greg = dt;
        this.heb = { ...gregToHebParts(dt) };
        this.render();
        this.changed();
      } else {
        let gr = hebToGreg(this.heb.year, this.heb.month, this.heb.day);
        if (!gr) return;
        gr = new Date(gr.getFullYear(), gr.getMonth(), gr.getDate());
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
        this.greg = gr;
        this.heb = { ...gregToHebParts(gr) };
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
    this.root.classList.add("hdp-cal");
    this.root.classList.add(opt.type === "hebrew" ? "hdp-cal-hebrew" : "hdp-cal-greg");
    this.root.tabIndex = 0;
    this.root.addEventListener("keydown", this.onKey);
    this.root.addEventListener("mouseleave", () => {
      if (this.opt.rangeStart && !this.opt.rangeEnd) this.clearPreview();
    });
    this.render();
  }
  destroy() {
    this.root.removeEventListener("keydown", this.onKey);
    this.root.innerHTML = "";
  }
  getISO() {
    if (this.opt.type === "gregorian") {
      return this.opt.precision === "month" ? toISO(new Date(this.greg.getFullYear(), this.greg.getMonth(), 1)) : toISO(this.greg);
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
        this.applyPreview(this.opt.rangeStart, iso);
      }
    });
    cell.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.root.focus();
    });
    if (this.opt.onDblPick) {
      cell.ondblclick = (e) => {
        e.stopPropagation();
        if (!this.isDisabled(iso)) this.opt.onDblPick(iso);
      };
    }
  }
  commit() {
    this.opt.onPick(this.getISO());
  }
  changed() {
    if (this.opt.onChange) this.opt.onChange(this.getISO());
  }
  isDisabled(iso) {
    if (this.opt.min && compareISO(iso, this.opt.min) < 0) return true;
    if (this.opt.max && compareISO(iso, this.opt.max) > 0) return true;
    return false;
  }
  // ===== Rendering =====
  render() {
    const keepFocus = typeof document !== "undefined" && (document.activeElement === this.root || this.root.contains(document.activeElement));
    this.root.innerHTML = "";
    if (this.opt.type === "gregorian") this.renderGreg();
    else this.renderHeb();
    if (keepFocus) this.root.focus();
  }
  makeHeader(titleNodes, onPrev, onNext, prevTip, nextTip) {
    const head = el("div", "hdp-head");
    const prev = el("button", "hdp-nav");
    prev.type = "button";
    prev.innerHTML = "&#8249;";
    if (this.opt.showTooltips) prev.title = prevTip;
    prev.onclick = (e) => {
      e.stopPropagation();
      onPrev();
    };
    const next = el("button", "hdp-nav");
    next.type = "button";
    next.innerHTML = "&#8250;";
    if (this.opt.showTooltips) next.title = nextTip;
    next.onclick = (e) => {
      e.stopPropagation();
      onNext();
    };
    const title = el("div", "hdp-title");
    titleNodes.forEach((n) => title.appendChild(n));
    head.appendChild(prev);
    head.appendChild(title);
    head.appendChild(next);
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
      this.render();
    });
    if (this.gridView === "months") {
      this.makeHeader(
        [pill(String(curY), L.pickYear, () => {
          this.gridView = "years";
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
      this.makeHeader(
        [yearRangeLabel(curY + this.yearOffset)],
        () => this.shiftGregYearBlock(-24),
        () => this.shiftGregYearBlock(24),
        "PgUp",
        "PgDn"
      );
      this.renderGregYearsGrid(curY, curM, curD);
      return;
    }
    this.makeHeader(
      [mBtn, yBtn],
      () => this.shiftGregMonth(-1),
      () => this.shiftGregMonth(1),
      `${L.prevMonth} (PgUp)`,
      `${L.nextMonth} (PgDn)`
    );
    const sub = el("div", "hdp-sub");
    sub.textContent = this.gregHebSubtitle(curY, curM);
    this.root.appendChild(sub);
    this.weekdayRow();
    const grid = el("div", "hdp-grid");
    const firstWd = new Date(curY, curM, 1).getDay();
    const lastDay = new Date(curY, curM + 1, 0).getDate();
    for (let i = 0; i < firstWd; i++) grid.appendChild(el("div", "hdp-cell is-blank"));
    const today = /* @__PURE__ */ new Date();
    for (let d = 1; d <= lastDay; d++) {
      const date = new Date(curY, curM, d);
      const iso = toISO(date);
      const cell = el("button", "hdp-cell");
      cell.type = "button";
      if (this.opt.markSelected !== false && d === curD) cell.classList.add("is-selected");
      if (sameDay(today, date)) cell.classList.add("is-today");
      if (this.isDisabled(iso)) cell.classList.add("is-disabled");
      cell.innerHTML = `<span class="hdp-num">${d}</span><span class="hdp-gem-sm">${hebDayGematria(gregToHebParts(date).day)}</span>`;
      this.decorateDayCell(cell, date);
      this.wireDay(cell, iso);
      cell.onclick = (e) => {
        e.stopPropagation();
        if (this.isDisabled(iso)) return;
        this.greg = date;
        this.heb = { ...gregToHebParts(date) };
        this.commit();
      };
      grid.appendChild(cell);
    }
    for (let i = firstWd + lastDay; i < 42; i++) {
      grid.appendChild(el("div", "hdp-cell is-blank"));
    }
    this.root.appendChild(grid);
    this.preview();
  }
  renderGregMonthsGrid(curY, curM, curD) {
    const grid = el("div", "hdp-mygrid");
    gregMonthNames().forEach((n, i) => {
      const c = el("button", "hdp-mycell" + (i === curM ? " is-selected" : ""));
      c.type = "button";
      c.textContent = n;
      c.onclick = (e) => {
        e.stopPropagation();
        const lastD = new Date(curY, i + 1, 0).getDate();
        this.greg = new Date(curY, i, Math.min(curD, lastD));
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
  renderGregYearsGrid(curY, curM, curD) {
    const base = curY + this.yearOffset;
    const start = base - 11;
    const end = base + 12;
    const grid = el("div", "hdp-mygrid");
    for (let y = start; y <= end; y++) {
      const c = el("button", "hdp-mycell" + (y === curY ? " is-selected" : ""));
      c.type = "button";
      c.textContent = String(y);
      c.onclick = (e) => {
        e.stopPropagation();
        const lastD = new Date(y, curM + 1, 0).getDate();
        this.greg = new Date(y, curM, Math.min(curD, lastD));
        this.heb = { ...gregToHebParts(this.greg) };
        this.gridView = "months";
        this.yearOffset = 0;
        this.render();
      };
      grid.appendChild(c);
    }
    this.root.appendChild(grid);
    this.preview();
  }
  gregHebSubtitle(curY, curM) {
    const start = gregToHebParts(new Date(curY, curM, 1));
    const lastDay = new Date(curY, curM + 1, 0).getDate();
    const end = gregToHebParts(new Date(curY, curM, lastDay));
    const sName = getMonthsForYear(start.year).find((m) => m.num === start.month);
    const eName = getMonthsForYear(end.year).find((m) => m.num === end.month);
    if (!sName || !eName) return "";
    if (start.year === end.year && start.month === end.month) {
      return `${sName.name} ${hebYearGematria(start.year)}`;
    }
    return `${sName.name} \u2013 ${eName.name} ${hebYearGematria(end.year)}`;
  }
  shiftGregMonth(delta) {
    const nd = new Date(this.greg.getFullYear(), this.greg.getMonth() + delta, 1);
    const lastD = new Date(nd.getFullYear(), nd.getMonth() + 1, 0).getDate();
    this.greg = new Date(nd.getFullYear(), nd.getMonth(), Math.min(this.greg.getDate(), lastD));
    this.heb = { ...gregToHebParts(this.greg) };
    this.render();
  }
  shiftGregYear(delta) {
    const ny = this.greg.getFullYear() + delta;
    const lastD = new Date(ny, this.greg.getMonth() + 1, 0).getDate();
    this.greg = new Date(ny, this.greg.getMonth(), Math.min(this.greg.getDate(), lastD));
    this.heb = { ...gregToHebParts(this.greg) };
    this.render();
  }
  shiftGregYearBlock(delta) {
    this.shiftGregYear(delta);
    this.yearOffset = 0;
  }
  // ----- Hebrew -----
  renderHeb() {
    const L = this.opt.labels;
    const months = getMonthsForYear(this.heb.year);
    const curMonth = months.find((m) => m.num === this.heb.month) || months[0];
    this.heb.month = curMonth.num;
    const mBtn = pill(curMonth.name, L.pickMonth, () => {
      this.gridView = "months";
      this.render();
    });
    const yBtn = pill(hebYearGematria(this.heb.year), L.pickYear, () => {
      this.gridView = "years";
      this.render();
    });
    if (this.gridView === "months") {
      this.makeHeader(
        [pill(hebYearGematria(this.heb.year), L.pickYear, () => {
          this.gridView = "years";
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
      this.makeHeader(
        [yearRangeLabelHeb(this.heb.year + this.yearOffset)],
        () => {
          this.shiftHebYear(-24);
          this.yearOffset = 0;
        },
        () => {
          this.shiftHebYear(24);
          this.yearOffset = 0;
        },
        "PgUp",
        "PgDn"
      );
      this.renderHebYearsGrid();
      return;
    }
    const prevInfo = this.neighborHebMonth(-1);
    const nextInfo = this.neighborHebMonth(1);
    this.makeHeader(
      [mBtn, yBtn],
      () => this.shiftHebMonth(-1),
      () => this.shiftHebMonth(1),
      `${L.prevMonth} - ${prevInfo.name} (PgUp)`,
      `${L.nextMonth} - ${nextInfo.name} (PgDn)`
    );
    const sub = el("div", "hdp-sub");
    sub.textContent = this.hebGregSubtitle(curMonth);
    this.root.appendChild(sub);
    this.weekdayRow();
    const grid = el("div", "hdp-grid");
    const firstGreg = hebToGreg(this.heb.year, this.heb.month, 1);
    const firstWd = firstGreg ? firstGreg.getDay() : 0;
    for (let i = 0; i < firstWd; i++) grid.appendChild(el("div", "hdp-cell is-blank"));
    const todayHeb = gregToHebParts(/* @__PURE__ */ new Date());
    for (let d = 1; d <= curMonth.days; d++) {
      const gr = hebToGreg(this.heb.year, this.heb.month, d) || /* @__PURE__ */ new Date();
      const iso = toISO(gr);
      const cell = el("button", "hdp-cell");
      cell.type = "button";
      if (this.opt.markSelected !== false && d === this.heb.day) cell.classList.add("is-selected");
      if (todayHeb.year === this.heb.year && todayHeb.month === this.heb.month && todayHeb.day === d) {
        cell.classList.add("is-today");
      }
      if (this.isDisabled(iso)) cell.classList.add("is-disabled");
      cell.innerHTML = `<span class="hdp-gem">${hebDayGematria(d)}</span><span class="hdp-num">${gr.getDate()}</span>`;
      this.decorateDayCell(cell, gr);
      this.wireDay(cell, iso);
      cell.onclick = (e) => {
        e.stopPropagation();
        if (this.isDisabled(iso)) return;
        this.heb.day = d;
        this.greg = gr;
        this.commit();
      };
      grid.appendChild(cell);
    }
    for (let i = firstWd + curMonth.days; i < 42; i++) {
      grid.appendChild(el("div", "hdp-cell is-blank"));
    }
    this.root.appendChild(grid);
    this.preview();
  }
  renderHebMonthsGrid() {
    const months = getMonthsForYear(this.heb.year);
    const grid = el("div", "hdp-mygrid");
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
  renderHebYearsGrid() {
    const base = this.heb.year + this.yearOffset;
    const start = base - 11;
    const end = base + 12;
    const grid = el("div", "hdp-mygrid");
    for (let y = start; y <= end; y++) {
      const c = el("button", "hdp-mycell" + (y === this.heb.year ? " is-selected" : ""));
      c.type = "button";
      c.textContent = hebYearGematria(y);
      c.onclick = (e) => {
        e.stopPropagation();
        this.heb.year = y;
        const ms = getMonthsForYear(y);
        if (!ms.find((m) => m.num === this.heb.month)) this.heb.month = ms[0].num;
        this.gridView = "months";
        this.yearOffset = 0;
        this.render();
      };
      grid.appendChild(c);
    }
    this.root.appendChild(grid);
    this.preview();
  }
  neighborHebMonth(delta) {
    let yr = this.heb.year;
    let list = getMonthsForYear(yr);
    let idx = list.findIndex((m) => m.num === this.heb.month);
    if (idx < 0) idx = 0;
    idx += delta;
    if (idx < 0) {
      yr -= 1;
      list = getMonthsForYear(yr);
      idx = list.length - 1;
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
    this.heb.year += delta;
    const ms = getMonthsForYear(this.heb.year);
    if (!ms.find((m) => m.num === this.heb.month)) this.heb.month = ms[0].num;
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
    if (this.opt.showParasha) {
      const sel2 = this.opt.type === "gregorian" ? this.greg : hebToGreg(this.heb.year, this.heb.month, this.heb.day);
      if (sel2 && sel2.getDay() === 6) {
        const par = getParasha(sel2, { diaspora: this.opt.diaspora });
        if (par) {
          const p = el("div", "hdp-preview hdp-parasha");
          p.textContent = `\u05E9\u05D1\u05EA ${par}`;
          this.root.appendChild(p);
        }
      }
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
      else if (e.key === "ArrowUp") mi -= 4;
      else if (e.key === "ArrowDown") mi += 4;
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
      const lastD = new Date(yy, mi + 1, 0).getDate();
      this.greg = new Date(yy, mi, Math.min(this.greg.getDate(), lastD));
      this.heb = { ...gregToHebParts(this.greg) };
    } else {
      const months = getMonthsForYear(this.heb.year);
      let idx = months.findIndex((m) => m.num === this.heb.month);
      if (idx < 0) idx = 0;
      if (e.key === "ArrowRight") idx -= 1;
      else if (e.key === "ArrowLeft") idx += 1;
      else if (e.key === "ArrowUp") idx -= 4;
      else if (e.key === "ArrowDown") idx += 4;
      else if (e.key === "Home") idx = 0;
      else if (e.key === "End") idx = months.length - 1;
      let yy = this.heb.year;
      let list = months;
      while (idx < 0) {
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
    if (e.key === "PageUp" || e.key === "PageDown") {
      const dy2 = e.key === "PageUp" ? -24 : 24;
      if (this.opt.type === "gregorian") this.shiftGregYear(dy2);
      else this.shiftHebYear(dy2);
      this.yearOffset = 0;
      return;
    }
    let dy = 0;
    if (e.key === "ArrowRight") dy = -1;
    else if (e.key === "ArrowLeft") dy = 1;
    else if (e.key === "ArrowUp") dy = -4;
    else if (e.key === "ArrowDown") dy = 4;
    else if (e.key === "Home") dy = -12;
    else if (e.key === "End") dy = 12;
    if (this.opt.type === "gregorian") this.shiftGregYear(dy);
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
function attachTip(cell, events) {
  const show = () => {
    const tip = ensureTip();
    tip.innerHTML = "";
    events.forEach((e) => {
      const row = document.createElement("div");
      row.className = "hdp-tip-row hdp-tip-" + e.type;
      const dot = document.createElement("span");
      dot.className = "hdp-tip-dot";
      const txt = document.createElement("span");
      txt.textContent = e.name;
      row.appendChild(dot);
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
function yearRangeLabel(base) {
  const span = el("div", "hdp-title-text");
  span.textContent = `${base - 11} \u2013 ${base + 12}`;
  return span;
}
function yearRangeLabelHeb(base) {
  const span = el("div", "hdp-title-text");
  span.textContent = `${hebYearGematria(base - 11)} \u2013 ${hebYearGematria(base + 12)}`;
  return span;
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
  let mode = "hours";
  const parse = () => {
    const [h, m] = (p.get() || "00:00").split(":").map((n) => parseInt(n, 10));
    return [isNaN(h) ? 0 : h, isNaN(m) ? 0 : m];
  };
  const store = (h, m) => {
    const H = (h % 24 + 24) % 24;
    const M = (m % 60 + 60) % 60;
    p.set(`${String(H).padStart(2, "0")}:${String(M).padStart(2, "0")}`);
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
    const [hh, mm] = parse();
    const dispH = p.is12 ? (hh + 11) % 12 + 1 : hh;
    const ampm = hh < 12 ? "AM" : "PM";
    const head = ce("div", "hdp-clock-head");
    const hBtn = ce("button", "hdp-clock-digit" + (mode === "hours" ? " is-active" : ""));
    hBtn.type = "button";
    hBtn.textContent = String(dispH).padStart(2, "0");
    hBtn.onclick = (e) => {
      e.stopPropagation();
      mode = "hours";
      render();
    };
    const colon = ce("span", "hdp-clock-colon");
    colon.textContent = ":";
    const mBtn = ce("button", "hdp-clock-digit" + (mode === "minutes" ? " is-active" : ""));
    mBtn.type = "button";
    mBtn.textContent = String(mm).padStart(2, "0");
    mBtn.onclick = (e) => {
      e.stopPropagation();
      mode = "minutes";
      render();
    };
    head.appendChild(hBtn);
    head.appendChild(colon);
    head.appendChild(mBtn);
    if (p.is12) {
      const ap = ce("div", "hdp-clock-ampm");
      ["AM", "PM"].forEach((t) => {
        const b = ce("button", "hdp-clock-ap" + (ampm === t ? " is-active" : ""));
        b.type = "button";
        b.textContent = t;
        b.onclick = (e) => {
          e.stopPropagation();
          const base = hh % 12;
          store(t === "PM" ? base + 12 : base, mm);
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
    if (mode === "hours") {
      for (let pos = 1; pos <= 12; pos++) {
        const ang = pos * 30 - 90;
        const outActive = p.is12 ? dispH === pos : hh === pos;
        s.appendChild(numNode(String(pos).padStart(2, "0"), ang, R_OUTER, outActive, () => {
          if (p.is12) {
            const base = pos % 12;
            store(ampm === "PM" ? base + 12 : base, mm);
          } else {
            store(pos, mm);
          }
          mode = "minutes";
          render();
        }));
        if (outActive) setHand(ang, R_OUTER);
        if (!p.is12) {
          const innVal = pos === 12 ? 0 : pos + 12;
          const innActive = hh === innVal;
          s.appendChild(numNode(String(innVal).padStart(2, "0"), ang, R_INNER, innActive, () => {
            store(innVal, mm);
            mode = "minutes";
            render();
          }));
          if (innActive) setHand(ang, R_INNER);
        }
      }
    } else {
      for (let pos = 0; pos < 12; pos++) {
        const m = pos * 5;
        const ang = pos * 30 - 90;
        const active = Math.round(mm / 5) * 5 % 60 === m;
        s.appendChild(numNode(String(m).padStart(2, "0"), ang, R_OUTER, active, () => store(hh, m)));
        if (active) setHand(ang, R_OUTER);
      }
    }
    if (handAngle !== null) {
      const rad = handAngle * Math.PI / 180;
      hand.setAttribute("x2", String(C + handR * Math.cos(rad)));
      hand.setAttribute("y2", String(C + handR * Math.sin(rad)));
    }
    wrap.appendChild(s);
  }
  render();
  return wrap;
}

// src/core/picker.ts
var DatePicker = class {
  constructor(options = {}) {
    this.views = [];
    this.startTime = "00:00";
    this.endTime = "00:00";
    this.detachers = [];
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
    const g = getGlobalConfig();
    this.opt = {
      calendar: (_a = options.calendar) != null ? _a : g.calendar,
      mode: (_b = options.mode) != null ? _b : "single",
      precision: (_c = options.precision) != null ? _c : "day",
      inline: (_d = options.inline) != null ? _d : false,
      min: (_e = options.min) != null ? _e : null,
      max: (_f = options.max) != null ? _f : null,
      highlightShabbat: (_g = options.highlightShabbat) != null ? _g : g.highlightShabbat,
      highlightHolidays: (_h = options.highlightHolidays) != null ? _h : g.highlightHolidays,
      showParasha: (_i = options.showParasha) != null ? _i : g.showParasha,
      showTooltips: (_j = options.showTooltips) != null ? _j : g.showTooltips,
      diaspora: (_k = options.diaspora) != null ? _k : g.diaspora,
      time: (_l = options.time) != null ? _l : g.time,
      timeFormat: (_m = options.timeFormat) != null ? _m : g.timeFormat,
      timeStyle: (_n = options.timeStyle) != null ? _n : g.timeStyle,
      primaryColor: (_o = options.primaryColor) != null ? _o : g.primaryColor,
      size: (_p = options.size) != null ? _p : g.size,
      compact: (_q = options.compact) != null ? _q : g.compact,
      closeOnSelect: (_r = options.closeOnSelect) != null ? _r : g.closeOnSelect,
      labels: { ...g.labels, ...options.labels || {} },
      locale: g.locale,
      onSelect: options.onSelect,
      onClose: options.onClose
    };
    this.type = this.opt.calendar;
    this.originalValue = (_s = options.value) != null ? _s : null;
    const v = options.value;
    const split = (iso) => {
      if (iso && iso.includes("T")) {
        const [d, t] = iso.split("T");
        return [d, (t || "").slice(0, 5) || "00:00"];
      }
      return [iso || "", "00:00"];
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
    return this;
  }
  /** Open as a popup anchored to `anchor`. Returns this. */
  open(anchor) {
    this.close();
    this.opt.inline = false;
    this.buildPanel();
    document.body.appendChild(this.panel);
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
    this.detachers.forEach((d) => d());
    this.detachers = [];
    this.views.forEach((v) => v.destroy());
    this.views = [];
    if (this.panel && this.panel.parentElement && !this.opt.inline) {
      this.panel.remove();
    }
    if (this.opt.onClose) this.opt.onClose();
  }
  /** Remove everything (inline or popup). */
  destroy() {
    this.detachers.forEach((d) => d());
    this.detachers = [];
    this.views.forEach((v) => v.destroy());
    this.views = [];
    if (this.panel) this.panel.remove();
  }
  getValue() {
    return this.result();
  }
  // ===== Build =====
  buildPanel() {
    this.panel = document.createElement("div");
    this.panel.className = "hdp" + (this.opt.inline ? " hdp-inline" : " hdp-popup") + " hdp-size-" + this.opt.size + (this.opt.compact ? " hdp-compact" : "");
    this.panel.dir = "rtl";
    if (this.opt.primaryColor) {
      this.panel.style.setProperty("--hdp-primary", this.opt.primaryColor);
      this.panel.style.setProperty(
        "--hdp-primary-soft",
        `color-mix(in srgb, ${this.opt.primaryColor} 14%, transparent)`
      );
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
    if (this.opt.mode === "range") {
      body.appendChild(this.buildRangeColumn("start"));
      body.appendChild(this.buildRangeColumn("end"));
    } else {
      const col = document.createElement("div");
      col.className = "hdp-col";
      this.views.push(this.makeView(col, this.startISO, (iso) => {
        this.startISO = iso;
        if (!this.opt.time && this.opt.closeOnSelect) this.commitClose();
        else this.emit();
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
  buildRangeColumn(which) {
    const col = document.createElement("div");
    col.className = "hdp-col";
    const label = document.createElement("div");
    label.className = "hdp-col-label";
    label.textContent = which === "start" ? this.opt.labels.rangeStart : this.opt.labels.rangeEnd;
    col.appendChild(label);
    const grid = document.createElement("div");
    col.appendChild(grid);
    const initial = which === "start" ? this.startISO || null : this.endISO || this.nextMonthISO(this.startISO);
    const [lo, hi] = this.rangeForDisplay();
    this.views.push(
      this.makeView(grid, initial || "", (iso) => this.onRangeClick(iso), {
        rangeStart: lo,
        rangeEnd: hi,
        onDblPick: (iso) => this.onRangeDbl(iso),
        markSelected: false
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
  // Click-sequence range selection that works within ONE calendar or across
  // both: the first click sets the start (clearing any end); the next click
  // sets the end. Clicking before the current start restarts from there.
  onRangeClick(iso) {
    const hasStart = !!this.startISO;
    const hasEnd = !!this.endISO;
    if (!hasStart || hasEnd) {
      this.startISO = iso;
      this.endISO = "";
    } else if (compareISO(iso, this.startISO) >= 0) {
      this.endISO = iso;
    } else {
      this.startISO = iso;
      this.endISO = "";
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
    if (!this.opt.time && this.opt.closeOnSelect) this.commitClose();
    else this.emit();
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
    const style = this.timeStyleNorm();
    if (style === "clock") return buildClockTime({ is12, get, set });
    if (style === "native") return buildNativeTime(get, set);
    const wrap = ce2("div", "hdp-time hdp-time-" + style);
    const parse = () => {
      const [h, m] = (get() || "00:00").split(":").map((n) => parseInt(n, 10));
      return [isNaN(h) ? 0 : h, isNaN(m) ? 0 : m];
    };
    const store = (h, m) => {
      const H = (h % 24 + 24) % 24;
      const M = (m % 60 + 60) % 60;
      set(`${String(H).padStart(2, "0")}:${String(M).padStart(2, "0")}`);
      render();
    };
    const render = () => {
      wrap.innerHTML = "";
      const [hh, mm] = parse();
      const dispHour = is12 ? (hh + 11) % 12 + 1 : hh;
      const ampm = hh < 12 ? "AM" : "PM";
      if (style === "stepper") {
        wrap.appendChild(stepper(
          dispHour,
          (delta) => store(hh + delta, mm),
          (v) => store(is12 ? to24(v, ampm) : v, mm),
          is12 ? 1 : 0,
          is12 ? 12 : 23
        ));
        const colon = ce2("span", "hdp-time-colon");
        colon.textContent = ":";
        wrap.appendChild(colon);
        wrap.appendChild(stepper(mm, (delta) => store(hh, mm + delta), (v) => store(hh, v), 0, 59));
        if (is12) {
          const t = ce2("button", "hdp-time-ampm");
          t.type = "button";
          t.textContent = ampm;
          t.onclick = (e) => {
            e.stopPropagation();
            store((hh + 12) % 24, mm);
          };
          wrap.appendChild(t);
        }
      } else {
        const hourSel = sel(
          range(is12 ? 1 : 0, is12 ? 12 : 23).map((v) => [String(v).padStart(2, "0"), v]),
          dispHour,
          (v) => store(is12 ? to24(Number(v), ampm) : Number(v), mm)
        );
        const minSel = sel(
          range(0, 59).map((v) => [String(v).padStart(2, "0"), v]),
          mm,
          (v) => store(hh, Number(v))
        );
        wrap.appendChild(hourSel);
        const colon = ce2("span", "hdp-time-colon");
        colon.textContent = ":";
        wrap.appendChild(colon);
        wrap.appendChild(minSel);
        if (is12) {
          wrap.appendChild(sel([["AM", "AM"], ["PM", "PM"]], ampm, (v) => {
            store(to24(dispHour, String(v)), mm);
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
      if (this.opt.onSelect) this.opt.onSelect(this.result());
      if (!this.opt.inline) this.close();
    });
    const today = btn("hdp-btn hdp-btn-ghost", L.today, () => {
      var _a;
      const iso = toISO(/* @__PURE__ */ new Date());
      if (this.opt.mode === "range") {
        this.endISO = iso;
      } else {
        this.startISO = iso;
      }
      (_a = this.views[this.opt.mode === "range" ? this.views.length - 1 : 0]) == null ? void 0 : _a.setValue(iso);
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
function buildNativeTime(get, set) {
  const wrap = ce2("div", "hdp-time hdp-time-native");
  const inp = ce2("input", "hdp-time-input");
  inp.type = "time";
  inp.step = "60";
  const [h, m] = (get() || "00:00").split(":");
  inp.value = `${(h || "00").padStart(2, "0")}:${(m || "00").padStart(2, "0")}`;
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

export { CalendarView, DEFAULT_LABELS, DatePicker, buildYear, compareISO, getDayEvents, getGlobalConfig, getHoliday, getMonthsForYear, getParasha, getRoshChodesh, gregMonthNames, gregToHebParts, hebDayGematria, hebFullString, hebMonthName, hebMonthYearLabel, hebToGreg, hebYearGematria, isLeapYear, parseISO, resetGlobalConfig, setGlobalConfig, toISO };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
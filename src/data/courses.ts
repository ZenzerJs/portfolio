export type LaurierCourseLinks = {
  code: string;
  label: string;
  bohrUrl: string;
  calendarUrl: string;
};

export const laurierCourses: Record<string, LaurierCourseLinks> = {
  cp104: {
    code: "CP104",
    label: "Intro to Programming",
    bohrUrl: "https://bohr.wlu.ca/cp104/",
    calendarUrl:
      "https://academic-calendar.wlu.ca/course.php?c=72529&cal=1&d=2948&s=1118&y=90",
  },
  cp164: {
    code: "CP164",
    label: "Data Structures I",
    bohrUrl: "https://bohr.wlu.ca/cp164/",
    calendarUrl:
      "https://academic-calendar.wlu.ca/course.php?c=72530&cal=1&d=2948&s=1118&y=90",
  },
  cp213: {
    code: "CP213",
    label: "Object-Oriented Programming",
    bohrUrl: "https://bohr.wlu.ca/cp213/",
    calendarUrl:
      "https://academic-calendar.wlu.ca/course.php?c=72532&cal=1&d=2948&s=1118&y=90",
  },
  cp363: {
    code: "CP363",
    label: "Database I",
    bohrUrl: "https://bohr.wlu.ca/cp363/",
    calendarUrl:
      "https://academic-calendar.wlu.ca/course.php?c=72538&cal=1&d=2948&s=1118&y=90",
  },
};

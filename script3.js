const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const monthYear = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendarBody');

let currentDate = new Date();

prevBtn.addEventListener('click', showPreviousMonth);
nextBtn.addEventListener('click', showNextMonth);
showCalendar(currentDate);

function showCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  monthYear.textContent = `${getMonthName(month)} ${year}`;
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  calendarBody.innerHTML = '';
  let dateCount = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        cell.textContent = '';
      } else if (dateCount > totalDays) {
        cell.textContent = '';
      } else {
        cell.textContent = dateCount;
        if (isToday(year, month, dateCount)) {
          cell.classList.add('today');
        }
        dateCount++;
      }
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}

function showPreviousMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  showCalendar(currentDate);
}

function showNextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  showCalendar(currentDate);
}

function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  return months[month];
}

function isToday(year, month, date) {
  const today = new Date();
  return (
    year === today.getFullYear() &&
    month === today.getMonth() &&
    date === today.getDate()
  );
}

function updateCalendar() {
  const today = new Date();
  if (currentDate.getMonth() !== today.getMonth() || currentDate.getFullYear() !== today.getFullYear()) {
    currentDate = today;
    showCalendar(currentDate);
  } else {
    const cells = document.querySelectorAll('#calendarBody td');
    cells.forEach((cell) => {
      const date = parseInt(cell.textContent);
      if (isToday(currentDate.getFullYear(), currentDate.getMonth(), date)) {
        cell.classList.add('today');
      } else {
        cell.classList.remove('today');
      }
    });
  }
}

setInterval(updateCalendar, 1000)
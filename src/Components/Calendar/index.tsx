import React, { forwardRef } from 'react';
import { getDaysInMonth } from 'date-fns';
import '../../Styles/calendar.scss';

const CALENDAR_LENGTH = 35; // 총 달력 칸 수
const DEFAULT_TRASH_VALUE = 0; // 빈 칸을 나타내는 값
const DAY_OF_WEEK = 7; // 주의 일수
const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarProps {
  className?: string;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({ className }, ref) => {
  const [currentDate] = React.useState(new Date(2025, 0, 1));
  const totalMonthDays = getDaysInMonth(currentDate);

  const prevDayList = Array.from({
    length: currentDate.getDay(),
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => i + 1);

  const nextDayList = Array.from({
    length: CALENDAR_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);

  const weekCalendarList = currentCalendarList.reduce(
    (acc: number[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    []
  );

  return (
    <div className={className} ref={ref}>
      <h2 style={{ margin: '20px 0' }}>2025년 1월</h2>
      <div>
        {DAY_LIST.map((day) => (
          <span key={day} 
            style={{ 
              width: '44px', 
              height: '40px', 
              display: 'inline-block', 
              textAlign: 'center',
              color: day === '일' ? '#bd3232' : '#2e2e2e',
            }}>
            {day}
          </span>
        ))}
      </div>
      {weekCalendarList.map((week, weekIndex) => (
        <div key={weekIndex} style={{ display: 'flex' }}>
          {week.map((day, dayIndex) => {
            let textColor = '#2e2e2e';
            let backgroundColor = 'transparent';

            if (day === 4) {
              textColor = '#fff';
              backgroundColor = '#9b819b';
            } else if ([5, 12, 19, 26].includes(day)) {
              textColor = '#bd3232';
            }

            return (
              <span
                key={dayIndex}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: backgroundColor,
                  borderRadius: '35px',
                  padding: '6px 0',
                  color: textColor,
                  margin: '2px',
                }}
              >
                {day === DEFAULT_TRASH_VALUE ? '' : day}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default Calendar;

import { getDaysInMonth } from 'date-fns';
import React from 'react';
import '../../Styles/calendar.scss';

const CALENDAR_LENGTH = 35; // 총 달력 칸 수
const DEFAULT_TRASH_VALUE = 0; // 빈 칸을 나타내는 값
const DAY_OF_WEEK = 7; // 주의 일수
const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar: React.FC = () => {
  // 초기값을 2025년 1월 1일로 설정
  const [currentDate] = React.useState(new Date(2025, 0, 1));
  const totalMonthDays = getDaysInMonth(currentDate);

  // 이전 달의 빈 칸 수 계산
  const prevDayList = Array.from({
    length: currentDate.getDay(), // 1일의 요일을 기준으로 빈 칸 수
  }).map(() => DEFAULT_TRASH_VALUE);

  // 현재 달의 일 수 배열 생성
  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1,
  );

  // 다음 달의 빈 칸 수 계산
  const nextDayList = Array.from({
    length: CALENDAR_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  // 모든 날짜를 합쳐서 달력 배열 생성
  const currentCalendarList = prevDayList.concat(currentDayList, nextDayList);
  
  // 주 단위로 나누기
  const weekCalendarList = currentCalendarList.reduce(
    (acc: number[][], cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);
      return acc;
    },
    [],
  );

  return (
    <div className='calendar'>
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
            // 색상 결정
            let textColor = '#2e2e2e';
            let backgroundColor = 'transparent';

            if (day === 4) {
              textColor = '#fff'; // 4일
              backgroundColor = '#9b819b'; // 4일 배경색
            } else if ([5, 12, 19, 26].includes(day)) {
              textColor = '#bd3232'; // 5, 12, 19, 26일 텍스트 색상
            }

            return (
              <span
                key={dayIndex}
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'inline-flex', // Flexbox 설정
                  alignItems: 'center', // 수직 가운데 정렬
                  justifyContent: 'center', // 수평 가운데 정렬
                  backgroundColor: backgroundColor,
                  borderRadius: '35px',
                  padding: '6px 0',
                  color: textColor,
                  margin: '2px', // 간격 조정
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
};

export default Calendar;

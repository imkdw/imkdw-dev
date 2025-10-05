/**
 * UTC 날짜를 브라우저 타임존 기준으로 포맷팅
 * @param date UTC 날짜 (Date 객체 또는 문자열)
 * @returns 포맷된 날짜 문자열 (예: "2024년 1월 15일")
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 읽기 시간을 분 단위로 포맷팅
 * @param minutes 읽기 시간 (분)
 * @returns 포맷된 읽기 시간 문자열 (예: "5분")
 */
export function formatReadTime(minutes: number): string {
  return `${minutes}분`;
}

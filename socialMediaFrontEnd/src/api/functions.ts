export function TimeDiff(date: string) {
  const timeDiff = new Date(Date.now()).getTime() - new Date(date).getTime();
  const minute = Math.ceil(timeDiff / (1000 * 60));
  if (minute <= 1) {
    return 'just now';
  }
  if (minute > 1 && minute < 60) {
    return `${minute} minute`;
  }
  if (minute > 60 && minute < 1440) {
    const hour = Math.ceil(timeDiff / (1000 * 60 * 60));
    return `${hour} hour`;
  }
  if (minute > 1440) {
    const day = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return `${day} day`;
  }
}

////////////////////////////////////
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} at ${hours}:${minutes}`;
}

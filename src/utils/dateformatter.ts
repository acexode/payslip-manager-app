export function formatDateToMonthYearAndDay(dateString: string, full = true): string {
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    const [year, month, day] = dateString.split('-');
  
    if (!year || !month || !day) {
      throw new Error('Invalid date format');
    }
  
    const monthInWords = months[parseInt(month, 10) - 1];
  
    // Add suffix to day (e.g., "1st", "2nd", "3rd", "4th", etc.)
    const dayWithSuffix = getDayWithSuffix(parseInt(day, 10));
    if(full){

        return `${dayWithSuffix} ${monthInWords} ${year}`;
    }else{
        return `${monthInWords}, ${year}`;

    }
  }
  
  function getDayWithSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
  
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }
  

  
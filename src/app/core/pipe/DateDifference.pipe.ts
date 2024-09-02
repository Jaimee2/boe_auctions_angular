import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateDifference',
  standalone: true
})
export class DateDifferencePipe implements PipeTransform {

  transform(startDate: Date | string, endDate: Date | string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffInMilliseconds = end.getTime() - start.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) return `${diffInDays} days remaining to end`;
    else if (diffInHours > 0) return `${diffInHours} hours remaining to end`;
    else if (diffInMinutes > 0) return `${diffInMinutes} minutes remaining to end`;
    else if (diffInSeconds > 0) return `${diffInSeconds} seconds remaining to end`;
    else return 'the auction ended :(';

  }

}

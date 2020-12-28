import { Pipe, PipeTransform } from '@angular/core';
import { MessageDetails } from '../model/MessageDetails';

@Pipe({
  name: 'filterByDestination',
})
export class FilterByDestinationPipe implements PipeTransform {
  transform(responses: MessageDetails[], destination: string): any {
    if (destination === '') {
      return responses;
    }

    return responses
      .slice()
      .filter((response) => response.destination.match(destination));
  }
}

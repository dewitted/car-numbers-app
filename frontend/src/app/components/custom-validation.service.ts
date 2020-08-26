import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EntryService } from '../entry.service';

@Injectable({
  providedIn: 'root',
})
export class CustomValidationService {
  constructor(private entryService: EntryService) {}

  validateNumberNotTaken(control: AbstractControl) {
    return this.checkNumberNotTaken(control.value).pipe(
      map((res) => {
        return res ? null : { numberTaken: true };
      })
    );
  }

  checkNumberNotTaken(number: string) {
    return this.entryService.getEntries().pipe(
      map((numberList: Array<any>) =>
        numberList.filter((array) => array.number === number)
      ),
      map((entries) => !entries.length)
    );
  }
}

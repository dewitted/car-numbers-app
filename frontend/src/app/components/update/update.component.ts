import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { EntryService } from '../../entry.service';
import { badNumberValidator } from '../shared/car-number.validator';
import { CustomValidationService } from '../custom-validation.service';

import { Entry } from '../../entry.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  id: String;
  entry: any = {};
  updateForm: FormGroup;

  constructor(
    private entryService: EntryService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private customValidator: CustomValidationService
  ) {
    this.createForm();
  }
  createForm() {
    this.updateForm = this.fb.group({
      number: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          badNumberValidator(
            /^[A-Z]{6}$|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\"|\;|\:|\s/
          ),
        ],
        this.customValidator.validateNumberNotTaken.bind(this.customValidator),
      ],
      ownername: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          badNumberValidator(
            /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\"|\;|\:|\s/
          ),
        ],
      ],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.entryService.getEntryById(this.id).subscribe((res) => {
        this.entry = res;
        this.updateForm.get('number').setValue(this.entry.number);
        this.updateForm.get('ownername').setValue(this.entry.ownername);
      });
    });
  }

  updateEntry(number, ownername) {
    this.entryService.updateEntry(this.id, number, ownername).subscribe(() => {
      this.snackBar.open('Entry updated successfully'),
        'OK',
        {
          duration: 3000,
        };
    });
  }
}

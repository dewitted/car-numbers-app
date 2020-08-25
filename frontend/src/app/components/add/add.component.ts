import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntryService } from '../../entry.service';
import { badNumberValidator } from '../shared/car-number.validator';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private entryService: EntryService,
    private fb: FormBuilder,
    private Router: Router
  ) {
    this.createForm = this.fb.group({
      number: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          badNumberValidator(
            /^[A-Z]{6}$|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\"|\;|\:|\s/
          ),
        ],
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

  addEntry(number, ownername) {
    this.entryService.addEntry(number, ownername).subscribe(() => {
      this.Router.navigate(['/list']);
    });
  }

  ngOnInit() {}
}

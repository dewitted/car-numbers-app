import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../entry.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private entryService: EntryService) {}

  ngOnInit() {
    this.entryService.getEntries().subscribe((entries) => {
      console.log('Entries are being retrieved');
    });
  }
}

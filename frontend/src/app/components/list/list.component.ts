import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Entry } from '../../entry.model';
import { EntryService } from '../../entry.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  entries: Entry[];
  showedColumns = ['number', 'ownername', 'options'];
  constructor(private entryService: EntryService, private router: Router) {}

  ngOnInit() {
    this.fetchEntries();
  }

  fetchEntries() {
    this.entryService.getEntries().subscribe((data: Entry[]) => {
      this.entries = data;
      console.log('Data request made ..');
      console.log(this.entries);
    });
  }
  updateEntry(id) {
    this.router.navigate([`/update/${id}`]);
  }

  deleteEntry(id) {
    this.entryService.deleteEntry(id).subscribe(() => {
      this.fetchEntries();
    });
  }
}

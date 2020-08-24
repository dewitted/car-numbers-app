import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Entry } from '../../entry.model';
import { EntryService } from '../../entry.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  showedColumns = ['number', 'ownername', 'options'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private entryService: EntryService, private router: Router) {}

  dataSource = new MatTableDataSource<Entry>();
  items: any;

  ngOnInit() {
    this.fetchEntries();
  }

  fetchEntries() {
    this.entryService.getEntries().subscribe((data) => {
      console.log('Data request made ..', data);
      this.items = data;
      this.dataSource.data = this.items;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

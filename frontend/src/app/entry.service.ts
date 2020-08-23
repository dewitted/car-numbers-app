import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getEntries() {
    return this.http.get(`${this.uri}/entries`);
  }

  getEntryById(id) {
    return this.http.get(`${this.uri}/entries/${id}`);
  }

  addEntry(number, ownername) {
    const entry = {
      number: number,
      ownername: ownername,
    };

    return this.http.post(`${this.uri}/entries/add`, entry);
  }

  updateEntry(id, number, ownername) {
    const entry = {
      number: number,
      ownername: ownername,
    };

    return this.http.post(`${this.uri}/entries/update/${id}`, entry);
  }

  deleteEntry(id) {
    return this.http.get(`${this.uri}/entries/delete/${id}`);
  }
}

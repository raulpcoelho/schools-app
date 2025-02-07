import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = `http://localhost:3000/api/schools`;
  constructor(private http: HttpClient) {}

  getSchools(page: number) {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get(url);
  }

  getSchoolById(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  getSchoolByName(name: string) {
    const url = `${this.apiUrl}?noEntidade=${name}`;
    return this.http.get(url);
  }
}

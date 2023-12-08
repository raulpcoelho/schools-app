import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `http://157.230.55.217/api/escolas`;
  constructor(private http: HttpClient) { }

  getSchools(page: number) {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get(url);
  }

  getSchoolById(id: number) {
    const url = `${this.apiUrl}?coEntidade=${id}`;
    return this.http.get(url);
  }

  getSchoolByName(name: string) {
    const url = `${this.apiUrl}?noEntidade=${name}`;
    return this.http.get(url);
  }
}

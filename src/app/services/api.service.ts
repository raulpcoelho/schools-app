import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/types/contants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = `${API}/api/schools`;
  constructor(private readonly http: HttpClient) {}

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

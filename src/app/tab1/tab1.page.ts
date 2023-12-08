import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public schools: any;
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getSchools().subscribe({
      next: data => this.schools = data,
      error: err => console.error({"Error": err})
    });
  }
}

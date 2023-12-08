import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school',
  templateUrl: './school.page.html',
  styleUrls: ['./school.page.scss'],
})
export class SchoolPage implements OnInit {

  school: any;
  id: string | null;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.id = null;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id !== null) {
      this.apiService.getSchoolById(this.id).subscribe({
        next: data => {
          if (data && Object.keys(data).length > 0)
            this.school = data;
        },
        error: err => console.error({ "Error": err })
      });
    }
  }
}


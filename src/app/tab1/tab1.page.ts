import { ToastController } from '@ionic/angular';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  schools: any;
  private page: number;
  last: boolean;


  constructor(private apiService: ApiService, public toastController: ToastController) {
    this.page = 1;
    this.last = false;
    this.schools = [];
  }

  ngOnInit() {
    this.listSchools();
  }

  listSchools() {
    this.apiService.getSchools(this.page).subscribe({
      next: data => {
        if (!data || Object.keys(data).length === 0)
          this.last = true;
        else
          this.schools = this.schools.concat(data);
      },
      error: err => console.error({ "Error": err })
    });
    this.page++;
  }

  async like(id:number) {
    const toast = await this.toastController.create({
      message: `Escola favoritada: ${id}`,
      duration: 2000
    });
    toast.present();
  }


}


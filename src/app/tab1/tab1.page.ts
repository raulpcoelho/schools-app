import { ToastController } from '@ionic/angular';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  schools: any[];
  favoriteSchools: any[];
  private page: number;
  last: boolean;


  constructor(private apiService: ApiService, private favoriteService: FavoriteService, public toastController: ToastController) {
    this.page = 1;
    this.last = false;
    this.schools = [];
    this.favoriteSchools=[];
  }

  ngOnInit() {
    this.listSchools();
    this.favoriteSchools = this.favoriteService.getFavoriteSchools();
  }

  listSchools() {
    this.apiService.getSchools(this.page).subscribe({
      next: data => {
        if (!data || Object.keys(data).length === 0)
          this.last = true;
        else {
          this.schools = this.schools.concat(data);
        }
      },
      error: err => console.error({ "Error": err })
    });
    this.page++;
  }

  async like(index: number) {
    const added = this.favoriteService.toggleFavorite(this.schools[index]);
    const message: string = added ? "Escola adicionada aos favoritos" : "Escola removida dos favoritos";
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  checkFavorite(id : number) {
    return this.favoriteSchools.some(obj => obj.coEntidade === id);
  }
}


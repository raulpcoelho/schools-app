import { FavoriteService } from './../services/favorite.service';
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  schools: any[];
  favoriteSchools: any[];
  noResults: boolean;
  search: string;


  constructor(private apiService: ApiService, private favoriteService: FavoriteService, public toastController: ToastController) {
    this.noResults = false;
    this.schools = [];
    this.search = "";
    this.favoriteSchools = this.favoriteService.getFavoriteSchools();
    ;
  }

  searchSchools() {
    this.schools = [];
    let f;
    if (Number.isInteger(Number(this.search)))
      f = this.apiService.getSchoolById(this.search);
    else
      f = this.apiService.getSchoolByName(this.search);
    f.subscribe({
      next: data => {
        if (!data || Object.keys(data).length === 0)
          this.noResults = true;
        else {
          this.schools = this.schools.concat(data);
          this.noResults = false;
        }
      },
      error: err => console.error({ "Error": err })
    });
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

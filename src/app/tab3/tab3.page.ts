import { ToastController } from '@ionic/angular';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  favoriteSchools: any[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private apiService: ApiService,
    public toastController: ToastController,
  ) {}

  async ionViewWillEnter() {
    await this.favoriteService.storageInit();
    this.favoriteSchools = this.favoriteService.getFavoriteSchools();
  }

  async ngOnChanges() {
    await this.favoriteService.storageInit();
    this.favoriteSchools = this.favoriteService.getFavoriteSchools();
    console.log(this.favoriteSchools);
  }

  async dislike(school: any) {
    await this.favoriteService.toggleFavorite(school);
    const message: string = 'Escola removida dos favoritos';
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}

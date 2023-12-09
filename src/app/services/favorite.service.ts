import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteSchools: any[] = [];

  constructor(private storage: Storage) {
    this.createStorage();
  }
  
  async createStorage() {
    await this.storage.create();
  }

  async storageInit() {
    const storedFavorites = await this.storage.get('favoriteSchools');
    this.favoriteSchools = storedFavorites || [];
    console.log(this.favoriteSchools);
  }

  getFavoriteSchools(): any[] {
    return this.favoriteSchools;
  }

  async toggleFavorite(school: any): Promise<boolean> {
    //return true if added, false if removed
    const index = this.favoriteSchools.findIndex(
      (favSchool) => favSchool.coEntidade === school.coEntidade
    );
    const flag: boolean = index === -1;

    if (!flag) {
      this.favoriteSchools.splice(index, 1);      
    } else {
      this.favoriteSchools.push(school);
    }
    await this.storage.set('favoriteSchools', this.favoriteSchools);
    return flag;
  }

}

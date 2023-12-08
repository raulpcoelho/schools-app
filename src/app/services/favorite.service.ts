import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoriteSchools: any[] = [];
  
  constructor() { }

  getFavoriteSchools(): any[] {
    return this.favoriteSchools;
  }

  toggleFavorite(school: any): void {
    const index = this.favoriteSchools.findIndex((favSchool) => favSchool.coEntidade === school.coEntidade);

    if (index !== -1) {
      this.favoriteSchools.splice(index, 1);
    } else {
      this.favoriteSchools.push(school);
    }
  }
}

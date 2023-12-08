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

  toggleFavorite(school: any): boolean { //return true if added, false if removed
    const index = this.favoriteSchools.findIndex((favSchool) => favSchool.coEntidade === school.coEntidade);

    if (index !== -1) {
      this.favoriteSchools.splice(index, 1);
      return false;
    } else {
      this.favoriteSchools.push(school);
      return true;
    }
  }
}

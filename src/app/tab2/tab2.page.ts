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
  private page: number;
  noResults: boolean;
  search: string;


  constructor(private apiService: ApiService, public toastController: ToastController) {
    this.page = 1;
    this.noResults = false;
    this.schools = [];
    this.search = "";
  }

  searchSchools() {
    this.schools = [];
    let f;
    console.log('Search:', this.search);
    if (Number.isInteger(Number(this.search)))
      f = this.apiService.getSchoolById(this.search);
    else 
      f = this.apiService.getSchoolByName(this.search);
    f.subscribe({
      next: data => {
        if (!data || Object.keys(data).length === 0)
          this.noResults = true;
        else {
          let newValues: any[] = [];
          newValues = newValues.concat(data).map(school => ({ ...school, liked: false }));
          this.schools = newValues
          this.noResults = false;
        }
      },
      error: err => console.error({ "Error": err })
    });
    this.page++;
  }


  async like(id: number, index: number) {
    this.schools[index].isLiked = !this.schools[index].isLiked;
    const message: string = this.schools[index].isLiked ? "Escola adicionada aos favoritos" :
      "Escola removida dos favoritos";
    const toast = await this.toastController.create({
      message: `${message}: ${id}`,
      duration: 2000,
      position: "middle"
    });
    toast.present();
  }

}

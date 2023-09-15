import { Component, OnInit } from '@angular/core';
import{PageEvent}from '@angular/material';
import { TvService } from '../tv.service';
@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent implements OnInit {
  imagePath: string = 'https://image.tmdb.org/t/p/w500';
  allTvs: any[] = [];
  allData: any[] = [];
  lang: string = 'en-US';
  //late
  totaltvs!: number;
  tvsPerPage: number = 20;

  private searchval: string = '';
  showTvsDetails: boolean = true;

  currentPage: number = 1;

  constructor(private tvService:TvService) {}

  set searchValue(value: string) {
    this.searchval = value;
    this.searchallTvs(value);
  }

  ngOnInit(): void {
    //next,error,complete
    this.tvService.getAllTvs(this.currentPage, this.lang).subscribe({
      next: (response) => {
        console.log(response);
        this.allTvs= response.results;
        this.allData = this.allTvs;
        this.totaltvs = response.total_results;
      },
    });
  }

  toggleDetails(tvId: number) {
    console.log(tvId);

    for (const item of this.allTvs) {
      if (item.id == tvId) {
        item.toggleDiscription = !item.toggleDiscription;
      }
    }
  }

  searchallTvs(tvTitle: string) {
    this.tvService.searchAllTvs(tvTitle).subscribe({
      next: (response) => {
        this.allTvs = response.results;
        this.allData = this.allTvs;
      },
    });
  }

  changeLanguage() {
    this.lang = this.lang == 'en-Us' ? 'ar-SA' : 'en-Us';
    this.tvService.getAllTvs(this.currentPage, this.lang).subscribe({
      next: (response) => {
        this.allTvs = response.results;
        this.allData = this.allTvs;
      },
    });
  }

  changePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.tvService.getAllTvs(this.currentPage, this.lang).subscribe({
      next: (response) => {
        this.allTvs = response.results;
        this.allData = this.allTvs;
      },
    });
    
  }
}

   
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class  TvService {
  api: string = 'a5e87e03042eaca60d447bb02e38a156'
  //https://api.themoviedb.org/3/tv/top_rated
  alltvs: any[] = [];
  constructor(private http: HttpClient) {}

  getAllTvs(pageNumber:number=1,language: string = 'en-US'): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${this.api}&language=${language}&page=${pageNumber}`
    );
  }
  getTvById(tvId: number): Observable<any> {
    return this.http
      .get(`https://api.themoviedb.org/3/tv/${tvId}?api_key=${this.api}
    `);
  }

  searchAllTvs(tvName: string): Observable<any> {
    if (tvName == '') {
      return this.getAllTvs();
    } else {
      return this.http.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${this.api}&query=${tvName}`
      );
    }
  }
}

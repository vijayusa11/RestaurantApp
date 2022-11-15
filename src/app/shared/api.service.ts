import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }
  // here we will define GET, POST, PUT, DELETE 
  // Create Restaurant using post method
  postRestaurant (data : any) {
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res:any) => {
      return res;
    }))
  }
  // Get Restaurant data from GET method
  getRestaurant () {
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any) => {
      return res;
    }))
  }
  //Update Restaurant Data from UPDATE method
  updateRestaurant(data: any, id: number) {
    return this._http.put<any>("http://localhost:3000/posts/"+id, data).pipe(map((res:any) => {
      return res;
    }))
  }
  deleteRestaurant(id:number) {
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any) => {
      return res; 
    }))
  }

}

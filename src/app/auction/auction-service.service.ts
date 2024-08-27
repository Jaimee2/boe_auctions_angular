import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Auction} from "./interface/auction";

@Injectable({
  providedIn: 'root'
})
export class AuctionServiceService {

  private apiUrl = 'http://localhost:7071/auction';

  constructor(private http: HttpClient) {
  }

  getAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.apiUrl);
  }

}

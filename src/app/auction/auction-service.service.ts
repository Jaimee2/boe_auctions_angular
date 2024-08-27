import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Auction} from "./interface/auction";

@Injectable({
    providedIn: 'root'
})
export class AuctionServiceService {

    private apiUrl = 'https://azure-function-boe-auction.azurewebsites.net/api';

    constructor(private http: HttpClient) {
    }

    getAuctions(): Observable<Auction[]> {
        return this.http.get<Auction[]>(`${this.apiUrl}/auctions`);
    }

}

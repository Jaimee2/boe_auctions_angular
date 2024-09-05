import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Auction} from "./interface/auction";
import {AssetType} from "./constants";

@Injectable({
  providedIn: 'root'
})
export class AuctionServiceService {

  assetTypes = [AssetType.Garaje, AssetType.Vivienda, AssetType.LocalComercial, AssetType.NaveIndustrial];
  private apiUrl = 'https://azure-function-boe-auction.azurewebsites.net/api';

  constructor(private http: HttpClient) {
  }

  getAuctions(filters?: any): Observable<Auction[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.province) params = params.set('province', filters.province);
      this.assetTypes.forEach(type => {
        if (filters[type]) params = params.append('assetType', type);
      });
    }

    return this.http.get<Auction[]>(`${this.apiUrl}/auctions`, {params});
  }

}

export interface Auction {
  identifier: string;
  auctionType: string;
  startDate: string;
  endDate: string;
  lots: string;
  announcementBOE: string;
  auctionValue: string;
  appraisalValue: string;
  minimumBid: string;
  bidIncrement: string;
  depositAmount: string;
  managingAuthority: string | null;
  assets: AuctionAsset[];
}

export interface AuctionAsset {
  assetLink: string;
  description: string;
  cadastralReference: string;
  address: string;
  addressIA: string;
  fullAddress: string;
  fullAddressWithIA: string;
  coordinates: {
    lat: string;
    lon: string;
  };
  postalCode: string;
  city: string;
  province: string;
  possessionStatus: string;
  isVisitable: string;
  encumbrances: string;
  registryDetails: string;
  legalTitle: string;
  primaryResidence: boolean;
  idufir: string;
}

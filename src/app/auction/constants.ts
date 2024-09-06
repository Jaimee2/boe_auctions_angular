export class Constants {

  public static assetIcons = new Map<string, string>([
    ['Vivienda', 'assets/img/house.svg'],
    ['Garaje', 'assets/img/garage.png'],
    ['Nave industrial', 'assets/img/warehouse.png'],
    ['Local comercial', 'assets/img/store.png'],
  ]);
}

export enum AssetType {
  Garaje = 'Garaje',
  Vivienda = 'Vivienda',
  LocalComercial = 'Local comercial',
  NaveIndustrial = 'Nave industrial',
}

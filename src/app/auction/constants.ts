export class Constants {

  public static assetIcons = new Map<string, string>([
    ['Vivienda', 'assets/img/house.svg'],
    ['Garaje', 'assets/img/garage.png'],
    ['Nave industrial', 'assets/img/warehouse.png'],
    ['Local comercial', 'assets/img/store.png'],
    ['Finca rústica', 'assets/img/rooster.png'],
    ['Solar', 'assets/img/sun.png'],
    ['Otros', 'assets/img/rooster.png'],
  ]);
}

export enum AssetType {
  Garaje = 'Garaje',
  Vivienda = 'Vivienda',
  LocalComercial = 'Local comercial',
  NaveIndustrial = 'Nave industrial',
  Solar = 'Solar',
  FincaRustica = 'Finca rústica',
  Otros = 'Otros',
}

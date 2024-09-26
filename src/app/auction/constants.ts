export class Constants {

  public static assetIcons = new Map<string, string>([
    ['Vivienda', 'assets/img/house-icon.png'],
    ['Garaje', 'assets/img/garage.png'],
    ['Nave industrial', 'assets/img/warehouse.png'],
    ['Local comercial', 'assets/img/store.png'],
    ['Finca rústica', 'assets/img/rooster.png'],
    ['Solar', 'assets/img/sun.png'],
    ['Trastero', 'assets/img/storage-room.png'],
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
  Trastero = 'Trastero',
  Otros = 'Otros',
}

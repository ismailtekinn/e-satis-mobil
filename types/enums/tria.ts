export enum IndirimTipi {
  YuzdeIndirim = 0, // yüzde indirim
  TutarIndirimi = 1, // tutar indirimi
  OtoYuzdeIndirim = 2, // otomatik yüzde indirimi (müşteri kayıtlı ise)
  ArttirimTutar = 3, // arttırım tutar
  OtoTutarIndirim = 4, // otomatik tutar indirimi (müşteri kayıtlı ise)
}

export enum MüşteriAramaTipi {
  MusteriAdi = 0,
  MusteriSoyadi = 1,
  MusteriKartNo = 2,
  MusteriTcNo = 3,
  MusteriGsm = 4,
  VergiNumarasi = 5,
  VergiDairesi = 6,
  CariId = 7,
}

# Node4F

Projekt bazuje na API udostępnionym dla pracowników 4F. Zapisuje dane JSON w bazie MongoDB. Projekt powstał w zamiarze ułatwienia pracy na salonach sklepów. 

Demo wgrane na prywatny VPS, więc aplikacja pobiera dane z serwera ONLINE. Użyto do tego moduł forever.

## Pobieranie danych o danym modelu (GET)
173.249.20.230:3000/product/m/BLM301?salon=gd8 <br>
dodatkowo: kolor(np. 20S), rozmiar(np. XL) <br>
173.249.20.230:3000/product/m/BLM301?salon=gd8&kolor=20S

## Pobieranie danych o produkcie o danym kodzie (GET)
173.249.20.230:3000/product/5902818800382?salon=gd12

## Pobieranie danych z bazy z danego salonu (GET)
173.249.20.230:3000/salon/gd12

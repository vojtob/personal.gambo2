---
title: "Príprava súboru s priebežnými výsledkami tímu"
weight: 2
---


Spracovanie je v adresári `runProcessing`. Cieľom je mať dva súbory:
* route.json - popis trasy, jednotlivé úseky, jeho vytvorenie je pre každý beh špecifické
* bezci.tsc - zoznam bezcov na jednotlivých úsekoch aj s ich predpokladanými tempami.

Tieto súbory sa zložia dokopy do teamResult.json. Na začiatku sú tam iba očakávané časy, takže čiste krištálová guľa. Postupne pribúdajú reálne dáta a stáva sa z toho záznam priebehu.

Aby to celé fungovalo, potrebujem mať python knižnicu `boto3` - to je AWS API.

![data preparation](/img/crystalBall_dataPreparation.png)

## 1. Popis úsekov a odovzdávok
Vytvorím súbor s úsekmi `route.json`. Tento krok je špecifický pre každý beh, záleží v akom formáte dostaneme popis trasy. Script `legs2csv.py` môžem použiť na export, v ktorom viem jednoducho okontrolovať úseky, že sú správne vyexportované.

**Vltava Run**

1. Skopírujem pdf ako text do `trasa.txt`
1. Spustím `VltavaRun/text2legs.py`, ktorý z toho urobí súbor `route.json`

**The Run**

1. Scrap route to file `scrapRoute.py`
1. Convert scrap to json `scrap2json.py`

### Štruktúra súboru s úsekmi `route.json`

``` JSON
{
    "handovers": [
        {
            "gps": "49.0673939N, 13.6195222E",
            "name": "Zadov – Churánov",
            "detail": "stadion"
        },
        ...
        {
            "gps": "50.0277653N, 14.4008633E",
            "name": "Praha Braník"
        }
    ],
    "legs": [
        {
            "length": "14,10",
            "difficulty": "3",
            "upHill": "160",
            "downHill": "380"
        },
        ...
        {
            "length": "12",
            "difficulty": "1",
            "upHill": "54",
            "downHill": "97"
        }
    ]
}
```



## 2. Priradenie bežcov k úsekom

Vytvorím súbor s bežcami `bezci.tsv`, v ktorom popisujem bežcov a ich tempá na úsekoch. Je to tab separated text, najlepšie export priamo z excelu

### Štruktúra súboru s bežcami `bezci.tsv`

``` HTML
nr.	meno	pace
1	Maťa Hanckova	05:30
2	Braňo Gereg	05:00
3	Vlado Dudlák	05:20
4	Silvia Glesková	06:00
5	Vojto Bálint	04:47
...
```

## 3. Súbor s výsledkami `teamResult.json`

Súbor s úsekmi `route.json` a súbor s bežcami `bezci.tsv` skombinujem dokopy pomocou scriptu `gambo` a príkazu `combine`. Vznikne súbor výsledkov tímu `teamResult.json`. Napríklad:

```Batchfile
python ..\..\..\gambo.utils\gambo.py -d combine 202101 "DXC Dream Team" "Vltava Run 2021" 7:20:00
```

Potom ho potrebujeme dať prepočítať, aby sa doplnili ďalšie atribúty `gambo.py -v recalculate`.

A nahrať ho do dabázy pomocou `gambo.py -v store --AWS`. Ak nedám `--AWS` tak sa ukladá lokálne (to je default), ak zadám, tak prepíše databázu (všetko doteraz sa stratí).

Ešte treba upraviť historickú tabuľku. Ručne editovať súbor dxcHistory.html. Potom ho nahrať na AWS pomocou príkazu

```Batchfile
python gambo.py -d web --AWS history
```


### Štruktúra súboru s úsekmi `teamResult.json`

```JSON
{
	"team": 2019001,
	"name": "DXC Dream Team",
	"race": "Vltava Run 2021",
	"startTimes": {
		0 : "08:20:00"
	},
    "legs": [
        {
            "distance": 14.10,
            "difficulty": 3.5,
            "down": 380,
            "up": 160,
			
            "from": "Zadov – Churánov",
            "gpxfromLat": "49.0673939",
            "gpxfromLng": "13.6195222",
			
            "to": "Lipka",
            "gpxtoLat": "49.0195900",
            "gpxtoLng": "13.7325347",
			
            "runnerName": "Vojto Bálint",
            "plannedTempo": "04:45",
        },
	]
}		
```

### Popis atribútov súboru `teamResult.json`

| Atribút     | Význam |
| :---------- | :----- |
| team           | číslo tímu je kľúč, podľa toho sa vyhľadáva v tabuľke|
| name           | názov tímu |
| startTimes     | úseky, ktoré majú pevne definovaný štart majú tu definované kedy začínajú. Normálne je to iba prvý úsek (index 0), ale napr. pre The Run je tam aj úsek z Tepličky, ktorý má fixný štart, takže by tam bol aj 28: "17:10:00" |
| legs           | Zoznam úsekov. |
| leg.distance   | Dĺžka úseku v km. Musí to byť číslo, nie string, takže musí obsahovať desatinnú bodku, nie čiarku. |
| leg.difficulty | Náročnosť úseku. musí to byť číslo, nie string, takže musí obsahovať desatinnú bodku, nie čiarku. |
| leg.up/down    | Stúpanie a klesanie na úseku v m. Musí to byť celé číslo, nie string. |
| from/to, gpx   | Začiatočný a koncový bod úseku s gps súradnicami. Všetko sú stringy. |
| runnerName     | Musí byť zadané, zobrazujeme pri úseku |
| plannedTempo   | Musí byť zadané, podľa neho a distance sa vypočíta plannedDuration. |
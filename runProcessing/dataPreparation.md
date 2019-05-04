# Príprava podkladov pre beh (popis podľa Vltava Run 2019)

1. **Vytvorím súbor s úsekmi** `exportedLegs.json`, formát je popísaný nižšie. Tento krok je špecifický pre každý beh, záleží v akom formáte dostaneme popis trasy. Script `legs2csv.py` môžem použiť na export, v ktorom viem jednoducho okontrolovať úseky, že sú správne vyexportované.
  * Vltava Run
    1. Skopírujem pdf ako text do `2019-trasa.txt`
    1. Spustím `VltavaRun/text2legs.py`, ktorý z toho urobí súbor `2019-exportedLegs.json`
  * The Run
1. **Vytvorím súbor s bežcami** `bezci.tsv`, v ktorom popisujem bežcov a ich tempá na úsekoch. Je to tab separated text, najlepšie export priamo z excelu
1. Súbor s úsekmi `exportedLegs.json` a súbor s bežcami `bezci.tsv` **skombinujem dokopy** pomocou scriptu `legs_team2results.py` a vznikne súbor **výsledkov tímu** `teamResult.js`. Ten sa potom nahrá do databázy gambo ako základ výsledkov. Ďalšie kroky sú popísané v gambo.


## Formát súboru s úsekmi

``` javascript
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

## Formát súboru s bežcami

```
nr.	meno	pace
1	Maťa Hanckova	05:30
2	Braňo Gereg	05:00
3	Vlado Dudlák	05:20
4	Silvia Glesková	06:00
5	Vojto Bálint	04:47
...
```
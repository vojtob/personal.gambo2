# Kryštálová guľa - ako to funguje?

Vstup je tabuľka s úsekmi, priradenými bežcami a plánovanými tempami, tak ako je to popísané v [príprave dát](dataPreparation.md). Pri každej zmene sa vstupných dát alebo pri zadaní skutočného výkonu, celá tabuľka pre daný team prepočíta. Vypočítajú sa tieto údaje:

| Atribút     | Význam |
| :---------- | :----- |
| realDuration | Ak je zadané, tak sa tento úsek už bežal. Na jeho základe sa vypočíta realTempo a diff. Diff je rozdiel medzi plannedDuration and realDuration. |
| startTime    | O koľkej sa tento úsek začal bežať. Ak ide o niektorý z úsekov, ktoré majú pevne dané štartové časy (zvyčajne iba prvý úsek), tak sa startTime nastaví podľa toho. Ak nie je pevne daný štart na tomto úseku, tak sa zoberie z endTime predchádzajúceho úseku. To znamená, že tento údaj sa nezadáva, vždy sa dopočíta. |
| endTime      | End time, o koľkej sa tento úsek dobehol. Ak je už zabehnutý, tak sa počíta pomocou realDuration, ak nie je zabehnutý, tak pomocou plannedDuration. |
| lastLegDone | Vypočítaný atribút, ktorý pomáha označovať práve bežiaci úsek |
| plan, real, route | Vypočítané údaje o celom behu. Predpočítavajú sa, aby sa vedelo rýchlejšie a jednoduchšie zobrazovať na webe plánovaný čas dobehu, predpokladané priemerné tempo a podobne. |


```javascript
{
	"team": 29
	"name": "DXC Dream Team",
	"startTimes": {
		0 : "08:20:00"
	}
    "legs": [
        {
            "distance": "14,10",
            "difficulty": "3",
            "down": "380",
            "up": "160",
			
            "from": "Zadov – Churánov",
            "gpxfromLat": "49.0673939",
            "gpxfromLng": "13.6195222",
			
            "to": "Lipka",
            "gpxtoLat": "49.0195900",
            "gpxtoLng": "13.7325347",
			
            "runnerName": "bezec 0",
            "plannedTempo": "05:20",

            "plannedDuration": "0:57:17",
            "startTime": "10:00:00",
            "endTime": "0:00:00",
            "realDuration": "",
            "realTempo": "",
            "diff": ""
        }, ...
	]
}		
```
---
title: "Krištálová guľa"
weight: 1
---

## Gambo packages

| Package, File | Popis |
| :------------ | :---- |
| gambo         | Toto je samotná aplikácia, ktorá prepočítava výsledky (javascript). Na AWS sa nahrá ako lambda. |
| gambo.web     | Webové stránky |
| config        | obsahuje `configAWS.js` a `configLocal.js` ktoré definujú prístup na aws alebo testovanie na local. Tieto dva súbory sa kopírujú do distribúcie, podľa nich sa určí či sa ide lokálne alebo na aws. |
| src_doc       | Popis architektúry |
| mockAPI       | aws simulátor pre lokálne spustenie |
| scripts       | obsahuje scripty pre vytvorenie db, deployment, testovanie |
| runProcessing | spracovanie trasy pre jednotlivé behy (TheRun, VltavaRun). |

## Súbory v gambo

![štruktúra zdrojákov](/img/cb_logic.png)

* index - spracovanie parametrov volania resource a mapovanie na metódy v `results` alebo `info`. Rozlišuje GET a POST a rôzne resources. Definuje API rozhranie tak ako to vyžaduje AWS API.
* gambo.core - package s core logikou
* results - Využije `data-access` pre získanie objektu TeamResult. Podľa volanej metódy (nastavovanie plánovaného tempa, skutočného trvania, ...) upraví dáta a potom neche `resultCalculator` spočítať výsledky. Opäť použije `data-access` na uloženie TeamResult do DB.
* **resultCalculator** - Prepočítava výsledky, toto je vlastne samotná biznis logika. Využíva `simpleTime` na prácu s časmi.
* data-access - prístup k dátam, tu sa volajú AWS metódy pre tabuľky
* simpleTime - prevod medzi číselným a textovým vyjadrením času, napr. "01:23:45" je 5025 sekúnd a naopak ... 

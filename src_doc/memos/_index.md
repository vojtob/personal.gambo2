---
title: "Gambo"
---

# GAMBO Nástroje pre štafetové behy

## Krištáľová gula

[Krištálová guľa](/crystalball) slúži hlavne počas pretekov na predikovanie času behu. Zaznamenávajú sa v nej aj reálne časy a teda po pretekoch v nej vidíme históriu.

Celý web sa skladá z týchto stránok

| Súbor         | Popis |
| :------------ | :---- |
| dxcHistory    | Historický prehľad pretekov |
| dxcRun        | Konkrétny pretek podľa úsekov. Počas behu sa píšu aj straty a zisky, aby sme vedeli ako na tom sme. |
| dxcRunner     | Trasa zoskupená podľa bežcov. |

![štruktúra html](/img/cb_files.png)

dxcHistory on [AWS](http://gambo-vojtob.s3-website.eu-central-1.amazonaws.com/dxcHistory.html) [local](file:///C:/Projects_src/Personal/gambo2/scripts/deployLocaly/release/dxcHistory.html)

## Ďalšie nástroje

* [Visualizácia](/minor/visual.md) - vizualizácia všetkých tímov dokopy, ako sa to cez seba prelieva
* [Chatbot](/minor/chatbot.md) - zatiaľ nefunkčný
* [TODO](/minor/todo.md) - čo ešte chceme urobiť

| Adresár             | Popis |
| -------             | ----- |
| gambo               | backend |
| gambo.web           | frontend |
| gambo.visualisation | vizualizácia všetkých tímov dokopy, ako sa to cez seba prelieva |
| gambo.utils         | nástroje pre administráciu |
| runProcessing       | data preparation, scrap webs ... |
| src_doc             | Dokumentácia |
| config              | local and remote config |
| mockAPI             | API, not complete :( |
| scripts             | |
| gambo.runbot        | hranie s FB chatbotom |

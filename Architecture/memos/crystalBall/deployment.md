# Kryštálová guľa - Setup a Deployment


## 1. Pripraviť data v potrebnej štruktúre

Tieto údaje získam parsovaním popisov trás, od organizátorov, z excelov, ... to je špecifické pre každý beh. Cieľom je [vytvoriť dáta](dataPreparation.md) v správnej štruktúre. Samotné spracovanie je v adresári `runProcessing`.

## 2. Nahrať tabuľku do databázy

1. Ak idem lokálne, tak potrebujem mať spustenú lokálnu databázu, to zabezpečí script `scripts\startCmder.bat`
1. V adresári `scripts\DBsetup\` v súbore `sripts.txt` je script pre vyvtorenie tabuľky TeamResults lokálne aj na AWS.
1. Script `storeTeamResultsIntoLocalDB.bat` vytvorí adresár `temp` do ktorého sa nahrajú súbory `fillTableTeam.js` a `gambo.core` a lokálny alebo aws `config`. Potom sa spustí `fillTableTeam.js`, ktorý načíta súbor s úsekmi a nahrá ho do databázy. Tu možno treba zmeniť, aký súbor sa nahrá.

## 3. Lokálne spustenie aplikácie

1. Musím mať spustenú lokálnu databázu, to zabezpečí script `scripts\startCmder.bat`
1. Na záložke lokalApp cmdera spustiť script `scripts\deployLocaly\deployLocaly.bat`. Ten vytvorí adresár `gambo` do ktorého sa nahrajú zdrojáky z `gambo` a súbor `mockAPI\gamboAPI.js` ktorý simuluje aws api (a pri deployi na aws nie je potrebný). Pribalí sa tam `config` s lokálnymi hodnotami. Potom sa spustí mock `gamboAPI.js`, ten obsahuje webserver, ktorý počúva na porte 3000 a simuluje aws.
1. Script zároveň nakopíruje súbor `gambo.web\dxcRun.html` do adresára `web`, pričom v ňom upraví, aby requesty išli na lokálny service `http://localhost:3000`
1. V browseri otvoriť [web\dxcHistory.html](file:///C:/Projects_src/Personal/gambo2/scripts/deployLocaly/release/dxcHistory.html)

![deployment](../img/CrystalBall-deployment-Local.png)

## 4. Deployment na AWS

1. Na záložke aws cmdera spustiť script `scripts\deploy2AWS\deploy2AWS.bat`. Ten vytvorí adresár `gambo` do ktorého sa nahrajú zdrojáky z `gambo`. Pribalí sa tam `config` s aws hodnotami. Celé sa to zozipuje a nahrá na AWS.
1. Script zároveň nakopíruje súbor `gambo.web\dxcRun.html` do adresára `web`, pričom v ňom upraví, aby requesty išli na AWS service `https://5ron7xepdc.execute-api.eu-central-1.amazonaws.com/prod`
1. V browseri otvoriť [AWS - dxcRun.html](http://gambo-vojtob.s3-website.eu-central-1.amazonaws.com/dxcHistory.html)

![deployment](../img/CrystalBall-deployment-AWS.png)
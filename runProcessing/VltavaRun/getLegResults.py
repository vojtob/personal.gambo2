# import requests
# from bs4 import BeautifulSoup
# r = requests.get('https://vltavarun.cz/live/watch-handover/186')
# legResultsHtml = BeautifulSoup(r.text, 'html.parser', from_encoding='utf-8')
# tables = legResultsHtml.find_all('table')
# print(len(tables))

import pandas as pd


folderName = 'runProcessing/VltavaRun'
legResults1 = pd.read_csv(folderName + '/Vltava5.txt', '\t')
legResults = legResults1.dropna(axis=0, how='any')

# print(len(legResults))
# for x in legResults:
#     print(x)
# for i in range(len(legResults)):
teamResults = {}
for index, row in legResults.iterrows():
    # ts = legResults.loc[i]['Čas na úseku']
    ts = row['Čas na úseku']
    t = 0
    if(ts.find('h') > -1):
        t = 60*(int(ts[:ts.find('h')])) + int(ts[ts.find('h')+1:-1])
    else:
        t = int(ts[:-1])
    print("{:<30} {:>8}".format(row['Tým'], t))
    teamResults[row['Tým']] = t

dxc = teamResults['DXC Dream Team']
counter = 0
for team in teamResults:
    if(teamResults[team] < dxc):
        counter += 1

print(counter)

print('DONE')




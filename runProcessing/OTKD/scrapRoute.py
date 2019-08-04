from lxml import html
import requests
import json

legs = []
handovers = []
route = {}
route["handovers"] = handovers
route["legs"] = legs

gpxData = requests.get('https://www.odtatierkdunaju.sk/elite/parts/pins.json').json()

for i in range(36):
    legURL = 'https://www.odtatierkdunaju.sk/elite/parts/part-{legID}/detail.TXT'.format(legID=(i+1))
    # pageRunner = requests.get('https://www.odtatierkdunaju.sk/elite/parts/part-2/runner.TXT')
    # pageVehicle = requests.get('https://www.odtatierkdunaju.sk/elite/parts/part-2/vehicles.TXT')
    # print("legURL: ", legURL)
    legPage = requests.get(legURL)
    legPage.encoding = 'utf-8-sig'
    legData = legPage.text.splitlines()
    # print("legData: ", legData)

    handover = {}
    handover["name"] = legData[0].strip('<br>').strip()
    handover["gps"] = str(gpxData[i]["lat"]) + "N, " + str(gpxData[i]["lng"]) + "E"
    handovers.append(handover)

    leg = {}
    leg["length"] = legData[2].strip('<br>').strip()
    leg["upHill"] = legData[3].strip('<br>').strip()
    leg["downHill"] = legData[4].strip('<br>').strip()
    leg["difficulty"] = legData[5].strip('<br>').strip()[:1]
    legs.append(leg)

# ciel
handover["name"] = legData[1].strip('<br>').strip()
handover["gps"] = str(gpxData[i]["lat"]) + "N, " + str(gpxData[36]["lng"]) + "E"
handovers.append(handover)

print(route)

folderName = './runProcessing/OTKD/res2019'
with open(folderName + '/route.json', 'w', encoding='utf-8') as outfile:
    json.dump(route, outfile, ensure_ascii=False)

print('DONE')
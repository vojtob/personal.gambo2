import json
import pandas as pd

folderName = 'runProcessing/VltavaRun/res2020'
teamID = 202001

# import runners and their paces
runners = pd.read_csv(folderName + '/bezci.tsv', '\t')
# for i in range(36):
#     print("{:>2d}.  {:<20}  {}".format(i, runners.loc[i]['meno'], runners.loc[i]['pace']))

# import legs description
with open(folderName + '/route.json', 'r', encoding='utf8') as f:
    route = json.load(f)

# create team results
teamResult = {}
teamResult["team"] = teamID
teamResult["name"] = "DXC Dream Team"
teamResult["startTimes"] = {}
teamResult["startTimes"][0] = "8:10:00"
teamResult["legs"] = []
    
for i in range(len(route['legs'])):
    legIn = route['legs'][i]
    legOut = {}
    legOut["legID"] = i+1
    legOut["distance"] = round(float('.'.join(legIn['length'].split(","))),2)
    legOut["difficulty"] = round( float(legIn['difficulty'].replace(',','.')),1 )
    legOut["down"] = int(legIn['downHill'])
    legOut["up"] = int(legIn['upHill'])
#    legOut["desc"] = "Popis trasy nemám"

    handover = route['handovers'][i]
    legOut["from"] = handover['name']
    gps = handover["gps"].split(", ")
    legOut["gpxfromLat"] = gps[0][0:-1]
    legOut["gpxfromLng"] = gps[1][0:-1]
    handover = route['handovers'][i+1]
    legOut["to"] = handover['name']
    gps = handover["gps"].split(", ")
    legOut["gpxtoLat"] = gps[0][0:-1]
    legOut["gpxtoLng"] = gps[1][0:-1]

    legOut["runnerName"] = runners.loc[i]['meno']
    parts = runners.loc[i]['pace'].split(':')
    legOut["plannedTempo"] = "{:0>2s}:{:0>2s}".format(parts[0], parts[1])
    
    teamResult["legs"].append(legOut)

with open(folderName + '/teamResult.json', 'w', encoding='utf8') as f:
    f.write(json.dumps(teamResult, ensure_ascii=False, indent=4))
#    print(json.dumps(route, ensure_ascii=False, indent=4))


print("DONE")
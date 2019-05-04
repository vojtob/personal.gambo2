import json
import pandas as pd

# import runners and their paces
runners = pd.read_csv('VltavaRun/res/Vltava Run 2019 - DXC Dream Team - bezci2.tsv', '\t')
# for i in range(36):
#     print("{:>2d}.  {:<20}  {}".format(i, runners.loc[i]['meno'], runners.loc[i]['pace']))

# import legs description
with open('VltavaRun/res/2019-exportedLegs.json', 'r', encoding='utf8') as f:
    route = json.load(f)

# create team results
teamResult = {}
teamResult["team"] = 100
teamResult["name"] = "DXC Dream Team"
teamResult["startTimes"] = {}
teamResult["startTimes"][0] = "7:20:00"
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
    legOut["plannedTempo"] = runners.loc[i]['pace']
    
    teamResult["legs"].append(legOut)

with open('teamResult.js', 'w', encoding='utf8') as f:
    f.write(json.dumps(teamResult, ensure_ascii=False, indent=4))
#    print(json.dumps(route, ensure_ascii=False, indent=4))


print("DONE")
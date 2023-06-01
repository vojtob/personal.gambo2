import json

with open('data.json', 'r', encoding='UTF-8') as inFile:
    data = json.load(inFile)
data = data["data"]

legs = []
handovers = []

# for i in range(1):
for i in range(len(data)):
    d = data[i]
    handover = {}
    # names = d["name_from"].split('-')
    names = d["name"].split('-')
    handover["name"] = names[0].strip()
    if(len(names)>1):
        handover["detail"] = names[1].strip()
    # handover["gps"] = str(d["fromPoint"]["data"]["lat"]) + "N, " + str(d["fromPoint"]["data"]["lng"]) + "E"
    handover["gps"] = str(d["from_point"]["location"]["coordinates"][1]) + "N, " + str(d["from_point"]["location"]["coordinates"][0]) + "E"
    handovers.append(handover)

    leg = {}
    # leg["length"] = str(round(d["distance"]/10)/100).replace(".",",")
    leg["length"] = str(round(d["length"]/10)/100).replace(".",",")
    leg["difficulty"] = str(d["difficulty"])
    leg["upHill"] = str(int(round(d["incline"])))
    leg["downHill"] = str(int(round(d["decline"])))
    # descrpition
    leg["desc"] = d["description"]
    legs.append(leg)

# ciel
d = data[len(data)-1]
handover = {}
# names = d["name_to"].split('-')
names = d["name_next"].split('-')
handover["name"] = names[0].strip()
if(len(names)>1):
    handover["detail"] = names[1].strip()
# handover["gps"] = str(d["toPoint"]["data"]["lat"]) + "N, " + str(d["toPoint"]["data"]["lng"]) + "E"
handover["gps"] = str(d["to_point"]["location"]["coordinates"][1]) + "N, " + str(d["to_point"]["location"]["coordinates"][0]) + "E"
handovers.append(handover)

route = {}
route["handovers"] = handovers
route["legs"] = legs
print(route)

with open('route.json', 'w', encoding='UTF-8') as outfile:
    json.dump(route, outfile, ensure_ascii=False)

print("DONE")
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
    names = d["name_from"].split('-')
    handover["name"] = names[0].strip()
    if(len(names)>1):
        handover["detail"] = names[1].strip()
    handover["gps"] = str(d["fromPoint"]["data"]["lat"]) + "N, " + str(d["fromPoint"]["data"]["lng"]) + "E"
    handovers.append(handover)

    leg = {}
    leg["length"] = str(round(d["distance"]/10)/100).replace(".",",")
    leg["difficulty"] = str(d["difficulty"])
    leg["upHill"] = str(int(round(d["incline"])))
    leg["downHill"] = str(int(round(d["decline"])))
    legs.append(leg)

# ciel
d = data[len(data)-1]
handover = {}
names = d["name_to"].split('-')
handover["name"] = names[0].strip()
if(len(names)>1):
    handover["detail"] = names[1].strip()
handover["gps"] = str(d["toPoint"]["data"]["lat"]) + "N, " + str(d["toPoint"]["data"]["lng"]) + "E"
handovers.append(handover)

route = {}
route["handovers"] = handovers
route["legs"] = legs

for i in range(48):
    legfrom = handovers[i]["name"]
    if 'detail' in handovers[i]:
        legfrom = legfrom + " - " + handovers[i]['detail']
    legto = handovers[i+1]["name"]
    if 'detail' in handovers[i+1]:
        legto = legto + " - " + handovers[i+1]['detail']
    # print('{0}\t{1}\t{2}\t{3}\t{4}\t{5}'.format(
    #     legfrom, legto, 
    #     legs[i]["length"], legs[i]["difficulty"],
    #     legs[i]["upHill"], legs[i]["downHill"]))
    # print(legfrom)
    # print(legto)
    # print(legs[i]["length"])
    # print(legs[i]["difficulty"])
    # print(legs[i]["upHill"])
    print(legs[i]["downHill"])

print("DONE")
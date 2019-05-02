import json

with open('exportedLegs.json', 'r', encoding='utf8') as f:
    route = json.load(f)
    with open('legsLength.csv', 'w') as fOut:
        for i in range(36):
            # leg = route['legs'][i]
            legString = str.format(route['legs'][i]['length'])
            fOut.write(legString)
            fOut.write('\n')

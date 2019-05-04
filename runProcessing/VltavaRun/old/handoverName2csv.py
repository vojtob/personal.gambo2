import json

with open('res/exportedLegs2019.json', 'r', encoding='utf8') as f:
    route = json.load(f)
    with open('res/legs2019.csv', 'w') as fOut:
        for i in range(37):
            # leg = route['legs'][i]
            legString = str.format(route['handovers'][i]['name'])
            fOut.write(legString)
            fOut.write('\n')

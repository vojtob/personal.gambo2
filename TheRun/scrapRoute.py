from lxml import html
import requests
import json

# page = requests.get('https://therun.sk/propozicie#segment-29')
page = requests.get('https://therun.sk/data/track/segments')
data = page.json()
print(data);
with open('data.json', 'w', encoding='UTF-8') as outfile:
    json.dump(data, outfile)
print('****')

# separator = '\t'
# with open('legs.csv', 'w') as fOut:
#     for i in range(48):
#         leg = data[i]
#         points = leg['name'].split(' -> ')
#         legString = str.format("{}{}{}{}{}{}{}{}{}{}{}{}",
#                                i + 1, separator,
#                                points[0], separator,
#                                points[1], separator,
#                                str(leg['distance']).replace('.', ','), separator,
#                                str(leg['incline']).replace('.', ','), separator,
#                                str(leg['decline']).replace('.', ','), separator)
#         fOut.write(legString)
#         fOut.write('\n')

from lxml import html
import requests
import json
import os

print(os.getcwd())


# page = requests.get('https://therun.sk/propozicie#segment-29')
# page = requests.get('https://therun.sk/data/track/segments')
page = requests.get('https://therun.sk/api/v1/run/segments')
data = page.json()
print(data)

with open('data.json', 'w', encoding='UTF-8') as outfile:
    json.dump(data, outfile)

print('DONE')
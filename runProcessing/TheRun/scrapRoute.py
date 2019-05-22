from lxml import html
import requests
import json

# page = requests.get('https://therun.sk/propozicie#segment-29')
page = requests.get('https://therun.sk/data/track/segments')
data = page.json()
print(data)

folderName = './runProcessing/TheRun/res2019'
with open(folderName + '/data.json', 'w', encoding='UTF-8') as outfile:
    json.dump(data, outfile)

print('DONE')
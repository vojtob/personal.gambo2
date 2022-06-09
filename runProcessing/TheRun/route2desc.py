import json
from bs4 import BeautifulSoup

producehtml = True
producetext = True

def outputtext(route):
    with open('routeDesc.txt', 'w', encoding='UTF-8') as descfile:
        for i in range(len(route["legs"])):
            descfile.write('*********\n{0}. {1} - {2}</H1>\n'.format(i+1, route["handovers"][i]["name"], route["handovers"][i+1]["name"]))
            d = BeautifulSoup(route["legs"][i]["desc"], 'html.parser').get_text('\n')
            descfile.write('{0}\n\n'.format(d))

def outputhtml(route):
    with open('routeDesc.html', 'w', encoding='UTF-8') as descfile:
        for i in range(len(route["legs"])):
            descfile.write('<H1>{0}. {1} - {2}</H1>\n'.format(i+1, route["handovers"][i]["name"], route["handovers"][i+1]["name"]))
            descfile.write('{0}\n\n'.format(route["legs"][i]["desc"]))


with open('route.json', 'r', encoding='UTF-8') as inFile:
    route = json.load(inFile)

if producehtml:
    outputhtml(route)
if producetext:
    outputtext(route)

print("DONE")
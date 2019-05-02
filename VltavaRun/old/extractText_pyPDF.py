import PyPDF2
import json

# konverzna tabulka
trnsT = {str(b'\xcb\x9c', encoding='utf8') : 'ň'}
trnsT[str(b'\xc5\x92', encoding='utf8')] = '-'
trnsT[str(b'\xcb\x9a', encoding='utf8')] = 'ž'
trnsT[str(b'\xcb\x9b', encoding='utf8')] = 'č'
trnsT[str(b'\xc3\xad', encoding='utf8')] = 'í'
trnsT[str(b'\xcb\x9d', encoding='utf8')] = 'ř'
trnsT[str(b'\xcb\x99', encoding='utf8')] = 'ě'
trnsT[str(b'\xe2\x88\x92', encoding='utf8')] = 'Š'
trnsT[str(b'\xc4\xb1', encoding='utf8')] = 'š'
transTab = str.maketrans(trnsT)

# read pdf
pdfFileObj = open('propozice2018.pdf', 'rb')
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)

def processHandover(handoverText):
    handover = {}
    # rozdel text po /, tam uz su suradnice
    tag = handoverText.find('/')
    handover['gps'] = handoverText[tag+2:]
    handoverText = handoverText[:tag]
    # ak sa da rozdel na nazov a detail
    tag = handoverText.find(',')
    if(tag > -1):
        handover['name'] = handoverText[:tag]
        handover['detail'] = handoverText[tag+2:]
    else:
        handover['name'] = handoverText
    return handover

def processLeg(legText):
    leg = {}

    tag = legText.find('Trasaa')
    leg['runner'] = legText[:tag].strip()
    legText = legText[tag + 9:]

    tag = legText.find('Délka')
    leg['car'] = legText[:tag].strip()
    legText = legText[tag + 5:]

    tag = legText.find('km')
    leg['length'] = legText[:tag].strip()
    legText = legText[tag + 2:]

    tag = legText.find('Náro')
    if(tag == 0):
        tag = legText.find('Povrch')
        leg['difficulty'] = legText[20:tag].strip()
        legText = legText[tag + 6:]
    else:
        leg['difficulty'] = legText[:tag]
        tag = legText.find('Povrch')
        legText = legText[tag + 6:]

    tag = legText.find('Stoup')
    leg['surface'] = legText[:tag].strip()
    legText = legText[tag + 9:]

    tag = legText.find('Kles')
    leg['upHill'] = legText[:tag-3].strip()
    legText = legText[tag + 8:]

    tag = legText.find(' m')
    leg['downHill'] = legText[:tag].strip()

    return leg

def processPage(pageText, route):
    # Ignoruj stranu az po text Start
    pageText = pageText[pageText.find('Start')+6:]
    tag = pageText.find('Cíl')
    route['handovers'].append(processHandover(pageText[:tag]))
    pageText = pageText[tag+3:]
    # ignoruj ciel
    tag = pageText.find('Trasab')
    route['legs'].append(processLeg(pageText[tag+10:]))
    return route

# with open('exportedLegs.json', 'w', encoding='UTF-8') as f:
route = { 'handovers' : [], 'legs' : []}

with open('res/exportedLegs.json', 'w', encoding='utf8') as f:
    for pageNumber in range(36) :
        pageObj = pdfReader.getPage(2+2*pageNumber)
        text = pageObj.extractText()
        text = text.translate(transTab)
        print(text)
        route = processPage(text, route)
    # f.write(json.dumps(route, ensure_ascii=False, indent=4))
print(json.dumps(route, ensure_ascii=False, indent=4))

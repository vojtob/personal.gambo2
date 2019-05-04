import json
import re

def processPage(pageNumber, pageLines, route):
    pageNumber += 1
#    print("********* PROCESSING PAGE " + str(pageNumber) + "************")
#    print(pageLines)
        
    leg = {}
    processed = []

    for line in pageLines:
        line = line.strip()
        if(('START' in line) or ('CÍL' in line) or
        ('TRASA' in line) or ('BEŽCE' in line) or
        ('AUTA' in line) or ('PARKOVÁNÍ' in line) or
        ('DÉLKA' in line) or ('NÁROCNOST' in line) or
        ('POVRCH' in line) or ('PREVÝŠENÍ' in line) or
        ('PRESPÁNÍ' in line)):
            continue
#        print(line)
        if not "START" in processed:
            # start zakazdym
#            print("START: " + line)
            route['handovers'].append(line)
            processed.append("START")
        elif not "CIEL" in processed:
            processed.append("CIEL")
            # ciel iba pri poslednom useku
            if (pageNumber == 36):
#                print("CIEL: " + line)
                route['handovers'].append(line)
        elif ((not "DIFF" in processed) and (re.fullmatch("\d*,?\d*", line))):
            # narocnost
#            print("narocnost")
            leg['difficulty'] = line.strip()
            processed.append("DIFF")
        elif ((not "LENGTH" in processed) and re.fullmatch("\d*,?\d* km", line)):
#            print("LENGTH")
            leg['length'] = re.fullmatch("(\d*,?\d*) km", line).group(1)
            processed.append("LENGTH")
        elif (re.fullmatch("stoupání \d* m", line)):
#            print("up")
            leg['upHill'] = re.fullmatch("stoupání (\d*) m", line).group(1)
        elif (re.fullmatch("klesání \d* m", line)):
#            print("down")
            leg['downHill'] = re.fullmatch("klesání (\d*) m", line).group(1)
#        else:
#            print("NIC")

    route['legs'].append(leg)
    return route

def processSurface(lineText, leg):
    # print('Proces surface: ', lineText)
    tag = lineText.find('Povrch')
    leg['surface'] = lineText[tag+len('Povrch'):].strip()
    return leg


route = { 'handovers' : [], 'legs' : []}

with open('res/2019-trasa.txt', 'r', encoding="utf8") as fInput:
    with open('res/2019-exportedLegs.json', 'w', encoding='utf8') as f:
        # skip until Propozice Vltava Run 2018
        while True:
            line = fInput.readline()
            if ('START' in line):
                break
            
        pages = []
        pageLines = [];
        pageLines.append(line);
        line = fInput.readline()
        
        while line:
            if('START' in line):
                pages.append(pageLines)
                pageLines = []
            pageLines.append(line);
            line = fInput.readline()
        pages.append(pageLines)
        
        print(len(pages))
        pageNumber = 0
#        processPage(pageNumber, pages[pageNumber], route)
        for pageLines in pages:
            route = processPage(pageNumber, pageLines, route)           
            pageNumber += 1
        
        f.write(json.dumps(route, ensure_ascii=False, indent=4))
# print(json.dumps(route, ensure_ascii=False, indent=4))

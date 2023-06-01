from pathlib import Path
import os
import shutil
import subprocess
import json
from decimal import Decimal
import pandas as pd
import boto3

def combineRunnersWithRoute(args):
    if args.file:
        runnersfilename = args.file
    else:
        runnersfilename = 'bezci.tsv'
    runners = pd.read_csv(runnersfilename, sep='\t')
    # for i in range(36):
    #     print("{:>2d}.  {:<20}  {}".format(i, runners.loc[i]['meno'], runners.loc[i]['pace']))
    # import legs description
    with open('route.json', 'r', encoding='utf8') as f:
        route = json.load(f)

    # create team results
    teamResult = {}
    teamResult["team"] = int(args.teamID)
    teamResult["name"] = args.teamName
    teamResult["race"] = args.raceName
    teamResult["startTimes"] = {}
    teamResult["startTimes"][0] = args.startTime
    if args.additionalStartTimes:
        i = 0
        while i < len(args.additionalStartTimes):
            teamResult["startTimes"][args.additionalStartTimes[i]] = args.additionalStartTimes[i+1]
            i = i+2
    teamResult["legs"] = []
    for i in range(len(route['legs'])):
        legIn = route['legs'][i]
        legOut = {}
        legOut["legID"] = i+1
        legOut["distance"] = round(float('.'.join(legIn['length'].split(","))),2)
        legOut["difficulty"] = round( float(legIn['difficulty'].replace(',','.')),1 )
        legOut["down"] = int(legIn['downHill'])
        legOut["up"] = int(legIn['upHill'])
    #    legOut["desc"] = "Popis trasy nemám"

        handover = route['handovers'][i]
        legOut["from"] = handover['name']
        gps = handover["gps"].split(", ")
        legOut["gpxfromLat"] = gps[0][0:-1]
        legOut["gpxfromLng"] = gps[1][0:-1]
        handover = route['handovers'][i+1]
        legOut["to"] = handover['name']
        gps = handover["gps"].split(", ")
        legOut["gpxtoLat"] = gps[0][0:-1]
        legOut["gpxtoLng"] = gps[1][0:-1]

        legOut["runnerName"] = runners.loc[i]['meno']
        parts = runners.loc[i]['pace'].split(':')
        legOut["plannedTempo"] = "{:0>2s}:{:0>2s}".format(parts[0], parts[1])
        
        teamResult["legs"].append(legOut)

    with open('teamResult.json', 'w', encoding='utf8') as f:
        f.write(json.dumps(teamResult, ensure_ascii=False, indent=4))       


def recalculateResults(args):
    '''Reads teamResult.json from curent directory, recalculates it and store as teamResult2.json'''
    
    # prepare data
    gh = args.gambohome
    jspath = args.jspath
    jspath.mkdir(parents=True, exist_ok=True)
    shutil.copy(Path(gh, 'gambo', 'gambo.core', 'resultCalculator.js'), jspath / 'resultCalculator.js')
    shutil.copy(Path(gh, 'gambo', 'gambo.core', 'simpleTime.js'), jspath / 'simpleTime.js')
    shutil.copy(Path(gh, 'gambo.utils', 'recalculate.js'), jspath / 'recalculate.js')
    shutil.copy(Path('teamResult.json'), jspath / 'teamResult.json')
    # shutil.copytree(Path(gh, 'gambo'), jspath / 'gambo')

    # recalculate
    mypath = os.getcwd()
    os.chdir(jspath)
    if args.debug:
        print('CWD changed to', os.getcwd())
    cmd = 'node ./recalculate.js'
    if args.verbose:
        print('call', cmd)
    subprocess.run(cmd, shell=False)
    os.chdir(mypath)
    if args.debug:
        print('CWD changed back to', os.getcwd())
    shutil.copy(jspath / 'teamResult2.json', Path('teamResult2.json'))
    if args.verbose:
        print('team result recalculated')
    
def storeResultAWS(args):
    '''store team result into AWS'''
    # read file
    if args.debug:
        print('nacitavam subor teamResult2.json v adresari', os.getcwd())
    p = Path('teamResult2.json')
    if not p.exists():
        print('nenasiel som súbor:', p)
        exit()
    with open(p, 'r', encoding='utf8') as f:
        results = json.load(f, parse_float=Decimal)
        if args.debug:
            print('subor nacitany')
            print(results)

    # store into db
    db = boto3.resource('dynamodb')
    table = db.Table('TeamResults')
    dbresult = table.put_item(Item=results)
    print(dbresult)
    # print(table.scan(AttributesToGet=['team',],))

def storeResultsLocaly(args):
    print('NOT IMPLEMENTED store results localy') 
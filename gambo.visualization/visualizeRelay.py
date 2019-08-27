import numpy as np
import pandas as pd
import cv2 as cv2

import simpleTime as st

def getTeams():
    folderName = 'runProcessing/OTKD/res2019'
    results = pd.read_csv(folderName + '/results.txt', '\t')
    results.dropna(subset=['Výsledný čas tímu'], inplace=True)
    # print(results.count())

    teams = []
    for index, row in results.iterrows():
        team = {}
        team['ID'] = row['#']
        team['name'] = row['Názov tímu']
        team['startTime'] = row['Čas štartu'][10:] + ':00'
        team['startTimeNumber'] = st.timeToSec(team['startTime'])
        team['resultTime'] = row['Výsledný čas tímu']
        team['resultTimeNumber'] = st.timeToSec(team['resultTime'])
        teams.append(team)

    def getStartTime(elem):
        return elem['startTimeNumber']
    teams.sort(key=getStartTime)

    return teams


teams = getTeams()
startTime = st.timeToSec("23:59:59")
endTime= 0
for team in teams:
    if(team['startTimeNumber'] < startTime):
        startTime = team['startTimeNumber']
    if((team['startTimeNumber']+team['resultTimeNumber']) > endTime):
        endTime = team['startTimeNumber']+team['resultTimeNumber']

videoDuration = 30
width = 1280
height = 720
FPS = 24
fourcc = cv2.VideoWriter_fourcc(*'MP42')
video = cv2.VideoWriter('./relay'+str(videoDuration)+'.avi', fourcc, float(FPS), (width, height))

for frameIndex in range(FPS*videoDuration):
    # convert frame to time, 
    # time start at relayStartTime (relayTimes[0])
    # duration is relayTimes[2]
    t = int(startTime + (frameIndex*(endTime-startTime))/(FPS*videoDuration) )

    # create white frame
    frame = np.full((height, width, 3), 255, dtype=np.uint8)
    # for each time calculate position and add circle into frame
    for teamID in range(len(teams)):
        # percentage of route of team
        team = teams[teamID]
        ts = team['startTimeNumber']
        te = team['resultTimeNumber']+ts
        if(t <= ts):
            p = 0
        elif(t >= te):
            p = 1
        else:
            p = (t-ts)/(te-ts)
        # p = (frameIndex)/(FPS*videoDuration)
        # x position (distance) is percentage position of team in given time
        x = int(p*width)
        # y position (start time of team) is equal of teamID   
        y = int((teamID/len(teams))*height)
        if(team['name'] == 'Felix'):
            c = (200,0,0)
            r = 6
        else:
            c = (0,0,200)
            r = 3
        cv2.circle(frame, (x,y), r, c, -1)

    # add frame to video
    video.write(frame)

video.release()

print('DONE')
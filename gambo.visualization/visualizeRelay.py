import numpy as np
import pandas as pd
import cv2 as cv2

import simpleTime as st
import readRaceData as readRaceData

def getRawFrame(resultsFrame, time, teams, highlightedTeam='xsdoig35nv8'):
    '''draw results in a particular time. No margin, no axis, only team positions returned'''

    height, width = resultsFrame.shape[:2]
    # for each time calculate position and add circle into frame
    for teamID, team in enumerate(teams):
        # team start time
        ts = team['startTimeNumber']
        # team end time
        te = team['durationNumber']+ts
        # calculate team position - x axis
        if(t <= ts):
            #if the team have not started yet
            x = 0 
        elif((te-t) <= 300):
            # if the team is in finish already
            x = width 
        else:
            # percentage of route for the team
            p = (t-ts)/(te-ts) 
            x = int(p*width)
        # y position (start time of team) is equal of teamID   
        y = int((teamID/len(teams))*height)

        if(team['name'] == highlightedTeam):
            cv2.circle(resultsFrame, (x,y), 6, (200,0,0), -1)
        else:
            cv2.circle(resultsFrame, (x,y), 3, (0,0,200), -1)

    return resultsFrame

def getDecoratedFrame(resultWidth, resultHeight, margin, time, teams, highlightedTeam='xsdoig35nv8'):
    '''create frame with border, axis, ... and add team positions in a given time'''
    fullWidth  = resultWidth  + 2*margin
    fullHeight = resultHeight + 2*margin
    legsCount = 36
    colorGray = (230,230,230)
    colorAxes = (100,100,100)

    # create empty white frame
    frame = np.full((fullHeight, fullWidth, 3), 255, dtype=np.uint8)
    # add distance separators
    for d in np.linspace(0, resultWidth, legsCount+1):
        cv2.line(frame, (int(d)+margin,0+margin), (int(d)+margin,resultHeight+margin), colorGray, 1)
    # add axes
    cv2.line(frame, (0+margin,resultHeight+margin), (resultWidth+margin,resultHeight+margin), colorAxes, 1) # x axis
    cv2.line(frame, (0+margin,0+margin), (0+margin,resultHeight+margin), colorAxes, 1) # y axis
    font = cv2.FONT_HERSHEY_SIMPLEX
    cv2.putText(frame, 'Distance', (fullWidth//2,margin+margin//2+resultHeight), font, 1, colorAxes, 2, cv2.LINE_AA)

    resultsFrame = getRawFrame(frame[margin:(margin+resultHeight), margin:(margin+resultWidth)], time, teams, highlightedTeam)
    frame[margin:(margin+resultHeight), margin:(margin+resultWidth)] = resultsFrame
    return frame


# raceName = 'otkd2019'
# teamName = 'Felix'
raceName = 'vltava2019'
teamName = 'DXC Dream Team'
videoDuration = 20

videoName = readRaceData.getFileName(raceName, videoDuration)
print('start processing ... ', videoName)

teams = readRaceData.getTeam(raceName)
# find when the race started = the earliest start time
# find when the race finished = the latest finish time
startTime = st.timeToSec("23:59:59")
endTime= 0
for team in teams:
    if(team['startTimeNumber'] < startTime):
        startTime = team['startTimeNumber']
    if((team['startTimeNumber']+team['durationNumber']) > endTime):
        endTime = team['startTimeNumber']+team['durationNumber']

FPS = 24
resultWidth = 1280
resultHeight = 720
margin = 50

fourcc = cv2.VideoWriter_fourcc(*'MP42')
video = cv2.VideoWriter(videoName, fourcc, float(FPS), (2*margin+resultWidth,2*margin+resultHeight))

for frameIndex in range(FPS*videoDuration):
    # convert frame to time
    t = int(startTime + (frameIndex*(endTime-startTime))/(FPS*videoDuration) )
    # add frame to video
    frame = getDecoratedFrame(resultWidth, resultHeight, margin, t, teams, teamName)
    video.write(frame)

video.release()

print('DONE', videoName)
cardCode = []
functionCode = []

def generateCard(resourceName, parameterName, cardHeader, iconName, cardInfo, dataInfo):
    cardName = resourceName + parameterName
    cardCode.append('<div class="card border-success">')
    cardCode.append('<h5 class="card-header">')
    cardCode.append('<a data-toggle="collapse" href="#' + cardName + 'Collapse" ' +
        'id="' + cardName + 'Heading" aria-expanded="false" ' +
        'aria-controls="' + cardName + 'Collapse" class="d-block">')
    cardCode.append('<i class="' + iconName + '"></i> ' + cardHeader)
    cardCode.append('</a>')
    cardCode.append('</h5>')
    cardCode.append('<div id="' + cardName + 'Collapse" class="collapse" aria-labelledby="' + cardName + 'Heading">')
    cardCode.append('<div class="card-body">')
    if(cardInfo):
        cardCode.append('<p class="card-text">' + cardInfo + '</p>')
    cardCode.append('<form class="form-inline">')
    cardCode.append('<div class="input-group mb-2 mr-sm-2">')
    cardCode.append('<div class="input-group-prepend">')
    cardCode.append('<div class="input-group-text">')
    cardCode.append('<i class="fas fa-list-ol"></i>')
    cardCode.append('</div>')
    cardCode.append('</div>')
    cardCode.append('<input type="text" class="form-control" id="' + cardName + 'LegID" placeholder="číslo úseku 1,2, ..."/>')
    cardCode.append('</div>')
    cardCode.append('<div class="input-group mb-2 mr-sm-2">')
    cardCode.append('<div class="input-group-prepend">')
    cardCode.append('<div class="input-group-text">')
    cardCode.append('<i class="' + iconName + '"></i>')
    cardCode.append('</div>')
    cardCode.append('</div>')
    cardCode.append('<input type="text" class="form-control" id="' + cardName + 'Data" placeholder="' + dataInfo + '"/>')
    cardCode.append('</div>')
    cardCode.append('<button type="button" id="set' + cardName + 'Btn" class="btn btn-success mb-2" onclick="set' + cardName + '()">Nastav ' + cardHeader.lower() + '</button>')
    cardCode.append('</form>')
    cardCode.append('</div>')
    cardCode.append('</div>')
    cardCode.append('</div>')

def generateFunction(functionName, resourceName, parameterName):
    functionCode.append('function set' + functionName + '() {') 
    functionCode.append('console.log("POST ' + functionName + '");')
    functionCode.append('var teamID = $("body").data("teamID");')
    functionCode.append('var legID = document.getElementById("' + functionName + 'LegID").value;')
    functionCode.append('var data = document.getElementById("' + functionName + 'Data").value;')
    functionCode.append('  console.log("POST ' + resourceName + ' ' + functionName +  ' " + data + " on leg " + legID);')
    functionCode.append('$.post(serviceAddress + "/' + resourceName + '?teamID=" + teamID + "&legID=" + legID + "&' + parameterName + '=" + data, function (response, status) {')
    functionCode.append('console.log("POST response: " + JSON.stringify(response));')
    functionCode.append('console.log("Status: " + status);')
    functionCode.append('});')
    functionCode.append('}')


generateCard('planTempo', 'Plánované tempo', 'fa fa-tachometer-alt', None, 'Plánované tempo 05:13')
generateFunction('planTempo', 'plan', 'tempo')
generateCard('planStart', 'Čas štartu', 'fas fa-flag-checkered', 'Ak je zadané, tak sa nastaví štartový čas na tomto úseku. Štart je úsek 1, Teplička je 29. Ak nie je zadaný čas, tak sa na úseku vymaže plánovaný štart (ak zadáte omylom na iný úsek).', 'Čas štartu, napr. 10:20:00')
generateFunction('planStart', 'plan', 'startTime')
generateCard('planRunner', 'Bežec na úseku', 'fa fa-running', 'Zadaj číslo úseku a meno bežca.', 'Bežec, napr. Janko Hraško')
generateFunction('planRunner', 'plan', 'runner')
generateCard('planDistance', 'Dĺžka úseku', 'fas fa-arrows-alt-h', 'Ak má niekto v skutočnosti dlhší úsek ako hovorili propozície a teda mu to kazí tempo, tu sa dá nastaviť dĺžka úseku.', 'Dĺžka úseku, napr. 12.4')
generateFunction('planDistance', 'plan', 'dist')
generateCard('realDuration', 'Skutočná doba behu', 'fas fa-stopwatch', 'Ako dlho sa bežal úsek. Ak sa nezadá čas, tak sa dobeh na tomto úseku vymaže (ak niekto zadal omylom). Nová hodnota prepíše starú, nič sa nezálohuje, nedá sa to vrátiť späť!', 'Trvanie behu, napr. 0:35:19')
generateFunction('realDuration', 'results', 'legDuration')

# print('\n'.join(cardCode))
# print('\n'.join(functionCode))

folderName = '../../gambo.web'
with open(folderName + '/dxcSetup.html', 'r', encoding='utf8') as fIn:
    with open('release/dxcSetup.html', 'w', encoding='utf8') as fOut:
        for l in fIn:
            if (l.find('<!-- SETUP CARDS -->') > -1):
                # generated cards
                fOut.write('\n'.join(cardCode))
            elif (l.find('// SETUP FUNCTIONS') > -1):
                # generated functions
                fOut.write('\n'.join(functionCode))
            else:
                # normal line
                fOut.write(l)

print('DONE')
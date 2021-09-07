from pathlib import Path
import boto3
from botocore.exceptions import ClientError

def __generateCard(resourceName, parameterName, cardHeader, iconName, cardInfo, dataInfo):
    cardName = resourceName + parameterName
    cardCode = []
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
    cardCode.append('<button type="button" id="set' + cardName + 'Btn" class="btn btn-success mb-2" onclick="setTeamData(\''+ resourceName + '\', \'' + parameterName +'\')">Nastav ' + cardHeader.lower() + '</button>')
    cardCode.append('</form>')
    cardCode.append('</div>')
    cardCode.append('</div>')
    cardCode.append('</div>')
    return cardCode

def prepareSetupPage(args):
    cardCode = []
    cardCode.extend(__generateCard('plan', 'tempo',    'Plánované tempo', 'fa fa-tachometer-alt', 'Zmena plánovaného tempa', 'Plánované tempo 05:13'))
    cardCode.extend(__generateCard('plan', 'startTime',    'Čas štartu', 'fas fa-flag-checkered', 'Ak je zadané, tak sa nastaví štartový čas na tomto úseku. Štart je úsek 1, Teplička je 29. Ak nie je zadaný čas, tak sa na úseku vymaže plánovaný štart (ak zadáte omylom na iný úsek).', 'Čas štartu, napr. 10:20:00'))
    cardCode.extend(__generateCard('plan', 'runner',   'Bežec na úseku', 'fa fa-running', 'Zadaj číslo úseku a meno bežca.', 'Bežec, napr. Janko Hraško'))
    cardCode.extend(__generateCard('plan', 'dist', 'Dĺžka úseku', 'fas fa-arrows-alt-h', 'Ak má niekto v skutočnosti dlhší úsek ako hovorili propozície a teda mu to kazí tempo, tu sa dá nastaviť dĺžka úseku.', 'Dĺžka úseku, napr. 12.4'))
    cardCode.extend(__generateCard('results', 'legDuration', 'Skutočná doba behu', 'fas fa-stopwatch', 'Ako dlho sa bežal úsek. Ak sa nezadá čas, tak sa dobeh na tomto úseku vymaže (ak niekto zadal omylom). Nová hodnota prepíše starú, nič sa nezálohuje, nedá sa to vrátiť späť!', 'Trvanie behu, napr. 0:35:19'))
    
    with open(str(Path(args.gambohome, 'gambo.web', 'dxcSetupTemplate.html')), 'r', encoding='utf8') as fIn:
        with open(str(Path(args.gambohome, 'gambo.web', 'dxcSetup.html')), 'w', encoding='utf8') as fOut:
            for l in fIn:
                if (l.find('<!-- SETUP CARDS -->') > -1):
                    # generated cards
                    fOut.write('\n'.join(cardCode))
                else:
                    # normal line
                    fOut.write(l)

def deployWebAWS(args):
    s3_client = boto3.client('s3')
    pages = []
    if args.pages in ('all', 'history'):
        pages.append('dxcHistory.html')
    if args.pages in ('all', 'route'):
        pages.append('dxcRoute.html')
    if args.pages in ('all', 'runner'):
        pages.append('dxcRunner.html')
    if args.pages in ('all', 'setup'):
        prepareSetupPage(args)
        pages.append('dxcSetup.html')
    try:
        for p in pages:
            if args.verbose:
                print('copy page', p)
            response = s3_client.upload_file(
                str(Path(args.gambohome, 'gambo.web', p)), 'gambo-vojtob', p, 
                ExtraArgs={'ContentType' : "text/html"})
            print(response)
    except ClientError as e:
        print(e)

def deployWebLocaly(args):
    print('NOT IMPLEMENTED deploy web localy')    

from pathlib import Path
import os
import argparse
import prepareData
import prepareWeb

def __setup(parser):
    args = parser.parse_args()
    if args.debug:
        args.verbose = True
    args.gambohome = os.environ.get('GAMBO_HOME')
    args.jspath = Path(args.gambohome, 'temp', 'localjs')
    if args.debug:
        print(args)
    return args

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='prepare team data and store it into database. Run in a folder containg team data.')
    parser.add_argument('-v', '--verbose', help='to be more verbose', action='store_true')
    parser.add_argument('-d', '--debug', help='add debug info, very low level', action='store_true')
    subparsers = parser.add_subparsers(help='command help')

    parser_clean = subparsers.add_parser('clean', help='clean all generated files and folders')
    parser_clean.set_defaults(command='clean')

    parser_combine = subparsers.add_parser('combine', help='combine runners with route and create team results')
    parser_combine.set_defaults(command='combine')
    parser_combine.add_argument('teamID', help='name of documentation')
    parser_combine.add_argument('teamName', help='name of documentation')
    parser_combine.add_argument('raceName', help='name of documentation')
    parser_combine.add_argument('startTime', help='Čas štartu, napr. 8:10:00')
    parser_combine.add_argument('additionalStartTimes', nargs='*', help='ďalšie štartovacie časy, napr. pre The Run aj úsek v Tepličke. Zadáva sa index (od 0) a čas, napr. 28, 15:30:00')
    parser_combine.add_argument('-f', '--file', help='specific runners file')

    parser_recalculate = subparsers.add_parser('recalculate', help='recalculate teamResult.json into teamResult2.json')
    parser_recalculate.set_defaults(command='recalculate')

    parser_store = subparsers.add_parser('store', help='store team results into DB')
    parser_store.add_argument('--AWS', action='store_true', help='set enviroment to AWS, default is local')
    parser_store.set_defaults(command='store')

    parser_deployweb = subparsers.add_parser('web', help='deploy web')
    parser_deployweb.add_argument('--AWS', action='store_true', help='set enviroment to AWS, default is local')
    parser_deployweb.add_argument('pages', help='history, route, runner, setup, all')
    parser_deployweb.set_defaults(command='web')

    args = __setup(parser)

    if args.command=='combine':
        prepareData.combineRunnersWithRoute(args)
    if args.command=='recalculate':
        prepareData.recalculateResults(args)
    if args.command=='store':
        if args.AWS:
            prepareData.storeResultAWS(args)
        else:
            prepareData.storeResultsLocaly(args)
    if args.command=='web':
        if args.AWS:
            prepareWeb.deployWebAWS(args)
        else:
            prepareWeb.deployWebLocaly(args)
        
    print('add user DONE')
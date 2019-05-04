prefix = 'C:\Projects_src\gambo2\\'

with open('C:\Projects_src\gambo2\\vltava.GPX', 'w') as  fOut:
    for i in range(1, 37):
        fileName = 'C:\Projects_src\gambo2\\{:02d}.GPX'.format(i)
        print(fileName)
        printOut = False
        with open(fileName, encoding='UTF-8') as  f:
            for line in f:
                if(line.find('/trkseg')>-1):
                    printOut = False
                if(printOut):
                    fOut.write(line)
                if(line.find('<trkseg')>-1):
                    printOut = True


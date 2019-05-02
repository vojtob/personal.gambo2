#include <MsgBoxConstants.au3>

Local $hWnd = WinWaitActive("[CLASS:VirtualConsoleClass]");
Local $projectDir = $CmdLine[1];
Sleep(200);

; setup utils tab
Send("cd " & $projectDir & "\scripts{ENTER}");
Sleep(200);
Send("{F2}gambo{ENTER}");
Sleep(200);
Send("cls{ENTER}");
Sleep(200);

; setup DB tab
Send("^t");
Sleep(500);
Send("{TAB}C:/prg/dynamo{ENTER}");
Sleep(1000);
Send("{F2}DB{ENTER}");
Sleep(200);
Send("java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb{ENTER}");
Sleep(200);

; setup DB tab
Send("^t");
Sleep(500);
Send("{TAB}C:/Projects_src/Personal/gambo2/scripts/deployLocaly{ENTER}");
Sleep(1000);
Send("{F2}lokalApp{ENTER}");
Sleep(200);
Send("deployLocaly.bat");
Sleep(200);
Send("^{TAB}");

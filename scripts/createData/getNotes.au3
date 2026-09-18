#include <MsgBoxConstants.au3>

$excelWindowName = "160415-THE_RUN-ETAPOVE_LISTY.xlsx - Excel";
$notepadWindowName = "*new 2 - Notepad++";

WinWaitActive($excelWindowName);

For $i = 1 To 24
	Send("^{HOME}");
	Sleep(200);
	Send("{DOWN 29}");
	Sleep(100);

	Send("{SHIFTDOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{DOWN}{SHIFTUP}");
	Sleep(100);
	Send("^c");
	Sleep(500);

	WinActivate($notepadWindowName);
	Sleep(1500);
	Send("^v");
	Sleep(200);
	Send("{ENTER 5}");
	Sleep(500);

	WinActivate($excelWindowName);
	Sleep(300);
	Send("^{PGDN}");
Next
#include <MsgBoxConstants.au3>

WinWaitActive("ETAPOVY_LIST.xlsx - Excel");
Send("^{HOME}");
Sleep(200)

For $i = 1 To 48
	$mapName = StringFormat("%02d", $i) & ".png";

	; select cell
	For $j=1 To 2
		Send("{DOWN}");
		Sleep(50);
	Next;

	;insert picture
	Send("!n");
	Send("p");
	Sleep(1500);
	Send($mapName);
	Sleep(200);
	Send("{ENTER}");
	Sleep(1500);

	;resize
	MouseClick("left", 1243, 347);
	Sleep(100);
	MouseClick("left", 1243, 347);
	Sleep(100);
	MouseClick("left", 1243, 347);
	Sleep(100);

	;move selection to home
	MouseClick("left", 964, 303);
	Sleep(100);
	Send("^{HOME}");
	Sleep(200)

	;go to next sheet
	Send("^{PGDN}");
	Sleep(200)
	Send("^{HOME}");
	Sleep(200)
Next
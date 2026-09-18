#include <MsgBoxConstants.au3>

WinWaitActive("ETAPOVY_LIST.xlsx - Excel");

For $i = 47 To 1 Step -1
	$leg = StringFormat("%02d", $i);

	;create sheet
	MouseClick("right", 86, 666);
	Sleep(300);
	Send("{DOWN}");
	Sleep(50);
	Send("{DOWN}");
	Sleep(50);
	Send("{DOWN}");
	Sleep(50);
	Send("{DOWN}");
	Sleep(50);
	Send("{ENTER}");
	Sleep(1000);
	Send("!c");
	Sleep(150);
	Send("{ENTER}");
	Sleep(1000);

	;rename sheet
	MouseClick("right", 86, 666);
	Sleep(300);
	Send("{DOWN}");
	Sleep(50);
	Send("{DOWN}");
	Sleep(50);
	Send("{DOWN}");
	Sleep(50);
	Send("{ENTER}");
	Sleep(200);
	Send($leg);
	Sleep(150);
	Send("{ENTER}");
	Sleep(300);

	;leg number
	Send("^{HOME}");
	Sleep(500);
	Send("{DOWN}");
	Sleep(50);
	Send($leg);
	Sleep(150);
	Send("{ENTER}");
	Sleep(1000);
Next
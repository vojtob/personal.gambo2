WinWaitActive("ETAPOVY_LIST.xlsx - Excel");

For $i = 1 To 48
	Send("{DOWN}");
	Sleep(50);
	Send("{DOWN}");
	Sleep(50);
	Send("{DOWN}");
	Sleep(50);
	Send("{DOWN}");
	Sleep(50);
	Send("{DOWN}");
	Sleep(50);
	MouseClick("left", 60, 600);
	Sleep(100);
	Send("{DEL}");
	Sleep(1000);
	Send("^{PGDN}");
	Sleep(200)
	MouseClick("left", 1100, 330);
	Sleep(200)
	Send("^{HOME}");
	Sleep(200)
Next
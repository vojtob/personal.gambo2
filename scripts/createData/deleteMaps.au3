WinWaitActive("ETAPOVY_LIST.xlsx - Excel");

For $i = 1 To 48
	If (PixelGetColor(50,330) <> 0xFFFFFF) Then
		MouseClick("left", 50, 330);
		Sleep(100);
		Send("{DEL}");
		Sleep(1000);
	EndIf
	Send("^{PGDN}");
	Sleep(200)
	MouseClick("left", 1100, 330);
	Sleep(200)
	Send("^{HOME}");
	Sleep(200)
Next
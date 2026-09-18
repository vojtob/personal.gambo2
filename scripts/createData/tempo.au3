Func ChangeFormat()
	Send("{F2}");
	Sleep(200);
	Send("{BACKSPACE}{BACKSPACE}{BACKSPACE}{HOME}0:");
	Sleep(200);
	Send("{ENTER}");
EndFunc

Sleep(3000);
For $i=1 To 44
	ChangeFormat();
	Sleep(200);
Next;


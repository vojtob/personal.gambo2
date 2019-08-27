def timeToSec(timeString):
    """from text representation of time (e.g. 17:52:38 or 13:23) creates time in seconds
    It suppose that last part after : are seconds, before are minutes, before are hours (if present)
    """
    sec = 0
    parts = timeString.split(":")
    for part in parts:
        sec = 60*sec + int(part)
    return sec

def secToString(timeSec, mode):
    """time in seconds converts to string representation
    1 - if time in day - e.g. 17:52:38, if seconds > 24*60*60, it is truncated to 24 hours, 30:52:38 -> 06:52:38
    2 - duration - 13 (13 seconds), 04:20 (4 minutes and 20 seconds), 17:52:38 (17 hours, 52 minutes, 38 seconds), 30:52:38 (30 hours, 52 minutes, 38 seconds)
    """
    negativeTimePrefix=''
    if(timeSec < 0):
        timeSec = -timeSec
        negativeTimePrefix = '-'

    seconds = timeSec % 60
    timeSec = (timeSec - seconds) // 60
    minutes = timeSec % 60
    hours = (timeSec - minutes) // 60

    # time in day
    if(mode == 1):
        return "{0:02}:{1:02}:{2:02}".format(hours % 24, minutes, seconds)

    # duration, no special handling
    if(hours == 0):
        if(minutes==0):
            # seconds only
            return "{0}{1}".format(negativeTimePrefix, seconds)
        # seconds and minutes
        return "{0}{1:02}:{2:02}".format(negativeTimePrefix, minutes, seconds)
    # hours, seconds, minutes
    return "{0}{1:02}:{2:02}:{3:02}".format(negativeTimePrefix, hours, minutes, seconds)

       


# test
if __name__ == "__main__":

    import pytest

    assert timeToSec("00:00:00") == 0
    assert timeToSec("00:01:05") == 65
    assert timeToSec("01:00:00") == 3600
    assert timeToSec("17:52:38") == (17*3600+52*60+38)
    assert timeToSec("13:23") == (13*60+23)

    assert secToString(17*3600+52*60+38, 1) == "17:52:38"
    assert secToString((17+48)*3600+52*60+38, 1) == "17:52:38"
    assert secToString(3*3600+52*60+38, 1) == "03:52:38"
    assert secToString(0*3600+52*60+38, 1) == "00:52:38"
    assert secToString(0*3600+0*60+38, 1) == "00:00:38"
    assert secToString(0, 1) == "00:00:00"

    assert secToString(17*3600+52*60+38, 2) == "17:52:38"
    assert secToString((17+48)*3600+52*60+38, 2) == "65:52:38"
    assert secToString(3*3600+52*60+38, 2) == "03:52:38"
    assert secToString(52*60+38, 2) == "52:38"
    assert secToString(7, 2) == "7"
    assert secToString(4*60+7, 2) == "04:07"
    assert secToString(0, 2) == "0"

    assert secToString(-(17*3600+52*60+38), 2) == "-17:52:38"
    assert secToString(-((17+48)*3600+52*60+38), 2) == "-65:52:38"
    assert secToString(-(3*3600+52*60+38), 2) == "-03:52:38"
    assert secToString(-(52*60+38), 2) == "-52:38"
    assert secToString(-7, 2) == "-7"
    assert secToString(-(4*60+7), 2) == "-04:07"

    print("all tests DONE")
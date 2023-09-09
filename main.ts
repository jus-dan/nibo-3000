input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    DFPlayerPro.MP3_playFileNum(randint(1, DFPlayerPro.MP3_getTotalFileNumber()))
})
input.onButtonPressed(Button.A, function () {
    DFPlayerPro.MP3_playFilePathName("3.mp3")
})
input.onButtonPressed(Button.B, function () {
    DFPlayerPro.MP3_playFilePathName("Windows.mp3")
})
let fileName = ""
let keyAnalog = 0
let tempVolume = 0
let booted = 0
let volume = 10
DFPlayerPro.MP3_setSerial(SerialPin.P14, SerialPin.P0)
DFPlayerPro.MP3_setPlayMode(DFPlayerPro.PlayType.playOneSongAndPause)
DFPlayerPro.MP3_setVol(volume)
DFPlayerPro.MP3_promtMode(DFPlayerPro.PromtType.promtOff)
DFPlayerPro.MP3_amplifierMode(
DFPlayerPro.ampType.ampOn
)
DFPlayerPro.MP3_ledMode(DFPlayerPro.ledType.ledOn)
let numberOfFiles = DFPlayerPro.MP3_getTotalFileNumber()
basic.showString("NiBo 3000")
booted = 1
basic.forever(function () {
    tempVolume = Math.round(Math.map(pins.analogReadPin(AnalogPin.P1), 0, 1023, 0, 30))
    if (tempVolume != volume && booted != 0) {
        volume = tempVolume
        DFPlayerPro.MP3_setVol(volume)
        led.plotBarGraph(
        volume,
        30
        )
    } else {
        basic.pause(50)
    }
})
basic.forever(function () {
    keyAnalog = pins.analogReadPin(AnalogPin.P2)
    fileName = "deadbeef"
    if (booted != 0) {
        if (keyAnalog > 980) {
            basic.showIcon(IconNames.SmallHeart)
        } else if (keyAnalog > 880 && keyAnalog < 980) {
            basic.showNumber(9)
            fileName = "9"
        } else if (keyAnalog > 750 && keyAnalog < 880) {
            basic.showNumber(8)
            fileName = "8"
        } else if (keyAnalog > 650 && keyAnalog < 750) {
            basic.showNumber(7)
            fileName = "7"
        } else if (keyAnalog > 560 && keyAnalog < 650) {
            basic.showNumber(6)
            fileName = "6"
        } else if (keyAnalog > 450 && keyAnalog < 560) {
            basic.showNumber(5)
            fileName = "5"
        } else if (keyAnalog > 350 && keyAnalog < 450) {
            basic.showNumber(4)
            fileName = "4"
        } else if (keyAnalog > 260 && keyAnalog < 350) {
            basic.showNumber(3)
            fileName = "3"
        } else if (keyAnalog > 160 && keyAnalog < 260) {
            basic.showNumber(2)
            fileName = "2"
        } else if (keyAnalog > 50 && keyAnalog < 160) {
            basic.showNumber(1)
            fileName = "1"
        } else if (keyAnalog < 50) {
            basic.showNumber(0)
        }
        if (fileName != "deadbeef") {
            DFPlayerPro.MP3_playFilePathName("" + fileName + ".mp3")
            basic.pause(1000)
        }
    }
    basic.showIcon(IconNames.Heart)
})

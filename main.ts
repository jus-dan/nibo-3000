let tempVolume = 0
let fileName = ""
let keyAnalog = 0
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
let booted = 1
let filePage = 0
basic.forever(function () {
    keyAnalog = pins.analogReadPin(AnalogPin.P2)
    fileName = "deadbeef"
    if (booted != 0) {
        if (keyAnalog > 980) {
            basic.showIcon(IconNames.EighthNote)
        } else if (keyAnalog > 880 && keyAnalog < 980) {
            fileName = convertToText(filePage + 9)
        } else if (keyAnalog > 750 && keyAnalog < 880) {
            fileName = convertToText(filePage + 8)
        } else if (keyAnalog > 650 && keyAnalog < 750) {
            fileName = convertToText(filePage + 7)
        } else if (keyAnalog > 560 && keyAnalog < 650) {
            fileName = convertToText(filePage + 6)
        } else if (keyAnalog > 450 && keyAnalog < 560) {
            fileName = convertToText(filePage + 5)
        } else if (keyAnalog > 350 && keyAnalog < 450) {
            fileName = convertToText(filePage + 4)
        } else if (keyAnalog > 260 && keyAnalog < 350) {
            fileName = convertToText(filePage + 3)
        } else if (keyAnalog > 160 && keyAnalog < 260) {
            fileName = convertToText(filePage + 2)
        } else if (keyAnalog > 50 && keyAnalog < 160) {
            fileName = convertToText(filePage + 1)
        } else if (keyAnalog < 50) {
            if (filePage != 0) {
                filePage = 0
            } else {
                filePage = 10
            }
        }
        if (fileName != "deadbeef") {
            DFPlayerPro.MP3_playFilePathName("" + fileName + ".mp3")
            basic.pause(100)
        }
    }
})
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

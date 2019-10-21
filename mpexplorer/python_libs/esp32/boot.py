# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)

import network
from machine import Pin

led = Pin(2, Pin.OUT)
led.on()
ap = network.WLAN(network.AP_IF)
ap.active(True)
ap.config(essid='ESP32_EMBEBIDOS')
ap.config(authmode=3, password='12345678')

import webrepl
webrepl.start()
led.off()

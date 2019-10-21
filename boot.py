# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
import webrepl
import network

webrepl.start()
sta=network.WLAN(network.STA_IF)
sta.active(True)
sta.connect('FZ','12345678')
ap=network.WLAN(network.AP_IF)
ap.active(True)
ap.config(essid='ESPFZ')
ap.config(password='12345678')

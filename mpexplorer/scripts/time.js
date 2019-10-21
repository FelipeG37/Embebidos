Blockly.defineBlocksWithJsonArray([
    {
      "type": "sleep_sec",
      "message0": "Sleep %1 sec",
      "args0": [
        {
          "type": "input_value",
          "name": "secs"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "sleep_msec",
      "message0": "Sleep %1 sec",
      "args0": [
        {
          "type": "input_value",
          "name": "msec"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "sleep_usec",
      "message0": "Sleep %1 sec",
      "args0": [
        {
          "type": "input_value",
          "name": "usec"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "start_ms_counter",
      "message0": "Start ms Counter",
      "inputsInline": false,
      // "previousStatement": null,
      // "nextStatement": null,
      "output": "Number",
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "delta_ms_counter",
      "message0": "Delta ms Counter with start %1",
      "args0": [
        {
          "type": "input_value",
          "name": "start"
        }
      ],
      "inputsInline": true,
      // "previousStatement": null,
      // "nextStatement": null,
      "output": "Number",
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "init_rtc",
      "message0": "Init RTC",
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      // "output": "Array",
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "set_rtc",
      "message0": "Set RTC to  %1  Year %2 Month %3 Day %4 DayOfWeek %5 Hour %6 Min %7 Sec %8 TZ %9",
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "year",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "month",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "day",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "dow",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "hour",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "min",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "sec",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "tz",
          "check": "Number",
          "align": "RIGHT"
        }

      ],
      // "output": "String",
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "read_rtc",
      "message0": "Get current time RTC",
      "inputsInline": false,
      // "previousStatement": null,
      // "nextStatement": null,
      "output": "Array",
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
]);





Blockly.Python['sleep_sec'] = function(block) {
  var value_sec = Blockly.Python.valueToCode(block, 'sec', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.provideFunction_(
        'import_modul_time', ['import time']);
  var code = 'time.sleep( ' + value_sec + ' )\n';
  return code;
};

Blockly.Python['sleep_msec'] = function(block) {
  var value_sec = Blockly.Python.valueToCode(block, 'sec', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.provideFunction_(
        'import_modul_time', ['import time']);
  var code = 'time.sleep_ms( ' + value_sec + ' )\n';
  return code;
};

Blockly.Python['sleep_usec'] = function(block) {
  var value_sec = Blockly.Python.valueToCode(block, 'sec', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.provideFunction_(
        'import_modul_time', ['import time']);
  var code = 'time.sleep_us( ' + value_sec + ' )\n';
  return code;
};

Blockly.Python['start_ms_counter'] = function(block) {
  var value_sec = Blockly.Python.valueToCode(block, 'sec', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.provideFunction_(
        'import_modul_time', ['import time']);
  var code = 'time.ticks_ms()\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['delta_ms_counter'] = function(block) {
  var value_start = Blockly.Python.valueToCode(block, 'start', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'time.ticks_diff(time.ticks_ms(), ' + value_start + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python['init_rtc'] = function(block) {
  var value_start = Blockly.Python.valueToCode(block, 'start', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.provideFunction_(
        'import_modul_rtc', ['from machine import RTC']);
  var code = 'rtc = RTC()\n';
  return code;
};


Blockly.Python['set_rtc'] = function(block) {
  var value_year = Blockly.Python.valueToCode(block, 'year', Blockly.Python.ORDER_ATOMIC);
  var value_month = Blockly.Python.valueToCode(block, 'month', Blockly.Python.ORDER_ATOMIC);
  var value_day = Blockly.Python.valueToCode(block, 'day', Blockly.Python.ORDER_ATOMIC);
  var value_dow = Blockly.Python.valueToCode(block, 'dow', Blockly.Python.ORDER_ATOMIC);
  var value_hour = Blockly.Python.valueToCode(block, 'hour', Blockly.Python.ORDER_ATOMIC);
  var value_min = Blockly.Python.valueToCode(block, 'min', Blockly.Python.ORDER_ATOMIC);
  var value_sec = Blockly.Python.valueToCode(block, 'sec', Blockly.Python.ORDER_ATOMIC);
  var value_tz = Blockly.Python.valueToCode(block, 'tz', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  Blockly.Python.provideFunction_(
        'import_modul_time', ['import time']);
  var code = 'rtc.datetime((' + value_year + ',' + value_month + ',' + value_day + ',' + value_dow + ',' + value_hour + ',' + value_min + ',' + value_sec + ',' + value_tz + '))\n';
  return code;
};

Blockly.Python['read_rtc'] = function(block) {
  var value_start = Blockly.Python.valueToCode(block, 'start', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'rtc.datetime()\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
};



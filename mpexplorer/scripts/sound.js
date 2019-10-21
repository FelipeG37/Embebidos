Blockly.defineBlocksWithJsonArray([
    {
      "type": "tone_init",
      "message0": "Buzzer on Pin  %1",
      "args0": [
        {
          "type": "input_value",
          "name": "pin"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "play_tone",
      "message0": "Play Tone Freq %1 Time(ms) %2" ,
      "args0": [
        {
          "type": "input_value",
          "name": "freq",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "msec",
          "check": "Number"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    }
]);



Blockly.Python['tone_init'] = function(block) {
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'from rtttl import RTTTL\nimport songs\nimport time\nfrom machine import Pin, PWM\n';
  code += 'tone = PWM(Pin(' + value_pin + ', Pin.OUT), freq=0, duty=0)\n';
  return code;
};


Blockly.Python['play_tone'] = function(block) {
  var value_freq = Blockly.Python.valueToCode(block, 'freq', Blockly.Python.ORDER_ATOMIC);
  var value_msec = Blockly.Python.valueToCode(block, 'msec', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'tone.duty(10)\ntone.freq(int(' + value_freq + '))\ntime.sleep(' + value_msec + '*0.001)\n';
  code += 'tone.duty(0)\ntime.sleep(0.01)';
  return code;
};




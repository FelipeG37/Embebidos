Blockly.defineBlocksWithJsonArray([
    {
      "type": "init_wlan",
      "message0": "Init wlan",
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "scan_wlan",
      "message0": "Scan wlan",
      "output": "String",
      "inputsInline": false,
      // "previousStatement": null,
      // "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "connect_wlan",
      "message0": "Connect wlan to SSID %1 Password  %2",
      "args0": [
        {
          "type": "input_value",
          "name": "ssid"
        },
        {
          "type": "input_value",
          "name": "passwd"
        }
      ],
      "inputsInline": false,
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Init DHT11",
      "helpUrl": ""
    },
    {
      "type": "isconnected_wlan",
      "message0": "is Connected?",
      "output": "Boolean",
      "inputsInline": false,
      // "previousStatement": null,
      // "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "ifconfig_wlan",
      "message0": "Connection data",
      "output": "String",
      "inputsInline": false,
      // "previousStatement": null,
      // "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
]);



Blockly.Python['init_wlan'] = function(block) {
  // var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'import network\nwlan = network.WLAN(network.STA_IF)\nwlan.active(True)\n';
  return code;
};


Blockly.Python['scan_wlan'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'wlan.scan()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['connect_wlan'] = function(block) {
  var value_ssid = Blockly.Python.valueToCode(block, 'ssid', Blockly.Python.ORDER_ATOMIC);
  var value_pass = Blockly.Python.valueToCode(block, 'passwd', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'wlan.connect(' + value_ssid + ', ' + value_pass + ')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['isconnected_wlan'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'wlan.isconnected()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python['ifconfig_wlan'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'wlan.ifconfig()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};


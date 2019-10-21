Blockly.defineBlocksWithJsonArray([
    {
      "type": "init_i2c",
      "message0": "Init I2C %1 SCL %2 SDA %3",
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "scl",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "sda",
          "check": "Number",
          "align": "RIGHT"
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
      "type": "read_i2c",
      "message0": "Read from I2C %1  Bytes %2  Address %3",
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "bytes",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "address",
          "check": "Number",
          "align": "RIGHT"
        }
      ],
      "output": "String",
      "inputsInline": false,
      // "previousStatement": null,
      // "nextStatement": null,
      "colour": 120,
      "tooltip": "Print Variable",
      "helpUrl": ""
    },
    {
      "type": "write_i2c",
      "message0": "Write to I2C  %1  Buffer %2 Address %3",
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "buffer",
          "check": "Number",
          "align": "RIGHT"
        },
        {
          "type": "input_value",
          "name": "address",
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
      "type": "init_ow",
      "message0": "Init OneWire %1 Pin %2",
      "args0": [
        {
          "type": "input_dummy"
        },
        {
          "type": "input_value",
          "name": "pin",
          "check": "Number",
          "align": "RIGHT"
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
      "type": "scan_ow",
      "message0": "Scan OneWire",
      "inputsInline": false,
      "output": "String",
      // "previousStatement": null,
      // "nextStatement": null,
      "colour": 120,
      "tooltip": "Scan Onewire",
      "helpUrl": ""
    },
    {
      "type": "reset_ow",
      "message0": "Reset OneWire",
      "inputsInline": false,
      // "output": "String",
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Reset Onewire",
      "helpUrl": ""
    },
]);



Blockly.Python['init_i2c'] = function(block) {
  var value_scl = Blockly.Python.valueToCode(block, 'SCL', Blockly.Python.ORDER_ATOMIC);
  var value_sda = Blockly.Python.valueToCode(block, 'SDA', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'from machine import Pin, I2C\n'
  code += 'i2c = I2C(-1, scl=Pin(' + value_scl + '), sda=Pin(' + value_sda + '))\n';
  return code;
};


Blockly.Python['read_i2c'] = function(block) {
  var value_bytes = Blockly.Python.valueToCode(block, 'bytes', Blockly.Python.ORDER_ATOMIC);
  var value_add = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'i2c.read(' + value_add + ',' + value_bytes + ')\n';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['write_i2c'] = function(block) {
  var value_bytes = Blockly.Python.valueToCode(block, 'buffer', Blockly.Python.ORDER_ATOMIC);
  var value_add = Blockly.Python.valueToCode(block, 'address', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'i2c.write(' + value_add + ',' + value_bytes + ')\n';
  return code;
};

Blockly.Python['init_ow'] = function(block) {
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble JavaScript into code variable.
  var code = 'from machine import Pin\nimport onewire\n'
  code += 'ow = onewire.OneWire(Pin(' + value_sda + '))\n';
  return code;
};


Blockly.Python['init_ow'] = function(block) {
  //var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'ow.scan()\n'
  return code;
};

Blockly.Python['reset_ow'] = function(block) {
  //var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'ow.reset()\n'
  return code;
};

Blockly.Python['readbyte_ow'] = function(block) {
  // var value_byte = Blockly.Python.valueToCode(block, 'add', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'ow.readbyte()\n'
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['writebyte_ow'] = function(block) {
  var value_byte = Blockly.Python.valueToCode(block, 'byte', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'ow.writebyte(' + value_byte + ')\n'
  return [code, Blockly.Python.ORDER_ATOMIC];
};


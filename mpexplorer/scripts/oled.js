Blockly.defineBlocksWithJsonArray([
  {
    "type": "init_oled",
    "message0": "Init SSD1306 %1 SCL(Pin) %2 SDA(Pin) %3",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "SCL",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "SDA",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "colour": 60,
    "tooltip": "SSD1306",
    "helpUrl": ""
  },
  {
    "type": "print_oled",
    "message0": "Send to Oled %1 %2 Text %3 Line %4 Column %5",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "field_label_serializable",
        "name": "Text",
        "text": "Text"
      },
      {
        "type": "input_value",
        "name": "Text",
        "check": "String",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "line",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "col",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "colour": 230,
    "tooltip": "Print to Oled",
    "helpUrl": ""
  },
  {
    "type": "show_oled",
    "message0": "Show Oled",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "fill_oled",
    "message0": "Fill Oled  %1 %2",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "bitValue",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "draw_pixel",
    "message0": "Draw Pixel %1 Line %2 Col %3 Bit %4",
    "previousStatement": null,
    "nextStatement": null,
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "line",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "col",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "bit",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "colour": 230,
    "tooltip": "Draw pixel",
    "helpUrl": ""
  },
  {
    "type": "invert_oled",
    "message0": "Invert Oled Display %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "invert",
        "options": [
          [
            "inverted",
            "True"
          ],
          [
            "normal",
            "False"
          ]
        ]
      },

    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": "",
    "helpUrl": ""
  },


]);


Blockly.Python['init_oled'] = function(block) {

  var value_scl = Blockly.Python.valueToCode(block, 'SCL', Blockly.Python.ORDER_ATOMIC);
  var value_sda = Blockly.Python.valueToCode(block, 'SDA', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'from machine import Pin, I2C\nimport ssd1306\nfrom time import sleep\n'
  code += 'i2c = I2C(-1, scl=Pin(' + value_scl + '), sda=Pin(' + value_sda + '))\noled_width = 128\noled_height = 64\n';
  code += 'oled = ssd1306.SSD1306_I2C(oled_width, oled_height, i2c)\n'
  return code;
};

Blockly.Python['print_oled'] = function(block) {

  var value_text = Blockly.Python.valueToCode(block, 'Text', Blockly.Python.ORDER_ATOMIC);
  var value_line = Blockly.Python.valueToCode(block, 'line', Blockly.Python.ORDER_ATOMIC);
  var value_col = Blockly.Python.valueToCode(block, 'col', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'oled.text(str(' + value_text +  '), ' + value_col +  ' , ' + value_line +  ')\n';
  return code;
};

Blockly.Python['show_oled'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'oled.show()\n';
  return code;
};

Blockly.Python['fill_oled'] = function(block) {

  var value_bit = Blockly.Python.valueToCode(block, 'bitValue', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble JavaScript into code variable.
  var code = 'oled.fill(' + value_bit + ')\n';
  return code;
};


Blockly.Python['draw_pixel'] = function(block) {

  var value_bit = Blockly.Python.valueToCode(block, 'bit', Blockly.Python.ORDER_ATOMIC);
  var value_line = Blockly.Python.valueToCode(block, 'line', Blockly.Python.ORDER_ATOMIC);
  var value_col = Blockly.Python.valueToCode(block, 'col', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'oled.pixel(' + value_col +  ', ' + value_line +  ' , ' + value_bit +  ')\n';
  return code;
};

Blockly.Python['invert_oled'] = function(block) {


  var invert_value = block.getFieldValue('invert');

  var code = 'oled.invert(' + invert_value + ')\n';
  return code;
};





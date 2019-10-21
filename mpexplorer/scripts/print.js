Blockly.defineBlocksWithJsonArray([
    {
      "type": "print_var",
      "message0": "Print %1",
      "args0": [
        {
          "type": "input_value",
          "name": "text"
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



Blockly.Python['print_var'] = function(block) {
  var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'print( ' + value_text + ' )\n';
  return code;
};
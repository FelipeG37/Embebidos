Blockly.defineBlocksWithJsonArray([
    {
      "type": "servo_init",
      "message0": "Init Servo on Pin  %1",
      "args0": [
        {
          "type": "input_value",
          "name": "pin",
          "check": "Number"
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
      "type": "servo_angle",
      "message0": "Send servo to Angle %1",
      "args0": [
        {
          "type": "input_value",
          "name": "angle",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 195,
      "tooltip": "measure DHT11",
      "helpUrl": ""
    },

]);



Blockly.Python['servo_init'] = function(block) {
  var value_pin = Blockly.Python.valueToCode(block, 'pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'import servo\nservo = servo.Servo( pin=' + value_pin + ')\n';
  return code;
};

Blockly.Python['servo_angle'] = function(block) {
  // TODO: Assemble Python into code variable.
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var code = 'servo.write_angle(degrees=round(' + value_angle + '))\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['dht_temperature'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'dht11.temperature()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['dht_humidity'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'dht11.humidity()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};


Blockly.Python['hcsr04_init'] = function(block) {
  var value_trigger = Blockly.Python.valueToCode(block, 'trigger_pin', Blockly.Python.ORDER_ATOMIC);
  var value_echo = Blockly.Python.valueToCode(block, 'echo_pin', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'from hcsr04 import HCSR04\nsonar = HCSR04(trigger_pin=' + value_trigger + ', echo_pin=' + value_echo + ', echo_timeout_us=1000000)\n';
  return code;
};

Blockly.Python['distance_cm'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'sonar.distance_cm()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};


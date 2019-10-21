Blockly.defineBlocksWithJsonArray([
    {
      "type": "dht_init",
      "message0": "Init DHT11 on Pin  %1",
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
      "tooltip": "Init DHT11",
      "helpUrl": ""
    },
    {
      "type": "dht_measure",
      "message0": "Read DHT11",
      "previousStatement": null,
      "nextStatement": null,
      "colour": 195,
      "tooltip": "measure DHT11",
      "helpUrl": ""
    },
    {
      "type": "dht_temperature",
      "message0": "Temperature DHT11",
      "output": "Number",
      "colour": 195,
      "tooltip": "Temperature DHT11",
      "helpUrl": ""
    },
    {
      "type": "dht_humidity",
      "message0": "Humidity DHT11",
      "output": "Number",
      "colour": 195,
      "tooltip": "Humidity DHT11",
      "helpUrl": ""
    },
    {
      "type": "hcsr04_init",
      "message0": "Init HC-SR04 with Trigger_Pin  %1 Echo_Pin %2",
      "args0": [
        {
          "type": "input_value",
          "name": "trigger_pin"
        },
        {
          "type": "input_value",
          "name": "echo_pin"
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
      "type": "distance_cm",
      "message0": "Distance in cm",
      "output": "Number",
      "colour": 195,
      "tooltip": "Distance in cm",
      "helpUrl": ""
    },
    {
      "type": "connect_mqtt",
      "message0": "Connect to MQTT Broker at address %1 Port %2 User %3 Passwd %4",
      "args0": [
        {
          "type": "input_value",
          "name": "server"
        },
        {
          "type": "input_value",
          "name": "port",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "user"
        },
        {
          "type": "input_value",
          "name": "pass"

        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 150,
      "tooltip": "Connect to MQTT Broker",
      "helpUrl": ""
    },
    {
      "type": "publish_mqtt",
      "message0": "Publish to MQTT Broker. Topic  %1 Message %2",
      "args0": [
        {
          "type": "input_value",
          "name": "topic"
        },
        {
          "type": "input_value",
          "name": "message"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Init DHT11",
      "helpUrl": ""
    },
    {
      "type": "subscribe_mqtt",
      "message0": "Subscribe to MQTT Broker. Callback %1 Topic  %2",
      "args0": [
        {
          "type": "input_value",
          "name": "cb"
        },
        {
          "type": "input_value",
          "name": "topic"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 120,
      "tooltip": "Init DHT11",
      "helpUrl": ""
    },
    {
      "type": "chkmsg_mqtt",
      "message0": "Check msg MQTT Broker",
      "output": "Number",
      "colour": 195,
      "tooltip": "Message in active Topic",
      "helpUrl": ""
    },
    {
      "type": "disconnect_mqtt",
      "message0": "Disconnect from MQTT Broker",
      "output": "Number",
      "colour": 195,
      "tooltip": "Disconnect from MQTT Broker",
      "helpUrl": ""
    }
]);



Blockly.Python['dht_init'] = function(block) {
  var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'import dht\nimport machine\ndht11 = dht.DHT11(machine.Pin(' + value_text + '))\n';
  return code;
};

Blockly.Python['dht_measure'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'dht11.measure()\n';
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

Blockly.Python['connect_mqtt'] = function(block) {
  var value_server = Blockly.Python.valueToCode(block, 'server', Blockly.Python.ORDER_ATOMIC);
  var value_port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_ATOMIC);
  var value_user = Blockly.Python.valueToCode(block, 'user', Blockly.Python.ORDER_ATOMIC);
  var value_pass = Blockly.Python.valueToCode(block, 'pass', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'import machine\nfrom umqttsimple import MQTTClient\nimport ubinascii\n'
  code += 'server=' + value_server + '\nport=' + value_port + '\nuser=' + value_user + '\npasswd=' + value_pass + '\n';
  code += 'CLIENT_ID = ubinascii.hexlify(machine.unique_id())\n'
  code += 'mqtt = MQTTClient(CLIENT_ID, server, port, user, passwd)\n'
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['publish_mqtt'] = function(block) {

  var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);
  var value_msg = Blockly.Python.valueToCode(block, 'message', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = 'mqtt.connect()\nmqtt.publish(' + value_topic + ' , ' + value_msg + ')\nmqtt.disconnect()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['subscribe_mqtt'] = function(block) {

  var value_callback = Blockly.Python.valueToCode(block, 'cb', Blockly.Python.ORDER_ATOMIC);
  var value_topic = Blockly.Python.valueToCode(block, 'topic', Blockly.Python.ORDER_ATOMIC);

  // TODO: Assemble Python into code variable.
  var code = 'mqtt.set_callback(' + value_callback + ')\nmqtt.connect()\nmqtt.subscribe(' + value_topic + ')\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};

Blockly.Python['chkmsg_mqtt'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'mqtt.check_msg()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['disconnect_mqtt'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = 'mqtt.disconnect()\n';
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};


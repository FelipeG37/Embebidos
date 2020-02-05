{
  "version": "1.2",
  "package": {
    "name": "",
    "version": "",
    "description": "",
    "author": "",
    "image": ""
  },
  "design": {
    "board": "blackice-mx",
    "graph": {
      "blocks": [
        {
          "id": "72f484c7-d3aa-4481-b286-ecfc403f39b8",
          "type": "basic.output",
          "data": {
            "name": "led",
            "pins": [
              {
                "index": "0",
                "name": "LED_YELLOW",
                "value": "56"
              }
            ],
            "virtual": false
          },
          "position": {
            "x": 680,
            "y": 200
          }
        },
        {
          "id": "7261f169-75e5-4c2c-b42a-9b50fd391ab4",
          "type": "basic.input",
          "data": {
            "name": "Señal",
            "pins": [
              {
                "index": "0",
                "name": "PMOD[4]",
                "value": "34"
              }
            ],
            "virtual": false,
            "clock": false
          },
          "position": {
            "x": 224,
            "y": 200
          }
        },
        {
          "id": "cd706675-188b-43a7-b217-50ba877e580a",
          "type": "basic.output",
          "data": {
            "name": "salida",
            "pins": [
              {
                "index": "0",
                "name": "PMOD[5]",
                "value": "33"
              }
            ],
            "virtual": false
          },
          "position": {
            "x": 680,
            "y": 400
          }
        },
        {
          "id": "e9c61c08-5761-4b68-816e-a80066787751",
          "type": "basic.input",
          "data": {
            "name": "sw",
            "pins": [
              {
                "index": "0",
                "name": "PMOD[39]",
                "value": "52"
              }
            ],
            "virtual": false,
            "clock": false
          },
          "position": {
            "x": 224,
            "y": 400
          }
        }
      ],
      "wires": [
        {
          "source": {
            "block": "7261f169-75e5-4c2c-b42a-9b50fd391ab4",
            "port": "out"
          },
          "target": {
            "block": "72f484c7-d3aa-4481-b286-ecfc403f39b8",
            "port": "in"
          }
        },
        {
          "source": {
            "block": "e9c61c08-5761-4b68-816e-a80066787751",
            "port": "out"
          },
          "target": {
            "block": "cd706675-188b-43a7-b217-50ba877e580a",
            "port": "in"
          }
        }
      ]
    }
  },
  "dependencies": {}
}
# oop-gateway

This is the gateway service for Open Interop.

This service serves as an HTTP entry point for Open Interop.

Once messages are received, this service checks them against a blacklist, and does some minimal processing before enqueueing the message.

If a request matches any item in the blacklist it will be discarded.

### Requests to the gateway

If a request doesn't match an item in the blacklist, a 202 HTTP status will be returned. If the `Accepts: application/json` header is present, then a JSON object containing a status message and the internally generated UUID for the request will be returned in the response body.

If any matching blacklist item is found a 444 HTTP status will be returned.


## Installation

Ensure node is installed with version at least `10.16.2` LTS.

Install `yarn` if necessary (`npm install -g yarn`).

Simply run `yarn install` to install the node dependencies.

The blacklist depends on [CouchDB](https://couchdb.apache.org/), installation instructions can be found [here](https://docs.couchdb.org/en/2.2.0/install/index.html).

Once everything is installed the service can be started with `yarn start`.

## Configuration

Configuration is done via environment variables. Available options are:

- `OOP_LISTEN_PORT`: The port the web server will listen on.
- `OOP_AMQP_ADDRESS`: The address of the AMQP messaging service.
- `OOP_EXCHANGE_NAME`: The message exchange for Open Interop.
- `OOP_GATEWAY_OUTPUT_Q`: The name of the queue processed messages will be sent to.
- `OOP_DB_ADDRESS`: The address of the blacklist database.

### Blacklist Configuration

Blacklist items are JSON objects with specific keys that are queried by the gateway.

Some example objects are:
- `{"ip_literal": "192.168.1.1"}`
- `{"ip_range_start": "192.168.0.0", "ip_range_end": "192.168.0.255"}`
- `{"user_agent": "User-Agent: Mozilla/5.0 Gecko/20100101 Firefox/70.0"}`
- `{"request_path": "/favicon.ico"}`
- `{"request_header": "x-some-header"}`

For more information on how to add/edit/delete documents in CouchDB see [here](https://docs.couchdb.org/en/stable/intro/tour.html).


## Testing

`yarn test` to run the tests and generate a coverage report.

## Contributing

We welcome help from the community, please read the [Contributing guide](https://github.com/open-interop/oop-guidelines/blob/master/CONTRIBUTING.md) and [Community guidelines](https://github.com/open-interop/oop-guidelines/blob/master/CODE_OF_CONDUCT.md).

## License

Copyright (C) 2020 The Software for Health Foundation Limited <https://softwareforhealth.org/>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

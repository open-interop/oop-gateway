# oop-gateway

This is the gateway service for OpenInterop.

This service serves as an HTTP entry point for OpenInterop.

Once messages are received, this service checks them against a blacklist, and does some minimal processing before enqueueing the message.

If a request matches any item in the blacklist it will be discarded.

## Installation

Simply run `yarn install` to install the node dependencies.

The blacklist depends on [CouchDB](https://couchdb.apache.org/), installation instructions can be found [here](https://docs.couchdb.org/en/2.2.0/install/index.html).

once everything is installed the service can be started with `yarn start`.

## Configuration

Configuration is done via environment variables. Available options are:

- `OOP_LISTEN_PORT`: The port the web server will listen on.
- `OOP_AMQP_ADDRESS`: The address of the AMQP messaging service.
- `OOP_EXCHANGE_NAME`: The message exchange for OpenInterop.
- `OOP_GATEWAY_OUTPUT_Q`: The name of the queue processed messages will be sent to.
- `OOP_DB_ADDRESS`: The address of the blacklist database.

## Testing

`yarn test` to run the tests and generate a coverage report.

## Contributing

We welcome help from the community, please read the [Contributing guide](https://github.com/open-interop/oop-guidelines/blob/master/CONTRIBUTING.md) and [Community guidelines](https://github.com/open-interop/oop-guidelines/blob/master/CODE_OF_CONDUCT.md).

## Licence

Copyright (C) 2019 Blue Frontier IT Ltd

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

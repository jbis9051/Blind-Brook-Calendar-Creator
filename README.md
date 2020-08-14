# Blind Brook Calendar Creator

A website to generate iCal files and HTML tables based on Blind Brook's rotating block schedule and letter day calendar.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation

```shell script
git clone https://github.com/jbis9051/BB-Calendar-Creator
cd BB-Calendar-Creator
npm install
lerna bootstrap
lerna link # may hang, see note below
```

`lerna run build` should work, but if it doesn't, manually build with

```shell script
cd common && npm run build
cd ../frontend && npm run build
cd ../server && npm run build
```

## Usage

```shell script
cd server
npm run run
```

## Support

Please [open an issue](https://github.com/jbis9051/BB-Calendar-Creator/issues/new) for support.

## Contributing

Create a branch, add commits, and [open a pull request](https://github.com/jbis9051/BB-Calendar-Creator/compare).

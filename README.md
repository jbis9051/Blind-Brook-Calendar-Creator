# Blind Brook Calendar Creator

A website and module to generate iCal files and HTML tables based on Blind Brook's rotating block schedule and letter day calendar.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [TODO](#TODO)
- [Support](#support)
- [Contributing](#contributing)

## Features

- Import data form eSchool Data (class delimited by \n and item delimited by \t)
- Add unlimited classes
- Generate a printable HTML table schedule
- Generate an iCal file schedule
- Autosave schedule inputs (localStorage)

## Installation

```shell script
git clone https://github.com/jbis9051/BB-Calendar-Creator
cd BB-Calendar-Creator
npm install
```

## Usage

To start on port 3010:

```shell script
npm run start
```

## TODO
- [ ] Colors - Make the printout scheduler colorful
- [ ] Support Edge and IE - God help us
- [x] Modularize more (generate object then create HTML and iCal file)
- [ ] iCal contain teachers names
- [ ] Documentation (JS Doc)
- [ ] Add option to include frees in calendar file

## Support

Please [open an issue](https://github.com/jbis9051/BB-Calendar-Creator/issues/new) for support.

## Contributing

Create a branch, add commits, and [open a pull request](https://github.com/jbis9051/BB-Calendar-Creator/compare).

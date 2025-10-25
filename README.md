# TbnInputDecimal Widget

Decimal input with thousands separator formatting for Mendix.

## Features

-   Thousands separator (1,234.56)
-   Configurable decimal places (0-6)
-   Cursor position preserved while typing
-   Mendix validation support
-   onChange action support

## Installation

1. Download the latest `.mpk` file from releases
2. Copy to `[YourMendixProject]/widgets/` folder
3. Press F4 in Studio Pro to refresh

## Usage

1. Place widget in a data container (Data View, List View, etc.)
2. Configure decimal attribute
3. Set decimal places (0-6)
4. Optional: Add label
5. Optional: Configure onChange action (microflow/nanoflow)

## Development

```bash
npm install
npm run build
```

# TaxStreem Node SDK

A lightweight, dependency-free Node.js client library for the TaxStreem API. Built for performance and modern runtimes using native `fetch`.

## Features

- **Zero Dependencies**: Lightweight footprint, no security vulnerabilities from third-party request libraries.
- **Native Fetch**: Uses built-in Node.js 18+ `fetch` API.
- **HMAC Signing**: Automatic payload signing for secure communication.
- **TypeScript Support**: Full type definitions included.
- **Debug Mode**: Built-in request logging for easier integration.

## Installation

```bash
npm install @taxstreem/taxstreem-sdk
```

## Quick Start

### Basic Initialization
```javascript
import { TaxStreem } from '@taxstreem/taxstreem-sdk';

const sdk = new TaxStreem('your-api-key', 'your-shared-secret');
```

### Options & Sandbox Environment
```javascript
const sdk = new TaxStreem('your-api-key', 'your-shared-secret', {
  debug: true // Enables request/response logging
});
```

## Usage

### Flux: Submit a Single VAT Filing
Submit a VAT return for a specific business and tax period.

```javascript
const payload = {
  business_tin: "12345678-0001",
  tax_period: {
    month: 1,
    year: 2024
  },
  totals: {
    total_sales: 1000000,
    exempt_sales: 0,
    zero_rated_sales: 0,
    total_output_vat: 75000,
    total_input_vat: 50000
  }
};

try {
  const result = await sdk.flux.fileVatSingle(payload);
  console.log('Filing submitted successfully:', result.reference_id);
} catch (error) {
  console.error('Filing failed:', error.message);
}
```

## Debugging
Enable `debug: true` in the configuration to see outgoing signatures and request details in your console:

```javascript
const sdk = new TaxStreem(apiKey, sharedSecret, { debug: true });
// Logs: [TaxStreem] Calling POST https://api.taxstreem.com/v1/flux/vat-filing/single...
```

## Requirements
- Node.js 18.0.0 or higher (for native `fetch` support).

## Issues
Kindly [open an issue](https://github.com/TaxStreem/taxstreem-node/issues) if you discover any bug or have problems using this library. 

## License
MIT License. See [LICENSE](LICENSE) for more information.
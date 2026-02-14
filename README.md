# TaxStreem Node SDK

A lightweight, dependency-free Node.js client library for the TaxStreem API. Built for performance and modern runtimes using native `fetch`.

## Features

- **Zero Dependencies**: Lightweight footprint, no security vulnerabilities from third-party request libraries.
- **Native Fetch**: Uses built-in Node.js 18+ `fetch` API.
- **HMAC Signing**: Automatic payload signing for secure communication.
- **In-Flight Encryption**: Built-in AES-256-GCM encryption for sensitive credentials.
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

### Options & Debugging
```javascript
const sdk = new TaxStreem('your-api-key', 'your-shared-secret', {
  debug: true // Enables request/response logging to console
});
```

## Usage

### 1. Encrypting Credentials
TaxStreem uses **In-Flight Encryption** (AES-256-GCM) to protect sensitive credentials (like TaxProMax login details) before they are sent to the API.

```javascript
const tpmCred = {
    email: "user@example.com",
    password: "secure-password",
};

// Use your sharedSecret to encrypt the credentials
const encryptedPayload = sdk.encryption.encryptTaxProMaxCredential(tpmCred, 'your-shared-secret');
```

### 2. Submitting a VAT Filing (Flux)
Once you have the `encryptedPayload`, you can submit a VAT return.

```javascript
const payload = {
  encryptedPayload: encryptedPayload, // The encrypted string from Step 1
  month: 1,
  year: 2024,
  data: [
    {
      vatStatus: 1,
      amount: 5000,
      item: "Baby diapers",
      narration: "Bought kisskid diaper",
      taxId: "2345544-0001",
      beneficiary: "Retail Customer"
    }
  ]
};

try {
  const result = await sdk.flux.fileVatSingle(payload);
  console.log('Filing submitted successfully:', result.reference_id);
} catch (error) {
  console.error('Filing failed:', error.message);
}
```

## Security Design
This SDK implements two layers of security:
1.  **Request Signing (HMAC-SHA256)**: Every outgoing request body is signed using your `sharedSecret`. The signature is sent in the `x-taxstreem-signature` header to verify request integrity.
2.  **Payload Encryption (AES-256-GCM)**: Sensitive data within the payload is encrypted using the same `sharedSecret`, ensuring that even TaxStreem systems only see the sensitive data at the final automation step.

## Requirements
- Node.js 18.0.0 or higher.

## Issues
Kindly [open an issue](https://github.com/TaxStreem/taxstreem-node/issues) if you discover any bug or have problems using this library. 

## License
MIT License. See [LICENSE](LICENSE) for more information.
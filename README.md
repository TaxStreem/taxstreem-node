## TaxStreem Node Library

A Node client library for consuming the TaxStreem API  

## Prerequisite
Your need to [create a TaxStreem account](https://partners-portal.taxstreem.com), if you don't have one already, to get your test and 
live secret keys.

## Installation
```
npm install @taxstreem/taxstreem-sdk --save
```

## Usage
Import and initialize the library:
```javascript
const { TaxStreem } = require('@taxstreem/taxstreem-sdk')
const taxstreem = new TaxStreem("sk_test_xxxxxx")

const response = taxstreem.flux.vatFiling.batch({
  email: "test@example.com",
  amount: 20000
})

console.log(response)
```

Import and initialize the library using ES module with `async/await`:
```javascript
import { TaxStreem } from '@taxstreem/taxstreem-sdk'
const taxstreem = new TaxStreem("sk_test_xxxxxx")

const initialize = async(email, amount) => {
  const response = await taxstreem.flux.vatFiling.batch({
    email,
    amount
  })

  console.log(response)
}

const email = 'test@example.com'
const amount = 2000
initialize(email, amount)
```

### Typescript
```typescript
import { TaxStreem } from '@taxstreem/taxstreem-sdk';
const taxstreem = new TaxStreem("sk_test_xxxxxx");

const initialize = async(email, amount) => {
  const response = await taxstreem.flux.vatFiling.batch({
    email,
    amount
  });

  console.log(response);
}

const email = 'test@example.com';
const amount = 2000;
initialize(email, amount);
```

## Issues
Kindly [open an issue](https://github.com/TaxStreem/taxstreem-node/issues) if you discover any bug or have problems using this library. 

## License
This repository is made available under the MIT license. Kindly read the [LICENSE](https://github.com/TaxStreem/taxstreem-node/blob/main/LICENSE) file for more information.
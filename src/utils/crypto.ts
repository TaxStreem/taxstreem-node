import * as crypto from 'crypto';

export function generateSignature(payload: object, secret: string): string {
  const message = JSON.stringify(payload);
  return crypto
    .createHmac('sha256', secret)
    .update(message)
    .digest('hex');
}
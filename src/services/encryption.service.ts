import { createCipheriv, createHash, randomBytes } from 'crypto';

export interface TaxProMaxCredentials {
    email: string;
    password: string;
    [key: string]: any;
}

export class EncryptionService {
    /**
     * Encrypt TaxProMax credentials using AES-256-GCM.
     * This matches the encryption logic used by the TaxStreem API.
     * 
     * @param tpmCred The credentials to encrypt
     * @param sharedSecret The partner's shared secret
     * @returns A base64 encoded string containing IV, ciphertext, and tag
     */
    encryptTaxProMaxCredential(
        tpmCred: TaxProMaxCredentials,
        sharedSecret: string
    ): string {
        // Derive 32-byte key from sharedSecret
        const key = createHash("sha256").update(sharedSecret).digest();

        // 12-byte IV for GCM
        const iv = randomBytes(12);

        // AES-256-GCM expects Uint8Array for many of its inputs in strict TS environments
        const cipher = createCipheriv("aes-256-gcm", key, iv);

        // Setting AAD (Additional Authenticated Data)
        cipher.setAAD(Buffer.from(sharedSecret, "utf8"));

        const plaintext = JSON.stringify(tpmCred);

        const ciphertext = Buffer.concat([
            cipher.update(plaintext, "utf8"),
            cipher.final(),
        ]);

        const tag = cipher.getAuthTag();

        // Final payload: [IV (12 bytes)] + [Ciphertext] + [Auth Tag (16 bytes)]
        return Buffer.concat([iv, ciphertext, tag]).toString("base64");
    }
}

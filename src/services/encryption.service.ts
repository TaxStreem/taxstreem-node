import { createCipheriv, createHash, randomBytes } from 'crypto';

export class EncryptionService {
    private sharedSecret: string;

    constructor(sharedSecret: string) {
        this.sharedSecret = sharedSecret;
    }

    /**
     * Encrypt TaxProMax credentials using AES-256-GCM.
     * This matches the encryption logic used by the TaxStreem API.
     * 
     * @param tpmCred The credentials to encrypt
     * @returns A base64 encoded string containing IV, ciphertext, and tag
     */
    encryptTaxProMaxCredential(
        tpmCred: Object,
    ): string {
        // Derive 32-byte key from sharedSecret
        const key = createHash("sha256").update(this.sharedSecret).digest();

        // 12-byte IV for GCM
        const iv = randomBytes(12);

        // AES-256-GCM expects Uint8Array for many of its inputs in strict TS environments
        const cipher = createCipheriv("aes-256-gcm", key, iv);

        // Setting AAD (Additional Authenticated Data)
        cipher.setAAD(Buffer.from(this.sharedSecret, "utf8"));

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

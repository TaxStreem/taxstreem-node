import axios from 'axios';

export class TaxStreem {
  constructor(secretKey, options = {}) {
    this.secretKey = secretKey;
    // Default to localhost as per your curl, but allow override
    this.baseUrl = options.baseUrl || 'http://localhost:4000';

    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Mirroring the URL path: /v1/flux/vat-filing/batch
    this.flux = {
      vatFiling: {
        batch: (data) => this.post('/v1/flux/vat-filing/batch', data),
      },
    };
  }

  async post(path, data) {
    try {
      const response = await this.client.post(path, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
}
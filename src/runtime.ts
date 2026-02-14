export interface TaxStreemConfig {
    apiKey: string;
    sharedSecret: string;
    debug?: boolean;
}

export class TaxStreemRuntime {
    private readonly baseUrl: string;

    constructor(private readonly config: TaxStreemConfig) {
        this.baseUrl = 'https://api.taxstreem.com/v1';
    }

    async request<T>(method: string, path: string, body?: any): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const headers: Record<string, string> = {
            'x-api-key': this.config.apiKey,
            'Content-Type': 'application/json',
            'User-Agent': 'TaxStreem-Node-SDK/1.0.0',
        };

        let fetchOptions: RequestInit = {
            method,
            headers,
        };

        if (body) {
            const payload = JSON.stringify(body);
            fetchOptions.body = payload;
        }

        if (this.config.debug) {
            console.log(`HTTP Request: ${method} ${url}`);
            if (body) {
                console.log(`[TaxStreem] Body:`, JSON.stringify(body, null, 2));
            }
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (this.config.debug) {
                console.error(`[TaxStreem] - ERROR - `, response.status, errorData);
            }
            throw new Error(errorData.message || `TaxStreem Error: ${response.statusText}`);
        }

        const data = await response.json();
        if (this.config.debug) {
            console.log(`[TaxStreem] Response:`, JSON.stringify(data, null, 2));
        }
        return data as T;
    }
}

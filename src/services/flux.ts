import { TaxStreemRuntime } from '../runtime';
import { VatFilingPayload, FilingResponse } from '../interfaces/vat';

export class FluxResource {
    constructor(private readonly runtime: TaxStreemRuntime) { }

    /**
     * Submit a single VAT filing
     */
    async fileVatSingle(payload: VatFilingPayload): Promise<FilingResponse> {
        return this.runtime.request<FilingResponse>('POST', '/flux/vat-filing/single', payload);
    }
}

export interface VatFilingItem {
  vatStatus: number;
  amount: number;
  item: string;
  narration: string;
  taxId: string;
  beneficiary: string;
}

export interface VatFilingPayload {
  encryptedPayload: string;
  month: number;
  year: number;
  data: VatFilingItem[];
}

export interface FilingResponse {
  status: string;
  reference_id: string;
  message: string;
  data?: any;
}
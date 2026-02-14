export interface VatFilingPayload {
  business_tin: string;
  tax_period: {
    month: number;
    year: number;
  };
  totals: {
    total_sales: number;
    exempt_sales: number;
    zero_rated_sales: number;
    total_output_vat: number;
    total_input_vat: number;
  };
  // Add schedules if the documentation requires them
  schedules?: Array<{
    type: 'purchase' | 'sales';
    amount: number;
    vat_amount: number;
    customer_tin?: string;
  }>;
}

export interface FilingResponse {
  status: string;
  reference_id: string;
  message: string;
  data?: any;
}
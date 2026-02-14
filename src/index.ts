import { TaxStreemConfig, TaxStreemRuntime } from './runtime';
import { FluxResource } from './services/flux';

export { TaxStreemConfig };

export class TaxStreem {
  public flux: FluxResource;

  constructor(apiKey: string, sharedSecret: string, options?: Partial<TaxStreemConfig>) {
    const runtime = new TaxStreemRuntime({
      apiKey,
      sharedSecret,
      ...options,
    });

    this.flux = new FluxResource(runtime);
  }
}
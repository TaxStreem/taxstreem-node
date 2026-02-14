import { TaxStreemConfig, TaxStreemRuntime } from './runtime';
import { FluxResource } from './services/flux';
import { EncryptionService } from './services/encryption.service';

export { TaxStreemConfig };

export class TaxStreem {
  public flux: FluxResource;
  public encryption: EncryptionService;

  constructor(apiKey: string, sharedSecret: string, options?: Partial<TaxStreemConfig>) {
    const runtime = new TaxStreemRuntime({
      apiKey,
      sharedSecret,
      ...options,
    });

    this.flux = new FluxResource(runtime);
    this.encryption = new EncryptionService();
  }
}
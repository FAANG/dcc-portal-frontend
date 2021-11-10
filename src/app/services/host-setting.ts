import { environment } from '../../environments/environment';

export class HostSetting {
  host: string = environment.host;
  pipelineHost: string = environment.pipelineHost;

  public getHost(): string {
    return this.host;
  }

  setHost(host: string) {
    this.host = host;
  }
}

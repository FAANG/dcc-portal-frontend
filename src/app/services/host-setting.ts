import { environment } from '../../environments/environment';

export class HostSetting {
  host: string = environment.host;
  relatedProjectsHost: string = environment.relatedProjectsHost;

  public getHost(): string {
    return this.host;
  }

  setHost(host: string) {
    this.host = host;
  }
}

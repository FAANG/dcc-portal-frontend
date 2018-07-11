import { environment } from '../../../environments/environment';

export class HostSetting{
	host:string = environment.host;

	constructor() {
	}

	public getHost():string {
		return this.host;
	}

	setHost(host:string):void{
		this.host = host;
	}
}
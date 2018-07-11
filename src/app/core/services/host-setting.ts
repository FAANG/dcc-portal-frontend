export class HostSetting{
//  host:string = "http://ves-hx-e4:9200/faang_build_3/";
//  host:string = "http://ves-pg-e4:9200/faang/";
//  host:string = "/api/";
	host:string = "http://test.faang.org/api/";

	constructor() {}

	public getHost():string {
		return this.host;
	}

	setHost(host:string):void{
		this.host = host;
	}
}
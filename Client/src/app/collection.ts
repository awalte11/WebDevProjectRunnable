import { tag } from './tag';

export class Collection
{
	//Stub of collection, no image implementation, just for setting up tags
	id : number; //unavoidable, no viable primary key but this
	name : string;
	tags : Array<string>;

	constructor( name : string ){
		this.name = name;
		this.tags = new Array<string>();
	}
}
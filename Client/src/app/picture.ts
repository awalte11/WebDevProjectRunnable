import { tag } from './tag';

export class picture
{
	//Stub of picture, no vars for non-tag implementation, just for setting up tags
	id : number; //unavoidable, no viable primary key but this
	name : string;
	tags : Array<string>;

	constructor( name : string ){
		this.name = name;
		this.tags = new Array<string>();
	}

	
}
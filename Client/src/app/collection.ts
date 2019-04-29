import { tag } from './tag';
import { picture } from './picture';

export class Collection
{
	//Stub of collection, no image implementation, just for setting up tags
	id : number; //unavoidable, no viable primary key but this
	name : string;
	tags : Array<string>;
	pictures : Array<picture>;

	constructor( name : string ){
		this.name = name;
		this.tags = new Array<string>();
		this.pictures = new Array<picture>();
	}
}
import { picture } from './picture';
import { Collection } from './collection';

export class tag
{
	name: string; //name of tag is primary key of tag
	pictures : picture[];
	collections : Collection[];
	
	constructor()
	{
		this.pictures = new Array<picture>();
		this.collections = new Array<Collection>();
	}
	
}
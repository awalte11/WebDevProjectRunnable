import { picture } from './picture';
import { Collection } from './collection';

export class tag
{
	name: string; //name of tag is primary key of tag
	pictures : picture[];
	collections : Collection[];
	
	constructor()//it would be preferable to have the constructor initialized the arrays and add the name but JS cannot into data storage object constructors
	{
	}
	
}
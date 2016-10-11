export class IngredientShow {
	unit:
	{
		name: string;
		short: string;
		triggers_plural: number;
		is_headline: boolean;
	};
	ingredient_meta:
	{
		name: string;
		plural_name: string;
	};
}

export class Ingredient {
	id: number;
	recipe_id: number;
	ingredient_meta_id:number;
	unit_id: number;
	amount: number;
	ingredient_show: IngredientShow;
}
export const FORMULA_KEYS = { // Dictionary of keys in fragrance map
    formula_id: 'formula_id',
    formula_name: 'formula_name',
    creator: 'creator',
    category: 'category',
    cost: 'cost',
    creation_date: 'creation_date', // Date format: YYYY-MM-DD
    notes: 'notes',
    materials: 'materials',
    searchable: 'searchable'
}

type DisplayKey = keyof Omit<Formula, "searchable">

export const FORMULA_DISPLAY_KEYS: Record<DisplayKey, string> = { // Fragrance map keys => Display text
    formula_id: 'ID',
    formula_name: 'Name',
    creator: 'Creator',
    category: 'Category',
    cost: 'Cost',
    creation_date: 'Creation Date', // Date format: YYYY-MM-DD
    notes: 'Notes',
    materials: 'Materials',
}


export const EXPANDED_FORMULA_DISPLAY_KEYS: Record<string, string> = { // Fragrance map keys => Display text
    formula_name: 'Name',
    creator: 'Creator',
    category: 'Category',
    creation_date: 'Creation Date', // Date format: YYYY-MM-DD
    notes: 'Notes',
}

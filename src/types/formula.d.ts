// Data from CSV
interface DataRow {
    category: string
    cost_per_ml: number
    creation_date: string // YYYY-MM-DD
    creator: string
    formula_id: string
    formula_name: string
    material_name: string
    material_notes: string
    material_type: 'Top Note' | 'Middle Note' | 'Base Note'
    notes: string
    percentage: number
    quantity_ml: number
    supplier: string
}

// Keys in formula map to display in table
interface Formula {
    formula_id: string
    formula_name: string
    creator: string
    category: string
    materials: {name: string, quantity_ml: number}[]
    notes: string
    cost: number
    searchable?: string
    creation_date: string // YYYY-MM-DD
}

interface Material {
    material_name: string
    material_type: 'Top Note' | 'Middle Note' | 'Base Note'
    cost_per_ml: number
    supplier: string
    percentage: number
}

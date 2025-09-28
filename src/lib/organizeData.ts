/** organizeData.ts
 * 
 * Util function that organizes list of materials CSV 
 * into a map of materials, a map of fragrances, and a dictionary of categories
 * for easier access
 * 
**/

export const organizeData = (materials: DataRow[]) => {
    const formulaMap = new Map<string, Formula>()
    const materialMap = new Map<string, Material>()
    const categories : Record<string, string | null> = {}

    for (const material of materials) {

        // Add formula to formulaMap if it doesn't exist
        if (!formulaMap.has(material.formula_id)) {
            formulaMap.set(material.formula_id, {
                formula_id: material.formula_id,
                formula_name: material.formula_name,
                category: material.category,
                creator: material.creator,
                creation_date: material.creation_date,
                notes: material.notes,
                materials: [],
                cost: 0,
                searchable: `${material.formula_name} ${material.notes}`.toLowerCase() // Create searchable string – combine formula name and searchable attributes (notes in this case) and separate by white space to be parsed in FormulaTable component
            })
        }

        // Add material to materialMap if it doesn't exist
        if (!materialMap.has(material.material_name)) {
            materialMap.set(material.material_name, {
                material_name: material.material_name,
                material_type: material.material_type,
                cost_per_ml: material.cost_per_ml,
                supplier: material.supplier,
                percentage: material.percentage,
            })
        }

        // For search: Add fragrance category to category map if doesn't exist
        if (!categories[material.category]) {
            categories[material.category] = material.category
        }

        // Add material name to formula
        const previous = formulaMap.get(material.formula_id)!
        const nextMaterials = [...previous.materials, { // Add new materials to existing materials
            name: material.material_name,
            quantity_ml: material.quantity_ml
        }]

        // Update total cost of fragrance to include new material
        const nextCost = previous.cost + material.cost_per_ml * material.quantity_ml

        formulaMap.set(
            material.formula_id, {
                ...previous, 
                materials: nextMaterials,
                cost: nextCost
            }
        )
    }

    return {
        materialMap,
        formulaMap,
        categories
    }
}

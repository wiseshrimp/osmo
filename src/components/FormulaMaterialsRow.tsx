/**
 * FormulaMaterialsRow Component
 * 
 * Renders expanded materials section when a formula is selected
 * Displays summary of formula 
 * Displays a sub-table of materials in the formula with name, type, cost, supplier, percentage
 * Displays total cost
 * 
 */

import { toDollars } from "../lib/toDollars"
import { EXPANDED_FORMULA_DISPLAY_KEYS, FORMULA_DISPLAY_KEYS } from "../constants/formulas"
import { MATERIAL_DISPLAY_KEYS, MATERIAL_KEYS } from "../constants/materials"
import styles from './FormulaMaterialsRow.module.scss'

type Props = {
    formula: Formula
    materials: Map<string, Material>
}

type HeaderKey = keyof typeof MATERIAL_DISPLAY_KEYS

const FormulaMaterialsRow: React.FC<Props> = ({formula, materials}) => {
    const HEADER_KEYS = Object.keys(MATERIAL_DISPLAY_KEYS) as HeaderKey[] // Header cells text

    // Formats text for each formula to be in accordance with units – dollar, percent, etc.
    const getCellText = (header: HeaderKey, material: Formula['materials'][0]) => {
        const value = materials.get(material.name)?.[header]
        if (header === MATERIAL_KEYS.cost_per_ml) { // Converts int to USD
            return toDollars(value as number)
        }
        else if (header === MATERIAL_KEYS.percentage) { // Converts int to %
            return `${value}%`
        }
        else {
            return value
        }
    }

    const renderMaterialsTableHeader = (header: HeaderKey) => (
        <th 
            key={`header:${header}`}>
                {MATERIAL_DISPLAY_KEYS[header]}
        </th>
    )

    const renderMaterialCell = (header: HeaderKey, material: Formula['materials'][0]) => (
        <td>
            {getCellText(header, material)}
        </td>
    )
    
    const renderMaterialRow = (material: Formula['materials'][0]) => (
        <tr key={`material:${material.name}`}>
            {HEADER_KEYS.map((header: HeaderKey) => 
                renderMaterialCell(header, material))}
        </tr>
    )

    return (
        <tr 
            className={styles.materials}>
            <td 
                className={styles.container}
                colSpan={Object.keys(FORMULA_DISPLAY_KEYS).length - 1}>

                {/* Fragrance summary */}
                <div>
                    <h3>
                        Fragrance Summary
                    </h3>
                    {/* Render fragrance summary attributes (name, creator, category, created, notes) */}
                    {Object.keys(EXPANDED_FORMULA_DISPLAY_KEYS).map((key) => (
                        <div key={key}>
                            {EXPANDED_FORMULA_DISPLAY_KEYS[key]}: {String(formula[key as keyof typeof formula] ?? "")}
                        </div>
                    ))}

                </div>

                {/* Materials sub-table */}
                <div
                    className={styles.container__materials}>
                    <h3>Materials</h3>
                    <>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                {HEADER_KEYS.map(renderMaterialsTableHeader)}
                                </tr>
                            </thead>
                            <tbody>
                                {formula.materials.map(renderMaterialRow)}
                            </tbody>
                        </table>
                    </>
                </div>
                <p>
                    Total Cost: {toDollars(formula.cost)}
                </p>
            </td>
        </tr>
    )
}

export default FormulaMaterialsRow

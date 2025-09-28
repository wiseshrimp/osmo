/**
 * FormulaRow Component
 * 
 * Renders formula row within the formula table
 * Renders all of the formula attributes in different cells
 * Click listener to "select the formula" and expand properties
 * Renders expanded properties if selected
 * 
 */

import { type Dispatch, type SetStateAction } from "react"

import { FORMULA_DISPLAY_KEYS, FORMULA_KEYS } from "../constants/formulas"
import { toDollars } from "../lib/toDollars"
import FormulaMaterialsRow from "./FormulaMaterialsRow"
import styles from './FormulaRow.module.scss'
import tableStyles from './FormulaTable.module.scss'

type HeaderKey = keyof typeof FORMULA_DISPLAY_KEYS
type DisplayKey = Exclude<HeaderKey, typeof FORMULA_KEYS.materials>

const HEADER_KEYS = Object.keys(FORMULA_DISPLAY_KEYS) as HeaderKey[]
const MAPPABLE_KEYS = HEADER_KEYS.filter(
  (h): h is DisplayKey => h !== FORMULA_KEYS.materials
)

type Props = {
    formula: Formula
    materials: Map<string, Material>
    isSelected: boolean
    setSelectedRow: Dispatch<SetStateAction<string | null>>
}

const FormulaRow : React.FC<Props> = ({formula, isSelected, setSelectedRow, materials}) => {    
    // Formats cost formula text to USD
    const formatFormulaAttribute = (header: DisplayKey) => {
        if (header === FORMULA_KEYS.cost) {
            return toDollars(formula[header])
        }
        return formula[header]
    }

    const renderFormulaCell = (header: DisplayKey) => (
        <td
            className={tableStyles.cell}
            key={`formula:${formula.formula_id}:${header}`}>
            {formatFormulaAttribute(header)}
        </td>
    )

    // Renders individual materials that compose fragrance
    const renderMaterialCell = (material: {name: string, quantity_ml: number}) => (
        <div
            className={styles.material}
            key={`formula:${formula.formula_id}:${material.name}`}>
            {material.name}
        </div>
    )

    return (
        <>
            {/* Formula row – with click listener on the entire row thats selects (expands) the formula */}
            <tr 
                className={`${styles.row} ${isSelected && styles.selected}`}
                onClick={() => setSelectedRow(formula.formula_id)}> 
                    {/* Render attributes of formula: id, name, creator, category, cost, date, notes */}
                    {/* Hides ID attributes in .scss file – assuming that the formula names remain unique */}
                    {MAPPABLE_KEYS.map(renderFormulaCell)}

                {/* Render materials array that compose formula */}
                <td
                    className={tableStyles.cell}>
                    {formula.materials.map(renderMaterialCell)}
                </td>
            </tr>

            {/* Selected / expanded view */}
            {/* Needed to do this within FormulaRow in order to render out a full width table cell but ideally would be in the FormulaTable component */}
            {isSelected ? 
                <FormulaMaterialsRow 
                    materials={materials}
                    formula={formula} /> : null}
        </>
    )
}

export default FormulaRow

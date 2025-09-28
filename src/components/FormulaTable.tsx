import clsx from "clsx"
import { useMemo, useState } from "react"
import { FORMULA_DISPLAY_KEYS, FORMULA_KEYS } from "../constants/formulas"
import FormulaRow from "./FormulaRow"
import { SORT_KEY_SET } from "../constants/sort"

import styles from './FormulaTable.module.scss'
import Search from "./Search"

type HeaderKey = keyof typeof FORMULA_DISPLAY_KEYS
const FORMULA_HEADER_KEYS = Object.keys(FORMULA_DISPLAY_KEYS) as HeaderKey[]

const FormulaTable = (props: { formulas: Map<string, Formula>, materials: Map<string, Material>, categories: Record<string, string | null> }) => {
    // State: Filtering attributes (sortBy, searchTerm, selectedCategory)
    const [searchTerm, setSearchTerm] = useState<null | string>(null)
    const [selectedCategory, setSelectedCategory] = useState<null | string>(null)
    const [sortBy, setSortBy] = useState<{key: SortKey, dir: SortDir}>({
        key: FORMULA_KEYS.formula_name as SortKey,
        dir: 'asc'
    })
    // State: Selected row state either null (no selected formula row and thus ignore) or has the unique formula id
    const [selectedRow, setSelectedRow] = useState<null | string>(null)

    // setSortOrder Changes sortBy state - which type of sort (name, creator, date, etc.) and sort order (asc or desc)
    const setSortOrder = (key: SortKey) => {
        setSortBy(prev => prev.key === key
            ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } // Switch directions if already selected otherwise, default to asc
            : { key, dir: "asc" }
        )
    }

    const onHeaderSelect = (ev: React.MouseEvent<HTMLTableCellElement>) => { // Selects sort order
        const which = ev.currentTarget.dataset.which!
        if (SORT_KEY_SET.has(which)) {
            setSortOrder(which as SortKey)
        }
    }

    // Memoize sorting + search for performance
    // Handles all of the filtering of the rows (search, sort order, and category filtering)
    const rows = useMemo(() => {
        const formulas = Array.from(props.formulas.values())
        const direction = sortBy.dir === 'asc' ? 1 : -1

        // Sort formulas
        var sorted = formulas.sort((a, b) => {
            const va = a[sortBy.key]
            const vb = b[sortBy.key]
            if (typeof va === 'string' && typeof vb === 'string') {
                return va.localeCompare(vb) * direction
            }
            return ((va as number) - (vb as number)) * direction
        })

        // Filter by search term
        // Search "searchable" string created in organizeData(), which includes fragrance name and notes separated by white space
        // To do: Would be ideal to use a more efficient sorting API but for now, this will do
        if (searchTerm) {
            const query = searchTerm.trim().toLowerCase()
            const queryArr = query.split(/\s+/)
            sorted = sorted.filter(s => queryArr.every(t => s.searchable?.includes(t)))
        }

        // Filter by category
        if (selectedCategory) {
            sorted = sorted.filter(s => s.category === selectedCategory)
        }
        
        return sorted
    }, [props.formulas, sortBy, searchTerm, selectedCategory])

    const renderHeader = (header: keyof typeof FORMULA_DISPLAY_KEYS) => (
        <td 
            className={clsx(
                styles.header,
                styles.cell,
                SORT_KEY_SET.has(header) && styles.sortable,
                sortBy.key === header && styles.selected,
                sortBy.key === header && styles.selected && styles[sortBy.dir]
            )}
            data-which={header}
            onClick={onHeaderSelect}
            key={`header:${header}`}>
                {FORMULA_DISPLAY_KEYS[header]}
        </td>
    )

    return (
        <div>
            <Search
                setSelectedCategory={setSelectedCategory}
                categories={props.categories}
                setSearchTerm={setSearchTerm} />
            <div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {FORMULA_HEADER_KEYS.map(renderHeader)}
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map(
                            (formula: Formula) =>
                                <FormulaRow
                                    key={`row:${formula.formula_id}`}
                                    isSelected={formula.formula_id === selectedRow}
                                    setSelectedRow={setSelectedRow}
                                    materials={props.materials}
                                    formula={formula} />
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FormulaTable

/**
 * App.tsx
 * 
 * Loads CSV data, organizes data by formula, materials, and categories
 * Renders main table
 * 
 */

import { useEffect, useState } from 'react'

import csv from './data/interview.csv?url'
import FormulaTable from './components/FormulaTable'
import { organizeData } from './lib/organizeData'
import { loadCsv } from './lib/loadCsv'
import './styles/index.scss'

function App() {
  const [formulas, setFormulas] = useState<Map<string, Formula>>(new Map())
  const [materials, setMaterials] = useState<Map<string, Material>>(new Map())
  const [categories, setCategories] = useState<Record<string, string | null>>({})

  useEffect(() => {
    const getFormulas = async () => {
      const data : DataRow[] = await loadCsv(csv)

      // Parse CSV and normalize data
      const organized = organizeData(data)
      setFormulas(organized.formulaMap)
      setMaterials(organized.materialMap)
      setCategories(organized.categories) // For filteringn by category
    }

    getFormulas()
  }, [])

  return (
    <>
      <main>
        <h1>
          OSMO TAKE HOME
        </h1>
        {formulas.size ? 
          <FormulaTable 
            categories={categories}
            materials={materials}
            formulas={formulas} /> : 
          
          // Loading text if CSV hasn't loaded or data isn't parsed
          <div>Loading...</div>
        }
      </main>
    </>
  )
}

export default App

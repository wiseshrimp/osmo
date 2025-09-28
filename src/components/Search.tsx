import styles from './Search.module.scss'
import clsx from "clsx"

type Props = {
    categories: Record<string, string | null>
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>
    setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>
}

const Search = (props: Props) => {
    const renderCategory = (category: string) => (
        <option 
            key={`category:${category}`}
            value={category}>
                {category}
        </option>
    )

    const onSelectCategory = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const category = ev.target.value
        
        // Ignore of set to "All" => null selection
        props.setSelectedCategory(category === 'All' ? null : ev.target.value)
    }

    return (
        <div
            className={styles.search__container}>
                {/* Search input */}
                <div>
                    <label>
                        Search
                    </label>
                    <input 
                        className={styles.search__input}
                        type="text"
                        placeholder='Search fragrance names and notes'
                        onChange={ev => props.setSearchTerm(ev.target.value)} />
                </div>

                {/* Category select */}
                <div>
                    <label>
                        Filter by category
                    </label>
                    <select 
                        className={clsx(styles.search__input, styles.search__select)}
                        name="category-select" 
                        onChange={onSelectCategory}>
                            <option value="All">
                                All
                            </option>
                        {Object.keys(props.categories).map(renderCategory)}
                    </select>
                </div>

        </div>
    )
}

export default Search

import { useEffect ,useState } from "react";
import styles from './styles.module.css';

const SearchBar = ({ value, onChange }) => {
    const [internal, setInternal] = useState(value);

    // Keep internal state in sync when the parent clears the search (e.g., after a reset)
    useEffect(() => {
        setInternal(value);
    }, [value]);

    // Debounce – fire onChange only after the user pauses typing
    useEffect(() => {
        const handler = setTimeout(() => onChange(internal), 250);
        return () => clearTimeout(handler);
    }, [internal, onChange]);

    return (
        <div className={styles.searchWrapper} role="search">
            <div className={styles.searchBar}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                    type="search"
                    placeholder="Search jobs"
                    value={internal}
                    onChange={e => setInternal(e.target.value)}
                    className={styles.searchInput}
                    aria-label="Search jobs"
                />
            </div>
        </div>
    );
};

export default SearchBar;
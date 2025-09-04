import styles from './styles.module.css';

const CancelButton = ({ onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={styles.cancelButton}
        >
            Cancel
        </button>
    );
};

export default CancelButton;
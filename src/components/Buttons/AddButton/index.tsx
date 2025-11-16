import styles from './styles.module.css';

interface ButtonProps {
    label?: string;
    onClick?: () => void;
}

const AddButton: React.FC<ButtonProps> = ({ label = 'Add Job', onClick }) => {
    return (
        <button
            type="submit"
            className={styles.addButton}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default AddButton;
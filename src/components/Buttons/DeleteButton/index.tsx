import styles from './styles.module.css';

interface ButtonProps {
    label?: string;
    onClick?: () => void;
}

const DeleteButton: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
            type="button"
            className={styles.deleteButton}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default DeleteButton;
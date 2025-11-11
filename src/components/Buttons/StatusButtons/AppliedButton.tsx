import styles from './Buttons.module.css';

interface ButtonProps {
    onclick?: () => void;
    isActive?: boolean;
}

const AppliedButton: React.FC<ButtonProps> = ({ onClick, isActive }) => {
    const combinedClassName = `
        ${styles.buttonBase} 
        ${styles.appliedButton} 
        ${isActive ? styles.activeButton : styles.inactiveButton}
    `.trim();

    return (
        <button
            type="button"
            className={combinedClassName}
            onClick={onClick}
        >
            Applied
        </button>
    );
};

export default AppliedButton;
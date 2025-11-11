import styles from './Buttons.module.css';

interface ButtonProps {
  onClick?: () => void;
  isActive?: boolean;
}

const RejectedButton: React.FC<ButtonProps> = ({ onClick, isActive }) => {
  const combinedClassName = `
    ${styles.buttonBase} 
    ${styles.rejectedButton} 
    ${isActive ? styles.activeButton : styles.inactiveButton}
  `.trim();

  return (
    <button type="button" className={combinedClassName} onClick={onClick}>
      Rejected
    </button>
  );
};

export default RejectedButton;
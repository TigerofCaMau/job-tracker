import styles from './Buttons.module.css';

interface ButtonProps {
  onClick?: () => void;
  isActive?: boolean;
}

const InterviewButton: React.FC<ButtonProps> = ({ onClick, isActive }) => {
  const combinedClassName = `
    ${styles.buttonBase} 
    ${styles.interviewButton} 
    ${isActive ? styles.activeButton : styles.inactiveButton}
  `.trim();

  return (
    <button type="button" className={combinedClassName} onClick={onClick}>
      Interviewing
    </button>
  );
};

export default InterviewButton;
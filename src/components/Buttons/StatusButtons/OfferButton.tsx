import styles from './Buttons.module.css';

interface ButtonProps {
  onClick?: () => void;
  isActive?: boolean;
}

const OfferButton: React.FC<ButtonProps> = ({ onClick, isActive }) => {
  const combinedClassName = `
    ${styles.buttonBase} 
    ${styles.offerButton} 
    ${isActive ? styles.activeButton : styles.inactiveButton}
  `.trim();

  return (
    <button type="button" className={combinedClassName} onClick={onClick}>
      Offer
    </button>
  );
};

export default OfferButton;
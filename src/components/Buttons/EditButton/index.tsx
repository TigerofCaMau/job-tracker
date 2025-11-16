import styles from './styles.module.css';

const EditButton = ({ label = "Edit", onClick }) => {
  return (
    <button
        className={styles.editButton}
        onClick={onClick}
    >
      {label}
    </button>
  );
};

export default EditButton;
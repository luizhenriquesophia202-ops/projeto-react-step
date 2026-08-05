import styles from './Button.module.css';

const ButtonModules = ({ label }) => {
  return <button className={styles.btnCustom}>{label}</button>;
};

export default ButtonModules;
          
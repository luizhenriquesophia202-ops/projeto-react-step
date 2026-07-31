
const ButtonInline = ({ label, primary }) => {
  const styles = {
    backgroundColor: primary ? '#1976d2' : '#9e9e9e',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '4px',
  };

  return <button style={styles}>{label}</button>;
};

export default ButtonInline;
          
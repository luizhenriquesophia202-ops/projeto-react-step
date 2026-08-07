
import Button from '@mui/material/Button';

const ButtonMUI = ({ label, primary }) => {
  return (
    <Button variant="contained" color={primary ? 'primary' : 'secondary'}>
      {label}
    </Button>
  );
};

export default ButtonMUI;
          
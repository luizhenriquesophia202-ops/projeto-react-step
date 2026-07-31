
import styled from 'styled-components';

const StyledBtn = styled.button`
  background: ${(props) => (props.primary ? '#6200ea' : '#9e9e9e')};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin: 4px;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.primary ? '#3700b3' : '#757575')};
  }
`;

const ButtonStyled = ({ label, primary }) => {
  return <StyledBtn primary={primary}>{label}</StyledBtn>;
};

export default ButtonStyled;
          
import styled from 'styled-components';
import theme from '../../utils/theme';
import mock from '../../mockdata.json'; // temporary

interface MsgProps {
  color: string;
  isInput: boolean;
  content: string;
  sender: string;
}

interface MsgColor {
  color: string;
}

const StyledLetterBox = styled.div<MsgColor>`
  font: ${theme.font['--normal-introduce-font']};
  border-radius: 16px;
  padding: 16px;
  background-color: ${props => props.color + 'd0'};
  margin: 10px;
`;

const StyledLetterPerson = styled.div`
  color: white;
`;

const StyledTo = styled.span`
  color: ${theme.colors['--nick-name']};
`;

const StyledLetterContent = styled.div`
  color: white;
  margin: 30px 0;
`;

const StyledFromBox = styled(StyledLetterPerson)`
  text-align: right;
`;

const StyledFrom = styled.span`
  color: ${theme.colors['--primary-redp-variant']};
`;

const StyledInputBox = styled.div`
  display: flex;
  width: 100%;
`;

const Msg = (props: MsgProps) => {
  const userName = mock.user_name;
  return (
    <StyledLetterBox color={props.color}>
      <StyledLetterPerson>
        To. <StyledTo>{userName}</StyledTo>
      </StyledLetterPerson>

      {props.isInput ? (
        <StyledInputBox>
          <input type="text" />
        </StyledInputBox>
      ) : (
        <StyledLetterContent>{props.content}</StyledLetterContent>
      )}

      <StyledFromBox>
        From.&nbsp;
        <StyledFrom>
          {props.sender === '' ? <input type="text" /> : props.sender}
        </StyledFrom>
      </StyledFromBox>
    </StyledLetterBox>
  );
};

export default Msg;

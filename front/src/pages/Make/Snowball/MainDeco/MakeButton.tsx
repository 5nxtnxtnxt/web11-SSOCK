import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { LongButton, axios } from '@utils';
import { MakeDecoRecoil } from '@states';

interface MakeButtonProps {
  color: string;
}

interface ButtonProps {
  text: string;
  color: string;
  view: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  visible: [number, React.Dispatch<React.SetStateAction<number>>];
}

const StyledButton = styled(LongButton)<MakeButtonProps>`
  background-color: ${props => props.color};
`;

const MakeButtonWrap = styled.div`
  width: 100%;
`;

const StyledAlert = styled.div`
  color: ${props => props.theme.colors['--white-primary']};
  padding-bottom: 1rem;
  font: ${props => props.theme.font['--normal-introduce-font']};
`;

const MakeButton = (props: ButtonProps) => {
  const navigate = useNavigate();
  const { snowballName, mainDecoID, mainColor, bottomID, bottomColor } =
    useRecoilValue(MakeDecoRecoil);
  const [alert, setAlert] = useState(false);

  const ClickedMake = () => {
    if (snowballName === '') {
      setAlert(true);
      return;
    }

    const snowballInfo = {
      title: snowballName,
      main_decoration_id: mainDecoID,
      main_decoration_color: mainColor,
      bottom_decoration_id: bottomID,
      bottom_decoration_color: bottomColor,
      is_message_private: false
    };

    axios
      .post('/api/snowball', snowballInfo, { withCredentials: true })
      .catch(() => navigate('/'));

    props.view[1](!props.view[0]);
    props.visible[1](-1);
  };

  return (
    <>
      <MakeButtonWrap>
        {alert ? (
          <StyledAlert>스노우볼 이름을 입력해주세요 !</StyledAlert>
        ) : null}
        <StyledButton color={props.color} onClick={ClickedMake}>
          {props.text}
        </StyledButton>
      </MakeButtonWrap>
    </>
  );
};

export default MakeButton;

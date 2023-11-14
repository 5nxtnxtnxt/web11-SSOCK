import { useState } from 'react';
import styled from 'styled-components';
import theme from '../../utils/theme';
import { Button } from '../Button';
import { Introduce } from '../Introduce';
import { LoginBox } from '../LoginBox';

const ButtonBox = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 36px;
  align-items: center;
  margin: auto;
`;

const IntroButtonBox = () => {
  const [isIntroduce, setIsIntroduce] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      {!isIntroduce && !isLogin ? (
        <ButtonBox>
          <Button
            text={'소개페이지'}
            color={theme.colors['--primary-red-primary']}
            view={[isIntroduce, setIsIntroduce]}
          />
          <Button
            text={'로그인'}
            color={theme.colors['--primary-green-primary']}
            view={[isLogin, setIsLogin]}
          />
        </ButtonBox>
      ) : null}

      {isIntroduce ? (
        <Introduce view={[isIntroduce, setIsIntroduce]} />
      ) : isLogin ? (
        <LoginBox view={[isLogin, setIsLogin]} />
      ) : null}
    </>
  );
};

export default IntroButtonBox;

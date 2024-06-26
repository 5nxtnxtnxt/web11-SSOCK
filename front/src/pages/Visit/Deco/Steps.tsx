import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Container, theme } from '@utils';
import { SnowBallRecoil, VisitDecoRecoil } from '@states';
import { HeaderText, StepButton } from '@components';
import DecoBox from './DecoBox';
import DecoEnroll from './DecoEnroll';
import MsgBox from './MsgBox';
import PostButton from './PostButton';

const StateBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const StateBox = styled.div`
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  background-color: ${props => props.color};
  transition: background-color 0.5s ease-in-out;
`;

const StyledBody = styled.div`
  max-height: fit-content;
  overflow-y: scroll;
  pointer-events: none;
  * {
    pointer-events: all;
  }
`;

const StyledBottomWrap = styled.div`
  min-height: 15rem;
  display: flex;
  flex-direction: column;
`;

const StyledButtonWrap = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
`;

const SelectDecoBox = styled.div`
  overflow: hidden;
  display: flex;
  padding: 1rem;
  width: 100%;
  height: 10rem;
  background-color: rgba(236, 236, 236, 0.5);
  pointer-events: stroke;
  * {
    pointer-events: stroke;
  }
`;

const SelectDeco = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 0;
  gap: 1rem;
  min-width: min-content;
`;

const ColorInput = styled.input.attrs({
  type: 'color'
})`
  width: 3rem;
  height: 3rem;
`;

const ButtonBox = styled.div`
  display: flex;
  height: 10rem;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const ToastMsg = styled.div`
  position: fixed;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);

  font: ${props => props.theme.font['--normal-button-font']};
  background-color: ${props => props.theme.colors['--sub-text']};
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;
  font-size: 1rem;
`;

const Steps = () => {
  const [step, setStep] = useState(0);
  const [lastBox, setLastBox] = useState(false);
  const [isDecoBoxClicked, setIsDecoBoxClicked] = useState(false);
  const [startClickedX, setStartClickedX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [{ color }, setVisitDecoBox] = useRecoilState(VisitDecoRecoil);
  const { userData } = useRecoilValue(SnowBallRecoil);

  const doneStep = -1;
  const selectDeco = 0;
  const selectColor = 1;
  const selectMsgColor = 2;
  const writeMsg = 3;

  const selectDecoBox = useRef<HTMLDivElement>(null);

  const mouseDown = (event: MouseEvent) => {
    setIsDecoBoxClicked(true);
    setStartClickedX(event.pageX - selectDecoBox.current!.offsetLeft);
    setScrollLeft(selectDecoBox.current!.scrollLeft);
  };

  const touchDown = (event: TouchEvent) => {
    setIsDecoBoxClicked(true);
    setStartClickedX(
      event.touches[0].pageX - selectDecoBox.current!.offsetLeft
    );
    setScrollLeft(selectDecoBox.current!.scrollLeft);
  };

  const leave = () => setIsDecoBoxClicked(false);
  const up = () => setIsDecoBoxClicked(false);

  const mouseMove = (event: MouseEvent) => {
    if (!isDecoBoxClicked) return;
    event.preventDefault();
    const nowX = event.pageX - selectDecoBox.current!.offsetLeft;
    const move = nowX - startClickedX;
    selectDecoBox.current!.scrollLeft = scrollLeft - move;
  };

  const touchMove = (event: TouchEvent) => {
    if (!isDecoBoxClicked) return;
    event.preventDefault();
    const nowX = event.touches[0].pageX - selectDecoBox.current!.offsetLeft;
    const move = nowX - startClickedX;
    selectDecoBox.current!.scrollLeft = scrollLeft - move;
  };

  useEffect(() => {
    if (selectDecoBox.current) {
      const decoBoxRef = selectDecoBox.current;

      decoBoxRef.addEventListener('mousedown', mouseDown);
      decoBoxRef.addEventListener('mouseleave', leave);
      decoBoxRef.addEventListener('mouseup', up);
      decoBoxRef.addEventListener('mousemove', mouseMove);

      decoBoxRef.addEventListener('touchstart', touchDown);
      decoBoxRef.addEventListener('touchend', up);
      decoBoxRef.addEventListener('touchmove', touchMove);
    }

    return () => {
      selectDecoBox.current?.removeEventListener('mousedown', mouseDown);
      selectDecoBox.current?.removeEventListener('mouseleave', leave);
      selectDecoBox.current?.removeEventListener('mouseup', up);
      selectDecoBox.current?.removeEventListener('mousemove', mouseMove);

      selectDecoBox.current?.removeEventListener('touchstart', touchDown);
      selectDecoBox.current?.removeEventListener('touchend', up);
      selectDecoBox.current?.removeEventListener('touchmove', touchMove);
    };
  }, [isDecoBoxClicked]);

  const [toast, setToast] = useState(false);

  const timer = useRef<number | null>(null);
  const setToastMsg = () => {
    if (timer.current) clearTimeout(timer.current);
    if (step === selectDeco || step === selectMsgColor) {
      setToast(true);
      timer.current = window.setTimeout(() => {
        setToast(false);
      }, 1500);
    } else {
      setToast(false);
    }
  };

  useEffect(() => {
    setToastMsg();
  }, [step]);

  const renderStateBoxes = () => {
    const boxes = [];
    for (let i = 0; i <= step; i++) {
      const progressColor = theme.colors['--progress-done'];
      boxes.push(<StateBox key={i} color={progressColor}></StateBox>);
    }
    for (let i = step + 1; i < writeMsg; i++) {
      const progressColor = theme.colors['--progress-yet'];
      boxes.push(<StateBox key={i} color={progressColor}></StateBox>);
    }
    return boxes;
  };

  return (
    <>
      {toast ? (
        <ToastMsg>
          {step === selectDeco
            ? '드래그를 하여 여러 장식을 확인해보세요 !'
            : '드래그를 하여 여러 색깔을 확인해보세요 !'}
        </ToastMsg>
      ) : null}

      <Container>
        <HeaderText Ref={null} userName={userData.nickname} />

        {step === writeMsg || step === doneStep ? null : (
          <StateBar>{renderStateBoxes()}</StateBar>
        )}
      </Container>

      <StyledBody>
        {step === selectMsgColor ? <MsgBox isInput={false} /> : null}
        {step === writeMsg ? <MsgBox isInput={true} /> : null}
      </StyledBody>

      <StyledBottomWrap>
        <StyledButtonWrap>
          {step <= selectDeco ? (
            <div />
          ) : (
            <StepButton
              text="< 이전"
              step="decrease"
              color={theme.colors['--primary-red-primary']}
              view={[step, setStep]}
              disabled={false}
            />
          )}

          {step >= writeMsg || step === doneStep ? (
            <div />
          ) : (
            <StepButton
              text="다음 >"
              step="increase"
              color={theme.colors['--primary-red-primary']}
              view={[step, setStep]}
              disabled={false}
            />
          )}
        </StyledButtonWrap>

        <SelectDecoBox ref={selectDecoBox}>
          <SelectDeco>
            {step === selectDeco ? <DecoBox deco={'Deco'} /> : null}
            {step === selectColor ? (
              <>
                <ColorInput
                  value={color}
                  onChange={e =>
                    setVisitDecoBox(prev => ({
                      ...prev,
                      color: e.target.value
                    }))
                  }
                />
                <p>장식 색상을 선택해주세요</p>
              </>
            ) : null}

            {step === selectMsgColor ? <DecoBox deco={'MsgColor'} /> : null}
            {step === writeMsg ? (
              <ButtonBox>
                <PostButton
                  text="선물하기"
                  color={theme.colors['--primary-red-primary']}
                  view={[lastBox, setLastBox]}
                  visible={[step, setStep]}
                />
              </ButtonBox>
            ) : null}
          </SelectDeco>
        </SelectDecoBox>
      </StyledBottomWrap>

      {step === doneStep && lastBox === true ? (
        <DecoEnroll visible={[step, setStep]} view={[lastBox, setLastBox]} />
      ) : null}
    </>
  );
};

export default Steps;

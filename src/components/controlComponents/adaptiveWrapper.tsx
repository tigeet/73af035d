import styled from "styled-components";

interface IParams {
  width?: number;
  className?: string;
  children: JSX.Element;
}

const AdaptiveWrapper = ({ width, className, children }: IParams) => {
  return (
    <Container width={width} className={className}>
      {children}
    </Container>
  );
};

export default AdaptiveWrapper;

interface SProps {
  width?: number;
}

const Container = styled.div<SProps>`
  width: ${(props) => (props.width ? props.width + "px" : "100%")};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

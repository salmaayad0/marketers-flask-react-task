import { ReactNode } from "react";
import styled from "styled-components";

interface BackgroundProps {
  children: ReactNode;
}

const Background = styled.div<BackgroundProps>`
  background: url("/media/img.jpg");
  background-size: contain;
  background-attachment: scroll;
  transition: all 3ms ease-in-out;

&:hover section{
    background-color: rgb(154,152,207);
}
`;

export default Background;

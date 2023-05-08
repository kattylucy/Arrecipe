import { Skeleton, Stack } from "@chakra-ui/react";
import styled from "styled-components";

interface SkeletonProps {
  isMobileView?: boolean;
}

const StyledStack = styled(Stack)<{ mobile?: boolean }>(({ mobile }) => ({
  width: mobile ? "100%" : "30%",
  margin: "20px 12px",
  ".chakra-skeleton": {
    borderRadius: 20,
  },
}));

const Wrapper = styled.div({
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
});

const Container = styled.div<{ mobile?: boolean }>(({ mobile }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
  "& > div": {
    width: mobile ? "100%" : "30%",
  },
}));

const Card = styled(Skeleton)({
  height: 350,
});

const Stacks = ({ isMobileView }: SkeletonProps) => {
  return (
    <StyledStack mobile={isMobileView}>
      <Card startColor="#D9D9D9" endColor="#D9D9D9.900" />
      <Skeleton startColor="#D9D9D9" endColor="#D9D9D9.900" height="20px" />
      <Container mobile={isMobileView}>
        <Skeleton startColor="#D9D9D9" endColor="#D9D9D9.900" height="20px" />
        <Skeleton startColor="#D9D9D9" endColor="#D9D9D9.900" height="20px" />
        <Skeleton startColor="#D9D9D9" endColor="#D9D9D9.900" height="20px" />
      </Container>
    </StyledStack>
  );
};

export const SkeletonLoader = ({ isMobileView }: SkeletonProps) => {
  return (
    <Wrapper>
      <Stacks isMobileView={isMobileView} />
      <Stacks isMobileView={isMobileView} />
      <Stacks isMobileView={isMobileView} />
      <Stacks isMobileView={isMobileView} />
      <Stacks isMobileView={isMobileView} />
      <Stacks isMobileView={isMobileView} />
      <Stacks isMobileView={isMobileView} />
      <Stacks isMobileView={isMobileView} />
      <Stacks isMobileView={isMobileView} />
    </Wrapper>
  );
};

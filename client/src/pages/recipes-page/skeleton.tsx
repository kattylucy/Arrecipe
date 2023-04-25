import { Skeleton, Stack } from "@chakra-ui/react";
import styled from "styled-components";

const StyledStack = styled(Stack)({
  width: "30%",
  margin: "20px 12px",
  ".chakra-skeleton": {
    borderRadius: 20,
  },
});

const Wrapper = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  flexWrap: "wrap",
});

const Container = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  "& > div": {
    width: "30%",
  },
});

const Card = styled(Skeleton)({
  height: 350,
});

const Stacks = () => {
  return (
    <StyledStack>
      <Card startColor="#D9D9D9" endColor="#D9D9D9.900" />
      <Skeleton startColor="#D9D9D9" endColor="#D9D9D9.900" height="20px" />
      <Container>
        <Skeleton startColor="#D9D9D9" endColor="#D9D9D9.900" height="20px" />
        <Skeleton startColor="#D9D9D9" endColor="#D9D9D9.900" height="20px" />
        <Skeleton startColor="#D9D9D9" endColor="#D9D9D9.900" height="20px" />
      </Container>
    </StyledStack>
  );
};

export const SkeletonLoader = () => {
  return (
    <Wrapper>
      <Stacks />
      <Stacks />
      <Stacks />
      <Stacks />
      <Stacks />
      <Stacks />
      <Stacks />
      <Stacks />
      <Stacks />
    </Wrapper>
  );
};

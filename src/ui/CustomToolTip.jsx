import styled from "styled-components";

const ToolTipContainer = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);

  padding: 1.2rem;
`;

const StyledSpan = styled.span`
  color: var(--color-brand-500);
`;

export default function CustomToolTip({ payload }) {
  const data = payload.at(0)?.payload;
  return (
    <ToolTipContainer>
      <p>{data?.label}</p>
      <p>
        <StyledSpan>Number of Transactions: </StyledSpan>
        {data?.numTransactions}
      </p>
      <p>
        <StyledSpan>Transactions Total Amount: </StyledSpan>${data?.totalAmount}
      </p>
    </ToolTipContainer>
  );
}

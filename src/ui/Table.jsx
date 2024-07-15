import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: 7px;
  min-height: 20rem;

  display: flex;
  flex-direction: column;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  text-align: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
  text-align: center;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  cursor: pointer;

  transition: all 0.3s;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:hover {
    background-color: var(--color-brand-500);
    color: var(--color-brand-50);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}

function Row({ children, onClick, styles }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" onClick={onClick} columns={columns} style={styles}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  return <StyledBody>{data?.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
export default Table;

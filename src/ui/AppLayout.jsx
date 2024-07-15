import styled from "styled-components";
import TransactionsTable from "../features/Transactions/TransactionsTable";
import TransactionsGraph from "../features/Transactions/TransactionsGraph";
import { useUsers } from "../features/Transactions/useUsers";
import { useTransactions } from "../features/Transactions/useTransactions";
import { useEffect, useMemo, useState } from "react";
import TransactionsFilter from "../features/Transactions/TransactionsFilter";
import TransactionsSort from "../features/Transactions/TransactionsSort";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10rem 1fr;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: var(--color-brand-200);
  color: var(--color-brand-900);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem;

  @media only screen and (max-width: 1200px) {
    padding: 2rem;
  }
`;

const Container = styled.div`
  max-width: 140rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem 4.8rem;

  @media only screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const sortOptions = [
  { value: "name-desc", label: "Sort by name (A-Z)" },
  { value: "name-asc", label: "Sort by name (Z-A)" },
  { value: "numTransactions-desc", label: "Sort by Transactions (high first)" },
  { value: "numTransactions-asc", label: "Sort by Transactions (low first)" },
  { value: "totalAmount-desc", label: "Sort by Amount (high first)" },
  { value: "totalAmount-asc", label: "Sort by Amount (low first)" },
];

export default function AppLayout() {
  const { users, isLoading: isUsersLoading } = useUsers();
  const { transactions, isLoading: isTransactionsLoading } = useTransactions();

  const [selectedUser, setSelectedUser] = useState(null);

  const [filterName, setFilterName] = useState("");
  const [filterAmount, setFilterAmount] = useState("");

  const [sortedBy, setSortedBy] = useState(sortOptions.at(0).value);

  const structuredData = useMemo(
    () =>
      users?.map((user) => {
        return {
          ...user,
          transactions: transactions?.filter(
            (transaction) => +transaction.customer_id === +user.id
          ),
          totalAmount: transactions
            ?.filter((transaction) => +transaction.customer_id === +user.id)
            .reduce((acc, cur) => acc + cur.amount, 0),
        };
      }),
    [users, transactions]
  );

  const filteredList = useMemo(() => {
    return structuredData?.filter((user) => {
      return user?.name?.toLowerCase()?.includes(filterName.toLowerCase()) &&
        user?.totalAmount >= +filterAmount
        ? user
        : "";
    });
  }, [structuredData, filterName, filterAmount]);

  const sortedList = useMemo(() => {
    const [field, order] = sortedBy.split("-");
    // sort by name
    if (field === "name") {
      if (order === "desc") {
        return filteredList?.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      } else {
        return filteredList?.sort((b, a) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      }
      // sort by number of transactions or total amount
    } else if (field === "numTransactions" || field === "totalAmount") {
      if (order === "desc") {
        return filteredList?.sort((a, b) =>
          field === "numTransactions"
            ? b.transactions.length - a.transactions.length
            : b.totalAmount - a.totalAmount
        );
      } else {
        return filteredList?.sort((a, b) =>
          field === "numTransactions"
            ? a.transactions.length - b.transactions.length
            : a.totalAmount - b.totalAmount
        );
      }
    }
  }, [sortedBy, filteredList]);

  const isDataLoading = useMemo(
    () => isUsersLoading || isTransactionsLoading,
    [isUsersLoading, isTransactionsLoading]
  );

  useEffect(() => {
    setSelectedUser(filteredList?.at(0)?.id);
  }, [filteredList]);

  return (
    <StyledAppLayout>
      <Header>
        <h2 style={{ textAlign: "center" }}>Route Frontend Tech Summit</h2>
      </Header>
      <Main>
        <Container>
          <TableContainer>
            <TransactionsFilter
              filterName={filterName}
              setFilterName={setFilterName}
              filterAmount={filterAmount}
              setFilterAmount={setFilterAmount}
            />

            <TransactionsSort
              options={sortOptions}
              sortedBy={sortedBy}
              onSortBy={setSortedBy}
            />

            <TransactionsTable
              users={sortedList}
              isDataLoading={isDataLoading}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </TableContainer>

          <TransactionsGraph
            users={structuredData}
            selectedUser={selectedUser}
          />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

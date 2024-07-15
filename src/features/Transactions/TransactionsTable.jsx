import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";

const EmptyUsers = styled.div`
  padding: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
`;

export default function TransactionsTable({
  users,
  isDataLoading,
  selectedUser,
  onSelectUser,
}) {
  return (
    <Table columns="1fr 1fr 1fr">
      <Table.Header>
        <div>Customer</div>
        <div>Total Transactions</div>
        <div>Total Amount</div>
      </Table.Header>

      {isDataLoading ? (
        <Spinner />
      ) : !users?.length ? (
        <EmptyUsers>No Customers to Display</EmptyUsers>
      ) : (
        <Table.Body
          data={users}
          render={(customer) => (
            <Table.Row
              key={customer.id}
              onClick={() => onSelectUser(customer.id)}
              styles={
                customer.id === selectedUser
                  ? {
                      backgroundColor: "var(--color-brand-600)",
                      color: "var(--color-brand-50)",
                    }
                  : {}
              }
            >
              <div>{customer.name}</div>

              <div>{customer.transactions.length}</div>

              <div>${customer.totalAmount}</div>
            </Table.Row>
          )}
        />
      )}
    </Table>
  );
}

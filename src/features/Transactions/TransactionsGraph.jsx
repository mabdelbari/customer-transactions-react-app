import styled from "styled-components";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import CustomToolTip from "../../ui/CustomToolTip";

const StyledSalesChart = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-height: 20rem;
`;

const StyledEmpty = styled(StyledSalesChart)`
  justify-content: center;
  align-items: center;
`;

function TransactionsGraph({ users, selectedUser }) {
  const customer = users?.filter((user) => user.id === selectedUser).at(0);

  if (!customer?.transactions?.length)
    return <StyledEmpty>No Transactions For This Customer</StyledEmpty>;

  const allDates = Array.from(
    new Set(
      customer?.transactions.map((transaction) => transaction.date).sort()
    )
  ).map((date) => format(date, "MMM dd yyyy"));

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      numTransactions: customer.transactions.filter(
        (transaction) => format(transaction.date, "MMM dd yyyy") === date
      ).length,
      totalAmount: customer.transactions
        .filter(
          (transaction) => format(transaction.date, "MMM dd yyyy") === date
        )
        .reduce((acc, cur) => acc + cur.amount, 0),
    };
  });

  const colors = {
    numTransactions: { stroke: "#16a34a", fill: "#dcfce7" },
    totalAmount: { stroke: "#4f46e5", fill: "#c7d2fe" },
    text: "#374151",
    background: "#fff",
  };

  return (
    <StyledSalesChart>
      <h3
        style={{
          backgroundColor: "var(--color-grey-50)",
          borderBottom: "1px solid var(--color-grey-100)",
          padding: "1.6rem",
          textAlign: "center",
        }}
      >
        Transactions Summary from {allDates.at(0)} - {allDates.at(-1)}
      </h3>

      <ResponsiveContainer
        minHeight={200}
        width="100%"
        style={{ padding: "0 1.6rem" }}
      >
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip content={<CustomToolTip />} />
          {selectedUser && (
            <>
              <Area
                dataKey="totalAmount"
                type="monotone"
                stroke={colors.totalAmount.stroke}
                fill={colors.totalAmount.fill}
                strokeWidth={2}
                name="Transactions Total Amount"
                unit="$"
              />
            </>
          )}
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
export default TransactionsGraph;

import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";

export function useTransactions() {
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return { transactions, isLoading, error };
}

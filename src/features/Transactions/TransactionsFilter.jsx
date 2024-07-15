import Input from "../../ui/Input";

export default function TransactionsFilter({
  filterName,
  setFilterName,
  filterAmount,
  setFilterAmount,
}) {
  return (
    <>
      <Input
        id="filterName"
        type="text"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        placeholder="Filter by name"
      />

      <Input
        type="number"
        value={filterAmount}
        onChange={(e) => setFilterAmount(e.target.value)}
        placeholder="Filter by amount"
      />
    </>
  );
}

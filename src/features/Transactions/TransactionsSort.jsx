import Select from "../../ui/Select";

function TransactionsSort({ options, sortedBy, onSortBy }) {
  function handleChange(e) {
    onSortBy(e.target.value);
  }

  return (
    <div>
      <Select
        options={options}
        type="white"
        value={sortedBy}
        onChange={handleChange}
      />
    </div>
  );
}
export default TransactionsSort;

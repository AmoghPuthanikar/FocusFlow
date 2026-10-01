function FilterBar({ currentFilter, onFilterChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <nav className="filter-bar" aria-label="Task filters">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={currentFilter === filter ? "active" : ""}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </nav>
  );
}

export default FilterBar;
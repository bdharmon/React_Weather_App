import "../styles.css";

export default function SearchBar({ searchEntry, searchHandler, filteredData }) {

  return (

    <div>
      <ul className="filtered-list">
        {filteredData}
      </ul>

      <form className="search-bar">
        <input
          onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
          type="text"
          placeholder="Search City..."
          value={searchEntry}
          onChange={(e) => searchHandler(e)}
        ></input>
      </form>
    </div>
  );
}

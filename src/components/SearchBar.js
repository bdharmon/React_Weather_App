import "../styles.css";

export default function SearchBar({ searchEntry, searchHandler, fetchData }) {

  return (

    <div>
      <form className="search-bar" onSubmit={(e) => fetchData(e, searchEntry)}>
        <input
          type="text"
          placeholder="Search City..."
          value={searchEntry}
          onChange={(e) => searchHandler(e)}
        >
        </input>
      </form>
    </div>
  );
}

// 👻 Developed by DanBi Choi on Aug 28th, 2023.
// -----------------------------------------------------
import { BsSearch } from "react-icons/bs";

export default function SearchUI({
    handleSearch,
    searchKeyword,
    setSearchKeyword,
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
        >
            <button type="submit" className="search-btn">
                <BsSearch />
            </button>
            <input
                type="search"
                value={searchKeyword}
                placeholder="Search"
                onChange={(e) => setSearchKeyword(e.target.value)}
            ></input>
        </form>
    );
}

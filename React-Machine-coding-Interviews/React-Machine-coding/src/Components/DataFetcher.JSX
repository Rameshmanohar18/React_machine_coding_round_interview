import  { useEffect, useState } from "react";

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 🔍 Search
  const filteredData = data.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase()),
  );

  // ↕️ Sort
  const sortedData = [...filteredData].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id,
  );

  // 🔢 Pagination
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentRows = sortedData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, rowsPerPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Posts Dashboard</h2>

      {/* Controls */}
      {/* <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}> */}
      <div className="controls">
        <input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Sort ID ↑</option>
          <option value="desc">Sort ID ↓</option>
        </select>

        <select onChange={(e) => setRowsPerPage(Number(e.target.value))}>
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
          <option value={50}>50 rows</option>
          <option value={100}>100 rows </option>
        </select>
      </div>

      {/* Table */}
      <table
        className="table"
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((post) => (
            <tr
              key={post.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#fafafa")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination" style={{ marginTop: "10px" }}>
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataFetcher;

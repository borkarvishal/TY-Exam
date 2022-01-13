import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./home.css";

// import "./Home.css";

const Home = () => {
  let [state, setState] = useState([]);
  let [loading, setLoading] = useState(false);
  let [pageNumber, setPageNumber] = useState(0);
  let userPerPage = 10;
  let pageVisited = pageNumber * userPerPage;

  let displayUser = state
    .slice(pageVisited, pageVisited + userPerPage)
    .map(x => (
      <tr key={x.id} className="bodyrow">
        <td>{x.id}</td>
        <td>{x.title}</td>
        <td>
          <p className={x.completed ? "btn btn-primary" : "btn btn-danger"}>
            {x.completed ? "completed" : "pending"}
          </p>
        </td>
      </tr>
    ));
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
      console.log(res.data);
      setState(res.data);
      // setPagination(_(res.data).slice(0).take(pageSize).value())
    });
  }, []);

  let pageCount = Math.ceil(state.length / userPerPage);

  let changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <section>
      {loading === true ? (
        "loading...."
      ) : (
        <table className="table">
          <thead>
            <tr className="headRow">
              <th>id</th>
              <th>title</th>
              <th>completed</th>
            </tr>
          </thead>

          <tbody>{displayUser}</tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ReactPaginate
          className="pagination"
          previousLable={"Previous"}
          nextLable={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClass={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disableClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </nav>
    </section>
  );
};

export default Home;

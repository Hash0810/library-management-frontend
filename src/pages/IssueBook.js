import React, { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import "../styles/IssueBook.css";

function BookRequestManager() {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;
  const userRole = localStorage.getItem("role")?.toUpperCase();
  useEffect(() => {
    fetchRequests();
  }, [statusFilter]);

  useEffect(() => {
    applySearchFilter();
  }, [searchTerm, requests]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/api/requests?status=${statusFilter}`);
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      await api.put(`/librarian/${action}Request`, { requestId });
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error(`Error trying to ${action} request:`, error);
    }
  };

  const applySearchFilter = () => {
    const term = searchTerm.toLowerCase();
    const filtered = requests.filter(req =>
      req.student.username.toLowerCase().includes(term) ||
      req.book.bookName.toLowerCase().includes(term)
    );
    setFiltered(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / requestsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage(prev =>
      direction === "next"
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  if (loading) return <div className="loading">Loading requests...</div>;

  return (
    <div className="container">
      <Navbar role={userRole}/>
      <h2 className="title">Manage Book Requests</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by student or book"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {currentRequests.length === 0 ? (
        <p className="no-requests">No requests found.</p>
      ) : (
        <table className="request-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Book</th>
              <th>Status</th>
              {statusFilter === "PENDING" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.student.username}</td>
                <td>{req.book.bookName}</td>
                <td>{req.status}</td>
                {statusFilter === "PENDING" && (
                  <td>
                    <button
                      className="approve"
                      onClick={() => handleAction(req.id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() => handleAction(req.id, "reject")}
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}

export default BookRequestManager;

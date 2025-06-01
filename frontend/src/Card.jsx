import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function Card() {
  const [cards, setcards] = useState([]);
  const [EditId, setEditId] = useState(null);
  const [fromData, setformData] = useState({ title: "", discription: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/post/fetchAll",
        { withCredentials: true }
      );
      setcards(response.data.fetchAllCard);
    } catch (error) {
      console.error("Error fetching card", error);
    }
  };

  const save = async () => {
    if (EditId) {
      const confirm = window.confirm(
        "Are you sure want to update the card...."
      );
      if (!confirm) return;
      try {
        const response = await axios.put(
          `http://localhost:3000/api/post/update/${EditId}`,
          fromData,
          { withCredentials: true }
        );
        console.log("Update successfully", response.data);

        setEditId(null);
        setformData({ title: "", discription: "" });
        fetchData();
      } catch (error) {
        console.log("error while updating", error);
      }
    } else {
      const response = await axios.post(
        "http://localhost:3000/api/post/add",
        fromData,
        { withCredentials: true }
      );
      console.log("Data add successfully", response.data);
      alert("Card added successfully");
      setformData({ title: "", discription: "" });
      fetchData();
    }
  };

  const handleUpdate = (card) => {
    setEditId(card._id);
    setformData({ title: card.title, discription: card.discription });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure to delete the card...");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:3000/api/post/delete/${id}`, {
        withCredentials: true,
      });

      setcards(cards.filter((card) => card._id !== id));
    } catch (error) {
      console.error("Error while deleting", error);
    }
  };

  return (
    <div className="container py-4">
      <div className="card p-4 mb-4 shadow">
        <h3 className="mb-3 text-center">
          {EditId ? "Edit Note" : "Create Note"}
        </h3>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Card Title"
              value={fromData.title}
              onChange={(e) =>
                setformData({ ...fromData, title: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Enter Card Description"
              rows={3}
              value={fromData.discription}
              onChange={(e) =>
                setformData({ ...fromData, discription: e.target.value })
              }
            />
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-primary" onClick={save}>
              {EditId ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>

      <div className="row">
        {cards.map((card) => (
          <div className="col-md-4 mb-4" key={card._id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.discription}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleUpdate(card)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(card._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;

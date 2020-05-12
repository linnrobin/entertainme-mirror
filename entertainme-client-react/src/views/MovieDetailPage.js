import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import {
  GET_MOVIES,
  GET_MOVIE,
  DELETE_MOVIE,
  UPDATE_MOVIE,
} from "../queries/movies";
import Loading from "../components/Loading";

function DetailPage() {
  const { id } = useParams();
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  const [deleteMovie, { data: dataDeleteMovie }] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIES }],
  });

  const [updateMovie] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIE, variables: { id } }],
  });

  const newCreate = {};
  const [newTitle, setNewTitle] = useState("");
  const [newOverview, setNewOverview] = useState("");
  const [newPoster_path, setNewPoster_path] = useState("");
  const [newPopularity, setNewPopularity] = useState(0);
  const [newTags, setNewTags] = useState([]);

  const handleTitle = (e) => {
    setNewTitle(e.target.value);
  };
  const handleOverview = (e) => {
    setNewOverview(e.target.value);
  };
  const handlePoster_path = (e) => {
    setNewPoster_path(e.target.value);
  };
  const handlePopularity = (e) => {
    setNewPopularity(e.target.value);
  };
  const handleTags = (e) => {
    setNewTags(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteMovie({ variables: { id } });
    console.log("ini data delete movie: ", dataDeleteMovie);
    toast.success("Successfully Deleted");
    history.goBack();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => {
    setNewTitle(data.movie.title);
    setNewOverview(data.movie.overview);
    setNewPoster_path(data.movie.poster_path);
    setNewPopularity(data.movie.popularity);
    setNewTags(data.movie.tags);
    setShow(true);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    newCreate.id = id;
    newCreate.title = newTitle;
    newCreate.overview = newOverview;
    newCreate.poster_path = newPoster_path;
    newCreate.popularity = +newPopularity;
    newCreate.tags = newTags;
    updateMovie({ variables: newCreate });
    toast.success("Successfully Updated");
    setShow(false);
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error...{error}</p>;
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <img
            style={{ width: "300px", padding: "0 10px 0 20px" }}
            src={data.movie.poster_path}
            alt={data.movie._id}
          />
        </div>
        <div className="col text-left mr-3">
          <h1 className="border p-2">{data.movie.title}</h1>
          <h6 className="border p-2">{data.movie.overview}</h6>
          <h3 className="border p-2">{data.movie.popularity}</h3>
          <h3 className="border p-2">
            {data.movie.tags.map((el) => {
              return (
                <button
                  className="btn btn-success m-1"
                  disabled
                  style={{ color: "white" }}
                  key={el}
                >
                  {el}
                </button>
              );
            })}
          </h3>
          <button
            className="btn btn-secondary m-2"
            onClick={() => history.goBack()}
          >
            Back
          </button>
          <button className="btn btn-primary m-2" onClick={handleShow}>
            Update
          </button>
          <button className="btn btn-danger m-2" onClick={handleDelete}>
            Delete
          </button>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="col-form-label">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleTitle}
                  value={newTitle}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Overview:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleOverview}
                  value={newOverview}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Poster Path:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlePoster_path}
                  value={newPoster_path}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Popularity:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handlePopularity}
                  value={newPopularity}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label">Tags:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleTags}
                  value={newTags}
                />
              </div>
              <button type="submit" className="btn btn-primary m-2">
                Update
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default DetailPage;

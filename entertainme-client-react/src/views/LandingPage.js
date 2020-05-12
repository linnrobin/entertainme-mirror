import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Card from "../components/Card";
import { GET_ALL } from "../queries";
import Loading from "../components/Loading";

export default () => {
  const { loading, error, data } = useQuery(GET_ALL);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error...{error}</p>;
  }

  return (
    <>
      <h1>ENTERTAINME</h1>
      <div className="row flex-column">
        <hr style={{ border: "1px solid white", width: "100vw" }} />
        <h2>Movies</h2>
        <div className="row justify-content-center m-2">
          {data.movies.map((movie) => {
            return <Card key={movie._id} content={movie} from={"movies"} />;
          })}
        </div>
      </div>

      <div className="row flex-column">
        <hr style={{ border: "1px solid white", width: "100vw" }} />
        <h2>Tv</h2>
        <div className="row justify-content-center m-2">
          {data.tvSeries.map((tv) => {
            return <Card key={tv._id} content={tv} from={"tv"} />;
          })}
        </div>
      </div>
    </>
  );
};

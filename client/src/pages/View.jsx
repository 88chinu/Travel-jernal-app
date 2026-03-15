import { useParams } from "react-router-dom";
import Navbar from "../components/Navebar";
import useFetch from "../useFetch";

export default function View(){

  const {id} = useParams();

  const {data,loading} = useFetch("/api/entries/"+id);

  return(
    <>
      <Navbar/>

      {loading ? "Loading..." : (
        <div>
          <h1>{data.title}</h1>
          <p>{data.location}</p>
          <p>{data.text}</p>
        </div>
      )}
    </>
  )
}
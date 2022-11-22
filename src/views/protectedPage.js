import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";
import FileUploader from "../utils/FileUploader";

function ProtectedPage() {
  const [res, setRes] = useState("");
  const api = useAxios();
  const [lat, setLat] = useState(0.0);
  const [lon, setLon] = useState(0.0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        try {
          setLat(position.coords.latitude)
          setLon(position.coords.longitude)
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        } catch (err) {
          console.log(err);
        }
      });
    } else {
      console.log("Geolocation is not available");
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Upload Page</h1>
        <h1>Latitude: {lat}</h1>
        <h1>Longitude: {lon}</h1>
        <FileUploader lat={lat} lon={lon} />
    </div>
  );
}

export default ProtectedPage;
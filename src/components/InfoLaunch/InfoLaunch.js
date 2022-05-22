import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Styles/index.scss";
import axios from "axios";

const InfoLaunch = (props) => {
  const paramsURL = useParams();
  const [launches, setLaunches] = useState();

  useEffect(() => {
    async function fetchData() {
      let itemID = 1;
      await axios.get("https://api.spacexdata.com/v4/launches").then((res) => {
        let newArray = res.data;

        newArray.map((item) => {
          item.itemID = itemID;
          item.desc = "Falcon-" + itemID;
          item.title = item.name;
          item.extendBoard = 0;
          itemID++;
        });

        newArray.slice(1, 10);
        setLaunches(newArray);
      });
    }
    fetchData().then((r) => r);
  }, []);

  function isItems(launch) {
    return Number(launch.itemID) === Number(paramsURL.itemID);
  }

  const oneLaunch = launches?.find(isItems);

  if (!oneLaunch) {
    return <h2>Launch not found!</h2>;
  }

  return (
    <>
      <div className={"card-launch"}>
        <div className={"link-block"}>
          <Link to="/" className={"card-link"}>
            Go to Home page
          </Link>
        </div>
        <p>
          Title: <span>{oneLaunch.title}</span>
        </p>
        <p>
          Description: <span>{oneLaunch.desc}</span>
        </p>
        <p>
          Details:{" "}
          <span>{oneLaunch.details ? oneLaunch.details : "no details"}</span>
        </p>
      </div>
    </>
  );
};

export default InfoLaunch;

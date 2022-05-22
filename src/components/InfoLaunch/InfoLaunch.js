import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import "./Styles/index.scss";
//redux
import { useSelector } from "react-redux";
import axios from "axios";

const InfoLaunch = () => {
  const paramsURL = useParams();
  const [launches, setLaunches] = useState();

  useEffect(() => {
    async function fetchData() {
      let itemID = 1;
      await axios.get("https://api.spacexdata.com/v4/launches").then((res) => {
        let newArray = res.data;

        newArray.map((item) => {
          item.itemID = itemID;
          item.desc = "Falcon" + itemID;
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
  console.log(oneLaunch);

  const twoLaunch = useSelector((state) =>
    state.counter.boardStore[1].items?.find(isItems)
  );

  const threeLaunch = useSelector((state) =>
    state.counter.boardStore[2].items?.find(isItems)
  );

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
          Title:{" "}
          <span>{oneLaunch.title || twoLaunch.title || threeLaunch.title}</span>
        </p>
        <p>
          Description:{" "}
          <span>{oneLaunch.desc || twoLaunch.desc || threeLaunch.desc}</span>
        </p>
      </div>
    </>
  );
};

InfoLaunch.propTypes = {
  data: PropTypes.any,
};

export default InfoLaunch;

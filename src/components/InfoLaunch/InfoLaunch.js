import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import "./Styles/index.scss";
//redux
import { useSelector } from "react-redux";
import axios from "axios";

const InfoLaunch = () => {
  const paramsURL = useParams();
  let newArray;

  useEffect(() => {
    async function fetchData() {
      let itemID = 1;
      await axios.get("https://api.spacexdata.com/v4/launches").then((res) => {
        newArray = res.data;

        newArray.map((item) => {
          item.itemID = itemID;
          item.desc = "Falcon" + itemID;
          item.title = item.name;
          item.extendBoard = 0;
          itemID++;
        });

        newArray.slice(1, 10);
      });
    }
    fetchData().then((r) => r);
  }, []);

  function isItems(launch) {
    return Number(launch.itemID) === Number(paramsURL.itemID);
  }

  const oneLaunch = useSelector((state) =>
    state.counter.boardStore[0].items?.find(isItems)
  );

  const twoLaunch = useSelector((state) =>
    state.counter.boardStore[1].items?.find(isItems)
  );

  const threeLaunch = useSelector((state) =>
    state.counter.boardStore[2].items?.find(isItems)
  );

  if (!oneLaunch) {
    return <h2>Launch not found!</h2>;
  }

  console.log(oneLaunch);
  console.log(twoLaunch);
  console.log(threeLaunch);

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
        <p>
          Extend Board:{" "}
          <span>
            {oneLaunch.extendBoard ||
              twoLaunch.extendBoard ||
              threeLaunch.extendBoard}
          </span>
        </p>
      </div>
    </>
  );
};

InfoLaunch.propTypes = {
  data: PropTypes.any,
};

export default InfoLaunch;

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addDataToStore } from "../../modules/counter";
import PropTypes from "prop-types";
import "./Styles/index.scss";

const Table = (props) => {
  const { data } = props;
  return (
    <div>
      <table className={"table"}>
        <thead>
          <tr className={"thead-tr"}>
            <th>Past Launches</th>
            <th>Launches</th>
            <th>My Launches</th>
          </tr>
        </thead>
        <tbody>
          <tr className={"tbody-tr"}>
            <th>
              {data.map((item) => {
                return (
                  <>
                    <div className={"block-flights"}>
                      <p>{item.name}</p>
                      <p>Falcon {item.flight_number}</p>
                    </div>
                  </>
                );
              })}
            </th>
            <th>2</th>
            <th>3</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ counter }) => ({
  data: counter.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addDataToStore,
    },
    dispatch
  );

Table.propTypes = {
  addDataToStore: PropTypes.any,
  data: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

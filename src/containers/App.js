import React, { Component } from "react";
import { connect } from "react-redux";
import Cardlist from "../component/Cardlist";
import Searchbox from "../component/Searchbox";
import Scroll from "../component/Scroll";
import Errorboundary from "../component/Errorboundary";
import "./App.css";
import { setSearchField, requestRobots } from "../action";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};
class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filterRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return isPending ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1>RoboFriends</h1>
        <Searchbox searchChange={onSearchChange} />
        <Scroll>
          <Errorboundary>
            <Cardlist robots={filterRobots} />
          </Errorboundary>
        </Scroll>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

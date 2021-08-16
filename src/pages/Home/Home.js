import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RouteList from "../../components/RouteList/RouteList";
import axiosAPI from "../../shared/Axios";
import { Button, KIND } from "baseui/button";
import {
  Display4,
} from 'baseui/typography';
import "./Home.css";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";

const Home = () => {
  const [routeList, setRouteList] = useState([]);

  const populateRoutesList = async () => {
    const response = await axiosAPI.get("/routes.json");
    const data = response.data;
    setRouteList((prevRouteList) => {
      if (!data) return [];
      const refinedRoutelist = Object.keys(data).map((routeId) => {
        return { ...data[routeId], routeId };
      });
      return refinedRoutelist;
    });
  };

  const onDelete = async (id) => {
    try {
      await axiosAPI.delete("/routes/" + id + ".json/");
      populateRoutesList();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    populateRoutesList();
  }, []);

  return (
    <FlexGrid className="Home">
      <FlexGridItem>
        <Display4 >Public Transit Route</Display4>
      </FlexGridItem>
      <FlexGridItem>
        <Link to="/create-route">
          <Button kind={KIND.minimal}>Create New Route</Button>
        </Link>
      </FlexGridItem>
      <RouteList routeList={routeList} deleteRouteFunction={onDelete} />
    </FlexGrid>
  );
};

export default Home;

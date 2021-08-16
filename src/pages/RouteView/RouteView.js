import React, { useEffect, useState } from "react";
import axiosAPI from "../../shared/Axios";
import { useParams, Link } from "react-router-dom";
import Map from "../../components/Map/Map";
//import "./RouteView.css";
import { Button, KIND } from "baseui/button";
import { H5, Label1 } from "baseui/typography";
import { ListItem, ListItemLabel } from "baseui/list";
import {Grid, Cell} from 'baseui/layout-grid';

const RouteView = () => {
  const { id } = useParams();
  const [route, setRoute] = useState(null);

  const fetchRouteData = async () => {
    try {
      const response = await axiosAPI.get("/routes/" + id + ".json");
      setRoute(response.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRouteData();
  }, []);

  return (
    route && (
      <>
      <Grid>
          <Cell span={[1]}>
            <Link to="/">
              <Button kind={KIND.secondary}>Back</Button>
            </Link>
          </Cell>
          <Cell span={[4]}>
            <H5>{route.routeName}</H5>
          </Cell>
          <Cell span={[2]}>
            <Label1>
              Direction : {route.direction.toUpperCase()}
            </Label1>
          </Cell>
          <Cell span={[2]}>
            <Label1>
              Status : {route.status.toUpperCase()}
            </Label1>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={[4]}>
          <Label1 className="RouteView__heading">Route path</Label1>
          <ul className="RouteView__ul">
            {route.stops.map((item, index) => (
              <ListItem key={index} className="RouteView__li">
                <ListItemLabel>{item.stopName}</ListItemLabel>
              </ListItem>
            ))}
          </ul>
          </Cell>
        <Cell span={[8]}>
        <Map
          className="RouteView__map"
          direction={route.direction}
          stops={route.stops}
        />
        </Cell>
      </Grid>
      </>
    )
  );
};

export default RouteView;

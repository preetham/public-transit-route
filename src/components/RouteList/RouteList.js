import React from "react";
import { Link } from "react-router-dom";
import "./RouteList.css";
import { Button, KIND } from "baseui/button";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";

const itemProps = {
  //backgroundColor: 'mono300',
  //height: 'scale1000',
  display: 'flex',
  //alignItems: 'center',
  //justifyContent: 'center',
};

const RouteList = ({ routeList, deleteRouteFunction }) => {
  return (
    <FlexGrid
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
    >
      {routeList.map((route) => {
        const { routeId, routeName, status } = route;
        return (
          <FlexGridItem {...itemProps}>
          <Card key={routeId} title={routeName}>
            <StyledBody>{status}</StyledBody>
            <StyledAction>
              <Link style={{marginRight: '0.5rem'}}
                to={"/route-view/" + routeId}
              >
                <Button kind={KIND.primary}>View</Button>
              </Link>
              <Link
                style={{marginRight: '0.5rem'}}
                to={"/route-edit/" + routeId}
              >
                <Button kind={KIND.secondary}>Edit</Button>
              </Link>
              <Button
                onClick={() => {
                  deleteRouteFunction(routeId);
                }}
                kind={KIND.minimal}
              >
               Delete
              </Button>
            </StyledAction>
          </Card>
          </FlexGridItem>
        );
      })}
      </FlexGrid>
  );
};

export default RouteList;

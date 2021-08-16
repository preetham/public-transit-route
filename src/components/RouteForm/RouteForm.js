import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosAPI from "../../shared/Axios";
import { useParams, withRouter, Link } from "react-router-dom";
import Stops from "../Stops/Stops";
import { Button, KIND } from "baseui/button";
//import "./RouteForm.css";
import { Label1 } from "baseui/typography";
import { Input } from "baseui/input";

const RouteForm = ({ history, editMode }) => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    direction: "",
    routeName: "",
    status: "",
    stops: [],
  });
  const [isReady, setReady] = useState(false); //isReady tells when the Form is ready to be initialised

  const getInitialValuesForEditMode = async () => {
    const response = await axiosAPI.get("/routes/" + id + ".json");
    if (!response) return;
    setInitialValues({ ...response.data });
    setReady(true);
  };

  useEffect(() => {
    if (editMode) {
      getInitialValuesForEditMode();
    } else {
      setReady(true);
    }
  }, []);

  if (!isReady) return null;

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={Yup.object({
        routeName: Yup.string()
          .trim()
          .min(3, "Must be 3 charactes or more")
          .max(15, "must be 15 characters or less")
          .required("required"),
        direction: Yup.string().required("required"),
        status: Yup.string().required("required"),
        stops: Yup.array().min(2, "Add atleast 2 stops").required("required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (editMode) {
            await axiosAPI.put("/routes/" + id + ".json", { ...values });
          } else {
            await axiosAPI.post("/routes.json", { ...values });
          }

          history.push("/");
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ values, errors }) => (
        <Form className="RouteForm">
          <div className="RouteForm__input">
            <Label1 htmlFor="routeName">Route Name</Label1>
            <Input autoComplete={false} name="routeName" type="text" />
            <ErrorMessage
              name="routeName"
              component="span"
              className="RouteForm__errorMessage"
            />
          </div>

          <div className="RouteForm__radio">
            <Label1 id="direction">Direction</Label1>
            <div role="group" aria-labelledby="direction">
              <Label1>
                <Field type="radio" name="direction" value="up" />
                Up
              </Label1>
              <Label1>
                <Field type="radio" name="direction" value="down" />
                Down
              </Label1>
              <ErrorMessage
                name="direction"
                component="span"
                className="RouteForm__errorMessage"
              />
            </div>
          </div>

          <div className="RouteForm__radio">
            <Label1 id="status">Status</Label1>
            <div role="group" aria-labelledby="status">
              <Label1>
                <Field type="radio" name="status" value="active" />
                Active
              </Label1>
              <Label1>
                <Field type="radio" name="status" value="inactive" />
                Inactive
              </Label1>
              <ErrorMessage
                name="status"
                component="span"
                className="RouteForm__errorMessage"
              />
            </div>
          </div>

          <Stops
            name="stops"
            grabStops={(stopList) => {
              values.stops = stopList;
            }}
            stops={values.stops}
            errorMessage={errors.stops}
          />

          <Button type="submit" className="Button Button_primary">
            {editMode ? "Save" : "Submit"}
          </Button>
          <Link to="/">
            <Button kind={KIND.secondary}>Home</Button>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default withRouter(RouteForm);

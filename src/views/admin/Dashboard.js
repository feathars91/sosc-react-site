import React, { useState } from "react";
// javascipt plugin for creating charts
import $ from "jquery";
import Chart from "chart.js";
// react plugin used to create charts
//import { Bar } from "react-chartjs-2";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

 import Typography from "@material-ui/core/Typography";
import Tbl2 from "./Table.js";

import "./App.css";
// core components
import Header from "components/Headers/Header.js";

import {
  chartOptions,
  parseOptions,
  //chartExample1,
  //chartExample2,
} from "variables/charts.js";

import componentStyles from "assets/theme/views/admin/dashboard.js";

import { API, Auth } from "aws-amplify";

const useStyles = makeStyles(componentStyles);

function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");
  const [val, setVal] = React.useState("hidden");


  function toggleZoomScreen() {
    document.body.style.zoom = "80%";
  }

  React.useEffect(() => {
    toggleZoomScreen();
    callApi();
    //checkComeback(userEmail);
    //  $("#p").click();
  }, []);


  async function callApi() {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    const requestData = {
      headers: {
        Authorization: token,
      },
    };
    const data = await API.get("authapi", "/items", requestData);
    console.log("data: ", data);
    checkComeback(data.email);
  }

  async function checkComeback(x) {
    const myInit = {
      // OPTIONAL
      queryStringParameters: {
        // OPTIONAL
        email: x,
      },
    };
    const data = await API.get("comebackapi", "/items", myInit);
    console.log("data: ", data);
    if (data.count >= "2") {
      
    } else {
      
    }
  }

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (index) => {
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };



  function doSomethingWithDataFrom3ndchild(data) {
    if (data === "display4") {

    }
  }

  
  return (
    <>
      <Header />
      {/* Page content */}

      <Container
        maxWidth={false}
        component={Box}
        marginTop="-6rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container component={Box} marginTop="3rem">
          <Grid></Grid>
        </Grid>
        <Grid container component={Box} marginTop="3rem">
          <Grid></Grid>
        </Grid>

        <Grid
          container
          component={Box}
          marginTop="3rem"
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "50vh" }}
        >
                  <Grid
            item
            xs={12}
            xl={12}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.gridItemRoot }}
          >


              <Tbl2 />

       </Grid>
        </Grid>
      </Container>
    </>
  );
}

//export default Dashboard;

export default Dashboard;

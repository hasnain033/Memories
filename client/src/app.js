import React from "react";
// import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import useStyles from "./styles";
import Navbar from "./components/Navbar/navbar";
import Home from "./components/Home/home";
import Auth from "./components/Auth/auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="296651748237-f6h7kfmnd76nh3rq06tr5u19lq98uinb.apps.googleusercontent.com">
      <Router>
        <section className="main-body">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth" exact element={<Auth />} />
          </Routes>
        </section>
      </Router>
    </GoogleOAuthProvider>
  );
};

// const App = () => {
//   // const classes = useStyles();
//   return (
//     <Container maxidth="lg">
//       <AppBar className={classes.appBar} position="static" color="inherit">
//         <Typography variant="h3" align="center">
//           Memories
//         </Typography>
//         <img
//           className={classes.image}
//           src={memories}
//           height="60"
//           width="60"
//           alt="memories"
//         />
//       </AppBar>
//       <Grow in>
//         <Container>
//           <Grid container justify="space-between" alignItems="stretch">
//             <Grid item xs={12} xm={7}>
//               <Posts />
//             </Grid>
//             <Grid item xs={12} xm={4}>
//               <Form />
//             </Grid>
//           </Grid>
//         </Container>
//       </Grow>
//     </Container>
//   );
// };

export default App;

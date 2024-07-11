import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async (e: any) => {


    e.preventDefault();
    const { data } = await axios.get(
      "http://localhost:5000/api/user/logout",
      {}
    );
    if (data) {
      alert("Logout successfull");
      localStorage.clear();
      navigate("/register");
    } else {
      alert("logout failed");
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dummy-Registartion
          </Typography>
          <Button color="inherit">Login</Button>
          {/* <Button color="inherit" onClick={() => navigate("/users")}>
            Users
          </Button> */}
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

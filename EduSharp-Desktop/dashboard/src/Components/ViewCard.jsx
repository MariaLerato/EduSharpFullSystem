import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import books from "./images/books-book-pages-read-literature-159866.webp";
import reuse from "./Authentication-firebase/reuse";
import Skeleton from "@mui/material/Skeleton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const ViewCard = ({ data,refresh }) => {
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleDelete = () => {
    setOpenModal(false)
    reuse.deleteItem("lessons", data.itemKey).then((res) => {
      handleToggle();
      if (res.status === "error") {
        console.log(res.message);
        setMessage(res.message);
        handleClose();
        refresh()
      } else {
        setIsError(true);
        console.log(res.message);
        setMessage(res.message);
        handleClose();
        refresh()
      }
    });
  };

  return (
    <Card sx={{ width: 330, height: 280, margin: 2.5 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={books} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Subject: {data?.subject}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Topic: {data?.topic},Grade: {data?.grade}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="error" onClick={() => setOpenModal(true)}>
          Delete
        </Button>
      </CardActions>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={`${!isError ? "success" : "error"}`}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this?
          </Typography>
          <div style={{ display: "flex", justifyContent: "flex-end" ,marginTop:10}}>
            <Button size="small" color="primary" onClick={()=>setOpenModal(false)}>
              Cancel
            </Button>
            <Button size="small" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </Card>
  );
};

export default ViewCard;

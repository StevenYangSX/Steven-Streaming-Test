import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import { Grid, Card, CardContent, Typography, CardActions } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const HomePage = ({ streamList }) => {
  const navigate = useNavigate();
  const thumbnailUrlGetter = (url) => {
    return url.replace(/-\{width\}x\{height\}/, "");
  };

  const getTagColor = (index) => {
    if (index === 0) return "success";
    if (index === 1) return "info";
    if (index === 2) return "warning";
  };

  return (
    <>
      {streamList.length === 0 ? (
        <div>loading...</div>
      ) : (
        <div>
          <Grid container spacing={3}>
            {streamList.map((element) => (
              <Grid item key={element.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 400 }} key={element.id}>
                  <CardMedia
                    sx={{ height: 240 }}
                    image={thumbnailUrlGetter(element.thumbnail_url)}
                    title={element.title}
                    onClick={() => {
                      console.log("card clicked...");
                      navigate(`/live/${element.user_name}`);
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ height: "100px", overflow: "hidden" }}
                    >
                      {element.title} +++ {element.user_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Streamer : {element.user_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Content : {element.game_name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {element.tags.slice(0, 3).map((ele, index) => (
                      <Chip label={ele} color={getTagColor(index)} key={element.id + ele} />
                    ))}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
};

export default HomePage;

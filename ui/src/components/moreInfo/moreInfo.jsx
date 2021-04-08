/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  CardMedia,
  Chip,
  Avatar,
  Button,
  Grid,
} from "@material-ui/core";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Phone,
  EmailRounded,
  Done,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import useStyle from "./moreInfoStyle";
import { getCard } from "../../services/cards";
import { serverUrl } from "../../services/serverUrl.json";
import { Link } from "react-router-dom";
const MoreInfo = (props) => {
  /// this is image array state
  const [image, setImage] = useState([]);
  /// this is  current Image Index  state
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  /// this is the card information state
  const [cardInfo, setCardInfo] = useState({});
  /// this is the features  state
  const [features, setFeatures] = useState({});

  useEffect(() => {
    /// this function take all card information
    getCardInfo();
    window.scrollTo(0, 0);
  }, []);

  /// this useEffect re-render when the currentImgIndex change
  useEffect(() => image[currentImgIndex], [currentImgIndex]);

  /// this function take all card information
  const getCardInfo = async () => {
    const { data } = await getCard(props.match.params.id);
    setCardInfo(data);
    setImage(data.images);
    setFeatures(data.features);
  };

  //// this function move to next image in the gallery
  const next = () => {
    setCurrentImgIndex((index) => {
      if (image.length - 1 === index) {
        return 0;
      }
      return index + 1;
    });
  };
  //// this function back to the previous image in the gallery
  const previous = () => {
    setCurrentImgIndex((index) => {
      if (currentImgIndex === 0) {
        return image.length - 1;
      }
      return index - 1;
    });
  };
  /// this function takes the style form moreInfoStyle.js
  const classes = useStyle();

  return (
    <div className={classes.container}>
      {image.length ? (
        <Grid container justify="center" style={{ maxWidth: 900 }}>
          <Grid item xs={11} sm={11} lg={12}>
            <CardMedia
              className={classes.gallery}
              image={`${serverUrl}${image[currentImgIndex].file.path}`}
            >
              {image.length > 1 && (
                <>
                  {/* next */}
                  <IconButton onClick={next}>
                    <ArrowBackIos fontSize="large" style={{ color: "black" }} />
                  </IconButton>
                  {/* previous */}
                  <IconButton onClick={previous}>
                    <ArrowForwardIos
                      fontSize="large"
                      style={{ color: "black" }}
                    />
                  </IconButton>
                </>
              )}
            </CardMedia>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5">loding......</Typography>
      )}
      <Grid container justify="center" style={{ maxWidth: 700 }}>
        <Grid item xs={11} sm={11} lg={12}>
          <Card className={classes.card}>
            <Typography variant="h5">Owner information</Typography>
            <hr />
            <CardContent>
              <Typography className={classes.typography} component={"span"}>
                <Avatar
                  alt="Remy Sharp"
                  src={`${serverUrl}${
                    cardInfo.userImage && cardInfo.userImage.file.path
                  }`}
                  style={{ marginRight: 5 }}
                />
                {cardInfo.biz
                  ? cardInfo.userName + ` (company)`
                  : cardInfo.userName}
              </Typography>
              <br />
              <Typography className={classes.typography}>
                <Phone />
                <a href={`tel:${cardInfo.userPhone}`} className={classes.link}>
                  {cardInfo.userPhone}
                </a>
              </Typography>
              <br />
              {cardInfo.userContactEmail && (
                <Typography className={classes.typography}>
                  <EmailRounded />
                  <a
                    href={`mailto:${cardInfo.userContactEmail}`}
                    className={classes.link}
                  >
                    {cardInfo.userContactEmail}
                  </a>
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={11} sm={11} lg={12}>
          <Card className={classes.card}>
            <Typography variant="h5">Details</Typography>
            <hr />
            <CardContent className={classes.detailsContent}>
              <div
                style={{ borderRight: "2px solid #000", paddingRight: "50px" }}
              >
                <div className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    Price:
                  </Typography>
                  <Typography
                    variant="h6"
                    className={classes.typography}
                    style={{ color: "green" }}
                  >
                    ₪{cardInfo.price}
                  </Typography>
                </div>
                <div className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    Property size:
                  </Typography>
                  <Typography variant="h6" className={classes.typography}>
                    {cardInfo.houseSpace}m
                  </Typography>
                </div>
                <div className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    Property type:
                  </Typography>
                  <Typography variant="h6" className={classes.typography}>
                    {cardInfo.propertyType}
                  </Typography>
                </div>
                <div className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    Property status:
                  </Typography>
                  <Typography variant="h6" className={classes.typography}>
                    {cardInfo.status}
                  </Typography>
                </div>
                <div className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    Rooms:
                  </Typography>
                  <Typography variant="h6" className={classes.typography}>
                    {cardInfo.rooms}
                  </Typography>
                </div>
              </div>
              <div style={{ paddingLeft: "50px", padding: 10 }}>
                <div className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    bedrooms:
                  </Typography>
                  <Typography variant="h6" className={classes.typography}>
                    {cardInfo.bedRooms}
                  </Typography>
                </div>
                <Grid item className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    Bathrooms:
                  </Typography>
                  <Typography variant="h6" className={classes.typography}>
                    {cardInfo.bathRooms}
                  </Typography>
                </Grid>
                <div className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    living Rooms:
                  </Typography>
                  <Typography variant="h6" className={classes.typography}>
                    {cardInfo.livingRooms}
                  </Typography>
                </div>
                <div className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    kitchens:
                  </Typography>
                  <Typography variant="h6" className={classes.typography}>
                    {cardInfo.kitchens}
                  </Typography>
                </div>
                <div className={classes.containerDetail}>
                  <Typography variant="h6" className={classes.typography}>
                    Parking:
                  </Typography>
                  <Typography variant="h6" className={classes.typography}>
                    {cardInfo.ParkingSpots}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={11} sm={11} lg={12}>
          <Card className={classes.card}>
            <Typography variant="h5">Address</Typography>
            <hr />
            <CardContent style={{ width: "100%", wordBreak: "break-all" }}>
              <Typography variant="h5">{cardInfo.address}</Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <Typography variant="h5">Description</Typography>
            <hr />
            {cardInfo.Description ? (
              <CardContent style={{ width: "100%", wordBreak: "break-all" }}>
                <Typography variant="h5">{cardInfo.Description}</Typography>
              </CardContent>
            ) : (
              <CardContent style={{ width: "100%", wordBreak: "break-all" }}>
                <Typography variant="h6">No Description</Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
        <Grid item xs={11} sm={11} lg={12}>
          <Card className={classes.card}>
            <Typography variant="h5">Features</Typography>
            <hr />
            <CardContent className={classes.featureaContaienr}>
              {features.length ? (
                features.map((feature) => {
                  return (
                    <li key={feature} style={{ listStyle: "none" }}>
                      <Chip
                        label={feature}
                        icon={<Done />}
                        variant="outlined"
                        className={classes.feature}
                      />
                    </li>
                  );
                })
              ) : (
                <Chip label="No Features" className={classes.feature} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button
        color="primary"
        variant="contained"
        size="large"
        component={Link}
        className={classes.button}
        to={props.location.state.prevPath}
      >
        Back
      </Button>
    </div>
  );
};

export default MoreInfo;

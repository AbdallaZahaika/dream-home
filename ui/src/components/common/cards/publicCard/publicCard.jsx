/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import {
  Favorite,
  Phone,
  LocalParking,
  MeetingRoomRounded,
  SignalCellular4Bar,
  EmailRounded,
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import useStyle from "./publicCardStyle";
import userService from "../../../../services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { serverUrl } from "../../../../services/serverUrl.json";
/// refreshState  come from favoriteCards this function refresh the state
const PublicCard = ({ cardInfo, refreshState, user, myFavoriteCards }) => {
  /*
   * This Component return Public Card
   */
  const {
    rooms,
    propertyType,
    price,
    ParkingSpots,
    address,
    floor,
    houseSpace,
    status,
    createdAt,
    cardNumber,
    images,
    _id,
    favorites,
    city,
    userName,
    userContactEmail,
    userPhone,
    userImage,
    biz,
  } = cardInfo;
  /// this favorite  state
  const [favorite, setFavorite] = useState(false);
  //// this how many users liked the card and handle the change
  const [numberFavorites, setNumberFavorites] = useState(favorites);

  useEffect(() => {
    setTheFavoritedCards();
  }, [myFavoriteCards]);

  // this function  get all cards you are favorited
  const setTheFavoritedCards = () => {
    myFavoriteCards.filter((card) => {
      if (card === cardNumber) {
        return setFavorite(true);
      }
      return card;
    });

    return;
  };
  ///// this function add card to favorite and remove favorited
  const handleFavorite = async () => {
    if (user) {
      /// he we add to favorite
      if (!favorite) {
        await userService.favorite(cardNumber);
        setNumberFavorites((previous) => previous + 1);
        toast.warn(`you have new card in your favorite  `);
        setFavorite(true);
      } else {
        /// he we remove the favorite
        await userService.favorite(cardNumber);
        setNumberFavorites((previous) => previous - 1);
        toast.error(`you unfavorite `);
        setFavorite(false);
        //// refreshState this function work when you unfavorite card form favorited Cards
        if (refreshState) {
          refreshState();
        }
      }
    }
  };

  /// this is a card Date Created At  format Date to get the day month day Number year
  /// like Thu Feb 25 2021
  const cardCreatedAt = new Date(createdAt).toDateString();
  const history = useHistory();
  const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={`${serverUrl}${userImage.file.path}`} />}
        title={biz ? userName + ` (company)` : userName}
        subheader={cardCreatedAt}
      />
      <CardMedia
        className={classes.media}
        image={`${serverUrl}${images[0].file.path}`}
        title={images[0].file.name}
      />
      <CardContent>
        <div className={classes.containerIcons}>
          <Typography className={classes.typography}>
            <MeetingRoomRounded style={{ marginRight: 5 }} /> {rooms}
          </Typography>
          <Typography className={classes.typography}>
            <SignalCellular4Bar style={{ marginRight: 5 }} /> {floor}
          </Typography>
          <Typography className={classes.typography}>
            <i className={`${classes.fontawesomeIcon} fas fa-ruler`}></i>
            {houseSpace}
          </Typography>
          <Typography className={classes.typography}>
            <LocalParking style={{ marginRight: 5 }} /> {ParkingSpots}
          </Typography>
        </div>
        <Typography className={classes.typography}>
          <Phone />
          <a href={`tel:${userPhone}`} className={classes.link}>
            {userPhone}
          </a>
        </Typography>
        {userContactEmail && (
          <Typography className={classes.typography}>
            <EmailRounded />
            <a href={`mailto:${userContactEmail}`} className={classes.link}>
              {userContactEmail}
            </a>
          </Typography>
        )}
        <Typography className={classes.typography}>
          PropertyType: {propertyType}
        </Typography>
        <Typography className={classes.typography}>
          Address: {address}
        </Typography>
        <Typography className={classes.typography} variant="body1"></Typography>
        <Typography>
          {status.charAt(0).toUpperCase() + status.slice(1)} :
          <span style={{ color: "green" }}> ₪{price}</span>
        </Typography>
        <Typography className={classes.typography}>City: {city}</Typography>
        <Typography>likes: {numberFavorites}</Typography>
      </CardContent>
      <CardActions className={user ? "" : classes.containerButtons}>
        {user && (
          <IconButton onClick={handleFavorite}>
            <Favorite color={!favorite ? "inherit" : "error"} />
          </IconButton>
        )}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={{
            pathname: `/card-moreinfo/${_id}`,
            state: { prevPath: history.location.pathname },
          }}
          style={user ? { marginLeft: 40 } : { marginLeft: 0 }}
        >
          More Info
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(PublicCard);

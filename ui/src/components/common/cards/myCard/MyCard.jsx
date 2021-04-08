import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import {
  Phone,
  LocalParking,
  MeetingRoomRounded,
  SignalCellular4Bar,
  EmailRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import useStyle from "./myCardStyle";
import { serverUrl } from "../../../../services/serverUrl.json";
const MyCard = ({ cardInfo, onDelete }) => {
  /*
   * This Component return  Card
   * This Card For page my cards
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
    _id,
    cardNumber,
    images,
    favorites,
    city,
    userPhone,
    userContactEmail,
  } = cardInfo;

  const classes = useStyle();
  return (
    <Card className={classes.card}>
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
        <Typography>
          {status.charAt(0).toUpperCase() + status.slice(1)} :
          <span style={{ color: "green" }}> ₪{price}</span>
        </Typography>
        <Typography className={classes.typography}>City: {city}</Typography>
        <Typography>likes: {favorites}</Typography>
        <Typography className={classes.typography} variant="body1">
          Card Number: {cardNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: 40 }}
          component={Link}
          to={`/edit-card/${_id}`}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: 40 }}
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default MyCard;

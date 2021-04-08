/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  CardMedia,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import PublicCard from "../common/cards/publicCard/publicCard";
import useStyle from "./homeStyle";
import cardService from "../../services/cards";
import { connect } from "react-redux";
import userService from "../../services/userService";
import skyBackGround from "../../images/sky.jpg";
const Home = ({ user }) => {
  const [newCardRent, setCardRent] = useState([]);
  const [newCardSale, setCardSale] = useState([]);
  const [favoritedCards, setFavoritedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getnewCardSale();
    getnewCardRent();
    getFavoritedCards();
    window.scrollTo(0, 0);
  }, []);
  /// get the new cards status sale
  const getnewCardSale = async () => {
    setIsLoading(true);
    const { data } = await cardService.getNewSaleCards();
    setCardSale(data);
    setIsLoading(false);
  };
  // get the new cards status rent
  const getnewCardRent = async () => {
    setIsLoading(true);
    const { data } = await cardService.getNewRentCards();
    setCardRent(data);
    setIsLoading(false);
  };
  // this function  get all cards you are favorited
  const getFavoritedCards = async () => {
    if (user) {
      const checkUser = await userService.getCurrentUser();
      if (checkUser) {
        const { data } = await userService.getUserInfo();
        setFavoritedCards(data.cards);
        return;
      }
      return;
    } else {
      return;
    }
  };

  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={11} sm={11} lg={11}>
          <CardMedia image={skyBackGround} className={classes.gallery}>
            <Typography variant="h3" className={classes.typography}>
              Welcome to Dream Home
            </Typography>
          </CardMedia>
        </Grid>
      </Grid>
      <Container>
        <div className={classes.containerTitle}>
          <Typography variant="h3" className={classes.typography}>
            New Homes for Rent
          </Typography>
        </div>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {newCardRent.length ? (
            newCardRent.map((card) => (
              <PublicCard
                key={card.cardNumber}
                cardInfo={card}
                myFavoriteCards={favoritedCards}
              />
            ))
          ) : (
            <>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Typography variant="h3" className={classes.typography}>
                  no cards
                </Typography>
              )}
            </>
          )}

          <div className={classes.containerTitle}>
            <Typography variant="h3" className={classes.typography}>
              New Homes for sale
            </Typography>
          </div>
          {newCardSale.length ? (
            newCardSale.map((card) => (
              <PublicCard
                key={card.cardNumber}
                cardInfo={card}
                myFavoriteCards={favoritedCards}
              />
            ))
          ) : (
            <>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Typography variant="h3" className={classes.typography}>
                  no cards
                </Typography>
              )}
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Home);

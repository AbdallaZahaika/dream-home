/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import PublicCard from "../common/cards/publicCard/publicCard";

import useStyle from "./favoriteCardsStyle";
import userService from "../../services/userService";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
const FavoriteCards = ({ user }) => {
  const [cards, setCards] = useState([]);
  const [favoritedCards, setFavoritedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getCards();
    getFavoritedCards();
    window.scrollTo(0, 0);
  }, []);

  ///// this function get all cards you favorited
  const getCards = async () => {
    const { data } = await userService.getUserInfo();
    const cardsNumbres = data.cards.toString();
    if (cardsNumbres) {
      setIsLoading(true);
      const { data } = await userService.allFavorite(cardsNumbres);
      setCards(data);
      setIsLoading(false);
    } else {
      setCards([]);
    }
  };
  // this function  get all cards you are favorited
  const getFavoritedCards = async () => {
    if (user) {
      const checkUser = await userService.getCurrentUser();
      if (checkUser) {
        const { data } = await userService.getUserInfo();
        setFavoritedCards(data.cards);
      } else {
        return;
      }
    } else {
      return;
    }
  };
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h3" className={classes.typography}>
          Favorite Cards
        </Typography>
      </Box>
      <Container>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {cards.length ? (
            cards.map((card) => (
              <PublicCard
                key={card.cardNumber}
                cardInfo={card}
                myFavoriteCards={favoritedCards}
                refreshState={getCards}
              />
            ))
          ) : (
            <Box>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Typography variant="h3" className={classes.typography}>
                  no cards
                </Typography>
              )}
            </Box>
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
export default connect(mapStateToProps)(FavoriteCards);

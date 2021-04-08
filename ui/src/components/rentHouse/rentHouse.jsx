/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import PublicCard from "../common/cards/publicCard/publicCard";
import SearchEngine from "../common/searchEngine/searchEngine";
import useStyle from "./rentHouseStyle";
import { connect } from "react-redux";
import userService from "../../services/userService";
import { search } from "../../services/cards";
const RentHouses = ({ user }) => {
  const [cards, setCards] = useState([]);
  const [favoritedCards, setFavoritedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getCards();
    getFavoritedCards();
    window.scrollTo(0, 0);
  }, []);

  const getCards = async () => {
    /// get all cards and set in cards state
    setIsLoading(true);
    const { data } = await search("", 0, "rent");
    setResults(data.results);
    setCards(data.data);
    setIsLoading(false);
  };

  /// handle Pages
  const handlePages = async (e, currentPage) => {
    const { data } = await search(searchValue, currentPage - 1, "rent");
    setResults(data.results);
    setCards(data.data);
    window.scrollTo(0, 0);
  };

  // this function  get all cards you are favorited
  const getFavoritedCards = async () => {
    if (user) {
      const { data } = await userService.getUserInfo();
      setFavoritedCards(data.cards);
    }
  };

  /// this function handle Search value and send to server and set the result in cards
  const handleSearch = async (value) => {
    setIsLoading(true);
    const { data } = await search(value);
    setSearchValue(value);
    setResults(data.results);
    setCards(data.data);
    setIsLoading(false);
  };
  const classes = useStyle();
  const numberPages = Math.ceil(results / 9);
  return (
    <div>
      <SearchEngine searchValue={handleSearch} status="rent" />
      <Container className={classes.container}>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {cards.length ? (
            cards.map((card) => (
              <PublicCard
                key={card.cardNumber}
                cardInfo={card}
                myFavoriteCards={favoritedCards}
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
      <Box display="flex" justifyContent="center" marginTop={20}>
        {results > 9 ? (
          <>
            <Pagination
              count={numberPages}
              color="primary"
              onChange={handlePages}
            />
          </>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(RentHouses);

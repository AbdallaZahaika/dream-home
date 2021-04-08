/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Container,
  Typography,
  IconButton,
  InputBase,
  CircularProgress,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Search } from "@material-ui/icons";
import { useLayoutEffect, useState } from "react";
import MyCard from "../common/cards/myCard/MyCard";
import useStyle from "./myCardsStyle";
import cardsService from "../../services/cards";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Formik, Field } from "formik";
const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [results, setResults] = useState(0);
  useLayoutEffect(() => {
    allMyCards(pageNumber);
    getCardCount();
    window.scrollTo(0, 0);
  }, []);
  /// get all my cards
  const allMyCards = async () => {
    setIsLoading(true);
    const { data } = await cardsService.getAllMyCards();
    setCards(data);
    setIsLoading(false);
  };
  /// count Of my cards
  const getCardCount = async () => {
    const numberOfCards = await cardsService.countMYcards();
    if (numberOfCards.data.length) {
      setResults(numberOfCards.data[0].createdAt);
    }
  };
  /// handle Pages
  const handlePages = async (e, value) => {
    const { data } = await cardsService.getAllMyCards(value - 1);
    setCards(data);
    setPageNumber(value);
    window.scrollTo(0, 0);
  };
  //// delet card
  const handleDelete = async (id, cardNumber, images) => {
    if (window.confirm(`do you want delet this card`)) {
      await cardsService.removeImagesFromServer(cardNumber, images);
      await cardsService.deleteCard(id);
      toast.success(`Card is deleted`);
      allMyCards();
    }
  };
  //// this function handle search value
  const handleSearch = async (value) => {
    if (value !== "") {
      const { data } = await cardsService.searchByNumber(value.trim());
      if (data) {
        setIsSearching(true);
        return setCards([data]);
      }
      return setCards([]);
    }
    if (value === "") {
      setIsSearching(false);
      return allMyCards();
    }
    return cards;
  };
  const numberPages = Math.ceil(results / 9);
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <Container>
        <Box display="flex" justifyContent="center">
          <Typography variant="h3" className={classes.typography}>
            My Cards
          </Typography>
        </Box>
        <Formik
          initialValues={{
            searchInput: "",
          }}
          validationSchema={Yup.object({
            searchInput: Yup.string(),
          })}
          onSubmit={(values) => {
            handleSearch(values.searchInput);
          }}
        >
          {({ errors, touched, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.containerSearch}>
                  <Field
                    as={InputBase}
                    placeholder="Card Number"
                    className={classes.inputSearch}
                    name="searchInput"
                    error={errors.searchInput && touched.searchInput}
                    autoComplete="off"
                  />
                  <IconButton type="submit" aria-label="search">
                    <Search />
                  </IconButton>
                </div>
              </Form>
            );
          }}
        </Formik>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {cards.length ? (
            cards.map((card) => (
              <MyCard
                key={card._id}
                cardInfo={card}
                onDelete={() =>
                  handleDelete(card._id, card.cardNumber, card.images)
                }
              />
            ))
          ) : (
            <Box m={20}>
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
        {results > 9 && !isSearching ? (
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

export default MyCards;

import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navbar/navbar";
import Login from "./components/login/lgoin";
import Footer from "./components/footer/footer";
import About from "./components/about/about";
import FreeAccount from "./components/register/freeAccount/freeAccount";
import BusinessAccount from "./components/register/businessAccount/BusinessAccount";
import ChoosAccount from "./components/register/chooseAccount/ChooseAccount";
import CreateCard from "./components/createCard/CreateCard";
import FavoriteCards from "./components/favoriteCards/favoriteCards";
import MyCards from "./components/myCards/myCards";
import EditeCard from "./components/editCard/editeCard";
import MoreInfo from "./components/moreInfo/moreInfo";
import logout from "./components/logout/logout";
import ProtectedRoute from "./components/common/protectedRouter/protectedRouter";
import Settings from "./components/settings/settings";
import ChangePassword from "./components/changePassword/changePassword";
import Home from "./components/home/home";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import BackGround from "./images/backgroundImage.jpg";
import ContactUs from "./components/contact-us/contact-us";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/resetPassword";
import RentHouse from "./components/rentHouse/rentHouse";
import SaleHouse from "./components/saleHouse/saleHouse";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <div
        style={{
          backgroundImage: `url(${BackGround})`,
        }}
      >
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/404" component={PageNotFound} />
          <Route path="/sign-up/free" component={FreeAccount} />
          <Route path="/sign-up/business" component={BusinessAccount} />
          <Route path="/sign-up" component={ChoosAccount} />
          <Route path="/login" component={Login} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/reset-password/:resetToken" component={ResetPassword} />
          <Route path="/logout" component={logout} />
          <Route path="/about" component={About} />
          <Route path="/houses/rent" component={RentHouse} />
          <Route path="/houses/sale" component={SaleHouse} />
          <Route path="/contactUs" component={ContactUs} />
          <Route path="/card-moreinfo/:id" component={MoreInfo} />
          <Route exact path="/" component={Home} />
          <ProtectedRoute
            path="/settings/password"
            component={ChangePassword}
          />
          <ProtectedRoute path="/settings" component={Settings} />
          <ProtectedRoute path="/my-cards" component={MyCards} />
          <ProtectedRoute path="/edit-card/:id" component={EditeCard} />
          <ProtectedRoute path="/favorite-cards" component={FavoriteCards} />
          <ProtectedRoute path="/create-card-house" component={CreateCard} />
          <Redirect from="**" to="/404" />
        </Switch>
        <footer>
          <Footer />
        </footer>
      </div>
    </Provider>
  );
}

export default App;

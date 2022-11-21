import React, { useEffect, useState } from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditAvatarPopup'
import ImagePopup from './ImagePopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import api from '../utils/Api'
import auth from '../utils/Auth'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip'
import acceptIcon from '../images/acept.svg'
import falseIcon from '../images/false-ref.svg'


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isPopupOpenImage, setIsPopupOpenImage] = React.useState(false);
    const [isRegPopupAccept, setisRegPopupAccept] = useState(false)
    const [isRegPopupFalse, setisRegPopupFalse] = useState(false)
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const history = useHistory()
    const [headerText, setHeaderText] = useState('')
    const [headerLink, setHeaderLink] = useState('/sign-in')
    const [headerMail, setHeaderMail] = useState('')

    useEffect(() => {
        api.getProfileInfo()
            .then(res => {
                setCurrentUser(res)
            })
            .catch(error => console.error(error))
    }, [])


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true)
                        history.push('/')
                        setHeaderMail(res.email)
                    }
                })
                .catch(error => console.error(error)
                )
        }
    }, [])

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res)
            })
            .catch(error => console.error(error))
    }, [])



    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            console.log(card._id)// эта не выполняется 
            api.likeCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                    console.log(newCard)

                })
                .catch(error => console.error(error))
        } else {
            console.log(card._id)// эта не выполняется 

            api.likeOffCard(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                    console.log(newCard)
                })
                .catch(error => console.error(error))
        }
    }

    function handleCardDelete(card) {
        api.deliteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter(element => element._id !== card._id))
            })
            .catch(error => console.error(error))
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function handleCardClick(card) {
        setIsPopupOpenImage(true)
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsPopupOpenImage(false)
        setisRegPopupAccept(false)
        setisRegPopupFalse(false)
    }

    function handleUpdateUser(obj) {
        api.patchProfileInfo(obj.name, obj.about)
            .then((currentUser) => {
                setCurrentUser(currentUser)
                closeAllPopups()
            })
            .catch(error => console.error(error))

    }

    function handleUpdateAvatar(link) {
        api.newAvatar(link.avatar)
            .then((currentUser) => {
                setCurrentUser(currentUser)
                closeAllPopups()
            })
            .catch(error => console.error(error))
    }

    function handleAddPlaceSubmit(input) {
        api.addNewCard(input.place, input.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch(error => console.error(error))
    }

    function handleLogin() {
        setLoggedIn(true)
    }

    function handleTextInReg() {
        setHeaderText('Вход')
        setHeaderLink('/sign-in')
        setHeaderMail('')
    }
    function handleTextInLog() {
        setHeaderText('Регистрация')
        setHeaderLink('/sign-up')
        setHeaderMail('')
    }

    function handleTextInMain() {
        setHeaderText('Выйти')
    }

    function handleExit() {
        localStorage.removeItem('token')
        history.push('/sign-in')
    }

    function handleSubmitReg(input) {
        auth.register(input.password, input.email)
            .then((res) => {
                if (res.data) {
                    setisRegPopupAccept(true)
                }
            })
            .catch(() => setisRegPopupFalse(true))
    }

    function handleSubmitLog(input) {
        auth.login(input.passwordLog, input.emailLog)
            .then(res => res.token)
            .then((token) => {
                if (token) {
                    handleLogin()
                    setHeaderMail(input.emailLog)
                    history.push('/')
                    localStorage.setItem('token', token)
                }
            })
            .catch(() => setisRegPopupFalse(true))
    }



    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <Header
                    headerText={headerText}
                    headerLink={headerLink}
                    emailText={headerMail}
                    onClick={handleExit}
                />
                <Switch>
                    <ProtectedRoute
                        exact
                        path="/"
                        component={Main}
                        loggedIn={loggedIn}
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                        handleTextInMain={handleTextInMain}
                    />
                    <Route path="/sign-in">
                        <Login
                            handleLogin={handleLogin}
                            handleTextInLog={handleTextInLog}
                            onUpdateLog={handleSubmitLog}
                        />
                    </Route>
                    <Route path="/sign-up">
                        <Register
                            use={handleTextInReg}
                            onUpdateReg={handleSubmitReg}
                        />
                    </Route>
                    <Route path="*">
                        <Redirect to='/' />
                    </Route>
                </Switch>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateCards={handleAddPlaceSubmit}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isPopupOpenImage}
                    onClose={closeAllPopups}
                />
                <InfoTooltip
                    name='popup-reg-accept'
                    isOpen={isRegPopupAccept}
                    onClose={closeAllPopups}
                    popupText='Вы успешно зарегистрировались!'
                    popupImg={acceptIcon}
                />
                <InfoTooltip
                    name='popup-reg-false'
                    isOpen={isRegPopupFalse}
                    onClose={closeAllPopups}
                    popupText='Что-то пошло не так! Попробуйте ещё раз.'
                    popupImg={falseIcon}
                />
                <Footer />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

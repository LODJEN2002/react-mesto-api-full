import React, { useEffect } from 'react';
import editButton from '../images/Edit-Button.svg'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
    const { onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete } = props
    const currentUser = React.useContext(CurrentUserContext);
    const { name, about, avatar } = currentUser

    useEffect(() =>{
        props.handleTextInMain()
    },[])

    return (
        <main>
            <section className="profile">
                <div>
                    <img className="profile__avatar" src={avatar} alt="ава"
                        onClick={onEditAvatar}
                    />
                    <p className="profile__avatar-edit"></p>
                </div>
                <div className="profile__info">
                    <h1 className="profile__info-text-title">{name}</h1>
                    <img className="profile__edit-button" src={editButton} alt="кнопка-изменения"
                        onClick={onEditProfile}
                    />
                    <p className="profile__info-text-subtitle">{about}</p>
                </div>
                <button className="profile__add-button" type="button"
                    onClick={onAddPlace}
                >
                </button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card card={card} key={card._id}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main 
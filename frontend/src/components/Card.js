import React from 'react';
import trash from '../images/Trash.svg'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
    const { card, onCardClick, onCardLike, onCardDelete } = props

    const currentUser = React.useContext(CurrentUserContext)

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `elements__trash${isOwn ? '-visible' : '-hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `elements__group${isLiked ? '-like' : ' '}`
    )

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="elements__element">
            <img className="elements__mask-group" alt={card.name} src={card.link}
                onClick={handleClick} />
            <img className={cardDeleteButtonClassName} src={trash} alt="Мусорка"
            onClick={handleDeleteClick}
            />
            <div className="elements__group-white">
                <p className="elements__title">{card.name}</p>
                <div className="elements__group-subtitle">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="element__number-like">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card
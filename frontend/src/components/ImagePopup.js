import closeIcon from '../images/Close-Icon.svg'

function ImagePopup(props) {
  const { card, onClose, isOpen } = props

  return (
    <div className={`popup popup-img ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup-img__container-img">
        <img className="popup__close-icon" src={closeIcon} alt="Закрытие"
          onClick={onClose} />
        <img className="popup-img__img-img" src={card?.link} alt={card?.name}
        />
        <p className="popup-img__text">{card?.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup
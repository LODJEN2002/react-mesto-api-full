import logo from '../images/logo.svg';
import { Link } from 'react-router-dom'

function Header(props) {
    const  {headerText, headerLink, emailText, onClick}  = props

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="лого" />
            <h3 className="header__sign">
                <a className='header__mail'> {emailText} </a>
                <Link className='header__link' style={{color:'#A9A9A9'}}  onClick={onClick} to={headerLink}>{headerText}</Link>
            </h3>
        </header>
    );
}

export default Header
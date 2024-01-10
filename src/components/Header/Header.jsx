import { useContext, useState } from 'react';
import Toggle from 'react-toggle';
import { ThemeContext } from '../../App';
import { useOnlineStatus } from '../Custom/useOnlineStatus';
import { THEME } from '../../constants';
import "react-toggle/style.css"
import './Header.scss';

export function Header() {
    const themeContextObject = useContext(ThemeContext)
    const [isToggleChecked, setIsToggleChecked] = useState(false);
    const isOnline = useOnlineStatus();
    
    const handleToggle = (event) => {
        if (event.target.checked) {
            setIsToggleChecked(true)
            themeContextObject.changeTheme(THEME.DARK)
        } else {
            setIsToggleChecked(false)
            themeContextObject.changeTheme(THEME.LIGHT)

        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme={themeContextObject.theme}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Recipes</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex mx-lg-auto mb-2 mb-lg-0 search-form" role="search">
                        <input className="form-control me-2 search" type="search" placeholder="Search" aria-label="Search" />
                    </form>
                    <label className='d-flex align-items-center gap-2'>
                        <Toggle
                            className='theme-toggler'
                            defaultChecked={isToggleChecked}
                            icons={false}
                            onChange={handleToggle} />
                    </label>
                    <span className='mx-2'>{isOnline ? '✅ Online' : '❌ Disconnected'}</span>
                </div>
            </div>
        </nav>
    )
}
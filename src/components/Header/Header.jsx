import { useContext, useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import { ThemeContext } from '../../App';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { THEME } from '../../constants';
import "react-toggle/style.css"
import './Header.scss';
import { observer } from 'mobx-react';

function Header({ store }) {
    const { queryRecipes } = store;
    const themeContextObject = useContext(ThemeContext)
    const [isToggleChecked, setIsToggleChecked] = useState(false);
    const isOnline = useOnlineStatus();

    useEffect(() => {
        queryRecipes('bread');
    }, [queryRecipes])

    const handleToggle = (event) => {
        if (event.target.checked) {
            setIsToggleChecked(true)
            themeContextObject.changeTheme(THEME.DARK)
        } else {
            setIsToggleChecked(false)
            themeContextObject.changeTheme(THEME.LIGHT)

        }
    }

    const handleChange = (event) => {
        queryRecipes(event.target.value)
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme={themeContextObject.theme}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Recipes</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex mb-3 mt-2 mt-lg-0 mb-lg-0 mx-lg-auto search-form" role="search">
                        <input className="form-control me-2 search" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} />
                    </form>
                    <label className='d-flex align-items-center gap-2 mb-3 mb-lg-0'>
                        <Toggle
                            className='theme-toggler'
                            defaultChecked={isToggleChecked}
                            icons={false}
                            onChange={handleToggle} />
                    </label>
                    <span className='mx-lg-2'>{isOnline ? '✅ Online' : '❌ Disconnected'}</span>
                </div>
            </div>
        </nav>
    )
}

export default observer(Header);
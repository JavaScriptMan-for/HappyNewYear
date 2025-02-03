import "../css/App.css";
import React, { FC, ReactNode, useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
//@ts-ignore
 import menu from "/img/menu.png"

React.version

interface WindowSize {
    width: number;
    height: number;
}

interface HeaderProps {
    children: ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
    const location = useLocation();
    const [open, setOpen] = useState<boolean>(false);
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        const handleResize = () => {
          setWindowSize(prevSize => ({ 
            ...prevSize,
            width: window.innerWidth,
            height: window.innerHeight,
        }));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleOpenMenu = () => {
      !open ? setOpen(true) : setOpen(false)
    };
    const handleCloseMenu = () => {
        setOpen(false);
    };
    const getLinkStyle = useMemo(() => (path: string) => {
      return location.pathname === path ? { borderBottom: '2px solid rgb(53, 185, 255)' } : {};
    }, [location.pathname]);

    useEffect(() => {

        switch (location.pathname) {
            case '/':
                document.body.style.cssText = `background-image: url(/img/happy.png)`;
                document.title = "До нового года...";
                break;
            case '/send-gift':
                document.body.style.cssText = `background-image: url(/img/background.jpg)`;
                document.title = "Отправить поздравление";
                break;
            case '/send-to-SantaClaus':
                document.body.style.cssText = `background-image: url(/img/back.jpg)`;
                document.title = "Отправить письмо Деду Морозу";
                break;
            default:
                document.body.style.cssText = `background-image: url(/img/happy.png)`;
                document.title = "До нового года...";
        }
        if(windowSize.width > 400) {
            setOpen(false)
        }
        if(location.pathname == '/') {
            if(windowSize.width < 700) {
                document.body.style.cssText = `background-image: url(/img/happy_2.png)`;
                document.body.style.backgroundSize = 'auto'
            }
            if(windowSize.width >= 700) {
                document.body.style.cssText = `background-image: url(/img/happy.png)`;
                document.body.style.backgroundSize = 'cover'
            }
        }
    }, [location, windowSize]);

    return (
        <>
            <div id="header">
                <dialog open={open}>
                  <div id="center">
                  <h1>Перейти по ссылке</h1>
                    <Link style={getLinkStyle("/")} to="/">
                        Время до Нового года
                    </Link> <br />
                    <Link style={getLinkStyle("/send-gift")} to="/send-gift">
                        Поздравление
                    </Link> <br />
                    <Link style={getLinkStyle("/send-to-SantaClaus")} to="/send-to-SantaClaus">
                        Письмо Деду Морозу
                    </Link> <br />
                    <a onClick={handleCloseMenu} id="close">
                        Закрыть
                    </a>
                  </div> 
                </dialog>
                {windowSize.width > 400 ? (
                    <nav>
                        <Link style={getLinkStyle("/")} to="/">
                            Время до Нового года
                        </Link>
                        <Link style={getLinkStyle("/send-gift")} to="/send-gift">
                            Поздравление
                        </Link>
                        <Link style={getLinkStyle("/send-to-SantaClaus")} to="/send-to-SantaClaus">
                            Письмо Деду Морозу
                        </Link>
                    </nav>
                ) : (
                    <nav>
                        <img onClick={handleOpenMenu} id="menu" src={menu} alt="s" />
                    </nav>
                )}
                <h1>{children}</h1>
            </div>
        </>
    );
};

export default Header;
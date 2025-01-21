import "../css/App.css";
import { FC, ReactNode, useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import menu from '/img/menu.png';

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
                break;
            case '/send-gift':
                document.body.style.cssText = `background-image: url(/img/background.jpg)`;
                break;
            case '/send-to-SantaClaus':
                document.body.style.cssText = `background-image: url(/img/back.jpg)`;
                break;
            default:
                document.body.style.cssText = `background-image: url(/img/happy.png)`;
        }
    }, [location]);

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
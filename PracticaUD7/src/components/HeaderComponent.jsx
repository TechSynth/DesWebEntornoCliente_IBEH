import "./HeaderComponent.css";
function HeaderComponent(props) {

    const {greeting} = props;
    return (
        <header className="header">
            <h1 className="title">{greeting}</h1>
            <nav>
                <ul className="header-list">
                    <li>
                        <a className="link" href="">Home</a>
                    </li>
                    <li>
                        <a className="link" href="">Blog</a>
                    </li>
                    <li>
                        <a className="link" href="">News</a>
                    </li>
                    <li>
                        <a className="link" href="">Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default HeaderComponent;
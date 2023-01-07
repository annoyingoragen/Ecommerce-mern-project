import playStore from'../../../images/playstore.png';
import appStore from'../../../images/appstore.png';
import './styles.css';
const Footer=()=>{
    return(
    <footer id="footer">
        <div className={"leftFooter"}>
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playStore} alt="playstore"/>
            <img src={appStore} alt="appstore"/>

        </div>

        <div className={"midFooter"}>
            <h4>YOUR CART</h4>
            <p>High quality is our first priority</p>
            <p>Copyrights 2022 &copy; Jawwad </p>

        </div>

        <div className={"rightFooter"}>
            <h4>Follow Us</h4>
            <a href="http://instagram.com/">instagram</a>
            <a href="http://instagram.com/">Facebook</a>
            <a href="http://instagram.com/">Youtube</a>
        </div>
    </footer>
    );
}


export default Footer;
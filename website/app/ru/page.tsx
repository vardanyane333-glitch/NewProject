import End from "./end/end";
import Calcultor from "./home/compontes/colocultor";
import DomGame from "./home/compontes/gamesDomw";
import OnlineGame from "./home/compontes/onlineGame";
import OrderWeb from "./home/compontes/orderWeb";

export default function run() {
    return(
        <div>
            <br />
            <br />
            <br />
            <DomGame /> 
            <OrderWeb /> 
            <OnlineGame />
            <Calcultor />
            <End />
        </div>
    )
}
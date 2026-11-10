import ChatMengger from "./chatmenger";
import styleps from "./page.module.css"

export default function chat() {
  return (
    <div className={styleps.div_center}>
        <ChatMengger />
    </div>
  );
}

import Chatbot from "../components/Chatbot";
import { ChatSidebar } from "../components/ChatSidebar";
import prysmBg from "../assets/prysmIobg.png";

function Home() {
  return (
    <div className="page"> 

      <main className="content">
        <section
          className="prysm"
          style={{ backgroundImage: `url(${prysmBg})` }}
        >
          <div className="prysmOverlay">
            <h1>Ask Prysm iO</h1>
            <h2>Your next AI health Assistant.</h2>

            <div className="chatWrapper">
              <ChatSidebar />
              <Chatbot />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

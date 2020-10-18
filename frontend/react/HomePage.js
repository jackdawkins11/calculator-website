import { Calculator } from './Calculator.js';
import { MessageBox } from './MessageBox.js';

function HomePage(props) {
    return (
        <div className="homepage">
            <div className="homepage-top-bar">
                <div className="sign-out-button" onClick={() => this.signOut()}>
                    Sign Out
                </div>
            </div>
            <div className="homepage-main">
                <Calculator />
                <MessageBox />
            </div>
        </div>
    );
}

export {HomePage};
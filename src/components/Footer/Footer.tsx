import React, {Component} from 'react'

class Footer extends Component {
    render() {
        return (
            <footer className="app-footer">
                <div style={{textAlign: 'right'}}>
                    تمامی حقوق این پلتفرم برای
                    &ensp;
                    <a href="https://aolab.github.io">کارگروه اینترنت اشیا دانشکده کامپیوتر دانشگاه امیرکبیر</a>
                    &ensp;
                    محفوظ است
                </div>
                <div className="mr-auto">
                    از سال ۱۳۹۶
                </div>
            </footer>
        )
    }
}

export default Footer

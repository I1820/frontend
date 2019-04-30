import React, {Component} from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <div>
          تمامی حقوق این پلتفرم برای
          &ensp;
          <a href="https://aiotrc.github.io">کارگروه اینترنت اشیا دانشکده کامپویتر دانشگاه امیرکبیر</a>
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

export default Footer;

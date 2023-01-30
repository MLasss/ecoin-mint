import { useState, useEffect } from 'react';
import "../assets/css/base.css";

function Footer() {
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
      setCurrentYear(new Date().getFullYear());
    }, []);

  return (
    <>
    <div>
      <footer className="py-1 bg-dark fixed-bottom footer">
        <div className="container">
          <p className="m-0 text-center text-white">
            &copy; 2021 - {currentYear} <a href="http://emojicoins.org/">emojicoins.org</a>
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Footer;
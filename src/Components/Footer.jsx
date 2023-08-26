import React from "react";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Mendy Bitton</div>
      <a target="_blank" className='gitHub' href="https://github.com/mendy-bitton"><FaGithub className='git-icon'></FaGithub></a>
    </footer>
  );
};

export default Footer;

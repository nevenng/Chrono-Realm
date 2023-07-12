import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <footer className={`footer${isVisible ? " visible" : ""}`}>
                <div className="footer-container">
                    <Link to="/home" className="footer-link">
                        <div className="footer-logo">
                            <img src="../assets/footer_logo.png" alt="Chrono Realm Logo" />
                        </div>
                    </Link>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Chrono Realm. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;

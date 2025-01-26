import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="px-5">
            <div className="row align-center justify-content-between">
                <div className="col-12 col-md-4 flex-grow-1 col-lg-3">
                    {/* logo */}
                    <div className="logo">
                        <Link to="janascript:void(0)">Lighr store</Link>
                        <p>
                            <Link to="/">28 palediyam shoping,</Link>
                            <br />
                            yogi chow,varacha-surat-231 456.
                        </p>
                        <p>
                            <Link to="/">+91 9427741387</Link>
                        </p>
                        <p>
                            <Link to="/">lemp.store@gmail.com</Link>
                        </p>
                    </div>
                </div>
                <div className="col-12 col-md-4 col-sm-6 flex-grow-1 col-lg-3">
                    {/* company */}
                    <div className="footer-item">
                        <h3>company</h3>
                        <ul>
                            <li>
                                <Link to="/">About</Link>
                            </li>
                            <li>
                                <Link to="/">product</Link>
                            </li>
                            <li>
                                <Link to="/">testimonial</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-md-4 col-sm-6 flex-grow-1 col-lg-3">
                    {/* support */}
                    <div className="footer-item">
                        <h3>support</h3>
                        <ul>
                            <li>
                                <Link to="/">FQA</Link>
                            </li>
                            <li>
                                <Link to="/">privacy policy</Link>
                            </li>
                            <li>
                                <Link to="/">Terms of Services</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-md-4 col-sm-6 flex-grow-1 col-lg-3">
                    {/* support */}
                    <div className="footer-item">
                        <h3>support</h3>
                        <ul>
                            <li>
                                <Link to="/">FQA</Link>
                            </li>
                            <li>
                                <Link to="/">privacy policy</Link>
                            </li>
                            <li>
                                <Link to="/">Terms of Services</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* copy right */}
            <div className="copyright">
                <p>&lt;/RD&gt; This web developed by RADHE_PATEL</p>
            </div>
        </footer>

    )
}

export default Footer

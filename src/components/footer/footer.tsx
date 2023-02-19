import { Link } from 'react-router-dom';

import classes from './footer.module.css';

export default function Footer() {
    return (
        <footer className={ classes.footer }>
            <div className={ classes.footerOtherContent }>
                <h5>flockfysh</h5>

                <small>
                    <p>Copyright &copy; 2023 flockfysh</p>
                    <p>All rights reserved.</p>
                </small>
            </div>

            <div className={ classes.footerLinksHolder }>
                <div className={ classes.footerLinks }>
                    <h6>Product</h6>

                    <Link to="/product">Sneak Peeks</Link>
                    <Link to="/product">Pricing</Link>
                    <Link to="/product">Documentation</Link>
                    <Link to="/product">Feedback</Link>
                </div>

                <div className={ classes.footerLinks }>
                    <h6>Company</h6>

                    <Link to="/product">Home</Link>
                    <Link to="/product">About</Link>
                    <Link to="/product">Blog</Link>
                </div>

                <div className={ classes.footerLinks }>
                    <h6>Contact</h6>

                    <Link to="/product">Twitter</Link>
                    <Link to="/product">Discord</Link>
                    <a href="https://github.com/teamnebulaco">Github</a>
                    <Link to="/product">Email</Link>
                </div>

                <div className={ classes.footerLinks }>
                    <h6>Legal</h6>

                    <Link to="/product">Privacy Policy</Link>
                    <Link to="/product">Terms of Service</Link>
                    <Link to="/product">Legal Use</Link>
                </div>
            </div>
        </footer>
    );
}

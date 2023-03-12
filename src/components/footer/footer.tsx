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
                    <a href="https://docs.flockfysh.tech/">Documentation</a>
                    <Link to="/product">Feedback</Link>
                </div>

                <div className={ classes.footerLinks }>
                    <h6>Company</h6>

                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <a href="https://blog.flockfysh.tech/">Blog</a>
                </div>

                <div className={ classes.footerLinks }>
                    <h6>Contact</h6>

                    <a href="" target="_blank">Twitter</a>
                    <a href="https://discord.gg/rjS8nXq7CK" target="_blank">Discord</a>
                    <a href="https://github.com/teamnebulaco" target="_blank">Github</a>
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

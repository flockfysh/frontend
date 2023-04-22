import Logout from '../../account/logout';
import Button from '../button/button';
import classes from './topLevelErrorBoundary.module.css';
import background from '../../hypePage/images/thirdSectionImage.svg';

export default function TopLevelErrorOverlay(props: {
    fullScreen: boolean,
    requiresLogout: boolean,
    message: string,
    title?: string,
    closeError: () => void,
    background?: boolean,
}) {
    let mainButton;
    if (props.requiresLogout) {
        mainButton = <Logout closeError={ props.closeError }></Logout>;
    }
    else {
        mainButton = <Button onClick={ props.closeError } gradient={ true }>OK</Button>;
    }
    return (
        <section className={ classes.overlay }>
            <div className={ `${classes.overlayInner} ${props.fullScreen ? classes.fullScreen : ''}` }>
                {props.background ? (
                    <>
                        <div className={ classes.background } style={ {
                            backgroundImage: `url(${background})`,
                        } }></div>
                        <div className={ classes.backgroundOverlay } style={ {} }></div>
                    </>
                ) : <></>}
                <div className={ `${classes.overlayContent}` }>
                    {props.title ? <h1 className={ classes.errorTitle }>{props.title}</h1> : <></>}
                    <p className={ classes.errorMessage }>{props.message}</p>
                    {mainButton}
                </div>

            </div>
        </section>
    );
}

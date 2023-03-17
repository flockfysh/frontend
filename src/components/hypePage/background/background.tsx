import classes from './background.module.css';

export default function Background() {

    return (
        <div className={ classes.backgroundWrapper2 }>
            <div className={ classes.backgroundWrapper }>
                <div className={ classes.gradient1 }>
                    <div className={ classes.rectangle1_1 }>
                        <div className={ classes.shape1 }>
                            <div className={ classes.vector1_1 }/>
                            <div className={ classes.vector1_2 }/>
                            <div className={ classes.vector1_3 }/>
                            <div className={ classes.vector1_4 }/>
                            <div className={ classes.vector1_5 }/>
                        </div>
                    </div>
                    <div className={ classes.rectangle1_2 }/>
                </div>

                <div className={ classes.gradient2 }>
                    <div className={ classes.rectangle2_1 }>
                        <div className={ classes.shape2 }>
                            <div className={ classes.vector2_1 }/>
                            <div className={ classes.vector2_2 }/>
                            <div className={ classes.vector2_3 }/>
                            <div className={ classes.vector2_4 }/>
                            <div className={ classes.vector2_5 }/>
                        </div>
                    </div>
                    <div className={ classes.rectangle2_2 }/>
                </div>
            </div>
        </div>
    );
}

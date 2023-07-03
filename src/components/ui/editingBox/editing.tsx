import { Dispatch, SetStateAction } from 'react';

import classes from './editing.module.css';

type Editing = {
   body: string;
   setBody: Dispatch<SetStateAction<string>>;
};

const Editing = (props:Editing) => {
   return ( 
                <div>
                    <textarea
                        className={ classes.textArea }
                        name="description"
                        placeholder="Describe what is in your contribution. Be as precise as you can"
                        onChange={ (event) => {
                            props.setBody(event.target.value);
                        } }
                        value={ props.body }
                    />
                </div>
   );
};

export default Editing;

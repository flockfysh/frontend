import { Dispatch, SetStateAction } from 'react';
import { ReactSVG } from 'react-svg';

import edit from '@/icons/main/edit-3.svg';
import save from '@/icons/main/save.svg';
import trash from '@/icons/main/trash-2.svg';
import info from '@/icons/main/info.svg';
import copy from '@/icons/main/copy.svg';
import generate from '@/icons/main/refresh-cw.svg';
import githubIcon from '@/icons/main/github.svg';
import linkedInIcon from '@/icons/main/linkedin.svg';
import twitterIcon from '@/icons/main/twitter.svg';
import link from '@/icons/main/link.svg';
import mail from '@/icons/main/mail.svg';
import key from '@/icons/main/key.svg';

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

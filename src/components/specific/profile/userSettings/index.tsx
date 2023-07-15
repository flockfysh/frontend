import api from '@/helpers/api';
import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactSVG } from 'react-svg';
import { useStateWithDeps } from 'use-state-with-deps';

import copy from '@/icons/main/copy.svg';
import edit from '@/icons/main/edit-3.svg';
import githubIcon from '@/icons/main/github.svg';
import info from '@/icons/main/info.svg';
import key from '@/icons/main/key.svg';
import link from '@/icons/main/link.svg';
import linkedInIcon from '@/icons/main/linkedin.svg';
import mail from '@/icons/main/mail.svg';
import generate from '@/icons/main/refresh-cw.svg';
import save from '@/icons/main/save.svg';
import trash from '@/icons/main/trash-2.svg';
import twitterIcon from '@/icons/main/twitter.svg';

import IconInput from '@/components/ui/input/iconInput';
import { ToastContext, ToastType } from '@/contexts/toastContext';
import { useRouter } from 'next/router';
import classes from './styles.module.css';

type UserSettings = {
  username: string;
  email: string;
  apiKey: string;
  mailingList: boolean;
  transferLimit: number;
  downloads: number;
  apiCalls: number;
};

type IFormInput = {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
};

function Input(props: {
  label?: string;
  value?: string;
  saveLabel?: string;
  icon?: string;
  saveIcon?: string;
  initialValue?: string;
  validator?: (data: string) => boolean;
  onChange?: (data: string) => void;
  onSave?: (data: string) => void;
}) {
  const id = React.useId();
  const [value, setValue] = useStateWithDeps<string>(() => {
    return props.value ?? props.initialValue ?? '';
  }, [props.value]);

  const validation = props.validator?.(value) ?? true;

  return (
    <label htmlFor={id} className={classes.infoContainerDiv}>
      {props.label ? (
        <div className={classes.subheading}>{props.label}</div>
      ) : (
        ''
      )}

      <div className={classes.inputDiv}>
        {props.icon ? (
          <ReactSVG src={props.icon} className={classes.icons} />
        ) : (
          <></>
        )}

        <input
          type="email"
          id={id}
          className={`${classes.input} ${
            validation ? classes.invalidInput : ''
          }`}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            props.onChange?.(event.target.value);
          }}
        />

        {props.saveLabel ? (
          <button
            className={classes.button}
            onClick={() => {
              props.onSave?.(value);
            }}
          >
            {props.saveLabel}
            {props.saveIcon ? (
              <ReactSVG src={props.saveIcon} className={classes.icons} />
            ) : (
              <></>
            )}
          </button>
        ) : (
          <></>
        )}
      </div>
    </label>
  );
}

export default function UserSettings(props: UserSettings) {
  const { notify } = useContext(ToastContext);
  const [linkValues, setLinkValues] = useState({
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
  });
  const [email, _setEmail] = useState(props.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [apiKey, setApiKey] = useState(props.apiKey);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: linkValues,
  });
  const router = useRouter();
  const username = router.query.username;

  // 0=general, 1=billing, 2=connections
  const [filter, updateFilter] = useState(0);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await api.put('/api/users/links', { data });
    setLinkValues(res.data.data);
    notify({
      toastType: ToastType.SUCCESS,
      message: 'Links Saved',
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(`/api/users/byUsername/${username}/links`);
      setLinkValues(res.data.data);
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    reset(linkValues);
  }, [linkValues, reset]);

  return (
    <section className={classes.containDiv}>
      <div className={classes.headingDiv}>
        <h3 className={classes.heading}>General Settings</h3>

        <div className={classes.navDiv}>
          <div
            className={`${classes.navButton} ${
              filter === 0 && classes.active
            } ${classes.firstButton}`}
            onClick={() => updateFilter(0)}
          >
            General
          </div>

          <div
            className={`${classes.navButton} ${filter === 1 && classes.active}`}
            onClick={() => updateFilter(1)}
          >
            Billing
          </div>

          <div
            className={`${classes.navButton} ${
              filter === 2 && classes.active
            } ${classes.lastButton}`}
            onClick={() => updateFilter(2)}
          >
            Connections
          </div>
        </div>
      </div>

      <div className={classes.credentialsDiv}>
        <div className={classes.contentDiv}>
          <Input
            label={'Change email'}
            initialValue={props.email}
            saveLabel={'Change'}
            saveIcon={edit.src}
            icon={mail.src}
          />

          <Input
            label={'Change username'}
            initialValue={props.username}
            saveLabel={'Change'}
            saveIcon={edit.src}
            icon={mail.src}
            onSave={async (newUsername) => {
              try {
                await api.patch('/api/users/username', {
                  username: newUsername,
                });
                notify({
                  toastType: ToastType.SUCCESS,
                  message: 'Username Updated Successfully',
                });
              }
 catch (error) {
                notify({
                  toastType: ToastType.ERROR,
                  message: `${error}`,
                });
              }
            }}
          />

          <div className={classes.infoContainerDiv}>
            <h4 className={classes.subheading}>Your API key</h4>

            <div className={classes.api}>
              <p className={classes.apiKey}>
                {apiKey}

                <button
                  className={classes.iconButton}
                  onClick={() => {
                    navigator.clipboard.writeText(apiKey);
                  }}
                >
                  <ReactSVG src={copy.src} className={classes.icons} />
                </button>
              </p>

              <button
                className={classes.iconButton}
                onClick={() => {
                  let finalKey = '';
                  for (let index = 1; index < 21; index++) {
                    finalKey =
                      finalKey +
                      String.fromCharCode(Math.round(Math.random() * 93) + 33);
                  }

                  setApiKey(finalKey);
                }}
              >
                <ReactSVG src={generate.src} className={classes.icons} />
              </button>

              <button className={classes.iconButton}>
                <ReactSVG src={trash.src} className={classes.icons} />
              </button>
            </div>
          </div>
        </div>

        <div className={classes.contentDiv}>
          <div className={classes.infoContainerDiv}>
            <h4 className={classes.subheading}>Change password</h4>
            <div className={classes.inputDiv}>
              <ReactSVG src={key.src} className={classes.icons} />

              <input
                type="password"
                placeholder="Enter Old Password"
                className={classes.inputLong}
                value={oldPassword}
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
              />
            </div>
            <div className={classes.inputDiv}>
              <ReactSVG src={key.src} className={classes.icons} />

              <input
                type="password"
                placeholder="Enter New Password"
                className={classes.input}
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />

              <button
                className={classes.button}
                onClick={async () => {
                  try {
                    if (oldPassword === '') {
                      throw new Error('Old Password cannot be empty');
                    }

                    if (newPassword !== oldPassword) {
                      throw new Error('Old & New Password should match');
                    }

                    await api.patch('/api/users/password', {
                      oldPassword,
                      newPassword,
                    });
                    notify({
                      toastType: ToastType.SUCCESS,
                      message: 'Passsword Changed Successfully',
                    });
                    setOldPassword('');
                    setNewPassword('');
                  }
 catch (error) {
                    notify({
                      toastType: ToastType.ERROR,
                      message: `${error}`,
                    });
                  }
                }}
              >
                Save
                <ReactSVG src={save.src} className={classes.icons} />
              </button>
            </div>
          </div>
        </div>

        <div className={classes.limitsDiv}>
          <h4 className={classes.subheading + ' ' + classes.limitsHeading}>
            Limits
          </h4>

          <div className={classes.limitsContentDiv}>
            <div className={classes.limitObject}>
              <h5 className={classes.limit}>
                <span>Transfer Limit</span>
                {props.transferLimit.toString()} / 25GB
              </h5>

              <div className={classes.graphBody}>
                <div
                  className={classes.graphContent}
                  style={{
                    width: ((props.transferLimit / 25) * 100).toString() + '%',
                  }}
                />
              </div>

              <ReactSVG
                src={info.src}
                className={classes.icons + ' ' + classes.infoIcon}
              />
            </div>

            <div className={classes.limitObject}>
              <h5 className={classes.limit}>
                <span>Downloads</span>
                {props.downloads.toString()} / 10 datasets
              </h5>

              <div className={classes.graphBody}>
                <div
                  className={classes.graphContent}
                  style={{
                    width: ((props.downloads / 10) * 100).toString() + '%',
                  }}
                />
              </div>

              <ReactSVG
                src={info.src}
                className={classes.icons + ' ' + classes.infoIcon}
              />
            </div>

            <div className={classes.limitObject}>
              <h5 className={classes.limit}>
                <span>API Calls</span>
                {props.apiCalls.toString()} / 10,000
              </h5>

              <div className={classes.graphBody}>
                <div
                  className={classes.graphContent}
                  style={{
                    width: ((props.apiCalls / 10000) * 100).toString() + '%',
                  }}
                />
              </div>

              <ReactSVG
                src={info.src}
                className={classes.icons + ' ' + classes.infoIcon}
              />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={classes.linksDiv}>
        <div className={classes.linkHeadingDiv}>
          <h4 className={classes.subheading + ' ' + classes.linkSubheading}>
            Links
          </h4>

          <button type="submit" className={classes.button}>
            Save <ReactSVG src={save.src} className={classes.icons} />
          </button>
        </div>

        <div>
          <IconInput
            name="github"
            placeholder="https://github.com"
            icon={githubIcon}
            register={register}
            errors={errors}
          />

          <IconInput
            name="linkedin"
            placeholder="https://linkedin.com"
            icon={linkedInIcon}
            register={register}
            errors={errors}
          />

          <IconInput
            name="twitter"
            placeholder="https://twitter.com"
            icon={twitterIcon}
            register={register}
            errors={errors}
          />

          <IconInput
            name="website"
            placeholder="https://website.com"
            icon={link}
            register={register}
            errors={errors}
          />
        </div>

        <button className={classes.deactivateButton}>
          Deactivate Account{' '}
          <ReactSVG src={trash.src} className={classes.icons} />
        </button>
      </form>
    </section>
  );
}

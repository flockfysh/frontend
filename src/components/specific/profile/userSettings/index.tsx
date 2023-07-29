import { useId, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactSVG } from 'react-svg';
import { useStateWithDeps } from 'use-state-with-deps';
import { useRouter } from 'next/router';

import { ToastContext, ToastType } from '@/contexts/toastContext';

import api from '@/helpers/api';

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
import search from '@/icons/main/search.svg';
import CustomSelect, { CustomCreatableSelect } from '../../../ui/input/select';
import * as settings from '@/settings';

import classes from './styles.module.css';
import IconInput from '@/components/ui/input/iconInput';
import { UserContext } from '@/contexts/userContext';
import TextInput from '@/components/ui/input/textInput';
import { TableVirtuoso } from 'react-virtuoso';
import {
  Table,
  TableBody,
  TableBodyProps,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableHeadProps,
  TableProps,
  TableRow,
  TableRowProps,
} from '@mui/material';
import PayPal from '@/pages/paypal';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Button from '@/components/ui/theming/button';
import { fi } from '@faker-js/faker';

const datasetTypeOptions = [
  { value: 'image', label: 'Images' },
  { value: 'text', label: 'Text' },
  { value: 'video', label: 'Video' },
];

type UserSettings = {
    username: string;
    email: string;
    apiKey: string;
    mailingList: boolean;
    transferLimit: number;
    downloads: number;
    apiCalls: number;
};

interface PaymentObject {
  price_data: {
      currency: string;
      product_data: {
          name: string;
      },
      unit_amount: number;
  },
  quantity: number;
}


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
    const id = useId();
    const [value, setValue] = useStateWithDeps<string>(() => {
        return props.value ?? props.initialValue ?? '';
    }, [props.value]);

    const validation = props.validator?.(value) ?? true;

    

    return (
        <label htmlFor={ id } className={ classes.infoContainerDiv }>
            { props.label ? (
                <div className={ classes.subheading }>{ props.label }</div>
            ) : (
                ''
            ) }

            <div className={ classes.inputDiv }>
                { props.icon ? (
                    <ReactSVG src={ props.icon } className={ classes.icons } />
                ) : (
                    <></>
                ) }

                <input
                    type="email"
                    id={ id }
                    className={ `${classes.input} ${
                        validation ? classes.invalidInput : ''
                    }` }
                    value={ value }
                    onChange={ (event) => {
                        setValue(event.target.value);
                        props.onChange?.(event.target.value);
                    } }
                />

                { props.saveLabel ? (
                    <button
                        className={ classes.button }
                        onClick={ () => {
                            props.onSave?.(value);
                        } }
                    >
                        { props.saveLabel }
                        { props.saveIcon ? (
                            <ReactSVG
                                src={ props.saveIcon }
                                className={ classes.icons }
                            />
                        ) : (
                            <></>
                        ) }
                    </button>
                ) : (
                    <></>
                ) }
            </div>
        </label>
    );
}

export default function UserSettings(props: UserSettings) {
  const [linkValues, setLinkValues] = useState({
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
  });
  const [email, _setEmail] = useState(props.email);
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState(props.apiKey);
  const [payPal, setPayPal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    refillLink: '',
    accountLink: '',
    apiLimits: {
      transferAmount: 1,
      apiCalls: 1,
      downloadLimit: 1,
    },
  });

  useEffect(() => {
    async function fetchData() {
      
      //Retrieve all API data
      const apiData = await api.get('/api/payments/apiRefillData');
      const refillPaymentData = apiData.data.data.refill_payment;
      const apiLimits = apiData.data.data.apiLimits;

      const refillLink = await api.post('/api/payments/oneTimePurchase', {
        paymentData : [refillPaymentData],
      });

      const onboardingCompleted = (await api.post('/api/users/payout/onboarding/status'));


      let acctLink = '';

      if(onboardingCompleted.data.data !== 'completed'){
        const accountLink = await api.post('/api/users/payout/onboarding', {
          returnUrl: settings.FRONTEND_URL,
        });
        acctLink = accountLink.data.data;
      }
 else {
        const dashboardLink = await api.post('/api/users/payout/dashboard');
        acctLink = dashboardLink.data.data;
      }


      setPaymentData({ refillLink: refillLink.data.data, accountLink: acctLink, apiLimits : apiLimits });

    }

    fetchData();

  }, [props.username]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: linkValues,
  });


  const { user } = useContext(UserContext);

  
  // 0=general, 1=billing, 2=connections
  const [filter, updateFilter] = useState(0);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await api.put('/api/users/links', { data });
    setLinkValues(res.data.data);
  };

  useEffect(() => {
    const fetchData = async () => {

      const res = await api.get(`/api/users/byUsername/${user?.username}/links`);
      setLinkValues(res?.data?.data);
    };

    fetchData();
  }, [user?._id]);

  useEffect(() => {
    reset(linkValues);
  }, [linkValues, reset]);
  
  
  console.log(filter, 'filter=>>');

  return (
    <div className={ classes.limitsContentDiv }>
      <section className={ classes.containDiv }>
        <div className={ classes.headingDiv }>
          <h3 className={ classes.heading }>General Settings</h3>

          <div className={ classes.navDiv }>
            <div
              className={ `${classes.navButton} ${
                filter === 0 && classes.active
              } ${classes.firstButton}` }
              onClick={ () => updateFilter(0) }
            >
              General
            </div>

            <div
              className={ `${classes.navButton} ${
                filter === 1 && classes.active
              }` }
              onClick={ () => updateFilter(1) }
            >
              Billing
            </div>

            <div
              className={ `${classes.navButton} ${
                filter === 2 && classes.active
              } ${classes.lastButton}` }
              onClick={ () => updateFilter(2) }
            >
              Connections
            </div>
          </div>
        </div>

        { filter === 0 ? (
          <div className={ classes.credentialsDiv }>
            <div className={ classes.contentDiv }>
              <Input
                label={ 'Change email' }
                initialValue={ props.email }
                saveLabel={ 'Change' }
                saveIcon={ edit.src }
                icon={ mail.src }
              />

              <Input
                label={ 'Change username' }
                initialValue={ props.username }
                saveLabel={ 'Change' }
                saveIcon={ edit.src }
                icon={ mail.src }
                onSave={ async (newUsername) => {
                  await api.patch('/api/users/username', {
                    username: newUsername,
                  });
                } }
              />

              <div className={ classes.infoContainerDiv }>
                <h4 className={ classes.subheading }>Your API key</h4>

                <div className={ classes.api }>
                  <p className={ classes.apiKey }>
                    { apiKey }

                    <button
                      className={ classes.iconButton }
                      onClick={ () => {
                        navigator.clipboard.writeText(apiKey);
                      } }
                    >
                      <ReactSVG src={ copy.src } className={ classes.icons } />
                    </button>
                  </p>

                  <button
                    className={ classes.iconButton }
                    onClick={ async() => {
                      
                      const newKey = await api.patch(`/api/users/apiUpdates/regenerateAPIKey`);
                      setApiKey(newKey.data.data.data);
                      toast.success(`API Key was successfully regenerated.`);

                    } }
                  >
                    <ReactSVG src={ generate.src } className={ classes.icons } />
                  </button>

                  <button className={ classes.iconButton }>
                    <ReactSVG src={ trash.src } className={ classes.icons } />
                  </button>
                </div>
              </div>
            </div>

            <div className={ classes.contentDiv }>
              <div className={ classes.infoContainerDiv }>
                <h4 className={ classes.subheading }>Change password</h4>

                <div className={ classes.inputDiv }>
                  <ReactSVG src={ key.src } className={ classes.icons } />

                  <input
                    type="email"
                    className={ classes.input }
                    value={ password }
                    onChange={ (event) => {
                      setPassword(event.target.value);
                    } }
                  />

                  <button
                    className={ classes.button }
                    onClick={ async () => {
                      await api.patch('/api/users/email', {
                        email: email,
                      });
                    } }
                  >
                    Save
                    <ReactSVG src={ save.src } className={ classes.icons } />
                  </button>
                </div>
              </div>
            </div>

            <div className={ classes.limitsDiv }>
              <h4 className={ classes.subheading + ' ' + classes.limitsHeading }>
                Limits <Link href={ paymentData.refillLink } className= {classes.button} target="_blank" > Refill </Link>
              </h4>

              <div className={ classes.limitsContentDiv }>
                <div className={ classes.limitObject }>
                  <h5 className={ classes.limit }>
                    <span>Transfer Limit</span>
                    { props.transferLimit.toString() } / { paymentData.apiLimits.transferAmount }GB
                  </h5>

                  <div className={ classes.graphBody }>
                    <div
                      className={ classes.graphContent }
                      style={ {
                        width:
                          ((props.transferLimit / paymentData.apiLimits.transferAmount ) * 100).toString() + '%',
                      } }
                    />
                  </div>

                  <ReactSVG
                    src={ info.src }
                    className={ classes.icons + ' ' + classes.infoIcon }
                  />
                </div>

                <div className={ classes.limitObject }>
                  <h5 className={ classes.limit }>
                    <span>Downloads</span>
                    { props.downloads.toString() } / { paymentData.apiLimits.downloadLimit } datasets
                  </h5>

                  <div className={ classes.graphBody }>
                    <div
                      className={ classes.graphContent }
                      style={ {
                        width: ((props.downloads / paymentData.apiLimits.downloadLimit) * 100).toString() + '%',
                      } }
                    />
                  </div>

                  <ReactSVG
                    src={ info.src }
                    className={ classes.icons + ' ' + classes.infoIcon }
                  />
                </div>

                <div className={ classes.limitObject }>
                  <h5 className={ classes.limit }>
                    <span>API Calls</span>
                    { props.apiCalls.toString() } / { paymentData.apiLimits.apiCalls }
                  </h5>

                  <div className={ classes.graphBody }>
                    <div
                      className={ classes.graphContent }
                      style={ {
                        width:
                          ((props.apiCalls / paymentData.apiLimits.apiCalls) * 100).toString() + '%',
                      } }
                    />
                  </div>

                  <ReactSVG
                    src={ info.src }
                    className={ classes.icons + ' ' + classes.infoIcon }
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          //// nidhi route http://127.0.0.1:3000/profile
          <>
            <div className={ classes.billing }>
              <div className={ classes.left }>
                <h1>Connect Payment types</h1>
                <div className={ classes.inputBox }>
                  <Input
                    saveLabel={ 'Connect Stripe' }
                    saveIcon={ edit.src }
                    icon={ mail.src }
                    value="stripe@striple.com"
                  />
                  <Link href = { paymentData.accountLink } target="_blank">
                    Connect Stripe
                  </Link>

                  <Input
                    saveLabel={ 'Connect Paypal' }
                    saveIcon={ edit.src }
                    icon={ mail.src }
                    onSave={ () => setPayPal(!payPal) }
                    value="user@example.com"
                  />
                  { payPal === true && <PayPal /> }
                </div>
              </div>
              <div className={ classes.right }>
                <h1>Statistics</h1>
                <div className={ classes.state }>
                  <div className={ classes.box }>
                    <div className={ classes.title }>Expense</div>
                    <div className={ classes.price }>$18532.52</div>
                    <div className={ classes.greenBtn }>+11%</div>
                  </div>
                  <div className={ classes.box }>
                    <div className={ classes.title }>Income</div>
                    <div className={ classes.price }>$18532.52</div>
                    <div className={ classes.redBtn }>+11%</div>
                  </div>
                  <div className={ classes.box }>
                    <div className={ classes.title }>Pending</div>
                    <div className={ classes.price }>$18532.52</div>
                    <div className={ classes.yellowBtn }>+11%</div>
                  </div>
                </div>
              </div>

              { /* //nidhi */ }
            </div>
            <div className={ classes.billingTable }>
              <h1>Transaction History</h1>
              <div className={ classes.dropArea }>
                <div className={ classes.searchContainer }>
                  <ReactSVG src={ search.src } className={ classes.searchIcon } />
                  <input
                    type="search"
                    className={ classes.search }
                    placeholder="Search by user, title"
                  />
                </div>
                <CustomSelect
                  required={ true }
                  name="type"
                  className={ classes.select }
                  placeholder="Dataset Type"
                  options={ datasetTypeOptions }
                />
                <CustomSelect
                  required={ true }
                  name="type"
                  // style={{align : }}
                  className={ classes.select }
                  placeholder="Category"
                  options={ datasetTypeOptions }
                />
              </div>
              <div className={ classes.tableResponsive }>
                <table className={ classes.table }>
                  <thead>
                    <tr className={ classes.tr }>
                      <th className={ classes.th }></th>
                      <th className={ classes.th }>From</th>
                      <th className={ classes.th }>Medium</th>
                      <th className={ classes.th }>Category</th>
                      <th className={ classes.th }>Type</th>
                      <th className={ classes.th }>Status</th>
                      <th className={ classes.th }>Date</th>
                      <th className={ classes.th }>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={ classes.tr }>
                      <td className={ classes.td }>
                        <input type="checkbox" />
                      </td>
                      <td className={ classes.td }>
                        <div className={ classes.images }>
                          <img src="#" className={ classes.avatar } />
                          <div>
                            <h6>DATASET XYZ</h6>
                            <span>Payment for 12 Contributions</span>
                          </div>
                        </div>
                      </td>
                      <td className={ classes.td }>STRIPE</td>
                      <td className={ classes.td }>Contributions</td>
                      <td className={ classes.td }>Income</td>
                      <td className={ classes.td }>
                        <div className={ classes.success }>Sucess</div>
                      </td>
                      <td className={ classes.td }>Jan 2,2022</td>
                      <td className={ classes.td }>$783.22</td>
                    </tr>
                    <tr className={ classes.tr }>
                      <td className={ classes.td }>
                        <input type="checkbox" />
                      </td>
                      <td className={ classes.td }>
                        <div className={ classes.images }>
                          <img src="#" className={ classes.avatar } />
                          <div>
                            <h6>DATASET XYZ</h6>
                            <span>Payment for 12 Contributions</span>
                          </div>
                        </div>
                      </td>
                      <td className={ classes.td }>STRIPE</td>
                      <td className={ classes.td }>Contributions</td>
                      <td className={ classes.td }>Income</td>
                      <td className={ classes.td }>
                        <div className={ classes.warning }>Warning</div>
                      </td>
                      <td className={ classes.td }>Jan 2,2022</td>
                      <td className={ classes.td }>$783.22</td>
                    </tr>
                    <tr className={ classes.tr }>
                      <td className={ classes.td }>
                        <input type="checkbox" />
                      </td>
                      <td className={ classes.td }>
                        <div className={ classes.images }>
                          <img src="#" className={ classes.avatar } />
                          <div>
                            <h6>DATASET XYZ</h6>
                            <span>Payment for 12 Contributions</span>
                          </div>
                        </div>
                      </td>
                      <td className={ classes.td }>STRIPE</td>
                      <td className={ classes.td }>Contributions</td>
                      <td className={ classes.td }>Income</td>
                      <td className={ classes.td }>
                        <div className={ classes.rejected }>Rejected</div>
                      </td>
                      <td className={ classes.td }>Jan 2,2022</td>
                      <td className={ classes.td }>$783.22</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) }

        { filter === 0 && (
          <form onSubmit={ handleSubmit(onSubmit) } className={ classes.linksDiv }>
            <div className={ classes.linkHeadingDiv }>
              <h4 className={ classes.subheading + ' ' + classes.linkSubheading }>
                Links
              </h4>

              <button type="submit" className={ classes.button }>
                Save <ReactSVG src={ save.src } className={ classes.icons } />
              </button>
            </div>

            <div>
              <IconInput
                name="github"
                placeholder="https://github.com"
                icon={ githubIcon }
                register={ register }
                errors={ errors }
              />

              <IconInput
                name="linkedin"
                placeholder="https://linkedin.com"
                icon={ linkedInIcon }
                register={ register }
                errors={ errors }
              />

              <IconInput
                name="twitter"
                placeholder="https://twitter.com"
                icon={ twitterIcon }
                register={ register }
                errors={ errors }
              />

              <IconInput
                name="website"
                placeholder="https://website.com"
                icon={ link }
                register={ register }
                errors={ errors }
              />
            </div>

            <button className={ classes.deactivateButton }>
              Deactivate Account{ ' ' }
              <ReactSVG src={ trash.src } className={ classes.icons } />
            </button>
          </form>
        ) }
      </section>
    </div>
  );
}

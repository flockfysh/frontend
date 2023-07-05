import Select, { AsyncCustomSelect } from '@/components/ui/input/select';
import api from '@/helpers/api';
import Image from 'next/image';
import { getDefaultProfilePicture } from '@/helpers/defaults';
import { permissionOptions } from '@/helpers/enums/permission';
import { ReactSVG } from 'react-svg';
import link from '@/icons/main/link.svg';
import classes from './styles.module.css';
import useClient from '@/helpers/hooks/useClient';
import Input from '@/components/specific/marketplace/datasetSettings/input';
import money from '@/icons/main/dollar-sign.svg';
import { useContext } from 'react';
import { PopupModalContext } from '@/components/ui/modals/actionPopup';

export default function PermissionForm(props: {
    dataset: PreviewDataset
    onInsert: (data: PermissionWithUser) => void
}) {
    const body = useClient(() => document.body);
    const { close } = useContext(PopupModalContext);

    async function submit(data: FormData) {
        const role = data.get('role');
        const usernames = data.getAll('usernames');
        for (const name of usernames) {
            const result = (await api.post<Api.Response<PermissionWithUser>>(`/api/datasets/${props.dataset._id}/permissions`, {
                role: role,
                username: name,
            }, {
                params: {
                    expand: 'user',
                },
            })).data.data;
            props.onInsert(result);
        }
    }

    return (
        <form className={ classes.addPermissionForm } onSubmit={ async event => {
            event.preventDefault();
            await submit(new FormData(event.currentTarget));
            close();
        } }>
            <div className={ classes.formBody }>
                <AsyncCustomSelect
                    placeholder={ 'Add users' }
                    isMulti={ true }
                    name={ 'usernames' }
                    required={ true }
                    components={ {
                        SelectContainer(props) {
                            return (
                                <div className={ props.getClassNames('container', props) }>
                                    <ReactSVG src={ link.src }></ReactSVG>
                                    { props.children }
                                    <Select
                                        options={ permissionOptions } className={ classes.permissionRoleInput }
                                        classNames={ {
                                            menuPortal() {
                                                return classes.permissionRoleInputMenuPortal;
                                            },
                                        } }
                                        name={ 'role' }
                                        required={ true }
                                        placeholder={ 'Select role' } menuPortalTarget={ body }
                                    />
                                </div>
                            );
                        },
                    } }
                    loadOptions={ async (inputValue) => {
                        const users = (await api.get<Api.PaginatedResponse<RedactedUser[]>>('/api/users/search', {
                            params: {
                                query: inputValue,
                            },
                        })).data.data;
                        return users.map(user => {
                            const res = {
                                value: user.username,
                                label: <div className={ classes.userEntry }>
                                    <Image className={ classes.userEntryProfilePicture } width={ 36 } height={ 36 } alt={ '' }
                                           src={ user.profilePhoto?.url ?? getDefaultProfilePicture() }/>
                                    <div className={ classes.userEntryInfo }>
                                        <span className={ classes.userEntryFullName }>{ user.fullName }</span>
                                        <span>@{ user.username }</span>
                                    </div>
                                </div>,
                            };
                            return res;
                        });
                    } }
                    menuPosition={ 'fixed' }
                    menuPortalTarget={ body }
                    classNames={ {
                        control() {
                            return classes.userInputControl;
                        },
                        menu() {
                            return classes.userInputMenu;
                        },
                        menuPortal() {
                            return classes.userInputMenuPortal;
                        },
                        valueContainer() {
                            return classes.userInputValueContainer;
                        },
                        multiValue() {
                            return classes.userInputMultiValue;
                        },
                        indicatorSeparator() {
                            return classes.userInputIndicatorSeparator;
                        },
                        dropdownIndicator() {
                            return classes.userInputDropdownIndicator;
                        },
                        container() {
                            return classes.userInputContainer;
                        },
                    } }
                />
            </div>
            <div className={ classes.formFooter }>
                <Input icon={ money.src } disabled={ true } placeholder={ 'Set commission amount' } type={ 'number' }
                       className={ classes.commissionInput }></Input>
                <button className={ classes.saveButton }>Save</button>
            </div>
        </form>
    );
}

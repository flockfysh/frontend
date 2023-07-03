import { getDefaultProfilePicture } from '@/helpers/defaults';
import Image from 'next/image';
import Select, { AsyncCustomSelect, CustomCreatableSelect } from '@/components/ui/input/select';
import classes from './styles.module.css';
import { useStateWithDeps } from 'use-state-with-deps';
import InfiniteScroll from 'react-infinite-scroller';
import deleteIcon from '@/icons/main/trash.svg';
import { ReactSVG } from 'react-svg';
import plus from '@/icons/main/plus-circle.svg';
import { v4 } from 'uuid';
import { useMemo } from 'react';
import ActionPopupWithButton from '@/components/ui/modals/actionPopupWithButton';
import api from '@/helpers/api';

const dummyPermissions: PermissionWithUser[] = Array.from({ length: 5 }, () => {
    return {
        _id: v4(),
        dataset: '2131254',
        role: 'admin',
        user: {
            email: 'khanhtranngoccva@gmail.com',
            username: 'khanhtranngoccva',
            firstName: 'Khanh',
            lastName: 'Tran',
            fullName: 'Khanh Tran',
            _id: 'user1',
        },
        purchased: false,
    };
});

const options: { value: Flockfysh.DatasetAccessLevel, label: string }[] = [
    {
        value: 'admin', label: 'Administrator',
    },
    {
        value: 'maintainer', label: 'Maintainer',
    },
    {
        value: 'contributor', label: 'Contributor',
    },
    {
        value: 'blocked', label: 'Blocked',
    },
];

function PermissionModal() {
    return (
        <ActionPopupWithButton button={ (
            <button className={ classes.inviteButton }>
                Invite
                <ReactSVG src={ plus.src }></ReactSVG>
            </button>
        ) } popupTitle={ 'Invite Contributors' } variant={ 'marketplace' }>
            <PermissionForm></PermissionForm>
        </ActionPopupWithButton>
    );
}

function PermissionForm() {
    return (
        <form className={ classes.addPermissionForm }>
            <AsyncCustomSelect isMulti={ true } loadOptions={ async (inputValue) => {
                const users = (await api.get<Api.PaginatedResponse<RedactedUser[]>>('/api/users/search', {
                    params: {
                        query: inputValue,
                    },
                })).data.data;
                return users.map(user => {
                    const res = {
                        label: user.username,
                        value: <div><Image width={ 24 } height={ 24 } alt={ '' }
                                           src={ user.profilePhoto?.url ?? getDefaultProfilePicture() }/><span>user.username</span>
                        </div>,
                    };
                    return res;
                });
            } }/>
        </form>
    );
}

function PermissionCard(props: {
    permission: PermissionWithUser,
}) {
    const body = useMemo(() => {
        try {
            return document.querySelector('html');
        }
 catch (e) {
            return null;
        }
    }, []);

    return (
        <li className={ classes.card }>
            <div className={ classes.cardBasicInfo }>
                <Image
                    width={ 48 }
                    height={ 48 }
                    src={ props.permission.user.profilePhoto?.url ?? getDefaultProfilePicture() }
                    alt={ 'Profile picture' }
                    className={ classes.cardProfilePicture }
                />
                <span className={ classes.email }>
                    { props.permission.user.email }
                </span>
                <Select
                    options={ options } isMulti={ false }
                    className={ classes.selectInput }
                    classNames={ {
                        menu() {
                            return classes.selectMenu;
                        },
                    } }
                    menuPortalTarget={ document.body }
                    menuPosition={ 'fixed' }
                    defaultValue={ options.filter(opt => opt.value === props.permission.role)[0] }
                />
            </div>
            <button onClick={ () => {
            } } className={ classes.deleteButton }>
                <ReactSVG src={ deleteIcon.src } className={ classes.deleteButtonIcon }></ReactSVG>
            </button>
        </li>
    );
}

export default function PermissionManager(dataset: PreviewDataset) {
    const [state, setState] = useStateWithDeps<{
        hasMore: boolean,
        next?: string,
        permissions: PermissionWithUser[]
    }>(initialState, [dataset._id]);


    function initialState() {
        return {
            hasMore: true,
            next: undefined,
            permissions: [],
        };
    }

    return (
        <div className={ classes.container }>
            <div className={ classes.header }>
                <h3 className={ classes.heading }>
                    People who have access
                </h3>
                <PermissionModal></PermissionModal>
            </div>
            <div className={ classes.permissionListContainer }>
                <InfiniteScroll loadMore={ () => {
                } }>
                    <ul className={ classes.permissionList }>
                        { dummyPermissions.map(permission => (
                            <PermissionCard key={ permission._id }
                                            permission={ permission }/>
                        )) }
                    </ul>
                </InfiniteScroll>
            </div>
        </div>
    );
}

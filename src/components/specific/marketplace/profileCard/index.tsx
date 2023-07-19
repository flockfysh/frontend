import Avatar from 'boring-avatars';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { useContext, useState } from 'react';
import { ReactSVG } from 'react-svg';

import api from '@/helpers/api';

import discord from '@/icons/main/Discord.svg';
import logOut from '@/icons/main/log-out.svg';
import user from '@/icons/main/user.svg';

import { UserContext } from '@/contexts/userContext';
import { join } from '@/helpers/dataManipulation/arrays';
import money from '@/icons/main/dollar-sign.svg';
import { StaticImageData } from 'next/image';
import classes from './styles.module.css';

type ProfileCardProps = {
  profilePicture?: string;
  username: string;
  className?: string;
  showMenu: boolean;
  isPostCard?: boolean;
};

function ProfileCardMenuLink(props: {
  href: string;
  label: string;
  icon: StaticImageData;
  onClick?: () => void;
}) {
  return (
    <Link
      href={props.href}
      className={classes.dropdownItem}
      onClick={props.onClick}
    >
      <ReactSVG src={props.icon.src} className={classes.icon} />
      <span>{props.label}</span>
    </Link>
  );
}

export default function ProfileCard(props: ProfileCardProps) {
  const [open, setOpen] = useState(false);
  const { meta } = useContext(UserContext);
  const router = useRouter();

  const profileCardLinkData: {
    href: string;
    label: string;
    icon: StaticImageData;
    onClick?: () => void;
  }[][] = [
    [
      {
        href: `/profile/${props.username}`,
        label: 'View Profile',
        icon: user,
      },
      //   {
      //     href: "/datasets",
      //     label: "My Datasets",
      //     icon: zap,
      //   },
      //   {
      //     href: "/settings",
      //     label: "Settings",
      //     icon: settings,
      //   },
    ],
    [
      //   {
      //     href: "/changelog",
      //     label: "Changelog",
      //     icon: layers,
      //   },
      {
        href: 'https://discord.gg/Ss8vcfQWPM',
        label: 'Join Discord',
        icon: discord,
      },
      //   {
      //     href: "/support",
      //     label: "Support",
      //     icon: help,
      //   },
      //   {
      //     href: "https://docs.flockfysh.ai/",
      //     label: "Documentation",
      //     icon: code,
      //   },
    ],
    [
      {
        href: '/logout',
        label: 'Log Out',
        icon: logOut,
      },
    ],
  ];

  if (meta) {
    profileCardLinkData[0].push({
      href: '#',
      label: meta.payoutOnboardingComplete ? 'Payouts' : 'Onboard payout',
      icon: money,
      onClick: async () => {
        let url;
        if (meta.payoutOnboardingComplete) {
          url = '/api/users/payout/dashboard';
        }
 else {
          url = '/api/users/payout/onboarding';
        }
        const redirect = await api
          .post<Api.Response<string>>(url, {
            returnUrl: window.location.href,
          })
          .then((res) => res.data.data);
        await router.push(redirect);
      },
    });
  }

  const handleOnCloseMenu = (e: React.FocusEvent) => {
    if (!open) {
      e.preventDefault();
    }
    if (e.currentTarget.contains(e.relatedTarget)) {
      e.preventDefault();
      return;
    }
    setOpen(false);
  };

  const menu = join(
    profileCardLinkData.map((group) => {
      return group.map((item, index) => {
        return (
          <ProfileCardMenuLink
            key={index}
            href={item.href}
            label={item.label}
            icon={item.icon}
            onClick={item.onClick}
          />
        );
      });
    }),
    <div className={classes.separator}></div>
  )
    .flatMap((item) => {
      return item;
    })
    .map((item, index) => {
      return React.cloneElement(item, {
        key: index,
      });
    });

  return (
    <div className={classes.buttonWrapper} onBlur={handleOnCloseMenu}>
      <button
        onClick={() => setOpen(!open)}
        className={`${classes.profileContainer} ${props.className || ''}`}
      >
        <Link href={`/profile/${props.username}`}>
        {props.profilePicture ? (
          <img
            src={props.profilePicture ? props.profilePicture : 'd'}
            alt="Profile Picture"
          />
        ) : (
          <Avatar
            size={32}
            name={props.username}
            variant="marble"
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
          />
        )}
          @
          {props.isPostCard
            ? props.username.split('').slice(0, 7).join('')
            : props.username}
        </Link>
      </button>

      {props.showMenu && (
        <div
          id="menu-div"
          className={`${classes.dropdown} ${
            open ? classes.dropdownActive : ''
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {menu}
        </div>
      )}
    </div>
  );
}

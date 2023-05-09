import FullScreenOverlayWithCenteredItem from '@/components/layout/FullScreenOverlayWithCenteredItem';
import LoginModal from '@/components/specific/login/modal';

export default function LoginOverlay(props: {
    mode: 'signup' | 'login'
}) {
    return (
        <FullScreenOverlayWithCenteredItem>
            <LoginModal mode={ props.mode }></LoginModal>
        </FullScreenOverlayWithCenteredItem>
    );
}

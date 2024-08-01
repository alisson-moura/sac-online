import Logo from '@/assets/logo.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'

export function Header() {
    return (
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-3">
                <Image src={Logo} className='size-6' alt='Sac Online' />
            </div>
            <div className="flex items-center gap-4">
                <ProfileButton />
            </div>
        </div>
    )
}
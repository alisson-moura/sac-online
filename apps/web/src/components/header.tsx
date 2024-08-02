import Logo from '@/assets/logo.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'
import { OrganizationSwitcher } from './organization-switcher'
import { Slash } from 'lucide-react'

export function Header() {
    return (
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-3">
                <Image src={Logo} className='size-6' alt='Sac Online' />
                <Slash className='size-3 -rotate-[24deg]'/>
                <OrganizationSwitcher />
            </div>
            <div className="flex items-center gap-4">
                <ProfileButton />
            </div>
        </div>
    )
}
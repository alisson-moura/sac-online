import Logo from '@/assets/logo.svg'
import Image from 'next/image'
import { ProfileButton } from './profile-button'
import { OrganizationSwitcher } from './organization-switcher'
import { Slash } from 'lucide-react'
import { ability } from '@/hooks/is-authenticated'
import { Separator } from './ui/separator'
import { ThemeSwitcher } from './theme/switcher'
import { FormSwitcher } from './form-switcher'

export async function Header() {
    const permissions = await ability()

    return (
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-3">
                <Image src={Logo} className='size-6' alt='Sac Online' />
                <Slash className='size-3 -rotate-[24deg]' />
                <OrganizationSwitcher />
                {permissions?.can('view', 'FormSubject') && (
                    <>
                        <Slash className='size-3 -rotate-[24deg]' />
                        <FormSwitcher canCreateForm={permissions.can('manage', 'FormSubject')} />
                    </>
                )}
            </div>
            <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <Separator orientation='vertical' className='h-5 bg-foreground' />
                <ProfileButton />
            </div>
        </div>
    )
}
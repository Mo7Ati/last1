import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { cn } from '@/lib/utils';
import { SharedData, type User } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const { t } = useTranslation("common");
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    const page = usePage<SharedData>();
    const { panel, currentLocale } = page.props;
    const isRTL = currentLocale === 'ar';

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className={cn('flex items-center gap-2 px-1 py-1.5 text-sm', isRTL && 'flex-row-reverse')}>
                    <UserInfo user={user} showEmail={true} isRTL={isRTL} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className={cn('flex w-full items-center', isRTL && 'flex-row-reverse')}
                        href={`/${panel}/settings/profile`}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="h-4 w-4 shrink-0" />
                        <span>{t('settings')}</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    method='post'
                    className={cn('flex w-full items-center', isRTL && 'flex-row-reverse')}
                    href={`/${panel}/logout`}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span>{t('logout')}</span>
                </Link>
            </DropdownMenuItem>
        </>
    );
}

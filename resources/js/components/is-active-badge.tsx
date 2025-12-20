import React from 'react'
import { Badge } from './ui/badge'
import { useTranslation } from 'react-i18next';

const IsActiveBadge = ({ isActive }: { isActive: boolean }) => {
    const { t: tTables } = useTranslation('tables');

    return (
        <Badge variant={isActive ? "secondary" : "default"}>
            {isActive ? tTables('common.active') : tTables('common.inactive')}
        </Badge>
    )
}
export default IsActiveBadge

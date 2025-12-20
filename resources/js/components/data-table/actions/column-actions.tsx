import { router } from '@inertiajs/react'
import { MoreHorizontal, PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import DeleteAction from '@/components/delete-action'
import { RouteDefinition } from '@/wayfinder'
import { useState } from 'react'

type ActionsColumnProps = {
    EditRoute: string
    DeleteRoute: string
}

export function ActionsColumn(props: ActionsColumnProps) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">

                <DropdownMenuItem
                    onClick={() => {
                        router.visit(props.EditRoute, { preserveState: true, preserveScroll: true })
                        setOpen(false)
                    }}
                >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit
                </DropdownMenuItem>


                <DeleteAction
                    onDelete={() => {
                        router.delete(props.DeleteRoute)
                        setOpen(false)
                    }}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

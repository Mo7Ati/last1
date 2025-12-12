import React from 'react'
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

const FormButtons = ({ processing, handleCancel, isEditMode }: { processing: boolean, handleCancel: () => void, isEditMode: boolean }) => {
    return (
        <>
            <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={processing}
            >
                Cancel
            </Button>
            <Button type="submit" disabled={processing}>
                {processing
                    ? <><span className="mr-2">saving</span> <Spinner /></>
                    : isEditMode
                        ? 'Update'
                        : 'Create'}
            </Button>
        </>
    )
}

export default FormButtons;

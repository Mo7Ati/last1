import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

const FormButtons = ({ processing, handleCancel, isEditMode }: { processing: boolean, handleCancel: () => void, isEditMode: boolean }) => {
    return (
        <div className="sticky px-6 py-4 flex gap-3 justify-start">
            <Button type="submit" disabled={processing}>
                {processing
                    ? <><span className="mr-2">saving</span> <Spinner /></>
                    : isEditMode
                        ? 'Update'
                        : 'Create'}
            </Button>

            <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={processing}
            >
                Cancel
            </Button>
        </div>
    )
}

export default FormButtons;

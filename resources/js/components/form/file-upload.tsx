import { useCallback, useEffect, useRef, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { Label } from '@/components/ui/label'
import InputError from '@/components/input-error'
import { cn } from '@/lib/utils'

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginImageCrop)

interface FileUploadProps {
    name: string
    label?: string
    multiple?: boolean
    acceptedFileTypes?: string[]
    maxFiles?: number
    maxFileSize?: string
    files?: Array<{
        source: string
        options: {
            type: 'input' | 'limbo' | 'local' | 'remote'
            metadata?: {
                date?: string,
                name?: string,
                size?: number,
                type?: string,
            },
        }
    }>
    error?: string
    className?: string
    required?: boolean
}

const getCsrfToken = () => {
    const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (metaToken) return metaToken;
    return '';
}

export default function FileUpload({
    name,
    label,
    multiple = false,
    acceptedFileTypes = ['image/*'],
    maxFiles = 10,
    maxFileSize = '10MB',
    files: initialFiles = [],
    error,
    className,
    required = false,
}: FileUploadProps) {
    console.log(multiple);

    const [files, setFiles] = useState<any[]>(initialFiles);
    const [tempFileIds, setTempFileIds] = useState<string[]>([]);

    console.log(files, tempFileIds);

    const handleProcessFile = useCallback((error: any, file: any) => {
        if (file.serverId) {
            setTempFileIds(prev => [...prev, file.serverId])
        }
    }, [tempFileIds])

    const handleRemoveFile = useCallback((error: any, file: any) => {
        setTempFileIds(prev => prev.filter((id: string) => id !== String(file.source)))
    }, [tempFileIds])

    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <Label htmlFor={name}>
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </Label>
            )}
            <FilePond
                name={name}
                required={required}
                files={files}
                allowMultiple={multiple}
                onprocessfile={handleProcessFile}
                onupdatefiles={setFiles}
                onremovefile={handleRemoveFile}
                maxFiles={10}
                acceptedFileTypes={acceptedFileTypes}
                server={{
                    url: '/api/temp-uploads',
                    process: {
                        url: '',
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': getCsrfToken(),
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        onload: (response: string) => {
                            try {
                                const data = JSON.parse(response)
                                return data.media_id || data.id || response
                            } catch {
                                return response
                            }
                        },
                    },

                    revert: {
                        url: '',
                        method: 'DELETE',
                        headers: {
                            'X-CSRF-TOKEN': getCsrfToken(),
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                    },

                    load: (source, load, error) => {
                        console.log(source)
                        fetch(`/api/temp-uploads/${source.split('/')[0]}/${source.split('/')[1]}`, {
                            method: 'GET',
                            headers: {
                                'X-CSRF-TOKEN': getCsrfToken(),
                                'X-Requested-With': 'XMLHttpRequest',
                            },
                        })
                            .then(response => {
                                return response.blob()

                            })
                            .then(blob => {
                                load(new Blob([blob], { type: 'image/jpeg' }))
                            })
                            .catch(error => {
                                console.error('File loading error:', error)
                                return
                            })
                    },

                    remove: (source, load, error) => {
                        fetch(`/api/temp-uploads/${source}`, {
                            method: 'DELETE',
                            headers: {
                                'X-CSRF-TOKEN': getCsrfToken(),
                                'X-Requested-With': 'XMLHttpRequest',
                            },
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Failed to remove file')
                                }
                                return response.json()
                            })
                            .then(data => {
                                console.log('File removed successfully', data)
                                load();
                            })
                            .catch(error => {
                                console.error('File removal error:', error)
                                return
                            })
                    }
                }}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                labelFileProcessing='Uploading...'
                labelFileProcessingComplete='Upload complete'
                labelFileProcessingError='Error during upload'
                labelFileProcessingAborted='Upload cancelled'
                labelFileRemoveError='Error during remove'
                labelTapToCancel='tap to cancel'
                labelTapToRetry='tap to retry'
                labelTapToUndo='tap to undo'
                labelButtonRemoveItem='Remove'
                labelButtonAbortItemLoad='Abort'
                labelButtonRetryItemLoad='Retry'
                labelButtonAbortItemProcessing='Cancel'
                labelButtonUndoItemProcessing='Undo'
                labelButtonProcessItem='Upload'
                imagePreviewHeight={200}
                imageCropAspectRatio={"1"}
                imageResizeTargetWidth={1200}
                imageResizeTargetHeight={1200}
                imageResizeMode="contain"
                // stylePanelLayout="integrated"
                styleButtonRemoveItemPosition="right"
                styleButtonProcessItemPosition="right"
                credits={false}
            />

            <input
                type="hidden"
                name={'temp_ids'}
                value={tempFileIds}
            />
            {error && <InputError message={error} />}
        </div>
    )
}


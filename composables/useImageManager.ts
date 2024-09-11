import { ref, computed, watch } from 'vue';
import { type Image } from '~/types/database';

export const useImageManager = async () => {

    const imageManagerPopupOpen = () => useState<boolean>('imageManagerPopupOpen', () => false);
    const currentImageLabel = ref<string | null>(null);

    const currentUploadedImage = ref<File | null>(null);
    const currentUploadedImageBlogUrl = ref<string | null>(null);

    const selectedParentFolderName = ref<string | null>(null);
    const selectedParentFolderIndex = ref<number | null>(null);
    const selectedParentFolderId = ref<number | null>(null);

    // Image uploading
    const setCurrentUploadedImage = (image: File) => {
        currentUploadedImage.value = image;

        const reader = new FileReader();
        reader.onload = (e) => {
            currentUploadedImageBlogUrl.value = e.target?.result as string;
        };

        reader.readAsDataURL(image);
    }

    const clearCurrentUploadedImage = () => {
        currentUploadedImage.value = null;
        currentUploadedImageBlogUrl.value = null;
        selectedParentFolderIndex.value = null;
        selectedParentFolderName.value = null;
    }

    const canUploadImage = computed(() => {
        return  currentUploadedImage.value !== null && 
                currentImageLabel.value !== null;
    });

    async function uploadImage(): Promise<{ status: 'success' | 'error', error?: string, image?: Image, parent_folder_frontend_index?: number }> {
        if (canUploadImage.value !== true) {
            return {
                status: 'error',
                error: 'No image selected'
            };
        }

        try {
            if (currentUploadedImage.value !== null && !currentUploadedImage.value.type.startsWith('image/')) {
                throw new Error('No image selected');
            }
        
            const imageSize = await checkImageSize(currentUploadedImage.value as File);

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(currentUploadedImage.value as File);
                reader.onload = async () => {
                    try {
                    //@ts-expect-error
                        const base64Image = reader?.result?.split(',')[1];

                        const parentId: number = selectedParentFolderId.value || 0;
                
                        const response: Image = await $fetch('/api/upload/image', {
                            method: 'POST',
                            body: { 
                                image: base64Image,
                                label: currentImageLabel.value,
                                parent_folder_id: parentId,
                                width: imageSize.width,
                                height: imageSize.height,
                                file_size: imageSize.fileSize }
                        });

                        resolve({ status: 'success', image: response, parent_folder_frontend_index: selectedParentFolderIndex.value as number });
                    }
                    catch (error) {
                        reject(error);
                    }
                };

                reader.onerror = (error) => reject(error);
            });
        }
        catch (error) {
            return {
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    function checkImageSize(file: File): Promise<{ width: number; height: number; fileSize: number }> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
        
            reader.onload = function(e: ProgressEvent<FileReader>) {
            const img = new Image();
            
            img.onload = (event: Event) => {
                const loadedImg = event.target as HTMLImageElement;
                const size = {
                    width: loadedImg.width,
                    height: loadedImg.height,
                    fileSize: file.size
                };
                resolve(size);
            };
            
            img.onerror = function() {
                reject(new Error('Failed to load image'));
            };
            
            img.src = e.target?.result as string;
            };
        
            reader.onerror = function() {
                reject(new Error('Failed to read file'));
            };
        
            reader.readAsDataURL(file);
        });
    }

    // Image selection
    const isSelectingImage = ref(false);
    const selectedImage = ref<Image | null>(null);
    const resolvePromise = useState<((value: Image | null) => void) | null>('imageManagerResolvePromise', () => null);

    const selectImage = () => {
        imageManagerPopupOpen().value = true;
        selectedImage.value = null;
        isSelectingImage.value = true;
        return new Promise<Image | null>((resolve) => {
            resolvePromise.value = resolve;
        });
    };

    const setSelectedImage = (image: Image) => {
        selectedImage.value = image;
        if (resolvePromise.value) {
            resolvePromise.value(image);
            resolvePromise.value = null;
        } else {
            console.warn('No promise to resolve');
        }
        imageManagerPopupOpen().value = false;
        isSelectingImage.value = false;
    };

    const cancelImageSelection = () => {
        imageManagerPopupOpen().value = false;
        selectedImage.value = null;
        isSelectingImage.value = false;
        if (resolvePromise.value) {
            resolvePromise.value(null);
            resolvePromise.value = null;
        } else {
            console.warn('No promise to resolve (cancel)');
        }
    };

    return {
        imageManagerPopupOpen,
        isSelectingImage,
        selectImage,
        setSelectedImage,
        cancelImageSelection,

        currentImageLabel,
        currentUploadedImage,
        currentUploadedImageBlogUrl,
        selectedParentFolderName,
        selectedParentFolderId,
        selectedParentFolderIndex,
        setCurrentUploadedImage,
        clearCurrentUploadedImage,
        canUploadImage,
        uploadImage,
    }
}
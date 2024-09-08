export const useImageManager = () => {
    const currentImageLabel = ref<string | null>(null);

    const currentUploadedImage = ref<File | null>(null);
    const currentUploadedImageBlogUrl = ref<string | null>(null);

    const selectedParentFolderName = ref<string | null>(null);
    const selectedParentFolderIndex = ref<number | null>(null);


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

    return {
        currentImageLabel,
        currentUploadedImage,
        currentUploadedImageBlogUrl,
        selectedParentFolderName,
        selectedParentFolderIndex,
        setCurrentUploadedImage,
        clearCurrentUploadedImage,
        canUploadImage
    }
}
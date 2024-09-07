export const useImageManager = () => {
    const currentUploadedImage = ref<File | null>(null);
    const currentUploadedImageBlogUrl = ref<string | null>(null);

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
    }

    return {
        currentUploadedImage,
        currentUploadedImageBlogUrl,
        setCurrentUploadedImage,
        clearCurrentUploadedImage
    }
}
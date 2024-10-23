export function useProjectDraft() {
    const saveLocalDraft = (draft: any) => {
        localStorage.setItem('projectDraft', JSON.stringify(draft));
    };

    const loadLocalDraft = () => {
        const savedDraft = localStorage.getItem('projectDraft');
        if (savedDraft) {
            return JSON.parse(savedDraft);
        }
        return null;
    };

    const checkForLocalDraft = () => {
        const savedDraft = localStorage.getItem('projectDraft');
        if (savedDraft) {
            return window.confirm('A draft was found. Would you like to load it?');
        }
        return false;
    };

    const clearLocalDraft = () => {
        localStorage.removeItem('projectDraft');
    };

    return {
        saveLocalDraft,
        loadLocalDraft,
        checkForLocalDraft,
        clearLocalDraft
    };
}
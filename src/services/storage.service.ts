// src/services/storage.service.ts

type StorageType = 'local' | 'session';
type StorageValue = string | number | boolean | object | null;

class StorageService {
    private getStorage(type: StorageType): Storage {
        return type === 'local' ? localStorage : sessionStorage;
    }

    setItem(key: string, value: StorageValue, type: StorageType = 'local'): void {
        try {
            const storage = this.getStorage(type);
            const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
            storage.setItem(key, valueToStore);
        } catch (error) {
            console.error(`Error storing item ${key} to ${type}Storage`, error);
        }
    }

    getItem<T extends StorageValue>(key: string, type: StorageType = 'local'): T | null {
        try {
            const storage = this.getStorage(type);
            const value = storage.getItem(key);

            if (value === null) return null;

            try {
                // Attempt to parse as JSON, fall back to string if it fails
                return JSON.parse(value) as T;
            } catch {
                return value as T;
            }
        } catch (error) {
            console.error(`Error getting item ${key} from ${type}Storage`, error);
            return null;
        }
    }

    removeItem(key: string, type: StorageType = 'local'): void {
        try {
            const storage = this.getStorage(type);
            storage.removeItem(key);
        } catch (error) {
            console.error(`Error removing item ${key} from ${type}Storage`, error);
        }
    }

    clearAll(type?: StorageType): void {
        try {
            if (type) {
                this.getStorage(type).clear();
            } else {
                localStorage.clear();
                sessionStorage.clear();
            }
        } catch (error) {
            console.error(`Error clearing ${type || 'all'} storage`, error);
        }
    }

    clearAllButTokens(type?: StorageType): void {
        try {
            const storageTypes: StorageType[] = type ? [type] : ['local', 'session'];

            storageTypes.forEach(storageType => {
                const storage = this.getStorage(storageType);
                const keys = Object.keys(storage);

                keys.forEach(key => {
                    if (!key.toLowerCase().includes('token')) {
                        storage.removeItem(key);
                    }
                });
            });
        } catch (error) {
            console.error(`Error clearing storage while preserving tokens`, error);
        }
    }
    clearTokens(type?: StorageType): void {
        try {
            const storageTypes: StorageType[] = type ? [type] : ['local', 'session'];

            storageTypes.forEach(storageType => {
                const storage = this.getStorage(storageType);
                const keys = Object.keys(storage);

                keys.forEach(key => {
                    if (key.toLowerCase().includes('token')) {
                        storage.removeItem(key);
                    }
                });
            });
        } catch (error) {
            console.error(`Error clearing storage while preserving tokens`, error);
        }
    }
}

export const storageService = new StorageService();
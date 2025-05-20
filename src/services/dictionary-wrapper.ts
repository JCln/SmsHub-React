import { ApiCallFunction, CacheItem } from "../constants/interface";
import { ENNaming } from "../constants/naming";
import { GET, POST } from "./callAPIWrapperService";
import { MathS } from "./utils";


class DataStoreService {
    private static instance: DataStoreService;
    private cache: Record<string, CacheItem> = {};

    private constructor() { } // Private constructor to prevent direct instantiation

    public static getInstance(): DataStoreService {
        if (!DataStoreService.instance) {
            DataStoreService.instance = new DataStoreService();
        }
        return DataStoreService.instance;
    }

    // Retrieve data
    public async fetchData(
        key: string | ENNaming,
        endpoint: string,
        options: ApiCallFunction = {},

    ): Promise<any> {
        const {
            method = 'GET',
            // body,
            id,
            refresh = false
        } = options;

        const cacheKey = id ? `${key}-${id}` : key; // Handle cases with/without ID

        // Return cached data if exists and not forced to refresh
        if (!MathS.isNull(this.cache[cacheKey]) && !refresh) {
            return this.cache[cacheKey].data;
        }

        // Fetch fresh data and update cache
        let data: any;
        if (method === 'GET') {
            data = await this.executeApiGet(endpoint); // Pass `id` only if it exists
        }
        if (method === 'POST') {
            data = await this.executeApiPost(endpoint, options); // Pass `id` only if it exists
        }
        if (!MathS.isNull(data)) {
            this.cache[cacheKey] = { data };
        }
        return data;

    }
    public setData(
        key: string | ENNaming,
        data: any,
        options: { id?: string } = {}
    ): void {
        const cacheKey = options.id ? `${key}-${options.id}` : key;
        this.cache[cacheKey] = { data };
    }

    private async executeApiGet(
        endpoint: string,
    ): Promise<any> {
        return await GET(endpoint);
    }
    private async executeApiPost(
        endpoint: string,
        options: ApiCallFunction = {},
    ): Promise<any> {
        return await POST(endpoint, options.body);
    }

    public clearCache = () => {
        this.cache = {};
    }
}
// Export a single instance (singleton)
export const dataStoreService = DataStoreService.getInstance();
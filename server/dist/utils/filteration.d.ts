import { Endpoints, EndpointsResponse } from 'bigchaindb-driver/types/connection';
import { RecordInterface } from '../models/user.models';
export declare function filterRecords(records: EndpointsResponse[Endpoints.assets], query: Partial<RecordInterface & {
    key: string[];
}>): {
    id: string;
    data: Record<string, any>;
}[] | Partial<RecordInterface>[];
//# sourceMappingURL=filteration.d.ts.map
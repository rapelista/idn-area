export declare abstract class BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy?: string;
    updatedBy?: string;
    deletedBy?: string;
}

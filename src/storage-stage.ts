enum StorageIndex {
    x,
    y,
    isMoving,
    color,
    type,
    size
}

declare type StorageGetType = {
    x: number;
    y: number;
    color: string;
    size: number;
    isMoving: boolean;
};

export class StorageStage {
    private _storageStage: any[];

    constructor() {
        this._storageStage = [];
    }

    get(index: number): StorageGetType {
        return {
            x: this._storageStage[index][StorageIndex.x],
            y: this._storageStage[index][StorageIndex.y],
            color: this._storageStage[index][StorageIndex.color],
            size: this._storageStage[index][StorageIndex.size],
            isMoving: this._storageStage[index][StorageIndex.isMoving]
        };
    }

    size() {
        return this._storageStage.length;
    }

    push(data: any[]) {
        this._storageStage.push(data);
    }

    clear() {
        this._storageStage = [];
    }
}

import { VolumeInfo } from "./volume-info.inerface";

export interface Items {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
}
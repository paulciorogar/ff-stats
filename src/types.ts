export type DiskRaw = {
    readonly DeviceID: string
    readonly DriveType: number
    readonly FileSystem: string
    readonly FreeSpace: number
    readonly Name: string
    readonly Size: number
    readonly SystemName: string
    readonly VolumeName: string
}
export type Disk = {
    readonly deviceID: string
    readonly driveType: number
    readonly fileSystem: string
    readonly freeSpace: number
    readonly name: string
    readonly size: number
    readonly systemName: string
    readonly volumeName: string
}
export type DiskData = ReadonlyArray<Disk>
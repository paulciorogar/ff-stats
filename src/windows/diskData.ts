import { spawn } from 'child_process'
import { DiskData, DiskRaw } from '../types'

export function diskData(): Promise<DiskData> {
    return new Promise(function (resolve, reject) {
        const child = spawn('powershell.exe', ['Get-WmiObject -Class Win32_logicaldisk | select DeviceID,DriveType,FileSystem,FreeSpace,Name,Size,SystemName,VolumeName | ConvertTo-Json'])

        const decoder = new TextDecoder()
        let response = ''

        child.stdout.on('data', (chunk: Int8Array) => {
            response += decoder.decode(chunk)
        })

        child.stderr.on('data', chunk => {
            console.error(decoder.decode(chunk))
        })

        child.on('close', code => {
            try {
                resolve(parse(response))
            } catch (error) {
                reject(error)
            }
        })

        function parse(response: string): DiskData {
            const data: DiskRaw[] = JSON.parse(response)
            return data.map(raw => ({
                deviceID: raw.DeviceID,
                driveType: raw.DriveType,
                fileSystem: raw.FileSystem,
                freeSpace: raw.FreeSpace,
                name: raw.Name,
                size: raw.Size,
                systemName: raw.SystemName,
                volumeName: raw.VolumeName,
            }))
        }

    })
}

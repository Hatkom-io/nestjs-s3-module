import { ModuleMetadata } from '@nestjs/common'

export type DefaultOptions = {
  credentials?: {
    region: string
    accessKeyId: string
    secretAccessKey: string
  }
  defaultBucket?: string
}

export type DefaultArgs = {
  bucket: string
  filepath: string
}

export type SendArgs = DefaultArgs & {
  buffer: Buffer
  contentType?: string
}

export type SignedUrlArgs = DefaultArgs & {
  expiresIn?: number
}

export type ModuleOptions = Pick<ModuleMetadata, 'imports'> & {
  inject: any[]
  useFactory: (...args: any[]) => Promise<DefaultOptions> | DefaultOptions
  imports?: any[]
}

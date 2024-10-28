import { type DynamicModule, Module } from '@nestjs/common'
import { MODULE_OPTIONS } from './constants'
import { S3Service } from './s3-client.service'
import { ModuleOptions } from './types'

@Module({})
export class S3Module {
  static forRootAsync(options: ModuleOptions): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        S3Service,
      ],
      imports: options.imports || [],
      exports: [S3Service],
    }
  }
}

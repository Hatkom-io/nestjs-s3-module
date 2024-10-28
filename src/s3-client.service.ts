import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Inject, Injectable } from '@nestjs/common'
import { MODULE_OPTIONS } from './constants'
import { DefaultArgs, DefaultOptions, SendArgs, SignedUrlArgs } from './types'

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client
  private readonly defaultBucket?: string

  constructor(
    @Inject(MODULE_OPTIONS) private readonly options: DefaultOptions,
  ) {
    this.s3Client = new S3Client({
      region: this.options.region,
      credentials: this.options.credentials,
    })

    this.defaultBucket = this.options.defaultBucket
  }

  send = ({
    bucket,
    buffer,
    filepath,
    contentType,
  }: SendArgs): Promise<PutObjectCommandOutput> => {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket ?? this.defaultBucket,
        Key: filepath,
        Body: buffer,
        ContentType: contentType,
      }),
    )
  }

  delete = ({
    bucket,
    filepath,
  }: DefaultArgs): Promise<DeleteObjectCommandOutput> => {
    return this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket ?? this.defaultBucket,
        Key: filepath,
      }),
    )
  }

  get = async ({
    bucket,
    filepath,
  }: DefaultArgs): Promise<GetObjectCommandOutput> => {
    return this.s3Client.send(
      new GetObjectCommand({
        Bucket: bucket ?? this.defaultBucket,
        Key: filepath,
      }),
    )
  }

  signedUrl = ({
    bucket,
    filepath,
    expiresIn = 300,
  }: SignedUrlArgs): Promise<string> => {
    return getSignedUrl(
      this.s3Client,
      new GetObjectCommand({
        Bucket: bucket ?? this.defaultBucket,
        Key: filepath,
      }),
      { expiresIn },
    )
  }
}

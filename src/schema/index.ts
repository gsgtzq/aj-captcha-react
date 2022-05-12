export interface CommonResp<T> {
  repCode: string;
  error: boolean,
  repData: T;
}

export interface GetPictureRequest {
  captchaType: string;
  clientUid: string;
  ts: number;
}

export interface CheckPictureRequest {
  captchaType: string;
  pointJson: string;
  token: string;
  clientUid: string;
  ts: number;
}

export interface GetPictureResponse {
  originalImageBase64: string;
  jigsawImageBase64: string;
  token: string;
  secretKey: string;
}

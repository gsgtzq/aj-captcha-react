import React from 'react';
import { CheckPictureRequest, CommonResp, GetPictureRequest, GetPictureResponse } from '../schema';
import type { BaseTypeProps } from '../utils';

export type CaptchaType = 'auto' | 'slide' | 'point';

export interface CaptchaModel {
  image?: string;
  token?: string;
  secretKey?: string;
  word?: string;
  block?: string;
}

export interface SuccessInfo {
  captchaVerification: string
  token: string
}

export interface CaptchaProps extends BaseTypeProps {
  
  /**
   * 获取验证码
   */
  onGetCaptcha: (req: GetPictureRequest) => Promise<CommonResp<GetPictureResponse>>;

  /**
   * 校验验证码
   */
  onVerify: (req: CheckPictureRequest) => Promise<CommonResp<boolean>>;

  /**
   * 验证码类型
   * @default auto
   */
  type?: CaptchaType;

  /**
   * 取消事件
   */
  onCancel?: () => void;
  /**
   * 校验失败
   */
  onFail?: (msg: string) => void;
  /**
   * 校验成功
   */
  onSuccess: (data: SuccessInfo) => void;
  /**
   * 引用声明
   */
  ref?: any;
  /**
   * 子组件
   */
  children?: React.ReactNode
}

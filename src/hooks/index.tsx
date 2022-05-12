import React, { useLayoutEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import Captcha from "../captcha";
import type { CaptchaType, SuccessInfo } from "../captcha/PropsType";
import {
  CheckPictureRequest,
  CommonResp,
  GetPictureRequest,
  GetPictureResponse,
} from "../schema";

export type CaptchaOption = {
  /**
   * 类型
   */
  type: CaptchaType;

  onGetCaptcha: (
    req: GetPictureRequest
  ) => Promise<CommonResp<GetPictureResponse>>;

  onVerify: (req: CheckPictureRequest) => Promise<CommonResp<boolean>>;
};

export type SuccessFunc = (data: SuccessInfo) => void;
export type FailedFunc = (msg: string) => void;

export function useCaptcha(option: CaptchaOption) {
  const ref = useRef();
  const successRef = useRef<SuccessFunc>();
  const failRef = useRef<FailedFunc>();
  const onSuccess = (data: SuccessInfo) => {
    successRef.current?.(data);
  };
  const onFail = (msg: any) => {
    failRef.current?.(msg);
  };
  useLayoutEffect(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    ReactDOM.render(
      <Captcha
        onGetCaptcha={option.onGetCaptcha}
        onVerify={option.onVerify}
        type={option.type}
        onFail={onFail}
        onSuccess={onSuccess}
        ref={ref}
      />,
      div
    );
  }, []);

  const verify = (callBack: (info: SuccessInfo) => void, fail: () => void) => {
    //@ts-ignore
    ref.current?.verify();
    successRef.current = callBack;
    failRef.current = fail;
  };
  const run = () => {
    return new Promise<SuccessInfo>((resolve, reject) => {
      verify(resolve, reject);
    });
  };
  return [run, ref.current];
}

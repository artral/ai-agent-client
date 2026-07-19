import { HttpInterceptorFn } from '@angular/common/http';

export const bffInterceptor: HttpInterceptorFn = (req, next) => {
  // Instructs browser to attach secure HttpOnly cookies to API requests
  const modifiedReq = req.clone({
    withCredentials: true
  });
  return next(modifiedReq);
};

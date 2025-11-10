import { HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token attached', token);
    req = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
  return next(req);
};

// import { HttpInterceptorFn } from '@angular/common/http';

// export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     console.log('🔑 Token attached to request:', token); // 👈 Add this line

//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   } else {
//     console.warn('⚠️ No token found in localStorage');
//   }

//   return next(req);
// };

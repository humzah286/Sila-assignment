const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

interface CorsOptions {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => void;
  optionsSuccessStatus: number;
}

// const corsOptions: CorsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin ? origin: "") || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     optionsSuccessStatus: 200
// }

const corsOptions = {
    origin: true, // reflect the request origin, as opposed to `'*'`
    credentials: true, // required to pass
  };

export default corsOptions;

import z from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{8,}$/;


export const createUserZodSchema = z.object({
  name: z
    .string({ error: "Name must be string!" })
    .min(2, { message: "Name too short. Minimum 2 character Long" })
    .max(50, { message: "Name too long. Name maxlenth is 50!" }),
  // 1 uppercase, 1 special case, 1 digit, 8 characters min
  email: z
    .string({ message: "Email must be string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string({ message: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),
  phone: z
    .string({ message: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  address: z
    .string({ message: "Address must be string" })
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),
});

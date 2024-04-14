"use client";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import { headers } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormData {
  username?: string;
  email: string;
  password: string;
}

const AuthForm = ({ type }: { type: "register" | "login" }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      type === "register"
        ? { username: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    let res

    if (type === "register") {
      try{
        res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          
        });
  
        if (res.ok) {
          router.push("/login");
        } else {
          toast.error("Something went wrong");
        }
      }catch(err){
        console.log(err)
      }
      
    }
  };
  return (
    <div className="auth">
      <div className="overlay">
        <div className="content">
          <img src="assets/logo.png" alt="logo" className="logo" />

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {type === "register" && (
              <>
                <div className="input">
                  <input
                    {...register("username", {
                      required: "username is required!!",
                      validate: (value: string | undefined) => {
                        if (!value || value.length < 2) {
                          return "Username must contain more than 2 characters";
                        }
                        return true;
                      },
                    })}
                    type="text"
                    placeholder="username"
                    className="input-field"
                  />
                  <PersonOutline sx={{ color: "white" }} />
                </div>
                {errors.username && (
                  <p className="error">{errors.username.message}</p>
                )}
              </>
            )}
            <div className="input">
              <input
                {...register("email", {
                  required: "email is required!!",
                })}
                type="email"
                placeholder="Email"
                className="input-field"
              />
              <EmailOutlined sx={{ color: "white" }} />
            </div>
            {errors.email && <p className="error">{errors.email.message}</p>}
            <div className="input">
              <input
                {...register("password", {
                  required: "password is required!!",
                  validate: (value: string | undefined) => {
                    if (
                      !value ||
                      value.length < 5 ||
                      value.length > 20 ||
                      !value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/)
                    ) {
                      return "password must contain characters between 5 and 20 with atleast one special character";
                    }
                    return true;
                  },
                })}
                type="password"
                placeholder="Password"
                className="input-field"
              />
              <LockOutlined sx={{ color: "white" }} />
            </div>
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <button className="button" type="submit">
              {type === "register" ? "Join Now" : "Let's Watch"}
            </button>
          </form>
          {type === "register" ? (
            <Link href="/register">
              <p className="link">Already have an Account? Login Here</p>
            </Link>
          ) : (
            <Link href="/login">
              <p className="link">Don't have an Account? Register Here</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";
import { useSendOtpMutation } from "../redux/features/auth/auth.api";


const verifyFormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});



const Verify = () => {

  const location = useLocation();
  const [email] = useState(location.state);
  const [confirmed, setConfirmed] = useState(false);
  const [sendOtp] = useSendOtpMutation();

 
  const form = useForm<z.infer<typeof verifyFormSchema>>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  //! Needed turning off for development
  // protect verify route
  // useEffect(() => {

  //   if(!email){
  //     navigate("/")
  //   }

  // }, [email, navigate]);

 const handleConfirmed = async () => {
  
  try {
   const res = await  sendOtp({email:email}).unwrap();
   
   if(res.success){
    toast.success("OTP Sent! check your Email!")
   }
    
    setConfirmed(true);
    
  } catch (error) {
    console.log(error, "error");
  }

 }

  const onSubmit = (data: z.infer<typeof verifyFormSchema>) => {
    console.log(data, "test");
    setConfirmed(true)
    
  }



  return (
      <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              Please enter the 6-digit code we sent to <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="otp-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <Dot />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        <Button
                          type="button"
                          variant="link"
                           
                        >
                          Resent OPT 
                        </Button> 
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button form="otp-form" type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Confirm to Verify email address</CardTitle>
            <CardDescription className="text-center">
              We will send you an OTP at <br /> {email}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end">
            <Button  onClick={handleConfirmed} className="w-75">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Verify;
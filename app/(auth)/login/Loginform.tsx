import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import React from "react";
import { GiPadlock } from "react-icons/gi";

const Loginform = () => {
  return (
    <Card className="w-2/5 mx-auto ">
      <CardHeader
        className="flex flex-col items-center
       justify-center"
      >
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome back, lonely human</p>
        </div>
      </CardHeader>
      <CardBody>
        <form action="">
            <div className="space-y-4">
                <Input 
                    label='Email'
                    variant="bordered"
                />
                <Input 
                    label='Password'
                    type="password"
                    variant="bordered"
                />
                <Button fullWidth color='secondary' type="submit">
                    Login
                </Button>
            </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default Loginform;

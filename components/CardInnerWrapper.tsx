import { CardHeader, Divider, CardBody, CardFooter } from "@heroui/react";
import React, { ReactNode } from "react";


type Props = {
    header: ReactNode| string;
    body: ReactNode ;
    footer?: ReactNode ;
}
const CardInnerWrapper = ({header, footer, body}: Props) => {
  return (

      <>
        <CardHeader >
          {typeof header === "string" ? (
            <div className="text-2xl font-semibold text-secondary">
                {header}
            </div>
          ) : (
            <>
            {header}</>
          )}

        </CardHeader>
        <Divider />
        <CardBody>{body}</CardBody>
        {footer && (
          <>
            <Divider />
            <CardFooter>{footer}</CardFooter>
          </>
        )}
      </>
    
  );
};

export default CardInnerWrapper;

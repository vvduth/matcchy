import { Card, CardHeader, CardBody, CardFooter,  } from '@heroui/card'
import React, { ReactNode } from 'react'
import { GiPadlock } from 'react-icons/gi'
import { IconType } from 'react-icons/lib';
import { Button } from '@heroui/button';
type Props = {
    body?: ReactNode;
    headerIcon: IconType;
    headerText: string;
    subHeaderText? : string, 
    action?: () => void, 
    actionLabel?: string,
    footer?: ReactNode;
}

const CardWrapper = ({body, headerIcon: Icon,footer, headerText, subHeaderText, actionLabel, action}: Props) => {
  return (
    <div className='flex items-center justify-center
    align-middle min-h-screen'><Card className="w-full md:w-2/5 mx-auto ">
    <CardHeader
      className="flex flex-col items-center
         justify-center"
    >
      <div className="flex flex-col gap-2 items-center text-secondary">
        <div className="flex flex-row items-center gap-3">
          <Icon size={30} />
          <h1 className="text-3xl font-semibold">{headerText}</h1>
        </div>
        {subHeaderText && (<p className="text-neutral-500">{subHeaderText}</p>)}
      </div>
    </CardHeader>
    <CardBody>
        {body}
    </CardBody>
    <CardFooter>
        {action && (
            <Button onPress={action} fullWidth color='secondary' variant='bordered'>
                {actionLabel}
            </Button>
        )}
         {footer && (
                        <>{footer}</>
                    )}
    </CardFooter>
  </Card></div>
  )
}

export default CardWrapper
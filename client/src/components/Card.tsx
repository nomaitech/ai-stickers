import { type ReactNode } from 'react';

type CardProps = {
    children: ReactNode;
};

const Card = ({ children }: CardProps) => {

    return (
        <div className="flex flex-col border-blue-200 rounded-lg border bg-card text-card-foreground shadow-sm p-6 h-full">
            {children}
        </div>
    );
}

export default Card;
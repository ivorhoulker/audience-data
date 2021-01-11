import React from 'react';

interface Props {
    className?: string;
}

const Container: React.FC<Props> = ({ children, className }) => {
    return <div className={'flex flex-wrap overflow-hidden w-full ' + className}>{children}</div>;
};

export default Container;
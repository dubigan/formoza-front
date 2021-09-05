import React from 'react';

interface ICardProps {
  children?: any;
  className?: string;
}

interface ICard<T> extends React.FC<T> {
  Header: React.FC<T>;
  Body: React.FC<T>;
  Footer: React.FC<T>;
}

const CardHeader: React.FC<ICardProps> = ({ children, className }) => {
  return <div className={className ? className : 'oakCard__header'}>{children}</div>;
};

const CardBody: React.FC<ICardProps> = ({ children, className }) => {
  return <div className={className ? className : 'oakCard__body'}>{children}</div>;
};

const CardFooter: React.FC<ICardProps> = ({ children, className }) => {
  return <div className={className ? className : 'oakCard__footer'}>{children}</div>;
};

const Card: ICard<ICardProps> = ({ children, className }) => {
  // let Header: typeof CardHeader;
  // let Body: typeof CardBody;
  // let Footer: typeof CardFooter;
  return <div className={className ? className : 'oakCard'}>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;

import React from 'react';

type Props = {
    text?: string;
}

const Alert = ({text}: Props) => (
    <div className="alert alert-primary">
        <h1>Alert {text} vc é um excelente programador</h1>
    </div>
)

export default Alert;
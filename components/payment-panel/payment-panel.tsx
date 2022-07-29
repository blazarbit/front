import React, {FunctionComponent} from "react";
import classNames from "classnames";

interface Props {
    className: string;
}

export const PaymentPanel: FunctionComponent<Props> = ({className}) => {
    return (
        <div className={classNames(className)}>
            Payment Panel
        </div>
    );
}
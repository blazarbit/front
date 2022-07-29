import React, {FunctionComponent} from "react";
import classNames from "classnames";

interface Props {
    className: string;
}

export const About: FunctionComponent<Props> = ({className}) => {
    return (
        <div className={classNames(className)}>
            About part
        </div>
    );
}
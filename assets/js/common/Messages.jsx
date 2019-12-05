// ./assets/js/common/Message.js

import React from 'react';

export default function Message(props) {
	return (
		<div>
            {
                props.success
                ?
                <div className="success-message">
                    {props.success}
                </div>
                : null
            }
            {
                props.error
                ?
                <div className="error-message">
                    {props.error}
                </div>
                : null
            }
        </div>
	);
}

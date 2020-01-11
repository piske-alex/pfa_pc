import React, { Component } from 'react';
import PhoneInput from 'react-phone-input-2';

class MobileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trans: props.trans, config: props.config,
            
            disabled: props.disabled,
            value: props.value,
        };
    }

    onChange = (event) => {
        this.props.onChange(event);
        this.setState({ value: event });
    }
    
    render() {
        return <PhoneInput
                inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true,
                }}
                localization = {this.state.trans.phoneLocalization[this.state.config.lang]}
                disabled = {this.state.disabled}
                country = {'hk'}
                onlyCountries = {['cn', 'hk', 'id', 'jp', 'kr', 'my', 'th', 'tw']}
                value = {this.state.value}
                onChange = {this.onChange}
                masks = {{
                    hk: '+... ........',
                    cn: '+.. ...........',
                    my: '+.. ..........',
                    th: '+.. ..........',
                    id: '+.. .............',
                    jp: '+.. ..........',
                    kr: '+.. ...........',
                    tw: '+... ............',
                }}
            />
    }
}

export default MobileInput;
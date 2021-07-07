import React,{Fragment} from 'react'
import {IntlProvider} from 'react-intl'
import {LOCALES} from './locales'
import messages from './messages'
import flatten from 'flat'

const Provider = ({children,locale= LOCALES.ENGLISH}) => (
    <IntlProvider
        locale={locale}
        textComponent={Fragment}
        messages={flatten(messages[locale])}
    > 
    {children}
    </IntlProvider>
)

export default Provider
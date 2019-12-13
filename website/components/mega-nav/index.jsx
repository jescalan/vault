import InlineSvg from '@hashicorp/react-inline-svg'
import hashicorpLogo from './img/hashicorp-logo.svg?include'
import TemporarySuite from './temporary_suite'

export default function MegaNav() {
  return (
    <div className="g-mega-nav">
      <div className="g-container">
        <InlineSvg src={hashicorpLogo} className="hashicorp-logo" />
        <TemporarySuite product="Vault" />
      </div>
    </div>
  )
}
